export type Position = {
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  requirements: string[];
};

export const POSITIONS: Position[] = [
  {
    slug: "structural-engineer",
    title: "Ingeniero Estructural",
    type: "Tiempo completo",
    location: "Stone Mountain, GA",
    summary:
      "Un ingeniero estructural meticuloso para sumarse a nuestro equipo, con experiencia en diseño residencial y comercial ligero.",
    requirements: [
      "Licenciatura en Ingeniería Civil o Estructural (maestría deseable)",
      "Mínimo tres años de experiencia en diseño",
      "Licencia PE de Georgia, o capacidad de obtenerla dentro de seis meses",
    ],
  },
  {
    slug: "architectural-designer",
    title: "Diseñador Arquitectónico",
    type: "Tiempo completo",
    location: "Stone Mountain, GA",
    summary:
      "Un diseñador arquitectónico creativo y detallista para proyectos residenciales y comerciales ligeros, desde el concepto hasta el permiso.",
    requirements: [
      "Dominio de AutoCAD, Revit o software similar",
      "Título en Arquitectura o campo relacionado",
      "2+ años de experiencia",
      "Sólidas habilidades de comunicación y visualización del diseño",
    ],
  },
  {
    slug: "sales-representative",
    title: "Representante de Ventas",
    type: "Flexible · Comisión",
    location: "Área metropolitana de Atlanta",
    summary:
      "Un representante de ventas ambicioso y motivado para generar prospectos y cerrar proyectos de diseño-construcción.",
    requirements: [
      "Se prefiere experiencia previa en ventas de construcción, diseño o bienes raíces",
      "Disposición para trabajar con un horario flexible",
      "Compensación por comisión",
    ],
  },
  {
    slug: "project-manager",
    title: "Gerente de Proyectos",
    type: "Tiempo completo",
    location: "Stone Mountain, GA",
    summary:
      "Un gerente de proyectos capaz y organizado para supervisar proyectos de diseño-construcción de principio a fin.",
    requirements: [
      "Título en Gerencia de Construcción o campo relacionado",
      "3+ años de experiencia en gerencia de proyectos",
      "Coordina con clientes, arquitectos, ingenieros y subcontratistas",
    ],
  },
];

export const INTERNSHIPS = {
  eyebrow: "Desarrollo Juvenil",
  title: "Oportunidades de Pasantía",
  motto:
    "Los planos construyen estructuras. Las comunidades forman carácter. Juntos, construimos la próxima generación.",
  body: [
    "Builders Tech tiene un programa de pasantías orientado a abrir la industria de la arquitectura, ingeniería y construcción a los jóvenes del condado de DeKalb y del área metropolitana de Atlanta — estudiantes que saben dibujar, medir, estimar y administrar, pero a quienes nunca les han mostrado cómo entrar.",
    "Los pasantes trabajan junto al equipo en proyectos residenciales reales: midiendo condiciones existentes, marcando correcciones en juegos de planos, participando en llamadas con clientes y recorriendo obras activas con un gerente de proyectos.",
  ],
  partners: [
    {
      name: "DeKalb WorkSource Georgia",
      note: "Conectando el talento con la oportunidad",
    },
    {
      name: "University of Georgia Small Business Development Center",
      note: "Mentoría y capacitación empresarial",
    },
    {
      name: "Start:ME",
      note: "Aceleradora que apoya a emprendedores locales",
    },
  ],
};
