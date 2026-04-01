import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { BlogNav } from "@/components/navbar";
import { BlogFooter } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { desc } from "drizzle-orm";
import type { BlogPost } from "@/lib/schema";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const t = await getTranslations(params.locale as Locale);
  return {
    title: t.blog.metaTitle,
    description: t.blog.metaDesc,
    openGraph: {
      title: `${t.blog.title} | Your Rhythm`,
      description: t.blog.metaDesc,
    },
  };
}

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

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function BlogCard({ post, locale, readMoreText }: { post: BlogPost; locale: Locale; readMoreText: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group">
      <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden">
        {post.featuredImageUrl && (
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {readMoreText} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt));
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = await getTranslations(locale);
  const posts = await getPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <BlogNav locale={locale} t={t.nav} activePage="blog" />
      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.blog.backToHome}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              {t.blog.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.blog.subtitle}
            </p>
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t.blog.noArticles}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} readMoreText={t.blog.readMore} />
              ))}
            </div>
          )}
        </div>
      </main>
      <BlogFooter locale={locale} t={t.footer} />
    </div>
  );
}
