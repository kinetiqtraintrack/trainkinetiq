import { NextResponse } from "next/server";
import { getInstagramToken } from "../../../../lib/instagram-token";

export async function GET() {
  const token = await getInstagramToken();

  if (!token) {
    return NextResponse.json({ error: "No token found", env_set: !!process.env.INSTAGRAM_ACCESS_TOKEN });
  }

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}&limit=9`
  );
  const data = await res.json();

  return NextResponse.json({
    status: res.status,
    token_prefix: token.slice(0, 10) + "...",
    upstash_configured: !!process.env.UPSTASH_REDIS_REST_URL,
    response: data,
  });
}
