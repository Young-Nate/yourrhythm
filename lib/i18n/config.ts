export const locales = [
  "en", "zh", "es", "fr", "de", "ja", "pt", "it", "ko", "ru", "ar", "tr", "hi", "id", "th"
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { native: string; flag: string }> = {
  en: { native: "English", flag: "🇬🇧" },
  zh: { native: "中文", flag: "🇨🇳" },
  es: { native: "Español", flag: "🇪🇸" },
  fr: { native: "Français", flag: "🇫🇷" },
  de: { native: "Deutsch", flag: "🇩🇪" },
  ja: { native: "日本語", flag: "🇯🇵" },
  pt: { native: "Português", flag: "🇧🇷" },
  it: { native: "Italiano", flag: "🇮🇹" },
  ko: { native: "한국어", flag: "🇰🇷" },
  ru: { native: "Русский", flag: "🇷🇺" },
  ar: { native: "العربية", flag: "🇸🇦" },
  tr: { native: "Türkçe", flag: "🇹🇷" },
  hi: { native: "हिन्दी", flag: "🇮🇳" },
  id: { native: "Bahasa Indonesia", flag: "🇮🇩" },
  th: { native: "ภาษาไทย", flag: "🇹🇭" },
};

export const rtlLocales: Locale[] = ["ar"];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
