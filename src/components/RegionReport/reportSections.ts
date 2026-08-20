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
// stable ASCII substrings (not the box-drawing chars) keeps this robust. The v2
// generator (build_components.py) cuts the Local Stories carousel out of the
// TEMPLATE and leaves a "SPLIT: Machines" marker at the cut, so the machines
// chunk starts exactly where a CMS story collection slots in on the page.
const iBills = TEMPLATE.indexOf("PAGE 2: Bills");
const iMachines = TEMPLATE.indexOf("SPLIT: Machines");
const cutBack = (i: number) => (i < 0 ? -1 : TEMPLATE.lastIndexOf("<!--", i));
const bBills = cutBack(iBills);
const bMachines = cutBack(iMachines);

/** Report banner + hero + opportunity stats + cumulative graph + jump-navs + economics + emissions. */
export const INTRO_HTML = TEMPLATE.slice(0, bBills);
/** Bills section: headline stat boxes + the two-tab bills chart. */
export const BILLS_HTML = TEMPLATE.slice(bBills, bMachines);
/** Solar, EV, heat pump, hot water and induction sections + their tab charts. */
export const MACHINES_HTML = TEMPLATE.slice(bMachines);

/** Fill {{token}} placeholders. */
export function sub(tpl: string, fields: Record<string, string>): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, k) => (k in fields ? fields[k] : ""));
}

/** Bundled district for a slug, falling back to Dunedin then the first entry.
 *  (The v2 bundle uses the v4.4 extractor's disambiguated slugs directly and
 *  no longer carries an NZ-wide entry, so the old slug-alias shim is gone.) */
export function getDistrict(slug?: string): District | undefined {
  return (
    (slug && DISTRICTS[slug]) ||
    DISTRICTS["dunedin"] ||
    Object.values(DISTRICTS)[0]
  );
}

function bundleKey(slug: string): string | null {
  return DISTRICTS[slug] ? slug : null;
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
    const seg = clean(window.location.pathname.split("/").filter(Boolean).pop());
    const match = bundleKey(seg);
    if (match) return match;
    // eslint-disable-next-line no-console
    if (seg) console.warn(`[RW Region Report] no bundled data for slug "${seg}" — falling back to "${fallback}". The page will show ${fallback}'s figures.`);
  }
  return DISTRICTS[fallback] ? fallback : Object.keys(DISTRICTS)[0];
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
