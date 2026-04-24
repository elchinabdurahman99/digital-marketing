import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "tagline",  title: "Tagline",   type: "string" }),
    defineField({ name: "logo",     title: "Logo",      type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon",  title: "Favicon",   type: "image" }),
    defineField({
      name: "seo", title: "Global SEO", type: "object",
      fields: [
        defineField({ name: "metaTitle",       title: "Meta Title",       type: "string" }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3 }),
        defineField({ name: "ogImage",         title: "OG Image",         type: "image" }),
        defineField({ name: "twitterHandle",   title: "Twitter Handle",   type: "string" }),
      ],
    }),
    defineField({
      name: "contact", title: "Contact Info", type: "object",
      fields: [
        defineField({ name: "email",   title: "Email",   type: "string" }),
        defineField({ name: "phone",   title: "Phone",   type: "string" }),
        defineField({ name: "address", title: "Address", type: "string" }),
      ],
    }),
    defineField({
      name: "social", title: "Social Links", type: "object",
      fields: [
        defineField({ name: "linkedin",  title: "LinkedIn URL",  type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "twitter",   title: "Twitter URL",   type: "url" }),
      ],
    }),
    defineField({
      name: "announcementBar", title: "Announcement Bar", type: "object",
      fields: [
        defineField({ name: "enabled", title: "Show Bar", type: "boolean", initialValue: false }),
        defineField({ name: "text",    title: "Text",     type: "string" }),
        defineField({ name: "link",    title: "Link URL", type: "url" }),
      ],
    }),
  ],
});
