import { useApp } from "@/context/AppContext";

export function TrustedBy() {
  const { t } = useApp();
  const brands = t.home.employers.brands;
  const loop = [...brands, ...brands];

  return (
    <section id="employers" className="overflow-hidden border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {t.home.employers.eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
          {t.home.employers.title}
        </h2>
      </div>
      <div className="relative border-y border-line bg-soft py-6">
        <div className="lk-marquee flex w-max gap-10 px-4">
          {loop.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em] text-ink/50"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
