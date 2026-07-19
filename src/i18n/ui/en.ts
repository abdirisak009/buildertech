/**
 * Shared chrome strings: header, footer, forms, accessibility labels.
 * Page-level copy lives in src/content/<locale>/pages/*.
 */
export const en = {
  meta: {
    keywords: [
      "architectural plans Atlanta",
      "structural plans Georgia",
      "civil site plans",
      "stop work order help",
      "permit ready drawings",
      "design build Atlanta",
      "construction management",
      "3D renderings",
    ],
  },

  a11y: {
    skipToContent: "Skip to main content",
    mainNav: "Main",
    mobileNav: "Mobile",
    breadcrumb: "Breadcrumb",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    expandMenu: (label: string) => `Expand ${label} menu`,
    collapseMenu: (label: string) => `Collapse ${label} menu`,
    toLightMode: "Switch to light mode",
    toDarkMode: "Switch to dark mode",
    home: "home",
    onPlatform: (platform: string) => `on ${platform}`,
    opensInNewTab: "opens in a new tab",
  },

  header: {
    cta: "Schedule Your Project",
  },

  breadcrumb: {
    home: "Home",
  },

  language: {
    label: "Language",
    switchTo: (name: string) => `Switch to ${name}`,
  },

  footer: {
    company: "Company",
    explore: "Explore",
    services: "Services",
    getInTouch: "Get in touch",
    phone: "Phone",
    email: "Email",
    office: "Office",
    reviews: (count: string, platforms: string) =>
      `${count} reviews on ${platforms}`,
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    links: {
      howItWorks: "How it Works",
      about: "About Us",
      faq: "FAQ",
      resources: "Building Resources",
      contact: "Contact Us",
      stockPlans: "Stock Plans",
      ircUpdates: "IRC Code Updates",
      designTrends: "Design Trends",
      openPositions: "Open Positions",
      internships: "Internships",
    },
  },

  form: {
    labels: {
      name: "Full name",
      email: "Email",
      phone: "Phone",
      company: "Company / organization",
      projectType: "Project type",
      service: "Service needed",
      budget: "Estimated budget",
      location: "Project location",
      message: "Tell us about the project",
    },
    placeholders: {
      name: "Jordan Mitchell",
      email: "you@company.com",
      phone: "(404) 555-0123",
      company: "Optional",
      selectType: "Select a type",
      selectScope: "Select a scope",
      preferNotToSay: "Prefer not to say",
      location: "City or county",
      message:
        "We own a 0.25-acre lot in Decatur and want to add a 600 sq ft primary suite over the garage…",
    },
    hints: {
      budget: "A range is fine — it helps us answer usefully.",
      message:
        "Lot size, intended use, and anything you already know about the budget or timeline.",
    },
    errors: {
      name: "Please tell us your name.",
      emailRequired: "We need an email address to reply to.",
      emailInvalid: "Enter a valid email, e.g. name@company.com.",
      projectType: "Select the type of project.",
      service: "Select the scope you are looking for.",
      messageRequired: "Tell us a little about the project.",
      messageShort: "Please give us a bit more detail (at least 20 characters).",
      summary: "Please fix the highlighted fields and submit again.",
    },
    required: "(required)",
    submit: "Send project brief",
    sending: "Sending…",
    successTitle: "Brief received.",
    successBody:
      "Thank you — your brief has been received. A Builders Tech lead will reply within one business day.",
    sendAnother: "Send another brief",
    privacy:
      "We use your details only to respond to this enquiry. We do not share them with contractors or third parties.",
    projectTypes: [
      "Home addition",
      "New construction",
      "Remodel / renovation",
      "ADU (garage apartment, basement suite, cottage)",
      "Deck, patio or outdoor structure",
      "Townhouse / multi-unit development",
      "Commercial",
      "Other",
    ],
    services: [
      "Architectural plans",
      "Structural plans",
      "Civil / site plans",
      "3D renderings",
      "Stop work order help",
      "Project management",
      "Design-build (full construction)",
      "Not sure yet — need advice",
    ],
    budgets: [
      "Under $50k",
      "$50k – $150k",
      "$150k – $500k",
      "$500k – $1M",
      "Over $1M",
      "Not yet defined",
    ],
  },

  common: {
    learnMore: "Learn more",
    readArticle: "Read article",
    viewAll: "View all",
    backToHome: "Back to home",
    contactUs: "Contact us",
    apply: "Apply",
    purchasePlan: "Purchase plan",
    includes: "Includes",
    showingOf: (shown: number, total: number, noun: string) =>
      `Showing ${shown} of ${total} ${noun}`,
    all: "All",
    minRead: (mins: number) => `${mins} min read`,
    planSets: "plan sets",
    filterByCategory: "Filter plans by category",
    purchaseAria: (name: string) => `Purchase plan — ${name}`,
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page was never drawn.",
    titleAccent: "drawn",
    lead: "The address you followed does not exist on this site. Head back to the homepage, or tell us what you were looking for and we will point you at it.",
  },
};

export type UiDict = typeof en;
