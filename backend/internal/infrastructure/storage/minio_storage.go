package storage

import (
	"context"
	"fmt"
	"io"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"yos/backend/internal/config"
)

type MinioStorage struct {
	client   *minio.Client
	bucket   string
	assetURL string
}

func NewMinioStorage(cfg config.Config) (*MinioStorage, error) {
	client, err := minio.New(cfg.MinioEndpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.MinioAccessKey, cfg.MinioSecretKey, ""),
		Secure: cfg.MinioUseSSL,
	})
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	err = client.MakeBucket(ctx, cfg.MinioBucket, minio.MakeBucketOptions{})
	if err != nil {
		exists, exErr := client.BucketExists(ctx, cfg.MinioBucket)
		if exErr != nil || !exists {
			return nil, err
		}
	}

	return &MinioStorage{client: client, bucket: cfg.MinioBucket, assetURL: cfg.PublicAssetURL}, nil
}

func (m *MinioStorage) Upload(ctx context.Context, objectName, contentType string, reader io.Reader, size int64) (string, error) {
	_, err := m.client.PutObject(ctx, m.bucket, objectName, reader, size, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%s/%s/%s", m.assetURL, m.bucket, objectName), nil
}
