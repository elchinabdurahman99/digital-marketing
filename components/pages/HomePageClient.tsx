"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Target, Share2, TrendingUp, Star, ArrowUpRight, Code2, TrendingUpIcon, Users, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import Button, { GoldButton } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn, { AnimateStagger, fadeUp } from "@/components/ui/AnimateIn";
import Marquee from "@/components/ui/Marquee";

const iconMap: Record<string, React.ElementType> = { Search, Target, Share2, TrendingUp, Code2 };

const metricColors = ["#C8A45A", "#16A34A", "#9333EA", "#EA580C", "#0891B2", "#D97706"];
const serviceNumbers = ["01", "02", "03", "04", "05", "06"];

type HeroProofCard = {
  mainValue: string; mainLabel: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  growthValue: string; growthLabel: string;
  clientValue: string; clientLabel: string;
  liveWinText: string;
};
type Hero = {
  eyebrowText: string;
  headlineLine1: string; headlineLine2: string; headlineLine3: string;
  rotatingWords: string[];
  subtext: string;
  primaryCtaText: string; primaryCtaLink: string;
  secondaryCtaText: string; secondaryCtaLink: string;
  proofCard: HeroProofCard;
  trustRating: string; trustReviews: string;
};
type Service = {
  _id: string; slug: string; title: string; tagline: string; icon: string;
  metric: { value: string; label: string };
};
type Project = {
  _id: string; slug: string; title: string; client: string; tag: string;
  services: string[]; results: { metric: string; label: string }[];
};
type Testimonial = {
  _id: string; quote: string; author: string; role: string;
  company: string; initials: string;
};
type Stat = { _id: string; value: string; label: string };
type PartnerLogo = { _id: string; name: string };

