import type { Locale } from "./config";

// Type for translations
export type Translations = {
  nav: {
    features: string;
    blog: string;
    download: string;
    home: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    appStore: string;
    googlePlay: string;
    rating: string;
  };
  features: {
    sectionBadge: string;
    sectionTitle1: string;
    sectionTitle2: string;
    sectionSubtitle: string;
    cycle: { title: string; desc: string; checks: string[] };
    mood: { title: string; desc: string; checks: string[] };
    insights: { title: string; desc: string; checks: string[] };
    setup: { title: string; desc: string; checks: string[] };
  };
  why: {
    title: string;
    subtitle: string;
    privacy: { emoji: string; title: string; desc: string };
    design: { emoji: string; title: string; desc: string };
    science: { emoji: string; title: string; desc: string };
    free: { emoji: string; title: string; desc: string };
  };
  reviews: {
    title: string;
    subtitle: string;
    items: { name: string; text: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    appStore: string;
    googlePlay: string;
  };
  footer: {
    desc: string;
    product: string;
    features: string;
    download: string;
    resources: string;
    blog: string;
    helpCenter: string;
    contact: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    madeWith: string;
  };
  blog: {
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDesc: string;
    backToHome: string;
    readMore: string;
    noArticles: string;
    relatedArticles: string;
    backToBlog: string;
    readArticle: string;
    fromBlog: string;
    fromBlogSubtitle: string;
    viewAll: string;
    viewAllArticles: string;
    tryCta: string;
    ctaDesc: string;
  };
  waitlist: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    submit: string;
    success: string;
    successSub: string;
    error: string;
  };
};

export async function getTranslations(locale: Locale): Promise<Translations> {
  try {
    // Dynamic import for each locale
    const translations = await import(`./translations/${locale}.json`);
    return translations.default as Translations;
  } catch {
    // Fallback to English
    const fallback = await import("./translations/en.json");
    return fallback.default as Translations;
  }
}

export type { Locale };
