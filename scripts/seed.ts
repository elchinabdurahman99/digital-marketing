import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "7dc6cp06",
  dataset:   "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN ??
    "skQ79ovc58C0cA7LFeul5f02AAWO89beblty4BoreuOXvtxAYcQl8zj8vcoimDGzEBnfkjKmusWuLuQMfKw7a6Uj8DaSlG5ZSlcOcw3g0yION6NbfUaJ6rrQZ2JzQrpOifwlgBqr8zLkOCchT5Of9yff1MAy0HMWlJklg5OD0skGxFXfRh9q",
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding Sanity with Roivex data...\n");

  // ── Site Settings ──────────────────────────────────────────
  await client.createOrReplace({
    _id:  "siteSettings",
    _type: "siteSettings",
    siteName: "Roivex",
    tagline: "Digital Marketing Agency",
    seo: {
      metaTitle: "Roivex — Digital Marketing Agency | Paid Search, SEO & More",
      metaDescription: "Roivex is a premium digital marketing agency delivering Paid Search, Paid Social, Programmatic Media Buying, SEO, Website Development, and Affiliate Marketing.",
      twitterHandle: "@roivex",
    },
    contact: { email: "hello@roivex.com", phone: "+1 (234) 567-890", address: "New York, NY" },
    social: {
      linkedin:  "https://linkedin.com/company/roivex",
      instagram: "https://instagram.com/roivex",
      twitter:   "https://twitter.com/roivex",
    },
    announcementBar: { enabled: false, text: "", link: "" },
  });
  console.log("✅ Site settings");

  // ── Hero ───────────────────────────────────────────────────
  await client.createOrReplace({
    _id:  "hero",
    _type: "hero",
    eyebrowText:    "Trusted by 300+ growing brands",
    headlineLine1:  "We turn",
    headlineLine2:  "marketing",
    headlineLine3:  "into",
    rotatingWords:  ["revenue.", "leads.", "growth.", "results.", "money."],
    subtext: "The agency built by ex–in-house marketers who were tired of pretty dashboards. We deliver compounding revenue — not reports.",
    primaryCtaText:   "Get free audit",
    primaryCtaLink:   "/contact",
    secondaryCtaText: "See our results",
    secondaryCtaLink: "/projects",
    proofCard: {
      mainValue:    "$2.4B",
      mainLabel:    "generated across 300+ brands",
      stat1Value:   "6.2×",
      stat1Label:   "Avg. ROAS",
      stat2Value:   "98%",
      stat2Label:   "Retention",
      growthValue:  "340%",
      growthLabel:  "Avg. client growth",
      clientValue:  "300+",
      clientLabel:  "Brands scaled",
      liveWinText:  "Meridian just hit +340% MRR in 8 months",
    },
    trustRating:  "4.9/5",
    trustReviews: "300+",
  });
  console.log("✅ Hero");

  // ── Stats ──────────────────────────────────────────────────
  const statsData = [
    { value: "300+",  label: "Clients Served",     order: 0 },
    { value: "$2.4B", label: "Revenue Generated",   order: 1 },
    { value: "6.2×",  label: "Avg. ROAS",           order: 2 },
    { value: "98%",   label: "Client Retention",    order: 3 },
  ];
  for (const s of statsData) {
    await client.createOrReplace({ _id: `stat-${s.order}`, _type: "stat", ...s });
  }
  console.log("✅ Stats");

  // ── Services ───────────────────────────────────────────────
  const servicesData = [
    {
      _id: "service-paid-search",
      title: "Paid Search",
      slug: { _type: "slug", current: "paid-search" },
      icon: "Target",
      tagline: "Precision targeting. Maximum ROAS.",
      description: "From Google Search to Microsoft Ads, we build performance campaigns that turn ad spend into predictable revenue — at scale.",
      benefits: ["Google & Microsoft Ads management", "Keyword strategy & negative matching", "Smart bidding & automation", "Landing page alignment", "Weekly performance reporting"],
      process: [
        { step: "01", title: "Audit", desc: "Analyse existing campaigns, identify waste and missed opportunity." },
        { step: "02", title: "Strategy", desc: "Build keyword architecture targeting high-intent, high-value queries." },
        { step: "03", title: "Launch", desc: "Deploy optimised campaigns with full conversion tracking." },
        { step: "04", title: "Scale", desc: "Weekly bid & copy optimisation for compounding ROAS." },
      ],
      metric: { value: "6.2×", label: "avg. return on ad spend" },
      accentColor: "#C8A45A",
      order: 0,
    },
    {
      _id: "service-paid-social",
      title: "Paid Social",
      slug: { _type: "slug", current: "paid-social" },
      icon: "Share2",
      tagline: "Build audience. Drive conversions. Scale profitably.",
      description: "Meta, TikTok, LinkedIn, Pinterest — we create and manage social ad campaigns that find your best customers wherever they spend time.",
      benefits: ["Meta (Facebook & Instagram) Ads", "TikTok & Snapchat campaigns", "LinkedIn B2B advertising", "Creative strategy & UGC production", "Audience segmentation & retargeting"],
      process: [
        { step: "01", title: "Research", desc: "Audience analysis, competitor creative audit, and platform selection." },
        { step: "02", title: "Creative", desc: "Produce scroll-stopping creatives tested across formats." },
        { step: "03", title: "Launch", desc: "Multi-platform deployment with pixel tracking fully wired." },
        { step: "04", title: "Optimise", desc: "Weekly creative refresh and audience pruning for lower CPMs." },
      ],
      metric: { value: "4.1×", label: "avg. ROAS on social campaigns" },
      accentColor: "#E91E8C",
      order: 1,
    },
    {
      _id: "service-programmatic",
      title: "Programmatic Media Buying",
      slug: { _type: "slug", current: "programmatic" },
      icon: "BarChart2",
      tagline: "Reach the right audience. At the right moment. At scale.",
      description: "We leverage DSPs and data to serve display, video, and native ads with surgical precision — reaching your ideal customer across 50,000+ websites and apps.",
      benefits: ["DSP management (DV360, The Trade Desk)", "Audience data & DMP strategy", "Display, video & native formats", "Brand safety & viewability controls", "Attribution & incrementality testing"],
      process: [
        { step: "01", title: "Audience Build", desc: "Define audience segments using first and third-party data." },
        { step: "02", title: "Inventory Plan", desc: "Select premium placements aligned to your brand goals." },
        { step: "03", title: "Activate", desc: "Deploy across DSP with frequency caps and brand safety filters." },
        { step: "04", title: "Optimise", desc: "Continuous CPM, viewability and conversion rate optimisation." },
      ],
      metric: { value: "72%", label: "lower CPM vs. direct buys" },
      accentColor: "#9333EA",
      order: 2,
    },
    {
      _id: "service-seo",
      title: "SEO",
      slug: { _type: "slug", current: "seo" },
      icon: "Search",
      tagline: "Rank higher. Get found. Grow organically.",
      description: "We engineer SEO strategies that compound over time — driving qualified traffic, building authority, and turning search into your most reliable growth channel.",
      benefits: ["Technical SEO audits & fixes", "Content strategy & optimisation", "Link building & authority growth", "Local SEO for multi-location brands", "Core Web Vitals optimisation"],
      process: [
        { step: "01", title: "Audit", desc: "Deep technical & content audit of your current SEO health." },
        { step: "02", title: "Strategy", desc: "Custom roadmap targeting high-intent keywords and gaps." },
        { step: "03", title: "Execute", desc: "On-page, off-page, and technical implementation." },
        { step: "04", title: "Scale", desc: "Monthly reporting with continuous optimisation loops." },
      ],
      metric: { value: "3.4×", label: "avg. organic traffic growth" },
      accentColor: "#16A34A",
      order: 3,
    },
    {
      _id: "service-web-development",
      title: "Website Development",
      slug: { _type: "slug", current: "website-development" },
      icon: "Code2",
      tagline: "Fast, beautiful, conversion-ready websites.",
      description: "We design and build high-performance websites and landing pages that look exceptional, load instantly, and are engineered to convert visitors into revenue.",
      benefits: ["Custom Next.js & React development", "Landing page & funnel design", "E-commerce storefronts (Shopify, custom)", "CMS integration (Sanity, Contentful)", "Core Web Vitals & performance optimisation"],
      process: [
        { step: "01", title: "Discovery", desc: "Goals, audience, and technical requirements scoped." },
        { step: "02", title: "Design", desc: "High-fidelity wireframes and UI reviewed with you." },
        { step: "03", title: "Build", desc: "Pixel-perfect development with full CMS integration." },
        { step: "04", title: "Launch", desc: "QA, performance audit, and go-live support." },
      ],
      metric: { value: "2.1s", label: "avg. page load time" },
      accentColor: "#0891B2",
      order: 4,
    },
    {
      _id: "service-affiliate",
      title: "Affiliate Marketing",
      slug: { _type: "slug", current: "affiliate-marketing" },
      icon: "Link2",
      tagline: "Pay for performance. Scale without risk.",
      description: "We build and manage affiliate programs that recruit high-quality publishers, drive incremental revenue, and only charge you when results are delivered.",
      benefits: ["Affiliate program setup & management", "Publisher recruitment & vetting", "Commission structure strategy", "Fraud detection & quality controls", "Monthly affiliate reporting & payouts"],
      process: [
        { step: "01", title: "Program Design", desc: "Define commission model, terms, and target publisher profile." },
        { step: "02", title: "Recruit", desc: "Outreach to premium publishers aligned with your brand." },
        { step: "03", title: "Activate", desc: "Onboard partners with creatives, links, and tracking." },
        { step: "04", title: "Optimise", desc: "Monthly pruning of underperformers and scaling of top partners." },
      ],
      metric: { value: "280%", label: "avg. affiliate revenue growth" },
      accentColor: "#EA580C",
      order: 5,
    },
  ];

  for (const s of servicesData) {
    await client.createOrReplace({ _type: "service", ...s });
  }
  console.log("✅ Services (6)");

  // ── Projects ───────────────────────────────────────────────
  const projectsData = [
    {
      _id: "project-meridian",
      title: "How Meridian grew MRR 340% in 8 months",
      slug: { _type: "slug", current: "meridian-fintech" },
      client: "Meridian", industry: "FinTech", tag: "FinTech", featured: true,
      summary: "A complete digital overhaul — Paid Search, SEO, and website redesign — turned Meridian's stagnant pipeline into a high-velocity growth engine.",
      problem: "Meridian had a strong product but near-zero organic visibility and paid campaigns burning budget with <1.5× ROAS.",
      solution: "We rebuilt their Google Ads account architecture, launched a technical SEO sprint, and redesigned their landing pages over 6 months.",
      services: ["Paid Search", "SEO", "Website Development"],
      results: [{ metric: "340%", label: "MRR Growth" }, { metric: "6.8×", label: "ROAS" }, { metric: "54%", label: "CVR Lift" }],
      accentColor: "#C8A45A",
    },
    {
      _id: "project-bloom",
      title: "Bloom's 290% organic revenue growth in one year",
      slug: { _type: "slug", current: "bloom-ecommerce" },
      client: "Bloom", industry: "E-commerce", tag: "E-commerce", featured: true,
      summary: "A content-led SEO strategy combined with Paid Social doubled Bloom's revenue within 12 months.",
      problem: "Bloom was entirely dependent on paid traffic. One iOS update nearly killed their business overnight.",
      solution: "We built a 200-article content moat, optimised 800+ product pages, and launched Paid Social campaigns.",
      services: ["SEO", "Paid Social"],
      results: [{ metric: "290%", label: "Organic Revenue" }, { metric: "3.1×", label: "Organic Traffic" }, { metric: "68K", label: "New Followers" }],
      accentColor: "#16A34A",
    },
    {
      _id: "project-nova",
      title: "Nova cuts CAC by 62% while scaling ad spend",
      slug: { _type: "slug", current: "nova-saas" },
      client: "Nova", industry: "SaaS", tag: "SaaS", featured: true,
      summary: "A full-funnel Paid Search restructure and website testing program made Nova's acquisition economics dramatically more efficient.",
      problem: "Nova was spending $80K/mo on ads with a $420 CAC — far above their LTV-to-CAC target.",
      solution: "We rebuilt their entire paid funnel: new campaign structure, ICP-targeted creatives, and 3 conversion sprint cycles on trial signup pages.",
      services: ["Paid Search", "Website Development"],
      results: [{ metric: "62%", label: "CAC Reduction" }, { metric: "4.4×", label: "Trial Signups" }, { metric: "89%", label: "Lead Quality Score" }],
      accentColor: "#9333EA",
    },
    {
      _id: "project-apex-health",
      title: "Apex Health generates 5× more qualified leads",
      slug: { _type: "slug", current: "apex-healthcare" },
      client: "Apex Health", industry: "Healthcare", tag: "Healthcare", featured: false,
      summary: "Local SEO and a targeted Paid Search strategy turned Apex Health into the dominant search presence across 6 metro markets.",
      problem: "Spread across 6 cities, Apex had no consistent local presence and was losing patients to better-ranked competitors.",
      solution: "We built a city-specific SEO strategy, optimised 6 Google Business Profiles, and ran hyper-local Paid Search campaigns.",
      services: ["SEO", "Paid Search"],
      results: [{ metric: "5×", label: "Lead Volume" }, { metric: "#1", label: "Local Pack Ranking" }, { metric: "78%", label: "Cost Per Lead Drop" }],
      accentColor: "#EA580C",
    },
  ];

  for (const p of projectsData) {
    await client.createOrReplace({ _type: "project", ...p });
  }
  console.log("✅ Projects (4)");

  // ── Testimonials ───────────────────────────────────────────
  const testimonialsData = [
    { _id: "testimonial-0", quote: "Roivex didn't just run our ads — they rebuilt our entire growth engine. 6.8× ROAS in month four was something we thought was impossible.", author: "Michael Chen", role: "CEO", company: "Meridian FinTech", initials: "MC", featured: true, accentColor: "#C8A45A", order: 0 },
    { _id: "testimonial-1", quote: "Our organic revenue grew 290% in 12 months. The SEO strategy they built is now our most valuable business asset.", author: "Jessica Hall", role: "CMO", company: "Bloom Commerce", initials: "JH", featured: false, accentColor: "#16A34A", order: 1 },
    { _id: "testimonial-2", quote: "They cut our CAC by 62% while we tripled our ad budget. I didn't think both were possible at the same time. They proved me wrong.", author: "Raj Patel", role: "VP Growth", company: "Nova SaaS", initials: "RP", featured: false, accentColor: "#9333EA", order: 2 },
    { _id: "testimonial-3", quote: "The affiliate program alone paid for the entire annual retainer in the first month. Everything after that is pure profit.", author: "Lisa Wang", role: "Director of Marketing", company: "Apex Health", initials: "LW", featured: false, accentColor: "#EA580C", order: 3 },
  ];

  for (const t of testimonialsData) {
    await client.createOrReplace({ _type: "testimonial", ...t });
  }
  console.log("✅ Testimonials (4)");

  // ── Team ───────────────────────────────────────────────────
  const teamData = [
    { _id: "team-0", name: "Alex Morgan",  role: "Founder & CEO",        bio: "15 years in growth marketing. Previously VP Marketing at two unicorn startups.", order: 0 },
    { _id: "team-1", name: "Sarah Kim",    role: "Head of SEO",           bio: "Former Google Search Quality Analyst. Obsessed with topical authority.", order: 1 },
    { _id: "team-2", name: "James Park",   role: "Head of Paid Media",    bio: "Managed $50M+ in ad spend across Google, Meta, and programmatic.", order: 2 },
    { _id: "team-3", name: "Maya Torres",  role: "Head of Paid Social",   bio: "Built paid social programs for brands doing $1M+ ROAS. Ex-Meta.", order: 3 },
    { _id: "team-4", name: "Priya Nair",   role: "Programmatic Director", bio: "Former The Trade Desk analyst. Expert in DMP strategy and attribution.", order: 4 },
    { _id: "team-5", name: "Tom Lee",      role: "Head of Analytics",     bio: "Former data scientist at Meta. Turns raw data into revenue insights.", order: 5 },
  ];

  for (const t of teamData) {
    await client.createOrReplace({ _type: "teamMember", ...t });
  }
  console.log("✅ Team (6)");

  // ── Partner Logos (text) ───────────────────────────────────
  const partners = ["Acme Inc.", "Meridian", "Nova SaaS", "Bloom Commerce", "Apex Health", "Orbit Media", "Vantage", "Crest Labs"];
  for (let i = 0; i < partners.length; i++) {
    await client.createOrReplace({ _id: `partner-${i}`, _type: "partnerLogo", name: partners[i], order: i });
  }
  console.log("✅ Partner logos (8)");

  // ── Blog Posts ─────────────────────────────────────────────
  const blogData = [
    {
      _id: "blog-seo-2025",
      title: "The 7 SEO Trends That Will Define 2025",
      slug: { _type: "slug", current: "seo-trends-2025" },
      excerpt: "AI Overviews, zero-click searches, and E-E-A-T evolution — here's what to prioritise in your SEO strategy this year.",
      category: "SEO", readTime: "8 min", featured: true,
      publishedAt: "2025-04-14T00:00:00Z",
      author: { name: "Sarah Kim", role: "Head of SEO" },
    },
    {
      _id: "blog-paid-social",
      title: "Why Your Meta Ads Creative Is Costing You 40% More",
      slug: { _type: "slug", current: "meta-ads-creative-strategy" },
      excerpt: "Static creative is dying. Here's the performance creative framework we use to scale Meta campaigns to 8-figure spend.",
      category: "Paid Social", readTime: "6 min", featured: true,
      publishedAt: "2025-04-07T00:00:00Z",
      author: { name: "James Park", role: "Head of Paid Media" },
    },
    {
      _id: "blog-programmatic",
      title: "Programmatic 101: How to Stop Wasting Budget on Junk Inventory",
      slug: { _type: "slug", current: "programmatic-media-buying-guide" },
      excerpt: "Most programmatic budgets bleed 30–50% on low-quality placements. Here's the framework we use to buy premium inventory at scale.",
      category: "Programmatic", readTime: "9 min", featured: false,
      publishedAt: "2025-03-28T00:00:00Z",
      author: { name: "Priya Nair", role: "Programmatic Director" },
    },
    {
      _id: "blog-affiliate",
      title: "The Affiliate Marketing Playbook for E-commerce Brands",
      slug: { _type: "slug", current: "affiliate-marketing-playbook" },
      excerpt: "How to recruit the right publishers, structure commissions for incrementality, and scale affiliate to 20%+ of total revenue.",
      category: "Affiliate Marketing", readTime: "7 min", featured: false,
      publishedAt: "2025-03-20T00:00:00Z",
      author: { name: "Maya Torres", role: "Head of Paid Social" },
    },
  ];

  for (const b of blogData) {
    await client.createOrReplace({ _type: "blogPost", ...b });
  }
  console.log("✅ Blog posts (4)");

  console.log("\n🎉 Sanity seeded successfully! Visit /studio to manage content.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
