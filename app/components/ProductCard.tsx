"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductType } from "../../lib/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  slug: string;
  id: string;
  name: string;
  price: number;
  collection: string;
  collectionName?: string;
  tag?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  oos?: string[];
  images?: string[];
  type?: ProductType;
  bg?: string;
  accent?: string;
  accentEyebrow?: string;
  showCollectionName?: boolean;
}

const SILHOUETTE_PATHS: Record<ProductType, React.ReactNode> = {
  tee: (
    <>
      <ellipse cx="140" cy="55" rx="22" ry="9" />
      <path d="M82 80 L40 130 L70 158 L82 138 L82 270 L198 270 L198 138 L210 158 L240 130 L198 80 L170 70 Q140 90 110 70 z" />
    </>
  ),
  hoodie: (
    <>
      <path d="M92 58 Q140 32 188 58 L196 92 L84 92 z" />
      <path d="M82 90 L36 165 L66 198 L82 162 L82 280 L198 280 L198 162 L214 198 L244 165 L198 90 z" />
      <rect x="110" y="180" width="60" height="42" rx="4" fillOpacity="0.45" />
      <path d="M132 90 L132 110 L148 110 L148 90 z" fillOpacity="0.45" />
    </>
  ),
  "pump-cover": (
    <>
      <ellipse cx="140" cy="55" rx="22" ry="9" />
      <path d="M82 80 L82 270 L198 270 L198 80 L178 80 L170 100 Q166 130 158 130 L122 130 Q114 130 110 100 L102 80 z" />
    </>
  ),
  sweater: (
    <>
      <ellipse cx="140" cy="54" rx="18" ry="8" />
      <rect x="122" y="54" width="36" height="14" fillOpacity="0.45" />
      <path d="M82 78 L30 90 L40 240 L72 245 L82 240 L82 280 L198 280 L198 240 L208 245 L240 240 L250 90 L198 78 z" />
    </>
  ),
  shorts: (
    <>
      <rect x="80" y="130" width="120" height="14" />
      <path d="M80 144 L70 240 L122 240 L132 168 L148 168 L158 240 L210 240 L200 144 z" />
    </>
  ),
  sweats: (
    <>
      <rect x="82" y="80" width="116" height="14" />
      <path d="M82 94 L72 290 L124 290 L134 140 L146 140 L156 290 L208 290 L198 94 z" />
    </>
  ),
  "hat-beanie": (
    <>
      <path d="M82 130 Q82 60 140 60 Q198 60 198 130 L198 150 L82 150 z" />
      <rect x="82" y="150" width="116" height="24" fillOpacity="0.55" />
      <circle cx="140" cy="54" r="8" fillOpacity="0.7" />
    </>
  ),
  "hat-cap": (
    <>
      <path d="M86 110 Q86 78 140 78 Q194 78 194 110 L194 142 L86 142 z" />
      <ellipse cx="140" cy="152" rx="82" ry="14" fillOpacity="0.55" />
    </>
  ),
};

export default function ProductCard({
  slug, id, name, price, collection, collectionName, tag,
  colors, sizes, oos = [], images, type = "tee",
  bg = "#111", accent = "#15803d", accentEyebrow,
  showCollectionName = false,
}: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const silhouetteFill = collection === "restday" ? "#111" : accent;
  const badgeColor = accentEyebrow ?? accent;

  function handleQuickAdd(e: React.MouseEvent, size: string) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: id, name, price, color: colors[0]?.name ?? "", size });
    setAddedSize(size);
    openCart();
    setTimeout(() => setAddedSize(null), 1800);
  }

  return (
    <article className="group">
      <Link href={`/products/${slug}`} className="block">
        {/* Image */}
        <div
          className="relative w-full overflow-hidden mb-3 rounded-[8px]"
          style={{ backgroundColor: bg, aspectRatio: "3/4" }}
        >
          {images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={images[0]} alt={name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg viewBox="0 0 280 320" preserveAspectRatio="xMidYMid meet" className="w-full h-full" style={{ opacity: 0.18 }} aria-hidden="true">
                <g fill={silhouetteFill}>{SILHOUETTE_PATHS[type]}</g>
              </svg>
            </div>
          )}

          {/* Tag badge */}
          {tag && (
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-[4px]"
                style={{ backgroundColor: badgeColor, color: collection === "restday" ? "#fff" : bg }}
              >
                {tag}
              </span>
            </div>
          )}

          {/* Quick add panel */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out z-20">
            <div className="bg-white/97 px-2.5 py-2.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Quick Add</p>
              <div className="flex flex-wrap gap-1">
                {sizes.map((size) => {
                  const isOos = oos.includes(size);
                  const isAdded = addedSize === size;
                  return (
                    <button
                      key={size}
                      disabled={isOos}
                      onClick={(e) => !isOos && handleQuickAdd(e, size)}
                      className={`text-[10px] font-black uppercase px-2 py-1 border rounded-[4px] transition-colors duration-150 ${
                        isOos
                          ? "text-gray-300 border-gray-100 line-through cursor-not-allowed"
                          : isAdded
                          ? "bg-[#262626] text-white border-[#262626]"
                          : "text-[#262626] border-gray-200 hover:border-[#262626]"
                      }`}
                    >
                      {isAdded ? "✓" : size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          {showCollectionName && collectionName && (
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
              {collectionName}
            </p>
          )}
          <h3 className="text-sm font-bold tracking-tight text-[#262626] mb-1 group-hover:text-[#15803d] transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-sm font-black text-[#262626] mb-2">${price}</p>
          <div className="flex gap-1.5 items-center">
            {colors.map((c) => (
              <span
                key={c.hex}
                aria-label={c.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-200"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
