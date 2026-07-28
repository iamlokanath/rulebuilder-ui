import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useApp } from "@/context/AppContext";
import type { RulePreview } from "@/types";

interface QueryPreviewProps {
  preview: RulePreview | null;
  loading: boolean;
}

export function QueryPreview({ preview, loading }: QueryPreviewProps) {
  const { t } = useApp();

  return (
    <Card title={t.builder.previewTitle}>
      {loading ? <Spinner label={t.common.loading} /> : null}
      {!loading && preview ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t.builder.previewText}
            </h3>
            <pre className="overflow-x-auto rounded-control bg-surface-muted p-3 font-mono text-xs text-ink whitespace-pre-wrap">
              {preview.query_text || "—"}
            </pre>
            {preview.errors.length ? (
              <ul className="mt-3 space-y-1 text-sm text-danger-600">
                {preview.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t.builder.previewJson}
            </h3>
            <pre className="overflow-x-auto rounded-control bg-surface-muted p-3 font-mono text-xs text-ink">
              {JSON.stringify(preview.query_json, null, 2)}
            </pre>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
