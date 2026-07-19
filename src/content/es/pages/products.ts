import type { ProductsCopy } from "../../en/pages/products";

export const products: ProductsCopy = {
  metadata: {
    title: "Productos",
    description:
      "Juegos de planos listos para construir de Builders Tech — pérgolas, cocheras y estructuras para carpas de glamping, dibujados con el mismo estándar que nuestro trabajo a medida.",
  },

  hero: {
    breadcrumb: "Productos",
    eyebrow: "Compre un juego de planos",
    titleBefore: "Planos que puede comprar",
    titleAccent: "ya listos",
    titleAfter: ".",
    lead: "Algunas estructuras son lo bastante estándar como para que no haga falta reinventar la geometría. Para esas, vendemos el juego de planos directamente — bien dibujado y con un precio acorde.",
    imageAlt: "Juegos de planos arquitectónicos extendidos sobre una mesa de dibujo",
  },

  stock: {
    eyebrow: "Planos Estándar",
    title: "Juegos de planos listos para construir.",
    lead: "Estructuras exteriores y casas listas para construir, entregadas como PDF listos para imprimir. Compre el juego hoy, o pídanos que lo adaptemos a su lote y su condado.",
    browse: (count: number) => `Ver los ${count} planos estándar`,
    cardPrice: "Desde $500",
    cardTitle: "Pérgolas, cocheras y estructuras para carpas",
    cardBody:
      "Estructura acotada, detalles estructurales y lista de materiales en cada juego.",
  },

  notes: {
    eyebrow: "Cómo funciona",
    title: "Qué obtiene al comprar un plano estándar.",
  },

  cta: {
    eyebrow: "¿Necesita algo a medida?",
    title: "Dibujamos los que no están en el catálogo.",
    lead: "Si su proyecto no encaja en un juego estándar, cuéntenos qué va a construir. La consulta es gratuita y los planos quedan listos para permiso en 10 días hábiles.",
  },
};
