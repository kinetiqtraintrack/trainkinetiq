"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { COLLECTIONS } from "../../lib/collections";

const CATEGORIES = [
  { type: "tee", label: "T-Shirts" },
  { type: "hoodie", label: "Hoodies" },
  { type: "sweater", label: "Sweaters" },
  { type: "pump-cover", label: "Pump Covers" },
  { type: "shorts", label: "Shorts" },
  { type: "sweats", label: "Sweatpants" },
  { type: "hat", label: "Hats & Caps" },
  { type: "all", label: "View All" },
];

function FeaturedSilhouette() {
  return (
    <svg
      viewBox="0 0 280 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute bottom-0 right-[-20px] w-44 h-52 pointer-events-none"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      <g fill="#0a0a0a">
        <path d="M92 58 Q140 32 188 58 L196 92 L84 92 z" />
        <path d="M82 90 L36 165 L66 198 L82 162 L82 280 L198 280 L198 162 L214 198 L244 165 L198 90 z" />
        <rect x="110" y="180" width="60" height="42" rx="4" fillOpacity="0.45" />
        <path d="M132 90 L132 110 L148 110 L148 90 z" fillOpacity="0.45" />
      </g>
    </svg>
  );
}

interface Props {
  label: string;
}

export default function MegaMenu({ label }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canHover = useRef(true);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function startClose() {
    if (!canHover.current) return;
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function handleZoneEnter() {
    if (!canHover.current) return;
    cancelClose();
    setOpen(true);
  }

  function handleZoneLeave() {
    startClose();
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleZoneEnter}
      onMouseLeave={handleZoneLeave}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="uppercase text-xs font-bold tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center gap-1"
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dim overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-[39]"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-40"
          style={{
            top: "60px",
            animation: "mega-slide 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          onMouseEnter={handleZoneEnter}
          onMouseLeave={handleZoneLeave}
        >
          <div className="max-w-screen-xl mx-auto px-6 py-10">
            <div
              className="grid"
              style={{ gridTemplateColumns: "1.4fr 1fr 1.4fr", gap: "56px" }}
            >
              {/* Column 1 — Shop by Collection */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-5">
                  Shop by Collection
                </p>
                <ul className="space-y-4">
                  {COLLECTIONS.map((col) => (
                    <li key={col.slug}>
                      <Link
                        href={`/collections/${col.slug}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 font-black uppercase leading-none text-[#262626] hover:text-[#15803d] transition-all"
                        style={{ fontSize: "26px", letterSpacing: "-0.04em" }}
                      >
                        <span
                          className="w-2.5 h-2.5 shrink-0 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: col.accentEyebrow ?? col.accent }}
                          aria-hidden="true"
                        />
                        <span className="transition-transform group-hover:translate-x-1">
                          {col.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 — Shop by Category */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-5">
                  Shop by Category
                </p>
                <ul className="grid grid-cols-2 gap-0">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.type} className="border-b border-gray-100">
                      <Link
                        href={`/category/${cat.type}`}
                        onClick={() => setOpen(false)}
                        className="text-[13px] font-medium text-[#262626] hover:text-[#15803d] transition-colors py-2.5 block"
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 — Featured tile */}
              <div
                className="relative overflow-hidden p-8 flex flex-col justify-between"
                style={{ backgroundColor: "#f0ede8", minHeight: "220px" }}
              >
                <FeaturedSilhouette />
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#84cc16] mb-2">
                    Just Dropped
                  </p>
                  <h3
                    className="font-black uppercase leading-none text-[#262626] mb-6"
                    style={{ fontSize: "28px", letterSpacing: "-0.04em" }}
                  >
                    Obsidian SS26
                  </h3>
                  <Link
                    href="/collections/obsidian"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-white rounded-[8px] transition-all"
                    style={{ background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "linear-gradient(135deg, #166534 0%, #4d7c0f 100%)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "linear-gradient(135deg, #15803d 0%, #65a30d 100%)";
                    }}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
