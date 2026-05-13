"use client";

import { useState } from "react";
import type { Product, ProductType } from "../../lib/products";
import type { CollectionConfig } from "../../lib/collections";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
  collection: CollectionConfig;
}

// Type-specific SVG silhouette paths, from design handoff silhouettes.md
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

function ProductSilhouette({ type, fill }: { type: ProductType; fill: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      <g fill={fill}>{SILHOUETTE_PATHS[type]}</g>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionItem({
  label,
  items,
  defaultOpen = false,
}: {
  label: string;
  items: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-[11px] font-black uppercase tracking-widest text-[#262626] text-left"
        aria-expanded={open}
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="pb-4 space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0 mt-[7px]" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProductDetail({ product, collection }: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const { addItem, openCart } = useCart();

  const productType = product.type ?? "tee";
  const silhouetteFill = collection.slug === "restday" ? "#111" : collection.accent;
  const isHatType = productType === "hat-beanie" || productType === "hat-cap";
  const oos = product.oos ?? [];
  const gradient = collection.gradient ?? "linear-gradient(135deg, #15803d 0%, #65a30d 100%)";
  const gradientHover = collection.gradientHover ?? "linear-gradient(135deg, #166534 0%, #4d7c0f 100%)";

  function handleAddToBag() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      size: selectedSize,
    });
    openCart();
  }

  return (
    <div
      className="grid items-start"
      style={{ gridTemplateColumns: "1.2fr 1fr", gap: "48px", maxWidth: "1280px", margin: "0 auto" }}
    >
      {/* Left — thumbnail rail + main image */}
      <div className="flex gap-3">
        {/* Thumbnail rail — only shown when there are multiple images */}
        {(product.images?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-2 w-[72px] shrink-0">
            {product.images!.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className="relative overflow-hidden rounded-[6px] border-2 transition-colors"
                style={{
                  aspectRatio: "1",
                  backgroundColor: collection.bg,
                  borderColor: activeThumb === i ? "#262626" : "#e5e7eb",
                }}
                aria-label={`View image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            backgroundColor: collection.bg,
            aspectRatio: "4/5",
            borderRadius: "10px",
          }}
        >
          {product.images?.[activeThumb] || product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[activeThumb] ?? product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <ProductSilhouette type={productType} fill={silhouetteFill} />
            </div>
          )}
          {/* Tag badge */}
          <div className="absolute bottom-5 left-5 z-10">
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-[4px]"
              style={{
                backgroundColor: collection.accentEyebrow ?? collection.accent,
                color: collection.slug === "restday" ? "#fff" : collection.bg,
              }}
            >
              {product.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Right — sticky info column */}
      <div style={{ position: "sticky", top: "84px" }}>
        {/* Eyebrow */}
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-3">
          {collection.name} · {collection.tag}
        </p>

        {/* Product name */}
        <h1
          className="font-black uppercase leading-none text-[#262626] mb-3"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}
        >
          {product.name}
        </h1>

        {/* Rating row */}
        {product.rating != null && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-[#262626]">
              {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
              {product.rating} · {product.reviewCount?.toLocaleString()} reviews
            </span>
          </div>
        )}

        {/* Price */}
        <p className="text-[22px] font-bold text-[#262626] mb-4">${product.price}</p>

        {/* Description */}
        <p className="text-[14px] leading-[1.65] text-gray-500 mb-6">{product.description}</p>

        {/* Color selector */}
        <div className="mb-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
            Color — <span className="text-[#262626]">{selectedColor.name}</span>
          </p>
          <div className="flex gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.hex}
                aria-label={c.name}
                onClick={() => setSelectedColor(c)}
                className="w-8 h-8 rounded-full transition-all"
                style={{
                  backgroundColor: c.hex,
                  outline: selectedColor.hex === c.hex ? "2px solid #262626" : "2px solid transparent",
                  outlineOffset: "2px",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-6">
          <p
            className={`text-[11px] font-black uppercase tracking-widest mb-3 transition-colors ${
              sizeError ? "text-red-600" : "text-gray-400"
            }`}
          >
            {sizeError ? "Select a size to continue" : "Size"}
          </p>
          <div
            className={`grid gap-2 rounded-[4px] p-0.5 transition-colors ${
              sizeError ? "outline outline-2 outline-[#dc2626]" : ""
            }`}
            style={{
              gridTemplateColumns: isHatType
                ? "repeat(auto-fit, minmax(80px, 160px))"
                : "repeat(6, 1fr)",
            }}
          >
            {product.sizes.map((size) => {
              const isOos = oos.includes(size);
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => {
                    if (!isOos) {
                      setSelectedSize(size);
                      setSizeError(false);
                    }
                  }}
                  disabled={isOos}
                  className={`py-2.5 text-xs font-black uppercase tracking-wider border rounded-[6px] transition-colors ${
                    isOos
                      ? "line-through text-gray-300 border-gray-100 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#262626] text-white border-[#262626]"
                      : "bg-white text-[#262626] border-gray-200 hover:border-[#262626]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add to Bag */}
        <button
          onClick={handleAddToBag}
          className="w-full py-4 text-xs font-black uppercase tracking-widest text-white rounded-[8px] mb-3 transition-all"
          style={{ background: gradient }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = gradientHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = gradient;
          }}
        >
          Add to Bag · ${product.price}
        </button>

        {/* Wishlist ghost button */}
        <button className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-[#262626] border border-gray-200 rounded-[8px] hover:border-[#262626] transition-colors mb-5">
          Add to Wishlist
        </button>

        {/* Trust micro-copy */}
        <p className="text-[12px] text-gray-500 flex items-center gap-2 mb-6">
          <span className="text-[#15803d] font-bold">✓</span>
          Free shipping over $100 · Free returns within 30 days
        </p>

        {/* Accordion */}
        {product.fit && (
          <AccordionItem label="Fit" items={product.fit} defaultOpen />
        )}
        {product.fabric && (
          <AccordionItem label="Fabric & Care" items={product.fabric} />
        )}
        <AccordionItem
          label="Shipping & Returns"
          items={[
            "Free shipping on orders over $100",
            "Delivered in 3–5 business days",
            "Free returns within 30 days",
          ]}
        />
      </div>
    </div>
  );
}
