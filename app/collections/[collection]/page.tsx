import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS, getCollection } from "../../../lib/collections";
import { getProductsByCollection } from "../../../lib/products";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

interface Props {
  params: Promise<{ collection: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.slug }));
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
  const col = getCollection(slug);
  if (!col) notFound();

  const products = getProductsByCollection(col.slug);

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
        className="w-full px-8 py-12 mb-10 relative overflow-hidden"
        style={{ backgroundColor: col.bg }}
      >
        <span className={`text-[10px] font-black uppercase tracking-[0.25em] block mb-2 ${col.accentClass}`}>
          {col.tag}
        </span>
        <h1 className={`text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter uppercase leading-none ${col.textColor}`}>
          {col.name}
        </h1>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <p className="text-gray-400 text-sm">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((p) => (
            <article key={p.slug} className="group">
              <Link href={`/products/${p.slug}`} className="block">
                {/* Product image placeholder */}
                <div
                  className="relative w-full overflow-hidden mb-3"
                  style={{ backgroundColor: col.bg, aspectRatio: "3/4" }}
                >
                  {/* Minimal shape hint */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-[0.1]"
                    viewBox="0 0 300 400"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <ellipse cx="150" cy="80" rx="55" ry="60" fill={col.accent} />
                    <rect x="85" y="134" width="130" height="160" rx="22" fill={col.accent} />
                    <rect x="30" y="148" width="62" height="22" rx="11" fill={col.accent} transform="rotate(-14 30 148)" />
                    <rect x="208" y="146" width="62" height="22" rx="11" fill={col.accent} transform="rotate(16 208 146)" />
                    <rect x="103" y="288" width="44" height="104" rx="18" fill={col.accent} />
                    <rect x="153" y="288" width="44" height="104" rx="18" fill={col.accent} />
                  </svg>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-[#111] mb-1 group-hover:text-[#22c55e] transition-colors leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-sm font-black text-[#111] mb-2">${p.price}</p>
                  <div className="flex gap-1.5 items-center">
                    {p.colors.map((c) => (
                      <span
                        key={c.hex}
                        aria-label={c.name}
                        className="w-3.5 h-3.5 rounded-full border border-gray-200"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-1">
                      {p.colors.length} color{p.colors.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
      </main>
      <Footer />
    </>
  );
}
