package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Base struct {
	ID        uuid.UUID      `json:"id" gorm:"type:uuid;primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

func (b *Base) BeforeCreate(*gorm.DB) error {
	if b.ID == uuid.Nil {
		b.ID = uuid.New()
	}
	return nil
}

type User struct {
	Base
	Name         string     `json:"name"`
	Email        string     `json:"email" gorm:"uniqueIndex"`
	PasswordHash string     `json:"-"`
	Role         string     `json:"role" gorm:"default:admin"`
	Active       bool       `json:"active" gorm:"default:true"`
	LastLoginAt  *time.Time `json:"lastLoginAt,omitempty"`
}
type Content struct {
	Base
	Locale      string     `json:"locale" gorm:"index:idx_content_key,unique"`
	Key         string     `json:"key" gorm:"index:idx_content_key,unique"`
	Title       string     `json:"title"`
	Type        string     `json:"type" gorm:"default:page"`
	Status      string     `json:"status" gorm:"default:draft"`
	Data        string     `json:"data" gorm:"type:jsonb;default:'{}'"`
	PublishedAt *time.Time `json:"publishedAt,omitempty"`
}
type Media struct {
	Base
	Name     string `json:"name"`
	Alt      string `json:"alt"`
	URL      string `json:"url"`
	MimeType string `json:"mimeType"`
	Size     int64  `json:"size"`
}
type Lead struct {
	Base
	Name        string `json:"name"`
	Company     string `json:"company"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	Referral    string `json:"referral"`
	Address     string `json:"address"`
	Timeline    string `json:"timeline"`
	Budget      string `json:"budget"`
	County      string `json:"county"`
	City        string `json:"city"`
	State       string `json:"state"`
	PostalCode  string `json:"postalCode"`
	Phase       string `json:"phase"`
	ProjectType string `json:"projectType"`
	Services    string `json:"services"`
	Message     string `json:"message"`
	Deadline    string `json:"deadline"`
	Language    string `json:"language"`
	Status      string `json:"status" gorm:"default:new;index"`
	Notes       string `json:"notes"`
}
type Setting struct {
	Base
	Key   string `json:"key" gorm:"uniqueIndex"`
	Value string `json:"value" gorm:"type:text"`
	Group string `json:"group" gorm:"index"`
	Label string `json:"label"`
}
type PageOverride struct {
	Base
	Path  string `json:"path" gorm:"index:idx_page_override,unique"`
	Key   string `json:"key" gorm:"index:idx_page_override,unique"`
	Kind  string `json:"kind" gorm:"default:text"`
	Value string `json:"value" gorm:"type:text"`
	Alt   string `json:"alt" gorm:"type:text"`
}

