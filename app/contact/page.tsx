"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, Calendar, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";

const services = ["SEO", "Paid Advertising", "Social Media Marketing", "CRO", "Full-Service Partnership", "Not sure yet"];
const budgets  = ["Under $3k/mo", "$3k–$7k/mo", "$7k–$15k/mo", "$15k–$30k/mo", "$30k+/mo"];

const faqs = [
  { q: "How quickly will we see results?",               a: "Paid ads can show results in 2–4 weeks. SEO typically takes 3–6 months for significant organic growth." },
  { q: "Do you work with small businesses?",             a: "Yes. Our minimum engagement starts at $2,500/month. We work with startups to enterprise brands." },
  { q: "Do you lock clients into contracts?",            a: "We use 3-month initial agreements, then month-to-month after that. We earn your business every month." },
  { q: "What makes you different from other agencies?",  a: "Senior-only team. Transparent reporting. Revenue-focused strategy. 98% client retention rate." },
];

const inputCls = "w-full px-4 py-3 rounded-xl border border-warm-200 text-sm bg-warm-50 text-char-800 placeholder:text-warm-400 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all";

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget,  setSelectedBudget]  = useState("");
  const [submitted,       setSubmitted]       = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-warm-50">
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-44 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[250px] rounded-full bg-gold-50 blur-3xl opacity-80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <AnimateIn>
            <SectionLabel center>Let&apos;s talk</SectionLabel>
            <h1 className="text-5xl lg:text-[80px] font-extrabold text-char-900 tracking-tight mb-6 leading-[1.0]">
              Ready to grow<br />
              <span className="gradient-gold">faster?</span>
            </h1>
            <p className="text-warm-500 text-xl max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your current marketing and show you where the biggest opportunities are.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Form */}
          <AnimateIn>
            <div className="bg-white rounded-3xl border border-warm-200 overflow-hidden shadow-[0_4px_32px_0_rgba(0,0,0,0.06)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gold-50 flex items-center justify-center mb-6 border border-gold-100">
                    <CheckCircle2 size={32} className="text-gold-400" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-char-900 mb-3">Message received!</h2>
                  <p className="text-warm-500 text-lg mb-2">We&apos;ll be in touch within 24 hours.</p>
                  <Button href="/projects" variant="outline" className="mt-8">View case studies</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 lg:p-10">
                  <h2 className="text-xl font-extrabold text-char-900 mb-1">Tell us about your project</h2>
                  <p className="text-warm-500 text-sm mb-8">Free consultation. No pressure. No spam.</p>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Your name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Johnson" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Email address *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@company.com" className={inputCls} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Company name</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." className={inputCls} />
                  </div>

                  <div className="mb-6">
                    <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-3">Service interested in</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button key={s} type="button" onClick={() => setSelectedService(s)}
                          className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                            selectedService === s
                              ? "bg-gold-400 text-white border-gold-400 shadow-[0_2px_12px_0_rgba(200,164,90,0.3)]"
                              : "bg-warm-50 text-char-600 border-warm-200 hover:border-gold-300 hover:text-gold-500"
                          }`}
                        >{s}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-3">Monthly marketing budget</label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button key={b} type="button" onClick={() => setSelectedBudget(b)}
                          className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                            selectedBudget === b
                              ? "bg-gold-400 text-white border-gold-400 shadow-[0_2px_12px_0_rgba(200,164,90,0.3)]"
                              : "bg-warm-50 text-char-600 border-warm-200 hover:border-gold-300 hover:text-gold-500"
                          }`}
                        >{b}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Tell us more (optional)</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Current challenges, goals, timeline..." className={`${inputCls} resize-none`} />
                  </div>

                  <Button type="submit" variant="secondary" size="lg" arrow className="w-full justify-center">
                    Send message &amp; book a call
                  </Button>
                  <p className="text-center text-xs text-warm-400 mt-4">We respond within 24 hours. No spam, ever.</p>
                </form>
              )}
            </div>
          </AnimateIn>

          {/* Sidebar */}
          <AnimateIn delay={100}>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-[0_2px_16px_0_rgba(0,0,0,0.04)]">
                <h3 className="font-bold text-char-700 mb-5 text-xs uppercase tracking-widest">Get in touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail,   label: "Email",         value: "hello@apexagency.co" },
                    { icon: Phone,  label: "Phone",         value: "+1 (415) 555-0192" },
                    { icon: MapPin, label: "Offices",       value: "San Francisco · New York" },
                    { icon: Clock,  label: "Response time", value: "Within 24 hours" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0 text-gold-500">
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-warm-400">{label}</div>
                        <div className="text-sm font-semibold text-char-700 mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gold-50 rounded-2xl border border-gold-100 p-6">
                <h3 className="font-bold text-char-800 mb-4 text-sm">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, step: "We read your brief",       desc: "Within 4 hours." },
                    { icon: Calendar,      step: "Strategy call scheduled",  desc: "We find a time that works." },
                    { icon: Zap,           step: "Free audit delivered",     desc: "Custom recommendations." },
                    { icon: CheckCircle2,  step: "Proposal sent",            desc: "If we're a fit, we move fast." },
                  ].map(({ icon: Icon, step, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 text-gold-500">
                        <Icon size={13} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-char-800">{step}</div>
                        <div className="text-xs text-warm-500">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-warm-200 p-5 text-center shadow-[0_2px_12px_0_rgba(0,0,0,0.04)]">
                <div className="flex justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-semibold text-char-700">&ldquo;Best agency decision we ever made.&rdquo;</p>
                <p className="text-[10px] text-warm-400 mt-1">— CMO, Fortune 500 Brand</p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <AnimateIn>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-char-900 tracking-tight text-center mb-10">Common questions</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <AnimateIn key={faq.q} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-warm-200 p-6 card-hover">
                  <h3 className="font-bold text-char-900 mb-2 text-[15px]">{faq.q}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
