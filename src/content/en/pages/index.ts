import { cta } from "./cta";
import { home } from "./home";
import { howItWorks } from "./how-it-works";
import { services } from "./services";
import { serviceDetail } from "./service-detail";
import { products } from "./products";
import { stockPlans } from "./stock-plans";
import { blog } from "./blog";
import { careers } from "./careers";
import { openPositions } from "./open-positions";
import { internships } from "./internships";
import { resources } from "./resources";
import { faq } from "./faq";
import { about } from "./about";
import { contact } from "./contact";
import { legal } from "./legal";
import { becomeAPartner } from "./become-a-partner";

export const PAGES = {
  cta,
  home,
  howItWorks,
  services,
  serviceDetail,
  products,
  stockPlans,
  blog,
  careers,
  openPositions,
  internships,
  resources,
  faq,
  about,
  contact,
  legal,
  becomeAPartner,
} as const;

export type PagesCopy = typeof PAGES;
