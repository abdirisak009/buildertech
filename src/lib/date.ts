import type { Locale } from "@/i18n/config";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
};

export function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString(INTL_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
