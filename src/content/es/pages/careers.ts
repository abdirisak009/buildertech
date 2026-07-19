import type { CareersCopy } from "../../en/pages/careers";

export const careers: CareersCopy = {
  metadata: {
    title: "Empleo",
    description:
      "Únase a Builders Tech — una firma multidisciplinaria de diseño y construcción en Stone Mountain, Georgia. Vacantes en ingeniería, diseño, gerencia de proyectos y ventas, además de pasantías para la próxima generación de constructores.",
  },

  hero: {
    breadcrumb: "Empleo",
    eyebrow: "Únase al equipo",
    titleBefore: "Construya una carrera donde el trabajo",
    titleAccent: "sí se construye",
    titleAfter: ".",
    lead: "Builders Tech es una firma de diseño y gerencia de construcción en Stone Mountain, Georgia. Buscamos ingenieros, diseñadores, gerentes y estudiantes que quieran que sus planos salgan de la pantalla y se conviertan en edificaciones.",
    imageAlt: "Integrantes de un equipo de proyecto colaborando sobre documentos",
  },

  paths: {
    view: "Ver",
    openPositions: {
      eyebrow: "Profesionales con experiencia",
      title: "Vacantes Disponibles",
      body: "Puestos de ingeniería, diseño, gerencia de proyectos y ventas, trabajando en proyectos residenciales y comerciales ligeros activos en el área metropolitana de Atlanta.",
      meta: (count: number) =>
        `${count} ${count === 1 ? "vacante abierta" : "vacantes abiertas"}`,
    },
    internships: {
      body: "Una puerta de entrada a la industria AEC para estudiantes del condado de DeKalb y del área metropolitana de Atlanta — midiendo, marcando correcciones, participando en llamadas con clientes y recorriendo obras activas.",
      meta: (count: number) => `${count} socios comunitarios`,
    },
  },

  why: {
    eyebrow: "Por qué trabajar aquí",
    title: "Firma pequeña. Trabajo serio. Su nombre en el juego de planos.",
    items: [
      {
        number: "01",
        title: "Proyectos reales, desde el primer día.",
        body: "Más de 400 proyectos completados localmente significan que siempre hay trabajo activo en el tablero. Usted no acompaña a un sénior durante seis meses — recibe planos asignados en sus primeras semanas y los lleva hasta el permiso.",
      },
      {
        number: "02",
        title: "Aquí el oficio es lo residencial.",
        body: "Nos enfocamos deliberadamente en trabajo residencial y comercial ligero. Ese enfoque le da experiencia profunda y repetible en el IRC, en la revisión del condado y en lo que realmente se construye — no un recorrido superficial por diez tipos de edificación.",
      },
      {
        number: "03",
        title: "Un equipo pequeño donde su trabajo es suyo.",
        body: "No hay capas de comités entre su plano y el cliente. Usted habla con el propietario, defiende su detalle ante el revisor de planos y su nombre queda en el juego. Esa es la forma más rápida de volverse bueno en esto.",
      },
    ],
  },

  applying: {
    eyebrow: "Postulaciones",
    title: "Cómo funciona la contratación aquí.",
    lead: "Sin sistema de seguimiento de candidatos ni procesos de seis rondas. Envíenos su currículum y un portafolio o algunas muestras de trabajo, si las tiene.",
    steps: [
      {
        step: "01",
        title: "Envíelo",
        body: "Use el formulario de contacto o escríbanos directamente. Díganos el puesto y en qué ha trabajado.",
      },
      {
        step: "02",
        title: "Una conversación",
        body: "Una llamada con el equipo con el que realmente trabajaría — sobre su trabajo, no sobre acertijos.",
      },
      {
        step: "03",
        title: "Una decisión",
        body: "Le respondemos rápido en cualquier caso. Nadie se queda esperando frente a una bandeja silenciosa.",
      },
    ],
  },

  cta: {
    eyebrow: "Postulaciones espontáneas",
    title: "¿No ve su puesto?",
    lead: "Contratamos cuando encontramos a la persona correcta, no solo cuando hay una vacante publicada. Si usted es ingeniero, diseñador, estimador o gerente de obra y quiere trabajar en proyectos residenciales en Atlanta, preséntese.",
    primaryLabel: "Preséntese",
  },
};
