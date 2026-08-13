import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";

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

  const { pages } = getContent(locale);
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

    </>
  );
}
