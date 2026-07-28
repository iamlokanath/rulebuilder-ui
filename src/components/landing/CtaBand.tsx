import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

export function CtaBand() {
  const { t, token } = useApp();
  const bullets = t.home.refer.bullets;
  const target = token ? "/builder" : "/login";

  return (
    <section id="features-band" className="relative overflow-hidden bg-primary text-white">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky/40 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-yellow/30 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            {t.home.refer.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
            {t.home.refer.title}{" "}
            <span className="text-yellow">{t.home.refer.amount}</span>{" "}
            {t.home.refer.afterAmount}
          </h2>
          <p className="mt-5 max-w-xl text-white/85">{t.home.refer.body}</p>
          <Link
            to={target}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-yellow px-6 py-3.5 text-sm font-bold text-ink hover:bg-yellow/90"
          >
            {t.home.refer.cta} →
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/15 lg:col-span-5">
          {bullets.map((bullet, index) => (
            <li key={bullet} className="bg-primary px-5 py-6">
              <span className="font-display text-3xl font-extrabold text-yellow">
                0{index + 1}
              </span>
              <p className="mt-2 text-sm font-semibold leading-snug text-white">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
