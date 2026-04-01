import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale, type Locale } from "./lib/i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.split("=")[1] || "1");
      return { code: code.trim().toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    // Exact match
    if (isValidLocale(code)) return code;
    // Language prefix match (e.g. "zh-CN" -> "zh")
    const prefix = code.split("-")[0];
    if (isValidLocale(prefix)) return prefix;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, _next, static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".") // static files (favicon.ico, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const pathLocale = pathname.split("/")[1];
  if (isValidLocale(pathLocale)) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed URL
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)",
  ],
};
