// Shared engine for the CMS-bindable Region Report chunks.
//
// The v1 RwRegionReport renders the WHOLE report from bundled data pinned by
// slug. These chunks instead render one slice of the same validated template
// each, so a designer can drop them into a Regional Reports Collection Page and
// bind the per-location numbers to CMS fields. Charts still read the bundled
// per-location arrays (they can't live in CMS fields) via the record's slug.
import { CSS, TEMPLATE } from "./reportContent";
import { EDITABLE_TEXT } from "./reportEditable";
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
/**
 * Put the report CSS where this component can actually see it.
 *
 * Webflow renders each code component inside its own shadow root, and a
 * stylesheet in document.head never crosses that boundary - so the chunk
 * components were unstyled the moment they were placed on a live page. Given
 * the component's root element, the CSS is injected into ITS shadow root (once
 * per root); on a plain page it falls back to document.head as before.
 */
export function ensureReportCss(root?: Element | null): void {
  if (typeof document === "undefined") return;
  const scope = root ? root.getRootNode() : document;
  const inShadow = typeof ShadowRoot !== "undefined" && scope instanceof ShadowRoot;
  const host: ParentNode = inShadow ? (scope as ShadowRoot) : document.head;
  if (host.querySelector('style[data-rw-report-css]')) return;
  const style = document.createElement("style");
  style.setAttribute("data-rw-report-css", "");
  style.textContent = CSS;
  host.appendChild(style);
}

/**
 * H4: a page whose slug matches nothing must say so, not show Dunedin.
 *
 * Returns the offending slug when either (a) the districtSlug prop names a
 * location that isn't bundled, or (b) the page URL sits under
 * /regional-reports/<slug> and <slug> isn't bundled - the Collection Page
 * case, where Webflow's slugger ("hawkes-bay") can disagree with ours
 * ("hawke-s-bay"). Anywhere else (Designer canvas, harness pages, the site
 * root) the Dunedin default still applies so designers see a populated page.
 */
export function unmatchedLiveSlug(override?: string): string | null {
  const clean = (s?: string | null) => (s ?? "").trim().toLowerCase();
  const o = clean(override);
  if (o) return bundleKey(o) ? null : o;
  if (typeof window === "undefined") return null;
  const parts = window.location.pathname.split("/").filter(Boolean);
  const i = parts.indexOf("regional-reports");
  if (i < 0 || i === parts.length - 1) return null;
  const seg = clean(parts[i + 1]);
  return bundleKey(seg) ? null : seg;
}

/** The visible notice rendered in place of a report when the slug matches nothing. */
export function noDataHtml(slug: string): string {
  const safe = slug.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));
  return (
    '<div data-rw-no-data style="font-family:Rubik,system-ui,sans-serif;max-width:720px;margin:48px auto;padding:24px 28px;' +
    'border:2px dashed #c0392b;border-radius:12px;color:#1a3c3c;background:#fff8f6;">' +
    "<strong>No report data for &ldquo;" + safe + "&rdquo;.</strong> " +
    "The page slug must match a location in the report bundle (for example <code>hawke-s-bay</code>, not <code>hawkes-bay</code>). " +
    "Set the District slug property on this component, or rename the page slug." +
    "</div>"
  );
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

let anchorNavRefs = 0;
let anchorNavTeardown: (() => void) | null = null;

/**
 * Intercept same-page anchor clicks anywhere on the page (including inside
 * other components' shadow roots) and scroll to the target ourselves.
 *
 * Deliberately conservative: only acts when the target actually resolves, so
 * Webflow's own "#" tab/slider links and any real navigation are left alone.
 */
export function installAnchorNav(): () => void {
  if (typeof document === "undefined") return () => {};
  // Reference-counted: several islands call this; the listener lives as long
  // as ANY of them is mounted, so unmounting one island doesn't kill the jump
  // links for the others.
  anchorNavRefs += 1;
  if (anchorNavRefs > 1) {
    return () => {
      anchorNavRefs -= 1;
      if (anchorNavRefs === 0 && anchorNavTeardown) anchorNavTeardown();
    };
  }

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
      timers.push(window.setTimeout(() => {
        // stop retrying once it has worked, so a reader who has started
        // scrolling isn't yanked back
        if (scrollToAnchor(hash)) timers.forEach((t) => window.clearTimeout(t));
      }, ms));
    });
  }

  anchorNavTeardown = () => {
    document.removeEventListener("click", onClick, true);
    timers.forEach((t) => window.clearTimeout(t));
    anchorNavTeardown = null;
  };
  return () => {
    anchorNavRefs -= 1;
    if (anchorNavRefs === 0 && anchorNavTeardown) anchorNavTeardown();
  };
}

/**
 * Swap in copy edited from Webflow's properties panel.
 *
 * Runs on the raw template BEFORE sub(), so an edited sentence keeps working
 * with its {{tokens}}: a designer can rewrite the wording and each location's
 * own figures still fill in. Values matching the default (or blank) are
 * skipped, and a string that isn't in this chunk is simply not found - the
 * same overrides object can be handed to every chunk.
 */
export function applyTextOverrides(html: string, overrides: Record<string, unknown>): string {
  if (!overrides) return html;
  let out = html;
  for (const item of EDITABLE_TEXT) {
    const raw = overrides[item.key];
    if (typeof raw !== "string") continue;
    const val = raw.trim();
    if (!val || val === item.def) continue;
    const from = item.wrap ? '<span class="squiggle-under">' + item.def + "</span>" : item.def;
    const to = item.wrap ? '<span class="squiggle-under">' + val + "</span>" : val;
    if (out.indexOf(from) < 0) continue;
    // function form: a literal "$&" in the new copy must not be treated as a
    // replacement pattern
    out = out.replace(from, () => to);
  }
  return out;
}
