import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LOCALES, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";
import { getUi } from "@/i18n/ui";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

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
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
