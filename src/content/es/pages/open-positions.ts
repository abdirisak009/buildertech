import type { OpenPositionsCopy } from "../../en/pages/open-positions";

export const openPositions: OpenPositionsCopy = {
  metadata: {
    title: "Vacantes Disponibles",
    description:
      "Vacantes en Builders Tech en Stone Mountain, Georgia — Ingeniero Estructural, Diseñador Arquitectónico, Gerente de Proyectos y Representante de Ventas.",
  },

  hero: {
    breadcrumb: "Vacantes Disponibles",
    eyebrow: "Empleo",
    titleBefore: (count: number) => `${count} vacantes abiertas en el equipo de`,
    titleAccent: "Builders Tech",
    titleAfter: ".",
    lead: "Diseño, ingeniería, gerencia y ventas — todos trabajando en proyectos residenciales y comerciales ligeros activos en el área metropolitana de Atlanta. Postúlese por el formulario de contacto e indíquenos qué puesto busca.",
    imageAlt: "Un equipo de diseño y construcción trabajando en un estudio",
  },

  roles: {
    eyebrow: "Puestos abiertos",
    title: "Lo que estamos contratando ahora mismo.",
    lead: "Cada anuncio a continuación es una vacante activa. Si su experiencia se acerca pero no es exacta, postúlese de todos modos y díganoslo.",
    requirements: "Requisitos",
    apply: "Postularse a este puesto",
    applyAria: (role: string) => `Postularse al puesto de ${role}`,
  },

  cta: {
    eyebrow: "Postulaciones",
    title: "¿Listo para postularse?",
    lead: "Envíe su currículum y algunas muestras de trabajo por el formulario de contacto, indicando el puesto que quiere. Leemos cada postulación y le respondemos en cualquier caso.",
    primaryLabel: "Envíe su postulación",
  },
};
