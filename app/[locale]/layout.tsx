import type { Metadata } from "next";
import { isValidLocale, isRTL, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  if (!isValidLocale(locale)) return {};

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
    metadataBase: new URL("https://yourrhythm.app"),
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
