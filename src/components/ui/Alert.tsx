import { cn } from "@/utils/helpers";
import type { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "success" | "info";
  children: ReactNode;
  className?: string;
}

const variantClass = {
  error: "border-danger-500/40 bg-danger-500/10 text-danger-700 dark:text-danger-500",
  success:
    "border-success-500/40 bg-success-500/10 text-success-700 dark:text-success-500",
  info: "border-accent-500/40 bg-accent-500/10 text-accent-600",
};

export function Alert({ variant = "info", children, className }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-control border px-3 py-2 text-sm",
        variantClass[variant],
        className,
      )}
      role="alert"
    >
      {children}
    </div>
  );
}
