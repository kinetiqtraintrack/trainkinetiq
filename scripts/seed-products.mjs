// Migration: replace old Sanity products with the 13-product v2 catalog
const PROJECT_ID = "9fvv5i6r";
const DATASET = "production";
const TOKEN = "skyg7EJhIO1WOWfpfjjjIpGdCL5EcwzQqzFgUkzugmxKCESWQ0IzNiX8QTHQPNh1NSKBjRSgQ67dJghsqsvGyGzTfUpoubhBgaMere0gs8gfQQrqRbi0sYHiwjcGtvgrQ6ugZu9HEeeZvhqFHESjBnbn8LG5C6PER04ZNpUEuOk5EFkx57aS";
const API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

const COLLECTION_REFS = {
  obsidian: "collection-obsidian",
  restday: "collection-restday",
  forge: "collection-forge",
  velocity: "collection-velocity",
};

const OLD_IDS = [
  "product-forge-cargo-pants",
  "product-forge-quarter-zip",
  "product-obsidian-oversized-tee",
  "product-obsidian-pump-cover-hoodie",
  "product-rest-day-lounge-hoodie",
  "product-rest-day-sweat-shorts",
  "product-velocity-race-shorts",
  "product-velocity-wind-jacket",
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const HAT_SIZES = ["One Size"];

function colors(list) {
  return list.map(([name, hex], i) => ({
    _type: "color",
    _key: `color-${i}`,
    name,
    hex,
  }));
}

const PRODUCTS = [
  // ─── Obsidian (3) ────────────────────────────────────────────────────────────
  {
    _id: "product-obsidian-boxy-pump-cover",
    _type: "product",
    name: "Boxy Fit Pump Cover",
    slug: { _type: "slug", current: "obsidian-boxy-pump-cover" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.obsidian },
    type: "pump-cover",
    price: 52,
    tag: "New Arrival",
    description: "Sleeveless, drop-armhole pump cover. Heavy cotton, raw hem, designed to get bigger every wash.",
    colors: colors([["Black", "#111"], ["Charcoal", "#2d2d2d"], ["Bone", "#e8e3d8"]]),
    sizes: APPAREL_SIZES,
    oos: ["XS"],
    fit: ["Boxy, oversized fit", "Deep armholes for pump days", "Falls below the hip"],
    fabric: ["260gsm heavyweight cotton", "Garment dyed, pre-shrunk", "Raw hem detail"],
    rating: 4.9,
    reviewCount: 612,
  },
  {
    _id: "product-obsidian-boxy-pump-hoodie",
    _type: "product",
    name: "Boxy Fit Pump Hoodie",
    slug: { _type: "slug", current: "obsidian-boxy-pump-hoodie" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.obsidian },
    type: "hoodie",
    price: 92,
    tag: "New Arrival",
    description: "Oversized pre-workout hoodie. Boxy cut, dropped shoulder, kangaroo pocket. Pull it on, get warm, hit the bar.",
    colors: colors([["Black", "#111"], ["Charcoal", "#2d2d2d"]]),
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ["Boxy, drop-shoulder fit", "Hood lined in heavy jersey", "Cropped slightly for layering"],
    fabric: ["420gsm brushed fleece", "100% organic cotton face", "Rib cuffs and hem"],
    rating: 4.9,
    reviewCount: 484,
  },
  {
    _id: "product-obsidian-heavyweight-shorts",
    _type: "product",
    name: "Obsidian Heavyweight Shorts",
    slug: { _type: "slug", current: "obsidian-heavyweight-shorts" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.obsidian },
    type: "shorts",
    price: 58,
    tag: "Best Seller",
    description: "Heavy mesh gym shorts. 7-inch inseam, drawcord waist, deep pockets. Built for the squat rack.",
    colors: colors([["Black", "#111"], ["Charcoal", "#2d2d2d"]]),
    sizes: APPAREL_SIZES,
    oos: [],
    fit: ['Relaxed, true to size', '7" inseam', "Elastic waistband with drawcord"],
    fabric: ["Heavyweight mesh polyester", "Side and back pockets", "Moisture-wicking liner"],
    rating: 4.8,
    reviewCount: 318,
  },

  // ─── Rest Day (4) ─────────────────────────────────────────────────────────────
  {
    _id: "product-restday-essential-tee",
    _type: "product",
    name: "Essential Tee",
    slug: { _type: "slug", current: "restday-essential-tee" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.restday },
    type: "tee",
    price: 38,
    tag: "New Arrival",
    description: "The everyday tee. Heavy enough to hold its shape, soft enough to disappear. Boxy fit, just the way it should be.",
    colors: colors([["Cream", "#f5f0e8"], ["Bone", "#e8e3d8"], ["Black", "#111"], ["Grey", "#9ca3af"]]),
    sizes: APPAREL_SIZES,
    oos: ["S"],
    fit: ["Relaxed, boxy fit", "Drop shoulder", "True to size"],
    fabric: ["220gsm combed cotton", "Pre-washed, no shrinkage", "Ribbed crew neck"],
    rating: 4.9,
    reviewCount: 921,
  },
  {
    _id: "product-restday-puff-hoodie",
    _type: "product",
    name: "Puff Hoodie",
    slug: { _type: "slug", current: "restday-puff-hoodie" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.restday },
    type: "hoodie",
    price: 95,
    tag: "New Arrival",
    description: "Brushed fleece interior, oversized fit, kangaroo pocket. Made for doing absolutely nothing.",
    colors: colors([["Cream", "#f5f0e8"], ["Grey", "#9ca3af"], ["Black", "#111"]]),
    sizes: APPAREL_SIZES,
    oos: ["M"],
    fit: ["Oversized, relaxed fit", "Drop shoulder, long body", "Size down for a regular fit"],
    fabric: ["380gsm brushed fleece", "100% organic cotton face", "Ribbed cuffs and hem"],
    rating: 4.9,
    reviewCount: 1207,
  },
  {
    _id: "product-restday-lounger-sweats",
    _type: "product",
    name: "Lounger Sweats",
    slug: { _type: "slug", current: "restday-lounger-sweats" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.restday },
    type: "sweats",
    price: 78,
    tag: "New Arrival",
    description: "Match the hoodie. Tapered leg, elastic waist, side pockets. Pull-on comfort with a sharp silhouette.",
    colors: colors([["Cream", "#f5f0e8"], ["Grey", "#9ca3af"], ["Black", "#111"]]),
    sizes: APPAREL_SIZES,
    oos: [],
    fit: ["Slim-tapered fit", "Elastic waistband + drawcord", "Ribbed ankle cuff"],
    fabric: ["380gsm brushed fleece", "Same fabric as Puff Hoodie", "Side and back pockets"],
    rating: 4.8,
    reviewCount: 543,
  },
  {
    _id: "product-restday-beanie",
    _type: "product",
    name: "Rest Day Beanie",
    slug: { _type: "slug", current: "restday-beanie" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.restday },
    type: "hat-beanie",
    price: 28,
    tag: "New Arrival",
    description: "Ribbed knit beanie. Single fold, embroidered K mark. Wear it everywhere.",
    colors: colors([["Cream", "#f5f0e8"], ["Grey", "#9ca3af"], ["Black", "#111"]]),
    sizes: HAT_SIZES,
    oos: [],
    fit: ["One size fits most", "Ribbed, single fold", "Embroidered K mark at fold"],
    fabric: ["100% merino wool", "Hand wash, lay flat to dry"],
    rating: 4.9,
    reviewCount: 188,
  },

  // ─── Forge (3) ────────────────────────────────────────────────────────────────
  {
    _id: "product-forge-work-tee",
    _type: "product",
    name: "Work Tee",
    slug: { _type: "slug", current: "forge-work-tee" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.forge },
    type: "tee",
    price: 44,
    tag: "New Arrival",
    description: "Heavyweight workwear tee. Reinforced shoulder seams, dropped pocket, made to be beaten up.",
    colors: colors([["Olive", "#4a5240"], ["Black", "#111"], ["Sand", "#c4b89e"]]),
    sizes: APPAREL_SIZES,
    oos: ["XS"],
    fit: ["Relaxed workwear fit", "Reinforced shoulder seams", "Chest patch pocket"],
    fabric: ["280gsm heavyweight cotton", "Pre-washed for soft hand", "Triple-stitched seams"],
    rating: 4.8,
    reviewCount: 246,
  },
  {
    _id: "product-forge-work-sweater",
    _type: "product",
    name: "Work Sweater",
    slug: { _type: "slug", current: "forge-work-sweater" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.forge },
    type: "sweater",
    price: 110,
    tag: "New Arrival",
    description: "Thick knit crewneck sweater. Made for cold mornings and long days. Wears in, never out.",
    colors: colors([["Olive", "#4a5240"], ["Charcoal", "#2d2d2d"], ["Sand", "#c4b89e"]]),
    sizes: APPAREL_SIZES,
    oos: ["S"],
    fit: ["Relaxed, slightly cropped", "Drop shoulder", "Ribbed cuffs, hem and collar"],
    fabric: ["100% lambswool, mid-weight", "Garment washed", "Reinforced elbow patches"],
    rating: 4.9,
    reviewCount: 178,
  },
  {
    _id: "product-forge-work-cap",
    _type: "product",
    name: "Work Cap",
    slug: { _type: "slug", current: "forge-work-cap" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.forge },
    type: "hat-cap",
    price: 34,
    tag: "New Arrival",
    description: "6-panel washed cotton cap. Curved brim, embroidered K mark, adjustable rear strap.",
    colors: colors([["Olive", "#4a5240"], ["Black", "#111"], ["Sand", "#c4b89e"]]),
    sizes: HAT_SIZES,
    oos: [],
    fit: ["6-panel, curved brim", "Adjustable strap back", "One size fits most"],
    fabric: ["Washed cotton twill", "Sweatband lined", "Embroidered K mark"],
    rating: 4.8,
    reviewCount: 134,
  },

  // ─── Velocity (3) ─────────────────────────────────────────────────────────────
  {
    _id: "product-velocity-performance-tee",
    _type: "product",
    name: "Performance Tee",
    slug: { _type: "slug", current: "velocity-performance-tee" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.velocity },
    type: "tee",
    price: 48,
    tag: "New Arrival",
    description: "Lightweight, fast-drying performance tee. Bonded seams, reflective hits, athletic fit.",
    colors: colors([["Navy", "#0d1b2a"], ["Cyan", "#00E5FF"], ["Black", "#111"]]),
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ["Athletic, slim fit", "Bonded seams (no chafing)", "True to size"],
    fabric: ["4-way stretch microfiber", "Wicks moisture, dries fast", "Reflective trim at rear neck"],
    rating: 4.8,
    reviewCount: 412,
  },
  {
    _id: "product-velocity-runners-cap",
    _type: "product",
    name: "Runners Cap",
    slug: { _type: "slug", current: "velocity-runners-cap" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.velocity },
    type: "hat-cap",
    price: 36,
    tag: "New Arrival",
    description: "Ultralight 5-panel running cap. Mesh side panels, reflective brim, no-slip headband.",
    colors: colors([["Navy", "#0d1b2a"], ["Cyan", "#00E5FF"], ["Black", "#111"]]),
    sizes: HAT_SIZES,
    oos: [],
    fit: ["5-panel, low profile", "Mesh side panels for airflow", "Reflective trim around brim"],
    fabric: ["Recycled polyester ripstop", "Silicone no-slip sweatband", "38g total weight"],
    rating: 4.9,
    reviewCount: 96,
  },
  {
    _id: "product-velocity-performance-shorts",
    _type: "product",
    name: "Performance Shorts",
    slug: { _type: "slug", current: "velocity-performance-shorts" },
    collection: { _type: "reference", _ref: COLLECTION_REFS.velocity },
    type: "shorts",
    price: 62,
    tag: "Best Seller",
    description: "5-inch inseam, built-in liner, reflective hits. Made to move at pace. The shorts that disappear when you run.",
    colors: colors([["Navy", "#0d1b2a"], ["Cyan", "#00E5FF"], ["Black", "#111"]]),
    sizes: APPAREL_SIZES,
    oos: ["XXL"],
    fit: ['Athletic, true to size', '5" inseam, built-in liner', "Elastic waistband with drawcord"],
    fabric: ["4-way stretch lightweight woven", "DWR water-resistant finish", "Reflective rear panel"],
    rating: 4.8,
    reviewCount: 962,
  },
];

async function mutate(mutations) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Error:", JSON.stringify(data, null, 2));
    process.exit(1);
  }
  return data;
}

async function main() {
  console.log("Deleting 8 old products...");
  const deletions = OLD_IDS.map((id) => ({ delete: { id } }));
  const delResult = await mutate(deletions);
  console.log(`  ✓ Deleted: ${delResult.results?.length ?? 0} documents`);

  console.log("Creating 13 new products...");
  const creations = PRODUCTS.map((doc) => ({ createOrReplace: doc }));
  const createResult = await mutate(creations);
  console.log(`  ✓ Created: ${createResult.results?.length ?? 0} documents`);

  console.log("\nDone. Verifying...");
  const verifyRes = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*[_type%3D%3D"product"]{_id,"slug":slug.current,name,type}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const verify = await verifyRes.json();
  console.log(`\nSanity now has ${verify.result.length} products:`);
  verify.result.forEach((p) => console.log(`  • ${p.slug} (${p.type ?? "no type"})`));
}

main().catch(console.error);
