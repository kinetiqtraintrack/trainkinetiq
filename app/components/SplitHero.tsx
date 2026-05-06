function LeftSilhouette() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Abstract lifting figure — broad shoulders, thick build */}
      <ellipse cx="200" cy="90" rx="55" ry="60" fill="#22c55e" />
      <rect x="130" y="145" width="140" height="180" rx="20" fill="#22c55e" />
      {/* Arms raised like a deadlift */}
      <rect x="55" y="120" width="80" height="28" rx="14" fill="#22c55e" transform="rotate(-20 55 120)" />
      <rect x="265" y="120" width="80" height="28" rx="14" fill="#22c55e" transform="rotate(20 265 120)" />
      {/* Legs */}
      <rect x="145" y="320" width="46" height="140" rx="20" fill="#22c55e" />
      <rect x="209" y="320" width="46" height="140" rx="20" fill="#22c55e" />
      {/* Barbell */}
      <rect x="20" y="108" width="360" height="14" rx="7" fill="#22c55e" />
      <rect x="12" y="92" width="36" height="46" rx="8" fill="#22c55e" opacity="0.6" />
      <rect x="352" y="92" width="36" height="46" rx="8" fill="#22c55e" opacity="0.6" />
    </svg>
  );
}

function RightSilhouette() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-15"
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Abstract relaxed figure — leaning, casual */}
      <ellipse cx="210" cy="85" rx="50" ry="55" fill="#111" />
      <rect x="150" y="138" width="120" height="160" rx="24" fill="#111" />
      {/* Arms relaxed at sides */}
      <rect x="98" y="145" width="58" height="22" rx="11" fill="#111" transform="rotate(30 98 145)" />
      <rect x="244" y="145" width="58" height="22" rx="11" fill="#111" transform="rotate(-15 244 145)" />
      {/* Legs in stride */}
      <rect x="158" y="296" width="44" height="150" rx="20" fill="#111" transform="rotate(-4 158 296)" />
      <rect x="210" y="296" width="44" height="150" rx="20" fill="#111" transform="rotate(6 210 296)" />
      {/* Hoodie pocket detail */}
      <rect x="170" y="220" width="80" height="40" rx="8" fill="#111" opacity="0.4" />
    </svg>
  );
}

export default function SplitHero() {
  return (
    <section className="flex flex-col md:flex-row w-full" style={{ minHeight: "500px" }}>
      {/* Left — Obsidian / Dark */}
      <div className="relative flex-1 bg-[#0a0a0a] flex flex-col justify-end p-10 md:p-14 overflow-hidden min-h-[340px] md:min-h-0 group">
        <LeftSilhouette />
        <div className="relative z-10">
          <span className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Lifting &amp; Pump
          </span>
          <h1 className="text-white font-black text-[clamp(3rem,8vw,6rem)] leading-none tracking-tighter uppercase mb-6">
            Obsidian
          </h1>
          <a
            href="/collections/obsidian"
            className="inline-flex items-center bg-white text-[#111] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#22c55e] transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Right — Rest Day / Light */}
      <div className="relative flex-1 bg-[#f0ede8] flex flex-col justify-end p-10 md:p-14 overflow-hidden min-h-[340px] md:min-h-0 group">
        <RightSilhouette />
        <div className="relative z-10">
          <span className="inline-block text-[#111] text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60">
            Day to Day
          </span>
          <h2 className="text-[#111] font-black text-[clamp(3rem,8vw,6rem)] leading-none tracking-tighter uppercase mb-6">
            Rest Day
          </h2>
          <a
            href="/collections/restday"
            className="inline-flex items-center bg-[#111] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
