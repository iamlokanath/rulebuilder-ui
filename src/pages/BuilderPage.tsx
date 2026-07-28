import { QueryPreview } from "@/components/rule-builder/QueryPreview";
import { RuleForm, type RuleDraft } from "@/components/rule-builder/RuleForm";
import { RuleList } from "@/components/rule-builder/RuleList";
import { SaveRuleForm } from "@/components/rule-builder/SaveRuleForm";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useApp } from "@/context/AppContext";
import { metadataApi, rulesApi } from "@/services/api";
import type {
  FieldOption,
  OperatorOption,
  RuleItem,
  RulePreview,
  TypeOption,
} from "@/types";
import { createId, getApiErrorMessage } from "@/utils/helpers";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EMPTY_DRAFT: RuleDraft = {
  type: "",
  field: "",
  operator: "",
  value: "",
  next_operator: "AND",
};

export function BuilderPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillApplied = useRef(false);

  const [types, setTypes] = useState<TypeOption[]>([]);
  const [fields, setFields] = useState<FieldOption[]>([]);
  const [operators, setOperators] = useState<OperatorOption[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [draft, setDraft] = useState<RuleDraft>(EMPTY_DRAFT);
  const [rules, setRules] = useState<RuleItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [groupingActive, setGroupingActive] = useState(false);
  const [pendingGroupStart, setPendingGroupStart] = useState(0);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<RulePreview | null>(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [loadingValues, setLoadingValues] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saveName, setSaveName] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  const [isTemplate, setIsTemplate] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingMeta(true);
      try {
        const [typeData, operatorData] = await Promise.all([
          metadataApi.getTypes(),
          metadataApi.getOperators(),
        ]);
        setTypes(typeData);
        setOperators(operatorData);
      } catch (err) {
        setError(getApiErrorMessage(err, t.common.error));
      } finally {
        setLoadingMeta(false);
      }
    };
    void load();

    const raw = sessionStorage.getItem("drb_load_rules");
    if (raw) {
      try {
        setRules(JSON.parse(raw) as RuleItem[]);
      } catch {
        setRules([]);
      } finally {
        sessionStorage.removeItem("drb_load_rules");
      }
    }
  }, [t.common.error]);

  // Prefill Type + Field from homepage category chip (?type=contact&field=company)
  useEffect(() => {
    if (prefillApplied.current || loadingMeta || types.length === 0) return;
    const typeKey = searchParams.get("type") || "contact";
    const fieldKey = searchParams.get("field");
    if (!fieldKey) return;
    if (!types.some((item) => item.key === typeKey)) return;
    prefillApplied.current = true;
    setDraft((prev) => ({
      ...prev,
      type: typeKey,
      field: fieldKey,
      operator: "",
      value: "",
    }));
  }, [loadingMeta, types, searchParams]);

  useEffect(() => {
    const loadFields = async () => {
      if (!draft.type) {
        setFields([]);
        return;
      }
      try {
        const data = await metadataApi.getFields(draft.type);
        setFields(data);
      } catch (err) {
        setError(getApiErrorMessage(err, t.common.error));
      }
    };
    void loadFields();
  }, [draft.type, t.common.error]);

  // Default operator when arriving from a category chip
  useEffect(() => {
    if (!draft.field || draft.operator || fields.length === 0) return;
    if (!searchParams.get("field")) return;
    const field = fields.find((item) => item.key === draft.field);
    if (!field) return;
    const preferred = field.operators.includes("=") ? "=" : field.operators[0] || "";
    if (preferred) setDraft((prev) => ({ ...prev, operator: preferred }));
  }, [draft.field, draft.operator, fields, searchParams]);

  useEffect(() => {
    const loadValues = async () => {
      if (!draft.type || !draft.field) {
        setValues([]);
        return;
      }
      const field = fields.find((item) => item.key === draft.field);
      if (!field || field.value_source !== "distinct") {
        setValues([]);
        return;
      }
      setLoadingValues(true);
      try {
        const data = await metadataApi.getValues(draft.field, draft.type);
        setValues(data);
      } catch (err) {
        setError(getApiErrorMessage(err, t.common.error));
      } finally {
        setLoadingValues(false);
      }
    };
    void loadValues();
  }, [draft.field, draft.type, fields, t.common.error]);

  useEffect(() => {
    const runPreview = async () => {
      if (!rules.length) {
        setPreview({
          query_text: "",
          query_json: { group: [] },
          is_valid: false,
          errors: [],
        });
        return;
      }
      setLoadingPreview(true);
      try {
        const data = await rulesApi.preview(rules);
        setPreview(data);
      } catch (err) {
        setError(getApiErrorMessage(err, t.common.error));
      } finally {
        setLoadingPreview(false);
      }
    };
    void runPreview();
  }, [rules, t.common.error]);

  const canSubmitDraft = useMemo(
    () => Boolean(draft.type && draft.field && draft.operator && draft.value.trim()),
    [draft],
  );

  const submitDraft = () => {
    setError("");
    setSuccess("");
    if (!canSubmitDraft) {
      setError(t.validation.requiredFields);
      return;
    }

    if (editingId) {
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === editingId
            ? {
                ...rule,
                type: draft.type,
                field: draft.field,
                operator: draft.operator,
                value: draft.value,
                next_operator: draft.next_operator,
              }
            : rule,
        ),
      );
      setEditingId(null);
    } else {
      const nextRule: RuleItem = {
        id: createId(),
        type: draft.type,
        field: draft.field,
        operator: draft.operator,
        value: draft.value,
        next_operator: draft.next_operator,
        group_start: groupingActive ? Math.max(pendingGroupStart, 1) : pendingGroupStart,
        group_end: 0,
      };
      setRules((prev) => [...prev, nextRule]);
      if (groupingActive) {
        setPendingGroupStart(0);
      }
    }

    setDraft((prev) => ({
      ...EMPTY_DRAFT,
      type: prev.type,
      next_operator: "AND",
    }));
  };

  const saveRules = async () => {
    setError("");
    setSuccess("");
    if (!saveName.trim()) {
      setError(t.validation.saveNameRequired);
      return;
    }
    if (!preview?.is_valid) {
      setError(t.validation.invalidGroup);
      return;
    }
    setSaving(true);
    try {
      await rulesApi.save({
        name: saveName.trim(),
        description: saveDescription.trim(),
        rules,
        is_template: isTemplate,
      });
      setSuccess(t.common.success);
      setSaveName("");
      setSaveDescription("");
      setIsTemplate(false);
    } catch (err) {
      setError(getApiErrorMessage(err, t.common.error));
    } finally {
      setSaving(false);
    }
  };

  if (loadingMeta) return <Spinner label={t.common.loading} />;

  return (
    <div className="space-y-5">
      <Card
        title={t.builder.title}
        subtitle={t.builder.subtitle}
        actions={
          <>
            <Button
              variant={groupingActive ? "danger" : "secondary"}
              size="sm"
              onClick={() => {
                if (groupingActive) {
                  setGroupingActive(false);
                  setPendingGroupStart(0);
                } else {
                  setGroupingActive(true);
                  setPendingGroupStart(1);
                }
              }}
            >
              {groupingActive ? t.builder.stopGrouping : t.builder.startGrouping}
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                setGroupingActive(false);
                setPendingGroupStart(0);
                setRules((prev) =>
                  prev.map((rule) => ({ ...rule, group_start: 0, group_end: 0 })),
                );
              }}
            >
              {t.builder.resetGrouping}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <RuleForm
            draft={draft}
            types={types}
            fields={fields}
            operators={operators}
            values={values}
            editing={Boolean(editingId)}
            loadingValues={loadingValues}
            onChange={setDraft}
            onSubmit={submitDraft}
            onCancelEdit={() => {
              setEditingId(null);
              setDraft(EMPTY_DRAFT);
            }}
          />

          <Input
            label={t.builder.searchRules}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.builder.searchRules}
          />

          <div>
            <h3 className="mb-2 text-sm font-semibold text-ink">{t.builder.rulesTitle}</h3>
            <p className="mb-3 text-xs text-ink-muted">{t.builder.dragHint}</p>
            <RuleList
              rules={rules}
              groupingActive={groupingActive}
              search={search}
              onReorder={setRules}
              onDelete={(id) => setRules((prev) => prev.filter((rule) => rule.id !== id))}
              onEdit={(rule) => {
                setEditingId(rule.id);
                setDraft({
                  type: rule.type,
                  field: rule.field,
                  operator: rule.operator,
                  value: rule.value,
                  next_operator: rule.next_operator,
                });
              }}
              onChangeNext={(id, next) =>
                setRules((prev) =>
                  prev.map((rule) =>
                    rule.id === id ? { ...rule, next_operator: next } : rule,
                  ),
                )
              }
              onToggleGroupStart={(id) =>
                setRules((prev) =>
                  prev.map((rule) =>
                    rule.id === id
                      ? {
                          ...rule,
                          group_start: rule.group_start >= 2 ? 0 : rule.group_start + 1,
                        }
                      : rule,
                  ),
                )
              }
              onToggleGroupEnd={(id) =>
                setRules((prev) =>
                  prev.map((rule) =>
                    rule.id === id
                      ? {
                          ...rule,
                          group_end: rule.group_end >= 2 ? 0 : rule.group_end + 1,
                        }
                      : rule,
                  ),
                )
              }
            />
          </div>

          {error ? <Alert variant="error">{error}</Alert> : null}
          {success ? <Alert variant="success">{success}</Alert> : null}
        </div>
      </Card>

      <QueryPreview preview={preview} loading={loadingPreview} />

      <Card title={t.builder.saveTitle}>
        <div className="space-y-3">
          <SaveRuleForm
            name={saveName}
            description={saveDescription}
            isTemplate={isTemplate}
            loading={saving}
            onNameChange={setSaveName}
            onDescriptionChange={setSaveDescription}
            onTemplateChange={setIsTemplate}
            onSubmit={() => void saveRules()}
          />
          <Button
            variant="secondary"
            disabled={!preview?.is_valid}
            onClick={() => {
              sessionStorage.setItem("drb_active_rules", JSON.stringify(rules));
              navigate("/contacts");
            }}
          >
            {t.builder.applyFilter}
          </Button>
        </div>
      </Card>
    </div>
  );
}
