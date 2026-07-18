import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { CtaSection } from "@/components/sections/CtaSection";

import { SITE, STATS } from "@/content/site";
import { APPROACH, WHY_CHOOSE_US } from "@/content/about";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "A streamlined, customer-focused approach: free consultation, design, permit-ready documentation in 10 business days, and construction support.",
};

const STEPS = [
  {
    number: "01",
    title: "Free consultation",
    duration: "Same week",
    body: "Call, email or WhatsApp us. We talk through what you want to build, what the site allows, and what your budget will realistically cover. No charge, no obligation.",
    points: [
      "Discuss scope, site and budget",
      "Expert advice on what the county will accept",
      "Written quote for the work",
    ],
  },
  {
    number: "02",
    title: "Design & documentation",
    duration: "10 business days",
    body: "We draw the project. Architectural and structural plans are produced together and coordinated, so the set is internally consistent before it ever reaches a plan reviewer.",
    points: [
      "Floor plans, elevations, sections and details",
      "Structural design coordinated with the architecture",
      "Site and civil plans where the project needs them",
    ],
  },
  {
    number: "03",
    title: "Permit-ready handover",
    duration: "On delivery",
    body: "You receive a set that includes everything the city asks for. We do not submit on your behalf — but the documentation is built to be submitted without gaps.",
    points: [
      "Complete permit-ready drawing set",
      "All supporting documentation included",
      "We help address city comments if any come back",
    ],
  },
  {
    number: "04",
    title: "Build & manage",
    duration: "Project dependent",
    body: "Optional. If you want us to stay on, we manage the build — scheduling, quality control, staffing, safety and inspections — through to handover.",
    points: [
      "Construction scheduling and cost control",
      "Quality assurance and site inspections",
      "Design-build delivery under one contract",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        breadcrumb="How it Works"
        eyebrow={APPROACH.eyebrow}
        title={
          <>
            A hassle-free journey from{" "}
            <span className="text-gold-500">beginning to end</span>.
          </>
        }
        lead={APPROACH.lead}
        image={IMAGES.heroHowItWorks}
        imageAlt="A project team reviewing drawings and figures at a table"
      />

      {/* ---------------- Stats ---------------- */}
      <section className="border-b border-border bg-surface-muted py-16">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
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
                <Eyebrow>Our philosophy</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-display-lg">
                  The right technology, a talented team.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                  {APPROACH.body}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <ButtonLink href="/contact" variant="navy" className="mt-9">
                  {SITE.cta}
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
                  alt="Architectural floor plans laid out on a desk"
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
            eyebrow="The process"
            title="Four steps, start to finish."
            lead="Each step ends with something you can hold — a quote, a drawing set, a permit-ready package, a finished building."
          />

          <ol className="mt-16">
            {STEPS.map((step) => (
              <li key={step.number}>
                <Reveal>
                  <div className="grid gap-8 border-b border-border py-12 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-[3rem_1fr_1fr] lg:gap-12">
                    <div>
                      <span
                        aria-hidden
                        className="tabular inline-grid size-12 place-items-center rounded-full bg-navy-700 font-[family-name:var(--font-display)] text-sm font-bold text-gold-500"
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
            <Eyebrow className="text-navy-200">Why choose us</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">
              Five-star Google reviews. Over 400 projects completed locally.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {WHY_CHOOSE_US.map((item) => (
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

      <CtaSection />
    </>
  );
}
