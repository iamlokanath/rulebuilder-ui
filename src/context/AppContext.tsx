import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import en from "@/content/en.json";
import hi from "@/content/hi.json";
import or from "@/content/or.json";
import type { ContentDictionary, LanguageCode, ThemeMode } from "@/types";
import { applyTheme } from "@/utils/theme";

const dictionaries: Record<LanguageCode, ContentDictionary> = { en, hi, or };

interface AppContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: ContentDictionary;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  const stored = localStorage.getItem("drb_language") as LanguageCode | null;
  if (stored && dictionaries[stored]) return stored;
  const envLang = import.meta.env.VITE_DEFAULT_LANGUAGE as LanguageCode | undefined;
  return envLang && dictionaries[envLang] ? envLang : "en";
}

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem("drb_theme") as ThemeMode | null;
  if (stored === "light" || stored === "dark") return stored;
  const envTheme = import.meta.env.VITE_DEFAULT_THEME as ThemeMode | undefined;
  return envTheme === "dark" ? "dark" : "light";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });
  const [token, setTokenState] = useState<string | null>(
    () => localStorage.getItem("drb_token"),
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("drb_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("drb_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: LanguageCode) => {
    setLanguageState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setToken = useCallback((next: string | null) => {
    setTokenState(next);
    if (next) localStorage.setItem("drb_token", next);
    else localStorage.removeItem("drb_token");
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      toggleTheme,
      t: dictionaries[language],
      token,
      setToken,
      logout,
    }),
    [language, setLanguage, theme, toggleTheme, token, setToken, logout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
