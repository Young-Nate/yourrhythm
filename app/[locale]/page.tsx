import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/schema";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/* ── Icons ───────────────────────────────────────── */
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

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="hsl(35, 80%, 55%)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

/* ── Feature Icons ───────────────────────────────── */
function CycleIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    </div>
  );
}

function MoodIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
      </svg>
    </div>
  );
}

function InsightsIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    </div>
  );
}

function SetupIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </div>
  );
}

/* ── Data fetching ───────────────────────────────── */
async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(3);
    return posts;
  } catch {
    return [];
  }
}

/* ── Page ────────────────────────────────────────── */
export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = await getTranslations(locale);
  const latestPosts = await getLatestPosts();

  const whyItems = [t.why.privacy, t.why.design, t.why.science, t.why.free];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} t={t.nav} />

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(14,60%,58%,0.06)] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t.hero.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                {t.hero.title1}{" "}
                <span className="bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] bg-clip-text text-transparent">
                  {t.hero.title2}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 font-semibold bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] text-white hover:opacity-90 transition-opacity"
                >
                  <Apple className="w-5 h-5" />
                  {t.hero.appStore}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 font-semibold border-2 border-primary/20 text-foreground hover:bg-primary/5 transition-colors"
                >
                  <PlayStore className="w-5 h-5" />
                  {t.hero.googlePlay}
                </a>
              </div>
              <div className="flex items-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{t.hero.rating}</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(14,60%,58%,0.2)] to-[hsl(350,45%,55%,0.2)] rounded-[2.5rem] blur-xl" />
                <Image
                  src="/images/screenshot-overview.jpg"
                  alt="Your Rhythm app — cycle calendar view"
                  width={576}
                  height={1024}
                  className="relative rounded-[2rem] shadow-xl w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="text-xs font-medium mb-4">{t.features.sectionBadge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t.features.sectionTitle1}{" "}
              <span className="bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] bg-clip-text text-transparent">
                {t.features.sectionTitle2}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.features.sectionSubtitle}
            </p>
          </div>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <CycleIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">{t.features.cycle.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t.features.cycle.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.features.cycle.checks.map((check, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image src="/images/screenshot-overview.jpg" alt="Cycle prediction calendar" width={480} height={854} className="rounded-[1.5rem] shadow-lg w-full" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image src="/images/screenshot-mood.jpg" alt="Mood and symptom logging" width={480} height={854} className="rounded-[1.5rem] shadow-lg w-full" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <MoodIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">{t.features.mood.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t.features.mood.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.features.mood.checks.map((check, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <InsightsIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">{t.features.insights.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t.features.insights.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.features.insights.checks.map((check, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image src="/images/screenshot-insights.jpg" alt="Personalized cycle insights" width={480} height={854} className="rounded-[1.5rem] shadow-lg w-full" />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image src="/images/screenshot-onboarding.jpg" alt="Easy personalized onboarding" width={480} height={854} className="rounded-[1.5rem] shadow-lg w-full" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <SetupIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">{t.features.setup.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t.features.setup.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.features.setup.checks.map((check, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Your Rhythm ───────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[hsl(14,60%,58%,0.04)] to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t.why.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.why.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <Card key={item.title} className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <span className="text-3xl mb-4 block">{item.emoji}</span>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.reviews.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.reviews.items.map((review) => (
              <Card key={review.name} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="text-sm font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ──────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-[hsl(20,35%,96%)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  {t.blog.fromBlog}
                </h2>
                <p className="text-muted-foreground">
                  {t.blog.fromBlogSubtitle}
                </p>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t.blog.viewAll} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group">
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md cursor-pointer">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-xs font-medium mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {t.blog.readMore} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t.blog.viewAllArticles} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] p-10 sm:p-14 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 font-semibold bg-white text-[hsl(14,60%,48%)] hover:bg-white/90 transition-colors"
              >
                <Apple className="w-5 h-5" />
                {t.cta.appStore}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 font-semibold bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors"
              >
                <PlayStore className="w-5 h-5" />
                {t.cta.googlePlay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} t={t.footer} />
    </div>
  );
}
