"use client";

// Two-stage location picker (type → location), ported from the preview site's
// switcher bar. On selection it navigates to the live report page for that
// location (basePath + slug). Pre-selects the current page's location when the
// URL already ends in a known slug.
import React, { useEffect, useMemo, useState } from "react";
import { META } from "./districtData";

const TYPE_ORDER = ["Country", "City council", "District council", "Region"];
const TYPE_LABELS: Record<string, string> = { Country: "New Zealand" };

export interface RwRegionPickerProps {
  /** Path prefix the picker navigates to; the location slug is appended. */
  basePath?: string;
  label?: string;
  /** Button-style go, or navigate immediately on selection (default). */
  requireGo?: boolean;
  goLabel?: string;
  inkColor?: string;
  goldColor?: string;
  bgColor?: string;
  labelColor?: string;
}

export default function RwRegionPicker({
  basePath = "/regional-reports/",
  label = "See the report for another location",
  requireGo = false,
  goLabel = "View report",
  inkColor = "#1a3c3c",
  goldColor = "#f5b731",
  bgColor = "#234e4c",
  labelColor = "#fdf7ea",
}: RwRegionPickerProps) {
  const groups = useMemo(() => {
    const g: Record<string, typeof META> = {};
    META.forEach((m) => {
      (g[m.type] = g[m.type] || []).push(m);
    });
    Object.values(g).forEach((list) => list.sort((a, b) => a.location.localeCompare(b.location)));
    return g;
  }, []);
  const types = useMemo(
    () =>
      Object.keys(groups).sort((a, b) => {
        let ia = TYPE_ORDER.indexOf(a);
        let ib = TYPE_ORDER.indexOf(b);
        if (ia === -1) ia = 99;
        if (ib === -1) ib = 99;
        return ia - ib || a.localeCompare(b);
      }),
    [groups],
  );

  const [type, setType] = useState(types[0] || "");
  const [slug, setSlug] = useState("");

  // Pre-select the page's own location when the URL ends in a known slug.
  useEffect(() => {
    const seg = window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() || "";
    const m = META.find((x) => x.slug === seg);
    if (m) {
      setType(m.type);
      setSlug(m.slug);
    }
  }, []);

  const base = basePath.endsWith("/") ? basePath : basePath + "/";
  const go = (s: string) => {
    if (s) window.location.href = base + s;
  };

  const list = groups[type] || [];

  return (
    <div className="rw-region-picker">
      <style>{`
        .rw-region-picker, .rw-region-picker * { box-sizing: border-box; }
        .rw-region-picker { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: ${bgColor}; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; padding: 32px 24px; }
        .rw-region-picker label { font-size: 15px; font-weight: 600; color: ${labelColor}; }
        .rw-region-picker select { font-family: 'Rubik', sans-serif; font-size: 15px; font-weight: 600; color: ${inkColor}; background: #fff; border: 2px solid ${goldColor}; border-radius: 10px; padding: 8px 14px; min-width: 210px; cursor: pointer; }
        .rw-region-picker select:focus-visible { outline: 2px solid ${goldColor}; outline-offset: 2px; }
        .rw-region-picker .rw-rp-go { font-family: inherit; font-size: 15px; font-weight: 700; color: ${inkColor}; background: ${goldColor}; border: none; border-radius: 100px; padding: 10px 22px; cursor: pointer; transition: background-color .15s ease, transform .15s ease; }
        .rw-region-picker .rw-rp-go:hover { background: #ffc94d; transform: translateY(-1px); }
        @media (max-width: 600px) { .rw-region-picker select { min-width: 0; flex: 1 1 140px; } }
      `}</style>

      {label ? <label htmlFor="rw-rp-loc">{label}</label> : null}
      <select
        aria-label="Location type"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setSlug("");
        }}
      >
        {types.map((t) => (
          <option key={t} value={t}>
            {TYPE_LABELS[t] || t}
          </option>
        ))}
      </select>
      <select
        id="rw-rp-loc"
        aria-label="Location"
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
          if (!requireGo) go(e.target.value);
        }}
      >
        <option value="" disabled>
          Choose a location…
        </option>
        {list.map((m) => (
          <option key={m.slug} value={m.slug}>
            {m.location}
          </option>
        ))}
      </select>
      {requireGo ? (
        <button type="button" className="rw-rp-go" onClick={() => go(slug)}>
          {goLabel}
        </button>
      ) : null}
    </div>
  );
}
