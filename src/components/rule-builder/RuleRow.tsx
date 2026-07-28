import { Button } from "@/components/ui/Button";
import {
  IconBraceClose,
  IconBraceOpen,
  IconClose,
  IconEdit,
  IconGrip,
} from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import { useApp } from "@/context/AppContext";
import type { RuleItem } from "@/types";
import { localizeField, localizeOperator, localizeType } from "@/utils/helpers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface RuleRowProps {
  rule: RuleItem;
  index: number;
  groupingActive: boolean;
  onDelete: (id: string) => void;
  onEdit: (rule: RuleItem) => void;
  onChangeNext: (id: string, next: RuleItem["next_operator"]) => void;
  onToggleGroupStart: (id: string) => void;
  onToggleGroupEnd: (id: string) => void;
}

export function RuleRow({
  rule,
  index,
  groupingActive,
  onDelete,
  onEdit,
  onChangeNext,
  onToggleGroupStart,
  onToggleGroupEnd,
}: RuleRowProps) {
  const { t } = useApp();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: rule.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-1 gap-2 rounded-control border border-surface-border bg-surface-muted/40 p-3 md:grid-cols-[auto_auto_1fr_1.2fr_0.7fr_1.2fr_auto_auto_auto] md:items-center ${
        isDragging ? "opacity-70 shadow-panel" : ""
      }`}
    >
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-surface-border bg-surface-elevated text-ink-muted"
        aria-label={t.builder.dragHint}
        {...attributes}
        {...listeners}
      >
        <IconGrip className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-ink-muted">
          {t.builder.ruleNumber} {index + 1}
        </span>
        <Button
          type="button"
          variant="danger"
          size="icon"
          onClick={() => onDelete(rule.id)}
          aria-label={t.builder.delete}
        >
          <IconClose className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-control border border-surface-border bg-surface-elevated px-3 py-2 text-sm">
        {localizeType(t, rule.type)}
      </div>
      <div className="rounded-control border border-surface-border bg-surface-elevated px-3 py-2 text-sm">
        {localizeField(t, rule.field)}
      </div>
      <div className="rounded-control border border-surface-border bg-surface-elevated px-3 py-2 text-sm">
        {localizeOperator(t, rule.operator, rule.operator)}
      </div>
      <div className="rounded-control border border-surface-border bg-surface-elevated px-3 py-2 text-sm">
        {rule.value}
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => onToggleGroupStart(rule.id)}
          aria-label={t.builder.groupOpen}
          className={groupingActive || rule.group_start > 0 ? "text-success-600" : ""}
        >
          <span className="font-mono text-xs">{ "{".repeat(Math.max(rule.group_start, 1))}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => onToggleGroupEnd(rule.id)}
          aria-label={t.builder.groupClose}
          className={rule.group_end > 0 ? "text-danger-600" : ""}
        >
          <span className="font-mono text-xs">{"}".repeat(Math.max(rule.group_end, 1))}</span>
        </Button>
        {rule.group_start > 0 ? (
          <span className="inline-flex items-center gap-1 text-success-600">
            <IconBraceOpen className="h-4 w-4" />
            <span className="font-mono text-xs">{"{".repeat(rule.group_start)}</span>
          </span>
        ) : null}
        {rule.group_end > 0 ? (
          <span className="inline-flex items-center gap-1 text-danger-600">
            <span className="font-mono text-xs">{"}".repeat(rule.group_end)}</span>
            <IconBraceClose className="h-4 w-4" />
          </span>
        ) : null}
      </div>

      <Select
        value={rule.next_operator}
        options={[
          { value: "AND", label: t.logic.and },
          { value: "OR", label: t.logic.or },
          { value: "END", label: t.logic.end },
        ]}
        onChange={(event) =>
          onChangeNext(rule.id, event.target.value as RuleItem["next_operator"])
        }
        className="min-w-[5.5rem]"
      />

      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={() => onEdit(rule)}
        aria-label={t.builder.edit}
      >
        <IconEdit className="h-4 w-4" />
      </Button>
    </div>
  );
}
