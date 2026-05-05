import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "../../../lib/products";
import { getCollection } from "../../../lib/collections";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  if (!collection) notFound();

  return (
    <>
      <Nav />
      <main>
        <div className="max-w-screen-xl mx-auto px-6">
          <nav className="py-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-[#111] transition-colors">Home</Link>
            {" / "}
            <Link href={`/collections/${collection.slug}`} className="hover:text-[#111] transition-colors">
              {collection.name}
            </Link>
            {" / "}
            <span className="text-[#111]">{product.name}</span>
          </nav>
        </div>
        <div className="max-w-screen-xl mx-auto px-6 pb-16">
          <ProductDetail product={product} collection={collection} />
        </div>
      </main>
      <Footer />
    </>
  );
}
