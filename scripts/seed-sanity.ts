/**
 * Seeds Sanity with collections and products from lib/
 * Run: npx tsx --env-file=.env.local scripts/seed-sanity.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const COLLECTIONS = [
  {
    slug: "obsidian",
    name: "Obsidian",
    tag: "Lifting & Pump",
    description: "Built for the bar. Heavy cotton, oversized cuts, zero compromise.",
    bg: "#0a0a0a",
    accent: "#22c55e",
    textColor: "text-white",
    btnClass: "bg-white text-[#111] hover:bg-[#22c55e]",
    accentClass: "text-[#22c55e]",
  },
  {
    slug: "velocity",
    name: "Velocity",
    tag: "Speed & Run",
    description: "Lightweight, fast-dry, reflective. Made to move at pace.",
    bg: "#0d1b2a",
    accent: "#00E5FF",
    textColor: "text-white",
    btnClass: "bg-[#00E5FF] text-[#0d1b2a] hover:bg-white",
    accentClass: "text-[#00E5FF]",
  },
  {
    slug: "forge",
    name: "Forge",
    tag: "Workwear",
    description: "Durable gear for long days. Tough fabric, functional pockets.",
    bg: "#1a0f00",
    accent: "#f59e0b",
    textColor: "text-white",
    btnClass: "bg-[#f59e0b] text-[#1a0f00] hover:bg-white",
    accentClass: "text-[#f59e0b]",
  },
  {
    slug: "restday",
    name: "Rest Day",
    tag: "Day to Day",
    description: "Soft, relaxed, effortless. For the days between the grind.",
    bg: "#f0ede8",
    accent: "#111",
    textColor: "text-[#111]",
    btnClass: "bg-[#111] text-white hover:bg-[#333]",
    accentClass: "text-[#111] opacity-50",
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const PRODUCTS = [
  {
    slug: "obsidian-oversized-tee",
    name: "Obsidian Oversized Tee",
    collection: "obsidian",
    price: 48,
    description: "Heavyweight drop-shoulder tee built for the gym and the street. 100% cotton, relaxed fit.",
    sizes: SIZES,
    colors: [{ name: "Black", hex: "#111111" }, { name: "Charcoal", hex: "#2d2d2d" }, { name: "Slate", hex: "#4a4a4a" }],
    tag: "New Arrival",
  },
  {
    slug: "obsidian-pump-cover-hoodie",
    name: "Obsidian Pump Cover Hoodie",
    collection: "obsidian",
    price: 85,
    description: "Oversized pre-workout hoodie. Zip-off sleeves, raw hem.",
    sizes: SIZES,
    colors: [{ name: "Black", hex: "#111111" }, { name: "Charcoal", hex: "#2d2d2d" }],
    tag: "New Arrival",
  },
  {
    slug: "velocity-race-shorts",
    name: "Velocity Race Shorts",
    collection: "velocity",
    price: 62,
    description: "5-inch inseam, built-in liner, reflective hits. Made to move.",
    sizes: SIZES,
    colors: [{ name: "Navy", hex: "#0d1b2a" }, { name: "Cyan", hex: "#00E5FF" }, { name: "Black", hex: "#111111" }],
    tag: "New Arrival",
  },
  {
    slug: "velocity-wind-jacket",
    name: "Velocity Wind Jacket",
    collection: "velocity",
    price: 110,
    description: "Lightweight packable shell. Water-resistant. Running ready.",
    sizes: SIZES,
    colors: [{ name: "Navy", hex: "#0d1b2a" }, { name: "Black", hex: "#111111" }],
    tag: "New Arrival",
  },
  {
    slug: "forge-cargo-pants",
    name: "Forge Cargo Pants",
    collection: "forge",
    price: 95,
    description: "Relaxed workwear fit. Six pockets, tapered leg, durable twill.",
    sizes: SIZES,
    colors: [{ name: "Olive", hex: "#4a5240" }, { name: "Black", hex: "#111111" }, { name: "Sand", hex: "#c4b89e" }],
    tag: "New Arrival",
  },
  {
    slug: "forge-quarter-zip",
    name: "Forge Quarter Zip",
    collection: "forge",
    price: 75,
    description: "Technical fleece midlayer. Thumb holes, chest zip pocket.",
    sizes: SIZES,
    colors: [{ name: "Olive", hex: "#4a5240" }, { name: "Charcoal", hex: "#2d2d2d" }],
    tag: "New Arrival",
  },
  {
    slug: "rest-day-lounge-hoodie",
    name: "Rest Day Lounge Hoodie",
    collection: "restday",
    price: 85,
    description: "Brushed fleece interior. Oversized fit. Made for doing nothing.",
    sizes: SIZES,
    colors: [{ name: "Cream", hex: "#f5f0e8" }, { name: "Grey", hex: "#9ca3af" }, { name: "Black", hex: "#111111" }],
    tag: "New Arrival",
  },
  {
    slug: "rest-day-sweat-shorts",
    name: "Rest Day Sweat Shorts",
    collection: "restday",
    price: 55,
    description: "Matching set piece. Elastic waist, side pockets.",
    sizes: SIZES,
    colors: [{ name: "Cream", hex: "#f5f0e8" }, { name: "Grey", hex: "#9ca3af" }, { name: "Black", hex: "#111111" }],
    tag: "New Arrival",
  },
];

async function seed() {
  console.log("Seeding collections...");
  for (const col of COLLECTIONS) {
    await client.createOrReplace({
      _id: `collection-${col.slug}`,
      _type: "collection",
      name: col.name,
      slug: { _type: "slug", current: col.slug },
      tag: col.tag,
      description: col.description,
      bg: col.bg,
      accent: col.accent,
      textColor: col.textColor,
      btnClass: col.btnClass,
      accentClass: col.accentClass,
    });
    console.log(`  ✓ ${col.name}`);
  }

  console.log("\nSeeding products...");
  for (const p of PRODUCTS) {
    await client.createOrReplace({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      collection: { _type: "reference", _ref: `collection-${p.collection}` },
      price: p.price,
      description: p.description,
      sizes: p.sizes,
      colors: p.colors.map((c, i) => ({ _key: `color-${i}`, ...c })),
      tag: p.tag,
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log("\nDone! All data seeded to Sanity.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
