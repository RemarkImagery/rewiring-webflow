"use client";

import React, { useState } from "react";

// props.Image() may return a string URL or an object like { src, alt }
function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export interface RwLocalStoryCardProps {
  photo?: any;
  name?: string;
  /** CMS: Location name */
  location?: string;
  /** CMS: Entity size, e.g. "4 people, 206 m²" */
  entitySize?: string;
  /** CMS: Headline stat 1, e.g. "$470" */
  headlineStat?: string;
  /** CMS: Headline stat 1 label, e.g. "saved per month" */
  headlineStatLabel?: string;
  /** CMS: Stat 1 Label / Before / After, e.g. "Home bills" $445 → $145 */
  stat1Label?: string;
  stat1Before?: string;
  stat1After?: string;
  /** CMS: Stat 2 Label / Before / After, e.g. "Vehicle costs" */
  stat2Label?: string;
  stat2Before?: string;
  stat2After?: string;
  /** CMS: Highlight Quote (short, shown on card) */
  highlightQuote?: string;
  /** CMS: Large Quote (longer, revealed by Read more; falls back to highlight) */
  largeQuote?: string;
  /** Technology pills, comma or newline separated. The CMS holds these as a
   * multi-reference (Electric technologies) which Webflow can't bind to a
   * text prop — set manually or bind a plain-text mirror field. */
  technologies?: string;
  accentColor?: string;
  inkColor?: string;
}

export default function RwLocalStoryCard({
  photo = "",
  name = "First Last",
  location = "Tawa, Wellington",
  entitySize = "4 people, 206 m²",
  headlineStat = "$470",
  headlineStatLabel = "saved per month",
  stat1Label = "Home bills",
  stat1Before = "$445 / month",
  stat1After = "$145 / month",
  stat2Label = "Vehicle costs",
  stat2Before = "$180 / month",
  stat2After = "$10 / month",
  highlightQuote = "We don't have to worry about fuel and energy prices.",
  largeQuote = "We don't have to worry about fuel and energy prices and we've really appreciated having our own generation and battery backup when storms have caused blackouts.",
  technologies = "Battery, EV, Heat pump, Hot water heat pump, Induction cooking, Solar",
  accentColor = "#234e4c",
  inkColor = "#1a3c3c",
}: RwLocalStoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const tags = (technologies || "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const photoSrc = resolveImage(photo);
  const meta = [location, entitySize].filter(Boolean).join(" · ");
  const stats = [
    { label: stat1Label, before: stat1Before, after: stat1After },
    { label: stat2Label, before: stat2Before, after: stat2After },
  ].filter((s) => s.label && (s.before || s.after));
  const shortQuote = highlightQuote || "";
  const longQuote = largeQuote || "";
  // Only offer Read more when the large quote adds something new
  const hasMore = Boolean(longQuote && longQuote !== shortQuote);

  return (
    <div className={`rw-story-card${expanded ? " expanded" : ""}`}>
      <style>{`
        .rw-story-card { display: grid; grid-template-columns: 240px 1fr; gap: 0; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.10); font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 920px; margin: 0 auto; }
        .rw-story-card .rw-sc-photo { background: #e9e3cf; min-height: 220px; }
        .rw-story-card .rw-sc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rw-story-card .rw-sc-body { padding: 28px 30px; }
        .rw-story-card .rw-sc-title { font-size: 22px; font-weight: 700; margin: 0 0 4px; color: ${inkColor}; }
        .rw-story-card .rw-sc-meta { font-size: 14px; color: #5c7a78; margin-bottom: 14px; }
        .rw-story-card .rw-sc-saved { font-size: 17px; font-weight: 700; color: ${accentColor}; margin-bottom: 14px; }
        .rw-story-card .rw-sc-stats { font-size: 15px; line-height: 1.7; margin-bottom: 14px; }
        .rw-story-card .rw-sc-stats strong { font-weight: 600; }
        .rw-story-card .rw-sc-arrow { color: ${accentColor}; font-weight: 600; }
        .rw-story-card .rw-sc-quote { font-size: 15px; line-height: 1.6; font-style: italic; color: #3a5b59; margin: 0 0 10px; }
        .rw-story-card .rw-sc-quote-more { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; margin: 0; }
        .rw-story-card.expanded .rw-sc-quote-more { max-height: 400px; opacity: 1; margin-bottom: 10px; }
        .rw-story-card.expanded .rw-sc-quote-short { display: none; }
        .rw-story-card .rw-sc-readmore { background: none; border: none; color: ${accentColor}; font-weight: 600; font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 16px; text-decoration: underline; font-family: inherit; }
        .rw-story-card .rw-sc-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .rw-story-card .rw-sc-tag { display: inline-flex; align-items: center; gap: 6px; background: #f3efe0; border-radius: 100px; padding: 6px 12px; font-size: 13px; font-weight: 500; }
        .rw-story-card .rw-sc-check { width: 14px; height: 14px; border-radius: 50%; background: ${accentColor}; display: inline-block; position: relative; flex: none; }
        .rw-story-card .rw-sc-check::after { content: ""; position: absolute; left: 4px; top: 1.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        @media (max-width: 640px) { .rw-story-card { grid-template-columns: 1fr; } .rw-story-card .rw-sc-photo { min-height: 200px; } }
      `}</style>

      <div className="rw-sc-photo">
        {photoSrc ? <img src={photoSrc} alt={name} /> : null}
      </div>
      <div className="rw-sc-body">
        <h3 className="rw-sc-title">{name}</h3>
        {meta ? <div className="rw-sc-meta">{meta}</div> : null}
        {headlineStat ? (
          <div className="rw-sc-saved">
            {headlineStat}
            {headlineStatLabel ? ` ${headlineStatLabel}` : ""}
          </div>
        ) : null}
        {stats.length > 0 && (
          <div className="rw-sc-stats">
            {stats.map((s, i) => (
              <div key={i}>
                <strong>{s.label}:</strong> {s.before}
                {s.before && s.after ? <span className="rw-sc-arrow"> → </span> : null}
                {s.after}
              </div>
            ))}
          </div>
        )}
        {shortQuote ? <p className="rw-sc-quote rw-sc-quote-short">“{shortQuote}”</p> : null}
        {hasMore ? <p className="rw-sc-quote rw-sc-quote-more">“{longQuote}”</p> : null}
        {hasMore && (
          <button className="rw-sc-readmore" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
        {tags.length > 0 && (
          <div className="rw-sc-tags">
            {tags.map((t, i) => (
              <span className="rw-sc-tag" key={i}>
                <span className="rw-sc-check" />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
