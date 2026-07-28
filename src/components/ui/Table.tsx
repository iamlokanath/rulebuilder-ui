import { cn } from "@/utils/helpers";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage: string;
}

export function Table<T>({ columns, rows, rowKey, emptyMessage }: TableProps<T>) {
  if (!rows.length) {
    return <p className="py-8 text-center text-sm text-ink-muted">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-control border border-surface-border">
      <table className="min-w-full divide-y divide-surface-border text-left text-sm">
        <thead className="bg-surface-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-3 py-2.5 font-medium text-ink-muted",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border bg-surface-elevated">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-surface-muted/60">
              {columns.map((column) => (
                <td key={column.key} className={cn("px-3 py-2.5 text-ink", column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
