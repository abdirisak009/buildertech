export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "¿Qué servicios ofrece Builders Tech?",
        a: "Builders Tech se especializa en servicios de diseño arquitectónico y estructural para proyectos residenciales. Elaboramos planos listos para permiso para remodelaciones, ampliaciones y obra nueva, asegurando el cumplimiento de la normativa municipal.",
      },
      {
        q: "¿Builders Tech presenta los planos ante la ciudad?",
        a: "No — no nos encargamos de la presentación. Entregamos diseños listos para permiso, con toda la documentación necesaria incluida, para que usted o su contratista puedan presentarlos con confianza.",
      },
      {
        q: "¿Cuánto tarda en tener mis planos de construcción?",
        a: "Entregamos los planos arquitectónicos y estructurales terminados dentro de 10 días hábiles.",
      },
      {
        q: "¿Builders Tech ofrece consultas?",
        a: "¡Sí! Ofrecemos consultas gratuitas para conversar sobre su proyecto y darle asesoría experta.",
      },
      {
        q: "¿Cómo inicio un proyecto con Builders Tech?",
        a: "Solo contáctenos para una consulta gratuita. Conversaremos sobre su proyecto y le daremos una cotización.",
      },
      {
        q: "¿Qué áreas atiende Builders Tech?",
        a: "Atendemos principalmente a clientes residenciales en Georgia, enfocándonos en las zonas dentro de un radio de 2 horas de Stone Mountain.",
      },
      {
        q: "¿Cómo puedo comunicarme con Builders Tech?",
        a: "Puede contactarnos por teléfono, correo electrónico o WhatsApp.",
      },
    ],
  },
  {
    id: "services",
    title: "Nuestros servicios",
    items: [
      {
        q: "¿Builders Tech puede ayudarme con planos para remodelar una casa?",
        a: "Sí. Diseñamos planos arquitectónicos para remodelaciones de vivienda y entregamos planos listos para permiso, para que su renovación cumpla con los códigos de construcción locales.",
      },
      {
        q: "¿Elaboran planos de ingeniería para obra nueva de vivienda?",
        a: "¡Sí! Elaboramos planos completos de diseño arquitectónico y estructural para obra nueva de vivienda.",
      },
      {
        q: "¿Puedo obtener un plano de lote para mi propiedad?",
        a: "Sí. Elaboramos planos de lote detallados para obra nueva, ampliaciones y renovaciones.",
      },
      {
        q: "¿Ofrecen diseños de deck o de patio?",
        a: "¡Sí! Builders Tech diseña planos de decks y patios que cumplen con la normativa municipal.",
      },
      {
        q: "¿Trabajan con proyectos comerciales o solo residenciales?",
        a: "Builders Tech se enfoca principalmente en proyectos residenciales, incluyendo remodelaciones, ampliaciones y obra nueva de vivienda.",
      },
    ],
  },
  {
    id: "permits",
    title: "Permisos y documentación",
    items: [
      {
        q: '¿Qué significa "listo para permiso" en mis planos de construcción?',
        a: "Significa que los diseños incluyen todos los detalles necesarios para cumplir con los códigos y requisitos de construcción de la ciudad, de modo que puedan presentarse directamente ante el municipio.",
      },
      {
        q: "¿Qué pasa si la ciudad solicita cambios a mis planos?",
        a: "Le ayudamos a atender los comentarios de la ciudad para hacer los ajustes necesarios.",
      },
    ],
  },
  {
    id: "stop-work-orders",
    title: "Órdenes de suspensión de obra",
    items: [
      {
        q: "¿Qué debo hacer si recibo una orden de suspensión de obra?",
        a: "Contáctenos de inmediato. Las órdenes de suspensión de obra se emiten por construcción sin permiso o por violaciones al código.",
      },
      {
        q: "¿Pueden regularizar trabajo que se hizo sin permisos?",
        a: "Sí. Nos especializamos en la regularización de permisos para construcción hecha sin autorización.",
      },
      {
        q: "¿Cómo evito órdenes de suspensión de obra en proyectos futuros?",
        a: "Obtenga siempre los permisos antes de iniciar la construcción. Ofrecemos servicios completos de tramitación de permisos para todos los proyectos.",
      },
    ],
  },
  {
    id: "additions",
    title: "Ampliaciones",
    items: [
      {
        q: "¿Las ampliaciones de vivienda requieren permisos?",
        a: "Sí. En Georgia, cualquier ampliación que aumente los pies cuadrados de su casa requiere permisos de construcción.",
      },
      {
        q: "¿Cómo se aseguran de que mi ampliación combine con la casa existente?",
        a: "Realizamos evaluaciones detalladas del sitio, incluyendo análisis de la cimentación, empalme de techos y coincidencia de los materiales exteriores.",
      },
      {
        q: "¿Cuál es el plazo habitual para una ampliación de vivienda?",
        a: "Los plazos varían según el alcance del proyecto, pero por lo general van de 3 a 6 meses, incluyendo el permiso (de 6 a 8 semanas).",
      },
    ],
  },
  {
    id: "renovations",
    title: "Renovaciones",
    items: [
      {
        q: "¿Qué tipos de renovaciones requieren permisos?",
        a: "En Georgia se requieren permisos para cambios estructurales, trabajos eléctricos y de plomería, e instalaciones de aire acondicionado y calefacción.",
      },
      {
        q: "¿Pueden trabajar dentro de mi presupuesto para una renovación?",
        a: "Sí. Ofrecemos ingeniería de valor para priorizar las mejoras de mayor impacto dentro de su presupuesto.",
      },
      {
        q: "¿Cómo manejan los imprevistos durante una renovación?",
        a: "Realizamos evaluaciones minuciosas antes de la construcción para reducir las sorpresas, y avisamos a los clientes de inmediato ante cualquier problema.",
      },
    ],
  },
  {
    id: "new-builds",
    title: "Obra nueva",
    items: [
      {
        q: "¿Qué incluyen sus servicios de obra nueva?",
        a: "Ofrecemos servicios completos de diseño-construcción, incluyendo planificación arquitectónica, ingeniería estructural, tramitación de permisos, preparación del lote y construcción.",
      },
      {
        q: "¿Cuánto tarda construir una casa a la medida en Georgia?",
        a: "La construcción de una casa a la medida suele tomar de 9 a 14 meses, incluyendo el diseño (de 2 a 3 meses) y los permisos (de 2 a 3 meses).",
      },
      {
        q: "¿Construyen en un terreno que ya es mío?",
        a: "Por supuesto. Realizamos estudios de factibilidad del lote para evaluar su viabilidad de construcción, el acceso a servicios y las condiciones del suelo.",
      },
    ],
  },
  {
    id: "adu",
    title: "ADUs (unidades de vivienda accesoria)",
    items: [
      {
        q: "¿Qué es una ADU y se permite en mi propiedad?",
        a: "Una ADU es un espacio habitable secundario e independiente dentro de una propiedad residencial — como un apartamento sobre el garaje, una suite en el sótano o una casita de traspatio.",
      },
      {
        q: "¿Cuánto cuesta construir una ADU?",
        a: "El costo de una ADU normalmente va de $100,000 a más de $300,000, según el tamaño, los acabados y las condiciones del lote.",
      },
      {
        q: "¿Las ADUs requieren conexiones de servicios independientes?",
        a: "No siempre. Muchas ADUs comparten los servicios de agua, drenaje y electricidad de la casa principal, con medidores separados.",
      },
    ],
  },
  {
    id: "townhouse",
    title: "Desarrollo de townhouses",
    items: [
      {
        q: "¿Qué implica desarrollar un proyecto de townhouses?",
        a: "Requiere planificación del lote, ingeniería civil, aprobaciones de zonificación, subdivisión del terreno y coordinación de servicios.",
      },
      {
        q: "¿Cómo afectan las normas de zonificación a los proyectos de townhouses?",
        a: "La zonificación determina los límites de densidad, los retiros, los requisitos de estacionamiento y las alturas de construcción.",
      },
      {
        q: "¿Pueden gestionar todo el proyecto de townhouses de principio a fin?",
        a: "Sí. Ofrecemos gerencia de proyectos llave en mano, incluyendo la debida diligencia para la compra del terreno, la coordinación del diseño arquitectónico y la tramitación de permisos.",
      },
    ],
  },
  {
    id: "adult-daycare",
    title: "Centros de día para adultos con ADA",
    items: [
      {
        q: "¿Qué hace que un centro de día para adultos cumpla con la ADA?",
        a: "Requiere entradas, baños, espacios de estacionamiento, pasillos y áreas de actividades accesibles y diseñados para personas en silla de ruedas.",
      },
      {
        q: "¿Necesito permisos especiales para un centro de día para adultos?",
        a: "Sí. Los centros de día para adultos requieren permisos de construcción, aprobaciones del departamento de salud e inspecciones del jefe de bomberos.",
      },
      {
        q: "¿Pueden adaptar un edificio existente para usarlo como centro de día para adultos?",
        a: "Por supuesto. Nos especializamos en renovaciones comerciales que llevan estructuras existentes al estándar de la ADA y de los centros de cuidado de adultos.",
      },
    ],
  },
  {
    id: "truck-parking",
    title: "Estacionamiento de camiones",
    items: [
      {
        q: "¿Necesito un permiso para un estacionamiento comercial de camiones?",
        a: "Sí. Los estacionamientos comerciales de camiones en Georgia requieren permisos de desarrollo del lote, permisos de nivelación y cumplimiento con las ordenanzas de zonificación locales.",
      },
      {
        q: "¿Cuáles son los requisitos habituales para construir un estacionamiento de camiones?",
        a: "Los requisitos suelen incluir sistemas de drenaje adecuados, pavimento reforzado para cargas de vehículos pesados, planos de iluminación y cercado de seguridad.",
      },
      {
        q: "¿Cuánto tarda el trámite del permiso?",
        a: "Los plazos de permiso van de 6 a 12 semanas, según los procesos de revisión de cada condado.",
      },
    ],
  },
];
