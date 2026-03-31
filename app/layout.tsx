import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  twitter: {
    card: "summary_large_image",
    title: "Your Rhythm — Smart Period Tracker & Cycle Predictions",
    description:
      "Track your cycle with AI-powered predictions, mood logging, and personalized insights.",
    images: ["/images/screenshot-overview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
