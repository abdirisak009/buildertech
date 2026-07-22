import {
  Box,
  Building2,
  Frame,
  Map,
  OctagonAlert,
  ClipboardCheck,
  HardHat,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import { IMAGES } from "../images";

export type ServiceItem = { title: string; body?: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  headline: string;
  lead: string;
  icon: LucideIcon;
  image: string;
  items: ServiceItem[];
  /** Optional secondary group, e.g. Inspections under Project Management */
  secondary?: { heading: string; items: ServiceItem[] };
  /** Optional proof stats shown on the detail page */
  proof?: { value: string; label: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "renderings",
    title: "Renderings",
    short:
      "Photoreal 3D visuals that let clients, investors and buyers see the project before it exists.",
    headline: "Visualizing the Vision",
    lead:
      "A rendering is not decoration — it is the fastest way to get a decision. It turns a plan set that only a builder can read into something a buyer, a lender or a planning board can say yes to.",
    icon: Box,
    image: IMAGES.renderings,
    items: [
      {
        title: "Exterior renderings",
        body: "Street-level and aerial views with real materials, landscaping and lighting.",
      },
      {
        title: "Interior renderings",
        body: "Room-by-room visuals so clients can judge finishes and layout before committing.",
      },
      {
        title: "Site & aerial views",
        body: "Massing and context views that show how the building sits on the parcel.",
      },
      {
        title: "Marketing packages",
        body: "Render sets sized for listings, investor decks and permit presentations.",
      },
    ],
    proof: [
      { value: "20–30%", label: "Faster pre-sales for developers marketing with 3D renderings" },
      { value: "2x", label: "Engagement on listings with renderings vs. text or plans alone" },
      { value: "Easier", label: "Investor funding for projects presented with renderings and site plans" },
    ],
  },
  {
    slug: "architectural-plans",
    title: "Architectural Plans",
    short:
      "Permit-ready plans for residential and commercial projects across Atlanta, Georgia.",
    headline: "Professional Plans for Your Residential & Commercial Projects",
    lead:
      "We produce architectural plans for homeowners, investors and developers across the Atlanta area — home additions, new construction, remodels and multi-unit developments. Every set is drawn to be submitted, not admired.",
    icon: Building2,
    image: IMAGES.architectural,
    items: [
      { title: "Floor Plans", body: "Dimensioned layouts for every level, drawn to code." },
      { title: "Elevations", body: "All exterior faces with materials, heights and openings." },
      { title: "Sections", body: "Cut-through views showing assembly and clearances." },
      { title: "Details & Schedules", body: "Door, window and finish schedules plus construction details." },
      { title: "Site Plans", body: "Building placement, setbacks and site context." },
    ],
  },
  {
    slug: "structural-plans",
    title: "Structural Plans",
    short:
      "Foundation, framing and reinforcement design that is safe, stable and code-compliant.",
    headline: "Strong Foundations Start with the Right Structural Plans",
    lead:
      "We provide structural planning that keeps your project safe, stable and compliant with Atlanta's building codes — for home additions, new builds, remodels and multi-unit developments.",
    icon: Frame,
    image: IMAGES.structural,
    items: [
      { title: "Foundation Plans", body: "Footing layouts, slab design and foundation detailing." },
      { title: "Framing Plans", body: "Structural layout for floors, walls and roof systems." },
      { title: "Beam & Column Details", body: "Material specs, sizes and load requirements." },
      { title: "Structural Sections & Notes", body: "Cross-sectional views and engineering notes." },
      { title: "Reinforcement Plans", body: "Rebar layouts and structural strengthening strategies." },
    ],
  },
  {
    slug: "civil-plans",
    title: "Civil Plans",
    short:
      "Site, grading, drainage, utility and erosion control plans that satisfy the county.",
    headline: "Planning Your Site for Success",
    lead:
      "Civil planning for projects across Atlanta, Georgia — new construction, residential additions and multi-unit developments — with regulatory compliance and land assessment built into every sheet.",
    icon: Map,
    image: IMAGES.civil,
    items: [
      { title: "Site Plans", body: "Property boundaries, structures and setbacks." },
      { title: "Grading Plans", body: "Land leveling and water runoff management." },
      { title: "Drainage Plans", body: "Stormwater routing and erosion control." },
      { title: "Utility Plans", body: "Water, sewer and electrical layouts." },
      { title: "Erosion Control Plans", body: "Soil loss prevention and sediment measures." },
    ],
  },
  {
    slug: "stop-work-orders",
    title: "Stop Work Orders",
    short:
      "Got a red tag? We produce the documentation that gets it lifted — fast.",
    headline: "Got a Stop Work Order? We can fix it — fast.",
    lead:
      "A Stop Work Order is an official notice issued by a building or code enforcement authority that requires all construction activities on a site to halt immediately due to violations or safety concerns.",
    icon: OctagonAlert,
    image: IMAGES.stopWork,
    items: [
      {
        title: "Work proceeded without proper permits",
        body: "We prepare the as-built and permit documentation the authority requires.",
      },
      {
        title: "Construction did not follow approved plans",
        body: "We document what was built and reconcile it against the approved set.",
      },
      {
        title: "Unsafe conditions were created",
        body: "We provide the engineering and remediation documentation to clear the violation.",
      },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    short:
      "Planning, cost estimation, scheduling, quality control, staffing, safety and inspections.",
    headline: "Construction & Project Management",
    lead:
      "Our Construction & Project Management services can oversee all aspects of your project, including planning, cost estimation, scheduling and quality control.",
    icon: ClipboardCheck,
    image: IMAGES.projectMgmt,
    items: [
      { title: "Project Planning & Scheduling", body: "Sequencing and milestone planning from day one." },
      {
        title: "Constructability Reviews",
        body: "Our Constructability Reviews service ensures your project's design is practical and efficient for construction.",
      },
      { title: "Quality Assurance and Quality Control", body: "Inspection regimes that catch defects before they are buried." },
      {
        title: "Project Staffing",
        body: "Our Construction Staffing services provide skilled and reliable personnel to meet your project's workforce needs.",
      },
      {
        title: "Construction Scheduling",
        body: "Our Construction Scheduling services provide precise planning and timeline management for your project.",
      },
      {
        title: "Safety Management",
        body: "Our Construction Safety services prioritize the well-being of your workforce and compliance with regulations.",
      },
    ],
    secondary: {
      heading: "Inspections",
      items: [
        {
          title: "ADA & Safety Inspections",
          body: "Trained by the University of Missouri for ADA Inspections as an ADA coordinator.",
        },
        { title: "Erosion Control Inspections", body: "Site compliance checks against approved erosion control plans." },
        {
          title: "Stormwater Inspections (MS4)",
          body: "MS4 stormwater inspection services encompass a range of activities designed to ensure compliance with environmental regulations.",
        },
        {
          title: "Geotechnical & Special Inspections",
          body: "Geotech inspections, infiltration testing, drilling, soil sampling, material testing and third-party inspection.",
        },
      ],
    },
  },
  {
    slug: "construction",
    title: "Construction",
    short:
      "Design-build delivery that unites architecture and construction into one experience.",
    headline: "Design-Build Services",
    lead:
      "Our design-build service unites architecture and construction into one seamless, white-glove experience — one team, one contract, one point of accountability from first sketch to final walkthrough.",
    icon: HardHat,
    image: IMAGES.construction,
    items: [
      { title: "Home additions", body: "Extra square footage that ties into the existing structure properly." },
      { title: "New construction", body: "Ground-up custom homes on land you own or are buying." },
      { title: "Remodels & renovations", body: "Structural changes, MEP work and value engineering to your budget." },
      { title: "Multi-unit & townhomes", body: "Turnkey delivery from zoning and platting through handover." },
      { title: "Decks, patios & outdoor", body: "Permit-compliant outdoor structures designed to city regulations." },
      { title: "ADUs", body: "Garage apartments, basement suites and backyard cottages." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** Categories of work shown on the homepage. */
export const WORK_CATEGORIES = [
  "Commercial Design",
  "Commercial As-builts",
  "Residential Design",
  "Siteplan & Civil Design",
  "MEP Design",
  "Deck Designs",
  "Townhomes Development",
  "Conceptual Siteplan Design",
  "Construction Management",
  "Project Management",
  "Renderings",
];

/**
 * The six service cards on the homepage, mirroring the live Builders Tech
 * site. Each links to the closest matching service detail page.
 */
export type HomeServiceCard = {
  title: string;
  body: string;
  points: string[];
  href: string;
  icon: LucideIcon;
};

export const HOME_SERVICES: HomeServiceCard[] = [
  {
    title: "Stop Work Orders",
    body: "Have a Stop Work Order? Reach out today — we have experts that can help you resolve city issues and get your project back on track.",
    points: [
      "Additions without permits",
      "Decks without permits",
      "Zoning compliance & site plans",
      "Unlicensed work performed",
    ],
    href: "/services/stop-work-orders",
    icon: OctagonAlert,
  },
  {
    title: "Architectural Plans",
    body: "Permit-ready plans for residential and commercial projects — drawn to be submitted, not just admired.",
    points: [
      "Floor plans",
      "Elevations",
      "Sections",
      "Details & schedules",
      "Site plans",
    ],
    href: "/services/architectural-plans",
    icon: Building2,
  },
  {
    title: "Structural Plans",
    body: "Foundation, framing and reinforcement design that is safe, stable and compliant with local building codes.",
    points: [
      "Foundation plans",
      "Framing plans",
      "Beam & column details",
      "Reinforcement plans",
    ],
    href: "/services/structural-plans",
    icon: Frame,
  },
  {
    title: "Civil Plans",
    body: "Site, grading, drainage, utility and erosion control plans that satisfy the county.",
    points: [
      "Property lines & setbacks",
      "Grading & drainage",
      "Impervious calculations",
      "Erosion control",
      "Zoning & building data",
    ],
    href: "/services/civil-plans",
    icon: Map,
  },
  {
    title: "Project Management",
    body: "We oversee planning, cost estimation, scheduling, quality control and inspections — start to finish.",
    points: [
      "Scheduling & cost control",
      "Constructability reviews",
      "Quality assurance & QC",
      "Safety & inspections",
    ],
    href: "/services/project-management",
    icon: ClipboardCheck,
  },
  {
    title: "Renderings",
    body: "Photoreal 3D visuals that let clients, investors and buyers see the project before it exists.",
    points: [
      "Exterior renderings",
      "Interior renderings",
      "Site & aerial views",
      "Marketing packages",
    ],
    href: "/services/renderings",
    icon: Box,
  },
  {
    title: "Reserve Studies",
    body: "Reserve studies for HOAs and condo associations — a component inventory, condition assessment and a long-range funding plan.",
    points: [
      "Component inventory",
      "Condition assessment",
      "30-year funding plan",
      "Compliance-ready report",
    ],
    href: "/contact",
    icon: Calculator,
  },
];

/** Partner logos shown in the "Companies Who Trust Us" section. */
export const TRUST_LOGOS = [
  "Advanced Remodeling",
  "AP Construction",
  "33 North Homes",
  "BIG Construction",
  "Better Homes Real Estate",
  "Keller Williams",
  "GFS",
  "SBA",
  "So Far So Good Remodeling",
  "M Studio",
  "Nextgen Builders",
  "SIS Professional Services",
];

/** Review platforms Builders Tech is rated on. */
export const REVIEW_PLATFORMS_LIST = [
  "Google",
  "Thumbtack",
  "Bark",
  "Nextdoor",
  "Houzz",
  "Facebook",
];
