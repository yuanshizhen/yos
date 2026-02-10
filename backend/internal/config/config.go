package config

import "os"

type Config struct {
	ServerPort     string
	JWTSecret      string
	PublicAssetURL string
	FrontendOrigin string
	MinioEndpoint  string
	MinioAccessKey string
	MinioSecretKey string
	MinioBucket    string
	MinioUseSSL    bool
	DatabaseURL    string
}

func Load() Config {
	return Config{
		ServerPort:     getenv("SERVER_PORT", "8080"),
		JWTSecret:      getenv("JWT_SECRET", "dev-jwt-secret"),
		PublicAssetURL: getenv("PUBLIC_ASSET_URL", "http://localhost:9000"),
		FrontendOrigin: getenv("FRONTEND_ORIGIN", "http://localhost"),
		MinioEndpoint:  getenv("MINIO_ENDPOINT", "minio:9000"),
		MinioAccessKey: getenv("MINIO_ACCESS_KEY", "minioadmin"),
		MinioSecretKey: getenv("MINIO_SECRET_KEY", "minioadmin"),
		MinioBucket:    getenv("MINIO_BUCKET", "avatars"),
		MinioUseSSL:    getenv("MINIO_USE_SSL", "false") == "true",
		DatabaseURL:    getenv("DATABASE_URL", "postgres://yos:yos123456@timescaledb:5432/yos?sslmode=disable"),
	}
}

func getenv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
