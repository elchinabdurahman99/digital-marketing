"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, Calendar, Zap, Star, X } from "lucide-react";

type ToastType = "success" | "error";

function Toast({ type, message, onClose }: { type: ToastType; message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.14)] border text-sm font-semibold max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300 ${
        type === "success"
          ? "bg-white border-gold-200 text-char-800"
          : "bg-white border-red-200 text-char-800"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          type === "success" ? "bg-gold-50 text-gold-500" : "bg-red-50 text-red-500"
        }`}
      >
        {type === "success" ? <CheckCircle2 size={14} /> : <X size={14} />}
      </div>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-warm-400 hover:text-char-600 transition-colors ml-1">
        <X size={14} />
      </button>
    </div>
  );
}
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimateIn from "@/components/ui/AnimateIn";

const services = ["Paid Search", "Paid Social", "Programmatic Media Buying", "SEO", "Website Development", "Affiliate Marketing", "Not sure yet"];
const budgets  = ["Under $3k/mo", "$3k–$7k/mo", "$7k–$15k/mo", "$15k–$30k/mo", "$30k+/mo"];

const faqs = [
  { q: "How quickly will we see results?",               a: "Paid ads can show results in 2–4 weeks. SEO typically takes 3–6 months for significant organic growth." },
  { q: "Do you work with small businesses?",             a: "Yes. Our minimum engagement starts at $2,500/month. We work with startups to enterprise brands." },
  { q: "Do you lock clients into contracts?",            a: "We use 3-month initial agreements, then month-to-month after that. We earn your business every month." },
  { q: "What makes you different from other agencies?",  a: "Senior-only team. Transparent reporting. Revenue-focused strategy. 98% client retention rate." },
];

const inputCls = "w-full px-4 py-3 rounded-xl border border-warm-200 text-sm bg-warm-50 text-char-800 placeholder:text-warm-400 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all";

function ReviewForm() {
  const [form, setForm] = useState({ author: "", role: "", company: "", quote: "", rating: 5 });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author || !form.quote) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-gold-400" />
        </div>
        <h3 className="text-xl font-extrabold text-char-900 mb-2">Thank you for your review!</h3>
        <p className="text-warm-500 text-sm">Your feedback will appear on our site after a quick review.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star rating */}
      <div>
        <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-3">Your rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setForm({ ...form, rating: star })}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={star <= form.rating ? "text-gold-400 fill-gold-400" : "text-warm-200 fill-warm-200"}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Your name *</label>
          <input
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="Alex Johnson"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Your role</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="CMO, Founder…"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Company</label>
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Acme Inc."
          className={inputCls}
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-char-600 uppercase tracking-widest block mb-2">Your review *</label>
        <textarea
          required
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          rows={4}
          placeholder="Share your experience working with Roivex…"
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        arrow
        className="w-full justify-center"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Submit review"}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget,  setSelectedBudget]  = useState("");
  const [submitted,       setSubmitted]       = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [toast,           setToast]           = useState<{ type: ToastType; message: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: selectedService, budget: selectedBudget }),
      });
      if (res.ok) {
        setSubmitted(true);
        setToast({ type: "success", message: "Message sent! We'll be in touch within 24 hours." });
      } else {
        setToast({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setToast({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-warm-50">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-44 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[250px] rounded-full bg-gold-50 blur-3xl opacity-80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <AnimateIn>
            <SectionLabel center>Let&apos;s talk</SectionLabel>
            <h1 className="display-serif text-[clamp(48px,7vw,88px)] text-char-900 tracking-tight mb-6 leading-[0.95]">
              Ready to grow<br />
              <em className="gradient-gold not-italic">faster?</em>
            </h1>
            <p className="text-warm-500 text-xl max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your current marketing and show you where the biggest opportunities are.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Contact form */}
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

                  <Button type="submit" variant="secondary" size="lg" arrow className="w-full justify-center" disabled={loading}>
                    {loading ? "Sending…" : "Send message & book a call"}
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
                    { icon: Mail,   label: "Email",         value: "hello@roivex.com" },
                    { icon: Phone,  label: "Phone",         value: "+1 (234) 567-890" },
                    { icon: MapPin, label: "Location",      value: "New York, NY" },
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
            </div>
          </AnimateIn>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <AnimateIn>
            <h2 className="display-serif text-[clamp(28px,3.5vw,44px)] text-char-900 tracking-tight text-center mb-10">Common questions</h2>
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

        {/* Review section */}
        <div className="mt-20">
          <AnimateIn>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <SectionLabel center>Leave a review</SectionLabel>
                <h2 className="display-serif text-[clamp(28px,3.5vw,44px)] text-char-900 tracking-tight mt-3 mb-3">
                  Worked with us?
                </h2>
                <p className="text-warm-500">Share your experience — approved reviews appear on our homepage.</p>
              </div>
              <div className="bg-white rounded-3xl border border-warm-200 p-8 lg:p-10 shadow-[0_4px_32px_0_rgba(0,0,0,0.06)]">
                <ReviewForm />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
