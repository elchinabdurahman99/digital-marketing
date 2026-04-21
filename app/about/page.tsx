import type { Metadata } from "next";
import { TrendingUp, Users, CheckCircle2, Heart, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn, { AnimateStagger } from "@/components/ui/AnimateIn";
import { team, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Apex Agency — our story, mission, values, and the team behind your growth.",
};

const values = [
  { icon: TrendingUp,   title: "Results over optics",   desc: "We measure success by revenue impact, not vanity metrics. Every decision is tied to a business outcome.", accent: "#C8A45A" },
  { icon: Users,        title: "Senior-only talent",    desc: "No juniors learning on your dime. Every client gets a senior specialist with a track record.", accent: "#16A34A" },
  { icon: CheckCircle2, title: "Radical transparency",  desc: "We share every metric, good or bad. You always know exactly what we're doing and why.", accent: "#9333EA" },
  { icon: Heart,        title: "Long-term thinking",    desc: "We build sustainable growth systems, not quick hacks. Our average client tenure is 3.2 years.", accent: "#EA580C" },
];

const milestones = [
  { year: "2015", event: "Founded by Alex Morgan in a San Francisco apartment." },
  { year: "2017", event: "Hit 50 clients. Hired our first 5 full-time specialists." },
  { year: "2019", event: "Expanded into paid media and CRO. Opened NYC office." },
  { year: "2021", event: "Surpassed $1B in revenue generated for clients." },
  { year: "2023", event: "Launched proprietary analytics platform for clients." },
  { year: "2025", event: "300+ clients. $2.4B in attributed client revenue. Still growing." },
];

const teamAccents = ["#C8A45A", "#16A34A", "#9333EA", "#EA580C", "#EF4444", "#0891B2"];

export default function AboutPage() {
  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-44 relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-[400px] h-[400px] rounded-full bg-gold-50 blur-3xl opacity-80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <AnimateIn>
              <SectionLabel>Our story</SectionLabel>
              <h1 className="display-serif text-[clamp(52px,7.5vw,100px)] text-char-900 tracking-tight mb-6 leading-[0.95]">
                Built by marketers,<br />
                <em className="gradient-gold not-italic">for marketers.</em>
              </h1>
              <p className="text-warm-500 text-xl leading-relaxed mb-8 max-w-2xl">
                We started Apex because we were frustrated with agencies that promised the world and delivered dashboards. We wanted to build something different.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="secondary" arrow>Work with us</Button>
                <Button href="/projects" variant="outline">See our results</Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-white border-y border-warm-200 py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateStagger className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center" style={{ opacity: 1 }}>
                <div className="text-5xl font-extrabold text-gold-400 tracking-tight mb-2">{s.value}</div>
                <div className="text-sm text-warm-500 font-medium">{s.label}</div>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* Mission & Timeline */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateIn>
              <SectionLabel>Mission & vision</SectionLabel>
              <h2 className="display-serif text-[clamp(32px,4vw,54px)] text-char-900 tracking-tight mb-8">
                Why we show up<br />every day.
              </h2>
              <div className="space-y-4">
                <div className="bg-gold-50 rounded-2xl border border-gold-100 p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-3">Our Mission</div>
                  <p className="text-char-700 font-semibold text-lg leading-relaxed">
                    To make enterprise-grade digital marketing accessible to every ambitious brand — and to prove that transparency and performance aren&apos;t mutually exclusive.
                  </p>
                </div>
                <div className="bg-warm-100 rounded-2xl border border-warm-200 p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-500 mb-3">Our Vision</div>
                  <p className="text-char-600 font-semibold text-lg leading-relaxed">
                    A world where every growing business has a marketing partner who treats their budget like their own — and builds growth systems that outlast any campaign.
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Timeline */}
            <AnimateIn delay={150}>
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-warm-400 mb-8">Our journey</h3>
              <div className="relative pl-6 border-l border-warm-200">
                {milestones.map((m) => (
                  <div key={m.year} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-[calc(1.5rem+1px)] top-1 w-3 h-3 rounded-full bg-gold-400 border-2 border-warm-50 shadow-[0_0_0_3px_rgba(200,164,90,0.2)]" />
                    <div className="pl-4">
                      <div className="text-xs font-bold text-gold-500 tracking-wider mb-1">{m.year}</div>
                      <p className="text-char-600 text-sm font-medium leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-warm-100 border-y border-warm-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <SectionLabel center>Our values</SectionLabel>
            <h2 className="display-serif text-[clamp(32px,4.5vw,60px)] text-char-900 tracking-tight text-center mb-14">
              What we believe in.
            </h2>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl border border-warm-200 p-6 card-hover" style={{ opacity: 1 }}>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${v.accent}14` }}
                  >
                    <Icon size={22} style={{ color: v.accent }} />
                  </div>
                  <h3 className="font-bold text-char-900 mb-2 text-[15px]">{v.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </AnimateStagger>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <SectionLabel center>The team</SectionLabel>
            <h2 className="display-serif text-[clamp(32px,4.5vw,60px)] text-char-900 tracking-tight text-center mb-4">
              The people behind your growth.
            </h2>
            <p className="text-warm-500 text-center max-w-xl mx-auto mb-14 text-lg">
              Senior specialists only. No account managers padding hours. You work directly with the people doing the work.
            </p>
          </AnimateIn>
          <AnimateStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl border border-warm-200 p-6 card-hover"
                style={{ opacity: 1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                    style={{ background: teamAccents[i] ?? "#C8A45A" }}
                  >
                    {member.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-char-900 text-[15px]">{member.name}</div>
                    <div className="text-xs text-warm-500 font-medium">{member.role}</div>
                  </div>
                </div>
                <p className="text-warm-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding bg-warm-100 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <Award size={40} className="text-gold-400 mb-5 mx-auto lg:mx-0" />
                <h2 className="display-serif text-[clamp(28px,3.5vw,44px)] text-char-900 tracking-tight mb-4">
                  Recognized for excellence.
                </h2>
                <p className="text-warm-500 mb-8">
                  We&apos;ve been recognized by G2, Clutch, and Forbes as a top digital marketing agency — but our real badge of honor is a 98% client retention rate.
                </p>
                <Button href="/contact" variant="secondary" arrow>Join our client roster</Button>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1 w-full max-w-md">
                {["G2 Top Agency 2024", "Clutch Global Leader", "Forbes Agency Council", "98% Client Retention"].map((a) => (
                  <div key={a} className="bg-white rounded-2xl border border-warm-200 p-5 text-center card-hover">
                    <div className="text-gold-400 text-lg font-bold mb-2">✦</div>
                    <p className="text-sm font-semibold text-char-800">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
