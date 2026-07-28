import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const { t, token, logout } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const publicLinks = [
    { to: "/#categories", label: t.home.categories.eyebrow },
    { to: "/#vision", label: t.home.vision.eyebrow },
    { to: "/#what", label: t.home.what.eyebrow },
  ];

  const appLinks = [
    { to: "/dashboard", label: t.nav.dashboard },
    { to: "/builder", label: t.nav.builder },
    { to: "/saved", label: t.nav.saved },
    { to: "/contacts", label: t.nav.contacts },
  ];

  const links = token ? appLinks : isHome ? publicLinks : [];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <Link to="/" className="flex items-center">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) =>
            link.to.includes("#") ? (
              <a
                key={link.to}
                href={link.to}
                className="text-sm font-medium text-ink/80 transition hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-primary ${
                    isActive ? "text-primary" : "text-ink/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {token ? (
            <>
              <Link
                to="/builder"
                className="rounded-md bg-[#f15a2b] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e04a1c]"
              >
                {t.nav.primaryCta}
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-primary/90"
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md bg-[#f15a2b] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e04a1c]"
              >
                {t.nav.primaryCta}
              </Link>
              <Link
                to="/login"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-primary/90"
              >
                {t.nav.secondaryCta}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={t.nav.menu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((link) =>
              link.to.includes("#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-3 text-sm font-medium text-ink"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-3 text-sm font-medium text-ink"
                >
                  {link.label}
                </NavLink>
              ),
            )}
            <div className="mt-3 flex flex-col gap-2">
              <LanguageSwitcher />
              {token ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="rounded-md bg-primary px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
                >
                  {t.nav.logout}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-primary px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white"
                >
                  {t.nav.login} →
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
