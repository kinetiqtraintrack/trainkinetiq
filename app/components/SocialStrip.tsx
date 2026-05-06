function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

const GRADIENT_FALLBACK = [
  "from-[#0a0a0a] to-[#22c55e]",
  "from-[#0d1b2a] to-[#00E5FF]",
  "from-[#1a0f00] to-[#f59e0b]",
  "from-[#f0ede8] to-[#d6c9b8]",
  "from-[#0a0a0a] to-[#A78BFA]",
  "from-[#0d1b2a] to-[#22c55e]",
];

interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const { getInstagramToken } = await import("../../lib/instagram-token");
  const token = await getInstagramToken();
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}&limit=9`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []) as InstagramPost[];
  } catch {
    return [];
  }
}

export default async function SocialStrip() {
  const posts = await fetchInstagramPosts();
  const hasPosts = posts.length > 0;

  return (
    <section className="bg-white px-6 py-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
            @kinetiq_app
          </p>
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#111] uppercase mb-5">
            Follow the Journey
          </h2>
          {/* Social icons */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://instagram.com/kinetiq_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="flex items-center gap-2 text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] px-2"
            >
              <InstagramIcon />
              <span className="text-xs font-bold uppercase tracking-widest">
                Instagram
              </span>
            </a>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <a
              href="https://www.tiktok.com/@kinetiq_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on TikTok"
              className="flex items-center gap-2 text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] px-2"
            >
              <TikTokIcon />
              <span className="text-xs font-bold uppercase tracking-widest">
                TikTok
              </span>
            </a>
          </div>
        </div>

        {/* Post grid */}
        {hasPosts ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {posts.slice(0, 9).map((post) => {
              const imgSrc =
                post.media_type === "VIDEO"
                  ? post.thumbnail_url
                  : post.media_url;

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={post.caption ? post.caption.slice(0, 60) : "View on Instagram"}
                  className="block relative aspect-square overflow-hidden group bg-[#f8f8f8]"
                >
                  {imgSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imgSrc}
                      alt={post.caption ? post.caption.slice(0, 100) : "Instagram post"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  {post.media_type === "VIDEO" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/40 rounded-full w-10 h-10 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </a>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {GRADIENT_FALLBACK.map((gradient, i) => (
              <a
                key={i}
                href="https://instagram.com/kinetiq_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View post ${i + 1} on Instagram`}
                className={`block aspect-square bg-gradient-to-br ${gradient} hover:opacity-90 transition-opacity`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
