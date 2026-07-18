export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What services does Builders Tech provide?",
        a: "Builders Tech specializes in architectural and structural design services for residential projects. We create permit-ready plans for remodels, additions and new construction, while ensuring city compliance.",
      },
      {
        q: "Does Builders Tech submit plans to the city?",
        a: "No — we do not handle submissions. We provide city permit-ready designs, ensuring all necessary documentation is included so you or your contractor can submit with confidence.",
      },
      {
        q: "How long does it take to get my construction plans?",
        a: "We deliver completed architectural and structural plans within 10 business days.",
      },
      {
        q: "Does Builders Tech offer consultations?",
        a: "Yes! We offer free consultations to discuss your project and provide expert advice.",
      },
      {
        q: "How do I start a project with Builders Tech?",
        a: "Simply contact us for a free consultation. We'll discuss your project and provide a quote.",
      },
      {
        q: "What areas does Builders Tech serve?",
        a: "We primarily serve residential clients in Georgia, focusing on areas within a 2-hour radius of Stone Mountain.",
      },
      {
        q: "How can I contact Builders Tech?",
        a: "You can reach us via phone, email or WhatsApp.",
      },
    ],
  },
  {
    id: "services",
    title: "Our services",
    items: [
      {
        q: "Can Builders Tech help with house remodeling plans?",
        a: "Yes. We design architectural plans for home remodels and provide permit-ready blueprints to ensure your renovation follows local building codes.",
      },
      {
        q: "Do you provide engineering drawings for new home construction?",
        a: "Yes! We create full architectural and structural design plans for new home construction.",
      },
      {
        q: "Can I get a site plan for my property?",
        a: "Yes. We provide detailed site plans for new construction, home additions and renovations.",
      },
      {
        q: "Do you offer deck or patio designs?",
        a: "Yes! Builders Tech designs deck and patio blueprints that meet city regulations.",
      },
      {
        q: "Do you work with commercial projects, or only residential?",
        a: "Builders Tech focuses primarily on residential projects, including home remodels, additions and new construction.",
      },
    ],
  },
  {
    id: "permits",
    title: "Permits & documentation",
    items: [
      {
        q: 'What does "permit-ready" mean for my construction plans?',
        a: "It means the designs include all necessary details to meet city building codes and requirements, so they can be submitted directly to the municipality.",
      },
      {
        q: "What happens if the city requests changes to my plans?",
        a: "We assist in addressing city comments to make the necessary adjustments.",
      },
    ],
  },
  {
    id: "stop-work-orders",
    title: "Stop work orders",
    items: [
      {
        q: "What should I do if I receive a stop work order?",
        a: "Contact us immediately. Stop work orders are issued for unpermitted construction or code violations.",
      },
      {
        q: "Can you fix work that was done without permits?",
        a: "Yes. We specialize in permit remediation for unpermitted construction.",
      },
      {
        q: "How do I avoid stop work orders on future projects?",
        a: "Always secure permits before construction begins. We provide full permitting services for all projects.",
      },
    ],
  },
  {
    id: "additions",
    title: "Additions",
    items: [
      {
        q: "Do home additions require permits?",
        a: "Yes. Any addition that increases your home's square footage requires building permits in Georgia.",
      },
      {
        q: "How do you ensure my addition matches my existing home?",
        a: "We conduct detailed site assessments including foundation analysis, roof tie-ins and exterior material matching.",
      },
      {
        q: "What's the typical timeline for a home addition?",
        a: "Timelines vary by project scope but generally range from 3–6 months, including permitting (6–8 weeks).",
      },
    ],
  },
  {
    id: "renovations",
    title: "Renovations",
    items: [
      {
        q: "What types of renovations require permits?",
        a: "In Georgia, permits are required for structural changes, electrical/plumbing work and HVAC installations.",
      },
      {
        q: "Can you work within my budget for a renovation?",
        a: "Yes. We offer value engineering to prioritize high-impact upgrades within your budget.",
      },
      {
        q: "How do you handle unexpected issues during renovations?",
        a: "We conduct thorough pre-construction assessments to minimize surprises, and notify clients immediately of any issues.",
      },
    ],
  },
  {
    id: "new-builds",
    title: "New builds",
    items: [
      {
        q: "What's included in your new build services?",
        a: "We provide complete design-build services including architectural planning, structural engineering, permitting, site preparation and construction.",
      },
      {
        q: "How long does it take to build a custom home in Georgia?",
        a: "Custom home construction typically takes 9–14 months, including design (2–3 months) and permitting (2–3 months).",
      },
      {
        q: "Do you build on land I already own?",
        a: "Absolutely. We conduct site feasibility assessments to evaluate buildability, utility access and soil conditions.",
      },
    ],
  },
  {
    id: "adu",
    title: "ADUs (Accessory Dwelling Units)",
    items: [
      {
        q: "What is an ADU and is it allowed on my property?",
        a: "An ADU is a secondary, self-contained living space on a residential property — like a garage apartment, basement suite or backyard cottage.",
      },
      {
        q: "How much does it cost to build an ADU?",
        a: "ADU costs typically range from $100,000–$300,000+ depending on size, finishes and site conditions.",
      },
      {
        q: "Do ADUs require separate utility connections?",
        a: "Not always. Many ADUs share the main home's water, sewer and electrical services with separate metering.",
      },
    ],
  },
  {
    id: "townhouse",
    title: "Townhouse development",
    items: [
      {
        q: "What's involved in developing a townhouse project?",
        a: "It requires site planning, civil engineering, zoning approvals, subdivision platting and utility coordination.",
      },
      {
        q: "How do zoning regulations affect townhouse projects?",
        a: "Zoning dictates density limits, setbacks, parking requirements and building heights.",
      },
      {
        q: "Can you manage the entire townhouse project from start to finish?",
        a: "Yes. We provide turnkey project management including land acquisition due diligence, architectural design coordination and permitting.",
      },
    ],
  },
  {
    id: "adult-daycare",
    title: "ADA adult daycare",
    items: [
      {
        q: "What makes an adult daycare facility ADA-compliant?",
        a: "It requires accessible entrances, restrooms, parking spaces, hallways and activity areas designed for wheelchair users.",
      },
      {
        q: "Do I need special permits for an adult daycare center?",
        a: "Yes. Adult daycare facilities require building permits, health department approvals and fire marshal inspections.",
      },
      {
        q: "Can you retrofit an existing building for adult daycare use?",
        a: "Absolutely. We specialize in commercial renovations that bring existing structures up to ADA and adult care facility standards.",
      },
    ],
  },
  {
    id: "truck-parking",
    title: "Truck parking",
    items: [
      {
        q: "Do I need a permit for a commercial truck parking area?",
        a: "Yes. Commercial truck parking facilities in Georgia require site development permits, grading permits and compliance with local zoning ordinances.",
      },
      {
        q: "What are the typical requirements for truck parking lot construction?",
        a: "Requirements typically include proper drainage systems, reinforced pavement for heavy vehicle loads, lighting plans and security fencing.",
      },
      {
        q: "How long does the permitting process take?",
        a: "Permitting timelines range from 6–12 weeks depending on county review processes.",
      },
    ],
  },
];
