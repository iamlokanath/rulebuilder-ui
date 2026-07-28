import { Button } from "@/components/ui/Button";
import { IconMoon, IconSun } from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import { useApp } from "@/context/AppContext";
import type { LanguageCode } from "@/types";
import { NavLink } from "react-router-dom";

export function AppHeader() {
  const { t, language, setLanguage, theme, toggleTheme, token, logout } = useApp();

  const links = [
    { to: "/", label: t.nav.builder },
    { to: "/saved", label: t.nav.saved },
    { to: "/contacts", label: t.nav.contacts },
  ];

  return (
    <header className="border-b border-surface-border bg-surface-elevated/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-control bg-brand-500 text-center font-display text-lg leading-9 text-ink-inverse">
            {t.app.brand.slice(0, 1)}
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-ink">{t.app.brand}</p>
            <p className="text-sm text-ink-muted">{t.app.name}</p>
          </div>
        </div>

        {token ? (
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-control px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-brand-500 text-ink-inverse"
                      : "bg-surface-muted text-ink hover:bg-brand-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Select
            aria-label={t.common.language}
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            options={[
              { value: "en", label: t.languages.en },
              { value: "hi", label: t.languages.hi },
              { value: "or", label: t.languages.or },
            ]}
            className="w-32"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? t.common.darkMode : t.common.lightMode}
          >
            {theme === "light" ? (
              <IconMoon className="h-4 w-4" />
            ) : (
              <IconSun className="h-4 w-4" />
            )}
          </Button>
          {token ? (
            <Button variant="outline-danger" size="sm" onClick={logout}>
              {t.nav.logout}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
