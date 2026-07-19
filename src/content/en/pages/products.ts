export const products = {
  metadata: {
    title: "Products",
    description:
      "Ready-to-build stock plan sets from Builders Tech — pergolas, carports and glamping tent frames, drawn to the same standard as our custom work.",
  },

  hero: {
    breadcrumb: "Products",
    eyebrow: "Buy a plan set",
    titleBefore: "Drawings you can buy",
    titleAccent: "off the shelf",
    titleAfter: ".",
    lead: "Some structures are standard enough that the geometry does not need reinventing. For those, we sell the plan set outright — drafted properly, priced for what it is.",
    imageAlt: "Architectural plan sets laid out across a drafting desk",
  },

  stock: {
    eyebrow: "Stock Plans",
    title: "Ready-to-build plan sets.",
    lead: "Outdoor structures and ready-to-go homes, delivered as print-ready PDFs. Buy the set today, or ask us to adapt it to your lot and county.",
    browse: (count: number) => `Browse all ${count} stock plans`,
    cardPrice: "From $500",
    cardTitle: "Pergolas, carports & tent frames",
    cardBody:
      "Dimensioned framing, structural details and a materials list in every set.",
  },

  notes: {
    eyebrow: "How it works",
    title: "What buying a stock plan gets you.",
  },

  cta: {
    eyebrow: "Need something custom?",
    title: "We draw the ones that aren't on the shelf.",
    lead: "If your project does not fit a stock set, tell us what you are building. The consultation is free and the plans are permit-ready in 10 business days.",
  },
};

export type ProductsCopy = typeof products;
