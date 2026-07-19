export const serviceDetail = {
  /** Hero image alt, e.g. "Renderings — Builders Tech". */
  imageAlt: (title: string) => `${title} — Builders Tech`,

  stopWork: {
    title:
      "Ignoring a Stop Work Order can result in fines, legal penalties, or permit revocation.",
    body: "No further work can continue until the identified issues are corrected, proper approvals are obtained, and the order is lifted by the issuing agency.",
    bodySecondary:
      "Builders Tech specializes in providing the documentation that helps get the Stop Work Order removed and gets your project back on track.",
    callLabel: (phone: string) => `Call ${phone}`,
    note: "Don't let a red tag stop your project.",
  },

  scope: {
    eyebrowStopWork: "Why orders get issued",
    eyebrow: (title: string) => `Our ${title.toLowerCase()} include`,
    titleStopWork: "A Stop Work Order typically follows one of three things.",
    title: "What you get.",
  },

  secondary: {
    eyebrow: "Also available",
  },

  others: {
    eyebrow: "Keep exploring",
    title: "Other services.",
  },
};

export type ServiceDetailCopy = typeof serviceDetail;
