"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PRODUCTS } from "../../lib/products";
import { COLLECTIONS } from "../../lib/collections";

interface Props {
  onClose: () => void;
}

function search(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    const col = COLLECTIONS.find((c) => c.slug === p.collection);
    const haystack = [
      p.name,
      p.description,
      p.collection,
      col?.name ?? "",
      col?.tag ?? "",
      ...(p.searchTags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return q.split(" ").every((word) => haystack.includes(word));
  });
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = search(query);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} aria-hidden="true" />
      <div className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl">
        {/* Search input */}
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search products, styles, keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base text-[#111] placeholder-gray-400 outline-none py-3 bg-transparent"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-gray-400 hover:text-[#111] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="border-t border-gray-100 max-w-screen-xl mx-auto px-6 pb-6 max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-gray-400 py-6">No results for &ldquo;{query}&rdquo;</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {results.map((p) => {
                  const col = COLLECTIONS.find((c) => c.slug === p.collection);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 py-4 hover:bg-gray-50 -mx-2 px-2 transition-colors"
                      >
                        <div
                          className="w-12 h-14 shrink-0 flex items-center justify-center rounded"
                          style={{ backgroundColor: col?.bg ?? "#111" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black uppercase tracking-tight text-[#111]">{p.name}</p>
                          <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">{col?.name} · ${p.price}</p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Suggestions when empty */}
        {!query.trim() && (
          <div className="border-t border-gray-100 max-w-screen-xl mx-auto px-6 py-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {["oversized", "hoodie", "baggy", "running", "cargo pants", "fleece", "lightweight"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 bg-gray-100 text-[#111] hover:bg-[#111] hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
