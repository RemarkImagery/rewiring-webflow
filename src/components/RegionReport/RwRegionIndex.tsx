"use client";

// Directory for the rewiring.nz/regional-reports index page (Jay 2026-08-27):
// every region/district/council report linked, grouped by council type, with an
// optional New Zealand feature link up top.
import React, { useMemo } from "react";
import { META } from "./districtData";

const GROUP_ORDER = ["City council", "District council", "Region"];
const GROUP_HEADINGS: Record<string, string> = {
  "City council": "City councils",
  "District council": "District councils",
  Region: "Regions",
};

export interface RwRegionIndexProps {
  /** Path prefix for the report links; the slug is appended. */
  basePath?: string;
  /** URL of the standalone New Zealand page; blank hides the NZ feature link. */
  nzUrl?: string;
  nzLabel?: string;
  inkColor?: string;
  goldColor?: string;
  accentColor?: string;
}

export default function RwRegionIndex({
  basePath = "/regional-reports/",
  nzUrl = "",
  nzLabel = "See the report for all of New Zealand",
  inkColor = "#1a3c3c",
  goldColor = "#f5b731",
  accentColor = "#234e4c",
}: RwRegionIndexProps) {
  const base = basePath.endsWith("/") ? basePath : basePath + "/";
  const groups = useMemo(() => {
    const g: Record<string, typeof META> = {};
    META.forEach((m) => {
      if (m.type === "Country") return;
      (g[m.type] = g[m.type] || []).push(m);
    });
    Object.values(g).forEach((list) => list.sort((a, b) => a.location.localeCompare(b.location)));
    return g;
  }, []);
  const types = GROUP_ORDER.filter((t) => groups[t]).concat(
    Object.keys(groups).filter((t) => !GROUP_ORDER.includes(t)).sort(),
  );

  return (
    <div className="rw-region-index">
      <style>{`
        .rw-region-index, .rw-region-index * { box-sizing: border-box; }
        .rw-region-index { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        .rw-ri-nz { display: block; text-align: center; background: #fff; border: 2px dashed ${goldColor}; border-radius: 18px; padding: 22px 24px; margin-bottom: 34px; text-decoration: none; color: ${accentColor}; font-size: clamp(19px, 2.2vw, 24px); font-weight: 700; transition: transform .18s ease, box-shadow .18s ease; }
        .rw-ri-nz:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.10); }
        .rw-ri-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; align-items: start; }
        .rw-ri-h { font-size: 20px; font-weight: 700; color: ${accentColor}; margin: 0 0 4px; padding-bottom: 8px; border-bottom: 3px solid ${goldColor}; }
        .rw-ri-list { list-style: none; margin: 0; padding: 0; }
        .rw-ri-list a { display: block; padding: 7px 4px; font-size: 15.5px; font-weight: 500; color: ${inkColor}; text-decoration: none; border-radius: 8px; transition: background-color .12s ease, color .12s ease; }
        .rw-ri-list a:hover { background: #fff; color: ${accentColor}; font-weight: 600; }
        @media (max-width: 860px) { .rw-ri-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .rw-ri-cols { grid-template-columns: 1fr; gap: 24px; } }
      `}</style>

      {nzUrl ? (
        <a className="rw-ri-nz" href={nzUrl}>
          {nzLabel} &rarr;
        </a>
      ) : null}
      <div className="rw-ri-cols">
        {types.map((t) => (
          <div key={t}>
            <h3 className="rw-ri-h">{GROUP_HEADINGS[t] || t}</h3>
            <ul className="rw-ri-list">
              {groups[t].map((m) => (
                <li key={m.slug}>
                  <a href={base + m.slug}>{m.location}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
