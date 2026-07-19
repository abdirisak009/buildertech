import type { ServicesCopy } from "../../en/pages/services";

export const services: ServicesCopy = {
  meta: {
    title: "Servicios",
    description:
      "Renders 3D, planos arquitectónicos, planos estructurales, planos civiles, órdenes de suspensión de obra, gerencia de proyectos y construcción diseño-construcción en Atlanta, Georgia.",
  },

  hero: {
    breadcrumb: "Servicios",
    eyebrow: "Lo que hacemos",
    titleBefore: "Desde un boceto hasta el ",
    titleAccent: "certificado de ocupación",
    titleAfter: ".",
    lead: "Siete servicios bajo un mismo techo. Contrátenos para un solo juego de planos, para rescatar un proyecto detenido o para el diseño y la construcción completos. Ningún proyecto es demasiado grande ni demasiado pequeño.",
    imageAlt: "Vista abstracta de la fachada de vidrio de un edificio",
  },

  /** Etiqueta del enlace de cada tarjeta, p. ej. "Ver Renders 3D". */
  exploreLabel: (title: string) => `Ver ${title}`,

  projectTypes: {
    eyebrow: "Tipos de proyecto",
    title: "El trabajo que asumimos.",
    lead: "Lo residencial es nuestro fuerte, pero el tablero de dibujo no se detiene ahí.",
  },

  cta: {
    eyebrow: "¿No sabe qué necesita?",
    title: "Pregúntenos — la consulta es gratuita.",
    lead: "Descríbanos el proyecto en pocas líneas y le diremos qué servicio le conviene de verdad, incluyendo la opción más económica cuando exista.",
  },
};
