import { useApp } from "@/context/AppContext";

export function Vision() {
  const { t } = useApp();
  const blocks = t.home.vision.blocks;
  const accents = ["var(--orange)", "var(--primary)", "var(--green)", "var(--sky)"];

  return (
    <section id="vision" className="border-t border-line bg-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {t.home.vision.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            {t.home.vision.heading1}{" "}
            <span className="text-primary">{t.home.vision.heading2}</span>
          </h2>
        </div>

        <dl className="mt-12 divide-y divide-line border-y border-line">
          {blocks.map((block, index) => (
            <div key={block.label} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
              <dt className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: accents[index % accents.length] }}
                  />
                  <span className="font-display text-xl font-extrabold text-ink">
                    {block.label}
                  </span>
                </div>
              </dt>
              <dd className="text-lg leading-relaxed text-ink/85 md:col-span-8">{block.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
