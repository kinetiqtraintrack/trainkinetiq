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
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `$${subtitle}` : "", media };
    },
  },
});
