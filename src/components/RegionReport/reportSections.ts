// Shared engine for the CMS-bindable Region Report chunks.
//
// The v1 RwRegionReport renders the WHOLE report from bundled data pinned by
// slug. These chunks instead render one slice of the same validated template
// each, so a designer can drop them into a Regional Reports Collection Page and
// bind the per-location numbers to CMS fields. Charts still read the bundled
// per-location arrays (they can't live in CMS fields) via the record's slug.
import { CSS, TEMPLATE } from "./reportContent";
import { DISTRICTS, type District } from "./districtData";

// Split the monolithic template at its section-comment boundaries. Matching on
// stable ASCII substrings (not the box-drawing chars) keeps this robust.
const iBills = TEMPLATE.indexOf("PAGE 2: Bills");
const iSolar = TEMPLATE.indexOf("Solar & Batteries");
const cutBack = (i: number) => (i < 0 ? -1 : TEMPLATE.lastIndexOf("<!--", i));
const bBills = cutBack(iBills);
const bSolar = cutBack(iSolar);

/** Hero + opportunity stats + cumulative headline + jump-nav. */
export const INTRO_HTML = TEMPLATE.slice(0, bBills);
/** Fossil vs electric bill stat cards + the stacked bill chart. */
export const BILLS_HTML = TEMPLATE.slice(bBills, bSolar);
/** Solar, EV, heat pump, hot water and induction sections + their tab charts. */
export const MACHINES_HTML = TEMPLATE.slice(bSolar);

/** Fill {{token}} placeholders. */
export function sub(tpl: string, fields: Record<string, string>): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, k) => (k in fields ? fields[k] : ""));
}

/** Bundled district for a slug, falling back to New Zealand then the first entry. */
export function getDistrict(slug?: string): District | undefined {
  return (
    (slug && DISTRICTS[slug]) ||
    DISTRICTS["new-zealand"] ||
    Object.values(DISTRICTS)[0]
  );
}

// The CMS/URL slugs use the v4.4 extractor's disambiguated district/region
// names; the bundled data predates that split and uses combined names. Map the
// CMS slugs that lack an exact bundle entry to the closest bundled dataset so
// every page renders real data. (Unitary authorities share one dataset; Waikato
// district vs region is approximate until the bundle is regenerated.)
const SLUG_ALIASES: Record<string, string> = {
  "auckland-region": "auckland",
  "gisborne-district": "gisborne",
  "gisborne-region": "gisborne",
  "hawke-s-bay-region": "hawke-s-bay",
  "marlborough-district": "marlborough",
  "marlborough-region": "marlborough",
  "nelson-city": "nelson",
  "nelson-region": "nelson",
  "tasman-district": "tasman",
  "tasman-region": "tasman",
  "waikato-district": "waikato",
  "waikato-region": "waikato",
};

function bundleKey(slug: string): string | null {
  if (DISTRICTS[slug]) return slug;
  const alias = SLUG_ALIASES[slug];
  return alias && DISTRICTS[alias] ? alias : null;
}

/**
 * Which location to render. An explicit override wins; otherwise the slug is
 * taken from the last segment of the page URL (the Webflow Collection Page path,
 * e.g. /regional-reports/dunedin), so the hard-coded data is chosen at page load
 * with no CMS binding. Falls back to a friendly default on the Designer canvas
 * (and any path with no matching region).
 */
export function resolveSlug(override?: string, fallback = "dunedin"): string {
  const clean = (s?: string | null) => (s ?? "").trim().toLowerCase();
  const o = bundleKey(clean(override));
  if (o) return o;
  if (typeof window !== "undefined") {
    const seg = bundleKey(clean(window.location.pathname.split("/").filter(Boolean).pop()));
    if (seg) return seg;
  }
  return DISTRICTS[fallback] ? fallback : "new-zealand";
}

/**
 * Merge CMS prop overrides over the bundled per-location fields. An empty/absent
 * prop keeps the bundled value, so an unbound instance still renders real data.
 */
export function mergeFields(slug: string | undefined, overrides: Record<string, string | undefined>): Record<string, string> {
  const d = getDistrict(slug);
  const fields: Record<string, string> = { ...(d?.fields ?? {}) };
  for (const [k, v] of Object.entries(overrides)) {
    if (v != null && v !== "") fields[k] = v;
  }
  return fields;
}

/** Inject the shared, fully-scoped report stylesheet once per page. */
export function ensureReportCss(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("rw-report-css")) return;
  const style = document.createElement("style");
  style.id = "rw-report-css";
  style.textContent = CSS;
  document.head.appendChild(style);
}

/**
 * Per-chunk reveal-on-scroll, scoped to one root. Jump-nav uses native anchor
 * navigation so links resolve to section IDs living in sibling chunks.
 * Returns a cleanup fn.
 */
export function initReveal(root: HTMLElement): () => void {
  if (typeof window === "undefined") return () => {};
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return () => {};
  const blocks = root.querySelectorAll(".jumpnav, .section-head, .two-col, .container > .prose, .chart-wrap, .headline-stats, .cumulative-block");
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  blocks.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
  return () => io.disconnect();
}

export { DISTRICTS };
export type { District };
