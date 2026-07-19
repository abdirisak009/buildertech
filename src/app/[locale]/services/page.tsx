import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { IMAGES } from "@/content/images";
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
    title: pages.services.meta.title,
    description: pages.services.meta.description,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { services, workCategories, pages } = getContent(locale);
  const copy = pages.services;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={copy.hero.breadcrumb}
        eyebrow={copy.hero.eyebrow}
        title={
          <>
            {copy.hero.titleBefore}
            <span className="text-gold-500">{copy.hero.titleAccent}</span>
            {copy.hero.titleAfter}
          </>
        }
        lead={copy.hero.lead}
        image={IMAGES.heroServices}
        imageAlt={copy.hero.imageAlt}
      />

      <Section>
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <RevealItem key={service.slug} as="article" className="h-full">
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)]"
                  >
                    <span className="inline-grid size-14 place-items-center rounded-xl bg-gold-500/15 text-gold-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950 dark:text-gold-400">
                      <Icon aria-hidden className="size-7" strokeWidth={1.75} />
                    </span>
                    <h2 className="mt-6 text-xl">{service.title}</h2>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                      {copy.exploreLabel(service.title)}
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

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow={copy.projectTypes.eyebrow}
            title={copy.projectTypes.title}
            lead={copy.projectTypes.lead}
          />
          <RevealGroup as="ul" stagger={0.04} className="mt-12 flex flex-wrap gap-2.5">
            {workCategories.map((category) => (
              <RevealItem as="li" key={category}>
                <span className="inline-flex rounded-full border border-border-strong px-5 py-2.5 text-sm text-muted-foreground">
                  {category}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection
        locale={locale}
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title}
        lead={copy.cta.lead}
      />
    </>
  );
}
