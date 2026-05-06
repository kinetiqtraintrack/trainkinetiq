import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "next-sanity";

export const dynamic = "force-dynamic";

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

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const client = getWriteClient();
  if (client) {
    try {
      await client.create({
        _type: "contactSubmission",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
    } catch (err) {
      console.error("Contact save failed:", err);
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
