export const legal = {
  lastUpdated: "18 July 2026",
  lastUpdatedLabel: (date: string) => `Last updated ${date}`,

  contactLabels: {
    email: "Email:",
    phone: "Phone:",
    post: (address: string) => `Post: ${address}`,
  },

  privacy: {
    meta: {
      title: "Privacy Policy",
      description:
        "How Builders Tech collects, uses and protects the information you share when you request a consultation or contact us about a project.",
    },
    hero: {
      breadcrumb: "Privacy Policy",
      eyebrow: "Legal",
      titleLead: "Privacy ",
      titleAccent: "policy",
      titleTail: ".",
      lead: "What we collect when you contact us about a project, why we collect it, and how to ask us to delete it.",
      imageAlt: "Atlanta skyline at dusk",
    },
    notice: {
      title: "Template text — not yet legal advice",
      bodyPre:
        "This page is placeholder content written to describe how a small design and construction firm typically handles personal information. It has ",
      bodyStrong: "not",
      bodyPost:
        " been reviewed by an attorney and must be checked by a legal professional against Georgia and federal requirements before this site goes live.",
    },
    whoWeAre: {
      title: "Who we are",
      body: (name: string, address: string, url: string) =>
        `${name} is a design and construction management firm based at ${address}. This policy covers the information we collect through ${url} and through direct enquiries by phone, email or WhatsApp.`,
    },
    whatWeCollect: {
      title: "What we collect",
      intro: "We only ask for what we need to quote and deliver work:",
      items: [
        "Contact details you give us — name, email address, phone number.",
        "Project details you choose to send — property address, plot dimensions, intended use, budget range, and any drawings or photographs you attach.",
        "Basic technical information your browser sends when you visit the site, such as page views and approximate location, used only to understand which pages are useful.",
      ],
      outro:
        "We do not collect payment card details through this website, and we do not knowingly collect information from children.",
    },
    howWeUse: {
      title: "How we use it",
      body: "Your information is used to respond to your enquiry, prepare a quote, produce and deliver drawings, and keep records of the work we have done for you. We may contact you about a live project without asking again, because that contact is part of the service. We do not sell your information, and we do not add you to marketing lists unless you ask us to.",
    },
    whoWeShare: {
      title: "Who we share it with",
      body: "We share project information only where the work requires it — for example with engineers, surveyors or contractors working on your project, or with a municipality when a permit application depends on it. We also use ordinary business software, such as email and cloud storage providers, which necessarily process this information on our behalf. We may disclose information where the law requires it.",
    },
    howLong: {
      title: "How long we keep it",
      body: "Enquiries that do not become projects are kept for a limited period and then deleted. Project records, including drawing sets, are kept for longer because construction documentation may be needed years later for insurance, warranty or resale purposes.",
    },
    cookies: {
      title: "Cookies and analytics",
      body: "This site uses only the cookies needed for it to function, plus any privacy-respecting analytics we may add to count page views. We do not run advertising trackers. Your browser settings can block cookies entirely; the site will still work.",
    },
    yourChoices: {
      title: "Your choices",
      bodyPre:
        "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Email ",
      bodyPost:
        " and we will respond. Where a request would require us to delete records we are obliged to keep, we will explain why.",
    },
    contact: {
      title: "Contact us",
      intro: "Questions about this policy or about your data:",
    },
    changes: {
      title: "Changes to this policy",
      body: "If we change how we handle information we will update this page and the date shown above. Material changes affecting an active project will be communicated to you directly.",
    },
  },

  terms: {
    meta: {
      title: "Terms of Use",
      description:
        "The terms that apply to using the Builders Tech website, including what our published information does and does not commit us to.",
    },
    hero: {
      breadcrumb: "Terms of Use",
      eyebrow: "Legal",
      titleLead: "Terms of ",
      titleAccent: "use",
      titleTail: ".",
      lead: "What this website is, what it is not, and the terms that apply when you use it or send us an enquiry.",
      imageAlt: "Abstract view of a glass building façade",
    },
    notice: {
      title: "Template text — not yet legal advice",
      bodyPre:
        "This page is placeholder content written to reflect how a small design and construction firm typically sets out website terms. It has ",
      bodyStrong: "not",
      bodyPost:
        " been reviewed by an attorney and must be checked by a legal professional against Georgia and federal requirements before this site goes live.",
    },
    accepting: {
      title: "Accepting these terms",
      body: (url: string, name: string) =>
        `By using ${url} you agree to these terms. If you do not agree with them, please do not use the site. These terms cover the website only — work we carry out for you is governed by the separate written contract you sign with ${name}.`,
    },
    notAdvice: {
      title: "The site is information, not advice",
      body: "Pages describing permits, timelines, code requirements and costs are general guidance written for a broad audience. Building codes, zoning rules and county review processes differ between jurisdictions and change over time. Nothing here is architectural, engineering or legal advice for your specific property, and you should not rely on it to make a construction decision. Ask us — or a licensed professional — about your actual project first.",
    },
    quotes: {
      title: "Quotes and timelines",
      body: "Prices, ranges and turnaround times shown on this site are indicative. Our stated ten-business-day turnaround for drawing sets applies once we have the information and deposit needed to begin, and to scopes of the kind described. A binding quote is only the written quote we send you for your project.",
    },
    permits: {
      title: "Permit submissions",
      body: "We produce permit-ready documentation. We do not submit applications to municipalities on your behalf, and we cannot guarantee the outcome or timing of any authority’s review. Where a reviewer returns comments on a set we produced, we will help address them as set out in your contract.",
    },
    ip: {
      title: "Intellectual property",
      body: (name: string) =>
        `The text, layout, photography and drawings shown on this site belong to ${name} or are used with permission. You may view and print pages for your own reference. You may not republish, resell or reuse them commercially without our written consent. Rights in drawings we produce for a client are dealt with in that client’s contract, not here.`,
    },
    properUse: {
      title: "Using the site properly",
      body: "Please do not attempt to disrupt the site, access parts of it you are not authorised to reach, scrape it at volume, or submit anything unlawful, misleading or infringing through our contact forms. Information you send us should be yours to send.",
    },
    links: {
      title: "Links to other sites",
      body: "We link to third parties such as surveyors, inspectors, trades and suppliers because we have found them useful. We do not control those sites and are not responsible for their content, their services or their privacy practices.",
    },
    liability: {
      title: "Liability",
      body: (name: string) =>
        `The site is provided as it is. To the fullest extent permitted by law, ${name} is not liable for loss arising from reliance on general information published here. Nothing in these terms limits any liability that cannot lawfully be limited, and nothing here reduces our obligations under a signed client contract.`,
    },
    governingLaw: {
      title: "Governing law",
      body: "These terms are governed by the laws of the State of Georgia, and the courts of Georgia have jurisdiction over any dispute arising from use of this site.",
    },
    contact: {
      title: "Contact us",
      intro: "Questions about these terms:",
    },
    changes: {
      title: "Changes to these terms",
      body: "We may update these terms. The date above shows when they last changed, and continuing to use the site after a change means you accept the updated terms.",
    },
  },
};

export type LegalCopy = typeof legal;
