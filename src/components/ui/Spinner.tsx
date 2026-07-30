import { cn } from "@/utils/helpers";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  label?: string;
  className?: string;
  size?: SpinnerSize;
}

const sizeClass: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

export function Spinner({ label, className, size = "md" }: SpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center gap-3", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className={cn(
          "animate-spin rounded-full border-primary border-r-transparent",
          sizeClass[size],
        )}
      />
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
      <span className="sr-only">{label || "Loading"}</span>
    </div>
  );
}

interface PageLoaderProps {
  label?: string;
  className?: string;
}

/** Centered loader for page / section content areas */
export function PageLoader({ label, className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] w-full flex-col items-center justify-center gap-3 py-12",
        className,
      )}
    >
      <Spinner size="lg" label={label} />
    </div>
  );
}

interface LoadingOverlayProps {
  label?: string;
  show?: boolean;
}

/** Full-viewport blocking overlay for auth / critical actions */
export function LoadingOverlay({ label, show = true }: LoadingOverlayProps) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-soft/70 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        {label ? <p className="text-sm font-medium text-ink">{label}</p> : null}
      </div>
    </div>
  );
}