function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx((next + count) % count);
  };

  if (!count) return null;
  const t = testimonials[idx];

  return (
    <section
      className="section-padding bg-char-900 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full bg-gold-400/4 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-gold-400/3 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 relative">
        <AnimateIn>
          <SectionLabel center>What clients say</SectionLabel>
        </AnimateIn>

        {/* Slider */}
        <div className="mt-14 relative">
          {/* Large quote mark */}
          <div className="display-serif text-[140px] lg:text-[200px] leading-none text-gold-400/10 absolute -top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            &ldquo;
          </div>

          <div className="relative min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={t._id}
                custom={dir}
                variants={{
                  enter:  (d: number) => ({ x: d * 60, opacity: 0, filter: "blur(6px)" }),
                  center: { x: 0, opacity: 1, filter: "blur(0px)" },
                  exit:   (d: number) => ({ x: d * -60, opacity: 0, filter: "blur(6px)" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center max-w-3xl mx-auto"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>

                <blockquote className="display-serif text-[clamp(20px,2.8vw,34px)] text-white leading-[1.3] tracking-[-0.01em] italic mb-10">
                  {t.quote}
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold-400 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm">{t.author}</div>
                    <div className="text-xs text-white/40">
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows */}
          {count > 1 && (
            <>
              <button
                onClick={() => go(idx - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-8 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/12 hover:border-gold-400/40 flex items-center justify-center text-white/50 hover:text-gold-400 transition-all duration-200"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(idx + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-8 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/12 hover:border-gold-400/40 flex items-center justify-center text-white/50 hover:text-gold-400 transition-all duration-200"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? "bg-gold-400 w-6 h-2"
                    : "bg-white/20 hover:bg-white/35 w-2 h-2"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress bar */}
        {!paused && count > 1 && (
          <div className="mt-6 max-w-xs mx-auto h-px bg-white/8 rounded-full overflow-hidden">
            <motion.div
              key={idx}
              className="h-full bg-gold-400/60 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

interface Props {
  hero: Hero;
  services: Service[];
  featuredProjects: Project[];
  testimonials: Testimonial[];
  stats: Stat[];
  partnerLogos: PartnerLogo[];
}

export default function HomePageClient({ hero, services, featuredProjects, testimonials, stats, partnerLogos }: Props) {
  const words = hero?.rotatingWords?.length ? hero.rotatingWords : ["revenue.", "leads.", "growth.", "results.", "money."];
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, -50]);
  const heroBgParallax = useTransform(scrollY, [0, 700], [0, 80]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);

  const logoNames = partnerLogos.length > 0
    ? partnerLogos.map((l) => l.name)
    : ["Acme Inc.", "Meridian", "Nova SaaS", "Bloom Commerce", "Apex Health", "Orbit Media", "Vantage", "Crest Labs"];

  return (
    <div className="bg-warm-50 overflow-x-hidden">

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ paddingTop: "70px" }}>

        <motion.div style={{ y: heroBgParallax }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[48%] h-full bg-gradient-to-l from-warm-100 to-transparent" />
          <div className="absolute top-[10%] left-[4%] w-56 h-56 rounded-full bg-gold-100 blur-[80px] opacity-60" />
          <div className="absolute bottom-[15%] right-[6%] w-80 h-80 rounded-full bg-gold-50 blur-[100px] opacity-80" />
          <div className="absolute top-[55%] left-[40%] w-40 h-40 rounded-full bg-warm-200 blur-[60px] opacity-50" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#0C0C0C" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="hidden lg:block absolute top-20 bottom-20 left-[56%] w-px bg-gradient-to-b from-transparent via-warm-300/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-200 to-transparent" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full py-10 lg:py-14">
          <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-0 items-center min-h-[calc(100vh-160px)]">

            {/* LEFT: Headline column */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold-200 bg-gold-50 text-[11px] font-bold tracking-[0.18em] uppercase text-gold-600">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
                  </span>
                  {hero?.eyebrowText ?? "Trusted by 300+ growing brands"}
                </span>
              </motion.div>

              <motion.div style={{ y: heroParallax }} className="mb-8">
                <div className="overflow-hidden mb-1">
                  <motion.h1
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    className="display-serif text-[clamp(48px,6.5vw,88px)] text-char-900 leading-[0.92] tracking-[-0.025em]"
                  >
                    {hero?.headlineLine1 ?? "We turn"}
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-1">
                  <motion.div
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                    className="display-serif text-[clamp(48px,6.5vw,88px)] gradient-gold leading-[0.92] tracking-[-0.025em]"
                  >
                    {hero?.headlineLine2 ?? "marketing"}
                  </motion.div>
                </div>
                <div className="overflow-hidden flex items-baseline gap-3 lg:gap-4">
                  <motion.span
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                    className="display-serif text-[clamp(48px,6.5vw,88px)] text-char-900 leading-[0.92] tracking-[-0.025em]"
                  >
                    {hero?.headlineLine3 ?? "into"}
                  </motion.span>
                  <span
                    className="display-serif text-[clamp(48px,6.5vw,88px)] leading-[0.92] tracking-[-0.025em] relative overflow-hidden inline-block"
                    style={{ minWidth: "3ch" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIdx}
                        initial={{ y: "105%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-105%", opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="gradient-gold block"
                      >
                        {words[wordIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="text-[17px] text-warm-500 leading-relaxed max-w-[480px] mb-9"
              >
                {hero?.subtext ?? "The agency built by ex–in-house marketers who were tired of pretty dashboards. We deliver compounding revenue — not reports."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.62 }}
                className="flex flex-wrap items-center gap-3 mb-12"
              >
                <GoldButton href={hero?.primaryCtaLink ?? "/contact"}>
                  {hero?.primaryCtaText ?? "Get free audit"} <ArrowRight size={16} />
                </GoldButton>
                <Button href={hero?.secondaryCtaLink ?? "/projects"} size="lg" variant="outline">
                  {hero?.secondaryCtaText ?? "See our results"}
                </Button>
              </motion.div>

            </div>

            {/* RIGHT: Proof panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="relative lg:pl-16 flex flex-col gap-4 lg:justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-char-900 rounded-2xl p-6 shadow-[0_20px_60px_-10px_rgba(12,12,12,0.3)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-gold-400/15 flex items-center justify-center">
                      <DollarSign size={18} className="text-gold-400" />
                    </div>
                    <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Total client revenue</span>
                  </div>
                  <div className="display-serif text-[56px] text-white font-semibold leading-none tracking-tight mb-1">
                    {hero?.proofCard?.mainValue ?? "$2.4B"}
                  </div>
                  <div className="text-white/40 text-sm">{hero?.proofCard?.mainLabel ?? "generated across 300+ brands"}</div>
                  <div className="mt-5 pt-5 border-t border-white/8 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-extrabold text-gold-400 tracking-tight">{hero?.proofCard?.stat1Value ?? "6.2×"}</div>
                      <div className="text-white/40 text-xs mt-0.5">{hero?.proofCard?.stat1Label ?? "Avg. ROAS"}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gold-400 tracking-tight">{hero?.proofCard?.stat2Value ?? "98%"}</div>
                      <div className="text-white/40 text-xs mt-0.5">{hero?.proofCard?.stat2Label ?? "Retention"}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.88 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-warm-200 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                    <TrendingUpIcon size={16} className="text-emerald-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-char-900 tracking-tight">{hero?.proofCard?.growthValue ?? "340%"}</div>
                  <div className="text-warm-500 text-xs mt-1 leading-snug">{hero?.proofCard?.growthLabel ?? "Avg. client growth"}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
                  whileHover={{ y: -4 }}
                  className="bg-gold-400 rounded-2xl p-5 shadow-[0_8px_32px_-4px_rgba(200,164,90,0.4)]"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="text-2xl font-extrabold text-white tracking-tight">{hero?.proofCard?.clientValue ?? "300+"}</div>
                  <div className="text-white/70 text-xs mt-1 leading-snug">{hero?.proofCard?.clientLabel ?? "Brands scaled"}</div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-warm-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-gold-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ LOGOS MARQUEE ══════════════════════════════════════════ */}
      <section className="py-8 border-y border-warm-200 bg-white">
        <p className="text-center text-[10px] font-bold tracking-[0.24em] uppercase text-warm-400 mb-6">
          Trusted by fast-growing companies
        </p>
        <Marquee items={logoNames} />
      </section>

      {/* ═══ SERVICES ════════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <div>
                <SectionLabel>What we do</SectionLabel>
                <h2 className="display-serif text-[clamp(40px,5.5vw,72px)] text-char-900 tracking-tight mt-3">
                  Every channel.<br />
                  <em className="gradient-gold not-italic">One team.</em>
                </h2>
              </div>
              <p className="text-warm-500 max-w-xs text-[15px] leading-relaxed lg:text-right lg:pb-2">
                Six core services, all connected by strategy — managed by a single team accountable to your growth.
              </p>
            </div>
          </AnimateIn>

          <div className="divide-y divide-warm-200">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Search;
              return (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                >
                  <Link
                    href="/services"
                    className="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-8 lg:py-10 hover:bg-warm-100/60 px-4 -mx-4 rounded-xl transition-colors duration-300"
                  >
                    <span className="display-serif text-[clamp(36px,4vw,52px)] text-warm-200 font-light leading-none flex-shrink-0 w-16 group-hover:text-gold-300 transition-colors duration-300">
                      {serviceNumbers[i]}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${metricColors[i]}15` }}
                    >
                      <Icon size={22} style={{ color: metricColors[i] }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-char-800 group-hover:text-char-900 transition-colors mb-1">
                        {s.title}
                      </h3>
                      <p className="text-warm-500 text-sm leading-relaxed max-w-lg">{s.tagline}</p>
                    </div>
                    <div className="hidden sm:block text-right flex-shrink-0 w-32">
                      <div className="text-2xl font-extrabold tracking-tight" style={{ color: metricColors[i] }}>
                        {s.metric?.value}
                      </div>
                      <div className="text-[10px] text-warm-400 uppercase tracking-wider mt-0.5">{s.metric?.label}</div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-warm-200 group-hover:border-gold-400 group-hover:bg-gold-400 transition-all duration-300 flex-shrink-0">
                      <ArrowUpRight size={16} className="text-warm-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══════════════════════════════════════════ */}
      <section className="section-padding bg-warm-100 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
              <div>
                <SectionLabel>Results</SectionLabel>
                <h2 className="display-serif text-[clamp(40px,5.5vw,72px)] text-char-900 tracking-tight mt-3">
                  Real numbers.<br />
                  <em className="gradient-gold not-italic">Real companies.</em>
                </h2>
              </div>
              <Button href="/projects" variant="outline" arrow>All case studies</Button>
            </div>
          </AnimateIn>

          <AnimateStagger className="grid lg:grid-cols-3 gap-5 items-stretch">
            {featuredProjects.map((p, i) => (
              <motion.div key={p._id} variants={fadeUp} className="h-full">
                <Link
                  href="/projects"
                  className="group flex flex-col bg-white rounded-3xl border border-warm-200 overflow-hidden card-hover h-full"
                >
                  <div className="relative h-36 overflow-hidden flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${metricColors[i]}10, ${metricColors[i]}05)` }}>
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: metricColors[i] }} />
                    <span className="display-serif text-[80px] font-light select-none tracking-tight leading-none"
                      style={{ color: `${metricColors[i]}20` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute top-4 left-5">
                      <Badge color="warm">{p.tag}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] font-bold text-warm-400 uppercase tracking-widest mb-2">{p.client}</p>
                    <h3 className="font-bold text-char-800 text-base leading-snug mb-5 group-hover:text-gold-500 transition-colors line-clamp-2 min-h-[2.5rem]">
                      {p.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {p.results?.map((r) => (
                        <div key={r.label} className="bg-warm-50 rounded-xl p-3 text-center border border-warm-100">
                          <div className="text-lg font-extrabold tracking-tight" style={{ color: metricColors[i] }}>{r.metric}</div>
                          <div className="text-[9px] text-warm-400 font-semibold uppercase tracking-wider mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {p.services?.map((sv) => <Badge key={sv} color="gold">{sv}</Badge>)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* ═══ ABOUT ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateIn>
              <SectionLabel>About us</SectionLabel>
              <h2 className="display-serif text-[clamp(40px,5vw,64px)] text-char-900 tracking-tight mt-3 mb-6">
                We obsess over<br />
                <em className="gradient-gold not-italic">your growth.</em>
              </h2>
              <p className="text-warm-500 text-lg leading-relaxed mb-8">
                Roivex was built by marketers who were tired of agencies that prioritized optics over outcomes. We run lean, move fast, and tie every decision to revenue impact.
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  "Senior specialists, not junior staff",
                  "Transparent reporting, zero fluff",
                  "Custom strategies, not cookie-cutter playbooks",
                  "One point of contact per client",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-char-700 text-[15px] font-medium">
                    <span className="w-5 h-5 rounded-full border border-gold-300 bg-gold-50 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
{/* <Button href="/about" variant="outline" arrow>Our story</Button> */}
            </AnimateIn>

            <AnimateIn delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s._id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`rounded-2xl p-7 border transition-colors duration-300 ${
                      i === 0 ? "bg-char-900 border-char-900 shadow-[0_12px_40px_0_rgba(12,12,12,0.25)]"
                      : i === 1 ? "bg-gold-400 border-gold-400 shadow-[0_8px_32px_0_rgba(200,164,90,0.35)]"
                      : "bg-white border-warm-200 hover:border-gold-300"
                    }`}
                  >
                    <div className={`display-serif text-[clamp(32px,3.5vw,44px)] font-semibold tracking-tight mb-1 ${
                      i === 0 ? "text-white" : i === 1 ? "text-white" : "text-char-900"
                    }`}>
                      {s.value}
                    </div>
                    <div className={`text-sm font-medium ${
                      i === 0 ? "text-white/50" : i === 1 ? "text-white/70" : "text-warm-500"
                    }`}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* <TestimonialsSlider testimonials={testimonials} /> */}

    </div>
  );
}
