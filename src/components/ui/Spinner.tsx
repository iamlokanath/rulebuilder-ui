import { cn } from "@/utils/helpers";

interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({ label, className }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-8", className)}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-r-transparent" />
      {label ? <span className="text-sm text-ink-muted">{label}</span> : null}
    </div>
  );
}
