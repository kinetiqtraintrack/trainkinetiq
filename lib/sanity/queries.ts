import { sanityClient, isSanityConfigured } from "./client";
import type { Product } from "../products";
import type { CollectionConfig } from "../collections";

// ─── Products ─────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  "id": _id,
  "slug": slug.current,
  name,
  "collection": collection->slug.current,
  price,
  description,
  sizes,
  colors[] { name, hex },
  tag,
  "images": images[].asset->url
`;

export async function getSanityProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "product"] | order(name asc) { ${PRODUCT_FIELDS} }`,
      {},
      { next: { tags: ["products"], revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export async function getSanityProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`,
      { slug },
      { next: { tags: ["products"], revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

export async function getSanityProductsByCollection(collectionSlug: string): Promise<Product[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && collection->slug.current == $collection] | order(name asc) { ${PRODUCT_FIELDS} }`,
      { collection: collectionSlug },
      { next: { tags: ["products"], revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

// ─── Collections ──────────────────────────────────────────────────────────────

const COLLECTION_FIELDS = `
  "slug": slug.current,
  name,
  tag,
  bg,
  accent,
  textColor,
  btnClass,
  accentClass
`;

export async function getSanityCollections(): Promise<CollectionConfig[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "collection"] | order(name asc) { ${COLLECTION_FIELDS} }`,
      {},
      { next: { tags: ["collections"], revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export async function getSanityCollection(slug: string): Promise<CollectionConfig | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch(
      `*[_type == "collection" && slug.current == $slug][0] { ${COLLECTION_FIELDS} }`,
      { slug },
      { next: { tags: ["collections"], revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface SanityReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  product?: string;
  date?: string;
}

export async function getSanityReviews(): Promise<SanityReview[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "review" && approved == true] | order(_createdAt desc) {
        "id": _id,
        name,
        rating,
        text,
        product,
        "date": string(_createdAt)[0..9]
      }`,
      {},
      { next: { tags: ["reviews"], revalidate: 60 } }
    );
  } catch {
    return [];
  }
}
