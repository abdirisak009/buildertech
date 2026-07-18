import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/sections/Accordion";
import { CtaSection } from "@/components/sections/CtaSection";

import { FAQ_GROUPS } from "@/content/faq";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on permits, timelines, budgets, stop work orders, additions, ADUs, townhouse development and how Builders Tech works across metro Atlanta.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumb="FAQ"
        eyebrow="Questions & answers"
        title={
          <>
            The questions we get{" "}
            <span className="text-gold-500">every week</span>.
          </>
        }
        lead="Permits, timelines, budgets and the awkward ones about stop work orders. If your question is not here, ask us directly — the consultation is free."
        image={IMAGES.heroFaq}
        imageAlt="Atlanta skyline at dusk"
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* ---------------- Jump nav ---------------- */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <nav aria-label="Jump to a topic">
                  <Eyebrow>On this page</Eyebrow>
                  <ul className="mt-6 space-y-0.5 border-l border-border">
                    {FAQ_GROUPS.map((group) => (
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
              {FAQ_GROUPS.map((group) => (
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
        eyebrow="Still unsure?"
        title="Ask us directly — the consultation is free."
        lead="Describe your project in a few lines. We will tell you what the county will expect, what it is likely to cost, and whether there is a cheaper route to the same result."
      />
    </>
  );
}
