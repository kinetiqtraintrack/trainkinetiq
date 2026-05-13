import Link from "next/link";
import { PRODUCTS } from "../../lib/products";
import type { ProductType } from "../../lib/products";
import { getCollection } from "../../lib/collections";
import { getSanityProducts } from "../../lib/sanity/queries";
import ProductCard from "./ProductCard";

const FEATURED_SLUGS = [
  "obsidian-boxy-pump-hoodie",
  "velocity-performance-shorts",
  "restday-puff-hoodie",
];

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
          return (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              id={p.id ?? p.slug}
              name={p.name}
              price={p.price}
              collection={p.collection}
              collectionName={col?.name}
              tag={p.tag}
              colors={p.colors}
              sizes={p.sizes}
              oos={(p as { oos?: string[] }).oos}
              images={(p as { images?: string[] }).images}
              type={(p as { type?: ProductType }).type}
              bg={col?.bg}
              accent={col?.accent}
              accentEyebrow={col?.accentEyebrow}
            />
          );
        })}
      </div>
    </section>
  );
}
