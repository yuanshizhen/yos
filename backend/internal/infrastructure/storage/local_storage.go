package storage

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"yos/backend/internal/config"
)

type LocalStorage struct {
	baseDir  string
	assetURL string
}

func NewLocalStorage(cfg config.Config) (*LocalStorage, error) {
	base := getenv("AVATAR_DIR", "/tmp/yos-avatars")
	if err := os.MkdirAll(base, 0o755); err != nil {
		return nil, err
	}
	return &LocalStorage{baseDir: base, assetURL: cfg.PublicAssetURL}, nil
}

func (l *LocalStorage) Upload(_ context.Context, objectName, _ string, reader io.Reader, _ int64) (string, error) {
	fullPath := filepath.Join(l.baseDir, objectName)
	if err := os.MkdirAll(filepath.Dir(fullPath), 0o755); err != nil {
		return "", err
	}
	file, err := os.Create(fullPath)
	if err != nil {
		return "", err
	}
	defer file.Close()
	if _, err = io.Copy(file, reader); err != nil {
		return "", err
	}
	return fmt.Sprintf("%s/static/%s", l.assetURL, objectName), nil
}

func getenv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
