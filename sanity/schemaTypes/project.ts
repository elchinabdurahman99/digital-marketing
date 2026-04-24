import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Case Studies",
  type: "document",
  icon: () => "📊",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug",     title: "Slug",     type: "slug",   options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client",   title: "Client Name",   type: "string" }),
    defineField({ name: "industry", title: "Industry",      type: "string" }),
    defineField({ name: "tag",      title: "Tag (FinTech, SaaS…)", type: "string" }),
    defineField({ name: "summary",  title: "Summary",       type: "text", rows: 3 }),
    defineField({ name: "problem",  title: "The Problem",   type: "text", rows: 3 }),
    defineField({ name: "solution", title: "Our Solution",  type: "text", rows: 3 }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false }),
    defineField({
      name: "services", title: "Services Used",
      type: "array", of: [{ type: "string" }],
    }),
    defineField({
      name: "results", title: "Key Results",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "metric", title: "Metric (e.g. 340%)", type: "string" }),
          defineField({ name: "label",  title: "Label",               type: "string" }),
        ],
        preview: { select: { title: "metric", subtitle: "label" } },
      }],
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "accentColor", title: "Accent Color (hex)", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
