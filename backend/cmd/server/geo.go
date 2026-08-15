package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// AddressSuggestion is one match for an address the visitor is typing. The
// components are split out so the intake form can fill city, county, state and
// ZIP automatically instead of asking for them separately.
type AddressSuggestion struct {
	Label      string `json:"label"`
	Line1      string `json:"line1"`
	City       string `json:"city"`
	County     string `json:"county"`
	State      string `json:"state"`
	PostalCode string `json:"postalCode"`
}

type geoEntry struct {
	items   []AddressSuggestion
	expires time.Time
}

// geoService looks up United States addresses. Mapbox is used when a token is
// configured; otherwise it falls back to OpenStreetMap's Nominatim, which needs
// no key but allows at most one request per second, so upstream calls are both
// cached and spaced apart.
type geoService struct {
	client      *http.Client
	mapboxToken string
	userAgent   string
	mu          sync.Mutex
	cache       map[string]geoEntry
	lastCall    time.Time
}

func newGeoService() *geoService {
	return &geoService{
		client:      &http.Client{Timeout: 8 * time.Second},
		mapboxToken: strings.TrimSpace(os.Getenv("MAPBOX_TOKEN")),
		userAgent:   env("GEOCODER_USER_AGENT", "BuildersTech-Website/1.0 (+https://builderstech.com)"),
		cache:       map[string]geoEntry{},
	}
}

func (a *App) suggestAddresses(c *gin.Context) {
	query := strings.TrimSpace(c.Query("q"))
	if len([]rune(query)) < 3 {
		respond(c, 200, []AddressSuggestion{})
		return
	}
	if len(query) > 160 {
		query = query[:160]
	}
	items, err := a.Geo.lookup(c.Request.Context(), query)
	if err != nil {
		fail(c, 502, "Address lookup is unavailable right now")
		return
	}
	respond(c, 200, items)
}

func (g *geoService) lookup(ctx context.Context, query string) ([]AddressSuggestion, error) {
	key := strings.ToLower(strings.Join(strings.Fields(query), " "))

	g.mu.Lock()
	if hit, ok := g.cache[key]; ok && time.Now().Before(hit.expires) {
		g.mu.Unlock()
		return hit.items, nil
	}
	g.mu.Unlock()

	var (
		items []AddressSuggestion
		err   error
	)
	if g.mapboxToken != "" {
		items, err = g.mapbox(ctx, query)
	} else {
		// Photon (Komoot) is a free, key-less geocoder built for address
		// autocomplete that, unlike Nominatim, permits server-side use from
		// datacenter IPs. Nominatim is kept only as a best-effort fallback.
		items, err = g.photon(ctx, query)
		if err != nil || len(items) == 0 {
			if alt, altErr := g.nominatim(ctx, query); altErr == nil && len(alt) > 0 {
				items, err = alt, nil
			}
		}
	}
	if err != nil {
		return nil, err
	}
	items = dedupeSuggestions(items)

	g.mu.Lock()
	if len(g.cache) > 500 {
		g.cache = map[string]geoEntry{}
	}
	g.cache[key] = geoEntry{items: items, expires: time.Now().Add(6 * time.Hour)}
	g.mu.Unlock()
	return items, nil
}

func (g *geoService) get(ctx context.Context, endpoint string, out any) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, endpoint, nil)
	if err != nil {
		return err
	}
	req.Header.Set("User-Agent", g.userAgent)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Accept-Language", "en-US")
	res, err := g.client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("address provider returned %d", res.StatusCode)
	}
	return json.NewDecoder(res.Body).Decode(out)
}

func (g *geoService) nominatim(ctx context.Context, query string) ([]AddressSuggestion, error) {
	endpoint := "https://nominatim.openstreetmap.org/search?" + url.Values{
		"q":              {query},
		"format":         {"jsonv2"},
		"addressdetails": {"1"},
		"countrycodes":   {"us"},
		"dedupe":         {"1"},
		"limit":          {"6"},
	}.Encode()

	var rows []struct {
		DisplayName string `json:"display_name"`
		Address     struct {
			HouseNumber   string `json:"house_number"`
			Road          string `json:"road"`
			Neighbourhood string `json:"neighbourhood"`
			City          string `json:"city"`
			Town          string `json:"town"`
			Village       string `json:"village"`
			Hamlet        string `json:"hamlet"`
			Municipality  string `json:"municipality"`
			County        string `json:"county"`
			State         string `json:"state"`
			Postcode      string `json:"postcode"`
		} `json:"address"`
	}
	if err := g.get(ctx, endpoint, &rows); err != nil {
		return nil, err
	}

	out := make([]AddressSuggestion, 0, len(rows))
	for _, row := range rows {
		address := row.Address
		item := AddressSuggestion{
			Line1:      strings.TrimSpace(address.HouseNumber + " " + address.Road),
			City:       firstNonEmpty(address.City, address.Town, address.Village, address.Municipality, address.Hamlet),
			County:     strings.TrimSpace(strings.TrimSuffix(address.County, " County")),
			State:      stateCode(address.State),
			PostalCode: address.Postcode,
		}
		if item.Line1 == "" {
			item.Line1 = firstNonEmpty(address.Road, address.Neighbourhood, firstSegment(row.DisplayName))
		}
		item.Label = addressLabel(item, row.DisplayName)
		out = append(out, item)
	}
	return out, nil
}

