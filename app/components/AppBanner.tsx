function AppMockup() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-5 w-full max-w-xs mx-auto shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white text-xs font-bold uppercase tracking-widest">Today</span>
        <span className="text-gray-500 text-xs">Mon</span>
      </div>

      {/* Readiness score */}
      <div className="bg-[#111] rounded-xl p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">Readiness</span>
          <span className="text-[#22c55e] text-xs font-bold">GOOD</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-white font-black text-4xl leading-none">84</span>
          <span className="text-gray-500 text-sm mb-1">/100</span>
        </div>
        <div className="mt-2 w-full bg-[#2a2a2a] rounded-full h-1.5">
          <div className="bg-[#22c55e] h-1.5 rounded-full" style={{ width: "84%" }} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Sleep */}
        <div className="bg-[#111] rounded-xl p-3">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold block mb-1">Sleep</span>
          <span className="text-white font-black text-2xl leading-none">7.8</span>
          <span className="text-gray-500 text-xs">hrs</span>
          <div className="mt-2 w-full bg-[#2a2a2a] rounded-full h-1">
            <div className="bg-[#A78BFA] h-1 rounded-full" style={{ width: "78%" }} />
          </div>
        </div>
        {/* HRV */}
        <div className="bg-[#111] rounded-xl p-3">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold block mb-1">HRV</span>
          <span className="text-white font-black text-2xl leading-none">62</span>
          <span className="text-gray-500 text-xs">ms</span>
          <div className="mt-2 w-full bg-[#2a2a2a] rounded-full h-1">
            <div className="bg-[#00E5FF] h-1 rounded-full" style={{ width: "62%" }} />
          </div>
        </div>
      </div>

      {/* Training battery */}
      <div className="bg-[#111] rounded-xl p-3 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Training Battery</span>
          <span className="text-[#f59e0b] text-[10px] font-bold">CHARGED</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-sm"
              style={{ backgroundColor: i <= 4 ? "#f59e0b" : "#2a2a2a" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppBanner() {
  return (
    <section id="app-banner" className="bg-[#111] w-full py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left — copy */}
        <div>
          <span className="inline-block text-[#22c55e] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
            Kinetiq App
          </span>
          <h2 className="text-white font-black text-[clamp(2rem,5vw,3.8rem)] leading-none tracking-tighter uppercase mb-6">
            Train smarter.<br />Recover harder.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            Training Battery shows your true readiness. Sleep Intelligence tracks your recovery. Built-in GPS maps every run, ride, and walk.
          </p>
          <ul className="space-y-2 mb-8">
            {["Training Battery", "Sleep Intelligence", "GPS Tracking"].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <a
            href="https://apps.apple.com/app/id6759758630"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#22c55e] text-[#111] px-7 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-[#16a34a] transition-colors"
          >
            Download Free
          </a>
        </div>

        {/* Right — app mockup */}
        <div className="flex justify-center md:justify-end">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
