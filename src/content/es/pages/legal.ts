import type { LegalCopy } from "../../en/pages/legal";

export const legal: LegalCopy = {
  lastUpdated: "18 de julio de 2026",
  lastUpdatedLabel: (date: string) => `Última actualización: ${date}`,

  contactLabels: {
    email: "Correo electrónico:",
    phone: "Teléfono:",
    post: (address: string) => `Correo postal: ${address}`,
  },

  privacy: {
    meta: {
      title: "Política de privacidad",
      description:
        "Cómo Builders Tech recopila, utiliza y protege la información que usted comparte al solicitar una consulta o al contactarnos sobre un proyecto.",
    },
    hero: {
      breadcrumb: "Política de privacidad",
      eyebrow: "Legal",
      titleLead: "Política de ",
      titleAccent: "privacidad",
      titleTail: ".",
      lead: "Qué recopilamos cuando usted nos contacta sobre un proyecto, por qué lo recopilamos y cómo pedirnos que lo eliminemos.",
      imageAlt: "El horizonte de Atlanta al anochecer",
    },
    notice: {
      title: "Texto de plantilla — todavía no es asesoría legal",
      bodyPre:
        "Esta página es contenido provisional redactado para describir cómo una pequeña firma de diseño y construcción suele manejar la información personal. ",
      bodyStrong: "No",
      bodyPost:
        " ha sido revisada por un abogado y debe ser verificada por un profesional del derecho frente a los requisitos de Georgia y federales antes de que este sitio se publique.",
    },
    whoWeAre: {
      title: "Quiénes somos",
      body: (name: string, address: string, url: string) =>
        `${name} es una firma de diseño y gestión de construcción con sede en ${address}. Esta política cubre la información que recopilamos a través de ${url} y mediante consultas directas por teléfono, correo electrónico o WhatsApp.`,
    },
    whatWeCollect: {
      title: "Qué recopilamos",
      intro:
        "Solo pedimos lo que necesitamos para cotizar y entregar el trabajo:",
      items: [
        "Los datos de contacto que usted nos proporciona: nombre, correo electrónico y número de teléfono.",
        "Los detalles del proyecto que usted decida enviar: dirección de la propiedad, dimensiones del lote, uso previsto, rango de presupuesto y cualquier plano o fotografía que adjunte.",
        "Información técnica básica que envía su navegador al visitar el sitio, como las páginas vistas y la ubicación aproximada, utilizada únicamente para entender qué páginas son útiles.",
      ],
      outro:
        "No recopilamos datos de tarjetas de pago a través de este sitio web y no recopilamos información de menores de manera consciente.",
    },
    howWeUse: {
      title: "Cómo la usamos",
      body: "Su información se utiliza para responder a su consulta, preparar una cotización, elaborar y entregar los planos, y mantener registro del trabajo que hemos hecho para usted. Podemos contactarlo sobre un proyecto en curso sin volver a pedirle permiso, porque ese contacto es parte del servicio. No vendemos su información y no lo agregamos a listas de marketing salvo que usted lo solicite.",
    },
    whoWeShare: {
      title: "Con quién la compartimos",
      body: "Compartimos información del proyecto solo cuando el trabajo lo exige: por ejemplo, con ingenieros, topógrafos o contratistas que participan en su proyecto, o con un municipio cuando una solicitud de permiso lo requiere. También usamos software empresarial habitual, como proveedores de correo electrónico y almacenamiento en la nube, que necesariamente procesan esta información en nuestro nombre. Podemos divulgar información cuando la ley lo exija.",
    },
    howLong: {
      title: "Cuánto tiempo la conservamos",
      body: "Las consultas que no se convierten en proyectos se conservan por un periodo limitado y luego se eliminan. Los registros de proyectos, incluidos los juegos de planos, se conservan por más tiempo, porque la documentación de construcción puede necesitarse años después por motivos de seguro, garantía o reventa.",
    },
    cookies: {
      title: "Cookies y analítica",
      body: "Este sitio usa únicamente las cookies necesarias para funcionar, además de cualquier herramienta de analítica respetuosa de la privacidad que podamos añadir para contar las páginas vistas. No utilizamos rastreadores publicitarios. La configuración de su navegador puede bloquear las cookies por completo; el sitio seguirá funcionando.",
    },
    yourChoices: {
      title: "Sus opciones",
      bodyPre:
        "Usted puede pedirnos qué información tenemos sobre usted, pedirnos que la corrijamos o pedirnos que la eliminemos. Escriba a ",
      bodyPost:
        " y le responderemos. Cuando una solicitud nos obligue a eliminar registros que estamos obligados a conservar, le explicaremos por qué.",
    },
    contact: {
      title: "Contáctenos",
      intro: "Preguntas sobre esta política o sobre sus datos:",
    },
    changes: {
      title: "Cambios a esta política",
      body: "Si cambiamos la forma en que manejamos la información, actualizaremos esta página y la fecha indicada arriba. Los cambios importantes que afecten un proyecto activo se le comunicarán directamente.",
    },
  },

  terms: {
    meta: {
      title: "Términos de uso",
      description:
        "Los términos que rigen el uso del sitio web de Builders Tech, incluido a qué nos compromete y a qué no nos compromete la información que publicamos.",
    },
    hero: {
      breadcrumb: "Términos de uso",
      eyebrow: "Legal",
      titleLead: "Términos de ",
      titleAccent: "uso",
      titleTail: ".",
      lead: "Qué es este sitio web, qué no es, y los términos que aplican cuando usted lo utiliza o nos envía una consulta.",
      imageAlt: "Vista abstracta de una fachada de vidrio",
    },
    notice: {
      title: "Texto de plantilla — todavía no es asesoría legal",
      bodyPre:
        "Esta página es contenido provisional redactado para reflejar cómo una pequeña firma de diseño y construcción suele establecer los términos de su sitio web. ",
      bodyStrong: "No",
      bodyPost:
        " ha sido revisada por un abogado y debe ser verificada por un profesional del derecho frente a los requisitos de Georgia y federales antes de que este sitio se publique.",
    },
    accepting: {
      title: "Aceptación de estos términos",
      body: (url: string, name: string) =>
        `Al usar ${url} usted acepta estos términos. Si no está de acuerdo con ellos, por favor no utilice el sitio. Estos términos cubren únicamente el sitio web; el trabajo que realizamos para usted se rige por el contrato escrito independiente que usted firma con ${name}.`,
    },
    notAdvice: {
      title: "El sitio es información, no asesoría",
      body: "Las páginas que describen permisos, plazos, requisitos de código y costos son orientación general redactada para un público amplio. Los códigos de construcción, las normas de zonificación y los procesos de revisión de cada condado difieren entre jurisdicciones y cambian con el tiempo. Nada de lo aquí publicado constituye asesoría arquitectónica, de ingeniería o legal para su propiedad específica, y usted no debe basarse en ello para tomar una decisión de construcción. Consúltenos —o consulte a un profesional licenciado— sobre su proyecto real primero.",
    },
    quotes: {
      title: "Cotizaciones y plazos",
      body: "Los precios, rangos y tiempos de entrega mostrados en este sitio son indicativos. Nuestro plazo declarado de diez días hábiles para los juegos de planos aplica una vez que contamos con la información y el anticipo necesarios para comenzar, y para alcances del tipo descrito. La única cotización vinculante es la cotización escrita que le enviamos para su proyecto.",
    },
    permits: {
      title: "Presentación de permisos",
      body: "Elaboramos documentación lista para permiso. No presentamos solicitudes ante los municipios en su nombre y no podemos garantizar el resultado ni los tiempos de revisión de ninguna autoridad. Cuando un revisor devuelva comentarios sobre un juego de planos elaborado por nosotros, le ayudaremos a atenderlos según lo establecido en su contrato.",
    },
    ip: {
      title: "Propiedad intelectual",
      body: (name: string) =>
        `El texto, la diagramación, la fotografía y los planos mostrados en este sitio pertenecen a ${name} o se usan con autorización. Usted puede ver e imprimir las páginas para su propia referencia. No puede republicarlas, revenderlas ni reutilizarlas comercialmente sin nuestro consentimiento escrito. Los derechos sobre los planos que elaboramos para un cliente se rigen por el contrato de ese cliente, no por esta página.`,
    },
    properUse: {
      title: "Uso adecuado del sitio",
      body: "Por favor, no intente interrumpir el sitio, acceder a partes de él para las que no está autorizado, extraer datos de forma masiva ni enviar contenido ilegal, engañoso o que infrinja derechos a través de nuestros formularios de contacto. La información que nos envíe debe ser suya para enviarla.",
    },
    links: {
      title: "Enlaces a otros sitios",
      body: "Enlazamos a terceros como topógrafos, inspectores, oficios y proveedores porque nos han resultado útiles. No controlamos esos sitios y no somos responsables de su contenido, sus servicios ni sus prácticas de privacidad.",
    },
    liability: {
      title: "Responsabilidad",
      body: (name: string) =>
        `El sitio se ofrece tal como está. En la máxima medida permitida por la ley, ${name} no es responsable de pérdidas derivadas de basarse en la información general aquí publicada. Nada en estos términos limita alguna responsabilidad que no pueda limitarse legalmente, y nada de lo aquí expuesto reduce nuestras obligaciones bajo un contrato firmado con un cliente.`,
    },
    governingLaw: {
      title: "Ley aplicable",
      body: "Estos términos se rigen por las leyes del Estado de Georgia, y los tribunales de Georgia tienen jurisdicción sobre cualquier disputa derivada del uso de este sitio.",
    },
    contact: {
      title: "Contáctenos",
      intro: "Preguntas sobre estos términos:",
    },
    changes: {
      title: "Cambios a estos términos",
      body: "Podemos actualizar estos términos. La fecha indicada arriba muestra cuándo cambiaron por última vez, y continuar usando el sitio después de un cambio significa que usted acepta los términos actualizados.",
    },
  },
};
