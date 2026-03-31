import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/schema";

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

function Smartphone({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
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

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
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
export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(14,60%,58%,0.06)] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Free for iOS &amp; Android
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                Your Cycle,{" "}
                <span className="bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] bg-clip-text text-transparent">
                  Your Rhythm
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                Track your period with AI-powered predictions, log your mood and symptoms, and get personalized cycle insights — all in one beautiful app.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 font-semibold bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] text-white hover:opacity-90 transition-opacity"
                >
                  <Apple className="w-5 h-5" />
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 font-semibold border-2 border-primary/20 text-foreground hover:bg-primary/5 transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  Google Play
                </a>
              </div>
              <div className="flex items-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9 rating on App Store</span>
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
            <Badge variant="secondary" className="text-xs font-medium mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[hsl(14,60%,58%)] to-[hsl(350,45%,55%)] bg-clip-text text-transparent">
                Know Your Body
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Smart tracking tools designed to help you understand your cycle, anticipate changes, and feel in control.
            </p>
          </div>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <CycleIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">Smart Cycle Predictions</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AI-powered predictions that learn your unique pattern over time. Know exactly when your next period, fertile window, and ovulation day are expected — with increasing accuracy each cycle.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Learns from your personal data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Fertility window estimates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Beautiful calendar view
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image
                    src="/images/screenshot-overview.jpg"
                    alt="Cycle prediction calendar"
                    width={480}
                    height={854}
                    className="rounded-[1.5rem] shadow-lg w-full"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image
                    src="/images/screenshot-mood.jpg"
                    alt="Mood and symptom logging"
                    width={480}
                    height={854}
                    className="rounded-[1.5rem] shadow-lg w-full"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <MoodIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">Mood &amp; Symptom Logging</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Track how you feel every day with our intuitive logging system. Record moods, physical symptoms, energy levels, and more — then discover patterns you never noticed before.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Quick daily check-ins
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    20+ symptoms to track
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Pattern recognition over time
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <InsightsIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">Personalized Insights</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Get AI-backed insights tailored to your unique cycle. Understand how your hormones affect your energy, mood, skin, digestion, and sleep — and get actionable advice for each phase.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Phase-specific recommendations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Nutrition and exercise tips
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Cycle health reports
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image
                    src="/images/screenshot-insights.jpg"
                    alt="Personalized cycle insights"
                    width={480}
                    height={854}
                    className="rounded-[1.5rem] shadow-lg w-full"
                  />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="w-52 sm:w-60">
                  <Image
                    src="/images/screenshot-onboarding.jpg"
                    alt="Easy personalized onboarding"
                    width={480}
                    height={854}
                    className="rounded-[1.5rem] shadow-lg w-full"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <SetupIcon />
                <h3 className="text-xl font-bold mt-4 mb-2">Easy Personalized Setup</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Get started in under a minute. Our smart onboarding asks just a few questions to calibrate predictions to your body from day one. No complicated setup required.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    60-second setup
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Immediate predictions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">&#10003;</span>
                    Import from other apps
                  </li>
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
              Why Your Rhythm?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Built with care, backed by science, and designed to put you first.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🔒",
                title: "Privacy First",
                desc: "Your data stays on your device. We never sell or share your personal health information.",
              },
              {
                emoji: "🎨",
                title: "Beautiful Design",
                desc: "A gorgeous, intuitive interface that makes tracking your cycle feel effortless and enjoyable.",
              },
              {
                emoji: "🔬",
                title: "Science Backed",
                desc: "Predictions and insights powered by peer-reviewed research and validated algorithms.",
              },
              {
                emoji: "💝",
                title: "Free to Use",
                desc: "All core features are completely free. Premium adds advanced insights for those who want more.",
              },
            ].map((item) => (
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
              Loved by Women Worldwide
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands who trust Your Rhythm for cycle tracking.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                text: "Finally a period tracker that actually learns my cycle. The predictions got accurate within two months, and the mood insights are incredible.",
              },
              {
                name: "Jessica L.",
                text: "I love how simple and beautiful this app is. The daily check-ins take 10 seconds, and the AI insights genuinely helped me understand my PMS patterns.",
              },
              {
                name: "Maria K.",
                text: "After trying 5 other trackers, Your Rhythm is the one that stuck. The fertility predictions helped me conceive, and I love that my data stays private.",
              },
            ].map((review) => (
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
                  From the Blog
                </h2>
                <p className="text-muted-foreground">
                  Insights on cycle health, wellness, and fertility.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
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
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all articles <ArrowRight className="w-3.5 h-3.5" />
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
              Start Tracking Your Cycle Today
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
              Join thousands of women who understand their bodies better with Your Rhythm. Free to download, no account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 font-semibold bg-white text-[hsl(14,60%,48%)] hover:bg-white/90 transition-colors"
              >
                <Apple className="w-5 h-5" />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 font-semibold bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
