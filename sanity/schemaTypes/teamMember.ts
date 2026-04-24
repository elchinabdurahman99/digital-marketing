import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  icon: () => "👤",
  fields: [
    defineField({ name: "name",    title: "Full Name",     type: "string", validation: (r) => r.required() }),
    defineField({ name: "role",    title: "Role/Title",    type: "string" }),
    defineField({ name: "bio",     title: "Short Bio",     type: "text", rows: 2 }),
    defineField({ name: "photo",   title: "Photo",         type: "image", options: { hotspot: true } }),
    defineField({ name: "order",   title: "Display Order", type: "number", initialValue: 0 }),
    defineField({
      name: "social", title: "Social Links", type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter",  title: "Twitter URL",  type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
