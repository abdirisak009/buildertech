import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Quote, Star, Clock, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeHero } from "@/components/sections/HomeHero";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { getUi } from "@/i18n/ui";
import { isLocale } from "@/i18n/config";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const {
    site,
    services,
    headlineOffers,
    workCategories,
    whyChooseUs,
    testimonials,
    approach,
    products,
    pages,
  } = getContent(locale);
  const ui = getUi(locale);
  const copy = pages.home;

  return (
    <>
      <HomeHero locale={locale} />

      {/* ---------------- Three headline offers ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow={copy.offers.eyebrow}
            title={copy.offers.title}
            lead={copy.offers.lead}
          />

          <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
            {headlineOffers.map((offer, i) => (
              <RevealItem key={offer.slug} as="article" className="h-full">
                <Link
                  href={`/${locale}${offer.href}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                >
                  <span
                    aria-hidden
                    className="tabular font-[family-name:var(--font-display)] text-5xl font-bold text-foreground/12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl">{offer.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {offer.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                    {ui.common.learnMore}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Services grid ---------------- */}
      <Section tone="muted">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow={copy.services.eyebrow}
              title={copy.services.title}
              lead={copy.services.lead}
              maxWidth="max-w-2xl"
            />
            <Reveal delay={0.2}>
              <ButtonLink href={`/${locale}/services`} variant="outline">
                {copy.services.allLabel}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.slug} as="article" className="h-full">
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <span className="inline-grid size-12 place-items-center rounded-xl bg-gold-500/15 text-gold-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950 dark:text-gold-400">
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
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
        </Container>
      </Section>

      {/* ---------------- Approach ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal direction="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={IMAGES.studioTeam}
                  alt={copy.approach.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>{approach.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  {copy.approach.titleBefore}
                  <span className="text-gold-600 dark:text-gold-400">
                    {copy.approach.titleAccent}
                  </span>
                  {copy.approach.titleAfter}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                  {approach.lead}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {approach.body}
                </p>
              </Reveal>

              <RevealGroup as="ul" delay={0.3} className="mt-9 space-y-4">
                {[
                  { icon: Clock, text: copy.approach.highlights[0] },
                  { icon: Star, text: copy.approach.highlights[1] },
                  { icon: MapPin, text: site.serviceArea },
                ].map(({ icon: Icon, text }) => (
                  <RevealItem as="li" key={text}>
                    <div className="flex items-start gap-3.5">
                      <Icon
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
                        strokeWidth={1.75}
                      />
                      <span className="text-muted-foreground">{text}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.38}>
                <ButtonLink
                  href={`/${locale}/how-it-works`}
                  variant="navy"
                  className="mt-9"
                >
                  {copy.approach.ctaLabel}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Work categories ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <div
          aria-hidden
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold-500/12 blur-[120px]"
        />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-navy-200">{copy.work.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">{copy.work.title}</h2>
          </Reveal>

          <RevealGroup as="ul" delay={0.16} stagger={0.04} className="mt-12 flex flex-wrap gap-2.5">
            {workCategories.map((category) => (
              <RevealItem as="li" key={category}>
                <span className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-navy-100 backdrop-blur-sm">
                  {category}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------- Why choose us ---------------- */}
      <Section>
        <Container>
          <SectionHeader eyebrow={copy.why.eyebrow} title={copy.why.title} />

          <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.number}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-5xl font-bold text-foreground/15">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Stock plans teaser ---------------- */}
      <Section tone="muted">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow={copy.stockPlans.eyebrow}
              title={copy.stockPlans.title}
              lead={copy.stockPlans.lead}
              maxWidth="max-w-2xl"
            />
            <Reveal delay={0.2}>
              <ButtonLink
                href={`/${locale}/products/stock-plans`}
                variant="outline"
              >
                {copy.stockPlans.browseLabel}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <RevealItem key={product.slug} className="h-full">
                <Link
                  href={`/${locale}/products/stock-plans`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold-500"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                    {product.size}
                  </span>
                  <h3 className="mt-2 text-base leading-snug">{product.name}</h3>
                  <span className="tabular mt-auto pt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-gold-600 dark:text-gold-400">
                    ${product.price.toLocaleString("en-US")}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Testimonial ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            align="center"
            eyebrow={copy.testimonials.eyebrow}
            title={copy.testimonials.title}
            maxWidth="max-w-2xl"
          />

          <RevealGroup className="mx-auto mt-14 max-w-3xl">
            {testimonials.map((t) => (
              <RevealItem key={t.author}>
                <figure className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
                  <Quote
                    aria-hidden
                    className="mx-auto size-8 text-gold-500"
                    strokeWidth={1.5}
                  />
                  <blockquote className="mt-6">
                    <p className="font-[family-name:var(--font-display)] text-xl leading-snug tracking-tight sm:text-2xl">
                      “{t.quote}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 text-sm">
                    <span className="block font-semibold text-foreground">
                      {t.author}
                    </span>
                    <span className="text-subtle-foreground">{t.context}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
