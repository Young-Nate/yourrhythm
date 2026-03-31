"use client";

import Link from "next/link";

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

export function Footer() {
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
              Smart period tracker with AI-powered cycle predictions, mood logging, and personalized insights.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
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
                  Features
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Your Rhythm. All rights reserved.
          </p>
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Created with Perplexity Computer
          </a>
        </div>
      </div>
    </footer>
  );
}

export function BlogFooter() {
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
          Created with Perplexity Computer
        </a>
        <p className="text-xs text-muted-foreground">
          &copy; 2026 Your Rhythm
        </p>
      </div>
    </footer>
  );
}
