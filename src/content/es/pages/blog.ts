import type { BlogCopy } from "../../en/pages/blog";

export const blog: BlogCopy = {
  metadata: {
    title: "Blog",
    description:
      "Actualizaciones del código IRC y tendencias de diseño de Builders Tech — qué cambió en el código residencial y qué nos están pidiendo dibujar los clientes de Atlanta.",
  },

  hero: {
    breadcrumb: "Blog",
    eyebrow: "Publicaciones",
    titleBefore: "Apuntes desde el",
    titleAccent: "tablero de dibujo",
    titleAfter: ".",
    lead: "Dos cosas que nos preguntan constantemente: qué exige ahora el código y qué está construyendo todo el mundo. Escribimos sobre ambas en lenguaje sencillo.",
    imageAlt: "Un ingeniero revisando una maqueta física y planos",
  },

  sections: {
    eyebrow: "Secciones",
    title: "Dos lugares para empezar.",
    articleNoun: (count: number) => (count === 1 ? "artículo" : "artículos"),
    read: (section: string) => `Leer ${section}`,
  },

  latest: {
    eyebrow: "Últimas publicaciones",
    title: "Todo lo que hemos publicado.",
  },

  category: {
    eyebrow: "Blog",
    articleNoun: (count: number) => (count === 1 ? "artículo" : "artículos"),
  },

  post: {
    breadcrumbBlog: "Blog",
    backToCategory: (section: string) => `Todo en ${section}`,
    moreFrom: (section: string) => `Más de ${section}.`,
  },
};
