package application

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"yos/backend/internal/domain"
)

type AuthService struct {
	secret []byte
}

func NewAuthService(secret string) *AuthService {
	return &AuthService{secret: []byte(secret)}
}

func (s *AuthService) Login(req domain.LoginRequest) (domain.LoginResponse, error) {
	if req.Username == "" || req.Password == "" {
		return domain.LoginResponse{}, errors.New("invalid credentials")
	}
	userID, err := randomID()
	if err != nil {
		return domain.LoginResponse{}, err
	}
	user := domain.User{ID: userID, Username: req.Username}
	token, err := s.sign(fmt.Sprintf("%s|%s|%d", user.ID, user.Username, time.Now().Add(24*time.Hour).Unix()))
	if err != nil {
		return domain.LoginResponse{}, err
	}
	return domain.LoginResponse{Token: token, User: user}, nil
}

func (s *AuthService) sign(payload string) (string, error) {
	mac := hmac.New(sha256.New, s.secret)
	if _, err := mac.Write([]byte(payload)); err != nil {
		return "", err
	}
	signature := hex.EncodeToString(mac.Sum(nil))
	return base64.RawURLEncoding.EncodeToString([]byte(payload + "." + signature)), nil
}

func randomID() (string, error) {
	buf := make([]byte, 16)
	if _, err := rand.Read(buf); err != nil {
		return "", err
	}
	return hex.EncodeToString(buf), nil
}
