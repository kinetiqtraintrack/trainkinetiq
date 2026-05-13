import { defineField, defineType } from "sanity";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "tag", title: "Tag Line (e.g. Lifting & Pump)", type: "string" }),
    defineField({ name: "description", title: "One-liner Description", type: "string", description: "Short tagline shown under the collection name" }),
    defineField({ name: "bg", title: "Background Color (hex)", type: "string", description: "e.g. #0a0a0a" }),
    defineField({ name: "accent", title: "Accent Color (hex)", type: "string", description: "e.g. #22c55e" }),
    defineField({ name: "textColor", title: "Text Color (Tailwind)", type: "string", description: "e.g. text-white or text-[#111]" }),
    defineField({ name: "btnClass", title: "Button Classes (Tailwind)", type: "string", description: "e.g. bg-white text-[#111] hover:bg-[#22c55e]" }),
    defineField({ name: "accentClass", title: "Accent Text Class (Tailwind)", type: "string", description: "e.g. text-[#22c55e]" }),
    defineField({
      name: "heroImage",
      title: "Hero / Showcase Image",
      type: "image",
      options: { hotspot: true },
      description: "Used as the background on the collection page and grid tile.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tag" },
  },
});
