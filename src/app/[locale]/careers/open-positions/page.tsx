import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
  const { metadata } = getContent(locale).pages.openPositions;
  return { title: metadata.title, description: metadata.description };
}

export default async function OpenPositionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { positions, pages } = getContent(locale);
  const c = pages.openPositions;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={c.hero.breadcrumb}
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titleBefore(positions.length)}{" "}
            <span className="text-gold-500">{c.hero.titleAccent}</span>
            {c.hero.titleAfter}
          </>
        }
        lead={c.hero.lead}
        image={IMAGES.heroCareers}
        imageAlt={c.hero.imageAlt}
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow={c.roles.eyebrow}
            title={c.roles.title}
            lead={c.roles.lead}
          />

          <RevealGroup as="ul" className="mt-14 grid gap-6" stagger={0.06}>
            {positions.map((position) => (
              <RevealItem as="li" key={position.slug}>
                <article
                  id={position.slug}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-[border-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-border-strong hover:shadow-[0_24px_60px_-32px_rgba(10,36,114,0.45)] sm:p-11"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 bg-gold-500 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  />

                  <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                    <div>
                      <h2 className="text-display-md">{position.title}</h2>

                      <ul className="mt-5 flex flex-wrap gap-2.5">
                        <li>
                          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-muted-foreground">
                            <Clock
                              aria-hidden
                              className="size-3.5 text-gold-600 dark:text-gold-400"
                              strokeWidth={2}
                            />
                            {position.type}
                          </span>
                        </li>
                        <li>
                          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-muted-foreground">
                            <MapPin
                              aria-hidden
                              className="size-3.5 text-gold-600 dark:text-gold-400"
                              strokeWidth={2}
                            />
                            {position.location}
                          </span>
                        </li>
                      </ul>

                      <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                        {position.summary}
                      </p>

                      <ButtonLink
                        href={`/${locale}/contact`}
                        variant="navy"
                        className="mt-9"
                        aria-label={c.roles.applyAria(position.title)}
                      >
                        {c.roles.apply}
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </ButtonLink>
                    </div>

                    <div className="rounded-2xl bg-surface-muted p-7">
                      <h3 className="text-xs uppercase tracking-[0.16em] text-subtle-foreground">
                        {c.roles.requirements}
                      </h3>
                      <ul className="mt-5 space-y-3.5">
                        {position.requirements.map((requirement) => (
                          <li key={requirement} className="flex items-start gap-3">
                            <Check
                              aria-hidden
                              className="mt-1 size-4 shrink-0 text-gold-600 dark:text-gold-400"
                              strokeWidth={2.5}
                            />
                            <span className="text-muted-foreground">
                              {requirement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
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
