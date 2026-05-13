import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS, getCollection } from "../../../lib/collections";
import { getProductsByCollection } from "../../../lib/products";
import type { ProductType } from "../../../lib/products";
import { getSanityCollections, getSanityCollection, getSanityProductsByCollection } from "../../../lib/sanity/queries";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

interface Props {
  params: Promise<{ collection: string }>;
}

export async function generateStaticParams() {
  const sanityCollections = await getSanityCollections();
  const source = sanityCollections.length > 0 ? sanityCollections : COLLECTIONS;
  return source.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: slug } = await params;
  const col = getCollection(slug);
  if (!col) return {};
  return {
    title: `${col.name} Collection — Kinetiq`,
    description: `Shop the ${col.name} collection. ${col.tag}.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection: slug } = await params;
  const staticCol = getCollection(slug);
  const sanityCol = await getSanityCollection(slug);
  const col = sanityCol
    ? { ...staticCol, ...sanityCol, description: sanityCol.description || staticCol?.description || "" }
    : staticCol;
  if (!col) notFound();

  const sanityProducts = await getSanityProductsByCollection(col.slug);
  const products = sanityProducts.length > 0 ? sanityProducts : getProductsByCollection(col.slug);

  return (
    <>
      <Nav />
      <main>
    <div className="max-w-screen-xl mx-auto px-6 pb-16">
      {/* Breadcrumb */}
      <nav className="py-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-[#111] transition-colors">Home</Link>
        {" / "}
        <span className="text-[#111]">{col.name}</span>
      </nav>

      {/* Collection header */}
      <div
        className="w-full px-8 py-16 mb-10 relative overflow-hidden"
        style={{ backgroundColor: col.bg, minHeight: "260px" }}
      >
        {col.heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={col.heroImage}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)" }} />
          </>
        )}
        <div className="relative z-10">
          <span className={`text-[10px] font-black uppercase tracking-[0.25em] block mb-2 ${col.heroImage ? "text-white opacity-70" : col.accentClass}`}>
            {col.tag}
          </span>
          <h1 className={`text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter uppercase leading-none ${col.heroImage ? "text-white" : col.textColor}`}>
            {col.name}
          </h1>
          {col.description && (
            <p className={`mt-3 text-sm max-w-sm opacity-60 ${col.heroImage ? "text-white" : col.textColor}`}>
              {col.description}
            </p>
          )}
        </div>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <p className="text-gray-400 text-sm">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              id={(p as { id?: string }).id ?? p.slug}
              name={p.name}
              price={p.price}
              collection={p.collection}
              collectionName={col.name}
              tag={p.tag}
              colors={p.colors}
              sizes={p.sizes}
              oos={(p as { oos?: string[] }).oos}
              images={p.images}
              type={(p as { type?: ProductType }).type}
              bg={col.bg}
              accent={col.accent}
              accentEyebrow={col.accentEyebrow}
            />
          ))}
        </div>
      )}
    </div>
      </main>
      <Footer />
    </>
  );
}
