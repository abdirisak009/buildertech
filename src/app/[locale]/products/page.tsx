import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
import { isLocale, LOCALES } from "@/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { metadata } = getContent(locale).pages.products;
  return { title: metadata.title, description: metadata.description };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { products, productNotes, pages } = getContent(locale);
  const c = pages.products;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={c.hero.breadcrumb}
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titleBefore}{" "}
            <span className="text-gold-500">{c.hero.titleAccent}</span>
            {c.hero.titleAfter}
          </>
        }
        lead={c.hero.lead}
        image={IMAGES.heroProducts}
        imageAlt={c.hero.imageAlt}
      />

      {/* ---------------- Stock plans ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <SectionHeader
                eyebrow={c.stock.eyebrow}
                title={c.stock.title}
                lead={c.stock.lead}
              />
              <Reveal delay={0.24}>
                <Link
                  href={`/${locale}/products/stock-plans`}
                  className="group mt-9 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-semibold text-navy-700 dark:text-gold-400"
                >
                  {c.stock.browse(products.length)}
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <Link
                href={`/${locale}/products/stock-plans`}
                className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 text-white transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 sm:p-10"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-blueprint opacity-70"
                />
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 size-72 rounded-full bg-gold-500/15 blur-[100px]"
                />
                <div
                  aria-hidden
                  className="absolute inset-6 border border-white/12"
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.2em] text-navy-200">
                    {c.stock.cardPrice}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                    {c.stock.cardTitle}
                  </p>
                  <p className="mt-4 leading-relaxed text-navy-100">
                    {c.stock.cardBody}
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Notes ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader eyebrow={c.notes.eyebrow} title={c.notes.title} />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {productNotes.map((note) => (
              <RevealItem key={note.title} as="article" className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface p-8">
                  <h3 className="text-lg">{note.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {note.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection
        locale={locale}
        eyebrow={c.cta.eyebrow}
        title={c.cta.title}
        lead={c.cta.lead}
      />
    </>
  );
}
