import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating (1–5)", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "text", title: "Review Text", type: "text", validation: (r) => r.required() }),
    defineField({ name: "product", title: "Product (optional)", type: "string" }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this review from the site.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "text" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 60) };
    },
  },
});
