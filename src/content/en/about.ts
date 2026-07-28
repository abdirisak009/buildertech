export const STORY = [
  "Builders Tech began in a small basement office in Atlanta, Georgia — one desk, one plotter, and a conviction that homeowners deserved the same standard of documentation that large developers take for granted.",
  "We have expanded significantly since. Today we are your dynamic partner in simplifying the design and construction documentation process, guiding clients through building projects while leveraging our expertise to reduce costs.",
  "We serve a diverse clientele spanning AEC professionals, homeowners, and estate developers and investors globally — and we still answer the phone ourselves.",
];

export const PHILOSOPHY =
  "We recognize that building a home is a monumental investment. Our job is to deliver innovative solutions in an ever-evolving AEC industry, so that investment is protected by drawings that are correct the first time.";

export const WHAT_WE_OFFER = [
  {
    title: "Free expert advice",
    body: "A free consultation before you commit to anything. If your budget and your brief do not reconcile, you will hear it from us in week one.",
  },
  {
    title: "BIM coordination",
    body: "Disciplines coordinated in one model so clashes are found on screen, not in concrete.",
  },
  {
    title: "Stamped construction documentation",
    body: "Permit-ready sets that include everything the city asks for — no missing sheets, no resubmittal loop.",
  },
  {
    title: "Design & construction solutions",
    body: "From a single plan set to full design-build delivery, scoped to what your project actually needs.",
  },
];

export const WHY_CHOOSE_US = [
  {
    number: "01",
    title: "400+ projects completed locally",
    body: "Not a national franchise. We have drawn, permitted and walked hundreds of projects inside metro Atlanta.",
  },
  {
    number: "02",
    title: "5-star reviews and client testimonials",
    body: "134+ five-star reviews across Google, Thumbtack and Bark — from homeowners, investors and contractors.",
  },
  {
    number: "03",
    title: "Fast, transparent communication",
    body: "Plans in 10 business days. You always know what stage your project is at and what it costs.",
  },
];

export const APPROACH = {
  eyebrow: "A streamlined approach",
  lead:
    "We constantly evolve and refine our processes to stay ahead of the curve, with customer satisfaction as the primary driver.",
  body: "We make great things possible with the right technology, a talented team, and a streamlined customer-focused approach. We simplify the process of extending your home and guarantee a hassle-free journey from beginning to end.",
};

export const TESTIMONIALS = [
  {
    quote:
      "Builders Tech visited my home for a consultation. They were very professional, knowledgeable and insightful.",
    author: "Verified client",
    context: "Bark review",
  },
  {
    quote:
      "I had an outstanding experience working with Builders Tech! From the moment I reached out, they were extremely efficient, responsive and professional.",
    author: "Verified client",
    context: "Thumbtack review",
  },
  {
    quote:
      "Builders Tech provided property layout design. They were very responsive and explained the process and delivered on time.",
    author: "Verified client",
    context: "Google review",
  },
];

export const REVIEW_PLATFORMS = [
  "Google",
  "Thumbtack",
  "Bark",
  "Nextdoor",
  "Houzz",
  "Facebook",
];

export type TeamMember = {
  /** Display as "First L." */
  firstName: string;
  lastInitial: string;
  /** Optional professional credential shown after the name, e.g. PE */
  credentials?: string;
  role: string;
  photo: string;
  bio: string;
};

export function teamDisplayName(member: TeamMember): string {
  const base = `${member.firstName} ${member.lastInitial}.`;
  return member.credentials ? `${base}, ${member.credentials}` : base;
}

export const TEAM: TeamMember[] = [
  {
    firstName: "Shailesh",
    lastInitial: "G",
    credentials: "PE",
    role: "Civil Engineer",
    photo: "/teams/shailesh-g.jpg",
    bio: "Makes sure every project starts on solid ground by designing grading, drainage, utilities and site plans that keep stormwater in check and developments moving toward permit approval.",
  },
  {
    firstName: "Daniela",
    lastInitial: "C",
    credentials: "RA",
    role: "Architect",
    photo: "/teams/daniela-c.jpg",
    bio: "Turns ideas into buildable designs for homes, multifamily projects, renovations and commercial spaces. Loves creating spaces that look great, work well and meet code.",
  },
  {
    firstName: "Yavuz",
    lastInitial: "A",
    credentials: "PMP",
    role: "Operations Manager",
    photo: "/teams/yavuz-a.jpg",
    bio: "The engine behind the scenes. Keeps projects, people and processes running smoothly while finding smarter, more efficient ways to work. Background in Mechanical Engineering.",
  },
  {
    firstName: "Elizabeth",
    lastInitial: "B",
    role: "Business Systems Manager",
    photo: "/teams/elizabeth-b.jpg",
    bio: "The tech wizard of the team. Keeps our systems, AI tools and workflows running smoothly so the rest of the team can focus on designing, engineering and serving our clients. Background in business management, process improvement and system design.",
  },
  {
    firstName: "Tania",
    lastInitial: "A",
    role: "Sales & Project Manager",
    photo: "/teams/tania-a.jpg",
    bio: "Your go-to guide from the first conversation to permit approval. With a background in civil design and residential construction, she helps make the process simple and stress-free.",
  },
  {
    firstName: "Taha",
    lastInitial: "A",
    role: "Sales & Project Manager",
    photo: "/teams/taha-a.jpg",
    bio: "One of the first people you'll likely speak with. Taha enjoys turning challenging projects into successful ones. With a background in construction management, design and sustainable building, he works closely with clients to bring their vision to life.",
  },
];
