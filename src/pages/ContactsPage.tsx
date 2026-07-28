import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { Table } from "@/components/ui/Table";
import { useApp } from "@/context/AppContext";
import { contactsApi } from "@/services/api";
import type { RuleItem } from "@/types";
import { getApiErrorMessage } from "@/utils/helpers";
import { useEffect, useState } from "react";

export function ContactsPage() {
  const { t } = useApp();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeRules, setActiveRules] = useState<RuleItem[] | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("drb_active_rules");
    if (raw) {
      try {
        setActiveRules(JSON.parse(raw) as RuleItem[]);
      } catch {
        setActiveRules(null);
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = activeRules?.length
          ? await contactsApi.filter(activeRules, { page, page_size: 10 })
          : await contactsApi.list({
              page,
              page_size: 10,
              search: search || undefined,
            });
        setItems(data.items);
        setTotalPages(data.total_pages);
        setTotal(data.total);
      } catch (err) {
        setError(getApiErrorMessage(err, t.common.error));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [page, search, activeRules, t.common.error]);

  return (
    <Card
      title={t.contacts.title}
      subtitle={t.contacts.subtitle}
      actions={
        <p className="text-sm text-ink-muted">
          {t.contacts.total}: {total}
        </p>
      }
    >
      {!activeRules?.length ? (
        <div className="mb-4">
          <Input
            label={t.contacts.search}
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
          />
        </div>
      ) : null}

      {error ? <Alert variant="error">{error}</Alert> : null}
      {loading ? <Spinner label={t.common.loading} /> : null}

      {!loading ? (
        <>
          <Table
            rows={items}
            rowKey={(row) => String(row.id)}
            emptyMessage={t.contacts.empty}
            columns={[
              {
                key: "name",
                header: t.contacts.columns.name,
                render: (row) => `${row.first_name} ${row.last_name}`,
              },
              {
                key: "company",
                header: t.contacts.columns.company,
                render: (row) => String(row.company),
              },
              {
                key: "industry",
                header: t.contacts.columns.industry,
                render: (row) => String(row.industry),
              },
              {
                key: "job_title",
                header: t.contacts.columns.jobTitle,
                render: (row) => String(row.job_title),
              },
              {
                key: "source",
                header: t.contacts.columns.source,
                render: (row) => String(row.source),
              },
              {
                key: "status",
                header: t.contacts.columns.status,
                render: (row) => String(row.status),
              },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </Card>
  );
}
