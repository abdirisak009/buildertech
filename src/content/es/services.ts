import {
  Box,
  Building2,
  Frame,
  Map,
  OctagonAlert,
  ClipboardCheck,
  HardHat,
  Home,
  Store,
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
  /** Grupo secundario opcional, p. ej. Inspecciones dentro de Gerencia de Proyectos */
  secondary?: { heading: string; items: ServiceItem[] };
  /** Datos de respaldo opcionales que se muestran en la página de detalle */
  proof?: { value: string; label: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "renderings",
    title: "Renders 3D",
    short:
      "Imágenes 3D fotorrealistas para que clientes, inversionistas y compradores vean el proyecto antes de que exista.",
    headline: "Visualizando la idea",
    lead:
      "Un render no es decoración: es la manera más rápida de obtener una decisión. Convierte un juego de planos que solo un constructor sabe leer en algo a lo que un comprador, un prestamista o una junta de planificación puede decir que sí.",
    icon: Box,
    image: IMAGES.renderings,
    items: [
      {
        title: "Renders exteriores",
        body: "Vistas a nivel de calle y aéreas con materiales, paisajismo e iluminación reales.",
      },
      {
        title: "Renders interiores",
        body: "Imágenes cuarto por cuarto para que el cliente evalúe acabados y distribución antes de comprometerse.",
      },
      {
        title: "Vistas del lote y aéreas",
        body: "Vistas de volumetría y contexto que muestran cómo se asienta la construcción en el lote.",
      },
      {
        title: "Paquetes de mercadeo",
        body: "Juegos de renders dimensionados para anuncios, presentaciones a inversionistas y trámites de permiso.",
      },
    ],
    proof: [
      { value: "20–30%", label: "Preventas más rápidas para desarrolladores que promocionan con renders 3D" },
      { value: "2x", label: "Interacción en anuncios con renders frente a solo texto o planos" },
      { value: "Más fácil", label: "Financiamiento de inversionistas para proyectos presentados con renders y planos de lote" },
    ],
  },
  {
    slug: "architectural-plans",
    title: "Planos Arquitectónicos",
    short:
      "Planos listos para permiso, para proyectos residenciales y comerciales en toda el área de Atlanta, Georgia.",
    headline: "Planos profesionales para sus proyectos residenciales y comerciales",
    lead:
      "Elaboramos planos arquitectónicos para propietarios, inversionistas y desarrolladores en el área de Atlanta — ampliaciones, obra nueva, remodelaciones y desarrollos multifamiliares. Cada juego se dibuja para presentarse ante la ciudad, no para admirarse.",
    icon: Building2,
    image: IMAGES.architectural,
    items: [
      { title: "Plantas Arquitectónicas", body: "Distribuciones acotadas de cada nivel, dibujadas conforme al código." },
      { title: "Elevaciones", body: "Todas las fachadas con materiales, alturas y vanos." },
      { title: "Secciones", body: "Vistas de corte que muestran el ensamblaje y las alturas libres." },
      { title: "Detalles y Cuadros", body: "Cuadros de puertas, ventanas y acabados, más detalles constructivos." },
      { title: "Planos de Lote", body: "Ubicación de la construcción, retiros y contexto del lote." },
    ],
  },
  {
    slug: "structural-plans",
    title: "Planos Estructurales",
    short:
      "Diseño de cimentación, estructura y refuerzo que es seguro, estable y conforme al código.",
    headline: "Una buena obra empieza con los planos estructurales correctos",
    lead:
      "Ofrecemos diseño estructural que mantiene su proyecto seguro, estable y conforme a los códigos de construcción de Atlanta — para ampliaciones, obra nueva, remodelaciones y desarrollos multifamiliares.",
    icon: Frame,
    image: IMAGES.structural,
    items: [
      { title: "Planos de Cimentación", body: "Trazo de zapatas, diseño de losa y detalle de cimentación." },
      { title: "Planos de Estructura", body: "Distribución estructural de entrepisos, muros y sistemas de techo." },
      { title: "Detalles de Vigas y Columnas", body: "Especificaciones de material, dimensiones y requisitos de carga." },
      { title: "Secciones y Notas Estructurales", body: "Vistas en corte y notas de ingeniería." },
      { title: "Planos de Refuerzo", body: "Trazo de varilla y estrategias de reforzamiento estructural." },
    ],
  },
  {
    slug: "civil-plans",
    title: "Planos Civiles",
    short:
      "Planos de lote, nivelación, drenaje, servicios y control de erosión que cumplen con el condado.",
    headline: "Planificando su lote para el éxito",
    lead:
      "Diseño civil para proyectos en toda Atlanta, Georgia — obra nueva, ampliaciones residenciales y desarrollos multifamiliares — con cumplimiento normativo y evaluación del terreno incorporados en cada lámina.",
    icon: Map,
    image: IMAGES.civil,
    items: [
      { title: "Planos de Lote", body: "Linderos de la propiedad, construcciones y retiros." },
      { title: "Planos de Nivelación", body: "Nivelación del terreno y manejo del escurrimiento de agua." },
      { title: "Planos de Drenaje", body: "Conducción de aguas pluviales y control de erosión." },
      { title: "Planos de Servicios", body: "Trazos de agua, drenaje sanitario y electricidad." },
      { title: "Planos de Control de Erosión", body: "Prevención de pérdida de suelo y medidas de sedimentación." },
    ],
  },
  {
    slug: "stop-work-orders",
    title: "Órdenes de Suspensión de Obra",
    short:
      "¿Le pusieron etiqueta roja? Elaboramos la documentación que la levanta — rápido.",
    headline: "¿Tiene una orden de suspensión de obra? Podemos resolverla — rápido.",
    lead:
      "Una orden de suspensión de obra es una notificación oficial emitida por la autoridad de construcción o de cumplimiento del código que exige detener de inmediato toda actividad constructiva en el sitio por violaciones o problemas de seguridad.",
    icon: OctagonAlert,
    image: IMAGES.stopWork,
    items: [
      {
        title: "Se trabajó sin los permisos correspondientes",
        body: "Preparamos la documentación de lo construido y de permiso que exige la autoridad.",
      },
      {
        title: "La construcción no siguió los planos aprobados",
        body: "Documentamos lo que se construyó y lo conciliamos con el juego aprobado.",
      },
      {
        title: "Se generaron condiciones inseguras",
        body: "Entregamos la documentación de ingeniería y remediación para levantar la violación.",
      },
    ],
  },
  {
    slug: "project-management",
    title: "Gerencia de Proyectos",
    short:
      "Planificación, estimación de costos, programación, control de calidad, personal, seguridad e inspecciones.",
    headline: "Gerencia de construcción y de proyectos",
    lead:
      "Nuestros servicios de gerencia de construcción y de proyectos pueden supervisar todos los aspectos de su proyecto, incluyendo planificación, estimación de costos, programación y control de calidad.",
    icon: ClipboardCheck,
    image: IMAGES.projectMgmt,
    items: [
      { title: "Planificación y Programación del Proyecto", body: "Secuenciación y planificación de hitos desde el primer día." },
      {
        title: "Revisiones de Constructibilidad",
        body: "Nuestro servicio de revisión de constructibilidad asegura que el diseño de su proyecto sea práctico y eficiente de construir.",
      },
      { title: "Aseguramiento y Control de Calidad", body: "Esquemas de inspección que detectan defectos antes de que queden ocultos." },
      {
        title: "Personal para el Proyecto",
        body: "Nuestros servicios de personal de construcción proveen trabajadores calificados y confiables para cubrir las necesidades de mano de obra de su proyecto.",
      },
      {
        title: "Programación de Obra",
        body: "Nuestros servicios de programación de obra ofrecen planificación precisa y manejo de plazos para su proyecto.",
      },
      {
        title: "Gestión de Seguridad",
        body: "Nuestros servicios de seguridad en obra priorizan el bienestar de su personal y el cumplimiento de la normativa.",
      },
    ],
    secondary: {
      heading: "Inspecciones",
      items: [
        {
          title: "Inspecciones ADA y de Seguridad",
          body: "Capacitados por la University of Missouri en inspecciones ADA como coordinador ADA.",
        },
        { title: "Inspecciones de Control de Erosión", body: "Verificación del cumplimiento en obra frente a los planos de control de erosión aprobados." },
        {
          title: "Inspecciones de Aguas Pluviales (MS4)",
          body: "Los servicios de inspección de aguas pluviales MS4 abarcan una serie de actividades diseñadas para asegurar el cumplimiento de la normativa ambiental.",
        },
        {
          title: "Inspecciones Geotécnicas y Especiales",
          body: "Inspecciones geotécnicas, pruebas de infiltración, perforación, muestreo de suelos, pruebas de materiales e inspección por terceros.",
        },
      ],
    },
  },
  {
    slug: "construction",
    title: "Construcción",
    short:
      "Entrega diseño-construcción que une la arquitectura y la obra en una sola experiencia.",
    headline: "Servicios de diseño-construcción",
    lead:
      "Nuestro servicio de diseño-construcción une la arquitectura y la obra en una sola experiencia impecable y de primer nivel — un solo equipo, un solo contrato y un solo responsable, desde el primer boceto hasta el recorrido final.",
    icon: HardHat,
    image: IMAGES.construction,
    items: [
      { title: "Ampliaciones de vivienda", body: "Pies cuadrados adicionales que se integran correctamente con la estructura existente." },
      { title: "Obra nueva", body: "Casas personalizadas desde cero en el terreno que ya tiene o que está por comprar." },
      { title: "Remodelaciones y renovaciones", body: "Cambios estructurales, trabajo de instalaciones e ingeniería de valor ajustada a su presupuesto." },
      { title: "Multifamiliares y townhomes", body: "Entrega llave en mano, desde zonificación y subdivisión hasta la entrega final." },
      { title: "Decks, patios y exteriores", body: "Estructuras exteriores conformes al permiso y diseñadas según la normativa municipal." },
      { title: "ADUs", body: "Apartamentos sobre garaje, suites en sótano y casitas de traspatio." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** Categorías de trabajo que se muestran en la página de inicio. */
export const WORK_CATEGORIES = [
  "Diseño Comercial",
  "As-builts Comerciales",
  "Diseño Residencial",
  "Diseño de Lote y Civil",
  "Diseño de Instalaciones (MEP)",
  "Diseño de Decks",
  "Desarrollo de Townhomes",
  "Diseño Conceptual de Lote",
  "Gerencia de Construcción",
  "Gerencia de Proyectos",
  "Renders 3D",
];

/**
 * Las seis tarjetas de servicio de la página de inicio, que reflejan el sitio
 * en vivo de Builders Tech. Cada una enlaza a la página de detalle más cercana.
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
    title: "Órdenes de Suspensión de Obra",
    body: "¿Tiene una orden de suspensión de obra? Contáctenos hoy — contamos con expertos que pueden ayudarle a resolver los problemas con la ciudad y retomar su proyecto.",
    points: [
      "Ampliaciones sin permiso",
      "Decks sin permiso",
      "Cumplimiento de zonificación y planos de lote",
      "Trabajo realizado sin licencia",
    ],
    href: "/services/stop-work-orders",
    icon: OctagonAlert,
  },
  {
    title: "Juegos de Planos Residenciales para Permiso",
    body: "¿Necesita planos para permisos o aprobación de construcción? Ofrecemos planos para:",
    points: [
      "Ampliaciones",
      "ADUs y casas de huéspedes",
      "Decks y porches cubiertos",
      "Acabados de sótano",
      "Renovaciones y remodelaciones",
      "Garajes y cocheras",
    ],
    href: "/services/architectural-plans",
    icon: Home,
  },
  {
    title: "Juegos de Planos Comerciales para Permiso",
    body: "Planos comerciales profesionales para permiso, para oficinas, comercios, restaurantes y más — con dibujos arquitectónicos, estructurales y de instalaciones coordinados para aprobaciones sin contratiempos.",
    points: [
      "Cafeterías",
      "Adecuaciones comerciales",
      "Oficinas",
      "Bodegas prefabricadas",
      "Guarderías",
      "Planos de protección de la vida",
    ],
    href: "/services/architectural-plans",
    icon: Store,
  },
  {
    title: "Planos de Lote",
    body: "¿Necesita un plano de lote para permisos, desarrollo o aprobación de construcción?",
    points: [
      "Linderos y retiros",
      "Cálculos de área impermeable",
      "Drenaje",
      "Control de erosión",
      "Árboles y paisajismo",
      "Datos de zonificación y construcción",
    ],
    href: "/services/civil-plans",
    icon: Map,
  },
  {
    title: "Ingeniería Estructural",
    body: "Ingeniería estructural confiable para proyectos residenciales y comerciales — diseños seguros y conformes al código, con planos y cálculos detallados a la medida de su proyecto.",
    points: [
      "Cartas estructurales",
      "Inspecciones y reparaciones de decks",
      "Evaluación de muros de carga",
      "Soporte de muros de contención",
    ],
    href: "/services/structural-plans",
    icon: Frame,
  },
  {
    title: "Servicios de Diseño-Construcción",
    body: "Nuestro servicio de diseño-construcción une la arquitectura y la obra en una sola experiencia impecable y de primer nivel. Del concepto a la entrega, creamos espacios personalizados y atemporales con una ejecución excepcional.",
    points: [
      "Arquitectura y construcción, un solo equipo",
      "Espacios personalizados y atemporales",
      "Ejecución excepcional",
      "Del concepto a la entrega",
    ],
    href: "/services/construction",
    icon: HardHat,
  },
];

/** Logos de socios en la sección "Empresas que confían en nosotros". */
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

/** Plataformas de reseñas donde Builders Tech está calificado. */
export const REVIEW_PLATFORMS_LIST = [
  "Google",
  "Thumbtack",
  "Bark",
  "Nextdoor",
  "Houzz",
  "Facebook",
];
