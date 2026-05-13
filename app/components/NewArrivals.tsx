import Link from "next/link";
import { PRODUCTS } from "../../lib/products";
import type { ProductType } from "../../lib/products";
import { getCollection } from "../../lib/collections";
import { getSanityProducts } from "../../lib/sanity/queries";

const FEATURED_SLUGS = [
  "obsidian-boxy-pump-hoodie",
  "velocity-performance-shorts",
  "restday-puff-hoodie",
];

// Type-specific silhouette paths per design handoff
const SILHOUETTE_PATHS: Record<ProductType, React.ReactNode> = {
  tee: (
    <>
      <ellipse cx="140" cy="55" rx="22" ry="9" />
      <path d="M82 80 L40 130 L70 158 L82 138 L82 270 L198 270 L198 138 L210 158 L240 130 L198 80 L170 70 Q140 90 110 70 z" />
    </>
  ),
  hoodie: (
    <>
      <path d="M92 58 Q140 32 188 58 L196 92 L84 92 z" />
      <path d="M82 90 L36 165 L66 198 L82 162 L82 280 L198 280 L198 162 L214 198 L244 165 L198 90 z" />
      <rect x="110" y="180" width="60" height="42" rx="4" fillOpacity="0.45" />
      <path d="M132 90 L132 110 L148 110 L148 90 z" fillOpacity="0.45" />
    </>
  ),
  "pump-cover": (
    <>
      <ellipse cx="140" cy="55" rx="22" ry="9" />
      <path d="M82 80 L82 270 L198 270 L198 80 L178 80 L170 100 Q166 130 158 130 L122 130 Q114 130 110 100 L102 80 z" />
    </>
  ),
  sweater: (
    <>
      <ellipse cx="140" cy="54" rx="18" ry="8" />
      <rect x="122" y="54" width="36" height="14" fillOpacity="0.45" />
      <path d="M82 78 L30 90 L40 240 L72 245 L82 240 L82 280 L198 280 L198 240 L208 245 L240 240 L250 90 L198 78 z" />
    </>
  ),
  shorts: (
    <>
      <rect x="80" y="130" width="120" height="14" />
      <path d="M80 144 L70 240 L122 240 L132 168 L148 168 L158 240 L210 240 L200 144 z" />
    </>
  ),
  sweats: (
    <>
      <rect x="82" y="80" width="116" height="14" />
      <path d="M82 94 L72 290 L124 290 L134 140 L146 140 L156 290 L208 290 L198 94 z" />
    </>
  ),
  "hat-beanie": (
    <>
      <path d="M82 130 Q82 60 140 60 Q198 60 198 130 L198 150 L82 150 z" />
      <rect x="82" y="150" width="116" height="24" fillOpacity="0.55" />
      <circle cx="140" cy="54" r="8" fillOpacity="0.7" />
    </>
  ),
  "hat-cap": (
    <>
      <path d="M86 110 Q86 78 140 78 Q194 78 194 110 L194 142 L86 142 z" />
      <ellipse cx="140" cy="152" rx="82" ry="14" fillOpacity="0.55" />
    </>
  ),
};

function ProductSilhouette({ type, fill }: { type: ProductType; fill: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      <g fill={fill}>{SILHOUETTE_PATHS[type]}</g>
    </svg>
  );
}

export default async function NewArrivals() {
  const sanityProducts = await getSanityProducts();
  const allProducts = sanityProducts.length > 0 ? sanityProducts : PRODUCTS;

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
          <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#262626] leading-tight uppercase">
            New Arrivals
          </p>
        </div>
        <Link
          href="/collections/obsidian"
          className="text-[11px] font-black uppercase tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {displayProducts.map((p) => {
          const col = getCollection(p.collection);
          const bg = col?.bg ?? "#111";
          const accent = col?.accentEyebrow ?? col?.accent ?? "#15803d";
          const isLight = col?.bg === "#f0ede8";
          const productType = (p as { type?: ProductType }).type ?? "tee";
          const silhouetteFill = p.collection === "restday" ? "#111" : (col?.accent ?? "#15803d");

          return (
            <article key={p.slug} className="group cursor-pointer">
              <Link href={`/products/${p.slug}`} className="block">
                {/* Product visual */}
                <div
                  className="relative w-full overflow-hidden mb-4 rounded-[8px]"
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
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <ProductSilhouette type={productType} fill={silhouetteFill} />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-[4px]"
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
                  <h3 className="text-sm font-bold tracking-tight text-[#262626] mb-1 group-hover:text-[#15803d] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#262626] mb-2">${p.price}</p>
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
