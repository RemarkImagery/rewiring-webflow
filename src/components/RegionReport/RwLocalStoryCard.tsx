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
  /** Gold card background — matches the print report story card */
  cardColor?: string;
  /** Dark frame/border colour */
  frameColor?: string;
  /** Check + arrow green */
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
  cardColor = "#f5b731",
  frameColor = "#131a18",
  accentColor = "#2f9e44",
  inkColor = "#23312e",
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
    <div className="rw-story-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik:wght@400;500;600;700;800&display=swap');
        .rw-story-wrap { max-width: 920px; margin: 0 auto; padding: 12px 0; font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; }
        .rw-story-card { position: relative; margin-left: 180px; background: ${cardColor}; border: 4px solid ${frameColor}; border-radius: 20px; padding: 26px 28px 24px 60px; min-height: 220px; }
        .rw-story-card .rw-sc-photo { position: absolute; left: -180px; top: -10px; width: 212px; height: calc(100% + 20px); object-fit: cover; border: 5px solid ${frameColor}; border-radius: 16px; transform: rotate(-0.6deg); background: #ddd; display: block; }
        .rw-story-card .rw-sc-title { font-family: 'Permanent Marker', cursive; font-weight: 400; font-size: 24px; letter-spacing: 0.03em; text-transform: uppercase; margin: 0 0 4px; color: ${frameColor}; }
        .rw-story-card .rw-sc-meta { font-size: 14px; font-weight: 500; margin-bottom: 12px; }
        .rw-story-card .rw-sc-stats { font-size: 15px; line-height: 1.7; margin-bottom: 8px; }
        .rw-story-card .rw-sc-stats strong { font-weight: 700; }
        .rw-story-card .rw-sc-arrow { color: ${accentColor}; font-weight: 800; }
        .rw-story-card .rw-sc-saved { font-size: 18px; font-weight: 800; margin-bottom: 12px; }
        .rw-story-card .rw-sc-quote { font-size: 14.5px; line-height: 1.55; margin: 0 0 8px; }
        .rw-story-card .rw-sc-quote-more { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; margin: 0; }
        .rw-story-card.expanded .rw-sc-quote-more { max-height: 400px; opacity: 1; margin-bottom: 8px; }
        .rw-story-card.expanded .rw-sc-quote-short { display: none; }
        .rw-story-card .rw-sc-readmore { background: none; border: none; color: ${frameColor}; font-weight: 700; font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 14px; text-decoration: underline; font-family: inherit; }
        .rw-story-card .rw-sc-tags { display: flex; flex-wrap: wrap; gap: 6px 18px; }
        .rw-story-card .rw-sc-tag { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 700; white-space: nowrap; }
        .rw-story-card .rw-sc-check { width: 16px; height: 16px; border-radius: 4px; background: #fff; border: 2px solid ${frameColor}; display: inline-flex; align-items: center; justify-content: center; flex: none; position: relative; }
        .rw-story-card .rw-sc-check::after { content: ""; position: absolute; left: 4px; top: 0.5px; width: 4px; height: 8px; border: solid ${accentColor}; border-width: 0 2.5px 2.5px 0; transform: rotate(45deg); }
        @media (max-width: 720px) {
          .rw-story-card { margin-left: 0; padding: 20px 20px 18px; }
          .rw-story-card .rw-sc-photo { position: static; width: calc(100% + 8px); height: 220px; margin: -4px 0 14px -4px; transform: rotate(-0.6deg); }
        }
      `}</style>

      <div className={`rw-story-card${expanded ? " expanded" : ""}`}>
        {photoSrc ? <img className="rw-sc-photo" src={photoSrc} alt={name} /> : null}
        <h3 className="rw-sc-title">Local story: {name}</h3>
        {meta ? <div className="rw-sc-meta">{meta}</div> : null}
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
        {headlineStat ? (
          <div className="rw-sc-saved">
            {headlineStat}
            {headlineStatLabel ? ` ${headlineStatLabel}` : ""}
          </div>
        ) : null}
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
