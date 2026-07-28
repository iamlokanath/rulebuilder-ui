import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

export function WhatWeDo() {
  const { t, token } = useApp();
  const primaryTo = token ? "/builder" : "/login";
  const secondaryTo = token ? "/contacts" : "/login";

  return (
    <section id="what" className="border-t border-line bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
          {t.home.what.eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">
          {t.home.what.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/75">{t.home.what.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to={primaryTo}
            className="inline-flex items-center justify-center rounded-md bg-yellow px-6 py-3.5 text-sm font-bold text-ink hover:bg-yellow/90"
          >
            {t.home.what.primaryCta} →
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.home.what.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
