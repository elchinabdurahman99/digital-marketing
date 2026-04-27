import { client } from "./client";

// ─── Site Settings ────────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, tagline, logo, favicon,
  seo { metaTitle, metaDescription, ogImage, twitterHandle },
  contact { email, phone, address },
  social { linkedin, instagram, twitter },
  announcementBar { enabled, text, link }
}`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HERO_QUERY = `*[_type == "hero"][0]{
  eyebrowText, headlineLine1, headlineLine2, headlineLine3,
  rotatingWords, subtext,
  primaryCtaText, primaryCtaLink,
  secondaryCtaText, secondaryCtaLink,
  proofCard, trustRating, trustReviews
}`;

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, title, "slug": slug.current, icon, tagline, description,
  benefits, process, metric, accentColor, order
}`;

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, client, industry, tag,
  summary, problem, solution, featured, services, results,
  coverImage, accentColor, publishedAt
}`;

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
  _id, title, "slug": slug.current, client, industry, tag,
  summary, services, results, coverImage, accentColor
}`;

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, category,
  featured, readTime, publishedAt,
  author { name, role, photo },
  coverImage
}`;

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, category,
  featured, readTime, publishedAt,
  author { name, role, photo },
  coverImage, body,
  seo { metaTitle, metaDescription, ogImage }
}`;

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id, quote, author, role, company, initials, photo, featured, accentColor
}`;

// ─── Team ─────────────────────────────────────────────────────────────────────
export const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id, name, role, bio, photo, social
}`;

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS_QUERY = `*[_type == "stat"] | order(order asc) {
  _id, value, label, description
}`;

// ─── Partner Logos ────────────────────────────────────────────────────────────
export const PARTNER_LOGOS_QUERY = `*[_type == "partnerLogo"] | order(order asc) {
  _id, name, logo, url
}`;

// ─── Helper functions ─────────────────────────────────────────────────────────
const REVALIDATE = { next: { revalidate: 0 } };

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY, {}, REVALIDATE);
}
export async function getHero() {
  return client.fetch(HERO_QUERY, {}, REVALIDATE);
}
export async function getServices() {
  return client.fetch(SERVICES_QUERY, {}, REVALIDATE);
}
export async function getProjects() {
  return client.fetch(PROJECTS_QUERY, {}, REVALIDATE);
}
export async function getFeaturedProjects() {
  return client.fetch(FEATURED_PROJECTS_QUERY, {}, REVALIDATE);
}
export async function getBlogPosts() {
  return client.fetch(BLOG_POSTS_QUERY, {}, REVALIDATE);
}
export async function getBlogPost(slug: string) {
  return client.fetch(BLOG_POST_QUERY, { slug }, REVALIDATE);
}
export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY, {}, REVALIDATE);
}
export async function getTeam() {
  return client.fetch(TEAM_QUERY, {}, REVALIDATE);
}
export async function getStats() {
  return client.fetch(STATS_QUERY, {}, REVALIDATE);
}
export async function getPartnerLogos() {
  return client.fetch(PARTNER_LOGOS_QUERY, {}, REVALIDATE);
}
