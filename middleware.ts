import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";

function getLocale(request: NextRequest) {
  // Negotiator expects a plain object, so we need to convert the headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale for the request
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}

// MIDDLEWARE
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  //   Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  //   Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

// MATCHER

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap).*)",
  ],
};
