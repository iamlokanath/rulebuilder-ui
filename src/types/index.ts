export type LanguageCode = "en" | "hi" | "or";
export type ThemeMode = "light" | "dark";

export interface TypeOption {
  key: string;
  label: string;
  collection: string;
}

export interface FieldOption {
  key: string;
  label: string;
  data_type: string;
  value_source: "distinct" | "free_text";
  operators: string[];
}

export interface OperatorOption {
  key: string;
  label: string;
  symbol: string;
}

export interface RuleItem {
  id: string;
  type: string;
  field: string;
  operator: string;
  value: string;
  next_operator: "AND" | "OR" | "END";
  group_start: number;
  group_end: number;
}

export interface RulePreview {
  query_text: string;
  query_json: Record<string, unknown>;
  is_valid: boolean;
  errors: string[];
}

export interface SavedRule {
  id: string;
  name: string;
  description?: string | null;
  rules: RuleItem[];
  is_template: boolean;
  query_text: string;
  query_json: Record<string, unknown>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export type ContentDictionary = typeof import("../content/en.json");
