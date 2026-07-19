"use client";

import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

import { getUi } from "@/i18n/ui";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

/**
 * A not-found rendered inside [locale] cannot read route params. Reading the
 * locale from cookies()/headers() would work, but it opts every route in the
 * tree into dynamic rendering — so we derive it on the client from the URL,
 * which keeps the whole site statically prerendered.
 */
export default function NotFound() {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = isLocale(first) ? first : DEFAULT_LOCALE;

  const ui = getUi(locale);
  const [titleLead, titleTail] = ui.notFound.title.split(ui.notFound.titleAccent);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
      <div
        aria-hidden
        className="absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-gold-500/12 blur-[120px]"
      />
      <Container className="relative py-24">
        <Eyebrow className="text-navy-200">{ui.notFound.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-display-lg">
          {titleLead}
          <span className="text-gold-500">{ui.notFound.titleAccent}</span>
          {titleTail}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-100">
          {ui.notFound.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`/${locale}`} size="lg">
            <ArrowLeft aria-hidden className="size-4" />
            {ui.common.backToHome}
          </ButtonLink>
          <ButtonLink
            href={`/${locale}/contact`}
            variant="outline"
            size="lg"
            className="text-white"
          >
            {ui.common.contactUs}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
