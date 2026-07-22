import {
  Home,
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
  tagline: "Construyendo en toda América",
  motto: "Construyendo en toda América",
  headline: "Diseño y gerencia de construcción con sede en Atlanta",
  subhead: "Ningún proyecto es demasiado pequeño.",
  cta: "Agende su proyecto hoy",
  partnerCta: "Sea socio",
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
    "Atlanta y todo Georgia — atendemos a propietarios, constructores e inversionistas desde Stone Mountain, Decatur, el condado de DeKalb, Marietta y el condado de Cobb.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** Datos destacados que respaldan nuestro trabajo, usados en todo el sitio. */
export const STATS = [
  { value: 372, suffix: "+", label: "Proyectos completados localmente" },
  { value: 134, suffix: "+", label: "Reseñas de cinco estrellas" },
  { value: 24, suffix: "hr", label: "Respuesta a su formulario de admisión" },
  { value: 6, suffix: "", label: "Plataformas de reseñas, todas 5 estrellas" },
] as const;

/* ------------------------------------------------------------------
   Navegación — refleja el sitio Webflow de builders-tech:
   Inicio · Sobre nosotros · Servicios ▾ · Productos ▾ · Empleos · Sea socio
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
  { href: "/", label: "Inicio", icon: Home },
  { href: "/about", label: "Sobre nosotros", icon: Info },
  {
    href: "/services",
    label: "Servicios",
    icon: Layers,
    children: [
      {
        href: "/services/renderings",
        label: "Renders 3D",
        description: "Imágenes 3D fotorrealistas que venden el proyecto antes de existir",
        icon: Box,
      },
      {
        href: "/services/architectural-plans",
        label: "Planos Arquitectónicos",
        description: "Plantas, elevaciones, secciones y cuadros listos para permiso",
        icon: Building2,
      },
      {
        href: "/services/structural-plans",
        label: "Planos Estructurales",
        description: "Cimentaciones, estructura, vigas y detalle de refuerzo",
        icon: Frame,
      },
      {
        href: "/services/civil-plans",
        label: "Planos Civiles",
        description: "Planos de lote, nivelación, drenaje, servicios y control de erosión",
        icon: Map,
      },
      {
        href: "/services/stop-work-orders",
        label: "Órdenes de Suspensión de Obra",
        description: "Levantamos la etiqueta roja y ponemos su proyecto en marcha otra vez",
        icon: OctagonAlert,
      },
      {
        href: "/services/project-management",
        label: "Gerencia de Proyectos",
        description: "Programación, control de calidad, personal, seguridad e inspecciones",
        icon: ClipboardCheck,
      },
      {
        href: "/services/construction",
        label: "Diseño-Construcción",
        description: "Arquitectura y construcción bajo un solo responsable",
        icon: HardHat,
      },
    ],
  },
  {
    href: "/products/stock-plans",
    label: "Productos",
    icon: Package,
    children: [
      {
        href: "/products/stock-plans",
        label: "Planos Prediseñados",
        description: "Juegos de planos listos para construir que puede comprar y descargar hoy",
        icon: FileStack,
      },
    ],
  },
  {
    href: "/careers",
    label: "Empleos",
    icon: Briefcase,
    children: [
      {
        href: "/careers/open-positions",
        label: "Vacantes Disponibles",
        description: "Puestos de ingeniería, diseño, gerencia de proyectos y ventas",
        icon: BriefcaseBusiness,
      },
      {
        href: "/careers/internships",
        label: "Pasantías",
        description: "Desarrollo juvenil y la próxima generación de constructores",
        icon: GraduationCap,
      },
    ],
  },
];
