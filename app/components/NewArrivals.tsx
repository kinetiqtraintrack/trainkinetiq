const products = [
  {
    name: "Obsidian Oversized Tee",
    price: "$48",
    bg: "#0a0a0a",
    swatches: ["#111", "#2d2d2d", "#4a4a4a"],
    accent: "#22c55e",
    tag: "Obsidian",
    shape: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="140" cy="70" rx="50" ry="55" fill="#22c55e" />
        <rect x="80" y="118" width="120" height="140" rx="20" fill="#22c55e" />
        <rect x="30" y="128" width="56" height="20" rx="10" fill="#22c55e" transform="rotate(-15 30 128)" />
        <rect x="194" y="128" width="56" height="20" rx="10" fill="#22c55e" transform="rotate(15 194 128)" />
        <rect x="98" y="254" width="36" height="60" rx="14" fill="#22c55e" />
        <rect x="146" y="254" width="36" height="60" rx="14" fill="#22c55e" />
      </svg>
    ),
  },
  {
    name: "Velocity Race Shorts",
    price: "$62",
    bg: "#0d1b2a",
    swatches: ["#0d1b2a", "#00E5FF"],
    accent: "#00E5FF",
    tag: "Velocity",
    shape: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="145" cy="65" rx="44" ry="48" fill="#00E5FF" />
        <rect x="88" y="110" width="114" height="90" rx="18" fill="#00E5FF" />
        <rect x="40" y="122" width="54" height="18" rx="9" fill="#00E5FF" transform="rotate(22 40 122)" />
        <rect x="186" y="112" width="54" height="18" rx="9" fill="#00E5FF" transform="rotate(-28 186 112)" />
        <rect x="100" y="196" width="36" height="100" rx="14" fill="#00E5FF" transform="rotate(-10 100 196)" />
        <rect x="148" y="196" width="36" height="100" rx="14" fill="#00E5FF" transform="rotate(14 148 196)" />
      </svg>
    ),
  },
  {
    name: "Rest Day Lounge Hoodie",
    price: "$85",
    bg: "#f0ede8",
    swatches: ["#d6c9b8", "#e8e0d5", "#c4b89e"],
    accent: "#111",
    tag: "Rest Day",
    shape: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.14]" viewBox="0 0 280 320" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="145" cy="68" rx="48" ry="52" fill="#111" />
        <rect x="84" y="116" width="112" height="145" rx="22" fill="#111" />
        <rect x="35" y="128" width="54" height="20" rx="10" fill="#111" transform="rotate(12 35 128)" />
        <rect x="192" y="126" width="54" height="20" rx="10" fill="#111" transform="rotate(-8 192 126)" />
        <rect x="100" y="258" width="38" height="55" rx="14" fill="#111" transform="rotate(4 100 258)" />
        <rect x="148" y="258" width="38" height="55" rx="14" fill="#111" transform="rotate(-6 148 258)" />
        <rect x="110" y="192" width="66" height="32" rx="8" fill="#111" opacity="0.35" />
      </svg>
    ),
  },
];

export default function NewArrivals() {
  return (
    <section className="px-6 py-14">
      <div className="mb-8">
        <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
          Just Dropped
        </h2>
        <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#111] leading-tight uppercase">
          New Arrivals
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {products.map((p) => (
          <article key={p.name} className="group cursor-pointer">
            {/* Product visual */}
            <div
              className="relative w-full overflow-hidden mb-4"
              style={{ backgroundColor: p.bg, aspectRatio: "3/4" }}
            >
              {p.shape}
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1"
                  style={{ backgroundColor: p.accent, color: p.bg === "#f0ede8" ? "#fff" : p.bg }}
                >
                  {p.tag}
                </span>
              </div>
            </div>

            {/* Product info */}
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#111] mb-1 group-hover:text-[#22c55e] transition-colors">
                {p.name}
              </h3>
              <p className="text-sm font-semibold text-[#111] mb-2">{p.price}</p>
              {/* Color swatches */}
              <div className="flex gap-1.5">
                {p.swatches.map((color, i) => (
                  <button
                    key={i}
                    aria-label={`Color option ${i + 1}`}
                    className="w-4 h-4 rounded-full border border-gray-200 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