type App struct {
	DB        *gorm.DB
	JWTSecret []byte
	UploadDir string
	Minio     *minio.Client
	Bucket    string
	Geo       *geoService
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
func respond(c *gin.Context, status int, data any) { c.JSON(status, gin.H{"data": data}) }
func fail(c *gin.Context, status int, message string) {
	c.AbortWithStatusJSON(status, gin.H{"error": message})
}

func main() {
	dsn := env("DATABASE_URL", "postgres://builderstech:builderstech@localhost:5432/builderstech?sslmode=disable")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Warn)})
	if err != nil {
		log.Fatal("database connection failed: ", err)
	}
	if err = db.AutoMigrate(&User{}, &Content{}, &Media{}, &Lead{}, &Setting{}, &PageOverride{}); err != nil {
		log.Fatal(err)
	}
	app := &App{DB: db, JWTSecret: []byte(env("JWT_SECRET", "development-secret-change-me")), UploadDir: env("UPLOAD_DIR", "./uploads"), Geo: newGeoService()}
	if err = os.MkdirAll(app.UploadDir, 0755); err != nil {
		log.Fatal(err)
	}
	if endpoint := os.Getenv("MINIO_ENDPOINT"); endpoint != "" {
		app.Minio, err = minio.New(endpoint, &minio.Options{Creds: credentials.NewStaticV4(env("MINIO_ACCESS_KEY", "minioadmin"), env("MINIO_SECRET_KEY", "minioadmin"), ""), Secure: env("MINIO_USE_SSL", "false") == "true"})
		if err != nil {
			log.Fatal("minio connection failed: ", err)
		}
		app.Bucket = env("MINIO_BUCKET", "builderstech")
		ctx := context.Background()
		exists, e := app.Minio.BucketExists(ctx, app.Bucket)
		if e != nil {
			log.Fatal(e)
		}
		if !exists {
			if e = app.Minio.MakeBucket(ctx, app.Bucket, minio.MakeBucketOptions{}); e != nil {
				log.Fatal(e)
			}
		}
		policy := fmt.Sprintf(`{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetObject"],"Resource":["arn:aws:s3:::%s/*"]}]}`, app.Bucket)
		if e = app.Minio.SetBucketPolicy(ctx, app.Bucket, policy); e != nil {
			log.Fatal(e)
		}
	}
	if err = app.seed(); err != nil {
		log.Fatal(err)
	}

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery(), cors.New(cors.Config{AllowOrigins: strings.Split(env("FRONTEND_URL", "http://localhost:3000"), ","), AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}, AllowHeaders: []string{"Origin", "Content-Type", "Authorization"}, ExposeHeaders: []string{"Content-Length"}, AllowCredentials: true, MaxAge: 12 * time.Hour}))
	r.GET("/health", func(c *gin.Context) { respond(c, 200, gin.H{"status": "ok", "time": time.Now()}) })
	r.Static("/uploads", app.UploadDir)
	api := r.Group("/api/v1")
	api.POST("/auth/login", app.login)
	api.POST("/leads", app.createLead)
	api.GET("/content", app.publicContents)
	api.GET("/content/:locale/:key", app.publicContent)
	api.GET("/settings/public", app.publicSettings)
	api.GET("/overrides", app.publicOverrides)
	api.GET("/geo/address", app.suggestAddresses)
	admin := api.Group("/admin", app.auth())
	admin.GET("/me", app.me)
	admin.GET("/dashboard", app.dashboard)
	admin.GET("/contents", app.listContents)
	admin.POST("/contents", app.createContent)
	admin.PUT("/contents/:id", app.updateContent)
	admin.DELETE("/contents/:id", app.deleteContent)
	admin.GET("/leads", app.listLeads)
	admin.PATCH("/leads/:id", app.updateLead)
	admin.DELETE("/leads/:id", app.deleteLead)
	admin.GET("/media", app.listMedia)
	admin.POST("/media", app.uploadMedia)
	admin.PUT("/media/:id", app.updateMedia)
	admin.DELETE("/media/:id", app.deleteMedia)
	admin.GET("/settings", app.listSettings)
	admin.PUT("/settings/:key", app.upsertSetting)
	admin.GET("/overrides", app.listOverrides)
	admin.PUT("/overrides", app.upsertOverride)
	admin.DELETE("/overrides/:id", app.deleteOverride)
	admin.GET("/users", app.listUsers)
	admin.POST("/users", app.createUser)
	admin.PATCH("/users/:id", app.updateUser)
	port := env("PORT", "8080")
	log.Printf("BuildersTech API listening on :%s", port)
	log.Fatal(r.Run(":" + port))
}

