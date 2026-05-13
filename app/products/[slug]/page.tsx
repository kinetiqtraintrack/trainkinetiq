import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, getProductBySlug, getProductsByCollection } from "../../../lib/products";
import type { ProductType } from "../../../lib/products";
import { getCollection } from "../../../lib/collections";
import { getSanityProductBySlug, getSanityProducts, getSanityCollection, getSanityProductsByCollection } from "../../../lib/sanity/queries";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityProducts = await getSanityProducts();
  const source = sanityProducts.length > 0 ? sanityProducts : PRODUCTS;
  return source.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Kinetiq`,
    description: product.description,
  };
}

// Type-specific silhouette paths (same set used throughout the app)
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = (await getSanityProductBySlug(slug)) ?? getProductBySlug(slug);
  if (!product) notFound();

  const collection =
    (await getSanityCollection(product.collection)) ??
    getCollection(product.collection);
  if (!collection) notFound();

  // "More from this collection" grid — up to 4, excluding current
  const sanityCollectionProducts = await getSanityProductsByCollection(collection.slug);
  const allCollectionProducts =
    sanityCollectionProducts.length > 0
      ? sanityCollectionProducts
      : getProductsByCollection(collection.slug);
  const moreProducts = allCollectionProducts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <Nav />
      <main>
        <div className="max-w-screen-xl mx-auto px-6">
          <nav className="py-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-[#262626] transition-colors">Home</Link>
            {" / "}
            <Link href={`/collections/${collection.slug}`} className="hover:text-[#262626] transition-colors">
              {collection.name}
            </Link>
            {" / "}
            <span className="text-[#262626]">{product.name}</span>
          </nav>
        </div>
        <div className="max-w-screen-xl mx-auto px-6 pb-16">
          <ProductDetail product={product} collection={collection} />
        </div>

        {/* More from Collection */}
        {moreProducts.length > 0 && (
          <section style={{ background: "#f8f8f8", padding: "60px 24px 80px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
                More from
              </p>
              <h2
                className="font-black tracking-tighter text-[#262626] uppercase mb-8"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                {collection.name}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {moreProducts.map((p) => {
                  const productType = (p as { type?: ProductType }).type ?? "tee";
                  const silhouetteFill = p.collection === "restday" ? "#111" : collection.accent;
                  return (
                    <article key={p.slug} className="group">
                      <Link href={`/products/${p.slug}`} className="block">
                        <div
                          className="relative w-full overflow-hidden mb-3 rounded-[8px]"
                          style={{ backgroundColor: collection.bg, aspectRatio: "3/4" }}
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
                              <svg
                                viewBox="0 0 280 320"
                                preserveAspectRatio="xMidYMid meet"
                                className="w-full h-full"
                                style={{ opacity: 0.18 }}
                                aria-hidden="true"
                              >
                                <g fill={silhouetteFill}>{SILHOUETTE_PATHS[productType]}</g>
                              </svg>
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-bold tracking-tight text-[#262626] mb-1 group-hover:text-[#15803d] transition-colors leading-tight">
                          {p.name}
                        </h3>
                        <p className="text-sm font-black text-[#262626]">${p.price}</p>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
