import { headers } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import { isLocale } from "@/i18n/config";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The active locale is provided by the middleware (x-locale); /admin has none.
  const headerLocale = (await headers()).get("x-locale");
  const lang = headerLocale && isLocale(headerLocale) ? headerLocale : "en";

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
