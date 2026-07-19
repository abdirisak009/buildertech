export const howItWorks = {
  meta: {
    title: "How it Works",
    description:
      "A streamlined, customer-focused approach: free consultation, design, permit-ready documentation in 10 business days, and construction support.",
  },

  hero: {
    breadcrumb: "How it Works",
    titleBefore: "A hassle-free journey from ",
    titleAccent: "beginning to end",
    titleAfter: ".",
    imageAlt: "A project team reviewing drawings and figures at a table",
  },

  philosophy: {
    eyebrow: "Our philosophy",
    title: "The right technology, a talented team.",
    imageAlt: "Architectural floor plans laid out on a desk",
  },

  process: {
    eyebrow: "The process",
    title: "Four steps, start to finish.",
    lead: "Each step ends with something you can hold — a quote, a drawing set, a permit-ready package, a finished building.",
  },

  steps: [
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
  ],

  why: {
    eyebrow: "Why choose us",
    title: "Five-star Google reviews. Over 400 projects completed locally.",
  },
};

export type HowItWorksCopy = typeof howItWorks;
