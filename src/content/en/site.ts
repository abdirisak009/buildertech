import {
  Info,
  Layers,
  Package,
  Briefcase,
  Box,
  Building2,
  Frame,
  Map,
  OctagonAlert,
  ClipboardCheck,
  HardHat,
  FileStack,
  BriefcaseBusiness,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Builders Tech",
  tagline: "Building Across America",
  motto: "Building Across America",
  headline: "Atlanta-based design & construction management",
  subhead: "No project is too small.",
  cta: "Schedule Your Project Today",
  partnerCta: "Become a Partner",
  url: "https://www.builderstechnologysource.com",
  email: "services@builderstechnologysource.com",
  // Primary (English) line
  phone: "404-542-4280",
  phoneHref: "+14045424280",
  // Spanish line
  phoneEs: "407-289-6606",
  phoneEsHref: "+14072896606",
  address: {
    street: "5300 Memorial Dr, Unit 102",
    city: "Stone Mountain",
    state: "GA",
    zip: "30083",
    full: "5300 Memorial Dr Unit 102, Stone Mountain, GA 30083",
  },
  serviceArea:
    "Atlanta and across Georgia — serving homeowners, builders and investors from Stone Mountain, Decatur, DeKalb County, Marietta and Cobb County.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** Headline proof points used across the site. */
export const STATS = [
  { value: 372, suffix: "+", label: "Projects completed locally" },
  { value: 134, suffix: "+", label: "Five-star reviews" },
  { value: 24, suffix: "hr", label: "Response to your intake form" },
  { value: 6, suffix: "", label: "Review platforms, all 5-star" },
] as const;

/* ------------------------------------------------------------------
   Navigation — mirrors the live builders-tech Webflow site:
   Home · About Us · Services ▾ · Products ▾ · Careers · Become a Partner
   ------------------------------------------------------------------ */

export type NavChild = {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  { href: "/about", label: "About Us", icon: Info },
  {
    href: "/services",
    label: "Services",
    icon: Layers,
    children: [
      {
        href: "/services/renderings",
        label: "Renderings",
        description: "Photoreal 3D visuals that sell the project before it exists",
        icon: Box,
      },
      {
        href: "/services/architectural-plans",
        label: "Architectural Plans",
        description: "Permit-ready floor plans, elevations, sections and schedules",
        icon: Building2,
      },
      {
        href: "/services/structural-plans",
        label: "Structural Plans",
        description: "Foundations, framing, beams and reinforcement detailing",
        icon: Frame,
      },
      {
        href: "/services/civil-plans",
        label: "Civil Plans",
        description: "Site, grading, drainage, utility and erosion control plans",
        icon: Map,
      },
      {
        href: "/services/stop-work-orders",
        label: "Stop Work Orders",
        description: "Get the red tag lifted and your project moving again",
        icon: OctagonAlert,
      },
      {
        href: "/services/project-management",
        label: "Project Management",
        description: "Scheduling, QA/QC, staffing, safety and inspections",
        icon: ClipboardCheck,
      },
      {
        href: "/services/construction",
        label: "Design-Build",
        description: "Architecture and construction under one accountable roof",
        icon: HardHat,
      },
    ],
  },
  {
    href: "/products/stock-plans",
    label: "Products",
    icon: Package,
    children: [
      {
        href: "/products/stock-plans",
        label: "Stock Plans",
        description: "Ready-to-build plan sets you can buy and download today",
        icon: FileStack,
      },
    ],
  },
  {
    href: "/careers",
    label: "Careers",
    icon: Briefcase,
    children: [
      {
        href: "/careers/open-positions",
        label: "Current Open Positions",
        description: "Engineering, design, project management and sales roles",
        icon: BriefcaseBusiness,
      },
      {
        href: "/careers/internships",
        label: "Internships",
        description: "Youth development and the next generation of builders",
        icon: GraduationCap,
      },
    ],
  },
];
