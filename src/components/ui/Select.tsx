import { cn } from "@/utils/helpers";
import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
  error?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || props.name;
  return (
    <label className="flex w-full flex-col gap-1.5">
      {label ? (
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {label}
        </span>
      ) : null}
      <select
        id={selectId}
        className={cn(
          "h-10 w-full rounded-control border border-surface-border bg-surface-elevated px-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200",
          error && "border-danger-500",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-danger-600">{error}</span> : null}
    </label>
  );
}
