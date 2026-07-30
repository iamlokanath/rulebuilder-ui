import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "error";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  success: (message: string) => void;
  error: (message: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (variant: ToastVariant, message: string) => {
      const text = message.trim();
      if (!text) return;
      const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev.slice(-4), { id, variant, message: text }]);
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  const success = useCallback((message: string) => push("success", message), [push]);
  const error = useCallback((message: string) => push("error", message), [push]);

  const value = useMemo(
    () => ({ toasts, success, error, dismiss }),
    [toasts, success, error, dismiss],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
