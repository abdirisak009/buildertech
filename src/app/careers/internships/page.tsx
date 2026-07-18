import type { Metadata } from "next";
import { Handshake } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { INTERNSHIPS } from "@/content/careers";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Builders Tech runs a youth development internship programme opening the architecture, engineering and construction industry to students in DeKalb County and the wider Atlanta area.",
};

export default function InternshipsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Internships"
        eyebrow={INTERNSHIPS.eyebrow}
        title={INTERNSHIPS.title}
        lead="A way into the AEC industry for students who can draw, measure, estimate and manage — but have never been shown the door."
        image={IMAGES.teamHands}
        imageAlt="Young people working together around a table of drawings"
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
                  &ldquo;{INTERNSHIPS.motto}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-10 text-xs uppercase tracking-[0.2em] text-navy-200">
                Builders Tech — Youth Development
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Programme body ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>The programme</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  Learning on live projects.
                </h2>
              </Reveal>
            </div>

            <div className="space-y-7">
              {INTERNSHIPS.body.map((paragraph, index) => (
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
            eyebrow="Our partners"
            title="We do not do this alone."
            lead="The programme runs alongside local workforce, mentorship and accelerator organisations who help us reach students and small businesses across DeKalb County."
          />

          <RevealGroup as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
            {INTERNSHIPS.partners.map((partner) => (
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
        eyebrow="Internship applications"
        title="Apply for an internship."
        lead="If you are a student in DeKalb County or the wider Atlanta area and want a season on real residential projects, tell us about yourself. No prior industry contacts required — that is the point."
        primary={{ href: "/contact", label: "Apply for an Internship" }}
      />
    </>
  );
}
