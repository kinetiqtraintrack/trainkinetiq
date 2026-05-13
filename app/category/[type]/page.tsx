import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductsByType } from "../../../lib/products";
import { getCollection } from "../../../lib/collections";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

interface Props {
  params: Promise<{ type: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  tee: "T-Shirts",
  hoodie: "Hoodies",
  sweater: "Sweaters",
  "pump-cover": "Pump Covers",
  shorts: "Shorts",
  sweats: "Sweatpants",
  hat: "Hats & Caps",
  all: "All Products",
};

const VALID_TYPES = Object.keys(CATEGORY_LABELS);

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const label = CATEGORY_LABELS[type];
  if (!label) return {};
  return {
    title: `${label} — Kinetiq`,
    description: `Shop Kinetiq ${label}. Performance and lifestyle apparel across all collections.`,
  };
}


export default async function CategoryPage({ params }: Props) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type)) notFound();

  const label = CATEGORY_LABELS[type];
  const products = getProductsByType(type);

  return (
    <>
      <Nav />
      <main>
        <div className="max-w-screen-xl mx-auto px-6 pb-16">
          {/* Breadcrumb */}
          <nav className="py-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-[#262626] transition-colors">Home</Link>
            {" / "}
            <span className="text-[#262626]">{label}</span>
          </nav>

          {/* Category header */}
          <div
            className="w-full px-8 py-12 mb-10 relative overflow-hidden"
            style={{ backgroundColor: "#262626" }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-2 text-[#84cc16]">
              Shop by Category
            </span>
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter uppercase leading-none text-white">
              {label}
            </h1>
            <p className="mt-3 text-sm max-w-sm opacity-60 text-white">
              {products.length} product{products.length !== 1 ? "s" : ""} across all collections
            </p>
          </div>

          {/* Products grid */}
          {products.length === 0 ? (
            <p className="text-gray-400 text-sm">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((p) => {
                const col = getCollection(p.collection);
                return (
                  <ProductCard
                    key={p.slug}
                    slug={p.slug}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    collection={p.collection}
                    collectionName={col?.name}
                    tag={p.tag}
                    colors={p.colors}
                    sizes={p.sizes}
                    oos={p.oos}
                    images={p.images}
                    type={p.type}
                    bg={col?.bg}
                    accent={col?.accent}
                    accentEyebrow={col?.accentEyebrow}
                    showCollectionName
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
