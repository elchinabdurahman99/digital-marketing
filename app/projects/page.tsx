import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn, { AnimateStagger } from "@/components/ui/AnimateIn";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Real case studies with real results.",
};

const tagColors: Record<string, string> = {
  FinTech: "gold", "E-commerce": "emerald", SaaS: "violet", Healthcare: "amber",
};

const accentGradients: Record<string, string> = {
  FinTech:      "from-gold-50 to-warm-50",
  "E-commerce": "from-emerald-50 to-warm-50",
  SaaS:         "from-violet-50 to-warm-50",
  Healthcare:   "from-amber-50 to-warm-50",
};

const metricColors: Record<string, string> = {
  FinTech:      "#C8A45A",
  "E-commerce": "#16A34A",
  SaaS:         "#9333EA",
  Healthcare:   "#D97706",
};

export default function ProjectsPage() {
  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-44 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[400px] rounded-full bg-gold-50 blur-3xl opacity-80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <AnimateIn>
              <SectionLabel>Case studies</SectionLabel>
              <h1 className="display-serif text-[clamp(52px,7.5vw,100px)] text-char-900 tracking-tight mb-6 leading-[0.95]">
                Results that<br />
                <em className="gradient-gold not-italic">speak for themselves.</em>
              </h1>
              <p className="text-warm-500 text-xl leading-relaxed">
                Every number here is from a real client. No cherry-picked averages — just honest case studies showing exactly what we did and what happened.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <AnimateStagger className="grid lg:grid-cols-2 gap-6">
          {projects.map((project) => {
            const metricColor = metricColors[project.tag] ?? "#C8A45A";
            return (
              <AnimateIn key={project.slug}>
              <article
                className="group bg-white rounded-3xl border border-warm-200 overflow-hidden card-hover"
              >
                {/* Header */}
                <div className={`relative h-44 flex items-end p-6 overflow-hidden bg-gradient-to-br ${accentGradients[project.tag] ?? "from-warm-100 to-warm-50"}`}>
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: metricColor }} />
                  <div className="absolute top-5 left-6">
                    <Badge color={tagColors[project.tag] ?? "warm"}>{project.industry}</Badge>
                  </div>
                  <div className="absolute top-5 right-6 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
                    {project.services.map((s) => <Badge key={s} color="gold">{s}</Badge>)}
                  </div>
                  <h2 className="text-xl font-extrabold text-char-800 tracking-tight leading-snug group-hover:text-gold-500 transition-colors">
                    {project.title}
                  </h2>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {project.results.map((r) => (
                      <div key={r.label} className="bg-warm-50 rounded-xl p-3.5 text-center border border-warm-200">
                        <div className="text-2xl font-extrabold tracking-tight" style={{ color: metricColor }}>
                          {r.metric}
                        </div>
                        <div className="text-[9px] text-warm-400 font-semibold uppercase tracking-wider mt-1">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-warm-500 text-sm leading-relaxed mb-5">{project.summary}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-rose-600 mb-2">The Problem</div>
                      <p className="text-xs text-char-600 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 mb-2">Our Solution</div>
                      <p className="text-xs text-char-600 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-warm-400 uppercase tracking-wider">{project.client}</span>
                    <Button href="/contact" size="sm" variant="outline" arrow>Get similar results</Button>
                  </div>
                </div>
              </article>
              </AnimateIn>
            );
          })}
        </AnimateStagger>
      </section>

      {/* CTA */}
      <section className="section-padding bg-warm-100 border-t border-warm-200">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="display-serif text-[clamp(32px,4vw,52px)] text-char-900 tracking-tight mb-4">
              Your results could be here next.
            </h2>
            <p className="text-warm-500 mb-8 text-lg">Book a free strategy call to see what&apos;s possible for your business.</p>
            <Button href="/contact" variant="secondary" size="lg" arrow>Book a free strategy call</Button>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
