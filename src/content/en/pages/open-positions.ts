export const openPositions = {
  metadata: {
    title: "Current Open Positions",
    description:
      "Open roles at Builders Tech in Stone Mountain, Georgia — Structural Engineer, Architectural Designer, Project Manager and Sales Representative.",
  },

  hero: {
    breadcrumb: "Open Positions",
    eyebrow: "Careers",
    titleBefore: (count: number) => `${count} roles open on the`,
    titleAccent: "Builders Tech",
    titleAfter: " team.",
    lead: "Design, engineering, management and sales — all working on live residential and light-commercial projects across the Atlanta metro. Apply through the contact form and tell us which role you are after.",
    imageAlt: "A design and construction team at work in a studio",
  },

  roles: {
    eyebrow: "Open roles",
    title: "What we are hiring for right now.",
    lead: "Every listing below is a live vacancy. If your experience is close but not exact, apply anyway and say so.",
    requirements: "Requirements",
    apply: "Apply for this role",
    applyAria: (role: string) => `Apply for the ${role} role`,
  },

  cta: {
    eyebrow: "Applications",
    title: "Ready to apply?",
    lead: "Send your résumé and a few work samples through the contact form, naming the role you want. We read every application and come back to you either way.",
    primaryLabel: "Send Your Application",
  },
};

export type OpenPositionsCopy = typeof openPositions;
