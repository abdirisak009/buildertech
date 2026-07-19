import type { Locale } from "@/i18n/config";
import { en, type UiDict } from "./en";
import { es } from "./es";

const DICTS: Record<Locale, UiDict> = { en, es };

export function getUi(locale: Locale): UiDict {
  return DICTS[locale];
}

export type { UiDict };
