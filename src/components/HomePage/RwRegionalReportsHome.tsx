"use client";

// Homepage section for the regional reports: national headline figures on the
// left, a type -> location picker on the right that opens
// /regional-reports/<slug>. Uses the slim HOME_REGIONS list, not districtData,
// so the homepage stays light.
import React, { useId, useMemo, useState } from "react";
import { HOME_REGIONS } from "./regionalReportsHomeData";

// Single source for copy + colours: the .webflow.tsx reads these too.
// Stat values are the New Zealand page's figures (districtData "new-zealand");
// regionalReportsHome.test.ts fails if they drift from the data.
export const RRH_DEFAULTS = {
  eyebrow: "Regional reports",
  heading: "What could going electric save",
  headingAccent: "your place?",
  text: "We've crunched the numbers for 82 cities, districts and regions across Aotearoa. See how much local households could save on energy bills, the emissions they'd cut and the jobs it would create.",
  stat1Value: "$35 million",
  stat1Label: "saved on household energy bills every day across New Zealand",
  stat2Value: "$7,300",
  stat2Label: "energy bill savings per household, every year",
  stat3Value: "58,000",
  stat3Label: "new local jobs created",
  footnote: "New Zealand-wide figures from the Rewiring Aotearoa Household Electrification Model 2026.",
  pickerHeading: "Find your local report",
  typeLabel: "Area type",
  locationLabel: "Location",
  locationPlaceholder: "Choose a location",
  goLabel: "View report",
  allText: "See all regional reports",
  allUrl: "/regional-reports",
  basePath: "/regional-reports/",
  bgColor: "#1a3c3c",
  textColor: "#fffcf0",
  accentColor: "#f5b731",
};

export type RwRegionalReportsHomeProps = Partial<typeof RRH_DEFAULTS>;

const TYPE_ORDER = ["City council", "District council", "Region"];
const TYPE_LABELS: Record<string, string> = {
  "City council": "Cities",
  "District council": "Districts",
  Region: "Regions",
};

// Webflow hands back "#" for an emptied link field
const cleanHref = (href?: string) => (href && href.trim() !== "#" ? href.trim() : "");

