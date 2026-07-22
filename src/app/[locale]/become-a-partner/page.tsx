import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Users, Home, Wrench, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { getContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/content/images";

const WHO_ICONS = [Home, Users, Wrench, TrendingUp];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getContent(locale);
  return {
    title: pages.becomeAPartner.meta.title,
    description: pages.becomeAPartner.meta.description,
  };
}

export default async function BecomeAPartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { pages } = getContent(locale);
  const c = pages.becomeAPartner;

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={c.breadcrumb}
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        image={IMAGES.teamHands}
        imageAlt="A team joining hands over a set of plans"
      />

      {/* Who partners with us */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{c.who.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-md">{c.who.title}</h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {c.who.items.map((item, i) => {
              const Icon = WHO_ICONS[i % WHO_ICONS.length];
              return (
                <RevealItem key={item.title} className="h-full">
                  <div className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-7">
                    <span className="inline-grid size-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-lg">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow className="text-navy-200">{c.benefits.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-display-md text-white">{c.benefits.title}</h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.benefits.items.map((item) => (
              <RevealItem key={item.title} className="h-full">
                <div className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm">
                  <Check
                    aria-hidden
                    className="size-6 text-gold-500"
                    strokeWidth={2.25}
                  />
                  <h3 className="mt-4 text-lg text-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-100">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.cta.title}
        lead={c.cta.lead}
        primary={{ href: "/contact", label: c.cta.button }}
      />
    </>
  );
}
