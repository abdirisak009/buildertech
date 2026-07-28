import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
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
    title: pages.about.meta.title,
    description: pages.about.meta.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const {
    pages,
    site,
    stats,
    story,
    philosophy,
    whyChooseUs,
    team,
  } = getContent(locale);
  const d = pages.about;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={d.hero.breadcrumb}
        eyebrow={d.hero.eyebrow}
        title={
          <>
            {d.hero.titleLead}
            <span className="text-gold-500">{d.hero.titleAccent}</span>
            {d.hero.titleTail}
          </>
        }
        lead={d.hero.lead}
        image={IMAGES.heroAbout}
        imageAlt={d.hero.imageAlt}
      />

      {/* ---------------- Story ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>{d.story.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">{d.story.title}</h2>
              </Reveal>
              <div className="mt-7 space-y-6">
                {story.map((paragraph, i) => (
                  <Reveal key={paragraph} delay={0.16 + i * 0.06}>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={IMAGES.blueprints}
                  alt={d.story.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Stats band ---------------- */}
      <Section tone="navy" className="py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <h2 className="sr-only">{d.stats.srTitle}</h2>
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <dl>
                  <dt className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gold-500 sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-200">
                    {stat.label}
                  </dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Philosophy ---------------- */}
      <Section>
        <Container>
          <Reveal>
            <figure className="mx-auto max-w-4xl text-center">
              <Eyebrow align="center">{d.philosophy.eyebrow}</Eyebrow>
              <blockquote className="mt-8">
                <p className="text-display-md text-balance">
                  &ldquo;{philosophy}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-8 text-sm uppercase tracking-[0.16em] text-subtle-foreground">
                {site.name} — {site.tagline}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Why choose us ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow={d.whyChooseUs.eyebrow}
            title={d.whyChooseUs.title}
          />

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.number}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <span className="tabular font-[family-name:var(--font-display)] text-4xl font-bold text-foreground/15">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Team ---------------- */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-[0.07]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow align="center" className="text-navy-200">
                {d.team.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-lg text-white">{d.team.title}</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-navy-100">
                {d.team.lead}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <RevealItem key={member.name} as="article" className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-[transform,border-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:border-gold-500/50">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold-400">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-navy-100">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
