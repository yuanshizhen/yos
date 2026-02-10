import { useEffect } from "react";

type ToastType = "error" | "success" | "info";

export type ToastState = {
  id: number;
  message: string;
  type: ToastType;
};

export function Toast({
  toast,
  onClose,
}: {
  toast: ToastState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 2600);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div className={`toast-shell toast-${toast.type}`}>
        <span className="toast-dot" />
        <p className="toast-message">{toast.message}</p>
        <button type="button" className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
