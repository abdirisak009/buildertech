import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/sections/Accordion";
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
    title: pages.faq.meta.title,
    description: pages.faq.meta.description,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { pages, faqGroups } = getContent(locale);
  const d = pages.faq;

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
        image={IMAGES.heroFaq}
        imageAlt={d.hero.imageAlt}
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* ---------------- Jump nav ---------------- */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <nav aria-label={d.jumpNavLabel}>
                  <Eyebrow>{d.onThisPage}</Eyebrow>
                  <ul className="mt-6 space-y-0.5 border-l border-border">
                    {faqGroups.map((group) => (
                      <li key={group.id}>
                        <a
                          href={`#${group.id}`}
                          className="-ml-px flex min-h-11 items-center border-l-2 border-transparent pl-5 text-sm text-muted-foreground transition-colors duration-200 hover:border-gold-500 hover:text-foreground"
                        >
                          {group.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </div>

            {/* ---------------- Groups ---------------- */}
            <div className="min-w-0 space-y-20">
              {faqGroups.map((group) => (
                <div key={group.id}>
                  <Reveal>
                    <h2
                      id={group.id}
                      className="scroll-mt-32 text-display-md"
                    >
                      {group.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="mt-8">
                      <Accordion items={group.items} idPrefix={group.id} />
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection
        locale={locale}
        eyebrow={d.cta.eyebrow}
        title={d.cta.title}
        lead={d.cta.lead}
      />
    </>
  );
}
