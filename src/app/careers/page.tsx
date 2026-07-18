import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { POSITIONS, INTERNSHIPS } from "@/content/careers";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Builders Tech — a multidisciplinary design and construction firm in Stone Mountain, Georgia. Open engineering, design, project management and sales roles, plus internships for the next generation of builders.",
};

const PATHS = [
  {
    href: "/careers/open-positions",
    icon: Briefcase,
    eyebrow: "Experienced hires",
    title: "Current Open Positions",
    body: "Engineering, design, project management and sales roles working on live residential and light-commercial projects across the Atlanta metro.",
    meta: `${POSITIONS.length} open ${POSITIONS.length === 1 ? "role" : "roles"}`,
  },
  {
    href: "/careers/internships",
    icon: GraduationCap,
    eyebrow: INTERNSHIPS.eyebrow,
    title: INTERNSHIPS.title,
    body: "A way into the AEC industry for students in DeKalb County and the wider Atlanta area — measuring, redlining, sitting in on client calls and walking active job sites.",
    meta: `${INTERNSHIPS.partners.length} community partners`,
  },
];

const WHY = [
  {
    number: "01",
    title: "Real projects, from day one.",
    body: "Over 400 projects completed locally means there is always live work on the boards. You are not shadowing a senior for six months — you get drawings assigned to you in your first weeks and you see them through permitting.",
  },
  {
    number: "02",
    title: "Residential is the craft here.",
    body: "We are deliberately focused on residential and light-commercial work. That focus means you get deep, repeatable expertise in the IRC, in local county review, and in what actually gets built — not a shallow tour of ten building types.",
  },
  {
    number: "03",
    title: "A small team where you own your work.",
    body: "There is no layer of committees between your drawing and the client. You speak to the homeowner, you defend your detail to the plan reviewer, and your name is on the set. That is a faster way to become good at this.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumb="Careers"
        eyebrow="Join the team"
        title={
          <>
            Build a career where the work{" "}
            <span className="text-gold-500">gets built</span>.
          </>
        }
        lead="Builders Tech is a design and construction management firm in Stone Mountain, Georgia. We are looking for engineers, designers, managers and students who want their drawings to leave the screen and become buildings."
        image={IMAGES.heroCareers}
        imageAlt="Members of a project team collaborating over documents"
      />

      {/* ---------------- Two paths ---------------- */}
      <Section>
        <Container>
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {PATHS.map((path) => {
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
                        View
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
            <Eyebrow className="text-navy-200">Why work here</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 max-w-3xl text-display-lg">
              Small firm. Serious work. Your name on the set.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-3">
            {WHY.map((item) => (
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
            eyebrow="Applying"
            title="How hiring works here."
            lead="No applicant tracking system, no six-round process. Send us your résumé and a portfolio or a few work samples if you have them."
          />
          <RevealGroup as="ol" className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Send it in",
                body: "Use the contact form or email us directly. Tell us the role and what you have worked on.",
              },
              {
                step: "02",
                title: "A conversation",
                body: "A call with the team you would actually sit with — about your work, not brain-teasers.",
              },
              {
                step: "03",
                title: "A decision",
                body: "We come back to you either way, quickly. Nobody is left waiting on a silent inbox.",
              },
            ].map((item) => (
              <RevealItem as="li" key={item.step}>
                <div className="h-full rounded-2xl border border-border bg-surface p-8">
                  <span
                    aria-hidden
                    className="tabular inline-grid size-12 place-items-center rounded-full bg-navy-700 font-[family-name:var(--font-display)] text-sm font-bold text-gold-500"
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
        eyebrow="Speculative applications"
        title="Don't see your role?"
        lead="We hire when we meet the right person, not only when a listing is open. If you are an engineer, designer, estimator or site manager who wants to work on residential projects in Atlanta, introduce yourself."
        primary={{ href: "/contact", label: "Introduce Yourself" }}
      />
    </>
  );
}
