import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { getUi } from "@/i18n/ui";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getUi(locale).form;
  return { title: { absolute: t.title }, description: t.successBody };
}

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="bg-surface-muted py-8 sm:py-12 lg:py-16">
      <Container className="max-w-2xl">
        <ContactForm locale={locale} />
      </Container>
    </section>
  );
}
