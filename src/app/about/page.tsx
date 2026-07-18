import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { CtaSection } from "@/components/sections/CtaSection";

import { SITE, STATS } from "@/content/site";
import {
  STORY,
  PHILOSOPHY,
  WHAT_WE_OFFER,
  WHY_CHOOSE_US,
  TESTIMONIALS,
  REVIEW_PLATFORMS,
} from "@/content/about";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Builders Tech started in a basement office in Atlanta with one desk and one plotter. Today we deliver permit-ready design and construction documentation across Georgia.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who we are"
        title={
          <>
            From a basement office in Atlanta to{" "}
            <span className="text-gold-500">400+ projects</span>.
          </>
        }
        lead="One desk, one plotter, and a conviction that homeowners deserve the same standard of documentation large developers take for granted. That has not changed — the scale has."
        image={IMAGES.heroAbout}
        imageAlt="A completed residential home at dusk"
      />

      {/* ---------------- Story ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Our story</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  We started where our clients start.
                </h2>
              </Reveal>
              <div className="mt-7 space-y-6">
                {STORY.map((paragraph, i) => (
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
                  alt="Architectural drawings spread across a drafting desk"
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
          <h2 className="sr-only">Builders Tech by the numbers</h2>
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
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
              <Eyebrow align="center">Our philosophy</Eyebrow>
              <blockquote className="mt-8">
                <p className="text-display-md text-balance">
                  &ldquo;{PHILOSOPHY}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-8 text-sm uppercase tracking-[0.16em] text-subtle-foreground">
                {SITE.name} — {SITE.tagline}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- What we offer ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="What we offer"
            title="Four things you can hold us to."
            lead="Scoped to what your project actually needs — a single plan set or the whole design-build."
          />

          <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2">
            {WHAT_WE_OFFER.map((item) => (
              <RevealItem key={item.title} as="article" className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface p-8">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Why choose us ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why choose us"
            title="Local, proven and fast."
          />

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {WHY_CHOOSE_US.map((item) => (
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

      {/* ---------------- Reviews ---------------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Client reviews</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  134+ five-star reviews.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-6 flex items-center gap-2">
                  <span
                    aria-hidden
                    className="flex items-center gap-1 text-gold-500"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-5 fill-current" />
                    ))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    5 out of 5, averaged across 134+ five-star reviews
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {REVIEW_PLATFORMS.map((platform) => (
                    <li key={platform}>
                      <span className="inline-flex min-h-11 items-center rounded-full border border-border-strong px-5 text-sm text-muted-foreground">
                        {platform}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <RevealGroup as="ul" className="space-y-5">
              {TESTIMONIALS.map((testimonial) => (
                <RevealItem as="li" key={testimonial.quote}>
                  <figure className="rounded-2xl border border-border bg-surface p-8">
                    <span
                      aria-hidden
                      className="flex items-center gap-1 text-gold-500"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </span>
                    <blockquote className="mt-5">
                      <p className="text-lg leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-subtle-foreground">
                      {testimonial.author} — {testimonial.context}
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ---------------- Service area ---------------- */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex max-w-3xl flex-col gap-5 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-start sm:gap-6 sm:p-10">
              <span className="inline-grid size-14 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                <MapPin aria-hidden className="size-7" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="text-display-md">Where we work.</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {SITE.serviceArea}
                </p>
                <p className="mt-4 text-sm text-subtle-foreground">
                  Office: {SITE.address.full}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
