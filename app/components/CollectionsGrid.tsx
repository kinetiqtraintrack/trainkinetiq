import Link from "next/link";
import { COLLECTIONS } from "../../lib/collections";

const SHAPES: Record<string, React.ReactNode> = {
  obsidian: (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 300 420" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="150" cy="70" rx="50" ry="55" fill="#22c55e" />
      <rect x="95" y="120" width="110" height="150" rx="18" fill="#22c55e" />
      <rect x="55" y="135" width="45" height="18" rx="9" fill="#22c55e" transform="rotate(-25 55 135)" />
      <rect x="200" y="135" width="45" height="18" rx="9" fill="#22c55e" transform="rotate(25 200 135)" />
      <rect x="108" y="265" width="38" height="120" rx="16" fill="#22c55e" />
      <rect x="154" y="265" width="38" height="120" rx="16" fill="#22c55e" />
      <rect x="20" y="108" width="260" height="12" rx="6" fill="#22c55e" />
    </svg>
  ),
  velocity: (
    <svg className="absolute inset-0 w-full h-full opacity-[0.1]" viewBox="0 0 300 420" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="160" cy="65" rx="46" ry="50" fill="#00E5FF" />
      <rect x="108" y="112" width="100" height="145" rx="20" fill="#00E5FF" />
      <rect x="55" y="125" width="58" height="18" rx="9" fill="#00E5FF" transform="rotate(20 55 125)" />
      <rect x="188" y="115" width="58" height="18" rx="9" fill="#00E5FF" transform="rotate(-30 188 115)" />
      <rect x="112" y="252" width="36" height="130" rx="16" fill="#00E5FF" transform="rotate(-8 112 252)" />
      <rect x="158" y="252" width="36" height="130" rx="16" fill="#00E5FF" transform="rotate(12 158 252)" />
      <rect x="10" y="200" width="80" height="6" rx="3" fill="#00E5FF" opacity="0.5" />
      <rect x="10" y="215" width="55" height="4" rx="2" fill="#00E5FF" opacity="0.3" />
    </svg>
  ),
  forge: (
    <svg className="absolute inset-0 w-full h-full opacity-[0.09]" viewBox="0 0 300 420" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="150" cy="68" rx="52" ry="56" fill="#f59e0b" />
      <rect x="90" y="120" width="120" height="155" rx="18" fill="#f59e0b" />
      <rect x="42" y="130" width="54" height="22" rx="11" fill="#f59e0b" transform="rotate(10 42 130)" />
      <rect x="204" y="130" width="54" height="22" rx="11" fill="#f59e0b" transform="rotate(-10 204 130)" />
      <rect x="105" y="270" width="40" height="125" rx="16" fill="#f59e0b" />
      <rect x="155" y="270" width="40" height="125" rx="16" fill="#f59e0b" />
    </svg>
  ),
  restday: (
    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 300 420" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="155" cy="70" rx="48" ry="52" fill="#111" />
      <rect x="100" y="118" width="110" height="150" rx="22" fill="#111" />
      <rect x="58" y="130" width="48" height="20" rx="10" fill="#111" transform="rotate(15 58 130)" />
      <rect x="194" y="128" width="48" height="20" rx="10" fill="#111" transform="rotate(-10 194 128)" />
      <rect x="112" y="264" width="40" height="128" rx="18" fill="#111" transform="rotate(3 112 264)" />
      <rect x="158" y="264" width="40" height="128" rx="18" fill="#111" transform="rotate(-5 158 264)" />
      <rect x="120" y="200" width="70" height="36" rx="8" fill="#111" opacity="0.35" />
    </svg>
  ),
};

export default function CollectionsGrid() {
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
        {COLLECTIONS.map((c) => (
          <div
            key={c.slug}
            className="relative flex flex-col justify-end p-8 md:p-10 overflow-hidden"
            style={{ backgroundColor: c.bg, minHeight: "clamp(260px, 40vw, 480px)" }}
          >
            {SHAPES[c.slug]}
            <div className="relative z-10">
              <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mb-2 ${c.accentClass}`}>
                {c.tag}
              </span>
              <h3 className={`font-black text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tighter uppercase mb-5 ${c.textColor}`}>
                {c.name}
              </h3>
              <Link
                href={`/collections/${c.slug}`}
                className={`inline-flex items-center px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${c.btnClass}`}
              >
                Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
