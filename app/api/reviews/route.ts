import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "next-sanity";
import { getSanityReviews } from "../../../lib/sanity/queries";
import { isSanityConfigured } from "../../../lib/sanity/client";

export const dynamic = "force-dynamic";

async function getSeedReviews() {
  try {
    const data = await import("../../../data/reviews.json");
    return data.default;
  } catch {
    return [];
  }
}

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) return null;
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
}

export async function GET() {
  if (isSanityConfigured) {
    const reviews = await getSanityReviews();
    if (reviews.length > 0) return NextResponse.json(reviews);
  }
  return NextResponse.json(await getSeedReviews());
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.rating !== "number" ||
    typeof body.text !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, rating, text } = body;

  if (!name.trim() || rating < 1 || rating > 5 || text.trim().length < 10) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const client = getWriteClient();
  if (client) {
    try {
      await client.create({
        _type: "review",
        name: name.trim(),
        rating,
        text: text.trim(),
        approved: true,
      });
    } catch (err) {
      console.error("Sanity review write failed:", err);
      return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
