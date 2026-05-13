import type { CollectionSlug } from "./collections";

export type ProductType =
  | "tee"
  | "hoodie"
  | "sweater"
  | "pump-cover"
  | "shorts"
  | "sweats"
  | "hat-beanie"
  | "hat-cap";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  type?: ProductType;
  price: number;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  tag: string;
  images: string[];
  oos?: string[];
  fit?: string[];
  fabric?: string[];
  rating?: number;
  reviewCount?: number;
  searchTags?: string[];
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const HAT_SIZES = ["One Size"];

export const PRODUCTS: Product[] = [
  // ─── Obsidian (3) ────────────────────────────────────────────────────────────
  {
    id: "obsidian-boxy-pump-cover",
    slug: "obsidian-boxy-pump-cover",
    name: "Boxy Fit Pump Cover",
    collection: "obsidian",
    type: "pump-cover",
    price: 52,
    tag: "New Arrival",
    description:
      "Sleeveless, drop-armhole pump cover. Heavy cotton, raw hem, designed to get bigger every wash.",
    colors: [
      { name: "Black", hex: "#111" },
      { name: "Charcoal", hex: "#2d2d2d" },
      { name: "Bone", hex: "#e8e3d8" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["XS"],
    fit: ["Boxy, oversized fit", "Deep armholes for pump days", "Falls below the hip"],
    fabric: ["260gsm heavyweight cotton", "Garment dyed, pre-shrunk", "Raw hem detail"],
    rating: 4.9,
    reviewCount: 612,
    images: [],
    searchTags: ["pump cover", "sleeveless", "boxy", "heavy cotton", "gym", "lifting"],
  },
  {
    id: "obsidian-boxy-pump-hoodie",
    slug: "obsidian-boxy-pump-hoodie",
    name: "Boxy Fit Pump Hoodie",
    collection: "obsidian",
    type: "hoodie",
    price: 92,
    tag: "New Arrival",
    description:
      "Oversized pre-workout hoodie. Boxy cut, dropped shoulder, kangaroo pocket. Pull it on, get warm, hit the bar.",
    colors: [
      { name: "Black", hex: "#111" },
      { name: "Charcoal", hex: "#2d2d2d" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ["Boxy, drop-shoulder fit", "Hood lined in heavy jersey", "Cropped slightly for layering"],
    fabric: ["420gsm brushed fleece", "100% organic cotton face", "Rib cuffs and hem"],
    rating: 4.9,
    reviewCount: 484,
    images: [],
    searchTags: ["hoodie", "oversized", "pump", "boxy", "fleece", "gym"],
  },
  {
    id: "obsidian-heavyweight-shorts",
    slug: "obsidian-heavyweight-shorts",
    name: "Obsidian Heavyweight Shorts",
    collection: "obsidian",
    type: "shorts",
    price: 58,
    tag: "Best Seller",
    description:
      "Heavy mesh gym shorts. 7-inch inseam, drawcord waist, deep pockets. Built for the squat rack.",
    colors: [
      { name: "Black", hex: "#111" },
      { name: "Charcoal", hex: "#2d2d2d" },
    ],
    sizes: APPAREL_SIZES,
    oos: [],
    fit: ['Relaxed, true to size', '7" inseam', "Elastic waistband with drawcord"],
    fabric: ["Heavyweight mesh polyester", "Side and back pockets", "Moisture-wicking liner"],
    rating: 4.8,
    reviewCount: 318,
    images: [],
    searchTags: ["shorts", "gym", "heavyweight", "mesh", "lifting"],
  },

  // ─── Rest Day (4) ─────────────────────────────────────────────────────────────
  {
    id: "restday-essential-tee",
    slug: "restday-essential-tee",
    name: "Essential Tee",
    collection: "restday",
    type: "tee",
    price: 38,
    tag: "New Arrival",
    description:
      "The everyday tee. Heavy enough to hold its shape, soft enough to disappear. Boxy fit, just the way it should be.",
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Bone", hex: "#e8e3d8" },
      { name: "Black", hex: "#111" },
      { name: "Grey", hex: "#9ca3af" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["S"],
    fit: ["Relaxed, boxy fit", "Drop shoulder", "True to size"],
    fabric: ["220gsm combed cotton", "Pre-washed, no shrinkage", "Ribbed crew neck"],
    rating: 4.9,
    reviewCount: 921,
    images: [],
    searchTags: ["tee", "t-shirt", "everyday", "boxy", "cotton", "relaxed"],
  },
  {
    id: "restday-puff-hoodie",
    slug: "restday-puff-hoodie",
    name: "Puff Hoodie",
    collection: "restday",
    type: "hoodie",
    price: 95,
    tag: "New Arrival",
    description:
      "Brushed fleece interior, oversized fit, kangaroo pocket. Made for doing absolutely nothing.",
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Grey", hex: "#9ca3af" },
      { name: "Black", hex: "#111" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["M"],
    fit: ["Oversized, relaxed fit", "Drop shoulder, long body", "Size down for a regular fit"],
    fabric: ["380gsm brushed fleece", "100% organic cotton face", "Ribbed cuffs and hem"],
    rating: 4.9,
    reviewCount: 1207,
    images: [],
    searchTags: ["hoodie", "puff", "oversized", "fleece", "cozy", "lounge"],
  },
  {
    id: "restday-lounger-sweats",
    slug: "restday-lounger-sweats",
    name: "Lounger Sweats",
    collection: "restday",
    type: "sweats",
    price: 78,
    tag: "New Arrival",
    description:
      "Match the hoodie. Tapered leg, elastic waist, side pockets. Pull-on comfort with a sharp silhouette.",
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Grey", hex: "#9ca3af" },
      { name: "Black", hex: "#111" },
    ],
    sizes: APPAREL_SIZES,
    oos: [],
    fit: ["Slim-tapered fit", "Elastic waistband + drawcord", "Ribbed ankle cuff"],
    fabric: ["380gsm brushed fleece", "Same fabric as Puff Hoodie", "Side and back pockets"],
    rating: 4.8,
    reviewCount: 543,
    images: [],
    searchTags: ["sweats", "sweatpants", "lounge", "tapered", "comfortable"],
  },
  {
    id: "restday-beanie",
    slug: "restday-beanie",
    name: "Rest Day Beanie",
    collection: "restday",
    type: "hat-beanie",
    price: 28,
    tag: "New Arrival",
    description: "Ribbed knit beanie. Single fold, embroidered K mark. Wear it everywhere.",
    colors: [
      { name: "Cream", hex: "#f5f0e8" },
      { name: "Grey", hex: "#9ca3af" },
      { name: "Black", hex: "#111" },
    ],
    sizes: HAT_SIZES,
    oos: [],
    fit: ["One size fits most", "Ribbed, single fold", "Embroidered K mark at fold"],
    fabric: ["100% merino wool", "Hand wash, lay flat to dry"],
    rating: 4.9,
    reviewCount: 188,
    images: [],
    searchTags: ["beanie", "hat", "knit", "wool", "winter"],
  },

  // ─── Forge (3) ────────────────────────────────────────────────────────────────
  {
    id: "forge-work-tee",
    slug: "forge-work-tee",
    name: "Work Tee",
    collection: "forge",
    type: "tee",
    price: 44,
    tag: "New Arrival",
    description:
      "Heavyweight workwear tee. Reinforced shoulder seams, dropped pocket, made to be beaten up.",
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Black", hex: "#111" },
      { name: "Sand", hex: "#c4b89e" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["XS"],
    fit: ["Relaxed workwear fit", "Reinforced shoulder seams", "Chest patch pocket"],
    fabric: ["280gsm heavyweight cotton", "Pre-washed for soft hand", "Triple-stitched seams"],
    rating: 4.8,
    reviewCount: 246,
    images: [],
    searchTags: ["tee", "workwear", "heavyweight", "pocket", "durable"],
  },
  {
    id: "forge-work-sweater",
    slug: "forge-work-sweater",
    name: "Work Sweater",
    collection: "forge",
    type: "sweater",
    price: 110,
    tag: "New Arrival",
    description:
      "Thick knit crewneck sweater. Made for cold mornings and long days. Wears in, never out.",
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Charcoal", hex: "#2d2d2d" },
      { name: "Sand", hex: "#c4b89e" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["S"],
    fit: ["Relaxed, slightly cropped", "Drop shoulder", "Ribbed cuffs, hem and collar"],
    fabric: ["100% lambswool, mid-weight", "Garment washed", "Reinforced elbow patches"],
    rating: 4.9,
    reviewCount: 178,
    images: [],
    searchTags: ["sweater", "knit", "crewneck", "wool", "workwear"],
  },
  {
    id: "forge-work-cap",
    slug: "forge-work-cap",
    name: "Work Cap",
    collection: "forge",
    type: "hat-cap",
    price: 34,
    tag: "New Arrival",
    description:
      "6-panel washed cotton cap. Curved brim, embroidered K mark, adjustable rear strap.",
    colors: [
      { name: "Olive", hex: "#4a5240" },
      { name: "Black", hex: "#111" },
      { name: "Sand", hex: "#c4b89e" },
    ],
    sizes: HAT_SIZES,
    oos: [],
    fit: ["6-panel, curved brim", "Adjustable strap back", "One size fits most"],
    fabric: ["Washed cotton twill", "Sweatband lined", "Embroidered K mark"],
    rating: 4.8,
    reviewCount: 134,
    images: [],
    searchTags: ["cap", "hat", "cotton", "workwear", "adjustable"],
  },

  // ─── Velocity (3) ─────────────────────────────────────────────────────────────
  {
    id: "velocity-performance-tee",
    slug: "velocity-performance-tee",
    name: "Performance Tee",
    collection: "velocity",
    type: "tee",
    price: 48,
    tag: "New Arrival",
    description:
      "Lightweight, fast-drying performance tee. Bonded seams, reflective hits, athletic fit.",
    colors: [
      { name: "Navy", hex: "#0d1b2a" },
      { name: "Cyan", hex: "#00E5FF" },
      { name: "Black", hex: "#111" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ["Athletic, slim fit", "Bonded seams (no chafing)", "True to size"],
    fabric: ["4-way stretch microfiber", "Wicks moisture, dries fast", "Reflective trim at rear neck"],
    rating: 4.8,
    reviewCount: 412,
    images: [],
    searchTags: ["tee", "performance", "running", "athletic", "lightweight"],
  },
  {
    id: "velocity-runners-cap",
    slug: "velocity-runners-cap",
    name: "Runners Cap",
    collection: "velocity",
    type: "hat-cap",
    price: 36,
    tag: "New Arrival",
    description:
      "Ultralight 5-panel running cap. Mesh side panels, reflective brim, no-slip headband.",
    colors: [
      { name: "Navy", hex: "#0d1b2a" },
      { name: "Cyan", hex: "#00E5FF" },
      { name: "Black", hex: "#111" },
    ],
    sizes: HAT_SIZES,
    oos: [],
    fit: ["5-panel, low profile", "Mesh side panels for airflow", "Reflective trim around brim"],
    fabric: ["Recycled polyester ripstop", "Silicone no-slip sweatband", "38g total weight"],
    rating: 4.9,
    reviewCount: 96,
    images: [],
    searchTags: ["cap", "running", "lightweight", "reflective", "mesh"],
  },
  {
    id: "velocity-performance-shorts",
    slug: "velocity-performance-shorts",
    name: "Performance Shorts",
    collection: "velocity",
    type: "shorts",
    price: 62,
    tag: "Best Seller",
    description:
      "5-inch inseam, built-in liner, reflective hits. Made to move at pace. The shorts that disappear when you run.",
    colors: [
      { name: "Navy", hex: "#0d1b2a" },
      { name: "Cyan", hex: "#00E5FF" },
      { name: "Black", hex: "#111" },
    ],
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ['Athletic, true to size', '5" inseam, built-in liner', "Elastic waistband with drawcord"],
    fabric: ["4-way stretch lightweight woven", "DWR water-resistant finish", "Reflective rear panel"],
    rating: 4.8,
    reviewCount: 962,
    images: [],
    searchTags: ["shorts", "running", "performance", "liner", "reflective"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: CollectionSlug): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}

export function getProductsByType(type: string): Product[] {
  if (type === "hat") return PRODUCTS.filter((p) => p.type === "hat-beanie" || p.type === "hat-cap");
  if (type === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.type === type);
}
