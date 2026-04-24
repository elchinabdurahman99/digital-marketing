import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: () => "⚡",
  fields: [
    defineField({ name: "title",       title: "Title",        type: "string",   validation: (r) => r.required() }),
    defineField({ name: "slug",        title: "Slug",         type: "slug",     options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "icon",        title: "Icon Name",    type: "string",   description: "Lucide icon name: Search, Target, Share2, TrendingUp, Code2, etc." }),
    defineField({ name: "tagline",     title: "Tagline",      type: "string" }),
    defineField({ name: "description", title: "Description",  type: "text", rows: 3 }),
    defineField({ name: "order",       title: "Display Order",type: "number", initialValue: 0 }),
    defineField({
      name: "benefits", title: "What's Included",
      type: "array", of: [{ type: "string" }],
    }),
    defineField({
      name: "process", title: "How We Do It",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "step",  title: "Step Number", type: "string" }),
          defineField({ name: "title", title: "Step Title",  type: "string" }),
          defineField({ name: "desc",  title: "Description", type: "string" }),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }],
    }),
    defineField({
      name: "metric", title: "Key Metric", type: "object",
      fields: [
        defineField({ name: "value", title: "Value (e.g. 3.4×)", type: "string" }),
        defineField({ name: "label", title: "Label",              type: "string" }),
      ],
    }),
    defineField({ name: "accentColor", title: "Accent Color (hex)", type: "string", description: "e.g. #C8A45A" }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
