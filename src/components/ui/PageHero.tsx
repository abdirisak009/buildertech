import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

export function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  breadcrumb,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  image: string;
  imageAlt: string;
  /** Trail after Home. A string is treated as a single final crumb. */
  breadcrumb: string | { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const ui = getUi(locale);
  const trail =
    typeof breadcrumb === "string" ? [{ label: breadcrumb }] : breadcrumb;

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/80 to-navy-950"
      />
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
      <div
        aria-hidden
        className="absolute -right-24 top-0 h-[36rem] w-[36rem] rounded-full bg-gold-500/12 blur-[120px]"
      />

      <Container className="relative pb-20 pt-32 sm:pb-24 sm:pt-40">
        <Reveal>
          <nav aria-label={ui.a11y.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-200">
              <li>
                <Link
                  href={`/${locale}`}
                  className="transition-colors hover:text-gold-400"
                >
                  {ui.breadcrumb.home}
                </Link>
              </li>
              {trail.map((crumb, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <ChevronRight aria-hidden className="size-3.5 text-navy-300" />
                    {last || !crumb.href ? (
                      <span
                        aria-current={last ? "page" : undefined}
                        className={last ? "text-gold-400" : undefined}
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={`/${locale}${crumb.href}`}
                        className="transition-colors hover:text-gold-400"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <Eyebrow className="mt-8 text-navy-200">{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="mt-6 max-w-[18ch] text-display-lg">{title}</h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100">
            {lead}
          </p>
        </Reveal>

        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </Container>
    </section>
  );
}
