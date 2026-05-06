"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem } = useCart();

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[60]"
        aria-hidden="true"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping bag"
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="text-xs font-black uppercase tracking-widest text-[#111]">
            Bag ({items.length})
          </span>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                Your bag is empty
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                  {/* Color swatch */}
                  <div
                    className="w-12 h-14 shrink-0 bg-[#f8f8f8] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor:
                          item.color === "Black" ? "#111" :
                          item.color === "Charcoal" ? "#2d2d2d" :
                          item.color === "Slate" ? "#4a4a4a" :
                          item.color === "Navy" ? "#0d1b2a" :
                          item.color === "Cyan" ? "#00E5FF" :
                          item.color === "Cream" ? "#f5f0e8" :
                          item.color === "Grey" ? "#9ca3af" :
                          item.color === "Olive" ? "#4a5240" :
                          item.color === "Sand" ? "#c4b89e" :
                          "#111",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-tight text-[#111] leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                      {item.color} · {item.size}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs font-black text-[#111]">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => removeItem(i)}
                      aria-label={`Remove ${item.name}`}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#111]">Total</span>
              <span className="text-sm font-black text-[#111]">${total}</span>
            </div>
            <button className="w-full bg-[#111] text-white py-4 text-xs font-black uppercase tracking-widest hover:bg-[#333] transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
