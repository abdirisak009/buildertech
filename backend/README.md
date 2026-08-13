# BuildersTech API

Production-oriented Go API using Gin, GORM and PostgreSQL. It provides JWT admin authentication, editable localized content, media uploads, site settings, users, and lead management.

## Start with Docker

```bash
cp .env.example .env
# Change JWT_SECRET and ADMIN_PASSWORD before production.
docker compose up --build
```

API: `http://localhost:8080`
Health: `http://localhost:8080/health`

The initial administrator is created only when the users table is empty. Default development login: `admin@builderstech.com` / `ChangeMe123!`.

## Run locally

```bash
go mod tidy
go run ./cmd/server
```

Uploaded assets are served from `/uploads`. In production, place them behind object storage/CDN and use a strong random JWT secret.

## Address autocomplete

`GET /api/v1/geo/address?q=<text>` returns up to six United States address
matches, each split into street line, city, county, state and ZIP. The intake
form uses it to fill the location fields automatically.

Results are cached for six hours. With no `MAPBOX_TOKEN` set the endpoint uses
OpenStreetMap's Nominatim, which is free but allows only one lookup per second
(the API spaces its calls out to respect that) and ranks partial addresses less
accurately. Set `MAPBOX_TOKEN` for production-grade suggestions.

## Hiding page sections

Section visibility is stored with the other page edits in `page_overrides`, as
`kind: "section"` with `value: "hidden"` or `"visible"` and a key such as
`section:3`. The CMS visual editor writes these; the website reads them from
`GET /api/v1/overrides?path=/en`.
