import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const isSanityConfigured = !!projectId && projectId !== "placeholder";

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

// Write client — only used server-side for creating reviews
export const sanityWriteClient = isSanityConfigured && process.env.SANITY_API_TOKEN
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;
