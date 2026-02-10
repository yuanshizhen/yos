package http

import (
	"net/http"
)

func NewRouter(h *Handler, frontendOrigin string, staticDir string) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("/api/v1/auth/login", withCORS(frontendOrigin, withMethod("POST", h.Login)))
	mux.HandleFunc("/api/v1/upload/avatar", withCORS(frontendOrigin, withMethod("POST", h.UploadAvatar)))
	mux.Handle("/static/", withCORS(frontendOrigin, http.StripPrefix("/static/", http.FileServer(http.Dir(staticDir)))))
	return mux
}

func withMethod(method string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		if r.Method != method {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		next(w, r)
	}
}

func withCORS(origin string, next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		next.ServeHTTP(w, r)
	}
}
