import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Your Rhythm — Smart Period Tracker & Cycle Predictions",
    template: "%s | Your Rhythm",
  },
  description:
    "Your Rhythm is a smart period tracker with AI-powered cycle predictions, mood & symptom logging, and personalized insights. Free for iPhone and Android.",
  metadataBase: new URL("https://yourrhythm.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
