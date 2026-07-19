import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { HeaderClient } from "./HeaderClient";

export function Header({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);

  // Only plain, serializable strings cross into the client component. It reads
  // the nav tree (icon components) and UI dictionary (functions) itself.
  return (
    <HeaderClient
      locale={locale}
      site={{
        name: site.name,
        headline: site.headline,
        phone: site.phone,
        phoneHref: site.phoneHref,
        email: site.email,
        addressFull: site.address.full,
        cta: site.cta,
      }}
    />
  );
}
