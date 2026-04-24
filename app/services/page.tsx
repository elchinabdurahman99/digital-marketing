import type { Metadata } from "next";
import { Search, Target, Share2, TrendingUp, CheckCircle2, Code2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";
import { getServices } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Services",
  description: "SEO, paid ads, social media, CRO, and web development services for high-growth brands.",
};

const iconMap: Record<string, React.ElementType> = { Search, Target, Share2, TrendingUp, Code2 };

const accentColors = [
  { bg: "#FDF8EC", icon: "#C8A45A", border: "#EDD898", text: "#A8822E" },
  { bg: "#F0FDF4", icon: "#16A34A", border: "#BBF7D0", text: "#15803D" },
  { bg: "#FDF4FF", icon: "#9333EA", border: "#E9D5FF", text: "#7E22CE" },
  { bg: "#FFF7ED", icon: "#EA580C", border: "#FED7AA", text: "#C2410C" },
  { bg: "#ECFEFF", icon: "#0891B2", border: "#A5F3FC", text: "#0E7490" },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-44 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-50 blur-3xl opacity-70 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <AnimateIn>
            <SectionLabel center>Our services</SectionLabel>
            <h1 className="display-serif text-[clamp(48px,7vw,88px)] text-char-900 tracking-tight mb-6 text-balance leading-[0.95]">
              Built for growth.<br />
              <em className="gradient-gold not-italic">Measured in revenue.</em>
            </h1>
            <p className="text-lg text-warm-500 max-w-2xl mx-auto mb-10">
              Five interconnected services covering every growth lever — run by channel specialists, unified by strategy.
            </p>
            <Button href="/contact" variant="secondary" size="lg" arrow>Get a free service audit</Button>
          </AnimateIn>
        </div>
      </section>

      {/* Services detail — clean stack, no direction:rtl hack */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Search;
          const acc = accentColors[i] ?? accentColors[0];
          const isEven = i % 2 === 0;

          return (
            <AnimateIn key={service.slug}>
              <div id={service.slug} className="py-16 lg:py-20">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${isEven ? "" : "lg:flex-row-reverse"}`}>

                  {/* Content side — swapped via order on odd */}
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 border"
                      style={{ background: acc.bg, borderColor: acc.border }}
                    >
                      <Icon size={26} style={{ color: acc.icon }} />
                    </div>
                    <div className="mb-4">
                      <Badge color="gold">Service {String(i + 1).padStart(2, "0")}</Badge>
                    </div>
                    <h2 className="display-serif text-[clamp(30px,3.5vw,46px)] text-char-900 tracking-tight mb-3">
                      {service.title}
                    </h2>
                    <p className="font-semibold mb-5 text-lg" style={{ color: acc.text }}>{service.tagline}</p>
                    <p className="text-warm-500 leading-relaxed mb-8 text-[15px]">{service.description}</p>

                    {/* Key result chip */}
                    <div
                      className="inline-flex items-center gap-5 bg-white rounded-2xl border px-6 py-4 mb-8 shadow-[0_2px_16px_-2px_rgba(0,0,0,0.06)]"
                      style={{ borderColor: acc.border }}
                    >
                      <div>
                        <div className="text-3xl font-extrabold tracking-tight" style={{ color: acc.icon }}>
                          {service.metric.value}
                        </div>
                        <div className="text-xs text-warm-400 font-medium">{service.metric.label}</div>
                      </div>
                      <div className="w-px h-10 bg-warm-200" />
                      <div className="text-xs text-warm-500 font-medium max-w-[140px]">
                        Average result across our client base
                      </div>
                    </div>

                    <div>
                      <Button href="/contact" variant="secondary" arrow>Start this service</Button>
                    </div>
                  </div>

                  {/* Details panel */}
                  <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                    <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-[0_2px_16px_-2px_rgba(0,0,0,0.04)] mb-4 hover:border-gold-200 transition-colors">
                      <h3 className="font-bold text-char-700 mb-4 text-xs uppercase tracking-widest">What&apos;s included</h3>
                      <ul className="space-y-3">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-warm-500 text-sm">
                            <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: acc.icon }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-warm-100 rounded-2xl border border-warm-200 p-6">
                      <h3 className="font-bold text-char-700 mb-5 text-xs uppercase tracking-widest">How we do it</h3>
                      <div className="space-y-4">
                        {service.process.map((p, j) => (
                          <div key={p.step} className="flex items-start gap-4">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
                              style={{ background: acc.icon }}
                            >
                              {j + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-char-800 text-sm">{p.title}</div>
                              <div className="text-warm-500 text-xs leading-relaxed mt-0.5">{p.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {i < services.length - 1 && <hr className="border-warm-200" />}
            </AnimateIn>
          );
        })}
      </div>

      {/* CTA */}
      <section className="section-padding bg-warm-100 border-t border-warm-200">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <AnimateIn>
            <h2 className="display-serif text-[clamp(32px,4vw,52px)] text-char-900 tracking-tight mb-4">Not sure where to start?</h2>
            <p className="text-warm-500 mb-8 text-lg">
              We&apos;ll audit your current marketing and tell you exactly which services will move the needle fastest.
            </p>
            <Button href="/contact" variant="secondary" size="lg" arrow>Get a free audit</Button>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
