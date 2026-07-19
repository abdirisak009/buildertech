import type { ServiceDetailCopy } from "../../en/pages/service-detail";

export const serviceDetail: ServiceDetailCopy = {
  /** Texto alternativo del hero, p. ej. "Renders 3D — Builders Tech". */
  imageAlt: (title: string) => `${title} — Builders Tech`,

  stopWork: {
    title:
      "Ignorar una orden de suspensión de obra puede resultar en multas, sanciones legales o la revocación del permiso.",
    body: "No se puede continuar ningún trabajo hasta que se corrijan los problemas señalados, se obtengan las aprobaciones correspondientes y la agencia emisora levante la orden.",
    bodySecondary:
      "Builders Tech se especializa en preparar la documentación que ayuda a levantar la orden de suspensión de obra y a retomar su proyecto.",
    callLabel: (phone: string) => `Llame al ${phone}`,
    note: "No deje que una etiqueta roja detenga su proyecto.",
  },

  scope: {
    eyebrowStopWork: "Por qué se emiten las órdenes",
    eyebrow: (title: string) => `Nuestros servicios de ${title} incluyen`,
    titleStopWork:
      "Una orden de suspensión de obra suele deberse a una de tres causas.",
    title: "Lo que usted recibe.",
  },

  secondary: {
    eyebrow: "También disponible",
  },

  others: {
    eyebrow: "Siga explorando",
    title: "Otros servicios.",
  },
};
