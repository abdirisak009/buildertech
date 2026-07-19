import type { UiDict } from "./en";

export const es: UiDict = {
  meta: {
    keywords: [
      "planos arquitectónicos Atlanta",
      "planos estructurales Georgia",
      "planos civiles de sitio",
      "ayuda con orden de suspensión de obra",
      "planos listos para permiso",
      "diseño y construcción Atlanta",
      "gerencia de construcción",
      "renders 3D",
    ],
  },

  a11y: {
    skipToContent: "Saltar al contenido principal",
    mainNav: "Principal",
    mobileNav: "Móvil",
    breadcrumb: "Ruta de navegación",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    expandMenu: (label: string) => `Desplegar el menú ${label}`,
    collapseMenu: (label: string) => `Contraer el menú ${label}`,
    toLightMode: "Cambiar a modo claro",
    toDarkMode: "Cambiar a modo oscuro",
    home: "inicio",
    onPlatform: (platform: string) => `en ${platform}`,
    opensInNewTab: "se abre en una pestaña nueva",
  },

  header: {
    cta: "Agende su proyecto",
  },

  breadcrumb: {
    home: "Inicio",
  },

  language: {
    label: "Idioma",
    switchTo: (name: string) => `Cambiar a ${name}`,
  },

  footer: {
    company: "Empresa",
    explore: "Explorar",
    services: "Servicios",
    getInTouch: "Contacto",
    phone: "Teléfono",
    email: "Correo",
    office: "Oficina",
    reviews: (count: string, platforms: string) =>
      `${count} reseñas en ${platforms}`,
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    terms: "Términos de uso",
    links: {
      howItWorks: "Cómo funciona",
      about: "Sobre nosotros",
      faq: "Preguntas frecuentes",
      resources: "Recursos de construcción",
      contact: "Contáctenos",
      stockPlans: "Planos prediseñados",
      ircUpdates: "Actualizaciones del código IRC",
      designTrends: "Tendencias de diseño",
      openPositions: "Vacantes disponibles",
      internships: "Pasantías",
    },
  },

  form: {
    labels: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      company: "Empresa u organización",
      projectType: "Tipo de proyecto",
      service: "Servicio que necesita",
      budget: "Presupuesto estimado",
      location: "Ubicación del proyecto",
      message: "Cuéntenos sobre el proyecto",
    },
    placeholders: {
      name: "Jordan Mitchell",
      email: "usted@empresa.com",
      phone: "(404) 555-0123",
      company: "Opcional",
      selectType: "Seleccione un tipo",
      selectScope: "Seleccione un alcance",
      preferNotToSay: "Prefiero no decirlo",
      location: "Ciudad o condado",
      message:
        "Tenemos un lote de 0.25 acres en Decatur y queremos agregar una recámara principal de 600 pies cuadrados sobre el garaje…",
    },
    hints: {
      budget: "Un rango está bien — nos ayuda a responderle mejor.",
      message:
        "Tamaño del lote, uso previsto y todo lo que ya sepa sobre el presupuesto o el plazo.",
    },
    errors: {
      name: "Por favor indíquenos su nombre.",
      emailRequired: "Necesitamos un correo electrónico para responderle.",
      emailInvalid:
        "Ingrese un correo válido, por ejemplo nombre@empresa.com.",
      projectType: "Seleccione el tipo de proyecto.",
      service: "Seleccione el alcance que busca.",
      messageRequired: "Cuéntenos un poco sobre el proyecto.",
      messageShort: "Por favor dénos un poco más de detalle (mínimo 20 caracteres).",
      summary: "Corrija los campos marcados y envíe de nuevo.",
    },
    required: "(obligatorio)",
    submit: "Enviar resumen del proyecto",
    sending: "Enviando…",
    successTitle: "Resumen recibido.",
    successBody:
      "Gracias — hemos recibido su resumen. Un responsable de Builders Tech le responderá en un día hábil.",
    sendAnother: "Enviar otro resumen",
    privacy:
      "Usamos sus datos únicamente para responder a esta consulta. No los compartimos con contratistas ni con terceros.",
    projectTypes: [
      "Ampliación de vivienda",
      "Construcción nueva",
      "Remodelación o renovación",
      "ADU (apartamento sobre garaje, sótano o casita)",
      "Terraza, patio o estructura exterior",
      "Casas adosadas o desarrollo multifamiliar",
      "Comercial",
      "Otro",
    ],
    services: [
      "Planos arquitectónicos",
      "Planos estructurales",
      "Planos civiles y de sitio",
      "Renders 3D",
      "Ayuda con orden de suspensión de obra",
      "Gerencia de proyecto",
      "Diseño y construcción (obra completa)",
      "Aún no estoy seguro — necesito asesoría",
    ],
    budgets: [
      "Menos de $50k",
      "$50k – $150k",
      "$150k – $500k",
      "$500k – $1M",
      "Más de $1M",
      "Aún no definido",
    ],
  },

  common: {
    learnMore: "Más información",
    readArticle: "Leer artículo",
    viewAll: "Ver todo",
    backToHome: "Volver al inicio",
    contactUs: "Contáctenos",
    apply: "Postularse",
    purchasePlan: "Comprar plano",
    includes: "Incluye",
    showingOf: (shown: number, total: number, noun: string) =>
      `Mostrando ${shown} de ${total} ${noun}`,
    all: "Todos",
    minRead: (mins: number) => `${mins} min de lectura`,
    planSets: "juegos de planos",
    filterByCategory: "Filtrar planos por categoría",
    purchaseAria: (name: string) => `Comprar plano — ${name}`,
  },

  notFound: {
    eyebrow: "Error 404",
    title: "Esta página nunca se dibujó.",
    titleAccent: "dibujó",
    lead: "La dirección que siguió no existe en este sitio. Vuelva al inicio o díganos qué buscaba y le indicamos dónde está.",
  },
};
