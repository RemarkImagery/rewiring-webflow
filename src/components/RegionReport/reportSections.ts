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

/* ---------------------------------------------------------------------------
 * In-page jump links across shadow roots.
 *
 * Webflow renders every code component into its own shadow root, and native
 * fragment navigation only resolves ids in the light DOM. So on a live report
 * page the jump cards (inside the intro island) point at section ids that live
 * inside OTHER islands' shadow roots: document.getElementById() returns null,
 * the hash updates and the page never moves. Same for arriving on a shared
 * deep link like /regional-reports/wellington#bills.
 *
 * Fix: resolve the target by walking the document and every open shadow root,
 * then scroll to it ourselves. Installed once per page, whichever report
 * component mounts first.
 * ------------------------------------------------------------------------- */

/** Sticky site nav height — matches the template's scroll-padding-top. */
const ANCHOR_OFFSET = 80;

/** Find an element by id anywhere on the page, shadow roots included. */
export function findAnchor(id: string): HTMLElement | null {
  if (typeof document === "undefined" || !id) return null;
  const seen = new Set<ShadowRoot>();
  const walk = (root: Document | ShadowRoot): HTMLElement | null => {
    const direct = root.getElementById ? root.getElementById(id) : null;
    if (direct) return direct as HTMLElement;
    const hosts = root.querySelectorAll("*");
    for (let i = 0; i < hosts.length; i++) {
      const sr = (hosts[i] as HTMLElement).shadowRoot;
      if (sr && !seen.has(sr)) {
        seen.add(sr);
        const hit = walk(sr);
        if (hit) return hit;
      }
    }
    return null;
  };
  return walk(document);
}

/** Scroll to an id if it exists anywhere on the page. Returns whether it did. */
export function scrollToAnchor(id: string): boolean {
  const el = findAnchor(id);
  if (!el) return false;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
  return true;
}

let anchorNavInstalled = false;

/**
 * Intercept same-page anchor clicks anywhere on the page (including inside
 * other components' shadow roots) and scroll to the target ourselves.
 *
 * Deliberately conservative: only acts when the target actually resolves, so
 * Webflow's own "#" tab/slider links and any real navigation are left alone.
 */
export function installAnchorNav(): () => void {
  if (typeof document === "undefined" || anchorNavInstalled) return () => {};
  anchorNavInstalled = true;

  const onClick = (e: Event) => {
    const path = (e as MouseEvent).composedPath ? (e as MouseEvent).composedPath() : [];
    let link: HTMLAnchorElement | null = null;
    for (let i = 0; i < path.length; i++) {
      const n = path[i] as HTMLElement;
      if (n && (n as HTMLElement).tagName === "A") {
        link = n as HTMLAnchorElement;
        break;
      }
    }
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.length < 2 || href.charAt(0) !== "#") return;
    const id = href.slice(1);
    if (!scrollToAnchor(id)) return;  // unknown target: leave the click alone
    e.preventDefault();
    try {
      history.replaceState(null, "", "#" + id);
    } catch {
      /* history blocked (sandboxed preview) — the scroll already happened */
    }
  };

  // capture: the anchor may sit inside a shadow root, and composedPath() is
  // only reliable while the event is still propagating.
  document.addEventListener("click", onClick, true);

  // Landing on a deep link: islands hydrate late, so retry for a few seconds.
  const hash = (window.location.hash || "").slice(1);
  const timers: number[] = [];
  if (hash) {
    [0, 400, 1200, 2500].forEach((ms) => {
      timers.push(window.setTimeout(() => scrollToAnchor(hash), ms));
    });
  }

  return () => {
    document.removeEventListener("click", onClick, true);
    timers.forEach((t) => window.clearTimeout(t));
    anchorNavInstalled = false;
  };
}
