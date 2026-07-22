import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";

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
  const { metadata } = getContent(locale).pages.careers;
  return { title: metadata.title, description: metadata.description };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { positions, internships, pages } = getContent(locale);
  const c = pages.careers;

  const paths = [
    {
      href: `/${locale}/careers/open-positions`,
      icon: Briefcase,
      eyebrow: c.paths.openPositions.eyebrow,
      title: c.paths.openPositions.title,
      body: c.paths.openPositions.body,
      meta: c.paths.openPositions.meta(positions.length),
    },
    {
      href: `/${locale}/careers/internships`,
      icon: GraduationCap,
      eyebrow: internships.eyebrow,
      title: internships.title,
      body: c.paths.internships.body,
      meta: c.paths.internships.meta(internships.partners.length),
    },
  ];

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
        image={IMAGES.heroCareers}
        imageAlt={c.hero.imageAlt}
      />

      {/* ---------------- Two paths ---------------- */}
      <Section>
        <Container>
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <RevealItem key={path.href} as="article" className="h-full">
                  <Link
                    href={path.href}
                    className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_24px_60px_-28px_rgba(10,36,114,0.45)] sm:p-11"
                  >
                    <span className="inline-grid size-14 place-items-center rounded-xl bg-gold-500/15 text-gold-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950 dark:text-gold-400">
                      <Icon aria-hidden className="size-7" strokeWidth={1.75} />
                    </span>

                    <p className="mt-7 text-xs uppercase tracking-[0.16em] text-subtle-foreground">
                      {path.eyebrow}
                    </p>
                    <h2 className="mt-3 text-display-md">{path.title}</h2>
                    <p className="mt-5 flex-1 text-lg leading-relaxed text-muted-foreground">
                      {path.body}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                      <span className="tabular inline-flex rounded-full bg-navy-700/10 px-4 py-2 text-sm font-semibold text-navy-700 dark:bg-white/10 dark:text-gold-400">
                        {path.meta}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-navy-700 dark:text-gold-400">
                        {c.paths.view}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Why work here ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-navy-200">{c.why.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">{c.why.title}</h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {c.why.items.map((item) => (
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

      {/* ---------------- How to apply ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow={c.applying.eyebrow}
            title={c.applying.title}
            lead={c.applying.lead}
          />
          <RevealGroup as="ol" className="mt-14 grid gap-6 sm:grid-cols-3">
            {c.applying.steps.map((item) => (
              <RevealItem as="li" key={item.step}>
                <div className="h-full rounded-2xl border border-border bg-surface p-8">
                  <span
                    aria-hidden
                    className="tabular inline-grid size-12 place-items-center rounded-full bg-black font-[family-name:var(--font-display)] text-sm font-bold text-gold-500"
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-6 text-xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
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
