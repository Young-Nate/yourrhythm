"use client";

import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/lib/i18n/config";
import type { Translations } from "@/lib/i18n";

function HeartLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="hsl(14, 60%, 58%)" />
          <stop offset="100%" stopColor="hsl(350, 45%, 55%)" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
      <path
        d="M18 27s-7.5-5.5-9-9c-1-2.3-.2-5.2 2.5-5.8 1.8-.4 3.5.5 4.5 1.8.5.7 1.2 1.2 2 1.2s1.5-.5 2-1.2c1-1.3 2.7-2.2 4.5-1.8 2.7.6 3.5 3.5 2.5 5.8-1.5 3.5-9 9-9 9z"
        fill="white"
      />
    </svg>
  );
}

interface NavbarProps {
  locale: Locale;
  t: Translations["nav"];
}

export function Navbar({ locale, t }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[hsl(20,40%,98%)]/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <HeartLogo className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight">Your Rhythm</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.features}
          </button>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.blog}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector currentLocale={locale} />
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.download}
          </a>
        </div>
      </div>
    </nav>
  );
}

interface BlogNavProps {
  locale: Locale;
  t: Translations["nav"];
  activePage?: "home" | "blog";
}

export function BlogNav({ locale, t, activePage }: BlogNavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[hsl(20,40%,98%)]/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <HeartLogo className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight">Your Rhythm</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className={`text-sm font-medium transition-colors ${
              activePage === "home"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className={`text-sm font-medium transition-colors ${
              activePage === "blog"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.blog}
          </Link>
        </div>
        <LanguageSelector currentLocale={locale} />
      </div>
    </nav>
  );
}
