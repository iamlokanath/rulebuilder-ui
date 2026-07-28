import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { t } = useApp();
  const cards = t.dashboard.cards;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 sm:p-8">
        <div className="lk-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {t.dashboard.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            {t.dashboard.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.dashboard.subtitle}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/builder"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {t.dashboard.primaryCta} →
            </Link>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              {t.dashboard.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {card.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-xl font-bold text-ink">{card.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-primary">
              {card.cta} →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-line bg-soft p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {t.dashboard.tips.eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-ink">{t.dashboard.tips.title}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {t.dashboard.tips.items.map((tip) => (
            <li
              key={tip}
              className="rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink/85"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
