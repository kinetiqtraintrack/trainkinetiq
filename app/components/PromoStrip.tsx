const promos = [
  { title: "Free Returns", sub: "On all orders" },
  { title: "Early Access", sub: "Free forever pre-v2.0" },
  { title: "App + Gear", sub: "Train & track everything" },
  { title: "v1.7 Live", sub: "Download now" },
];

export default function PromoStrip() {
  return (
    <section className="border-t border-b border-gray-200">
      <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
        {promos.map((p, i) => (
          <li
            key={i}
            className="flex flex-col items-center justify-center py-5 px-4 text-center gap-0.5"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#111]">
              {p.title}
            </span>
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              {p.sub}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
