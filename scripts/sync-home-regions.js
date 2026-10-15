// Rewrites src/components/HomePage/regionalReportsHomeData.ts from the META
// list in districtData.ts (minus the national page). Run after a data regen:
//   node scripts/sync-home-regions.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "src/components/RegionReport/districtData.ts"), "utf8");
const meta = JSON.parse(src.match(/export const META: DistrictMeta\[\] = (\[.*?\]);/)[1]).filter(
  (m) => m.type !== "Country",
);

const rows = meta.map((m) => "  " + JSON.stringify([m.slug, m.location, m.type]) + ",").join("\n");
const out = `// Slim copy of districtData META for the homepage section, so the homepage
// doesn't load the ~3MB report bundle. regionalReportsHome.test.ts fails if it
// drifts from districtData.ts: after a data regen, refresh it with
//   node scripts/sync-home-regions.js
// [slug, location name, location type]
export const HOME_REGIONS: [string, string, string][] = [
${rows}
];
`;
fs.writeFileSync(path.join(root, "src/components/HomePage/regionalReportsHomeData.ts"), out);
console.log(`${meta.length} locations written`);
