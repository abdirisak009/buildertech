import type { ResourcesCopy } from "../../en/pages/resources";

export const resources: ResourcesCopy = {
  meta: {
    title: "Recursos de construcción",
    description:
      "Un directorio de topógrafos, inspectores, oficios, proveedores y gestores de permisos locales verificados, dentro de 30 millas de nuestra oficina en Decatur. Builders Tech no recibe comisión de ningún proveedor listado.",
  },

  hero: {
    breadcrumb: "Recursos de construcción",
    eyebrow: "Directorio local",
    titleLead: "Las personas a las que ",
    titleAccent: "realmente llamamos",
    titleTail: ".",
    imageAlt: "Una obra residencial en actividad",
    counts: (providers: number, categories: number) =>
      `${providers} proveedores en ${categories} categorías`,
  },

  jumpNavLabel: "Categorías de recursos",

  disclaimer: {
    title: "Sin comisiones ni tarifas por referencia.",
    body: "Builders Tech no recibe comisión, retorno ni tarifa por referencia de ningún proveedor de esta página. Son empresas con las que hemos trabajado en proyectos reales y a las que volveríamos a llamar. Los precios, las licencias, los seguros y la programación son estrictamente entre usted y el proveedor: verifique las credenciales vigentes antes de contratar.",
  },

  directory: {
    providerCount: (count: number) =>
      `${count} ${count === 1 ? "proveedor" : "proveedores"}`,
    callSr: (name: string) => ` — llamar a ${name}`,
    noPhone: "Cadena nacional — busque la sucursal más cercana",
    visitWebsite: "Visitar sitio web",
    visitWebsiteSr: (name: string) =>
      ` de ${name} (se abre en una pestaña nueva)`,
  },

  suggest: {
    eyebrow: "Manteniéndolo al día",
    title: "¿Conoce a alguien que debería estar aquí?",
    body: "Este directorio cambia a medida que trabajamos. Si un dato está desactualizado, o si usted ha trabajado con un topógrafo, inspector u oficio en el área metropolitana de Atlanta que hace un buen trabajo de forma constante, avísenos y consideraremos agregarlo.",
  },

  cta: {
    eyebrow: "¿Necesita más que un número de teléfono?",
    title: "Permítanos coordinarlo por usted.",
    lead: "Coordinar topógrafos, inspectores y oficios es exactamente lo que hace nuestro servicio de gestión de proyectos. Cuéntenos sobre el proyecto y le diremos cuáles de estos realmente necesita.",
  },
};
