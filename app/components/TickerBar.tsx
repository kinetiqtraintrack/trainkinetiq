export default function TickerBar() {
  const items = [
    "Free shipping over $75",
    "·",
    "Early access free forever — join before v2.0",
    "·",
    "v1.7.5 now live",
    "·",
    "Free shipping over $75",
    "·",
    "Early access free forever — join before v2.0",
    "·",
    "v1.7.5 now live",
    "·",
  ];

  return (
    <div className="bg-[#111] text-white overflow-hidden py-2.5 text-sm font-medium tracking-wide select-none">
      <div className="flex animate-ticker whitespace-nowrap" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="px-4 shrink-0">
            {item}
          </span>
        ))}
      </div>
      <p className="sr-only">
        Free shipping over $75 · Early access free forever — join before v2.0 · v1.7 now live
      </p>
    </div>
  );
}
