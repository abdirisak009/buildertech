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
    title: "Structural Engineer",
    type: "Full time",
    location: "Stone Mountain, GA",
    summary:
      "A detail-focused Structural Engineer to join our team, with experience in residential and light-commercial design.",
    requirements: [
      "Bachelor's degree in Civil or Structural Engineering (Master's preferred)",
      "Minimum three years of design experience",
      "Georgia PE license, or the ability to obtain one within six months",
    ],
  },
  {
    slug: "architectural-designer",
    title: "Architectural Designer",
    type: "Full time",
    location: "Stone Mountain, GA",
    summary:
      "A creative and detail-oriented Architectural Designer for residential and light-commercial projects, from concept through permitting.",
    requirements: [
      "Proficiency in AutoCAD, Revit or similar software",
      "Degree in Architecture or a related field",
      "2+ years of experience",
      "Strong communication and design visualization skills",
    ],
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    type: "Flexible · Commission",
    location: "Atlanta metro",
    summary:
      "An ambitious and motivated Sales Representative to generate leads and close design-build projects.",
    requirements: [
      "Prior construction, design or real-estate sales experience preferred",
      "Comfortable working a flexible schedule",
      "Commission-based compensation",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    type: "Full time",
    location: "Stone Mountain, GA",
    summary:
      "A skilled and organized Project Manager to oversee design-build projects from start to finish.",
    requirements: [
      "Construction Management degree or related field",
      "3+ years of project management experience",
      "Coordinates with clients, architects, engineers and subcontractors",
    ],
  },
];

export const INTERNSHIPS = {
  eyebrow: "Youth Development",
  title: "Internship Opportunities",
  motto:
    "Blueprints build structures. Communities build character. Together, we build the next generation.",
  body: [
    "Builders Tech runs an internship program aimed at opening the AEC industry to young people in DeKalb County and the wider Atlanta area — students who can draw, measure, estimate and manage, but have never been shown a way in.",
    "Interns sit with the team on live residential projects: measuring existing conditions, redlining plan sets, sitting in on client calls and walking active job sites with a project manager.",
  ],
  partners: [
    {
      name: "DeKalb WorkSource Georgia",
      note: "Connecting Talent with Opportunity",
    },
    {
      name: "University of Georgia Small Business Development Center",
      note: "Business mentorship and training",
    },
    {
      name: "Start:ME",
      note: "Accelerator supporting local entrepreneurs",
    },
  ],
};
