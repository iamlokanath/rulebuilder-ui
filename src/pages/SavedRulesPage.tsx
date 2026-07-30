import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { PageLoader } from "@/components/ui/Spinner";
import { Table } from "@/components/ui/Table";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { rulesApi } from "@/services/api";
import type { RuleItem, SavedRule } from "@/types";
import { getApiErrorMessage } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SavedRulesPage() {
  const { t } = useApp();
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const navigate = useNavigate();
  const [items, setItems] = useState<SavedRule[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [templatesOnly, setTemplatesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await rulesApi.list({
          page,
          page_size: 8,
          search: search || undefined,
          templates_only: templatesOnly,
        });
        setItems(data.items);
        setTotalPages(data.total_pages);
      } catch (err) {
        toastRef.current.error(
          getApiErrorMessage(err, t.common.errors, t.common.toasts.loadFailed),
        );
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [page, search, templatesOnly, t.common.errors, t.common.toasts.loadFailed]);

  const loadRule = (rule: SavedRule) => {
    const normalized: RuleItem[] = rule.rules.map((item, index) => ({
      ...item,
      id: item.id || `loaded-${index}-${Date.now()}`,
    }));
    sessionStorage.setItem("drb_load_rules", JSON.stringify(normalized));
    navigate("/builder");
  };

  const removeRule = async (id: string) => {
    setDeletingId(id);
    try {
      await rulesApi.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success(t.common.toasts.ruleDeleted);
    } catch (err) {
      toast.error(getApiErrorMessage(err, t.common.errors, t.common.toasts.deleteFailed));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card title={t.saved.title} subtitle={t.saved.subtitle}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          label={t.saved.search}
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
        />
        <label className="flex items-center gap-2 pb-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={templatesOnly}
            onChange={(event) => {
              setPage(1);
              setTemplatesOnly(event.target.checked);
            }}
            className="h-4 w-4 accent-[var(--color-brand-500)]"
          />
          {t.saved.templatesOnly}
        </label>
      </div>

      {loading ? <PageLoader label={t.common.loading} /> : null}

      {!loading ? (
        <>
          <Table
            rows={items}
            rowKey={(row) => row.id}
            emptyMessage={t.saved.empty}
            columns={[
              {
                key: "name",
                header: t.builder.saveName,
                render: (row) => (
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-xs text-ink-muted">{row.description}</p>
                  </div>
                ),
              },
              {
                key: "query",
                header: t.builder.previewText,
                render: (row) => (
                  <span className="font-mono text-xs">{row.query_text}</span>
                ),
              },
              {
                key: "template",
                header: t.builder.saveAsTemplate,
                render: (row) => (row.is_template ? "✓" : "—"),
              },
              {
                key: "actions",
                header: t.common.actions,
                render: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => loadRule(row)}>
                      {t.saved.load}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      loading={deletingId === row.id}
                      onClick={() => void removeRule(row.id)}
                    >
                      {t.saved.delete}
                    </Button>
                  </div>
                ),
              },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </Card>
  );
}
