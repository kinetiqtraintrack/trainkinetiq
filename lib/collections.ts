export type CollectionSlug = "obsidian" | "velocity" | "forge" | "restday";

export interface CollectionConfig {
  slug: CollectionSlug;
  name: string;
  tag: string;
  description: string;
  bg: string;
  accent: string;
  accentEyebrow?: string;
  gradient?: string;
  gradientHover?: string;
  textColor: string;
  btnClass: string;
  accentClass: string;
  heroImage?: string;
  showcaseImages?: string[];
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "obsidian",
    name: "Obsidian",
    tag: "Lifting & Pump",
    description: "Built for the bar. Heavy cotton, oversized cuts, zero compromise.",
    bg: "#0a0a0a",
    accent: "#16a34a",
    accentEyebrow: "#84cc16",
    gradient: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)",
    gradientHover: "linear-gradient(135deg, #166534 0%, #4d7c0f 100%)",
    textColor: "text-white",
    btnClass: "bg-white text-[#262626] hover:bg-[#16a34a] hover:text-white",
    accentClass: "text-[#84cc16]",
  },
  {
    slug: "velocity",
    name: "Velocity",
    tag: "Speed & Run",
    description: "Lightweight, fast-dry, reflective. Made to move at pace.",
    bg: "#0d1b2a",
    accent: "#00E5FF",
    accentEyebrow: "#00E5FF",
    gradient: "linear-gradient(135deg, #0284c7 0%, #00E5FF 100%)",
    gradientHover: "linear-gradient(135deg, #0369a1 0%, #00bcd4 100%)",
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
    accentEyebrow: "#f59e0b",
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    gradientHover: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
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
    accent: "#111111",
    accentEyebrow: "#262626",
    gradient: "linear-gradient(135deg, #262626 0%, #1a1a1a 100%)",
    gradientHover: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
    textColor: "text-[#262626]",
    btnClass: "bg-[#262626] text-white hover:bg-[#1a1a1a]",
    accentClass: "text-[#262626]",
  },
];

export function getCollection(slug: string): CollectionConfig | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
