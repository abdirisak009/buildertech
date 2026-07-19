export const services = {
  meta: {
    title: "Services",
    description:
      "Renderings, architectural plans, structural plans, civil plans, stop work orders, project management and design-build construction across Atlanta, Georgia.",
  },

  hero: {
    breadcrumb: "Services",
    eyebrow: "What we do",
    titleBefore: "Everything from a sketch to a ",
    titleAccent: "certificate of occupancy",
    titleAfter: ".",
    lead: "Seven services under one roof. Appoint us for a single plan set, a stalled project that needs rescuing, or the whole design-build. No project is too big or too small.",
    imageAlt: "Abstract view of a glass building façade",
  },

  /** Card link label, e.g. "Explore Renderings". */
  exploreLabel: (title: string) => `Explore ${title}`,

  projectTypes: {
    eyebrow: "Project types",
    title: "The work we take on.",
    lead: "Residential is our core, but the drawing board does not stop there.",
  },

  cta: {
    eyebrow: "Not sure what you need?",
    title: "Ask us — the consultation is free.",
    lead: "Describe the project in a few lines and we will tell you which service actually fits, including the cheaper option when there is one.",
  },
};

export type ServicesCopy = typeof services;
