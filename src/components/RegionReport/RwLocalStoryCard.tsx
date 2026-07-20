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
  meta?: string;
  billsBefore?: string;
  billsAfter?: string;
  savedLine?: string;
  quote?: string;
  /** One feature per line, e.g. "9kW solar\n10kWh batteries\nHeat pump" */
  features?: string;
  accentColor?: string;
  inkColor?: string;
}

export default function RwLocalStoryCard({
  photo = "",
  name = "First Last",
  meta = "4 people, 180m²",
  billsBefore = "$1,200 / month",
  billsAfter = "$300 / month",
  savedLine = "That's $10,800 saved per year!",
  quote = "We were nervous about the cost but the savings have been incredible — and the house is warmer than it's ever been.",
  features = "9kW solar\n10kWh batteries\nHeat pump\nHot water heat pump\nInduction cooking",
  accentColor = "#234e4c",
  inkColor = "#1a3c3c",
}: RwLocalStoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const tags = (features || "").split("\n").map((s) => s.trim()).filter(Boolean);
  const photoSrc = resolveImage(photo);

  return (
    <div className={`rw-story-card${expanded ? " expanded" : ""}`}>
      <style>{`
        .rw-story-card { display: grid; grid-template-columns: 240px 1fr; gap: 0; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.10); font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 920px; margin: 0 auto; }
        .rw-story-card .rw-sc-photo { background: #e9e3cf; min-height: 220px; }
        .rw-story-card .rw-sc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rw-story-card .rw-sc-body { padding: 28px 30px; }
        .rw-story-card .rw-sc-title { font-size: 22px; font-weight: 700; margin: 0 0 4px; color: ${inkColor}; }
        .rw-story-card .rw-sc-meta { font-size: 14px; color: #5c7a78; margin-bottom: 14px; }
        .rw-story-card .rw-sc-bills { font-size: 15px; line-height: 1.7; margin-bottom: 8px; }
        .rw-story-card .rw-sc-bills strong { font-weight: 600; }
        .rw-story-card .rw-sc-saved { font-size: 17px; font-weight: 700; color: ${accentColor}; margin-bottom: 14px; }
        .rw-story-card .rw-sc-quote { font-size: 15px; line-height: 1.6; font-style: italic; color: #3a5b59; margin: 0 0 10px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; }
        .rw-story-card.expanded .rw-sc-quote { max-height: 400px; opacity: 1; margin-bottom: 14px; }
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
        <div className="rw-sc-meta">{meta}</div>
        <div className="rw-sc-bills">
          <div><strong>Bills before:</strong> {billsBefore}</div>
          <div><strong>Bills after:</strong> {billsAfter}</div>
        </div>
        <div className="rw-sc-saved">{savedLine}</div>
        <p className="rw-sc-quote">{quote}</p>
        <button className="rw-sc-readmore" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Read less" : "Read more"}
        </button>
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
