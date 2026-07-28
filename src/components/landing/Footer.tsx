import { BrandLogo } from "@/components/layout/BrandLogo";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";

export function Footer() {
  const { t } = useApp();
  const platformLinks = t.home.footer.links;
  const companyLinks = t.home.footer.company;
  const legalLinks = t.home.footer.legal;
  const footer = t.home.footer;

  return (
    <footer id="footer" className="bg-white">
      <div className="h-1.5 w-full">
        <div className="mx-auto flex h-full max-w-none">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-sky" />
          <div className="flex-1 bg-yellow" />
          <div className="flex-1 bg-orange" />
          <div className="flex-1 bg-[#d64246]" />
          <div className="flex-1 bg-green" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{footer.tagline}</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              {footer.companyLine}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              {footer.address}
            </p>
          </div>
          <FooterCol title={footer.linksTitle} items={platformLinks} />
          <FooterCol title={footer.companyTitle} items={companyLinks} />
          <FooterCol title={footer.legalTitle} items={legalLinks} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.rights}</span>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-left sm:text-right">
              {footer.madeInPrefix}{" "}
              <a
                href={footer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {footer.madeInName}
              </a>
            </p>
            <div className="flex items-center gap-2">
              <a
                href={footer.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={footer.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.722.5.094.682-.222.682-.493 0-.243-.009-.888-.014-1.743-2.782.617-3.369-1.38-3.369-1.38-.455-1.183-1.11-1.498-1.11-1.498-.908-.637.069-.624.069-.624 1.004.072 1.532 1.056 1.532 1.056.892 1.568 2.341 1.115 2.91.853.091-.662.35-1.115.636-1.372-2.22-.26-4.555-1.143-4.555-5.086 0-1.124.39-2.043 1.029-2.764-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.055A9.3 9.3 0 0 1 12 6.912a9.3 9.3 0 0 1 2.504.345c1.909-1.331 2.748-1.055 2.748-1.055.546 1.412.203 2.454.1 2.714.64.721 1.028 1.64 1.028 2.764 0 3.953-2.338 4.823-4.566 5.077.36.318.68.945.68 1.905 0 1.374-.012 2.481-.012 2.819 0 .274.18.593.688.492C19.138 20.617 22 16.78 22 12.253 22 6.586 17.523 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
