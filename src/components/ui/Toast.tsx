import { useToast, type ToastItem } from "@/context/ToastContext";
import { cn } from "@/utils/helpers";
import { CheckCircle2, X, XCircle } from "lucide-react";

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const isSuccess = toast.variant === "success";
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg shadow-primary/10",
        "animate-[lk-toast-in_0.25s_ease-out]",
        isSuccess ? "border-success-500/35" : "border-danger-500/35",
      )}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" aria-hidden />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" aria-hidden />
      )}
      <p
        className={cn(
          "flex-1 text-sm font-medium leading-snug",
          isSuccess ? "text-ink" : "text-ink",
        )}
      >
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="rounded-md p-1 text-muted-foreground transition hover:bg-soft hover:text-ink"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  if (!toasts.length) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[min(100vw-2rem,24rem)] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}
