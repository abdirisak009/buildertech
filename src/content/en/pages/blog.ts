export const blog = {
  metadata: {
    title: "Blog",
    description:
      "IRC code updates and design trends from Builders Tech — what changed in the residential code, and what Atlanta clients are actually asking us to draw.",
  },

  hero: {
    breadcrumb: "Blog",
    eyebrow: "Writing",
    titleBefore: "Notes from the",
    titleAccent: "drawing board",
    titleAfter: ".",
    lead: "Two things we get asked about constantly: what the code now requires, and what everyone else is building. We write about both in plain language.",
    imageAlt: "An engineer reviewing a physical model and drawings",
  },

  sections: {
    eyebrow: "Sections",
    title: "Two places to start.",
    /** Noun that follows the article count, e.g. "3 articles". */
    articleNoun: (count: number): string => (count === 1 ? "article" : "articles"),
    read: (section: string) => `Read ${section}`,
  },

  latest: {
    eyebrow: "Latest posts",
    title: "Everything we have published.",
  },

  /** Copy for /blog/[category] */
  category: {
    eyebrow: "Blog",
    articleNoun: (count: number): string => (count === 1 ? "article" : "articles"),
  },

  /** Copy for /blog/[category]/[slug] */
  post: {
    breadcrumbBlog: "Blog",
    backToCategory: (section: string) => `All ${section}`,
    moreFrom: (section: string) => `More from ${section}.`,
  },
};

export type BlogCopy = typeof blog;
