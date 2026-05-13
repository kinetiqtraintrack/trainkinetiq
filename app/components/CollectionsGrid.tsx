import { COLLECTIONS } from "../../lib/collections";
import { getSanityCollections } from "../../lib/sanity/queries";
import CollectionTile from "./CollectionTile";

export default async function CollectionsGrid() {
  const sanityCollections = await getSanityCollections();

  const collections = COLLECTIONS.map((staticCol) => {
    const sanityCol = sanityCollections.find((s) => s.slug === staticCol.slug);
    return sanityCol ? { ...staticCol, ...sanityCol } : staticCol;
  });

  return (
    <section id="collections" className="w-full">
      <div className="px-6 pt-14 pb-4">
        <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
          Collections
        </h2>
        <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#111] leading-tight uppercase">
          Find Your Range
        </p>
      </div>
      <div className="grid grid-cols-2 gap-0">
        {collections.map((c) => (
          <CollectionTile key={c.slug} c={c} />
        ))}
      </div>
    </section>
  );
}
