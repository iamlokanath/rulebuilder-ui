import { type ClassValue, clsx } from "clsx";
import type { ContentDictionary } from "@/types";
import axios from "axios";

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

function extractDetail(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) return error.message;
    return "";
  }
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "msg" in item) {
          return String((item as { msg: unknown }).msg);
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

function isTechnicalMessage(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    !message.trim() ||
    lower.includes("network error") ||
    lower.includes("timeout") ||
    lower.includes("econnrefused") ||
    lower.includes("etimedout") ||
    lower.includes("failed to fetch") ||
    lower.includes("axios") ||
    lower.includes("request failed") ||
    lower.includes("status code") ||
    lower.includes("internal server error") ||
    lower.includes("err_") ||
    /traceback|exception|stack/i.test(message)
  );
}

/**
 * Maps API / network failures to clear, user-friendly messages.
 * Never returns raw Network Error / technical jargon.
 */
export function getApiErrorMessage(
  error: unknown,
  messages: ContentDictionary["common"]["errors"],
  fallback?: string,
): string {
  const detail = extractDetail(error);
  const detailLower = detail.toLowerCase();

  if (
    detailLower.includes("email already registered") ||
    detailLower.includes("already registered")
  ) {
    return messages.conflict;
  }
  if (
    detailLower.includes("invalid email or password") ||
    detailLower.includes("incorrect email") ||
    detailLower.includes("incorrect password")
  ) {
    return messages.unauthorized;
  }
  if (detailLower.includes("invalid google") || detailLower.includes("google")) {
    return messages.googleFailed;
  }
  if (detailLower.includes("google authentication is not configured")) {
    return messages.unavailable;
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return messages.network;
    }
    const status = error.response.status;
    if (status === 401) {
      if (
        detailLower.includes("invalid email or password") ||
        detailLower.includes("incorrect")
      ) {
        return messages.unauthorized;
      }
      return messages.sessionExpired;
    }
    if (status === 403) return messages.forbidden;
    if (status === 404) return messages.notFound;
    if (status === 409) return messages.conflict;
    if (status === 422 || status === 400) {
      if (detail && !isTechnicalMessage(detail)) return detail;
      return messages.validation;
    }
    if (status === 503) return messages.unavailable;
    if (status >= 500) return messages.server;
  }

  if (detail && !isTechnicalMessage(detail)) {
    return detail;
  }

  return fallback || messages.generic;
}
