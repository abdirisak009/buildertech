export type ProductCategory = "Outdoor Structures" | "Ready to Go Homes";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  size: string;
  summary: string;
  includes: string[];
};

/**
 * Filter categories.
 *
 * `value` is the filter key and is never translated: it is the same
 * `ProductCategory` union in both locales, so `p.category === value` keeps
 * working whichever language is active. `label` is the only thing rendered in
 * the filter chips, and it is translated per locale. The es file mirrors this
 * structure exactly so both bundles have an identical shape.
 */
export const PRODUCT_CATEGORIES: { value: "All" | ProductCategory; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Outdoor Structures", label: "Outdoor Structures" },
  { value: "Ready to Go Homes", label: "Ready to Go Homes" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "glamping-tent-frame",
    name: "Glamping Tent Frame Plan",
    price: 1100,
    category: "Outdoor Structures",
    size: "14' × 12'",
    summary:
      "A 14x12 glamping tent frame with multiple design renderings and structural views included.",
    includes: [
      "Dimensioned framing plan",
      "Structural views and connections",
      "Design renderings",
      "Materials list",
    ],
  },
  {
    slug: "traditional-pergola-10x10",
    name: "10' × 10' Traditional Pergola Plan",
    price: 500,
    category: "Outdoor Structures",
    size: "10' × 10'",
    summary:
      "Dimensional drawings and structural plans for a freestanding pergola structure.",
    includes: [
      "Dimensional drawings",
      "Structural plan and footing detail",
      "Rafter and beam schedule",
      "Materials list",
    ],
  },
  {
    slug: "attached-pergola-10x10",
    name: "10' × 10' Attached Pergola Plan",
    price: 500,
    category: "Outdoor Structures",
    size: "10' × 10'",
    summary:
      "A 10x10 attached pergola design with dimensional specifications and detailed construction views.",
    includes: [
      "Dimensional specifications",
      "Ledger and wall attachment detail",
      "Construction views",
      "Materials list",
    ],
  },
  {
    slug: "carport-20x12",
    name: "20' × 12' Carport Plan",
    price: 800,
    category: "Outdoor Structures",
    size: "20' × 12'",
    summary:
      "Carport structure plans covering framing, footings and roof assembly.",
    includes: [
      "Framing and footing plan",
      "Roof assembly detail",
      "Column and beam sizing",
      "Materials list",
    ],
  },
];

export const PRODUCT_NOTES = [
  {
    title: "Instant delivery",
    body: "Plan sets are delivered as print-ready PDFs. No waiting on a design queue.",
  },
  {
    title: "Drawn to code",
    body: "Every stock plan is drafted to the same standard as our custom work — not a clip-art sketch.",
  },
  {
    title: "Site adaptation available",
    body: "Need it stamped, resized or adapted to your lot and county? We can take a stock plan and make it yours.",
  },
];
