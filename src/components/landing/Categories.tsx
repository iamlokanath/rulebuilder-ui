import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

const colorCycle = ["bg-primary", "bg-sky", "bg-yellow", "bg-orange", "bg-[#d64246]", "bg-green"];
const inkOn = ["text-white", "text-white", "text-ink", "text-white", "text-white", "text-white"];

export function Categories() {
  const { t, token } = useApp();
  const items = t.home.categories.items;

  const builderPath = (fieldKey?: string) => {
    const query = fieldKey
      ? `?type=contact&field=${encodeURIComponent(fieldKey)}`
      : "";
    return `/builder${query}`;
  };

  const targetFor = (fieldKey?: string) =>
    token ? builderPath(fieldKey) : `/login?next=${encodeURIComponent(builderPath(fieldKey))}`;

  return (
    <section id="categories" className="border-t border-line bg-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t.home.categories.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              {t.home.categories.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.home.categories.subtitle}</p>
          </div>
          <Link to={targetFor()} className="text-sm font-semibold text-primary hover:underline">
            {t.home.categories.seeAll} →
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {items.map((item, index) => {
            const bg = colorCycle[index % colorCycle.length];
            const tx = inkOn[index % inkOn.length];
            const big = index % 4 === 0;
            return (
              <li key={item.key}>
                <Link
                  to={targetFor(item.key)}
                  className={`group inline-flex items-center gap-3 rounded-full ${bg} ${tx} px-5 py-3 transition hover:translate-y-[-2px] hover:shadow-md ${
                    big ? "py-4 pl-3 pr-6" : ""
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${
                      tx === "text-white" ? "bg-white/15" : "bg-white/70"
                    }`}
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-semibold">{item.name}</span>
                    <span
                      className={`text-[11px] ${tx === "text-white" ? "opacity-80" : "opacity-70"}`}
                    >
                      {item.count}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
