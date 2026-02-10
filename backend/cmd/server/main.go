package main

import (
	"context"
	"log"
	"net/http"

	"yos/backend/internal/application"
	"yos/backend/internal/config"
	"yos/backend/internal/infrastructure/db"
	"yos/backend/internal/infrastructure/storage"
	api "yos/backend/internal/interfaces/http"
)

func main() {
	cfg := config.Load()
	ctx := context.Background()

	pool, err := db.NewPool(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("failed to connect db: %v", err)
	}
	defer pool.Close()

	store, err := storage.NewMinioStorage(cfg)
	if err != nil {
		log.Fatalf("failed to initialize minio storage: %v", err)
	}

	authSvc := application.NewAuthService(cfg.JWTSecret, pool)
	avatarSvc := application.NewAvatarService(store, pool)
	handler := api.NewHandler(authSvc, avatarSvc)
	router := api.NewRouter(handler, cfg.FrontendOrigin)

	log.Printf("backend server listening on :%s", cfg.ServerPort)
	if err := http.ListenAndServe(":"+cfg.ServerPort, router); err != nil {
		log.Fatalf("server terminated: %v", err)
	}
}