export default function RwRegionalReportsHome(given: RwRegionalReportsHomeProps) {
  // unset Webflow props arrive as undefined; don't let them blank a default
  const p = { ...RRH_DEFAULTS };
  for (const [k, v] of Object.entries(given)) if (v !== undefined) (p as any)[k] = v;
  const { bgColor, textColor, accentColor } = p;
  const allUrl = cleanHref(p.allUrl);
  const base = p.basePath.endsWith("/") ? p.basePath : p.basePath + "/";

  const uid = "rrh" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const groups = useMemo(() => {
    const g: Record<string, { slug: string; name: string }[]> = {};
    HOME_REGIONS.forEach(([slug, name, type]) => (g[type] = g[type] || []).push({ slug, name }));
    Object.values(g).forEach((l) => l.sort((a, b) => a.name.localeCompare(b.name)));
    return g;
  }, []);
  const types = TYPE_ORDER.filter((t) => groups[t]);

  const [type, setType] = useState(types[0] || "");
  const [slug, setSlug] = useState("");
  const go = () => {
    if (slug) window.location.href = base + slug;
  };

  const stats = [
    [p.stat1Value, p.stat1Label],
    [p.stat2Value, p.stat2Label],
    [p.stat3Value, p.stat3Label],
  ].filter(([v]) => v);

  const c = (s: string) => `${uid}-${s}`;
  const squiggle = "255px 15px 225px 15px / 15px 225px 15px 255px";

  return (
    <section className={c("wrap")}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap');
        .${c("wrap")}, .${c("wrap")} * { box-sizing: border-box; }
        .${c("wrap")} {
          font-family: 'Rubik', sans-serif;
          background: linear-gradient(160deg, #245755 0%, ${bgColor} 100%);
          color: ${textColor};
          padding: clamp(56px, 8vw, 104px) 24px;
        }
        .${c("inner")} {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1.25fr 1fr;
          gap: clamp(32px, 5vw, 64px); align-items: center;
        }
        .${c("eyebrow")} {
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${accentColor}; margin: 0 0 16px;
        }
        .${c("eyebrow")}::before { content: ""; width: 32px; height: 3px; background: ${accentColor}; border-radius: 2px; }
        .${c("h")} {
          font-size: clamp(2rem, 4.4vw, 3.3rem); font-weight: 800; line-height: 1.05;
          letter-spacing: -0.01em; margin: 0 0 18px; color: ${textColor};
        }
        .${c("accent")} { color: ${accentColor}; }
        .${c("text")} {
          font-size: clamp(1rem, 1.4vw, 1.1rem); line-height: 1.65; opacity: 0.88;
          max-width: 560px; margin: 0 0 30px;
        }
        .${c("stats")} { display: grid; grid-template-columns: repeat(${stats.length || 1}, 1fr); gap: 14px; }
        .${c("stat")} {
          border-top: 3px solid ${accentColor}; padding-top: 12px;
        }
        .${c("sv")} { font-size: clamp(1.4rem, 2.3vw, 1.85rem); font-weight: 800; line-height: 1.1; color: ${accentColor}; white-space: nowrap; }
        .${c("sl")} { font-size: 14px; line-height: 1.45; margin-top: 6px; opacity: 0.85; }
        .${c("foot")} { font-size: 12px; opacity: 0.6; margin: 18px 0 0; }
        .${c("card")} {
          background: rgba(255,255,255,0.06);
          border: 3px dashed ${accentColor};
          border-radius: ${squiggle};
          padding: clamp(28px, 4vw, 44px);
        }
        .${c("ch")} { font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 700; margin: 0 0 20px; color: ${textColor}; }
        .${c("tabs")} { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 18px; }
        .${c("tab")} {
          font: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
          padding: 8px 16px; border-radius: 999px;
          background: transparent; color: ${textColor};
          border: 2px solid rgba(255,252,240,0.35);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .${c("tab")}:hover { border-color: ${accentColor}; }
        .${c("tab")}[aria-pressed="true"] { background: ${accentColor}; border-color: ${accentColor}; color: ${bgColor}; }
        .${c("lab")} { display: block; font-size: 13px; font-weight: 600; margin: 0 0 8px; opacity: 0.8; }
        .${c("sel")} {
          width: 100%; font: inherit; font-size: 16px; color: ${bgColor};
          background: #fffcf0 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%231a3c3c' stroke-width='2.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 16px center;
          border: 2px solid #fffcf0; border-radius: 12px;
          padding: 14px 44px 14px 16px; appearance: none; -webkit-appearance: none; cursor: pointer;
        }
        .${c("sel")}:focus-visible, .${c("tab")}:focus-visible, .${c("go")}:focus-visible, .${c("all")}:focus-visible {
          outline: 3px solid ${accentColor}; outline-offset: 3px;
        }
        .${c("go")} {
          margin-top: 16px; width: 100%;
          font: inherit; font-size: 16px; font-weight: 700; cursor: pointer;
          padding: 15px 28px; background: ${accentColor}; color: ${bgColor};
          border: 3px solid ${accentColor}; border-radius: ${squiggle};
          transition: background 0.25s, color 0.25s, opacity 0.2s;
        }
        .${c("go")}:hover:not(:disabled) { background: transparent; color: ${accentColor}; }
        .${c("go")}:disabled { opacity: 0.5; cursor: not-allowed; }
        .${c("all")} {
          display: inline-block; margin-top: 18px;
          font-size: 15px; font-weight: 600; color: ${textColor};
          text-decoration: underline; text-underline-offset: 4px;
          text-decoration-thickness: 2px; text-decoration-color: ${accentColor};
        }
        .${c("all")}:hover { color: ${accentColor}; }
        @media (max-width: 860px) {
          .${c("inner")} { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .${c("wrap")} { padding: 56px 16px; }
          .${c("stats")} { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .${c("wrap")} * { transition: none !important; }
        }
      `}</style>
      <div className={c("inner")}>
        <div>
          {p.eyebrow && <p className={c("eyebrow")}>{p.eyebrow}</p>}
          <h2 className={c("h")}>
            {p.heading}
            {p.heading && p.headingAccent ? " " : ""}
            {p.headingAccent && <span className={c("accent")}>{p.headingAccent}</span>}
          </h2>
          {p.text && <p className={c("text")}>{p.text}</p>}
          {stats.length > 0 && (
            <div className={c("stats")}>
              {stats.map(([v, l]) => (
                <div className={c("stat")} key={v + l}>
                  <div className={c("sv")}>{v}</div>
                  <div className={c("sl")}>{l}</div>
                </div>
              ))}
            </div>
          )}
          {p.footnote && <p className={c("foot")}>{p.footnote}</p>}
        </div>

        <div className={c("card")}>
          {p.pickerHeading && <h3 className={c("ch")}>{p.pickerHeading}</h3>}
          <div className={c("tabs")} role="group" aria-label={p.typeLabel}>
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={c("tab")}
                aria-pressed={t === type}
                onClick={() => {
                  setType(t);
                  setSlug("");
                }}
              >
                {TYPE_LABELS[t] || t}
              </button>
            ))}
          </div>
          <label className={c("lab")} htmlFor={c("loc")}>
            {p.locationLabel}
          </label>
          <select id={c("loc")} className={c("sel")} value={slug} onChange={(e) => setSlug(e.target.value)}>
            <option value="">{p.locationPlaceholder}</option>
            {(groups[type] || []).map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
          <button type="button" className={c("go")} disabled={!slug} onClick={go}>
            {p.goLabel} →
          </button>
          {p.allText && allUrl && (
            <a className={c("all")} href={allUrl}>
              {p.allText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
