package application

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"yos/backend/internal/domain"
)

type AuthService struct {
	secret []byte
	db     *pgxpool.Pool
}

func NewAuthService(secret string, db *pgxpool.Pool) *AuthService {
	return &AuthService{secret: []byte(secret), db: db}
}

func (s *AuthService) Login(ctx context.Context, req domain.LoginRequest) (domain.LoginResponse, error) {
	if req.Username == "" || req.Password == "" {
		return domain.LoginResponse{}, errors.New("invalid credentials")
	}

	var user domain.User
	var passwordHash string
	err := s.db.QueryRow(ctx, `SELECT id::text, username, password_hash, COALESCE(avatar_url, '') FROM users WHERE username=$1 LIMIT 1`, req.Username).
		Scan(&user.ID, &user.Username, &passwordHash, &user.AvatarURL)
	if err != nil {
		return domain.LoginResponse{}, errors.New("invalid credentials")
	}

	inputHash := sha256.Sum256([]byte(req.Password))
	if hex.EncodeToString(inputHash[:]) != passwordHash {
		return domain.LoginResponse{}, errors.New("invalid credentials")
	}

	claims := jwt.MapClaims{
		"sub":      user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString(s.secret)
	if err != nil {
		return domain.LoginResponse{}, err
	}

	return domain.LoginResponse{Token: signed, User: user}, nil
}
