import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

import { PRODUCTS, PRODUCT_NOTES } from "@/content/products";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Ready-to-build stock plan sets from Builders Tech — pergolas, carports and glamping tent frames, drawn to the same standard as our custom work.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Products"
        eyebrow="Buy a plan set"
        title={
          <>
            Drawings you can buy{" "}
            <span className="text-gold-500">off the shelf</span>.
          </>
        }
        lead="Some structures are standard enough that the geometry does not need reinventing. For those, we sell the plan set outright — drafted properly, priced for what it is."
        image={IMAGES.heroProducts}
        imageAlt="Architectural plan sets laid out across a drafting desk"
      />

      {/* ---------------- Stock plans ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <SectionHeader
                eyebrow="Stock Plans"
                title="Ready-to-build plan sets."
                lead="Outdoor structures and ready-to-go homes, delivered as print-ready PDFs. Buy the set today, or ask us to adapt it to your lot and county."
              />
              <Reveal delay={0.24}>
                <Link
                  href="/products/stock-plans"
                  className="group mt-9 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-semibold text-navy-700 dark:text-gold-400"
                >
                  Browse all {PRODUCTS.length} stock plans
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <Link
                href="/products/stock-plans"
                className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 text-white transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 sm:p-10"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-blueprint opacity-70"
                />
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 size-72 rounded-full bg-gold-500/15 blur-[100px]"
                />
                <div
                  aria-hidden
                  className="absolute inset-6 border border-white/12"
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.2em] text-navy-200">
                    From $500
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                    Pergolas, carports &amp; tent frames
                  </p>
                  <p className="mt-4 leading-relaxed text-navy-100">
                    Dimensioned framing, structural details and a materials list
                    in every set.
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Notes ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="What buying a stock plan gets you."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {PRODUCT_NOTES.map((note) => (
              <RevealItem key={note.title} as="article" className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface p-8">
                  <h3 className="text-lg">{note.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {note.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Need something custom?"
        title="We draw the ones that aren't on the shelf."
        lead="If your project does not fit a stock set, tell us what you are building. The consultation is free and the plans are permit-ready in 10 business days."
      />
    </>
  );
}
