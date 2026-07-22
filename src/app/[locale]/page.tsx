import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Quote, Star, Handshake } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeHero } from "@/components/sections/HomeHero";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { getUi } from "@/i18n/ui";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/content/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getContent(locale);
  return {
    title: { absolute: pages.home.meta.title },
    description: pages.home.meta.description,
  };
}

const WORK_IMAGES = [
  IMAGES.residentialHome,
  IMAGES.interiorFinished,
  IMAGES.construction,
  IMAGES.apartments,
  IMAGES.warehouse,
  IMAGES.civil,
];

/** Background image revealed on hover for each home service card, in order. */
const SERVICE_IMAGES = [
  IMAGES.stopWork,
  IMAGES.blueprints,
  IMAGES.structural,
  IMAGES.civil,
  IMAGES.studioTeam,
  IMAGES.residentialHome,
  IMAGES.apartments,
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { homeServices, trustLogos, testimonials, reviewPlatforms, pages } =
    getContent(locale);
  const ui = getUi(locale);
  const c = pages.home;
  const href = (p: string) => `/${locale}${p}`;

  return (
    <>
      <HomeHero locale={locale} />

      {/* ---------------- Services (6 cards, dark) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.08]" />
        <Container className="relative">
          <div className="text-center">
            <Reveal>
              <h2 className="text-display-lg text-white">{c.services.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
                {c.services.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.title} as="article" className="h-full">
                  <Link
                    href={href(service.href)}
                    className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-[transform,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-gold-500/50"
                  >
                    {/* Photo revealed on hover */}
                    <Image
                      src={SERVICE_IMAGES[i]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="absolute inset-0 -z-10 object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/85 to-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="flex items-center gap-4">
                      <span className="inline-grid size-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                        <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-lg font-semibold italic tracking-tight text-gold-400">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-navy-100">
                      {service.body}
                    </p>
                    <ul className="mt-5 grid gap-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-gold-400"
                            strokeWidth={2.5}
                          />
                          <span className="text-sm text-navy-100">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-gold-400">
                      {ui.common.learnMore}
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <ButtonLink href={href("/contact")} size="lg">
                {ui.header.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Process (5 steps) ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <div className="text-center">
            <Reveal>
              <Eyebrow align="center" className="text-navy-200">
                {c.process.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-lg text-white">{c.process.title}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
                {c.process.lead}
              </p>
            </Reveal>
          </div>

          <ol className="mx-auto mt-16 max-w-3xl">
            {c.process.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal>
                  <div className="flex gap-6 pb-10 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="tabular inline-grid size-12 shrink-0 place-items-center rounded-full bg-gold-500 font-[family-name:var(--font-display)] text-lg font-bold text-navy-950">
                        {i + 1}
                      </span>
                      {i < c.process.steps.length - 1 && (
                        <span aria-hidden className="mt-2 w-px flex-1 bg-white/15" />
                      )}
                    </div>
                    <div className="pb-2 pt-1.5">
                      <h3 className="text-xl text-white">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-navy-100">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------- Why choose (3 cards on blueprint) ---------------- */}
      <section className="relative isolate overflow-hidden bg-surface-muted py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="absolute inset-0 bg-blueprint opacity-[0.06] dark:opacity-[0.1]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-display-lg">{c.why.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {c.why.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
            {c.why.cards.map((card) => (
              <RevealItem key={card.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-8 backdrop-blur-sm">
                  <h3 className="text-xl">{card.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-700 dark:text-gold-300">
                    <Check aria-hidden className="size-4" strokeWidth={2.5} />
                    {card.pill}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-lg text-muted-foreground">
              {c.why.closing}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={href("/contact")} size="lg">
                {ui.header.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Our Work ---------------- */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow={c.work.eyebrow}
              title={c.work.title}
              lead={c.work.lead}
              maxWidth="max-w-2xl"
            />
            <Reveal delay={0.2}>
              <ButtonLink href={href("/services")} variant="outline">
                {c.work.viewAll}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORK_IMAGES.map((src, i) => (
              <RevealItem key={i}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Companies Who Trust Us (constellation) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
        <Container className="relative">
          <Reveal>
            <h2 className="text-center text-display-lg text-white">
              {c.trust.title}
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-14">
            {/* Left cluster */}
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="order-2 grid grid-cols-3 gap-5 sm:gap-6 lg:order-1"
            >
              {trustLogos.slice(0, 6).map((name) => (
                <RevealItem as="li" key={name}>
                  <LogoBadge name={name} />
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Center BT mark */}
            <Reveal className="order-1 lg:order-2">
              <div className="relative grid size-40 place-items-center rounded-full bg-gradient-to-b from-neutral-700 via-neutral-900 to-black shadow-[0_20px_60px_-15px_rgba(255,186,8,0.35)] sm:size-48">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-500/40"
                />
                <Image
                  src="/logo-mark.png"
                  alt="Builders Tech"
                  width={900}
                  height={818}
                  className="w-24 brightness-0 invert sm:w-28"
                />
              </div>
            </Reveal>

            {/* Right cluster */}
            <RevealGroup
              as="ul"
              stagger={0.06}
              className="order-3 grid grid-cols-3 gap-5 sm:gap-6"
            >
              {trustLogos.slice(6, 12).map((name) => (
                <RevealItem as="li" key={name}>
                  <LogoBadge name={name} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ---------------- Reviews (dark) ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.06]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow align="center" className="text-navy-200">
                {c.testimonials.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-lg text-white">
                {c.testimonials.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-navy-100">
                {c.testimonials.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.context} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold-500 text-gold-500" />
                    ))}
                  </span>
                  <Quote
                    aria-hidden
                    className="mt-5 size-7 text-gold-500/50"
                    strokeWidth={1.5}
                  />
                  <blockquote className="mt-3 flex-1">
                    <p className="leading-relaxed text-white">“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-navy-200">
                    {t.context}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-navy-300">
                {c.testimonials.platformsLabel}
              </span>
              {reviewPlatforms.map((p) => (
                <span
                  key={p}
                  className="font-[family-name:var(--font-display)] font-semibold text-navy-100"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Partner teaser ---------------- */}
      <Section tone="muted">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:p-16">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <Eyebrow>{c.partner.eyebrow}</Eyebrow>
                  <h2 className="mt-5 text-display-md">{c.partner.title}</h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                    {c.partner.lead}
                  </p>
                </div>
                <ButtonLink
                  href={href("/become-a-partner")}
                  size="lg"
                  className="shrink-0"
                >
                  <Handshake aria-hidden className="size-4" />
                  {c.partner.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}

/** Two-letter monogram derived from a company name. */
function monogram(name: string) {
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * A partner logo placeholder: a white circular badge with the company's
 * monogram. Drop a real logo at public/partners/<file>.png and swap the inner
 * span for an <Image> to use the actual mark.
 */
function LogoBadge({ name }: { name: string }) {
  return (
    <div
      title={name}
      className="grid size-20 place-items-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 sm:size-24"
    >
      <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-navy-700 sm:text-xl">
        {monogram(name)}
      </span>
    </div>
  );
}
