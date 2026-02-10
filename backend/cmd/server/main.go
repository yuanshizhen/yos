package main

import (
	"log"
	"net/http"
	"os"

	"yos/backend/internal/application"
	"yos/backend/internal/config"
	"yos/backend/internal/infrastructure/storage"
	api "yos/backend/internal/interfaces/http"
)

func main() {
	cfg := config.Load()
	store, err := storage.NewLocalStorage(cfg)
	if err != nil {
		log.Fatalf("failed to initialize object storage: %v", err)
	}

	authSvc := application.NewAuthService(cfg.JWTSecret)
	avatarSvc := application.NewAvatarService(store)
	handler := api.NewHandler(authSvc, avatarSvc)

	staticDir := os.Getenv("AVATAR_DIR")
	if staticDir == "" {
		staticDir = "/tmp/yos-avatars"
	}

	router := api.NewRouter(handler, cfg.FrontendOrigin, staticDir)
	log.Printf("backend server listening on :%s", cfg.ServerPort)
	if err := http.ListenAndServe(":"+cfg.ServerPort, router); err != nil {
		log.Fatalf("server terminated: %v", err)
	}
}
