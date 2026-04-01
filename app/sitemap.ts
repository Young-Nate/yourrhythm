import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { locales } from "@/lib/i18n/config";

const BASE_URL = "https://yourrhythm.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [];

  // Add locale-specific pages for each locale
  for (const locale of locales) {
    staticPages.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
    });
    staticPages.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await db
      .select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt));

    for (const post of posts) {
      for (const locale of locales) {
        blogPages.push({
          url: `${BASE_URL}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }
  } catch {
    // DB not available at build time
  }

  return [...staticPages, ...blogPages];
}
