package config

import "os"

type Config struct {
	ServerPort     string
	JWTSecret      string
	PublicAssetURL string
	FrontendOrigin string
}

func Load() Config {
	return Config{
		ServerPort:     getenv("SERVER_PORT", "8080"),
		JWTSecret:      getenv("JWT_SECRET", "dev-jwt-secret"),
		PublicAssetURL: getenv("PUBLIC_ASSET_URL", "http://localhost:8080"),
		FrontendOrigin: getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
	}
}

func getenv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
