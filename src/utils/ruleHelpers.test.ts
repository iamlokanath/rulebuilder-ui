import { describe, expect, it } from "vitest";
import { buildLocalPreview, validateClientRules } from "../utils/ruleHelpers";
import type { RuleItem } from "../types";

const sampleRules: RuleItem[] = [
  {
    id: "1",
    type: "contact",
    field: "company",
    operator: "=",
    value: "INFOTREE",
    next_operator: "AND",
    group_start: 1,
    group_end: 0,
  },
  {
    id: "2",
    type: "contact",
    field: "industry",
    operator: "=",
    value: "Software",
    next_operator: "END",
    group_start: 0,
    group_end: 1,
  },
];

describe("ruleHelpers", () => {
  it("validates balanced rules", () => {
    expect(validateClientRules(sampleRules)).toEqual([]);
  });

  it("detects unbalanced groups", () => {
    const broken = [{ ...sampleRules[0], group_end: 0, next_operator: "END" as const }];
    expect(validateClientRules(broken)).toContain("group");
  });

  it("builds readable preview text", () => {
    const text = buildLocalPreview(sampleRules);
    expect(text).toContain('company = "INFOTREE"');
    expect(text).toContain("AND");
  });
});
