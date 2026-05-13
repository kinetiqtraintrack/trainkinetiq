import fs from "fs";
import path from "path";

const PROJECT_ID = "9fvv5i6r";
const DATASET = "production";
const TOKEN = "skyg7EJhIO1WOWfpfjjjIpGdCL5EcwzQqzFgUkzugmxKCESWQ0IzNiX8QTHQPNh1NSKBjRSgQ67dJghsqsvGyGzTfUpoubhBgaMere0gs8gfQQrqRbi0sYHiwjcGtvgrQ6ugZu9HEeeZvhqFHESjBnbn8LG5C6PER04ZNpUEuOk5EFkx57aS";
const ASSETS_API = `https://${PROJECT_ID}.api.sanity.io/v1/assets/images/${DATASET}`;
const MUTATE_API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
const BASE = "/Users/joeycherubino/Documents/Kinetiq/Collection photos";

// Patch both documents for Obsidian (duplicate in Sanity)
const MAPPING = [
  { ids: ["collection-obsidian", "56f835eb-9779-41f7-b0d8-454a07e8adbf"], folder: "Obsidian" },
  { ids: ["collection-restday"],  folder: "Rest Day" },
  { ids: ["collection-forge"],    folder: "Forge" },
  { ids: ["collection-velocity"], folder: "Velocity" },
];

async function upload(filePath) {
  const buf = fs.readFileSync(filePath);
  const name = path.basename(filePath);
  const mime = name.match(/\.png$/i) ? "image/png" : "image/jpeg";
  const res = await fetch(`${ASSETS_API}?filename=${encodeURIComponent(name)}`, {
    method: "POST",
    headers: { "Content-Type": mime, Authorization: `Bearer ${TOKEN}` },
    body: buf,
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).document._id;
}

async function patch(id, assetIds) {
  const items = assetIds.map((ref, i) => ({
    _type: "image", _key: `showcase-${i}`,
    asset: { _type: "reference", _ref: ref },
  }));
  const res = await fetch(MUTATE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ patch: { id, set: { showcaseImages: items } } }] }),
  });
  if (!res.ok) throw new Error(await res.text());
}

async function main() {
  for (const { ids, folder } of MAPPING) {
    const dir = path.join(BASE, folder);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
    console.log(`\n${folder} (${files.length} photos)`);

    const assetIds = [];
    for (const f of files) {
      process.stdout.write(`  ${f}... `);
      assetIds.push(await upload(path.join(dir, f)));
      console.log("✓");
    }

    for (const id of ids) {
      await patch(id, assetIds);
      console.log(`  → patched ${id}`);
    }
  }
  console.log("\nDone.");
}

main().catch(console.error);
