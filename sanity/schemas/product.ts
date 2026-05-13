import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "collection", title: "Collection", type: "reference", to: [{ type: "collection" }], validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price ($)", type: "number", validation: (r) => r.required().positive() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "tag", title: "Badge Label (e.g. New Arrival)", type: "string" }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["XS", "S", "M", "L", "XL", "XXL"] },
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{
        type: "object",
        name: "color",
        fields: [
          defineField({ name: "name", title: "Color Name", type: "string" }),
          defineField({ name: "hex", title: "Hex Code (e.g. #111111)", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "images",
      title: "Product Images",
      description: "First image is used as the main photo. Upload multiple for a gallery.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "type",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "T-Shirt", value: "tee" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Sweater", value: "sweater" },
          { title: "Pump Cover", value: "pump-cover" },
          { title: "Shorts", value: "shorts" },
          { title: "Sweatpants", value: "sweats" },
          { title: "Beanie", value: "hat-beanie" },
          { title: "Cap", value: "hat-cap" },
        ],
      },
    }),
    defineField({
      name: "oos",
      title: "Out of Stock Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["XS", "S", "M", "L", "XL", "XXL", "One Size"] },
    }),
    defineField({ name: "rating", title: "Rating (0–5)", type: "number" }),
    defineField({ name: "reviewCount", title: "Review Count", type: "number" }),
    defineField({
      name: "fit",
      title: "Fit Details",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "fabric",
      title: "Fabric & Care",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `$${subtitle}` : "", media };
    },
  },
});
