export type ProductCategory = "Outdoor Structures" | "Ready to Go Homes";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  size: string;
  summary: string;
  includes: string[];
};

/**
 * Categorías de filtrado.
 *
 * `value` es la clave de filtrado y NO se traduce: es la misma unión
 * `ProductCategory` en ambos idiomas, así que `p.category === value` sigue
 * funcionando sin importar el idioma activo. `label` es lo único que se
 * muestra en los chips de filtro, y sí se traduce. La misma estructura existe
 * en el archivo en inglés para que ambos paquetes tengan una forma idéntica.
 */
export const PRODUCT_CATEGORIES: { value: "All" | ProductCategory; label: string }[] = [
  { value: "All", label: "Todos" },
  { value: "Outdoor Structures", label: "Estructuras Exteriores" },
  { value: "Ready to Go Homes", label: "Casas Listas para Construir" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "glamping-tent-frame",
    name: "Plano de Estructura para Carpa de Glamping",
    price: 1100,
    category: "Outdoor Structures",
    size: "14' × 12'",
    summary:
      "Una estructura para carpa de glamping de 14x12 con varios renders de diseño y vistas estructurales incluidas.",
    includes: [
      "Plano de estructura acotado",
      "Vistas estructurales y conexiones",
      "Renders de diseño",
      "Lista de materiales",
    ],
  },
  {
    slug: "traditional-pergola-10x10",
    name: "Plano de Pérgola Tradicional de 10' × 10'",
    price: 500,
    category: "Outdoor Structures",
    size: "10' × 10'",
    summary:
      "Dibujos acotados y planos estructurales para una pérgola independiente.",
    includes: [
      "Dibujos acotados",
      "Plano estructural y detalle de zapata",
      "Cuadro de vigas y viguetas",
      "Lista de materiales",
    ],
  },
  {
    slug: "attached-pergola-10x10",
    name: "Plano de Pérgola Adosada de 10' × 10'",
    price: 500,
    category: "Outdoor Structures",
    size: "10' × 10'",
    summary:
      "Un diseño de pérgola adosada de 10x10 con especificaciones acotadas y vistas constructivas detalladas.",
    includes: [
      "Especificaciones acotadas",
      "Detalle de solera y anclaje al muro",
      "Vistas constructivas",
      "Lista de materiales",
    ],
  },
  {
    slug: "carport-20x12",
    name: "Plano de Cochera de 20' × 12'",
    price: 800,
    category: "Outdoor Structures",
    size: "20' × 12'",
    summary:
      "Planos de estructura de cochera que cubren armado, zapatas y ensamblaje de techo.",
    includes: [
      "Plano de estructura y zapatas",
      "Detalle de ensamblaje de techo",
      "Dimensionamiento de columnas y vigas",
      "Lista de materiales",
    ],
  },
];

export const PRODUCT_NOTES = [
  {
    title: "Entrega inmediata",
    body: "Los juegos de planos se entregan como PDFs listos para imprimir. Sin esperar en una fila de diseño.",
  },
  {
    title: "Dibujados conforme al código",
    body: "Cada plano prediseñado se dibuja con el mismo estándar que nuestro trabajo a la medida — no es un boceto genérico.",
  },
  {
    title: "Adaptación al lote disponible",
    body: "¿Necesita sellarlo, redimensionarlo o adaptarlo a su lote y condado? Podemos tomar un plano prediseñado y hacerlo suyo.",
  },
];
