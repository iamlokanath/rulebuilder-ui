import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

function QueryMap() {
  const pins = [
    { x: 70, y: 80, c: "var(--primary)" },
    { x: 180, y: 60, c: "var(--orange)" },
    { x: 260, y: 130, c: "var(--green)" },
    { x: 130, y: 170, c: "var(--sky)" },
    { x: 220, y: 220, c: "var(--red)" },
    { x: 90, y: 240, c: "var(--yellow)" },
  ];
  return (
    <svg viewBox="0 0 360 320" className="w-full" role="img" aria-hidden>
      <defs>
        <pattern id="drb-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(27,82,164,0.15)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="360" height="320" rx="20" fill="var(--soft)" />
      <rect x="0" y="0" width="360" height="320" rx="20" fill="url(#drb-dots)" />
      <path d="M0 100 C 90 90, 180 140, 360 110" stroke="white" strokeWidth="14" fill="none" />
      <path
        d="M0 100 C 90 90, 180 140, 360 110"
        stroke="rgba(27,82,164,0.2)"
        strokeWidth="1"
        fill="none"
      />
      <path d="M40 0 C 70 120, 130 180, 110 320" stroke="white" strokeWidth="10" fill="none" />
      <path d="M280 0 C 240 80, 320 200, 240 320" stroke="white" strokeWidth="8" fill="none" />
      <circle
        cx="180"
        cy="160"
        r="120"
        fill="rgba(27,82,164,0.06)"
        stroke="rgba(27,82,164,0.3)"
        strokeDasharray="4 6"
      />
      <circle cx="180" cy="160" r="6" fill="var(--primary)" />
      {pins.map((pin, index) => (
        <g key={index}>
          <circle cx={pin.x} cy={pin.y} r="14" fill={pin.c} opacity="0.18" />
          <circle cx={pin.x} cy={pin.y} r="6" fill={pin.c} />
        </g>
      ))}
    </svg>
  );
}

export function FeatureHighlight() {
  const { t, token } = useApp();
  const target = token ? "/builder" : "/login";

  return (
    <section id="live-preview" className="scroll-mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {t.home.nearby.eyebrow}
          </p>
          <h2 className="mt-2 flex items-baseline gap-3 font-extrabold leading-none text-ink">
            <span className="text-6xl text-orange sm:text-7xl">{t.home.nearby.kpi}</span>
            <span className="text-xl sm:text-2xl">{t.home.nearby.kpiLabel}</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">{t.home.nearby.body}</p>
          <Link
            to={target}
            className="mt-7 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-semibold text-primary hover:text-primary/80"
          >
            {t.home.nearby.cta} →
          </Link>
        </div>
        <div className="relative">
          <QueryMap />
        </div>
      </div>
    </section>
  );
}
