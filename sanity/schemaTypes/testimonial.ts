import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: () => "⭐",
  fields: [
    defineField({ name: "quote",    title: "Quote",         type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "author",   title: "Author Name",   type: "string", validation: (r) => r.required() }),
    defineField({ name: "role",     title: "Role/Title",    type: "string" }),
    defineField({ name: "company",  title: "Company",       type: "string" }),
    defineField({ name: "initials", title: "Initials (2 chars)", type: "string" }),
    defineField({ name: "photo",    title: "Photo",         type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured (large quote)", type: "boolean", initialValue: false }),
    defineField({ name: "order",    title: "Display Order", type: "number", initialValue: 0 }),
    defineField({ name: "accentColor", title: "Accent Color (hex)", type: "string" }),
  ],
  preview: {
    select: { title: "author", subtitle: "company" },
  },
});