func (a *App) seed() error {
	var count int64
	a.DB.Model(&User{}).Count(&count)
	if count == 0 {
		hash, _ := bcrypt.GenerateFromPassword([]byte(env("ADMIN_PASSWORD", "ChangeMe123!")), bcrypt.DefaultCost)
		u := User{Name: env("ADMIN_NAME", "BuildersTech Admin"), Email: strings.ToLower(env("ADMIN_EMAIL", "admin@builderstech.com")), PasswordHash: string(hash), Role: "super_admin", Active: true}
		if err := a.DB.Create(&u).Error; err != nil {
			return err
		}
	}
	defaults := []Setting{
		{Key: "site_name", Value: "BuildersTech", Group: "branding", Label: "Brand name"},
		{Key: "logo_url", Value: "/logo-mark-trim.png", Group: "branding", Label: "Main logo URL"},
		{Key: "logo_size", Value: "100", Group: "branding", Label: "Logo size (%)"},
		{Key: "brand_primary", Value: "#0a2472", Group: "branding", Label: "Primary brand color"},
		{Key: "brand_accent", Value: "#e87838", Group: "branding", Label: "Accent and button color"},
		{Key: "brand_dark", Value: "#000000", Group: "branding", Label: "Dark background color"},
		{Key: "contact_email", Value: "info@builderstech.com", Group: "contact", Label: "Contact email"},
		{Key: "contact_phone", Value: "", Group: "contact", Label: "Primary phone number"},
		{Key: "whatsapp_number", Value: "", Group: "contact", Label: "WhatsApp number"},
		{Key: "office_address", Value: "Stone Mountain, Georgia", Group: "contact", Label: "Office address"},
		{Key: "office_hours", Value: "Monday–Friday, 9:00 AM–5:00 PM", Group: "contact", Label: "Office hours"},
		{Key: "facebook_url", Value: "", Group: "social", Label: "Facebook URL"},
		{Key: "instagram_url", Value: "", Group: "social", Label: "Instagram URL"},
		{Key: "linkedin_url", Value: "", Group: "social", Label: "LinkedIn URL"},
		{Key: "youtube_url", Value: "", Group: "social", Label: "YouTube URL"},
		{Key: "x_url", Value: "", Group: "social", Label: "X / Twitter URL"},
		{Key: "seo_title", Value: "BuildersTech", Group: "seo", Label: "Default SEO title"},
		{Key: "seo_description", Value: "Engineering, architecture and construction technology.", Group: "seo", Label: "SEO description"},
	}
	for _, s := range defaults {
		var n int64
		a.DB.Model(&Setting{}).Where("key = ?", s.Key).Count(&n)
		if n == 0 {
			a.DB.Create(&s)
		}
	}
	var imported int64
	a.DB.Model(&Setting{}).Where("key = ?", "cms_logos_imported").Count(&imported)
	if imported == 0 {
		logos := []struct{ Name, Image string }{
			{"TrustDALE Certified", "/logos/trustdale.jpg"}, {"Division 31 Construction", "/logos/division-31.jpeg"},
			{"33 North Homes & Construction", "/logos/33-north.png"}, {"Audubon Place Properties", "/logos/audubon-place.png"},
			{"Advanced Renovations", "/logos/advanced-renovations.png"}, {"Better Homes and Gardens Real Estate", "/logos/better-homes.png"},
			{"BIG", "/logos/big.png"}, {"Contractors Corner of Atlanta", "/logos/contractors-corner.png"},
			{"AM Consulting & Hauling", "/logos/am-consulting.jpg"}, {"GFS", "/logos/gfs-logo.jpg"},
			{"Southeast Restoration", "/logos/southeast-restoration.png"}, {"Ben Hill Renovations", "/logos/ben-hill.png"},
			{"Neil Engineering Inc.", "/logos/neil-engineering.png"}, {"MainStreet Renewal", "/logos/mainstreet-renewal.png"},
			{"Keller Williams Georgia Communities", "/logos/keller-williams.png"}, {"eXp Realty", "/logos/exp-realty.png"},
			{"Coldwell Banker Realty", "/logos/coldwell-banker.png"}, {"Delta Carpet & Decor", "/logos/delta-carpet.png"},
			{"Y Studio", "/logos/y-studio.png"},
		}
		for _, locale := range []string{"en", "es"} {
			for index, logo := range logos {
				data, _ := json.Marshal(map[string]string{"image": logo.Image, "website": ""})
				a.DB.Create(&Content{Locale: locale, Key: fmt.Sprintf("client-logo-%02d", index+1), Title: logo.Name, Type: "logo", Status: "published", Data: string(data)})
			}
		}
		a.DB.Create(&Setting{Key: "cms_logos_imported", Value: "true", Group: "system", Label: "Legacy logos imported"})
	}
	// Team seed. Uses a versioned guard so that adding members to this list
	// backfills existing databases (older installs were seeded with only four).
	// FirstOrCreate per member is idempotent: it adds any missing member without
	// duplicating or overwriting rows an admin may have already edited.
	var teamSeeded int64
	a.DB.Model(&Setting{}).Where("key = ?", "cms_team_seed_v2").Count(&teamSeeded)
	if teamSeeded == 0 {
		team := []map[string]string{
			{"firstName": "Shailesh", "lastInitial": "G", "credentials": "PE", "role": "Civil Engineer", "photo": "/teams/shailesh-g.jpg", "bio": "Designs grading, drainage, utilities and site plans that move projects toward permit approval."},
			{"firstName": "Daniela", "lastInitial": "C", "credentials": "RA", "role": "Architect", "photo": "/teams/daniela-c.jpg", "bio": "Turns ideas into buildable, code-compliant designs for residential and commercial spaces."},
			{"firstName": "Yavuz", "lastInitial": "A", "credentials": "PMP", "role": "Operations Manager", "photo": "/teams/yavuz-a.jpg", "bio": "Keeps projects, people and processes coordinated and moving efficiently."},
			{"firstName": "Elizabeth", "lastInitial": "B", "role": "Business Systems Manager", "photo": "/teams/elizabeth-b.jpg", "bio": "Leads the systems, technology and workflows that support the team and its clients."},
			{"firstName": "Tania", "lastInitial": "A", "role": "Sales & Project Manager", "photo": "/teams/tania-a.jpg", "bio": "Guides clients from the first conversation through design coordination and permit approval."},
			{"firstName": "Taha", "lastInitial": "A", "role": "Sales & Project Manager", "photo": "/teams/taha-a.jpg", "bio": "Helps turn challenging project requirements into clear, successful delivery plans."},
		}
		for _, locale := range []string{"en", "es"} {
			for index, member := range team {
				data, _ := json.Marshal(member)
				key := fmt.Sprintf("team-%02d", index+1)
				a.DB.
					Where(Content{Locale: locale, Key: key, Type: "team"}).
					Attrs(Content{Title: member["firstName"], Status: "published", Data: string(data)}).
					FirstOrCreate(&Content{})
			}
		}
		a.DB.Create(&Setting{Key: "cms_team_seed_v2", Value: "true", Group: "system", Label: "Team seed v2"})
	}
	return nil
}

