import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimateIn from "@/components/ui/AnimateIn";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.excerpt };
}

const catColors: Record<string, string> = {
  SEO: "gold", "Paid Ads": "violet", "Social Media": "rose", CRO: "emerald",
};

const catBg: Record<string, string> = {
  SEO:           "from-gold-50 to-warm-50",
  "Paid Ads":    "from-violet-50 to-warm-50",
  "Social Media":"from-rose-50 to-warm-50",
  CRO:           "from-emerald-50 to-warm-50",
};

const blogContent: Record<string, string[]> = {
  "seo-trends-2025": [
    "## The SEO landscape is shifting faster than ever",
    "In 2025, search engine optimization is no longer just about keywords and backlinks. The game has fundamentally changed.",
    "### 1. AI Overviews reshape the SERP",
    "Google's AI Overviews are now appearing in over 30% of all searches. The strategic response: optimize for being cited in AI answers, not just ranking in the 10 blue links.",
    "**What to do:** Focus on structured, authoritative, clearly-sourced content. Use schema markup aggressively. Build topical authority in your niche.",
    "### 2. E-E-A-T goes mainstream",
    "Experience, Expertise, Authoritativeness, and Trustworthiness are increasingly decisive ranking factors.",
    "**What to do:** Build author profiles with verifiable credentials. Add first-person experience to content. Get bylines on third-party publications.",
    "### 3. Core Web Vitals get stricter",
    "The Interaction to Next Paint (INP) metric is now a Core Web Vital. Sites with slow JS execution see measurable ranking impacts.",
    "### 4. Topical authority over keyword targeting",
    "The keyword-by-keyword playbook is dying. Google now evaluates whether a site comprehensively covers a topic.",
    "### 5. Brand signals matter more",
    "Unlinked brand mentions, navigational queries, and branded search volume are increasingly strong ranking signals.",
  ],
  "meta-ads-creative-strategy": [
    "## The creative quality gap is widening",
    "Most brands are running the same 4 ad formats they were running in 2021. Static single-image ads now have a median thumb-stop rate of 3.2%, compared to 8.7% for native-style video.",
    "### The Performance Creative Framework",
    "We use a 3-tier creative architecture on every Meta account we manage.",
    "**Tier 1: Concept Testing (10% of budget)** — Short, raw, mobile-first videos testing radically different hooks. We're finding what resonates.",
    "**Tier 2: Iteration (60% of budget)** — Winners get expanded into multiple variations — different CTAs, lengths, captions, and audiences.",
    "**Tier 3: Scaling (30% of budget)** — Top performers get the majority of budget and are refreshed every 3–4 weeks before fatigue sets in.",
    "### The UGC Advantage",
    "UGC-style creative consistently outperforms polished brand creative by 20–40% on CPM efficiency. It blends into the feed. It doesn't look like an ad.",
  ],
  "cro-audit-checklist": [
    "## Most conversion problems are hiding in plain sight",
    "After running 200+ CRO projects, we've found the highest-impact conversion blockers are almost always one of five things: unclear value proposition, friction in the form, missing social proof, slow load time, or poor mobile experience.",
    "### The Audit Framework",
    "We organize our 23-point audit into five categories.",
    "**1. Above the Fold** — Is the value proposition immediately clear? Does the CTA stand out? Is there a trust signal visible without scrolling?",
    "**2. Social Proof** — Are testimonials specific with real results? Are logos of well-known clients visible?",
    "**3. Form & Checkout** — Is the form as short as possible? Are inline validation errors friendly and specific?",
    "**4. Mobile Experience** — Are CTAs thumb-friendly? Is text readable without zooming?",
    "**5. Page Psychology** — Is there credible urgency? Are objections handled on the page?",
    "### The 41% Uplift Story",
    "For our SaaS client Nova, the biggest win was counterintuitive: removing social proof from the hero section. The logos of enterprise clients were intimidating SMB prospects. Moving them lower and replacing hero social proof with a clear free trial message drove a 41% lift in trial signups.",
  ],
  "social-media-b2b": [
    "## B2B social has changed",
    "The brands winning on social in 2025 are publishing with personality, sharing genuine opinions, and treating social as a brand-building channel.",
    "### Platform priorities for B2B",
    "**LinkedIn**: Still #1 for B2B, but the algorithm now rewards native video and personal posts from founders over company page content.",
    "**YouTube**: Underutilized for B2B. Long-form educational content builds tremendous trust and SEO equity simultaneously.",
    "**Reddit**: Often overlooked. B2B buyers do research on subreddits. A genuine presence in relevant communities builds credibility.",
    "### The content mix that works",
    "We recommend a 4-1-1 model for B2B: 4 educational/value posts, 1 social proof post, 1 direct promotion. The ratio feels conservative, but it builds trust first — and trust converts better than promotion.",
  ],
};

