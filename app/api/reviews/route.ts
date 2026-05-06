import { NextResponse, type NextRequest } from "next/server";
import { getSanityReviews } from "../../../lib/sanity/queries";
import { isSanityConfigured, sanityWriteClient } from "../../../lib/sanity/client";

async function getSeedReviews() {
  try {
    const data = await import("../../../data/reviews.json");
    return data.default;
  } catch {
    return [];
  }
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

  if (sanityWriteClient) {
    await sanityWriteClient.create({
      _type: "review",
      name: name.trim(),
      rating,
      text: text.trim(),
      approved: true,
    });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
