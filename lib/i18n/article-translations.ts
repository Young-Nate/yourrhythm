import type { Locale } from "./config";

export type ArticleTranslation = {
  title: string;
  excerpt: string;
  content: string;
};

export async function getArticleTranslation(
  locale: Locale,
  slug: string
): Promise<ArticleTranslation | null> {
  // English falls back to DB content
  if (locale === "en") return null;

  try {
    const translation = await import(`./articles/${locale}/${slug}.json`);
    return translation.default as ArticleTranslation;
  } catch {
    // Translation not found, fall back to English DB content
    return null;
  }
}
