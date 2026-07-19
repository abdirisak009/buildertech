import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProductGallery } from "@/components/sections/ProductGallery";

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
  const { metadata } = getContent(locale).pages.stockPlans;
  return { title: metadata.title, description: metadata.description };
}

export default async function StockPlansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { products, productCategories, productNotes, pages } =
    getContent(locale);
  const c = pages.stockPlans;

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
        image={IMAGES.blueprints}
        imageAlt={c.hero.imageAlt}
      />

      {/* ---------------- Filterable gallery ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow={c.catalogue.eyebrow}
            title={c.catalogue.title}
            lead={c.catalogue.lead}
          />
          <div className="mt-14">
            <ProductGallery
              products={products}
              categories={productCategories}
              locale={locale}
            />
          </div>
        </Container>
      </Section>

      {/* ---------------- Trust row ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <RevealGroup as="ul" className="grid gap-10 sm:grid-cols-3">
            {productNotes.map((note) => (
              <RevealItem as="li" key={note.title}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <h2 className="text-xl text-white">{note.title}</h2>
                  <p className="mt-3 leading-relaxed text-navy-100">
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
