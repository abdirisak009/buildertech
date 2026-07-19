export const resources = {
  meta: {
    title: "Building Resources",
    description:
      "A directory of vetted local surveyors, inspectors, trades, suppliers and permit expeditors within 30 miles of our Decatur office. Builders Tech takes no commission from any provider listed.",
  },

  hero: {
    breadcrumb: "Building Resources",
    eyebrow: "Local directory",
    titleLead: "The people we ",
    titleAccent: "actually call",
    titleTail: ".",
    imageAlt: "An active residential construction site",
    counts: (providers: number, categories: number) =>
      `${providers} providers across ${categories} categories`,
  },

  jumpNavLabel: "Resource categories",

  disclaimer: {
    title: "No commission, no referral fees.",
    body: "Builders Tech takes no commission, kickback or referral fee from any provider on this page. These are firms we have worked alongside on real projects and would call again. Pricing, licensing, insurance and scheduling are strictly between you and the provider — please verify current credentials before you hire.",
  },

  directory: {
    providerCount: (count: number) =>
      `${count} ${count === 1 ? "provider" : "providers"}`,
    callSr: (name: string) => ` — call ${name}`,
    noPhone: "Nationwide retailer — find your nearest branch",
    visitWebsite: "Visit website",
    visitWebsiteSr: (name: string) => ` for ${name} (opens in a new tab)`,
  },

  suggest: {
    eyebrow: "Keeping it current",
    title: "Know someone who belongs here?",
    body: "This directory changes as we work. If a listing is out of date, or you have worked with a surveyor, inspector or trade in the Atlanta metro who does consistently good work, tell us and we will look into adding them.",
  },

  cta: {
    eyebrow: "Need more than a phone number?",
    title: "Let us coordinate it for you.",
    lead: "Managing surveyors, inspectors and trades is what our project management service does. Tell us about the project and we will tell you which of these you actually need.",
  },
};

export type ResourcesCopy = typeof resources;
