import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
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
    title: pages.howItWorks.meta.title,
    description: pages.howItWorks.meta.description,
  };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { site, stats, approach, whyChooseUs, pages } = getContent(locale);
  const copy = pages.howItWorks;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={copy.hero.breadcrumb}
        eyebrow={approach.eyebrow}
        title={
          <>
            {copy.hero.titleBefore}
            <span className="text-gold-500">{copy.hero.titleAccent}</span>
            {copy.hero.titleAfter}
          </>
        }
        lead={approach.lead}
        image={IMAGES.heroHowItWorks}
        imageAlt={copy.hero.imageAlt}
      />

      {/* ---------------- Stats ---------------- */}
      <section className="border-b border-border bg-surface-muted py-16">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <dl>
                  <dt className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gold-600 sm:text-5xl dark:text-gold-400">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-subtle-foreground">
                    {stat.label}
                  </dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------- Intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>{copy.philosophy.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">{copy.philosophy.title}</h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                  {approach.body}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <ButtonLink
                  href={`/${locale}/contact`}
                  variant="navy"
                  className="mt-9"
                >
                  {site.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={IMAGES.blueprints}
                  alt={copy.philosophy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Steps ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow={copy.process.eyebrow}
            title={copy.process.title}
            lead={copy.process.lead}
          />

          <ol className="mt-16">
            {copy.steps.map((step) => (
              <li key={step.number}>
                <Reveal>
                  <div className="grid gap-8 border-b border-border py-12 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-[3rem_1fr_1fr] lg:gap-12">
                    <div>
                      <span
                        aria-hidden
                        className="tabular inline-grid size-12 place-items-center rounded-full bg-black font-[family-name:var(--font-display)] text-sm font-bold text-gold-500"
                      >
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-subtle-foreground">
                        {step.duration}
                      </p>
                      <h3 className="mt-3 text-display-md">{step.title}</h3>
                      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>

                    <ul className="space-y-3 lg:pt-12">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-gold-600 dark:text-gold-400"
                            strokeWidth={2.5}
                          />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------- Why choose us ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-navy-200">{copy.why.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">{copy.why.title}</h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.number}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-4xl font-bold text-white/20">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-100">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
