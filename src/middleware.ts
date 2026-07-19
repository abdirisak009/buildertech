import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALES,
  LOCALE_COOKIE,
  isLocale,
  matchLocale,
} from "@/i18n/config";

/**
 * Every page lives under /:locale. A request without one is redirected to the
 * best match: an explicit choice stored in a cookie wins, otherwise we read the
 * browser's Accept-Language header.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
