export type CollectionSlug = "obsidian" | "velocity" | "forge" | "restday";

export interface CollectionConfig {
  slug: CollectionSlug;
  name: string;
  tag: string;
  bg: string;
  accent: string;
  textColor: string;
  btnClass: string;
  accentClass: string;
}

export const COLLECTIONS: CollectionConfig[] = [
  {
    slug: "obsidian",
    name: "Obsidian",
    tag: "Lifting & Pump",
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
    bg: "#f0ede8",
    accent: "#111",
    textColor: "text-[#111]",
    btnClass: "bg-[#111] text-white hover:bg-[#333]",
    accentClass: "text-[#111] opacity-50",
  },
];

export function getCollection(slug: string): CollectionConfig | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
