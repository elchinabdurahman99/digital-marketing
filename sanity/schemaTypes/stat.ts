import { defineType, defineField } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stats",
  type: "document",
  icon: () => "📈",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 300+)",   type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label",               type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display Order",       type: "number", initialValue: 0 }),
    defineField({ name: "description", title: "Description (optional)", type: "string" }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
