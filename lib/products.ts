import type { CollectionSlug } from "./collections";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  price: number;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  tag: string;
  images: string[];
  searchTags?: string[];
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  {
    id: "obsidian-oversized-tee",
    slug: "obsidian-oversized-tee",
    name: "Obsidian Oversized Tee",
    collection: "obsidian",
    price: 48,
    description:
      "Heavyweight drop-shoulder tee built for the gym and the street. 100% cotton, relaxed fit.",
    sizes: SIZES,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#2d2d2d" },
      { name: "Slate", hex: "#4a4a4a" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["oversized", "baggy", "tee", "t-shirt", "cotton", "gym", "lifting", "heavyweight", "drop shoulder"],
  },
  {
    id: "obsidian-pump-cover-hoodie",
    slug: "obsidian-pump-cover-hoodie",
    name: "Obsidian Pump Cover Hoodie",
    collection: "obsidian",
    price: 85,
    description:
      "Oversized pre-workout hoodie. Zip-off sleeves, raw hem.",
    sizes: SIZES,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#2d2d2d" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["oversized", "baggy", "hoodie", "zip", "pump cover", "pre-workout", "gym", "lifting", "warm"],
  },
  {
    id: "velocity-race-shorts",
    slug: "velocity-race-shorts",
    name: "Velocity Race Shorts",
    collection: "velocity",
    price: 62,
    description:
      "5-inch inseam, built-in liner, reflective hits. Made to move.",
    sizes: SIZES,
    colors: [
      { name: "Navy", hex: "#0d1b2a" },
      { name: "Cyan", hex: "#00E5FF" },
      { name: "Black", hex: "#111111" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["shorts", "running", "lightweight", "fast", "liner", "reflective", "athletic"],
  },
  {
    id: "velocity-wind-jacket",
    slug: "velocity-wind-jacket",
    name: "Velocity Wind Jacket",
    collection: "velocity",
    price: 110,
    description:
      "Lightweight packable shell. Water-resistant. Running ready.",
    sizes: SIZES,
    colors: [
      { name: "Navy", hex: "#0d1b2a" },
      { name: "Black", hex: "#111111" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["jacket", "windbreaker", "running", "lightweight", "packable", "water-resistant", "shell"],
  },
  {
    id: "forge-cargo-pants",
    slug: "forge-cargo-pants",
    name: "Forge Cargo Pants",
    collection: "forge",
    price: 95,
    description:
      "Relaxed workwear fit. Six pockets, tapered leg, durable twill.",
    sizes: SIZES,
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Black", hex: "#111111" },
      { name: "Sand", hex: "#c4b89e" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["pants", "cargo", "workwear", "pockets", "relaxed", "baggy", "tapered", "twill"],
  },
  {
    id: "forge-quarter-zip",
    slug: "forge-quarter-zip",
    name: "Forge Quarter Zip",
    collection: "forge",
    price: 75,
    description:
      "Technical fleece midlayer. Thumb holes, chest zip pocket.",
    sizes: SIZES,
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Charcoal", hex: "#2d2d2d" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["quarter zip", "fleece", "midlayer", "zip", "warm", "thumb holes", "workwear"],
  },
  {
    id: "rest-day-lounge-hoodie",
    slug: "rest-day-lounge-hoodie",
    name: "Rest Day Lounge Hoodie",
    collection: "restday",
    price: 85,
    description:
      "Brushed fleece interior. Oversized fit. Made for doing nothing.",
    sizes: SIZES,
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Grey", hex: "#9ca3af" },
      { name: "Black", hex: "#111111" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["hoodie", "oversized", "baggy", "lounge", "cozy", "fleece", "soft", "relaxed"],
  },
  {
    id: "rest-day-sweat-shorts",
    slug: "rest-day-sweat-shorts",
    name: "Rest Day Sweat Shorts",
    collection: "restday",
    price: 55,
    description: "Matching set piece. Elastic waist, side pockets.",
    sizes: SIZES,
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Grey", hex: "#9ca3af" },
      { name: "Black", hex: "#111111" },
    ],
    tag: "New Arrival",
    images: ["placeholder"],
    searchTags: ["shorts", "sweat", "lounge", "cozy", "soft", "matching set", "elastic waist"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: CollectionSlug): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}
