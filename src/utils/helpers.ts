import { type ClassValue, clsx } from "clsx";
import type { ContentDictionary } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function metaLabel(
  map: Record<string, string> | undefined,
  key: string,
  fallback?: string,
): string {
  if (!key) return fallback ?? "";
  return map?.[key] ?? fallback ?? key;
}

export function localizeType(t: ContentDictionary, key: string, fallback?: string): string {
  return metaLabel(t.meta.types as Record<string, string>, key, fallback);
}

export function localizeField(t: ContentDictionary, key: string, fallback?: string): string {
  return metaLabel(t.meta.fields as Record<string, string>, key, fallback);
}

export function localizeOperator(
  t: ContentDictionary,
  key: string,
  fallback?: string,
): string {
  return metaLabel(t.meta.operators as Record<string, string>, key, fallback);
}

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `rule-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  ) {
    const response = (error as { response?: { data?: { detail?: unknown } } })
      .response;
    const detail = response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail.map(String).join(", ");
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
