import { useApp } from "@/context/AppContext";
import type { LanguageCode } from "@/types";
import { Check, ChevronDown, ChevronUp, Languages, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LANGS: { code: LanguageCode; labelKey: "en" | "hi" | "or"; native: string }[] = [
  { code: "en", labelKey: "en", native: "English" },
  { code: "hi", labelKey: "hi", native: "हिंदी" },
  { code: "or", labelKey: "or", native: "ଓଡ଼ିଆ" },
];

export function LanguageSwitcher() {
  const { t, language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = LANGS.find((item) => item.code === language) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:border-primary/40 hover:bg-soft"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages className="h-4 w-4 text-ink/70" />
        {active.native}
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={t.languageSwitcher.ariaSelect}
          className="absolute right-0 top-[calc(100%+10px)] z-[80] w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-line"
        >
          <div className="flex items-start justify-between px-5 pb-3 pt-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">{t.languageSwitcher.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.languageSwitcher.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.languageSwitcher.close}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e94e3a] text-white hover:bg-[#d63b27]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul role="listbox" className="max-h-[60vh] overflow-y-auto pb-2">
            {LANGS.map((item) => {
              const isActive = language === item.code;
              return (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-5 py-2.5 text-left transition ${
                      isActive ? "bg-[#eaf2ff]" : "hover:bg-soft"
                    }`}
                  >
                    <span>
                      <span
                        className={`block text-sm font-semibold ${isActive ? "text-primary" : "text-ink"}`}
                      >
                        {t.languages[item.labelKey]}
                      </span>
                      <span className="block text-xs text-muted-foreground">{item.native}</span>
                    </span>
                    {isActive ? <Check className="h-4 w-4 text-primary" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
