import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn, { AnimateStagger } from "@/components/ui/AnimateIn";
import { getBlogPosts } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actionable marketing insights, tactics, and strategies from the Apex Agency team.",
};

const catColors: Record<string, string> = {
  SEO: "gold", "Paid Ads": "violet", "Social Media": "rose", CRO: "emerald",
};

const catBg: Record<string, string> = {
  SEO:           "from-gold-50 to-warm-50",
  "Paid Ads":    "from-violet-50 to-warm-50",
  "Social Media":"from-rose-50 to-warm-50",
  CRO:           "from-emerald-50 to-warm-50",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featured = blogPosts.find((p: { featured: boolean }) => p.featured);
  const rest     = blogPosts.filter((p: { featured: boolean }) => p !== featured);

  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-44 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[350px] rounded-full bg-gold-50 blur-3xl opacity-70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <SectionLabel center>Our blog</SectionLabel>
            <h1 className="display-serif text-[clamp(52px,7.5vw,100px)] text-char-900 tracking-tight text-center mb-6 leading-[0.95]">
              Marketing intel,<br />
              <em className="gradient-gold not-italic">no fluff.</em>
            </h1>
            <p className="text-warm-500 text-xl text-center max-w-xl mx-auto">
              Tactics, frameworks, and case studies from the team that runs campaigns across 300+ brands.
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">

        {/* Featured post */}
        {featured && (
          <AnimateIn>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-white rounded-3xl border border-warm-200 overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.05)] card-hover mb-10"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`h-52 lg:h-auto min-h-[240px] flex items-center justify-center bg-gradient-to-br ${catBg[featured.category] ?? "from-warm-100 to-warm-50"} relative`}>
                  <span className="text-6xl font-black select-none tracking-tight text-warm-200">{featured.category}</span>
                  <div className="absolute top-5 left-5">
                    <Badge color={catColors[featured.category] ?? "warm"}>{featured.category}</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <Badge color="gold" className="w-fit mb-4">Featured</Badge>
                  <h2 className="text-2xl font-extrabold text-char-900 tracking-tight mb-3 group-hover:text-gold-500 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-warm-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-warm-400 font-medium mb-6">
                    <span>{featured.author.name}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{featured.readTime}</span>
                    <span>{featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold-500 text-sm font-semibold group-hover:gap-3 transition-all">
                    Read article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </AnimateIn>
        )}

        {/* Grid */}
        <AnimateStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <AnimateIn key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-warm-200 overflow-hidden card-hover h-full"
              >
                <div className={`h-36 flex items-center justify-center bg-gradient-to-br ${catBg[post.category] ?? "from-warm-100 to-warm-50"}`}>
                  <Badge color={catColors[post.category] ?? "warm"}>{post.category}</Badge>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-char-900 text-base mb-3 leading-snug group-hover:text-gold-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-warm-400 font-medium pt-4 border-t border-warm-100">
                    <span>{post.author.name}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </AnimateStagger>
      </div>

      {/* Newsletter CTA */}
      <section className="section-padding bg-warm-100 border-t border-warm-200">
        <div className="max-w-xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="display-serif text-[clamp(28px,3.5vw,42px)] text-char-900 tracking-tight mb-3">
              Get weekly growth tactics
            </h2>
            <p className="text-warm-500 mb-7">No spam. Just our best marketing insights delivered every Tuesday.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-warm-200 text-sm bg-white outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
              />
              <Button variant="secondary" type="submit">Subscribe</Button>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
