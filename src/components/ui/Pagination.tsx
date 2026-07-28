import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const { t } = useApp();
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <p className="text-sm text-ink-muted">
        {t.saved.page} {page} {t.saved.of} {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {t.common.previous}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          {t.common.next}
        </Button>
      </div>
    </div>
  );
}
