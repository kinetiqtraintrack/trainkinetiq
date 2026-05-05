/**
 * Instagram token management.
 *
 * Storage priority: Vercel KV → INSTAGRAM_ACCESS_TOKEN env var
 *
 * A Vercel Cron Job calls /api/instagram/refresh-token on the 1st of every
 * month. Instagram tokens last 60 days, so a monthly refresh keeps them alive
 * indefinitely without any manual intervention.
 */

const KV_KEY = "instagram";

interface StoredTokenData extends Record<string, unknown> {
  token: string;
  refreshed_at: number;
}

/**
 * Returns the current valid token. Seeds KV from the env var on first call.
 * Falls back to the env var if KV is not configured.
 */
export async function getInstagramToken(): Promise<string | null> {
  // Try KV (only available when @vercel/kv env vars are set)
  try {
    const { kv } = await import("@vercel/kv");
    const stored = await kv.hgetall<StoredTokenData>(KV_KEY);

    if (stored?.token) {
      return stored.token;
    }

    // KV is empty — seed it from the env var
    const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (envToken) {
      await kv.hset(KV_KEY, {
        token: envToken,
        refreshed_at: Date.now(),
      } satisfies StoredTokenData);
      return envToken;
    }

    return null;
  } catch {
    // KV env vars not set — fall back to env var directly
    return process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
  }
}

/**
 * Calls the Instagram refresh endpoint and updates KV with the new token.
 * Returns the new token on success, null on failure.
 */
export async function refreshInstagramToken(): Promise<string | null> {
  try {
    const { kv } = await import("@vercel/kv");
    const stored = await kv.hgetall<StoredTokenData>(KV_KEY);
    const currentToken = stored?.token ?? process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!currentToken) return null;

    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );
    if (!res.ok) return null;

    const data = await res.json() as { access_token?: string };
    const newToken = data.access_token;
    if (!newToken) return null;

    await kv.hset(KV_KEY, {
      token: newToken,
      refreshed_at: Date.now(),
    } satisfies StoredTokenData);

    return newToken;
  } catch {
    return null;
  }
}
