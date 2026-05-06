import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook hits this endpoint when content is published.
// Set up in Sanity dashboard → API → Webhooks → URL: https://trainkinetiq.com/api/sanity/revalidate
// Add header: Authorization: Bearer <SANITY_WEBHOOK_SECRET>

export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const type = body?._type as string | undefined;

  if (type === "product") {
    revalidateTag("products", { expire: 0 });
    revalidatePath("/products/[slug]");
    revalidatePath("/");
  } else if (type === "collection") {
    revalidateTag("collections", { expire: 0 });
    revalidatePath("/collections/[collection]");
    revalidatePath("/");
  } else if (type === "review") {
    revalidateTag("reviews", { expire: 0 });
    revalidatePath("/");
  } else {
    revalidatePath("/");
  }

  return NextResponse.json({ revalidated: true, type: type ?? "unknown" });
}
