import {
  Route,
  Layers,
  Package,
  Newspaper,
  Briefcase,
  LayoutGrid,
  Box,
  Building2,
  Frame,
  Map,
  OctagonAlert,
  ClipboardCheck,
  HardHat,
  FileStack,
  Scale,
  TrendingUp,
  BriefcaseBusiness,
  GraduationCap,
  Network,
  CircleQuestionMark,
  Users,
  Mail,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Builders Tech",
  tagline: "Design. Manage. Build.",
  motto: "Building, Together",
  headline: "A Multidisciplinary Design & Construction Management Firm",
  subhead: "No Project is too Big or too Small!",
  cta: "Schedule Your Project Today!",
  url: "https://www.builderstechnologysource.com",
  email: "services@builderstechnologysource.com",
  phone: "404-542-4280",
  phoneHref: "+14045424280",
  address: {
    street: "5300 Memorial Dr, Unit 102",
    city: "Stone Mountain",
    state: "GA",
    zip: "30083",
    full: "5300 Memorial Dr Unit 102, Stone Mountain, GA 30083",
  },
  serviceArea:
    "Georgia — primarily within a 2-hour radius of Stone Mountain, including Atlanta, Decatur, DeKalb County, Marietta and Cobb County.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** Headline proof points used across the site. */
export const STATS = [
  { value: 400, suffix: "+", label: "Projects completed locally" },
  { value: 134, suffix: "+", label: "Five-star reviews" },
  { value: 10, suffix: "", label: "Business-day turnaround" },
  { value: 5, suffix: "★", label: "Google, Thumbtack & Bark" },
] as const;

/* ------------------------------------------------------------------
   Navigation — mirrors the live site's menu and submenu structure
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
  { href: "/how-it-works", label: "How it Works", icon: Route },
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
        label: "Construction",
        description: "Design-build delivery under one accountable roof",
        icon: HardHat,
      },
    ],
  },
  {
    href: "/products",
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
    href: "/blog",
    label: "Blog",
    icon: Newspaper,
    children: [
      {
        href: "/blog/irc-code-updates",
        label: "IRC Code Updates",
        description: "What changed in the code and what it means for your build",
        icon: Scale,
      },
      {
        href: "/blog/design-trends",
        label: "Design Trends",
        description: "What Atlanta clients are actually asking us to build",
        icon: TrendingUp,
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
  {
    href: "/about",
    label: "More",
    icon: LayoutGrid,
    children: [
      {
        href: "/resources",
        label: "Building Resources",
        description: "Vetted local surveyors, inspectors, trades and suppliers",
        icon: Network,
      },
      {
        href: "/faq",
        label: "FAQ",
        description: "Permits, timelines, budgets and how we work",
        icon: CircleQuestionMark,
      },
      {
        href: "/about",
        label: "About Us",
        description: "From a basement office in Atlanta to a full-service firm",
        icon: Users,
      },
      {
        href: "/contact",
        label: "Contact Us",
        description: "Free consultation — call, email or WhatsApp",
        icon: Mail,
      },
    ],
  },
];
