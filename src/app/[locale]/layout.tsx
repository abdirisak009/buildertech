import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntakeProvider } from "@/components/intake/IntakeProvider";
import { LOCALES, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";
import { getUi } from "@/i18n/ui";
import { VisualContent } from "@/components/cms/VisualContent";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { site } = getContent(locale);
  const ui = getUi(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: `${site.headline}. ${site.subhead}`,
    keywords: ui.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      title: `${site.name} — ${site.tagline}`,
      description: `${site.tagline} ${site.motto}.`,
      siteName: site.name,
    },
    icons: { icon: "/logo.png" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050b1c" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const ui = getUi(typedLocale);

  return (
    <ThemeProvider>
      <IntakeProvider locale={typedLocale}>
        <div data-cms-surface className="flex min-h-screen flex-col bg-background text-foreground">
            <a
              href="#main"
              className="sr-only rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100]"
            >
              {ui.a11y.skipToContent}
            </a>
            <Header locale={typedLocale} />
            <main id="main" className="flex-1 overflow-x-clip">
              {children}
            </main>
            <Footer locale={typedLocale} />
            <VisualContent />
        </div>
      </IntakeProvider>
    </ThemeProvider>
  );
}
