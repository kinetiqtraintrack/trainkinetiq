import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "mission", title: "Mission Statement", type: "string", description: "Hero headline copy" }),
    defineField({ name: "story", title: "Brand Story", type: "text", description: "Multi-paragraph story (separate paragraphs with newlines)" }),
    defineField({ name: "valuesHeadline", title: "Values Section Headline", type: "string" }),
  ],
  preview: {
    select: { title: "mission" },
    prepare({ title }: { title?: string }) {
      return { title: title ?? "About Page" };
    },
  },
});
