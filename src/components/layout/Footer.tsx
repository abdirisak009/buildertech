import Link from "next/link";
import { Mail, Phone, MapPin, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { getContent } from "@/content";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

function SocialIcon({ label }: { label: string }) {
  const common = { className: "size-[18px]", "aria-hidden": true } as const;
  if (label === "LinkedIn") {
    return (
      <svg {...common} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21H9z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.11v2.3H7.6V14h2.7v8z" />
    </svg>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const { site, services, reviewPlatforms } = getContent(locale);
  const ui = getUi(locale);
  const l = ui.footer.links;
  const href = (path: string) => `/${locale}${path}`;

  const columns = [
    {
      heading: ui.footer.company,
      links: [
        { href: "/how-it-works", label: l.howItWorks },
        { href: "/about", label: l.about },
        { href: "/faq", label: l.faq },
        { href: "/resources", label: l.resources },
        { href: "/contact", label: l.contact },
      ],
    },
    {
      heading: ui.footer.explore,
      links: [
        { href: "/products/stock-plans", label: l.stockPlans },
        { href: "/blog/irc-code-updates", label: l.ircUpdates },
        { href: "/blog/design-trends", label: l.designTrends },
        { href: "/careers/open-positions", label: l.openPositions },
        { href: "/careers/internships", label: l.internships },
      ],
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-navy-100">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-50" />
      <div
        aria-hidden
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-[120px]"
      />

      <Container className="relative pb-10 pt-20 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <Logo
              locale={locale}
              homeLabel={`${site.name} — ${ui.a11y.home}`}
              variant="onDark"
            />
            <p className="mt-3 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
              {site.headline}. {site.subhead}
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
                ))}
              </span>
              <span className="text-xs text-navy-200">
                {ui.footer.reviews("134+", reviewPlatforms.join(", "))}
              </span>
            </div>

            <ul className="mt-7 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={`${site.name} ${ui.a11y.onPlatform(s.label)}`}
                    className="inline-grid size-11 place-items-center rounded-full border border-white/15 text-navy-100 transition-colors duration-200 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={ui.footer.services}>
            <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {ui.footer.services}
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={href(`/services/${s.slug}`)}
                    className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={href(link.href)}
                      className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div className="flex items-start gap-3.5">
            <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" strokeWidth={1.75} />
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-navy-300">
                {ui.footer.phone}
              </span>
              <a
                href={`tel:${site.phoneHref}`}
                className="block font-[family-name:var(--font-display)] text-lg font-semibold text-white transition-colors hover:text-gold-400"
              >
                {site.phone}{" "}
                <span className="text-xs font-normal text-navy-300">EN</span>
              </a>
              <a
                href={`tel:${site.phoneEsHref}`}
                className="block font-[family-name:var(--font-display)] text-lg font-semibold text-white transition-colors hover:text-gold-400"
              >
                {site.phoneEs}{" "}
                <span className="text-xs font-normal text-navy-300">ES</span>
              </a>
            </span>
          </div>

          <a href={`mailto:${site.email}`} className="group flex items-start gap-3.5">
            <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" strokeWidth={1.75} />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.14em] text-navy-300">
                {ui.footer.email}
              </span>
              <span className="block break-all text-sm text-white transition-colors group-hover:text-gold-400">
                {site.email}
              </span>
            </span>
          </a>

          <div className="flex items-start gap-3.5">
            <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" strokeWidth={1.75} />
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-navy-300">
                {ui.footer.office}
              </span>
              <span className="block text-sm text-white">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {ui.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href={href("/privacy-policy")} className="transition-colors hover:text-gold-400">
              {ui.footer.privacy}
            </Link>
            <Link href={href("/terms-of-use")} className="transition-colors hover:text-gold-400">
              {ui.footer.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
