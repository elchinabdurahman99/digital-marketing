import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/sanity/lib/queries";

const BASE_URL = "https://roivex.com";

const staticRoutes = [
  { url: "/",         priority: 1.0,  changeFrequency: "weekly"  },
  { url: "/services", priority: 0.9,  changeFrequency: "monthly" },
  { url: "/projects", priority: 0.85, changeFrequency: "weekly"  },
  { url: "/about",    priority: 0.8,  changeFrequency: "monthly" },
  { url: "/blog",     priority: 0.8,  changeFrequency: "weekly"  },
  { url: "/contact",  priority: 0.75, changeFrequency: "yearly"  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));

  const posts = await getBlogPosts();
  posts.forEach((p: { slug: string; publishedAt: string }) => {
    routes.push({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ?? now,
      changeFrequency: "monthly" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.7,
    });
  });

  return routes;
}