func (a *App) login(c *gin.Context) {
	var in struct{ Email, Password string }
	if c.ShouldBindJSON(&in) != nil {
		fail(c, 400, "Email and password are required")
		return
	}
	var u User
	if a.DB.Where("LOWER(email) = ?", strings.ToLower(in.Email)).First(&u).Error != nil || bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(in.Password)) != nil || !u.Active {
		fail(c, 401, "Invalid email or password")
		return
	}
	now := time.Now()
	u.LastLoginAt = &now
	a.DB.Save(&u)
	claims := jwt.MapClaims{"sub": u.ID.String(), "email": u.Email, "role": u.Role, "exp": time.Now().Add(24 * time.Hour).Unix(), "iat": time.Now().Unix()}
	token, _ := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(a.JWTSecret)
	respond(c, 200, gin.H{"token": token, "user": u})
}
func (a *App) auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		raw := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		token, err := jwt.Parse(raw, func(t *jwt.Token) (any, error) {
			if t.Method != jwt.SigningMethodHS256 {
				return nil, errors.New("invalid signing method")
			}
			return a.JWTSecret, nil
		})
		if err != nil || !token.Valid {
			fail(c, 401, "Unauthorized")
			return
		}
		claims := token.Claims.(jwt.MapClaims)
		c.Set("userID", claims["sub"])
		c.Next()
	}
}
func (a *App) me(c *gin.Context) {
	var u User
	if a.DB.First(&u, "id = ?", c.GetString("userID")).Error != nil {
		fail(c, 404, "User not found")
		return
	}
	respond(c, 200, u)
}
func (a *App) dashboard(c *gin.Context) {
	var contents, leads, newLeads, media int64
	a.DB.Model(&Content{}).Count(&contents)
	a.DB.Model(&Lead{}).Count(&leads)
	a.DB.Model(&Lead{}).Where("status = ?", "new").Count(&newLeads)
	a.DB.Model(&Media{}).Count(&media)
	var recent []Lead
	a.DB.Order("created_at desc").Limit(5).Find(&recent)
	respond(c, 200, gin.H{"contents": contents, "leads": leads, "newLeads": newLeads, "media": media, "recentLeads": recent})
}

