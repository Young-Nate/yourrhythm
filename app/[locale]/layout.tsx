import type { Metadata } from "next";
import { headers } from "next/headers";
import { isValidLocale, isRTL, locales, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

const BASE_URL = "https://yourrhythm.app";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  if (!isValidLocale(locale)) return {};

  // Read the pathname set by middleware
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || `/${locale}`;

  // Strip the leading locale segment to get the path suffix (e.g. /blog/some-slug)
  const segments = pathname.split("/");
  // segments[0] = "", segments[1] = locale, segments[2..] = rest
  const pathSuffix = segments.slice(2).join("/");
  const suffix = pathSuffix ? `/${pathSuffix}` : "";

  // Build alternates for all locales
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${suffix}`;
  }
  // x-default points to /en
  languages["x-default"] = `${BASE_URL}/en${suffix}`;

  return {
    title: {
      default: "Your Rhythm — Smart Period Tracker & Cycle Predictions",
      template: "%s | Your Rhythm",
    },
    description:
      "Your Rhythm is a smart period tracker with AI-powered cycle predictions, mood & symptom logging, and personalized insights. Free for iPhone and Android.",
    keywords: [
      "period tracker",
      "menstrual cycle",
      "cycle predictions",
      "mood tracker",
      "fertility tracker",
      "period app",
    ],
    metadataBase: new URL(BASE_URL),
    alternates: {
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "Your Rhythm",
      title: "Your Rhythm — Smart Period Tracker & Cycle Predictions",
      description:
        "Track your cycle with AI-powered predictions, mood logging, and personalized insights.",
      images: ["/images/screenshot-overview.jpg"],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  if (!isValidLocale(locale)) notFound();

  const dir = isRTL(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta name="google-site-verification" content="GjXPxHozfZGDVkCotYanXyalP4XO3oT26HbL3x08sSk" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
