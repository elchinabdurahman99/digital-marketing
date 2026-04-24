import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimateIn from "@/components/ui/AnimateIn";
import { getBlogPost, getBlogPosts } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
  };
}

const catColors: Record<string, string> = {
  SEO: "gold",
  "Paid Search": "gold",
  "Paid Social": "violet",
  "Programmatic Media Buying": "amber",
  "Website Development": "emerald",
  "Affiliate Marketing": "rose",
};

const catBg: Record<string, string> = {
  SEO:                          "from-gold-50 to-warm-50",
  "Paid Search":                "from-gold-50 to-warm-50",
  "Paid Social":                "from-violet-50 to-warm-50",
  "Programmatic Media Buying":  "from-amber-50 to-warm-50",
  "Website Development":        "from-emerald-50 to-warm-50",
  "Affiliate Marketing":        "from-rose-50 to-warm-50",
};

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="display-serif text-3xl lg:text-4xl text-char-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="display-serif text-2xl text-char-800 mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-warm-500 leading-relaxed text-[15px] mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gold-300 pl-6 italic text-char-600 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc ml-6 space-y-2 mb-4 text-warm-500 text-[15px]">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal ml-6 space-y-2 mb-4 text-warm-500 text-[15px]">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-char-800">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts
    .filter((p: { slug: string }) => p.slug !== slug)
    .slice(0, 2);

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

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
                {post.author?.name?.[0] ?? "R"}
              </div>
              <div>
                <div className="text-sm font-semibold text-char-900">{post.author?.name}</div>
                <div className="text-xs text-warm-500">{post.author?.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-warm-400 font-medium">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{dateStr}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime} read</span>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 mb-12">
        <div className={`h-64 lg:h-80 rounded-3xl flex items-center justify-center bg-gradient-to-br ${catBg[post.category] ?? "from-warm-100 to-warm-50"}`}>
          <span className="text-7xl font-black select-none uppercase text-warm-200">{post.category?.[0]}</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 lg:px-8 mb-20">
        <AnimateIn>
          {post.body ? (
            <PortableText value={post.body} components={ptComponents as never} />
          ) : (
            <p className="text-warm-500">Content coming soon.</p>
          )}
        </AnimateIn>
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
            {related.map((p: { slug: string; category: string; title: string }) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white rounded-2xl border border-warm-200 p-6 card-hover flex gap-5 items-start"
              >
                <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${catBg[p.category] ?? "from-warm-100 to-warm-50"}`}>
                  <span className="text-lg font-black text-warm-300">{p.category?.[0]}</span>
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
