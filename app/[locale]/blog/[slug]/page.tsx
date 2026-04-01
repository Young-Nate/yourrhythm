import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { eq, ne, desc } from "drizzle-orm";
import { BlogNav } from "@/components/navbar";
import { BlogFooter } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BlogContent } from "@/components/blog-content";
import type { BlogPost } from "@/lib/schema";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n";
import { getArticleTranslation } from "@/lib/i18n/article-translations";

export const dynamic = "force-dynamic";

/* ── Icons ───────────────────────────────────────── */
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}
function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}
function Apple({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
    </svg>
  );
}
function PlayStore({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────── */
async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return post || null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(ne(blogPosts.slug, currentSlug))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(2);
    return posts;
  } catch {
    return [];
  }
}

/* ── Metadata ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article Not Found" };

  const locale = params.locale as Locale;
  const translation = isValidLocale(locale)
    ? await getArticleTranslation(locale, params.slug)
    : null;

  const title = translation?.title || post.title;
  const excerpt = translation?.excerpt || post.excerpt;

  return {
    title,
    description: excerpt,
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      publishedTime: post.publishedAt,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
    },
  };
}

/* ── Page ─────────────────────────────────────────── */
export default async function BlogArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = await getTranslations(locale);

  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(params.slug);

  // Get translation for this article if available
  const translation = await getArticleTranslation(locale, params.slug);
  const displayTitle = translation?.title || post.title;
  const displayContent = translation?.content || post.content;
  const contentWithoutH1 = displayContent.replace(/^#\s+.+\n+/, "");

  function ArticleCTA() {
    return (
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] p-8 sm:p-10 text-center text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-3">
          {t.blog.tryCta}
        </h3>
        <p className="text-white/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          {t.blog.ctaDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 font-semibold bg-white text-[hsl(14,60%,48%)] hover:bg-white/90 transition-colors"
          >
            <Apple className="w-4 h-4" />
            {t.cta.appStore}
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 font-semibold bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors"
          >
            <PlayStore className="w-4 h-4" />
            {t.cta.googlePlay}
          </a>
        </div>
      </div>
    );
  }

  function ArticleJsonLd() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: displayTitle,
      description: translation?.excerpt || post!.excerpt,
      datePublished: post!.publishedAt,
      author: {
        "@type": "Person",
        name: post!.author || "Your Rhythm Team",
      },
      publisher: {
        "@type": "Organization",
        name: "Your Rhythm",
        url: "https://yourrhythm.app",
      },
    };
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ArticleJsonLd />
      <BlogNav locale={locale} t={t.nav} />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.blog.backToBlog}
          </Link>

          <article>
            <header className="mb-10">
              <Badge variant="secondary" className="text-xs font-medium mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                {post.author && (
                  <span className="font-medium text-foreground/80">
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
              {post.featuredImageUrl && (
                <div className="rounded-xl overflow-hidden aspect-[16/9] mb-2">
                  <Image
                    src={post.featuredImageUrl}
                    alt={displayTitle}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            <BlogContent content={contentWithoutH1} />

            <ArticleCTA />

            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <h3 className="text-lg font-bold mb-5">{t.blog.relatedArticles}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rPost) => (
                    <Link key={rPost.id} href={`/${locale}/blog/${rPost.slug}`} className="group">
                      <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden">
                        {rPost.featuredImageUrl && (
                          <div className="aspect-[16/9] overflow-hidden">
                            <Image
                              src={rPost.featuredImageUrl}
                              alt={rPost.title}
                              width={800}
                              height={450}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <CardContent className="p-5">
                          <Badge variant="secondary" className="text-xs font-medium mb-3">
                            {rPost.category}
                          </Badge>
                          <h4 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">
                            {rPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {rPost.excerpt}
                          </p>
                          <span className="mt-3 text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {t.blog.readArticle} <ArrowRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <BlogFooter locale={locale} t={t.footer} />
    </div>
  );
}
