import { cn } from "@/utils/helpers";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <label className="flex w-full flex-col gap-1.5">
      {label ? (
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-10 w-full rounded-control border border-surface-border bg-surface-elevated px-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200",
          error && "border-danger-500",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-danger-600">{error}</span> : null}
    </label>
  );
}
