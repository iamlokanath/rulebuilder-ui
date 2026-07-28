import { cn } from "@/utils/helpers";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "success" | "outline-danger";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-ink-inverse hover:bg-brand-600 border border-brand-600 shadow-sm",
  secondary:
    "bg-surface-elevated text-ink border border-surface-border hover:bg-surface-muted",
  danger: "bg-danger-500 text-ink-inverse hover:bg-danger-600 border border-danger-600",
  success:
    "bg-success-500 text-ink-inverse hover:bg-success-600 border border-success-600",
  ghost: "bg-transparent text-ink hover:bg-surface-muted border border-transparent",
  "outline-danger":
    "bg-surface-elevated text-danger-500 border border-danger-500 hover:bg-danger-500/10",
};

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
  icon: "h-9 w-9 p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-55",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {children}
    </button>
  );
}
