import Link from "next/link";
import { PRODUCTS } from "../../lib/products";
import { getCollection } from "../../lib/collections";
import { getSanityProducts } from "../../lib/sanity/queries";

// Feature one product from three different collections
const FEATURED_SLUGS = [
  "obsidian-oversized-tee",
  "velocity-race-shorts",
  "rest-day-lounge-hoodie",
];

const SHAPES: Record<string, React.ReactNode> = {
  "obsidian-oversized-tee": (
    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="140" cy="70" rx="50" ry="55" fill="#22c55e" />
      <rect x="80" y="118" width="120" height="140" rx="20" fill="#22c55e" />
      <rect x="30" y="128" width="56" height="20" rx="10" fill="#22c55e" transform="rotate(-15 30 128)" />
      <rect x="194" y="128" width="56" height="20" rx="10" fill="#22c55e" transform="rotate(15 194 128)" />
      <rect x="98" y="254" width="36" height="60" rx="14" fill="#22c55e" />
      <rect x="146" y="254" width="36" height="60" rx="14" fill="#22c55e" />
    </svg>
  ),
  "velocity-race-shorts": (
    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="145" cy="65" rx="44" ry="48" fill="#00E5FF" />
      <rect x="88" y="110" width="114" height="90" rx="18" fill="#00E5FF" />
      <rect x="40" y="122" width="54" height="18" rx="9" fill="#00E5FF" transform="rotate(22 40 122)" />
      <rect x="186" y="112" width="54" height="18" rx="9" fill="#00E5FF" transform="rotate(-28 186 112)" />
      <rect x="100" y="196" width="36" height="100" rx="14" fill="#00E5FF" transform="rotate(-10 100 196)" />
      <rect x="148" y="196" width="36" height="100" rx="14" fill="#00E5FF" transform="rotate(14 148 196)" />
    </svg>
  ),
  "rest-day-lounge-hoodie": (
    <svg className="absolute inset-0 w-full h-full opacity-[0.14]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="145" cy="68" rx="48" ry="52" fill="#111" />
      <rect x="84" y="116" width="112" height="145" rx="22" fill="#111" />
      <rect x="35" y="128" width="54" height="20" rx="10" fill="#111" transform="rotate(12 35 128)" />
      <rect x="192" y="126" width="54" height="20" rx="10" fill="#111" transform="rotate(-8 192 126)" />
      <rect x="100" y="258" width="38" height="55" rx="14" fill="#111" transform="rotate(4 100 258)" />
      <rect x="148" y="258" width="38" height="55" rx="14" fill="#111" transform="rotate(-6 148 258)" />
      <rect x="110" y="192" width="66" height="32" rx="8" fill="#111" opacity="0.35" />
    </svg>
  ),
};

export default async function NewArrivals() {
  const sanityProducts = await getSanityProducts();
  const allProducts = sanityProducts.length > 0 ? sanityProducts : PRODUCTS;

  // Pick featured slugs if they exist, otherwise take first 3
  const featured = FEATURED_SLUGS
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3) as NonNullable<typeof allProducts[0]>[];

  const displayProducts = featured.length > 0 ? featured : allProducts.slice(0, 3);

  return (
    <section className="px-6 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
            Just Dropped
          </h2>
          <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#111] leading-tight uppercase">
            New Arrivals
          </p>
        </div>
        <Link
          href="/collections/obsidian"
          className="text-[11px] font-black uppercase tracking-widest text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] flex items-center"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {displayProducts.map((p) => {
          const col = getCollection(p.collection);
          const bg = col?.bg ?? "#111";
          const accent = col?.accent ?? "#22c55e";
          const isLight = col?.bg === "#f0ede8";

          return (
            <article key={p.slug} className="group cursor-pointer">
              <Link href={`/products/${p.slug}`} className="block">
                {/* Product visual */}
                <div
                  className="relative w-full overflow-hidden mb-4"
                  style={{ backgroundColor: bg, aspectRatio: "3/4" }}
                >
                  {(p as { images?: string[] }).images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={(p as { images?: string[] }).images![0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    SHAPES[p.slug]
                  )}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1"
                      style={{
                        backgroundColor: accent,
                        color: isLight ? "#fff" : bg,
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-[#111] mb-1 group-hover:text-[#22c55e] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#111] mb-2">
                    ${p.price}
                  </p>
                  {/* Color swatches */}
                  <div className="flex gap-1.5">
                    {p.colors.map((c) => (
                      <span
                        key={c.hex}
                        aria-label={c.name}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
