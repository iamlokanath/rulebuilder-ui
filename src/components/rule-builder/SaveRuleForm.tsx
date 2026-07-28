import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { FormEvent } from "react";

interface SaveRuleFormProps {
  name: string;
  description: string;
  isTemplate: boolean;
  loading: boolean;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTemplateChange: (value: boolean) => void;
  onSubmit: () => void;
}

export function SaveRuleForm({
  name,
  description,
  isTemplate,
  loading,
  onNameChange,
  onDescriptionChange,
  onTemplateChange,
  onSubmit,
}: SaveRuleFormProps) {
  const { t } = useApp();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-panel border border-surface-border bg-surface-elevated p-4 md:grid-cols-[1.2fr_1.4fr_auto_auto]"
    >
      <Input
        label={t.builder.saveName}
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        required
      />
      <Input
        label={t.builder.saveDescription}
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
      />
      <label className="flex items-end gap-2 pb-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={isTemplate}
          onChange={(event) => onTemplateChange(event.target.checked)}
          className="h-4 w-4 accent-[var(--color-brand-500)]"
        />
        {t.builder.saveAsTemplate}
      </label>
      <div className="flex items-end">
        <Button type="submit" loading={loading} className="w-full">
          {t.builder.saveSubmit}
        </Button>
      </div>
    </form>
  );
}