func paging(c *gin.Context) (int, int) {
	p, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	s, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))
	if p < 1 {
		p = 1
	}
	if s < 1 || s > 100 {
		s = 50
	}
	return p, s
}
func (a *App) listContents(c *gin.Context) {
	var rows []Content
	p, s := paging(c)
	q := a.DB.Model(&Content{})
	if v := c.Query("locale"); v != "" {
		q = q.Where("locale = ?", v)
	}
	if v := c.Query("search"); v != "" {
		q = q.Where("key ILIKE ? OR title ILIKE ?", "%"+v+"%", "%"+v+"%")
	}
	var total int64
	q.Count(&total)
	q.Order("updated_at desc").Offset((p - 1) * s).Limit(s).Find(&rows)
	respond(c, 200, gin.H{"items": rows, "total": total})
}
func validateContent(x *Content) error {
	if x.Locale != "en" && x.Locale != "es" {
		return errors.New("locale must be en or es")
	}
	if strings.TrimSpace(x.Key) == "" {
		return errors.New("key is required")
	}
	if x.Status == "" {
		x.Status = "draft"
	}
	if x.Data == "" {
		x.Data = "{}"
	}
	return nil
}
func (a *App) createContent(c *gin.Context) {
	var x Content
	if c.ShouldBindJSON(&x) != nil {
		fail(c, 400, "Invalid content")
		return
	}
	if err := validateContent(&x); err != nil {
		fail(c, 422, err.Error())
		return
	}
	if x.Status == "published" {
		n := time.Now()
		x.PublishedAt = &n
	}
	if err := a.DB.Create(&x).Error; err != nil {
		fail(c, 409, "Content key already exists")
		return
	}
	respond(c, 201, x)
}
func (a *App) updateContent(c *gin.Context) {
	var x Content
	if a.DB.First(&x, "id = ?", c.Param("id")).Error != nil {
		fail(c, 404, "Content not found")
		return
	}
	var in Content
	if c.ShouldBindJSON(&in) != nil {
		fail(c, 400, "Invalid content")
		return
	}
	in.ID = x.ID
	in.CreatedAt = x.CreatedAt
	if err := validateContent(&in); err != nil {
		fail(c, 422, err.Error())
		return
	}
	if in.Status == "published" && x.Status != "published" {
		n := time.Now()
		in.PublishedAt = &n
	} else {
		in.PublishedAt = x.PublishedAt
	}
	a.DB.Save(&in)
	respond(c, 200, in)
}
func (a *App) deleteContent(c *gin.Context) {
	if a.DB.Delete(&Content{}, "id = ?", c.Param("id")).RowsAffected == 0 {
		fail(c, 404, "Content not found")
		return
	}
	c.Status(204)
}
func (a *App) publicContent(c *gin.Context) {
	var x Content
	if a.DB.Where("locale = ? AND key = ? AND status = ?", c.Param("locale"), c.Param("key"), "published").First(&x).Error != nil {
		fail(c, 404, "Content not found")
		return
	}
	respond(c, 200, x)
}
func (a *App) publicContents(c *gin.Context) {
	var rows []Content
	q := a.DB.Where("status = ?", "published")
	if locale := c.Query("locale"); locale != "" {
		q = q.Where("locale = ?", locale)
	}
	if types := strings.TrimSpace(c.Query("types")); types != "" {
		q = q.Where("type IN ?", strings.Split(types, ","))
	}
	q.Order("created_at asc").Find(&rows)
	respond(c, 200, rows)
}

func (a *App) createLead(c *gin.Context) {
	var x Lead
	if c.ShouldBindJSON(&x) != nil {
		fail(c, 400, "Invalid form data")
		return
	}
	if strings.TrimSpace(x.Name) == "" || strings.TrimSpace(x.Email) == "" || strings.TrimSpace(x.Message) == "" {
		fail(c, 422, "Name, email and message are required")
		return
	}
	x.Status = "new"
	if err := a.DB.Create(&x).Error; err != nil {
		fail(c, 500, "Could not save request")
		return
	}
	respond(c, 201, gin.H{"id": x.ID, "message": "Your request has been received"})
}
func (a *App) listLeads(c *gin.Context) {
	var rows []Lead
	p, s := paging(c)
	q := a.DB.Model(&Lead{})
	if v := c.Query("status"); v != "" {
		q = q.Where("status = ?", v)
	}
	if v := c.Query("search"); v != "" {
		q = q.Where("name ILIKE ? OR email ILIKE ? OR company ILIKE ?", "%"+v+"%", "%"+v+"%", "%"+v+"%")
	}
	var total int64
	q.Count(&total)
	q.Order("created_at desc").Offset((p - 1) * s).Limit(s).Find(&rows)
	respond(c, 200, gin.H{"items": rows, "total": total})
}
func (a *App) updateLead(c *gin.Context) {
	var x Lead
	if a.DB.First(&x, "id = ?", c.Param("id")).Error != nil {
		fail(c, 404, "Lead not found")
		return
	}
	var in struct {
		Status string `json:"status"`
		Notes  string `json:"notes"`
	}
	if c.ShouldBindJSON(&in) != nil {
		fail(c, 400, "Invalid data")
		return
	}
	if in.Status != "" {
		x.Status = in.Status
	}
	x.Notes = in.Notes
	a.DB.Save(&x)
	respond(c, 200, x)
}
func (a *App) deleteLead(c *gin.Context) {
	a.DB.Delete(&Lead{}, "id = ?", c.Param("id"))
	c.Status(204)
}

