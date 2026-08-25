"use client";

import React, { useEffect, useRef, useState } from "react";

/** Inject the story-card fonts once per page — N cards in a carousel would
 *  otherwise each carry their own @import, delaying font load. */
function ensureStoryFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("rw-story-fonts")) return;
  const link = document.createElement("link");
  link.id = "rw-story-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(link);
}

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
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => { ensureStoryFonts(); }, []);

  // Cards are usually placed inside a Webflow slider whose mask has a FIXED
  // height with overflow:hidden — taller cards get clipped (live-site bug,
  // 2026-08-25). The Designer can't know the tallest card, so each card grows
  // the mask to fit itself (grow-only: every card converges on the tallest).
  // Climbs out of the component's shadow root to reach the page DOM.
  const fitMask = () => {
    const w = wrapRef.current;
    if (!w) return;
    let el: Element | null = w;
    let mask: HTMLElement | null = null;
    while (el && !mask) {
      const parent: Element | null =
        el.parentElement || ((el.getRootNode() as ShadowRoot).host ?? null);
      if (parent && parent.classList && parent.classList.contains("w-slider-mask")) mask = parent as HTMLElement;
      el = parent;
    }
    if (!mask) return;
    const need = w.offsetHeight;
    if (need > mask.getBoundingClientRect().height + 1) mask.style.height = need + "px";
  };
  useEffect(() => {
    fitMask();
    const timers = [800, 2500].map((ms) => window.setTimeout(fitMask, ms));
    window.addEventListener("resize", fitMask);
    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", fitMask);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const t = window.setTimeout(fitMask, 350); // after the quote transition
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);
  const tags = (technologies || "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  // Jay 2026-08-25: always show all six machines as checkboxes, ticking the
  // ones this story has (matched against the CMS Electric technologies tags).
  const MACHINES: Array<{ label: string; test: RegExp }> = [
    { label: "Solar", test: /solar/i },
    { label: "Batteries", test: /batter/i },
    { label: "Electric heating", test: /^heat ?pump$|heating/i },
    { label: "Electric hot water", test: /hot ?water/i },
    { label: "Electric cooking", test: /induction|cook/i },
    { label: "Electric vehicle", test: /^ev\b|vehicle/i },
  ];
  const machines = MACHINES.map((m) => ({ label: m.label, on: tags.some((t) => m.test.test(t)) }));
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
    <div className="rw-story-wrap" ref={wrapRef}>
      <style>{`
        .rw-story-wrap, .rw-story-wrap * { box-sizing: border-box; }
        .rw-story-wrap { max-width: 960px; margin: 0 auto; padding: 12px 0; font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; }
        /* Jay's 2026-08-25 design: white card, black dashed frame, photo inset left */
        .rw-story-card { display: grid; grid-template-columns: 300px 1fr; background: #fff; border: 3px dashed ${frameColor}; border-radius: 24px; overflow: hidden; }
        .rw-story-card .rw-sc-photo { width: 100%; height: 100%; min-height: 280px; object-fit: cover; display: block; background: #ddd; }
        .rw-story-card .rw-sc-body { padding: 26px 32px 24px; }
        .rw-story-card .rw-sc-title { font-family: inherit; font-weight: 800; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.15; margin: 0 0 2px; color: ${frameColor}; }
        .rw-story-card .rw-sc-meta { font-size: 15px; font-weight: 500; margin-bottom: 14px; }
        .rw-story-card .rw-sc-stats { font-size: 15.5px; line-height: 1.65; margin-bottom: 2px; display: grid; grid-template-columns: max-content auto; column-gap: 18px; }
        .rw-story-card .rw-sc-stats strong { font-weight: 700; }
        .rw-story-card .rw-sc-saved { font-size: 14.5px; font-weight: 800; margin-bottom: 14px; }
        .rw-story-card .rw-sc-quote { font-size: 16px; line-height: 1.55; margin: 0 0 10px; }
        .rw-story-card .rw-sc-quote-more { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .3s ease, opacity .3s ease, margin .3s ease; margin: 0; }
        .rw-story-card.expanded .rw-sc-quote-more { max-height: 400px; opacity: 1; margin-bottom: 10px; }
        .rw-story-card.expanded .rw-sc-quote-short { display: none; }
        .rw-story-card .rw-sc-readmore { background: none; border: none; color: ${frameColor}; font-weight: 700; font-size: 14px; cursor: pointer; padding: 0; margin-bottom: 12px; text-decoration: underline; font-family: inherit; }
        .rw-story-card .rw-sc-tags { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 4px; }
        .rw-story-card .rw-sc-tag { display: inline-flex; align-items: center; gap: 7px; font-size: 15px; font-weight: 700; white-space: nowrap; }
        .rw-story-card .rw-sc-tag.off { opacity: 0.45; font-weight: 600; }
        .rw-story-card .rw-sc-check { width: 17px; height: 17px; border-radius: 4px; background: #fff; border: 2px solid ${frameColor}; display: inline-flex; align-items: center; justify-content: center; flex: none; position: relative; }
        .rw-story-card .rw-sc-check.on::after { content: ""; position: absolute; left: 4px; top: 0.5px; width: 4px; height: 8px; border: solid ${accentColor}; border-width: 0 2.5px 2.5px 0; transform: rotate(45deg); }
        /* no photo: single column */
        .rw-story-card.no-photo { grid-template-columns: 1fr; }
        @media (max-width: 720px) {
          .rw-story-card { grid-template-columns: 1fr; }
          .rw-story-card .rw-sc-photo { min-height: 0; height: 220px; }
          .rw-story-card .rw-sc-body { padding: 20px 20px 18px; }
        }
      `}</style>

      <div className={`rw-story-card${expanded ? " expanded" : ""}${photoSrc ? "" : " no-photo"}`}>
        {photoSrc ? <img className="rw-sc-photo" src={photoSrc} alt={name} /> : null}
        <div className="rw-sc-body">
          <h3 className="rw-sc-title">Local story: {name}</h3>
          {meta ? <div className="rw-sc-meta">{meta}</div> : null}
          {stats.length > 0 && (
            <div className="rw-sc-stats">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  <strong>{/bill/i.test(s.label || "") ? "Bills" : s.label} before:</strong>
                  <span>{s.before}</span>
                  <strong>{/bill/i.test(s.label || "") ? "Bills" : s.label} after:</strong>
                  <span>{s.after}</span>
                </React.Fragment>
              ))}
            </div>
          )}
          {headlineStat ? (
            <div className="rw-sc-saved">
              That&rsquo;s {headlineStat}
              {headlineStatLabel ? ` ${headlineStatLabel}` : ""}!
            </div>
          ) : null}
          {shortQuote ? <p className="rw-sc-quote rw-sc-quote-short">“{shortQuote}”</p> : null}
          {hasMore ? <p className="rw-sc-quote rw-sc-quote-more">“{longQuote}”</p> : null}
          {hasMore && (
            <button className="rw-sc-readmore" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
          <div className="rw-sc-tags">
            {machines.map((m, i) => (
              <span className={`rw-sc-tag${m.on ? "" : " off"}`} key={i}>
                <span className={`rw-sc-check${m.on ? " on" : ""}`} />
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
