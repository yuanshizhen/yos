package http

import (
	"encoding/json"
	"net/http"

	"yos/backend/internal/application"
	"yos/backend/internal/domain"
)

type Handler struct {
	authSvc   *application.AuthService
	avatarSvc *application.AvatarService
}

func NewHandler(auth *application.AuthService, avatar *application.AvatarService) *Handler {
	return &Handler{authSvc: auth, avatarSvc: avatar}
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req domain.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": err.Error()})
		return
	}
	res, err := h.authSvc.Login(r.Context(), req)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"message": "用户名或密码错误"})
		return
	}
	writeJSON(w, http.StatusOK, res)
}

func (h *Handler) UploadAvatar(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "缺少用户ID"})
		return
	}
	if err := r.ParseMultipartForm(4 << 20); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "解析文件失败"})
		return
	}
	_, fileHeader, err := r.FormFile("avatar")
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "缺少头像文件"})
		return
	}
	url, err := h.avatarSvc.Upload(r.Context(), fileHeader, userID)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"avatarUrl": url})
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
