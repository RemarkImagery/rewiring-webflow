"use client";

// Site search across www.rewiring.nz and pages.rewiring.nz. Webflow's built-in
// search only knows Webflow pages, so this queries a Pagefind index built nightly
// by RemarkImagery/rewiring-search (Cloudflare Pages) that crawls both sites.
// Reads and writes ?query= so the nav search form (action=/search) lands here.
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_INDEX = "https://rewiring-search.pages.dev/pagefind/pagefind.js";

interface PagefindResult {
  meta: { title?: string; liveurl?: string; description?: string; image?: string };
  filters: { site?: string[] };
  excerpt: string;
}
interface Pagefind {
  options: (o: Record<string, unknown>) => Promise<void>;
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] } | null>;
}

export interface RwSiteSearchProps {
  /** URL of pagefind.js on the hosted index. */
  indexUrl?: string;
  heading?: string;
  placeholder?: string;
  /** Results shown per "Show more" step. */
  pageSize?: number;
  showImages?: boolean;
  inkColor?: string;
  mutedColor?: string;
  accentColor?: string;
  goldColor?: string;
  cardColor?: string;
}

let pagefindPromise: Promise<Pagefind> | null = null;
function loadPagefind(url: string): Promise<Pagefind> {
  if (!pagefindPromise) {
    pagefindPromise = (import(/* webpackIgnore: true */ url) as Promise<Pagefind>).then(async (pf) => {
      await pf.options({ excerptLength: 28 });
      return pf;
    });
    pagefindPromise.catch(() => { pagefindPromise = null; });
  }
  return pagefindPromise;
}

function readQuery(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("query") || "";
}

export default function RwSiteSearch({
  indexUrl = DEFAULT_INDEX,
  heading = "Search",
  placeholder = "Search Rewiring Aotearoa…",
  pageSize = 10,
  showImages = true,
  inkColor = "#1a3c3c",
  mutedColor = "#5c7a78",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
  cardColor = "#ffffff",
}: RwSiteSearchProps) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<{ data: () => Promise<PagefindResult> }[]>([]);
  const [rows, setRows] = useState<PagefindResult[]>([]);
  const [shown, setShown] = useState(pageSize);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const searchId = useRef(0);

  useEffect(() => { setQuery(readQuery()); }, []);

  // Debounced search; a stale response is dropped if the query moved on.
  useEffect(() => {
    const q = query.trim();
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("query", q); else url.searchParams.delete("query");
    window.history.replaceState(null, "", url.toString());
    if (!q) { setHits([]); setRows([]); setStatus("idle"); return; }

    const id = ++searchId.current;
    setStatus("loading");
    const t = window.setTimeout(async () => {
      try {
        const pf = await loadPagefind(indexUrl);
        const res = await pf.search(q);
        if (id !== searchId.current || !res) return;
        setHits(res.results);
        setShown(pageSize);
        setStatus("done");
      } catch {
        if (id === searchId.current) setStatus("error");
      }
    }, 220);
    return () => window.clearTimeout(t);
  }, [query, indexUrl, pageSize]);

  useEffect(() => {
    let live = true;
    Promise.all(hits.slice(0, shown).map((h) => h.data())).then((d) => { if (live) setRows(d); });
    return () => { live = false; };
  }, [hits, shown]);

  const q = query.trim();

  return (
    <section className="rw-search" role="search">
      <style>{`
        .rw-search, .rw-search * { box-sizing: border-box; }
        .rw-search { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 860px; margin: 0 auto; padding: 48px 16px 64px; }
        .rw-search h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: ${accentColor}; margin: 0 0 20px; line-height: 1.1; }
        .rw-search .rw-s-form { display: flex; gap: 10px; }
        .rw-search input { flex: 1; min-width: 0; font: inherit; font-size: 18px; color: ${inkColor}; background: #fff; border: 2px solid ${accentColor}; border-radius: 12px; padding: 14px 16px; }
        .rw-search input:focus-visible { outline: 3px solid ${goldColor}; outline-offset: 2px; }
        .rw-search .rw-s-status { min-height: 24px; margin: 16px 0 8px; font-size: 15px; color: ${mutedColor}; }
        .rw-search ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
        .rw-search li { display: flex; gap: 16px; background: ${cardColor}; border-radius: 14px; padding: 18px 20px; }
        .rw-search .rw-s-thumb { flex: 0 0 120px; height: 80px; border-radius: 8px; object-fit: cover; background: #f7efd4; }
        .rw-search .rw-s-body { min-width: 0; }
        .rw-search .rw-s-site { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: .02em; color: ${mutedColor}; margin-bottom: 4px; }
        .rw-search a.rw-s-title { display: block; font-size: 19px; font-weight: 600; line-height: 1.3; color: ${accentColor}; text-decoration: none; }
        .rw-search a.rw-s-title:hover { text-decoration: underline; text-decoration-color: ${goldColor}; text-decoration-thickness: 2px; text-underline-offset: 3px; }
        .rw-search p { margin: 6px 0 0; font-size: 15px; line-height: 1.55; color: ${inkColor}; overflow-wrap: anywhere; }
        .rw-search mark { background: ${goldColor}55; color: inherit; padding: 0 1px; border-radius: 2px; }
        .rw-search .rw-s-more { display: block; margin: 24px auto 0; font: inherit; font-size: 15px; font-weight: 700; color: ${inkColor}; background: ${goldColor}; border: none; border-radius: 100px; padding: 12px 26px; cursor: pointer; transition: background-color .15s ease, transform .15s ease; }
        .rw-search .rw-s-more:hover { background: #ffc94d; transform: translateY(-1px); }
        @media (max-width: 600px) {
          .rw-search .rw-s-thumb { display: none; }
          .rw-search li { padding: 16px; }
        }
      `}</style>

      {heading ? <h1>{heading}</h1> : null}
      <form className="rw-s-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          name="query"
          aria-label="Search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </form>

      <div className="rw-s-status" aria-live="polite">
        {status === "loading" && "Searching…"}
        {status === "error" && "Search isn't available right now. Please try again shortly."}
        {status === "done" && (hits.length
          ? `${hits.length} result${hits.length === 1 ? "" : "s"} for “${q}”`
          : `No results for “${q}”. Try fewer or different words.`)}
      </div>

      {status !== "error" && rows.length > 0 && (
        <ol>
          {rows.map((r, i) => (
            <li key={`${r.meta.liveurl}-${i}`}>
              {showImages && r.meta.image ? <img className="rw-s-thumb" src={r.meta.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
              <div className="rw-s-body">
                {r.filters.site?.[0] ? <span className="rw-s-site">{r.filters.site[0]}</span> : null}
                <a className="rw-s-title" href={r.meta.liveurl}>{r.meta.title || r.meta.liveurl}</a>
                {/* Pagefind escapes page text and only adds <mark> tags. */}
                <p dangerouslySetInnerHTML={{ __html: r.excerpt }} />
              </div>
            </li>
          ))}
        </ol>
      )}

      {status === "done" && shown < hits.length && (
        <button type="button" className="rw-s-more" onClick={() => setShown((n) => n + pageSize)}>
          Show more results
        </button>
      )}
    </section>
  );
}
