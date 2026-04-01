"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Translations } from "@/lib/i18n";

function HeartLogoSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradSm" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="hsl(14, 60%, 58%)" />
          <stop offset="100%" stopColor="hsl(350, 45%, 55%)" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#logoGradSm)" />
      <path
        d="M18 27s-7.5-5.5-9-9c-1-2.3-.2-5.2 2.5-5.8 1.8-.4 3.5.5 4.5 1.8.5.7 1.2 1.2 2 1.2s1.5-.5 2-1.2c1-1.3 2.7-2.2 4.5-1.8 2.7.6 3.5 3.5 2.5 5.8-1.5 3.5-9 9-9 9z"
        fill="white"
      />
    </svg>
  );
}

interface FooterProps {
  locale: Locale;
  t: Translations["footer"];
  blogT?: Translations["nav"];
}

export function Footer({ locale, t, blogT }: FooterProps) {
  return (
    <footer className="py-12 bg-[hsl(20,35%,95%)] border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <HeartLogoSmall className="w-8 h-8" />
              <span className="font-bold text-base">Your Rhythm</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.desc}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.product}</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.features}
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.download}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.resources}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.blog}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.helpCenter}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.legal}</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t.copyright}
          </p>
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.madeWith}
          </a>
        </div>
      </div>
    </footer>
  );
}

interface BlogFooterProps {
  locale: Locale;
  t: Translations["footer"];
}

export function BlogFooter({ locale, t }: BlogFooterProps) {
  return (
    <footer className="py-10 bg-[hsl(20,35%,95%)] border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <HeartLogoSmall className="w-6 h-6" />
          <span className="text-sm font-medium">Your Rhythm</span>
        </div>
        <a
          href="https://www.perplexity.ai/computer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t.madeWith}
        </a>
        <p className="text-xs text-muted-foreground">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
