/**
 * Instagram token management.
 *
 * Storage: Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 * Falls back to INSTAGRAM_ACCESS_TOKEN env var if Redis is not configured.
 *
 * A Vercel Cron Job calls /api/instagram/refresh-token on the 1st of every
 * month. Instagram tokens last 60 days, so a monthly refresh keeps them alive
 * indefinitely without any manual intervention.
 */

const REDIS_KEY = "instagram_token";

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const { Redis } = require("@upstash/redis");
  return new Redis({ url, token }) as import("@upstash/redis").Redis;
}

/**
 * Returns the current valid token. Seeds Redis from the env var on first call.
 * Falls back to the env var directly if Redis is not configured.
 */
export async function getInstagramToken(): Promise<string | null> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const stored = await redis.get<string>(REDIS_KEY);
      if (stored) return stored;

      // Redis is empty — seed it from the env var
      const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
      if (envToken) {
        await redis.set(REDIS_KEY, envToken);
        return envToken;
      }
      return null;
    } catch {
      // Redis call failed — fall through to env var
    }
  }

  return process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
}

/**
 * Refreshes the Instagram token and stores the new one in Redis.
 * Returns the new token on success, null on failure.
 */
export async function refreshInstagramToken(): Promise<string | null> {
  const redis = getRedisClient();

  // Get current token from Redis or env var
  let currentToken: string | null = null;
  if (redis) {
    try {
      currentToken = await redis.get<string>(REDIS_KEY);
    } catch {
      // ignore
    }
  }
  currentToken = currentToken ?? process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
  if (!currentToken) return null;

  // Call Instagram refresh endpoint
  try {
    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );
    if (!res.ok) return null;

    const data = await res.json() as { access_token?: string };
    const newToken = data.access_token;
    if (!newToken) return null;

    // Persist the new token
    if (redis) {
      try {
        await redis.set(REDIS_KEY, newToken);
      } catch {
        // ignore write failure — token was refreshed, just not persisted
      }
    }

    return newToken;
  } catch {
    return null;
  }
}
