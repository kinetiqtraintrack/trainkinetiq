"use client";

import { useState } from "react";
import type { Product } from "../../lib/products";
import type { CollectionConfig } from "../../lib/collections";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
  collection: CollectionConfig;
}

function ProductShape({ collection }: { collection: CollectionConfig }) {
  const fill = collection.accent;
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.12]"
      viewBox="0 0 400 500"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse cx="200" cy="90" rx="65" ry="72" fill={fill} />
      <rect x="120" y="156" width="160" height="190" rx="26" fill={fill} />
      <rect x="40" y="170" width="88" height="26" rx="13" fill={fill} transform="rotate(-14 40 170)" />
      <rect x="272" y="168" width="88" height="26" rx="13" fill={fill} transform="rotate(16 272 168)" />
      <rect x="140" y="340" width="52" height="148" rx="20" fill={fill} />
      <rect x="208" y="340" width="52" height="148" rx="20" fill={fill} />
    </svg>
  );
}

export default function ProductDetail({ product, collection }: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToBag() {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      {/* Left — product image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: collection.bg, aspectRatio: "3/4" }}
      >
        <ProductShape collection={collection} />
        <div className="absolute bottom-6 left-6 z-10">
          <span
            className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5"
            style={{ backgroundColor: collection.accent, color: collection.bg === "#f0ede8" ? "#111" : collection.bg }}
          >
            {collection.name}
          </span>
        </div>
      </div>

      {/* Right — product details */}
      <div className="py-2">
        <span className={`text-[10px] font-black uppercase tracking-[0.22em] mb-3 block ${collection.accentClass}`}>
          {collection.tag}
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-tighter text-[#111] uppercase leading-none mb-2">
          {product.name}
        </h1>
        <p className="text-xl font-black text-[#111] mb-6">${product.price}</p>

        {/* Color selector */}
        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Color — <span className="text-[#111]">{selectedColor.name}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.hex}
                aria-label={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  selectedColor.hex === c.hex
                    ? "border-[#111] scale-110"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Size
          </p>
          <div className="grid grid-cols-6 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 text-xs font-black uppercase tracking-wider border transition-colors ${
                  selectedSize === size
                    ? "bg-[#111] text-white border-[#111]"
                    : "bg-white text-[#111] border-gray-200 hover:border-[#111]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {!selectedSize && (
            <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-widest">
              Select a size
            </p>
          )}
        </div>

        {/* Add to Bag */}
        <button
          onClick={handleAddToBag}
          disabled={!selectedSize}
          className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-colors mb-6 ${
            added
              ? "bg-[#22c55e] text-white"
              : selectedSize
              ? "bg-[#111] text-white hover:bg-[#333]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {added ? "Added to Bag ✓" : "Add to Bag"}
        </button>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Details accordion (static) */}
        <div className="border-t border-gray-100 pt-4">
          <details className="group">
            <summary className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#111] cursor-pointer py-3 list-none">
              Care & Details
              <span className="text-lg leading-none group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="pb-3 text-sm text-gray-500 leading-relaxed">
              <ul className="space-y-1">
                <li>Machine wash cold, tumble dry low</li>
                <li>Do not bleach or dry clean</li>
                <li>100% premium cotton unless noted</li>
                <li>Designed in-house, built to last</li>
              </ul>
            </div>
          </details>
          <details className="group border-t border-gray-100">
            <summary className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#111] cursor-pointer py-3 list-none">
              Shipping & Returns
              <span className="text-lg leading-none group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="pb-3 text-sm text-gray-500 leading-relaxed">
              <ul className="space-y-1">
                <li>Free shipping on orders over $100</li>
                <li>Standard delivery 3–5 business days</li>
                <li>Free returns within 30 days</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
