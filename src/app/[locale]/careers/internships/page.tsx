import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Handshake } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
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
  const { metadata } = getContent(locale).pages.internships;
  return { title: metadata.title, description: metadata.description };
}

export default async function InternshipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { internships, pages } = getContent(locale);
  const c = pages.internships;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={c.hero.breadcrumb}
        eyebrow={internships.eyebrow}
        title={internships.title}
        lead={c.hero.lead}
        image={IMAGES.teamHands}
        imageAlt={c.hero.imageAlt}
      />

      {/* ---------------- Motto pull-quote ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-70" />
        <div
          aria-hidden
          className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-gold-500/12 blur-[120px]"
        />
        <Container className="relative">
          <Reveal>
            <figure className="mx-auto max-w-4xl text-center">
              <span
                aria-hidden
                className="mx-auto block h-px w-16 bg-gold-500"
              />
              <blockquote className="mt-10">
                <p className="font-[family-name:var(--font-display)] text-display-md font-bold leading-[1.15] tracking-tight text-white">
                  &ldquo;{internships.motto}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-10 text-xs uppercase tracking-[0.2em] text-navy-200">
                {c.motto.caption}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Program body ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>{c.program.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">{c.program.title}</h2>
              </Reveal>
            </div>

            <div className="space-y-7">
              {internships.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.08}>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Partners ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow={c.partners.eyebrow}
            title={c.partners.title}
            lead={c.partners.lead}
          />

          <RevealGroup as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
            {internships.partners.map((partner) => (
              <RevealItem as="li" key={partner.name} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
                  <span className="inline-grid size-12 place-items-center rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                    <Handshake aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-xl">{partner.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {partner.note}
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
        primary={{ href: "/contact", label: c.cta.primaryLabel }}
      />
    </>
  );
}
