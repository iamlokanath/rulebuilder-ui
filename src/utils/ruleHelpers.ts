import type { RuleItem } from "@/types";

export function validateClientRules(rules: RuleItem[]): string[] {
  const errors: string[] = [];
  if (!rules.length) {
    errors.push("empty");
    return errors;
  }

  let open = 0;
  rules.forEach((rule, index) => {
    if (!rule.type || !rule.field || !rule.operator || !String(rule.value).trim()) {
      errors.push(`required:${index + 1}`);
    }
    open += rule.group_start;
    if (rule.group_end > open) {
      errors.push("group");
      open = 0;
    } else {
      open -= rule.group_end;
    }
    if (index < rules.length - 1 && rule.next_operator === "END") {
      errors.push("end");
    }
  });

  if (open !== 0) errors.push("group");
  return errors;
}

export function buildLocalPreview(rules: RuleItem[]): string {
  return rules
    .map((rule, index) => {
      const start = "{".repeat(rule.group_start);
      const end = "}".repeat(rule.group_end);
      const clause = `${start}${rule.field} ${rule.operator} "${rule.value}"${end}`;
      if (index === rules.length - 1 || rule.next_operator === "END") return clause;
      return `${clause} ${rule.next_operator}`;
    })
    .join(" ");
}
