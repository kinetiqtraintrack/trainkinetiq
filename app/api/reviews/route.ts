import { NextResponse } from "next/server";
import reviews from "../../../data/reviews.json";

export async function GET() {
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  // NOTE: Vercel serverless has a read-only filesystem — writes to data/reviews.json
  // will not persist in production. This endpoint returns a success response for the
  // UI flow without persisting data.
  // TODO: Connect to a database (e.g. Supabase, PlanetScale) for real persistence.
  try {
    const body = await request.json();
    const { name, rating, text } = body;

    if (
      !name ||
      typeof name !== "string" ||
      name.trim().length === 0 ||
      !text ||
      typeof text !== "string" ||
      text.trim().length === 0 ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "Invalid review data" },
        { status: 400 }
      );
    }

    const review = {
      id: `r${Date.now()}`,
      name: name.trim().slice(0, 100),
      rating,
      text: text.trim().slice(0, 1000),
      date: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
