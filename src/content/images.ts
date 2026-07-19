/**
 * Photography library.
 *
 * Images are served from /public/images so the site has no runtime dependency
 * on an external image host — next/image optimizes them locally. (Fetching
 * from a remote host made the optimizer time out on a cold cache.)
 *
 * Sources are Pexels (free to use, no attribution required). Replace the files
 * in public/images with Builders Tech's own project photography when it is
 * available — keep the same filenames and nothing else needs to change.
 */

const img = (id: string) => `/images/${id}.jpg`;

const BLUEPRINTS = img("271667"); // floor plans on a desk
const SITE_WORK = img("159306"); // workers cutting timber on site
const RESIDENTIAL = img("259588"); // finished suburban home
const TEAM = img("3184292"); // team reviewing drawings and figures

export const IMAGES = {
  /* --- Page heroes --- */
  heroHome: BLUEPRINTS,
  heroHowItWorks: TEAM,
  heroServices: img("262347"), // glass façade abstract
  heroProducts: BLUEPRINTS,
  heroBlog: img("3862632"), // engineer at a laptop
  heroCareers: img("3184418"), // hands together over plans
  heroResources: SITE_WORK,
  heroFaq: img("302769"), // city skyline at sunset
  heroAbout: RESIDENTIAL,
  heroContact: img("323705"), // modern residential tower

  /* --- Service detail --- */
  renderings: RESIDENTIAL,
  architectural: BLUEPRINTS,
  structural: SITE_WORK,
  civil: img("2219024"), // concrete / ground works
  stopWork: img("1216544"), // cutting steel on site
  projectMgmt: TEAM,
  construction: img("2635038"), // finished interior

  /* --- Editorial / supporting --- */
  residentialHome: RESIDENTIAL,
  interiorFinished: img("3935350"),
  apartments: img("129494"),
  studioTeam: TEAM,
  teamHands: img("3184418"),
  blueprints: BLUEPRINTS,
  siteWork: SITE_WORK,
  engineerModel: img("3862632"),
  cityscape: img("302769"),
  glassTower: img("323705"),
  warehouse: img("236698"),
  inspection: img("2760241"),
} as const;

export type ImageKey = keyof typeof IMAGES;
