import { cn } from "@/utils/helpers";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function Card({ children, className, title, subtitle, actions }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-panel border border-surface-border bg-surface-elevated p-4 shadow-panel sm:p-5",
        className,
      )}
    >
      {(title || actions) && (
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
            ) : null}
            {subtitle ? <p className="mt-1 text-sm text-ink-muted">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}
