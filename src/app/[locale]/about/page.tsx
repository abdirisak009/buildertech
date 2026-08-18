import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { CtaSection } from "@/components/sections/CtaSection";
import { EditableTeam } from "@/components/sections/EditableTeam";

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
    stats,
    story,
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

      {/* ---------------- Mission, vision & values (first) ---------------- */}
      <Section>
        <Container>
          <SectionHeader eyebrow={d.mvv.eyebrow} title={d.mvv.title}/>
          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {[[d.mvv.missionTitle,d.mvv.missionBody],[d.mvv.visionTitle,d.mvv.visionBody],[d.mvv.valuesTitle,d.mvv.valuesBody]].map(([title,body],index)=><RevealItem key={title} className="h-full"><article className="h-full rounded-3xl border border-border bg-surface p-8 shadow-sm"><span className="text-sm font-bold text-gold-500">0{index+1}</span><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{body}</p></article></RevealItem>)}
          </RevealGroup>
        </Container>
      </Section>

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

          <EditableTeam locale={locale} fallback={team}/>
        </Container>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
