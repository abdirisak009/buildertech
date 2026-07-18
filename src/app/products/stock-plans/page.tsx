import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProductGallery } from "@/components/sections/ProductGallery";

import { PRODUCT_NOTES } from "@/content/products";
import { IMAGES } from "@/content/images";

export const metadata: Metadata = {
  title: "Stock Plans",
  description:
    "Buy ready-to-build plan sets from Builders Tech — pergolas, carports and glamping tent frames with dimensioned framing, structural details and materials lists.",
};

export default function StockPlansPage() {
  return (
    <>
      <PageHero
        breadcrumb="Stock Plans"
        eyebrow="Products"
        title={
          <>
            Buy the set. <span className="text-gold-500">Start building</span>.
          </>
        }
        lead="Standard structures, properly drawn. Every stock plan carries dimensioned framing, structural detailing and a materials list — the same standard as the custom work we permit every week."
        image={IMAGES.blueprints}
        imageAlt="Rolled architectural drawings and a scale rule on a drafting table"
      />

      {/* ---------------- Filterable gallery ---------------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="The catalogue"
            title="Plan sets, priced to buy today."
            lead="Filter by what you are building. Each set is delivered as a print-ready PDF."
          />
          <div className="mt-14">
            <ProductGallery />
          </div>
        </Container>
      </Section>

      {/* ---------------- Trust row ---------------- */}
      <Section tone="navy">
        <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
        <Container className="relative">
          <RevealGroup as="ul" className="grid gap-10 sm:grid-cols-3">
            {PRODUCT_NOTES.map((note) => (
              <RevealItem as="li" key={note.title}>
                <div className="border-t-2 border-gold-500 pt-6">
                  <h2 className="text-xl text-white">{note.title}</h2>
                  <p className="mt-3 leading-relaxed text-navy-100">
                    {note.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Adaptation"
        title="Want a stock plan made yours?"
        lead="Stamped, resized or adapted to your lot and county — we take the stock set as the starting point instead of drawing from zero."
      />
    </>
  );
}
