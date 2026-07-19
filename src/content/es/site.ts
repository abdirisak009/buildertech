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
  tagline: "Diseñamos. Gestionamos. Construimos.",
  motto: "Construyendo, Juntos",
  headline: "Una firma multidisciplinaria de diseño y gerencia de construcción",
  subhead: "¡Ningún proyecto es demasiado grande ni demasiado pequeño!",
  cta: "¡Agende su proyecto hoy mismo!",
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
    "Georgia — principalmente dentro de un radio de 2 horas de Stone Mountain, incluyendo Atlanta, Decatur, el condado de DeKalb, Marietta y el condado de Cobb.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** Datos destacados que respaldan nuestro trabajo, usados en todo el sitio. */
export const STATS = [
  { value: 400, suffix: "+", label: "Proyectos completados localmente" },
  { value: 134, suffix: "+", label: "Reseñas de cinco estrellas" },
  { value: 10, suffix: "", label: "Días hábiles de entrega" },
  { value: 5, suffix: "★", label: "Google, Thumbtack y Bark" },
] as const;

/* ------------------------------------------------------------------
   Navegación — refleja la estructura de menús y submenús del sitio
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
  { href: "/how-it-works", label: "Cómo Funciona", icon: Route },
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
        label: "Construcción",
        description: "Entrega diseño-construcción bajo un solo responsable",
        icon: HardHat,
      },
    ],
  },
  {
    href: "/products",
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
    href: "/blog",
    label: "Blog",
    icon: Newspaper,
    children: [
      {
        href: "/blog/irc-code-updates",
        label: "Actualizaciones del Código IRC",
        description: "Qué cambió en el código y qué significa para su obra",
        icon: Scale,
      },
      {
        href: "/blog/design-trends",
        label: "Tendencias de Diseño",
        description: "Lo que los clientes de Atlanta realmente nos están pidiendo construir",
        icon: TrendingUp,
      },
    ],
  },
  {
    href: "/careers",
    label: "Empleo",
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
  {
    href: "/about",
    label: "Más",
    icon: LayoutGrid,
    children: [
      {
        href: "/resources",
        label: "Recursos de Construcción",
        description: "Topógrafos, inspectores, oficios y proveedores locales verificados",
        icon: Network,
      },
      {
        href: "/faq",
        label: "Preguntas Frecuentes",
        description: "Permisos, plazos, presupuestos y cómo trabajamos",
        icon: CircleQuestionMark,
      },
      {
        href: "/about",
        label: "Quiénes Somos",
        description: "De una oficina en un sótano de Atlanta a una firma de servicio completo",
        icon: Users,
      },
      {
        href: "/contact",
        label: "Contáctenos",
        description: "Consulta gratuita — llame, escriba un correo o use WhatsApp",
        icon: Mail,
      },
    ],
  },
];
