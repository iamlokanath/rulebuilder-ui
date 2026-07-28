import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="ml-2" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroVisual() {
  const { t } = useApp();
  const cards = t.home.hero.cards;
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState<"in" | "out">("in");

  useEffect(() => {
    if (cards.length <= 1) return;
    const interval = setInterval(() => {
      setAnim("out");
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % cards.length);
        setAnim("in");
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const card = cards[idx];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-x-6 bottom-0 top-6 rounded-tl-[120px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-primary" />
      <div className="absolute left-0 top-0 h-28 w-28 rounded-2xl bg-yellow" />
      <div className="absolute bottom-10 right-2 h-20 w-20 rounded-full bg-orange" />
      <div className="absolute bottom-2 left-2 h-14 w-14 rotate-12 rounded-md bg-sky" />
      <div
        key={card.title}
        className={`absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 rounded-xl bg-white p-5 shadow-2xl ring-1 ring-ink/5 transition-all duration-400 ease-out ${
          anim === "in"
            ? "translate-y-[-50%] scale-100 opacity-100"
            : "translate-y-[-60%] scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-green">
            {card.badge}
          </span>
          <span className="text-[10px] text-muted-foreground">{card.meta}</span>
        </div>
        <p className="mt-2 font-display text-lg font-bold text-ink">{card.title}</p>
        <p className="font-mono text-xs text-muted-foreground">{card.query}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {card.statLabel}
            </p>
            <p className="font-display text-xl font-extrabold text-primary">{card.stat}</p>
          </div>
          <Link
            to="/login"
            className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-primary/90"
          >
            {t.home.hero.cardCta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t, token } = useApp();
  const stats = t.home.hero.stats;
  const primaryTo = token ? "/builder" : "/login";
  const secondaryTo = token ? "/contacts" : "/login";

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="lk-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute right-0 top-24 hidden h-2 w-[55%] lg:block" aria-hidden>
        <div className="flex h-full">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-sky" />
          <div className="flex-1 bg-yellow" />
          <div className="flex-1 bg-orange" />
          <div className="flex-1 bg-[#d64246]" />
          <div className="flex-1 bg-green" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            {t.home.hero.eyebrow}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-[64px]">
            <span className="block">{t.home.hero.title1}</span>
            <span className="block text-primary">{t.home.hero.title2}</span>
            <span className="block">
              <span className="lk-underline">{t.home.hero.title3}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t.home.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              {t.home.hero.primaryCta}
              <ArrowRight />
            </Link>
            <Link
              to={secondaryTo}
              className="inline-flex items-center justify-center rounded-md border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
            >
              {t.home.hero.secondaryCta}
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {stats.map((stat) => (
              <div key={stat.v} className="bg-white px-3 py-4 text-center sm:px-4">
                <dt className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                  {stat.k}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {stat.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