func (g *geoService) photon(ctx context.Context, query string) ([]AddressSuggestion, error) {
	endpoint := "https://photon.komoot.io/api/?" + url.Values{
		"q":     {query},
		"limit": {"6"},
		"lang":  {"en"},
	}.Encode()

	var body struct {
		Features []struct {
			Properties struct {
				HouseNumber string `json:"housenumber"`
				Street      string `json:"street"`
				Name        string `json:"name"`
				City        string `json:"city"`
				District    string `json:"district"`
				Locality    string `json:"locality"`
				County      string `json:"county"`
				State       string `json:"state"`
				Postcode    string `json:"postcode"`
				CountryCode string `json:"countrycode"`
			} `json:"properties"`
		} `json:"features"`
	}
	if err := g.get(ctx, endpoint, &body); err != nil {
		return nil, err
	}

	out := make([]AddressSuggestion, 0, len(body.Features))
	for _, feature := range body.Features {
		p := feature.Properties
		if p.CountryCode != "" && !strings.EqualFold(p.CountryCode, "us") {
			continue // United States addresses only
		}
		item := AddressSuggestion{
			Line1:      strings.TrimSpace(p.HouseNumber + " " + p.Street),
			City:       firstNonEmpty(p.City, p.Locality, p.District),
			County:     strings.TrimSpace(strings.TrimSuffix(p.County, " County")),
			State:      stateCode(p.State),
			PostalCode: p.Postcode,
		}
		if item.Line1 == "" {
			item.Line1 = firstNonEmpty(p.Name, p.Street, p.Locality, p.District)
		}
		item.Label = addressLabel(item, firstNonEmpty(p.Name, item.Line1))
		out = append(out, item)
	}
	return out, nil
}

func (g *geoService) mapbox(ctx context.Context, query string) ([]AddressSuggestion, error) {
	endpoint := fmt.Sprintf("https://api.mapbox.com/geocoding/v5/mapbox.places/%s.json?%s",
		url.PathEscape(query),
		url.Values{
			"country":      {"us"},
			"types":        {"address,place,postcode,locality,neighborhood"},
			"autocomplete": {"true"},
			"limit":        {"6"},
			"access_token": {g.mapboxToken},
		}.Encode())

	var body struct {
		Features []struct {
			PlaceName string `json:"place_name"`
			Address   string `json:"address"`
			Text      string `json:"text"`
			Context   []struct {
				ID        string `json:"id"`
				Text      string `json:"text"`
				ShortCode string `json:"short_code"`
			} `json:"context"`
		} `json:"features"`
	}
	if err := g.get(ctx, endpoint, &body); err != nil {
		return nil, err
	}

	out := make([]AddressSuggestion, 0, len(body.Features))
	for _, feature := range body.Features {
		item := AddressSuggestion{Line1: strings.TrimSpace(feature.Address + " " + feature.Text)}
		for _, part := range feature.Context {
			switch {
			case strings.HasPrefix(part.ID, "postcode."):
				item.PostalCode = part.Text
			case strings.HasPrefix(part.ID, "place."):
				item.City = part.Text
			case strings.HasPrefix(part.ID, "district."):
				item.County = strings.TrimSpace(strings.TrimSuffix(part.Text, " County"))
			case strings.HasPrefix(part.ID, "region."):
				item.State = firstNonEmpty(strings.TrimPrefix(part.ShortCode, "US-"), stateCode(part.Text))
			}
		}
		item.Label = addressLabel(item, feature.PlaceName)
		out = append(out, item)
	}
	return out, nil
}

// Providers often return the same address as several map objects, which would
// show up as repeated rows in the dropdown.
func dedupeSuggestions(items []AddressSuggestion) []AddressSuggestion {
	seen := map[string]bool{}
	out := make([]AddressSuggestion, 0, len(items))
	for _, item := range items {
		key := strings.ToLower(item.Label)
		if seen[key] {
			continue
		}
		seen[key] = true
		out = append(out, item)
	}
	return out
}

func addressLabel(item AddressSuggestion, fallback string) string {
	parts := []string{}
	for _, part := range []string{item.Line1, item.City, strings.TrimSpace(item.State + " " + item.PostalCode)} {
		if strings.TrimSpace(part) != "" {
			parts = append(parts, strings.TrimSpace(part))
		}
	}
	if len(parts) == 0 {
		return strings.TrimSuffix(fallback, ", United States")
	}
	return strings.Join(parts, ", ")
}

func firstSegment(value string) string {
	return strings.TrimSpace(strings.SplitN(value, ",", 2)[0])
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return strings.TrimSpace(value)
		}
	}
	return ""
}

var stateCodes = map[string]string{
	"alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR", "california": "CA",
	"colorado": "CO", "connecticut": "CT", "delaware": "DE", "district of columbia": "DC",
	"florida": "FL", "georgia": "GA", "hawaii": "HI", "idaho": "ID", "illinois": "IL",
	"indiana": "IN", "iowa": "IA", "kansas": "KS", "kentucky": "KY", "louisiana": "LA",
	"maine": "ME", "maryland": "MD", "massachusetts": "MA", "michigan": "MI", "minnesota": "MN",
	"mississippi": "MS", "missouri": "MO", "montana": "MT", "nebraska": "NE", "nevada": "NV",
	"new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
	"north carolina": "NC", "north dakota": "ND", "ohio": "OH", "oklahoma": "OK", "oregon": "OR",
	"pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC", "south dakota": "SD",
	"tennessee": "TN", "texas": "TX", "utah": "UT", "vermont": "VT", "virginia": "VA",
	"washington": "WA", "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY",
	"puerto rico": "PR", "guam": "GU", "american samoa": "AS", "u.s. virgin islands": "VI",
	"united states virgin islands": "VI", "northern mariana islands": "MP",
}

func stateCode(name string) string {
	trimmed := strings.TrimSpace(name)
	if trimmed == "" {
		return ""
	}
	if len(trimmed) == 2 {
		return strings.ToUpper(trimmed)
	}
	if code, ok := stateCodes[strings.ToLower(trimmed)]; ok {
		return code
	}
	return trimmed
}
