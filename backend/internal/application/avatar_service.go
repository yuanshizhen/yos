package application

import (
	"context"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"path/filepath"
	"strings"
	"time"
)

type ObjectStorage interface {
	Upload(ctx context.Context, objectName, contentType string, reader io.Reader, size int64) (string, error)
}

type AvatarService struct {
	storage ObjectStorage
}

func NewAvatarService(storage ObjectStorage) *AvatarService {
	return &AvatarService{storage: storage}
}

func (s *AvatarService) Upload(ctx context.Context, file *multipart.FileHeader, userID string) (string, error) {
	if file == nil {
		return "", errors.New("missing file")
	}
	if file.Size > 3*1024*1024 {
		return "", errors.New("file exceeds 3MB")
	}

	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".webp": true}
	if !allowed[ext] {
		return "", errors.New("unsupported file type")
	}

	opened, err := file.Open()
	if err != nil {
		return "", err
	}
	defer opened.Close()

	name := fmt.Sprintf("%s/%d-%s%s", userID, time.Now().Unix(), randomSuffix(), ext)
	return s.storage.Upload(ctx, name, file.Header.Get("Content-Type"), opened, file.Size)
}

func randomSuffix() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}
