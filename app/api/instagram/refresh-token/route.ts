import { NextResponse } from "next/server";
import { refreshInstagramToken } from "../../../../lib/instagram-token";

// Called by Vercel Cron on the 1st of every month.
// Vercel automatically injects Authorization: Bearer <CRON_SECRET>
// with each cron invocation.
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newToken = await refreshInstagramToken();

  if (!newToken) {
    return NextResponse.json(
      { error: "Token refresh failed — check KV and Instagram app status" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    refreshed_at: new Date().toISOString(),
  });
}
