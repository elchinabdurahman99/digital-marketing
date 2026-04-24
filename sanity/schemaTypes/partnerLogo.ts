import { defineType, defineField } from "sanity";

export const partnerLogo = defineType({
  name: "partnerLogo",
  title: "Partner Logos (Marquee)",
  type: "document",
  icon: () => "🏢",
  fields: [
    defineField({ name: "name",  title: "Company Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo",  title: "Logo Image",   type: "image", options: { hotspot: true } }),
    defineField({ name: "url",   title: "Website URL",  type: "url" }),
    defineField({ name: "order", title: "Display Order",type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
