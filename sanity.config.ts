import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool }    from "@sanity/vision";
import { schemaTypes }   from "./sanity/schemaTypes";

export default defineConfig({
  name:    "roivex-studio",
  title:   "Roivex CMS",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Roivex CMS")
          .items([
            S.listItem().title("⚙️ Site Settings").id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("🏠 Homepage Hero").id("hero")
              .child(S.document().schemaType("hero").documentId("hero")),
            S.divider(),
            S.documentTypeListItem("service").title("⚡ Services"),
            S.documentTypeListItem("project").title("📊 Case Studies"),
            S.documentTypeListItem("blogPost").title("✍️ Blog Posts"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("⭐ Testimonials"),
            S.documentTypeListItem("teamMember").title("👤 Team Members"),
            S.documentTypeListItem("stat").title("📈 Stats"),
            S.documentTypeListItem("partnerLogo").title("🏢 Partner Logos"),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
