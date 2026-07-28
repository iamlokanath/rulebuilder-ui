import { RuleRow } from "@/components/rule-builder/RuleRow";
import { useApp } from "@/context/AppContext";
import type { RuleItem } from "@/types";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface RuleListProps {
  rules: RuleItem[];
  groupingActive: boolean;
  search: string;
  onReorder: (rules: RuleItem[]) => void;
  onDelete: (id: string) => void;
  onEdit: (rule: RuleItem) => void;
  onChangeNext: (id: string, next: RuleItem["next_operator"]) => void;
  onToggleGroupStart: (id: string) => void;
  onToggleGroupEnd: (id: string) => void;
}

export function RuleList({
  rules,
  groupingActive,
  search,
  onReorder,
  onDelete,
  onEdit,
  onChangeNext,
  onToggleGroupStart,
  onToggleGroupEnd,
}: RuleListProps) {
  const { t } = useApp();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const filtered = rules.filter((rule) => {
    if (!search.trim()) return true;
    const haystack = `${rule.type} ${rule.field} ${rule.operator} ${rule.value}`.toLowerCase();
    return haystack.includes(search.trim().toLowerCase());
  });

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = rules.findIndex((rule) => rule.id === active.id);
    const newIndex = rules.findIndex((rule) => rule.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(rules, oldIndex, newIndex));
  };

  if (!rules.length) {
    return (
      <div className="rounded-panel border border-dashed border-surface-border px-4 py-10 text-center text-sm text-ink-muted">
        {t.builder.emptyRules}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={filtered.map((rule) => rule.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {filtered.map((rule) => {
            const index = rules.findIndex((item) => item.id === rule.id);
            return (
              <RuleRow
                key={rule.id}
                rule={rule}
                index={index}
                groupingActive={groupingActive}
                onDelete={onDelete}
                onEdit={onEdit}
                onChangeNext={onChangeNext}
                onToggleGroupStart={onToggleGroupStart}
                onToggleGroupEnd={onToggleGroupEnd}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
