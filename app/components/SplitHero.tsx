import { getSanityCollection } from "../../lib/sanity/queries";
import { getCollection } from "../../lib/collections";

export default async function SplitHero() {
  const [sanityObsidian, sanityRestday] = await Promise.all([
    getSanityCollection("obsidian"),
    getSanityCollection("restday"),
  ]);

  const obsidian = sanityObsidian ? { ...getCollection("obsidian"), ...sanityObsidian } : getCollection("obsidian");
  const restday = sanityRestday ? { ...getCollection("restday"), ...sanityRestday } : getCollection("restday");

  return (
    <section className="flex flex-col md:flex-row w-full" style={{ minHeight: "500px" }}>
      {/* Left — Obsidian */}
      <div
        className="relative flex-1 flex flex-col justify-end p-10 md:p-14 overflow-hidden min-h-[340px] md:min-h-0"
        style={{ backgroundColor: obsidian?.bg ?? "#0a0a0a" }}
      >
        {obsidian?.heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={obsidian.heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 60%, transparent 100%)" }} />
          </>
        )}
        <div className="relative z-10">
          <span className="inline-block text-[#84cc16] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {obsidian?.tag ?? "Lifting & Pump"}
          </span>
          <h1 className="text-white font-black text-[clamp(3rem,8vw,6rem)] leading-none tracking-tighter uppercase mb-6">
            Obsidian
          </h1>
          <a
            href="/collections/obsidian"
            className="inline-flex items-center bg-white text-[#262626] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#84cc16] hover:text-white transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Right — Rest Day */}
      <div
        className="relative flex-1 flex flex-col justify-end p-10 md:p-14 overflow-hidden min-h-[340px] md:min-h-0"
        style={{ backgroundColor: restday?.bg ?? "#f0ede8" }}
      >
        {restday?.heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restday.heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)" }} />
          </>
        )}
        <div className="relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: restday?.heroImage ? "rgba(255,255,255,0.7)" : "#111" }}>
            {restday?.tag ?? "Day to Day"}
          </span>
          <h2
            className="font-black text-[clamp(3rem,8vw,6rem)] leading-none tracking-tighter uppercase mb-6"
            style={{ color: restday?.heroImage ? "#fff" : "#111" }}
          >
            Rest Day
          </h2>
          <a
            href="/collections/restday"
            className="inline-flex items-center bg-white text-[#262626] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#262626] hover:text-white transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
