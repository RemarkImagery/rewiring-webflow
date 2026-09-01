"use client";

// Full landing page for rewiring.nz/regional-reports: hero, optional feature
// link to the national New Zealand report, the searchable directory of every
// location report, and a closing CTA band. Everything a copywriter would want
// to change is a prop, so the page can be placed once and edited entirely from
// the Webflow properties panel.
//
// The directory is the same data + grouping as RwRegionIndex (kept as the
// standalone section component); this one wraps it in the whole page.
import React, { useId, useMemo, useState } from "react";
import { META } from "./districtData";

interface ImageValue {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface LinkValue {
  href: string;
  target?: string;
}

const GROUP_ORDER = ["City council", "District council", "Region"];

const linkHref = (v?: LinkValue): string => {
  const h = (v?.href || "").trim();
  return h && h !== "#" ? h : "";
};

const isExternal = (href: string) => /^(https?:\/\/|www\.)/i.test(href);

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export interface RwRegionIndexPageProps {
  /* Hero */
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: ImageValue;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  /* Search */
  showSearch?: boolean;
  searchPlaceholder?: string;
  /** "{n}" is replaced with the number of locations currently shown. */
  countTemplate?: string;
  noResultsText?: string;
  /* New Zealand feature link */
  nzUrl?: LinkValue;
  nzLabel?: string;
  nzBlurb?: string;
  /* Directory */
  directoryTitle?: string;
  directoryIntro?: string;
  cityHeading?: string;
  districtHeading?: string;
  regionHeading?: string;
  /** Path prefix for the report links; the location slug is appended. */
  basePath?: string;
  /* Closing CTA */
  showCta?: boolean;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaUrl?: LinkValue;
  /* Style */
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
  creamColor?: string;
  heroFromColor?: string;
  heroToColor?: string;
  onDarkColor?: string;
}

export default function RwRegionIndexPage({
  heroEyebrow = "Regional reports",
  heroTitle = "Electrifying Aotearoa, one place at a time",
  heroSubtitle = "Every city, district and region in New Zealand has its own electrification story. Find yours to see what households, the local economy and emissions stand to gain from going electric.",
  heroImage,
  stat1Value = "82",
  stat1Label = "locations covered",
  stat2Value = "6",
  stat2Label = "machines to swap",
  stat3Value = "2026",
  stat3Label = "electrification model",
  showSearch = true,
  searchPlaceholder = "Search for your city, district or region…",
  countTemplate = "{n} locations",
  noResultsText = "No locations match that search. Try a shorter word, or browse the full list below.",
  nzUrl,
  nzLabel = "See the report for all of New Zealand",
  nzBlurb = "The national picture — every household, vehicle and machine, added up.",
  directoryTitle = "Find your place",
  directoryIntro = "Reports are grouped by council type. Pick a location to see its numbers.",
  cityHeading = "City councils",
  districtHeading = "District councils",
  regionHeading = "Regions",
  basePath = "/regional-reports/",
  showCta = true,
  ctaHeading = "Read the full national report",
  ctaBody = "Dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026 — Rewiring Aotearoa's full analysis of the opportunity of going electric across New Zealand.",
  ctaButtonLabel = "Electric Homes & Vehicles Report",
  ctaUrl,
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
  creamColor = "#FFFCF0",
  heroFromColor = "#2c5e5b",
  heroToColor = "#14302f",
  onDarkColor = "#d1e0df",
}: RwRegionIndexPageProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const c = (n: string) => `rw-rip-${n}-${uid}`;
  const [query, setQuery] = useState("");

  const base = basePath.endsWith("/") ? basePath : basePath + "/";
  const headings: Record<string, string> = {
    "City council": cityHeading,
    "District council": districtHeading,
    Region: regionHeading,
  };

  // Country (New Zealand) is a standalone page — it gets the feature link, not
  // a column entry.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const g: Record<string, typeof META> = {};
    META.forEach((m) => {
      if (m.type === "Country") return;
      if (q && !m.location.toLowerCase().includes(q)) return;
      (g[m.type] = g[m.type] || []).push(m);
    });
    Object.values(g).forEach((list) => list.sort((a, b) => a.location.localeCompare(b.location)));
    return g;
  }, [query]);

  const types = GROUP_ORDER.filter((t) => groups[t]).concat(
    Object.keys(groups)
      .filter((t) => !GROUP_ORDER.includes(t))
      .sort(),
  );
  const shown = types.reduce((n, t) => n + groups[t].length, 0);
  const nzLink = linkHref(nzUrl);
  const ctaLink = linkHref(ctaUrl);
  const stats = [
    { v: stat1Value, l: stat1Label },
    { v: stat2Value, l: stat2Label },
    { v: stat3Value, l: stat3Label },
  ].filter((s) => (s.v || "").trim());

  return (
    <div className={c("root")}>
      <style>{`
        .${c("root")}, .${c("root")} * { box-sizing: border-box; }
        .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: ${creamColor}; line-height: 1.6; -webkit-font-smoothing: antialiased; }

        /* ---- hero ---- */
        .${c("hero")} { position: relative; overflow: hidden; background: linear-gradient(160deg, ${heroFromColor} 0%, ${heroToColor} 100%); color: ${onDarkColor}; padding: 104px 32px 96px; }
        .${c("hero")}::after { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: ${NOISE}; background-size: 180px 180px; opacity: 0.20; z-index: 0; }
        .${c("heroInner")} { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 56px; align-items: center; }
        .${c("heroInner")}.${c("hasImg")} { grid-template-columns: 1fr minmax(220px, 340px); }
        .${c("heroText")} { text-align: center; }
        .${c("heroInner")}.${c("hasImg")} .${c("heroText")} { text-align: left; }
        .${c("eyebrow")} { display: inline-block; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${goldColor}; margin: 0 0 18px; }
        .${c("eyebrow")}::after { content: ""; display: block; height: 3px; margin-top: 8px; border-radius: 2px; background: ${goldColor}; }
        .${c("h1")} { font-size: clamp(38px, 5.2vw, 66px); font-weight: 700; color: ${creamColor}; margin: 0 0 20px; line-height: 1.04; letter-spacing: -0.01em; }
        .${c("sub")} { font-size: clamp(17px, 1.4vw, 20px); margin: 0 auto; max-width: 640px; opacity: 0.9; line-height: 1.5; }
        .${c("heroInner")}.${c("hasImg")} .${c("sub")} { margin: 0; }
        .${c("heroImg")} img { width: 100%; height: auto; display: block; transform: rotate(-3deg); border-radius: 12px; }

        /* ---- search ---- */
        .${c("searchWrap")} { position: relative; max-width: 520px; margin: 34px auto 0; }
        .${c("heroInner")}.${c("hasImg")} .${c("searchWrap")} { margin-left: 0; }
        .${c("search")} { width: 100%; font-family: inherit; font-size: 16px; font-weight: 500; color: ${inkColor}; background: #fff; border: 2px solid ${goldColor}; border-radius: 100px; padding: 15px 22px 15px 50px; }
        .${c("search")}::placeholder { color: #6d8382; font-weight: 400; }
        .${c("search")}:focus-visible { outline: 3px solid ${goldColor}; outline-offset: 2px; }
        .${c("searchIcon")} { position: absolute; left: 20px; top: 27px; transform: translateY(-50%); width: 18px; height: 18px; color: ${accentColor}; pointer-events: none; }
        .${c("count")} { margin: 14px 0 0; font-size: 14px; font-weight: 600; letter-spacing: 0.02em; opacity: 0.75; }

        /* ---- hero stats ---- */
        .${c("stats")} { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin: 38px 0 0; }
        .${c("heroInner")}.${c("hasImg")} .${c("stats")} { justify-content: flex-start; }
        .${c("stat")} { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 100px; padding: 10px 22px; display: flex; align-items: baseline; gap: 9px; }
        .${c("statV")} { font-size: 22px; font-weight: 700; color: ${goldColor}; line-height: 1; }
        .${c("statL")} { font-size: 14px; font-weight: 500; opacity: 0.88; }

        /* ---- New Zealand feature ---- */
        .${c("nzWrap")} { max-width: 1080px; margin: 0 auto; padding: 56px 24px 0; }
        .${c("nz")} { display: flex; align-items: center; justify-content: space-between; gap: 24px; background: #fff; border: 2px dashed ${goldColor}; border-radius: 32px 8px 28px 8px / 8px 28px 8px 32px; padding: 28px 34px; text-decoration: none; color: ${accentColor}; transition: transform .18s ease, box-shadow .18s ease; }
        .${c("nz")}:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,0.10); }
        .${c("nzTitle")} { display: block; font-size: clamp(19px, 2.1vw, 24px); font-weight: 700; margin: 0; line-height: 1.2; }
        .${c("nzBlurb")} { display: block; font-size: 15px; color: #4a6664; margin: 6px 0 0; line-height: 1.45; }
        .${c("nzArrow")} { flex: none; width: 46px; height: 46px; border-radius: 50%; background: ${goldColor}; color: ${inkColor}; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }

        /* ---- directory ---- */
        .${c("dir")} { max-width: 1080px; margin: 0 auto; padding: 72px 24px 88px; }
        .${c("dirTitle")} { font-size: clamp(28px, 3.2vw, 40px); font-weight: 700; color: ${accentColor}; margin: 0 0 10px; letter-spacing: -0.01em; line-height: 1.12; text-align: center; }
        .${c("dirIntro")} { font-size: 16.5px; color: #4a6664; margin: 0 auto 44px; max-width: 620px; text-align: center; line-height: 1.5; }
        .${c("cols")} { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; align-items: start; }
        /* District councils dwarf the other two lists, so the long one takes a
           double-width slot and splits itself into two reading columns. */
        .${c("wide")} { grid-column: span 2; }
        .${c("wide")} .${c("list")} { column-count: 2; column-gap: 32px; }
        .${c("wide")} .${c("list")} li { break-inside: avoid; }
        .${c("colH")} { font-size: 20px; font-weight: 700; color: ${accentColor}; margin: 0 0 4px; padding-bottom: 8px; border-bottom: 3px solid ${goldColor}; }
        .${c("list")} { list-style: none; margin: 0; padding: 0; }
        .${c("list")} a { display: block; padding: 7px 4px; font-size: 15.5px; font-weight: 500; color: ${inkColor}; text-decoration: none; border-radius: 8px; transition: background-color .12s ease, color .12s ease; }
        .${c("list")} a:hover { background: #fff; color: ${accentColor}; font-weight: 600; }
        .${c("empty")} { text-align: center; font-size: 16.5px; color: #4a6664; background: #fff; border: 2px dashed ${goldColor}; border-radius: 32px 8px 28px 8px / 8px 28px 8px 32px; padding: 40px 32px; margin: 0; }

        /* ---- closing CTA ---- */
        .${c("cta")} { position: relative; overflow: hidden; background: linear-gradient(160deg, #1f4d4b 0%, #122c2c 100%); color: ${onDarkColor}; padding: 84px 24px; text-align: center; }
        .${c("cta")}::after { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: ${NOISE}; background-size: 180px 180px; opacity: 0.20; z-index: 0; }
        .${c("ctaInner")} { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .${c("ctaH")} { font-size: clamp(26px, 3vw, 38px); font-weight: 700; color: ${creamColor}; margin: 0 0 14px; line-height: 1.14; letter-spacing: -0.01em; }
        .${c("ctaB")} { font-size: 16.5px; margin: 0; opacity: 0.9; line-height: 1.55; }
        .${c("btn")} { display: inline-flex; align-items: center; gap: 10px; margin-top: 30px; background: ${goldColor}; color: ${inkColor}; font-family: inherit; font-weight: 700; font-size: 16px; text-decoration: none; padding: 15px 30px; border-radius: 100px; transition: background-color .18s ease, transform .18s ease; }
        .${c("btn")}:hover { background: #ffc94d; transform: translateY(-2px); }

        @media (max-width: 980px) {
          .${c("heroInner")}.${c("hasImg")} { grid-template-columns: 1fr; justify-items: center; }
          .${c("heroInner")}.${c("hasImg")} .${c("heroText")} { text-align: center; }
          .${c("heroInner")}.${c("hasImg")} .${c("sub")}, .${c("heroInner")}.${c("hasImg")} .${c("searchWrap")} { margin-left: auto; margin-right: auto; }
          .${c("heroInner")}.${c("hasImg")} .${c("stats")} { justify-content: center; }
          .${c("heroImg")} { max-width: 260px; order: -1; }
        }
        @media (max-width: 860px) {
          .${c("cols")} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .${c("hero")} { padding: 64px 22px 60px; }
          .${c("nz")} { flex-direction: column; text-align: center; padding: 26px 24px; }
          .${c("dir")} { padding: 52px 22px 64px; }
        }
        @media (max-width: 560px) {
          .${c("cols")} { grid-template-columns: 1fr; gap: 24px; }
          .${c("wide")} { grid-column: auto; }
          .${c("wide")} .${c("list")} { column-count: 1; }
          .${c("search")} { font-size: 15px; padding-left: 44px; }
          .${c("searchIcon")} { left: 17px; }
          .${c("cta")} { padding: 60px 22px; }
        }
      `}</style>

      {/* Hero */}
      <section className={c("hero")}>
        <div className={`${c("heroInner")}${heroImage?.src ? " " + c("hasImg") : ""}`}>
          <div className={c("heroText")}>
            {heroEyebrow ? <span className={c("eyebrow")}>{heroEyebrow}</span> : null}
            {heroTitle ? <h1 className={c("h1")}>{heroTitle}</h1> : null}
            {heroSubtitle ? <p className={c("sub")}>{heroSubtitle}</p> : null}

            {showSearch ? (
              <div className={c("searchWrap")}>
                <svg
                  className={c("searchIcon")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.2" y1="16.2" x2="21" y2="21" />
                </svg>
                <input
                  className={c("search")}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder || "Search locations"}
                />
                {/* Only while filtering — an always-on "82 locations" just
                    repeats the stat chip below it. */}
                {countTemplate && query.trim() ? (
                  <p className={c("count")}>{countTemplate.replace("{n}", String(shown))}</p>
                ) : null}
              </div>
            ) : null}

            {stats.length ? (
              <div className={c("stats")}>
                {stats.map((s, i) => (
                  <div className={c("stat")} key={i}>
                    <span className={c("statV")}>{s.v}</span>
                    {s.l ? <span className={c("statL")}>{s.l}</span> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {heroImage?.src ? (
            <div className={c("heroImg")}>
              <img src={heroImage.src} alt={heroImage.alt || ""} loading="lazy" />
            </div>
          ) : null}
        </div>
      </section>

      {/* New Zealand feature link */}
      {nzLink && nzLabel ? (
        <div className={c("nzWrap")}>
          <a
            className={c("nz")}
            href={nzLink}
            {...(isExternal(nzLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span>
              <span className={c("nzTitle")}>{nzLabel}</span>
              {nzBlurb ? <span className={c("nzBlurb")}>{nzBlurb}</span> : null}
            </span>
            <span className={c("nzArrow")} aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      ) : null}

      {/* Directory */}
      <section className={c("dir")}>
        {directoryTitle ? <h2 className={c("dirTitle")}>{directoryTitle}</h2> : null}
        {directoryIntro ? <p className={c("dirIntro")}>{directoryIntro}</p> : null}

        {shown === 0 ? (
          <p className={c("empty")}>{noResultsText}</p>
        ) : (
          <div className={c("cols")}>
            {types.map((t) => (
              <div key={t} className={groups[t].length > 28 ? c("wide") : undefined}>
                <h3 className={c("colH")}>{headings[t] || t}</h3>
                <ul className={c("list")}>
                  {groups[t].map((m) => (
                    <li key={m.slug}>
                      <a href={base + m.slug}>{m.location}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Closing CTA */}
      {showCta && (ctaHeading || ctaBody) ? (
        <section className={c("cta")}>
          <div className={c("ctaInner")}>
            {ctaHeading ? <h2 className={c("ctaH")}>{ctaHeading}</h2> : null}
            {ctaBody ? <p className={c("ctaB")}>{ctaBody}</p> : null}
            {ctaLink && ctaButtonLabel ? (
              <a
                className={c("btn")}
                href={ctaLink}
                {...(isExternal(ctaLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {ctaButtonLabel}
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
