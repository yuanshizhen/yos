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

	"github.com/jackc/pgx/v5/pgxpool"
)

type ObjectStorage interface {
	Upload(ctx context.Context, objectName, contentType string, reader io.Reader, size int64) (string, error)
}

type AvatarService struct {
	storage ObjectStorage
	db      *pgxpool.Pool
}

func NewAvatarService(storage ObjectStorage, db *pgxpool.Pool) *AvatarService {
	return &AvatarService{storage: storage, db: db}
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

	name := fmt.Sprintf("%s/%d%s", userID, time.Now().UnixNano(), ext)
	url, err := s.storage.Upload(ctx, name, file.Header.Get("Content-Type"), opened, file.Size)
	if err != nil {
		return "", err
	}

	_, _ = s.db.Exec(ctx, `UPDATE users SET avatar_url=$1 WHERE id::text=$2`, url, userID)
	return url, nil
}
