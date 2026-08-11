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
