export type BlogCategory = "IRC Code Updates" | "Design Trends";

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string[];
};

/**
 * Blog sections.
 *
 * `slug` (URL segment) and `category` (the lookup key that matches
 * `Post.category` and `postsByCategory()`) are never translated — they are
 * byte-identical across locales. `title` is the display name and is translated.
 */
export const BLOG_SECTIONS: {
  slug: string;
  category: BlogCategory;
  title: string;
  lead: string;
}[] = [
  {
    slug: "irc-code-updates",
    category: "IRC Code Updates",
    title: "IRC Code Updates",
    lead: "What changed in the residential code, in plain language — and what it means for the set of drawings sitting on your desk.",
  },
  {
    slug: "design-trends",
    category: "Design Trends",
    title: "Design Trends",
    lead: "What Atlanta homeowners, investors and developers are actually asking us to draw right now.",
  },
];

/**
 * Placeholder articles. The live site's blog sections were still being
 * populated at the time of the build — replace these with the real posts.
 */
export const POSTS: Post[] = [
  {
    slug: "what-the-latest-irc-cycle-changes-for-georgia-homes",
    title: "What the latest IRC cycle changes for Georgia homes",
    category: "IRC Code Updates",
    date: "2026-06-18",
    readingTime: "5 min read",
    excerpt:
      "Georgia adopts the International Residential Code with state amendments. Here is how to read a code cycle change without reading the whole book.",
    body: [
      "Every code cycle brings a handful of changes that actually affect the drawings we produce, and a much longer list that does not. The trick is knowing which is which before you submit.",
      "The changes that matter most to residential projects tend to cluster in three areas: energy and envelope requirements, egress and life-safety, and structural connections. Everything else usually flows through unchanged.",
      "Georgia does not adopt the IRC verbatim. The state amendments are published separately, and your county may layer additional requirements on top. A plan set drawn to the base IRC alone will still get comments.",
      "If you are holding a plan set that was drawn more than one cycle ago, it is worth a review before you spend money on permitting. We do that review as part of our consultation.",
    ],
  },
  {
    slug: "reading-a-code-comment-without-panicking",
    title: "Reading a code comment without panicking",
    category: "IRC Code Updates",
    date: "2026-05-02",
    readingTime: "4 min read",
    excerpt:
      "A plan review comment is not a rejection. Here is how to tell the difference between a note, a correction and a genuine redesign.",
    body: [
      "Most first-time applicants read a comment letter as a failure. In practice, comments are the normal shape of the process — very few sets go through with zero.",
      "Comments fall into three tiers. A note asks you to add information that already exists in your design. A correction asks you to change something specific. A redesign comment means an assumption in the scheme does not work.",
      "The first two are usually a matter of days. The third is the one worth a phone call before you start redrawing.",
      "We assist in addressing city comments to make the necessary adjustments — including on sets we did not originally draw.",
    ],
  },
  {
    slug: "what-atlanta-clients-are-asking-for-in-2026",
    title: "What Atlanta clients are asking for in 2026",
    category: "Design Trends",
    date: "2026-06-30",
    readingTime: "6 min read",
    excerpt:
      "ADUs, converted basements and shaded outdoor rooms. The requests coming through our door have shifted noticeably in the last two years.",
    body: [
      "The single biggest shift we have seen is the accessory dwelling unit. Garage apartments, basement suites and backyard cottages now make up a meaningful share of our residential intake.",
      "The driver is not fashion — it is arithmetic. An ADU adds rentable square footage on land the owner already holds, without the cost of acquiring a second lot.",
      "Second: outdoor rooms that are genuinely usable in a Georgia summer. Not a bare deck, but shaded structures — pergolas, covered patios, screened porches — designed for the actual sun angle on that lot.",
      "Third: clients are asking for renderings much earlier than they used to. They want to see it before they finance it, and lenders increasingly expect the same.",
    ],
  },
  {
    slug: "why-outdoor-structures-are-worth-drawing-properly",
    title: "Why outdoor structures are worth drawing properly",
    category: "Design Trends",
    date: "2026-04-15",
    readingTime: "4 min read",
    excerpt:
      "A pergola is not a weekend sketch. Footings, uplift and setbacks are exactly where DIY outdoor projects get red-tagged.",
    body: [
      "Outdoor structures look like the easiest thing on a property to build without drawings. They are also, in our experience, one of the most common triggers for a stop work order.",
      "The three things that catch people out are footing depth, wind uplift on an open roof, and setback from the property line. All three are decided before anyone picks up a saw.",
      "This is why we sell stock plans for pergolas, carports and tent frames — the geometry is standard, so the drawings can be too, at a fraction of custom cost.",
      "If your lot or county needs something different, we adapt the stock set rather than starting over.",
    ],
  },
];

export function postsByCategory(category: BlogCategory) {
  return POSTS.filter((p) => p.category === category).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
