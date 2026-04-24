import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  icon: () => "✍️",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug",     title: "Slug",     type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt",  title: "Excerpt",  type: "text", rows: 2 }),
    defineField({ name: "category", title: "Category", type: "string",
      options: { list: ["SEO", "Paid Ads", "Paid Social", "Programmatic", "Social Media", "CRO", "Web Development", "Affiliate Marketing"] } }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "readTime", title: "Read Time (e.g. 8 min)", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "author", title: "Author", type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
        defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body", title: "Body Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object", name: "callout", title: "Callout Box",
          fields: [
            defineField({ name: "text", title: "Text", type: "text" }),
            defineField({ name: "type", title: "Type", type: "string",
              options: { list: ["tip", "warning", "info"] } }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo", title: "SEO", type: "object",
      fields: [
        defineField({ name: "metaTitle",       title: "Meta Title",       type: "string" }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
        defineField({ name: "ogImage",         title: "OG Image",         type: "image" }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest First", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
