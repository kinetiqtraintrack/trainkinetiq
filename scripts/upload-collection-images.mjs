import fs from "fs";
import path from "path";

const PROJECT_ID = "9fvv5i6r";
const DATASET = "production";
const TOKEN = "skyg7EJhIO1WOWfpfjjjIpGdCL5EcwzQqzFgUkzugmxKCESWQ0IzNiX8QTHQPNh1NSKBjRSgQ67dJghsqsvGyGzTfUpoubhBgaMere0gs8gfQQrqRbi0sYHiwjcGtvgrQ6ugZu9HEeeZvhqFHESjBnbn8LG5C6PER04ZNpUEuOk5EFkx57aS";
const MUTATE_API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
const ASSETS_API = `https://${PROJECT_ID}.api.sanity.io/v1/assets/images/${DATASET}`;
const BASE_DIR = "/Users/joeycherubino/Documents/Kinetiq/Collection photos";

// Use the first photo from each folder as the hero image
const MAPPING = [
  { collectionId: "collection-obsidian", folder: "Obsidian" },
  { collectionId: "collection-restday",  folder: "Rest Day" },
  { collectionId: "collection-forge",    folder: "Forge" },
  { collectionId: "collection-velocity", folder: "Velocity" },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const mime = filename.match(/\.png$/i) ? "image/png" : "image/jpeg";
  const res = await fetch(`${ASSETS_API}?filename=${encodeURIComponent(filename)}`, {
    method: "POST",
    headers: { "Content-Type": mime, Authorization: `Bearer ${TOKEN}` },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
  const data = await res.json();
  return data.document._id;
}

async function patchHeroImage(collectionId, assetId) {
  const res = await fetch(MUTATE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({
      mutations: [{
        patch: {
          id: collectionId,
          set: {
            heroImage: {
              _type: "image",
              asset: { _type: "reference", _ref: assetId },
            },
          },
        },
      }],
    }),
  });
  if (!res.ok) throw new Error(`Patch failed: ${await res.text()}`);
}

async function main() {
  for (const { collectionId, folder } of MAPPING) {
    const dir = path.join(BASE_DIR, folder);
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort();

    if (files.length === 0) { console.log(`⚠ No images in ${folder}`); continue; }

    // Upload all photos — use first as hero, store the rest for reference
    console.log(`\n${collectionId} (${files.length} photos)`);
    const assetIds = [];
    for (const file of files) {
      process.stdout.write(`  uploading ${file}... `);
      const id = await uploadImage(path.join(dir, file));
      assetIds.push(id);
      console.log(`✓`);
    }

    await patchHeroImage(collectionId, assetIds[0]);
    console.log(`  → hero set to ${files[0]}`);
  }
  console.log("\nAll done.");
}

main().catch(console.error);
