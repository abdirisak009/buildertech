export const careers = {
  metadata: {
    title: "Careers",
    description:
      "Join Builders Tech — a multidisciplinary design and construction firm in Stone Mountain, Georgia. Open engineering, design, project management and sales roles, plus internships for the next generation of builders.",
  },

  hero: {
    breadcrumb: "Careers",
    eyebrow: "Join the team",
    titleBefore: "Build a career where the work",
    titleAccent: "gets built",
    titleAfter: ".",
    lead: "Builders Tech is a design and construction management firm in Stone Mountain, Georgia. We are looking for engineers, designers, managers and students who want their drawings to leave the screen and become buildings.",
    imageAlt: "Members of a project team collaborating over documents",
  },

  paths: {
    view: "View",
    openPositions: {
      eyebrow: "Experienced hires",
      title: "Current Open Positions",
      body: "Engineering, design, project management and sales roles working on live residential and light-commercial projects across the Atlanta metro.",
      meta: (count: number) =>
        `${count} open ${count === 1 ? "role" : "roles"}`,
    },
    internships: {
      body: "A way into the AEC industry for students in DeKalb County and the wider Atlanta area — measuring, redlining, sitting in on client calls and walking active job sites.",
      meta: (count: number) => `${count} community partners`,
    },
  },

  why: {
    eyebrow: "Why work here",
    title: "Small firm. Serious work. Your name on the set.",
    items: [
      {
        number: "01",
        title: "Real projects, from day one.",
        body: "Over 400 projects completed locally means there is always live work on the boards. You are not shadowing a senior for six months — you get drawings assigned to you in your first weeks and you see them through permitting.",
      },
      {
        number: "02",
        title: "Residential is the craft here.",
        body: "We are deliberately focused on residential and light-commercial work. That focus means you get deep, repeatable expertise in the IRC, in local county review, and in what actually gets built — not a shallow tour of ten building types.",
      },
      {
        number: "03",
        title: "A small team where you own your work.",
        body: "There is no layer of committees between your drawing and the client. You speak to the homeowner, you defend your detail to the plan reviewer, and your name is on the set. That is a faster way to become good at this.",
      },
    ],
  },

  applying: {
    eyebrow: "Applying",
    title: "How hiring works here.",
    lead: "No applicant tracking system, no six-round process. Send us your résumé and a portfolio or a few work samples if you have them.",
    steps: [
      {
        step: "01",
        title: "Send it in",
        body: "Use the contact form or email us directly. Tell us the role and what you have worked on.",
      },
      {
        step: "02",
        title: "A conversation",
        body: "A call with the team you would actually sit with — about your work, not brain-teasers.",
      },
      {
        step: "03",
        title: "A decision",
        body: "We come back to you either way, quickly. Nobody is left waiting on a silent inbox.",
      },
    ],
  },

  cta: {
    eyebrow: "Speculative applications",
    title: "Don't see your role?",
    lead: "We hire when we meet the right person, not only when a listing is open. If you are an engineer, designer, estimator or site manager who wants to work on residential projects in Atlanta, introduce yourself.",
    primaryLabel: "Introduce Yourself",
  },
};

export type CareersCopy = typeof careers;