func safeFile(f *multipart.FileHeader) string {
	ext := strings.ToLower(filepath.Ext(f.Filename))
	return uuid.NewString() + ext
}
func (a *App) uploadMedia(c *gin.Context) {
	f, err := c.FormFile("file")
	if err != nil {
		fail(c, 400, "File is required")
		return
	}
	if f.Size > 15<<20 {
		fail(c, 413, "Maximum file size is 15MB")
		return
	}
	mime := f.Header.Get("Content-Type")
	if !strings.HasPrefix(mime, "image/") && !strings.HasPrefix(mime, "video/") && !strings.HasPrefix(mime, "application/pdf") {
		fail(c, 415, "Unsupported file type")
		return
	}
	name := safeFile(f)
	url := "/uploads/" + name
	if a.Minio != nil {
		src, e := f.Open()
		if e != nil {
			fail(c, 500, "Upload failed")
			return
		}
		defer src.Close()
		if _, e = a.Minio.PutObject(c.Request.Context(), a.Bucket, name, src, f.Size, minio.PutObjectOptions{ContentType: mime}); e != nil {
			fail(c, 500, "Object storage upload failed")
			return
		}
		url = "/storage/" + a.Bucket + "/" + name
	} else if err = c.SaveUploadedFile(f, filepath.Join(a.UploadDir, name)); err != nil {
		fail(c, 500, "Upload failed")
		return
	}
	x := Media{Name: f.Filename, Alt: c.PostForm("alt"), URL: url, MimeType: mime, Size: f.Size}
	a.DB.Create(&x)
	respond(c, 201, x)
}
func (a *App) listMedia(c *gin.Context) {
	var rows []Media
	a.DB.Order("created_at desc").Find(&rows)
	respond(c, 200, rows)
}
func (a *App) updateMedia(c *gin.Context) {
	var x Media
	if a.DB.First(&x, "id = ?", c.Param("id")).Error != nil {
		fail(c, 404, "Media not found")
		return
	}
	var in struct{ Name, Alt string }
	c.ShouldBindJSON(&in)
	if in.Name != "" {
		x.Name = in.Name
	}
	x.Alt = in.Alt
	a.DB.Save(&x)
	respond(c, 200, x)
}
func (a *App) deleteMedia(c *gin.Context) {
	var x Media
	if a.DB.First(&x, "id = ?", c.Param("id")).Error != nil {
		fail(c, 404, "Media not found")
		return
	}
	if a.Minio != nil && strings.HasPrefix(x.URL, "/storage/") {
		_ = a.Minio.RemoveObject(c.Request.Context(), a.Bucket, filepath.Base(x.URL), minio.RemoveObjectOptions{})
	} else {
		os.Remove(filepath.Join(a.UploadDir, filepath.Base(x.URL)))
	}
	a.DB.Delete(&x)
	c.Status(204)
}

func (a *App) listSettings(c *gin.Context) {
	var rows []Setting
	a.DB.Order("\"group\", key").Find(&rows)
	respond(c, 200, rows)
}
func (a *App) publicSettings(c *gin.Context) {
	var rows []Setting
	a.DB.Where("\"group\" IN ?", []string{"general", "branding", "contact", "social", "seo"}).Find(&rows)
	out := map[string]string{}
	for _, x := range rows {
		out[x.Key] = x.Value
	}
	respond(c, 200, out)
}

func (a *App) publicOverrides(c *gin.Context) {
	path := strings.TrimSpace(c.Query("path"))
	if path == "" || !strings.HasPrefix(path, "/") {
		fail(c, 400, "A valid page path is required")
		return
	}
	var items []PageOverride
	a.DB.Where("path = ?", path).Order("key asc").Find(&items)
	respond(c, 200, items)
}

func (a *App) listOverrides(c *gin.Context) {
	var items []PageOverride
	query := a.DB.Order("path asc, key asc")
	if path := strings.TrimSpace(c.Query("path")); path != "" {
		query = query.Where("path = ?", path)
	}
	query.Find(&items)
	respond(c, 200, items)
}

