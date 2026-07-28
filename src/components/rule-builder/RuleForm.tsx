import { Button } from "@/components/ui/Button";
import { IconPlus } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useApp } from "@/context/AppContext";
import type { FieldOption, OperatorOption, TypeOption } from "@/types";
import { localizeField, localizeOperator, localizeType } from "@/utils/helpers";

export interface RuleDraft {
  type: string;
  field: string;
  operator: string;
  value: string;
  next_operator: "AND" | "OR" | "END";
}

interface RuleFormProps {
  draft: RuleDraft;
  types: TypeOption[];
  fields: FieldOption[];
  operators: OperatorOption[];
  values: string[];
  editing: boolean;
  loadingValues: boolean;
  onChange: (draft: RuleDraft) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
}

export function RuleForm({
  draft,
  types,
  fields,
  operators,
  values,
  editing,
  loadingValues,
  onChange,
  onSubmit,
  onCancelEdit,
}: RuleFormProps) {
  const { t } = useApp();
  const selectedField = fields.find((field) => field.key === draft.field);
  const useDistinct = selectedField?.value_source === "distinct";

  return (
    <div className="rounded-panel border border-brand-200 bg-surface-elevated p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.1fr_1.2fr_0.9fr_1.3fr_0.9fr_auto]">
        <Select
          label={t.builder.type}
          value={draft.type}
          placeholder={t.builder.select}
          options={types.map((item) => ({
            value: item.key,
            label: localizeType(t, item.key, item.label),
          }))}
          onChange={(event) =>
            onChange({
              ...draft,
              type: event.target.value,
              field: "",
              operator: "",
              value: "",
            })
          }
        />
        <Select
          label={t.builder.field}
          value={draft.field}
          placeholder={t.builder.select}
          options={fields.map((item) => ({
            value: item.key,
            label: localizeField(t, item.key, item.label),
          }))}
          onChange={(event) =>
            onChange({
              ...draft,
              field: event.target.value,
              operator: "",
              value: "",
            })
          }
          disabled={!draft.type}
        />
        <Select
          label={t.builder.operator}
          value={draft.operator}
          placeholder={t.builder.select}
          options={operators
            .filter((item) => !selectedField || selectedField.operators.includes(item.key))
            .map((item) => ({
              value: item.key,
              label: `${item.symbol} · ${localizeOperator(t, item.key, item.label)}`,
            }))}
          onChange={(event) => onChange({ ...draft, operator: event.target.value })}
          disabled={!draft.field}
        />
        {useDistinct ? (
          <Select
            label={t.builder.value}
            value={draft.value}
            placeholder={loadingValues ? t.common.loading : t.builder.select}
            options={values.map((value) => ({ value, label: value }))}
            onChange={(event) => onChange({ ...draft, value: event.target.value })}
            disabled={!draft.operator || loadingValues}
          />
        ) : (
          <Input
            label={t.builder.value}
            value={draft.value}
            placeholder={t.builder.enterValue}
            onChange={(event) => onChange({ ...draft, value: event.target.value })}
            disabled={!draft.operator}
          />
        )}
        <Select
          label={t.builder.nextOperator}
          value={draft.next_operator}
          options={[
            { value: "AND", label: t.logic.and },
            { value: "OR", label: t.logic.or },
            { value: "END", label: t.logic.end },
          ]}
          onChange={(event) =>
            onChange({
              ...draft,
              next_operator: event.target.value as RuleDraft["next_operator"],
            })
          }
        />
        <div className="flex items-end gap-2">
          <Button
            type="button"
            variant="success"
            className="w-full xl:w-auto"
            onClick={onSubmit}
          >
            <IconPlus className="h-4 w-4" />
            {editing ? t.builder.update : t.builder.add}
          </Button>
          {editing ? (
            <Button type="button" variant="secondary" onClick={onCancelEdit}>
              {t.builder.cancelEdit}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
