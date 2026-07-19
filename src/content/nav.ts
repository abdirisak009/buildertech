import { NAV as EN_NAV } from "./en/site";
import { NAV as ES_NAV } from "./es/site";
import type { Locale } from "@/i18n/config";

/**
 * Nav is imported directly by the client-side header rather than passed down
 * from a server component: its items carry lucide icon components, and React
 * cannot serialize a component across the server/client boundary.
 *
 * This module only pulls in site.ts, so the client bundle does not grow to
 * include the FAQ, resource directory or blog content.
 */
export function getNav(locale: Locale) {
  return locale === "es" ? ES_NAV : EN_NAV;
}