func (a *App) upsertOverride(c *gin.Context) {
	var in struct {
		Path  string `json:"path"`
		Key   string `json:"key"`
		Kind  string `json:"kind"`
		Value string `json:"value"`
		Alt   string `json:"alt"`
	}
	if c.ShouldBindJSON(&in) != nil {
		fail(c, 400, "Invalid content update")
		return
	}
	in.Path = strings.TrimSpace(in.Path)
	in.Key = strings.TrimSpace(in.Key)
	if in.Path == "" || !strings.HasPrefix(in.Path, "/") || in.Key == "" {
		fail(c, 400, "Page path and content key are required")
		return
	}
	if in.Kind != "image" && in.Kind != "background" && in.Kind != "video" && in.Kind != "section" {
		in.Kind = "text"
	}
	// Look up including soft-deleted rows. The (path,key) unique index still
	// covers a soft-deleted override, so a plain Create after a "restore"
	// would hit a unique-constraint violation. Reviving the existing row
	// (clearing DeletedAt) keeps the upsert working across edit/restore cycles.
	var item PageOverride
	result := a.DB.Unscoped().Where("path = ? AND key = ?", in.Path, in.Key).First(&item)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		item = PageOverride{Path: in.Path, Key: in.Key, Kind: in.Kind, Value: in.Value, Alt: in.Alt}
		if err := a.DB.Create(&item).Error; err != nil {
			fail(c, 500, "Could not save page content")
			return
		}
	} else if result.Error != nil {
		fail(c, 500, "Could not load page content")
		return
	} else {
		item.Kind, item.Value, item.Alt = in.Kind, in.Value, in.Alt
		item.DeletedAt = gorm.DeletedAt{} // revive if it was previously restored
		if err := a.DB.Unscoped().Save(&item).Error; err != nil {
			fail(c, 500, "Could not save page content")
			return
		}
	}
	respond(c, 200, item)
}

func (a *App) deleteOverride(c *gin.Context) {
	// Hard-delete so the (path,key) slot is freed. A soft delete would leave a
	// row behind that blocks re-saving the same field (unique index collision).
	if result := a.DB.Unscoped().Delete(&PageOverride{}, "id = ?", c.Param("id")); result.Error != nil {
		fail(c, 500, "Could not restore original content")
		return
	}
	respond(c, 200, gin.H{"deleted": true})
}
func (a *App) upsertSetting(c *gin.Context) {
	var in Setting
	if c.ShouldBindJSON(&in) != nil {
		fail(c, 400, "Invalid setting")
		return
	}
	var x Setting
	err := a.DB.Where("key = ?", c.Param("key")).First(&x).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		x = Setting{Key: c.Param("key")}
	}
	x.Value = in.Value
	x.Group = in.Group
	x.Label = in.Label
	a.DB.Save(&x)
	respond(c, 200, x)
}
func (a *App) listUsers(c *gin.Context) {
	var rows []User
	a.DB.Order("created_at").Find(&rows)
	respond(c, 200, rows)
}
func (a *App) createUser(c *gin.Context) {
	var in struct{ Name, Email, Password, Role string }
	if c.ShouldBindJSON(&in) != nil || len(in.Password) < 8 {
		fail(c, 422, "Name, email and password (8+ chars) are required")
		return
	}
	hash, _ := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	x := User{Name: in.Name, Email: strings.ToLower(in.Email), PasswordHash: string(hash), Role: in.Role, Active: true}
	if x.Role == "" {
		x.Role = "admin"
	}
	if a.DB.Create(&x).Error != nil {
		fail(c, 409, "Email already exists")
		return
	}
	respond(c, 201, x)
}
func (a *App) updateUser(c *gin.Context) {
	var x User
	if a.DB.First(&x, "id = ?", c.Param("id")).Error != nil {
		fail(c, 404, "User not found")
		return
	}
	var in struct {
		Name, Role, Password string
		Active               *bool
	}
	c.ShouldBindJSON(&in)
	if in.Name != "" {
		x.Name = in.Name
	}
	if in.Role != "" {
		x.Role = in.Role
	}
	if in.Active != nil {
		x.Active = *in.Active
	}
	if in.Password != "" {
		if len(in.Password) < 8 {
			fail(c, 422, "Password must be at least 8 characters")
			return
		}
		h, _ := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
		x.PasswordHash = string(h)
	}
	a.DB.Save(&x)
	respond(c, 200, x)
}
