import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, role, company, quote, rating } = body;

    if (!author || !quote) {
      return NextResponse.json({ error: "Name and review are required." }, { status: 400 });
    }

    const initials = author
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    await writeClient.create({
      _type: "testimonial",
      author,
      role:    role    || "",
      company: company || "",
      quote,
      initials,
      rating:  rating  || 5,
      featured: false,
      order: 999,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review submit error:", err);
    return NextResponse.json({ error: "Failed to save review." }, { status: 500 });
  }
}
