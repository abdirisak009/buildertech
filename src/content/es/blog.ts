export type BlogCategory = "IRC Code Updates" | "Design Trends";

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string[];
};

/**
 * Secciones del blog.
 *
 * `slug` (segmento de URL) y `category` (clave de búsqueda que coincide con
 * `Post.category` y con `postsByCategory()`) NO se traducen: son idénticos en
 * ambos idiomas. `title` es el nombre visible y sí se traduce.
 */
export const BLOG_SECTIONS: {
  slug: string;
  category: BlogCategory;
  title: string;
  lead: string;
}[] = [
  {
    slug: "irc-code-updates",
    category: "IRC Code Updates",
    title: "Actualizaciones del Código IRC",
    lead: "Qué cambió en el código residencial, en lenguaje sencillo — y qué significa para el juego de planos que tiene sobre el escritorio.",
  },
  {
    slug: "design-trends",
    category: "Design Trends",
    title: "Tendencias de Diseño",
    lead: "Lo que los propietarios, inversionistas y desarrolladores de Atlanta nos están pidiendo dibujar en este momento.",
  },
];

/**
 * Artículos de muestra. Las secciones del blog del sitio aún se estaban
 * llenando al momento de la construcción — reemplácelos con las entradas reales.
 */
export const POSTS: Post[] = [
  {
    slug: "what-the-latest-irc-cycle-changes-for-georgia-homes",
    title: "Qué cambia el último ciclo del IRC para las casas de Georgia",
    category: "IRC Code Updates",
    date: "2026-06-18",
    readingTime: "5 min de lectura",
    excerpt:
      "Georgia adopta el International Residential Code con enmiendas estatales. Así se lee un cambio de ciclo del código sin tener que leer el libro completo.",
    body: [
      "Cada ciclo del código trae un puñado de cambios que realmente afectan los planos que producimos, y una lista mucho más larga que no. El truco está en saber cuál es cuál antes de presentar.",
      "Los cambios que más importan en proyectos residenciales suelen agruparse en tres áreas: requisitos de energía y envolvente, salidas de emergencia y seguridad humana, y conexiones estructurales. Todo lo demás normalmente pasa sin novedad.",
      "Georgia no adopta el IRC al pie de la letra. Las enmiendas estatales se publican por separado, y su condado puede sumar requisitos adicionales encima. Un juego de planos dibujado solo con el IRC base igual recibirá comentarios.",
      "Si tiene en mano un juego de planos dibujado hace más de un ciclo, vale la pena revisarlo antes de gastar dinero en el permiso. Hacemos esa revisión como parte de nuestra consulta.",
    ],
  },
  {
    slug: "reading-a-code-comment-without-panicking",
    title: "Cómo leer un comentario del código sin entrar en pánico",
    category: "IRC Code Updates",
    date: "2026-05-02",
    readingTime: "4 min de lectura",
    excerpt:
      "Un comentario de revisión de planos no es un rechazo. Así se distingue entre una nota, una corrección y un rediseño de verdad.",
    body: [
      "La mayoría de quienes solicitan por primera vez leen una carta de comentarios como si fuera un fracaso. En la práctica, los comentarios son la forma normal del proceso — muy pocos juegos pasan con cero.",
      "Los comentarios se dividen en tres niveles. Una nota le pide agregar información que ya existe en su diseño. Una corrección le pide cambiar algo puntual. Un comentario de rediseño significa que un supuesto del esquema no funciona.",
      "Los dos primeros suelen ser cuestión de días. El tercero es el que amerita una llamada telefónica antes de empezar a redibujar.",
      "Le ayudamos a atender los comentarios de la ciudad para hacer los ajustes necesarios — incluso en juegos de planos que no dibujamos nosotros originalmente.",
    ],
  },
  {
    slug: "what-atlanta-clients-are-asking-for-in-2026",
    title: "Qué están pidiendo los clientes de Atlanta en 2026",
    category: "Design Trends",
    date: "2026-06-30",
    readingTime: "6 min de lectura",
    excerpt:
      "ADUs, sótanos convertidos y espacios exteriores con sombra. Las solicitudes que llegan a nuestra puerta han cambiado notablemente en los últimos dos años.",
    body: [
      "El cambio más grande que hemos visto es la unidad de vivienda accesoria. Los apartamentos sobre garaje, las suites en sótano y las casitas de traspatio ya representan una parte importante de nuestro trabajo residencial.",
      "El motor no es la moda: es la aritmética. Una ADU agrega pies cuadrados rentables en un terreno que el propietario ya tiene, sin el costo de adquirir un segundo lote.",
      "Segundo: espacios exteriores que de verdad se puedan usar en un verano de Georgia. No un deck a la intemperie, sino estructuras con sombra — pérgolas, patios techados, porches con mosquitero — diseñadas para el ángulo real del sol en ese lote.",
      "Tercero: los clientes piden renders mucho antes que en el pasado. Quieren verlo antes de financiarlo, y los prestamistas cada vez esperan lo mismo.",
    ],
  },
  {
    slug: "why-outdoor-structures-are-worth-drawing-properly",
    title: "Por qué vale la pena dibujar bien las estructuras exteriores",
    category: "Design Trends",
    date: "2026-04-15",
    readingTime: "4 min de lectura",
    excerpt:
      "Una pérgola no es un boceto de fin de semana. Las zapatas, la succión del viento y los retiros son justo donde los proyectos exteriores caseros reciben la etiqueta roja.",
    body: [
      "Las estructuras exteriores parecen lo más fácil de construir en una propiedad sin planos. También son, según nuestra experiencia, una de las causas más comunes de una orden de suspensión de obra.",
      "Las tres cosas que agarran desprevenida a la gente son la profundidad de la zapata, la succión del viento sobre un techo abierto y el retiro respecto al lindero. Las tres se deciden antes de que alguien tome una sierra.",
      "Por eso vendemos planos prediseñados de pérgolas, cocheras y estructuras para carpa — la geometría es estándar, así que los planos también pueden serlo, a una fracción del costo de un diseño a la medida.",
      "Si su lote o su condado requieren algo distinto, adaptamos el juego prediseñado en lugar de empezar de cero.",
    ],
  },
];

export function postsByCategory(category: BlogCategory) {
  return POSTS.filter((p) => p.category === category).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

/**
 * Se conserva para que ambos idiomas tengan exportaciones idénticas. La
 * aplicación ahora usa `formatDate(iso, locale)` de `src/lib/date.ts`.
 */
export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("es-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
