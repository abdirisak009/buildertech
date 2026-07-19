import type { Locale } from "@/i18n/config";

import * as enSite from "./en/site";
import * as enServices from "./en/services";
import * as enProducts from "./en/products";
import * as enBlog from "./en/blog";
import * as enCareers from "./en/careers";
import * as enResources from "./en/resources";
import * as enFaq from "./en/faq";
import * as enAbout from "./en/about";
import { PAGES as enPages } from "./en/pages";

import * as esSite from "./es/site";
import * as esServices from "./es/services";
import * as esProducts from "./es/products";
import * as esBlog from "./es/blog";
import * as esCareers from "./es/careers";
import * as esResources from "./es/resources";
import * as esFaq from "./es/faq";
import * as esAbout from "./es/about";
import { PAGES as esPages } from "./es/pages";

/**
 * One bundle of every content module, per locale.
 *
 * Both locales export the exact same shape, so a page can render either without
 * knowing which one it received. Structural data that is not language-dependent
 * (icons, image paths, phone numbers, provider names) is duplicated verbatim.
 */
const BUNDLES = {
  en: {
    site: enSite.SITE,
    nav: enSite.NAV,
    stats: enSite.STATS,
    services: enServices.SERVICES,
    getService: enServices.getService,
    workCategories: enServices.WORK_CATEGORIES,
    headlineOffers: enServices.HEADLINE_OFFERS,
    products: enProducts.PRODUCTS,
    productCategories: enProducts.PRODUCT_CATEGORIES,
    productNotes: enProducts.PRODUCT_NOTES,
    blogSections: enBlog.BLOG_SECTIONS,
    posts: enBlog.POSTS,
    postsByCategory: enBlog.postsByCategory,
    getPost: enBlog.getPost,
    positions: enCareers.POSITIONS,
    internships: enCareers.INTERNSHIPS,
    resourcesIntro: enResources.RESOURCES_INTRO,
    resourceCategories: enResources.RESOURCE_CATEGORIES,
    faqGroups: enFaq.FAQ_GROUPS,
    story: enAbout.STORY,
    philosophy: enAbout.PHILOSOPHY,
    whatWeOffer: enAbout.WHAT_WE_OFFER,
    whyChooseUs: enAbout.WHY_CHOOSE_US,
    approach: enAbout.APPROACH,
    testimonials: enAbout.TESTIMONIALS,
    reviewPlatforms: enAbout.REVIEW_PLATFORMS,
    pages: enPages,
  },
  es: {
    site: esSite.SITE,
    nav: esSite.NAV,
    stats: esSite.STATS,
    services: esServices.SERVICES,
    getService: esServices.getService,
    workCategories: esServices.WORK_CATEGORIES,
    headlineOffers: esServices.HEADLINE_OFFERS,
    products: esProducts.PRODUCTS,
    productCategories: esProducts.PRODUCT_CATEGORIES,
    productNotes: esProducts.PRODUCT_NOTES,
    blogSections: esBlog.BLOG_SECTIONS,
    posts: esBlog.POSTS,
    postsByCategory: esBlog.postsByCategory,
    getPost: esBlog.getPost,
    positions: esCareers.POSITIONS,
    internships: esCareers.INTERNSHIPS,
    resourcesIntro: esResources.RESOURCES_INTRO,
    resourceCategories: esResources.RESOURCE_CATEGORIES,
    faqGroups: esFaq.FAQ_GROUPS,
    story: esAbout.STORY,
    philosophy: esAbout.PHILOSOPHY,
    whatWeOffer: esAbout.WHAT_WE_OFFER,
    whyChooseUs: esAbout.WHY_CHOOSE_US,
    approach: esAbout.APPROACH,
    testimonials: esAbout.TESTIMONIALS,
    reviewPlatforms: esAbout.REVIEW_PLATFORMS,
    pages: esPages,
  },
} as const;

export function getContent(locale: Locale) {
  return BUNDLES[locale];
}

export type Content = ReturnType<typeof getContent>;

/* Shared types — identical across locales. */
export type { Service, ServiceItem } from "./en/services";
export type { Product, ProductCategory } from "./en/products";
export type { Post, BlogCategory } from "./en/blog";
export type { Position } from "./en/careers";
export type { Provider, ResourceCategory } from "./en/resources";
export type { FaqItem, FaqGroup } from "./en/faq";
export type { NavItem, NavChild } from "./en/site";