function renderLine(line: string, i: number) {
  if (line.startsWith("## "))
    return <h2 key={i} className="display-serif text-3xl lg:text-4xl text-char-900 mt-10 mb-4">{line.slice(3)}</h2>;
  if (line.startsWith("### "))
    return <h3 key={i} className="display-serif text-2xl text-char-800 mt-8 mb-3">{line.slice(4)}</h3>;
  if (line.startsWith("**") && line.endsWith("**"))
    return <p key={i} className="font-bold text-char-800 mt-5 mb-2">{line.slice(2, -2)}</p>;
  if (line.startsWith("- "))
    return <li key={i} className="text-warm-500 ml-5 list-disc text-[15px] leading-relaxed">{line.slice(2)}</li>;
  return <p key={i} className="text-warm-500 leading-relaxed text-[15px]">{line}</p>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related  = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const lines    = blogContent[slug] ?? [];

  return (
    <div className="bg-warm-50 pt-24">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-warm-500 hover:text-gold-500 transition-colors"
        >
          <ArrowLeft size={15} /> Back to blog
        </Link>
      </div>

      {/* Article header */}
      <div className="max-w-3xl mx-auto px-5 lg:px-8 mb-10">
        <AnimateIn>
          <Badge color={catColors[post.category] ?? "warm"} className="mb-5">{post.category}</Badge>
          <h1 className="display-serif text-[clamp(36px,5vw,64px)] text-char-900 tracking-tight leading-[1.05] mb-6">
            {post.title}
          </h1>
          <p className="text-warm-500 text-xl leading-relaxed mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 py-5 border-y border-warm-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 text-sm font-bold">
                {post.author.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-char-900">{post.author.name}</div>
                <div className="text-xs text-warm-500">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-warm-400 font-medium">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime} read</span>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 mb-12">
        <div className={`h-64 lg:h-80 rounded-3xl flex items-center justify-center bg-gradient-to-br ${catBg[post.category] ?? "from-warm-100 to-warm-50"}`}>
          <span className="text-7xl font-black select-none uppercase text-warm-200">{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 lg:px-8 mb-20 space-y-3">
        <AnimateIn>{lines.map((line, i) => renderLine(line, i))}</AnimateIn>
      </article>

      {/* CTA box */}
      <div className="max-w-3xl mx-auto px-5 lg:px-8 mb-20">
        <AnimateIn>
          <div className="bg-gold-50 rounded-3xl border border-gold-100 p-8 text-center">
            <div className="text-gold-400 text-2xl mb-3">✦</div>
            <h3 className="text-xl font-extrabold text-char-900 mb-2">Want us to do this for you?</h3>
            <p className="text-warm-500 mb-6 text-sm">Book a free strategy call and we&apos;ll show you what this could look like for your business.</p>
            <Button href="/contact" variant="secondary" arrow>Get a free strategy call</Button>
          </div>
        </AnimateIn>
      </div>

      {/* Related posts */}
      <section className="bg-warm-100 border-t border-warm-200 py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl font-extrabold text-char-900 tracking-tight mb-8">More from the blog</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white rounded-2xl border border-warm-200 p-6 card-hover flex gap-5 items-start"
              >
                <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${catBg[p.category] ?? "from-warm-100 to-warm-50"}`}>
                  <span className="text-lg font-black text-warm-300">{p.category[0]}</span>
                </div>
                <div>
                  <Badge color={catColors[p.category] ?? "warm"} className="mb-2">{p.category}</Badge>
                  <h3 className="font-bold text-char-900 text-sm leading-snug group-hover:text-gold-500 transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gold-500 font-semibold mt-3 group-hover:gap-2.5 transition-all">
                    Read <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
