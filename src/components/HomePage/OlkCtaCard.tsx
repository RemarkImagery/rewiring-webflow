"use client";

import React, { useEffect, useId, useState } from "react";

interface OlkCtaCardProps {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  text?: string;
  ctaText?: string;
  ctaUrl?: string;
  kiwiImage?: any;
  liveTotalsUrl?: string;
  raisedSuffix?: string;
  showThermometer?: boolean;
  milestones?: string;
  bgColor?: string;
  accentColor?: string;
  buttonColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function OlkCtaCard(props: OlkCtaCardProps) {
  const {
    eyebrow = "New Zealand-made Energy",
    heading = "Operation",
    headingAccent = "Laser Kiwi",
    text = "We're sending Mike Casey to the Beehive dressed as a Laser Kiwi to make the case for New Zealand-made energy. Fuel the mission: donate, bid in the auctions or grab some merch.",
    ctaText = "Join the mission",
    ctaUrl = "https://pages.rewiring.nz/operation-laser-kiwi",
    kiwiImage,
    liveTotalsUrl = "https://pages.rewiring.nz/operation-laser-kiwi/total",
    raisedSuffix = "raised so far",
    showThermometer = true,
    milestones = "25000,50000,100000,250000",
    bgColor = "#143a1e",
    accentColor = "#4bf03c",
    buttonColor = "#f5b731",
  } = props;

  // Totals come from the campaign page, NOT the Raisely worker directly:
  // the published figure is Raisely + the manual CMS offset + the leading
  // auction bids, and only the page knows the last two. Reading the worker
  // here would show a smaller number than the thermometer.
  const uid = useId().replace(/:/g, "");
  // Ships with the campaign hero art; picking an image in Webflow overrides it.
  const kiwiSrc =
    resolveImage(kiwiImage) ||
    "https://pages.rewiring.nz/themes/rewiring/images/olk/nzme-hero-bg-felt.jpeg";
  const [raised, setRaised] = useState<number | null>(null);

  useEffect(() => {
    if (!liveTotalsUrl) return;
    let alive = true;
    fetch(liveTotalsUrl)
      .then((r) => r.json())
      .then((j) => {
        if (alive && j && typeof j.raised === "number" && j.raised > 0) setRaised(j.raised);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [liveTotalsUrl]);

  // Same piecewise scale as the campaign-page thermometer: the milestones sit
  // at even steps along the bar so the first one isn't crushed into the left
  // edge. Keep this list in sync with NzmeThermometer or the two bars disagree.
  const tiers = milestones
    .split(",")
    .map((v) => Number(String(v).replace(/[^0-9.]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);

  const pct = (() => {
    if (raised === null || tiers.length === 0) return 0;
    const stops = [0, ...tiers];
    for (let i = 1; i < stops.length; i++) {
      if (raised < stops[i]) {
        const span = stops[i] - stops[i - 1];
        const into = Math.max(0, raised - stops[i - 1]);
        return ((i - 1) / tiers.length) * 100 + (into / span) * (100 / tiers.length);
      }
    }
    return 100;
  })();

  // Fill animates in once the total lands (0 -> pct on the next tick).
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);

  const fmt = (n: number) =>
    n >= 1000 ? "$" + Math.round(n / 1000) + "k" : "$" + n.toLocaleString("en-NZ");

  return (
    <section className={`olkc-wrap-${uid}`}>
      <style>{`
        .olkc-wrap-${uid} {
          font-family: 'Rubik', sans-serif;
          padding: 24px;
          display: flex;
          justify-content: center;
        }
        .olkc-card-${uid} {
          position: relative;
          width: min(1100px, 100%);
          background: ${bgColor};
          border-radius: 22px 8px 22px 8px;
          overflow: hidden;
          display: grid;
          grid-template-columns: ${kiwiSrc ? "1.4fr 1fr" : "1fr"};
          align-items: center;
          gap: 24px;
        }
        .olkc-glow-${uid} {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 75% 40%, ${accentColor}1f 0%, transparent 70%);
          pointer-events: none;
        }
        .olkc-body-${uid} {
          position: relative;
          padding: clamp(32px, 5vw, 56px);
        }
        .olkc-eyebrow-${uid} {
          display: inline-block;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${bgColor};
          background: ${accentColor};
          padding: 6px 14px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          margin-bottom: 18px;
        }
        .olkc-heading-${uid} {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900;
          line-height: 0.98;
          text-transform: uppercase;
          color: #17691f;
          -webkit-text-stroke: 2px ${accentColor};
          paint-order: stroke fill;
          text-shadow: 0 0 18px ${accentColor}59;
          margin: 0 0 6px;
        }
        .olkc-heading-solid-${uid} {
          display: block;
          color: ${accentColor};
          -webkit-text-stroke: 0;
          text-shadow: 0 0 24px ${accentColor}73;
        }
        .olkc-text-${uid} {
          font-size: clamp(0.98rem, 1.4vw, 1.1rem);
          line-height: 1.65;
          color: rgba(255, 252, 240, 0.88);
          max-width: 520px;
          margin: 16px 0 26px;
        }
        .olkc-row-${uid} {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .olkc-cta-${uid} {
          display: inline-block;
          font-size: 15px; font-weight: 700;
          padding: 14px 34px; text-decoration: none;
          background: ${buttonColor}; color: #1a3c3c;
          border: 3px solid ${buttonColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
        }
        .olkc-cta-${uid}:hover { background: transparent; color: ${buttonColor}; }
        .olkc-raised-${uid} {
          font-size: 0.9rem; font-weight: 700;
          color: ${accentColor};
        }
        .olkc-raised-${uid} strong {
          font-size: 1.2rem; font-weight: 900;
        }
        .olkc-imgwrap-${uid} {
          position: relative;
          align-self: stretch;
          min-height: 260px;
        }
        .olkc-imgwrap-${uid} img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }
        .olkc-thermo-${uid} {
          margin: 26px 0 0;
          max-width: 520px;
        }
        .olkc-thermo-top-${uid} {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }
        .olkc-thermo-num-${uid} {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 900;
          color: ${accentColor};
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .olkc-thermo-lbl-${uid} {
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255, 252, 240, 0.7);
        }
        .olkc-track-${uid} {
          position: relative;
          height: 22px;
          background: rgba(255, 252, 240, 0.12);
          border: 2px solid rgba(255, 252, 240, 0.35);
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          overflow: hidden;
        }
        .olkc-fill-${uid} {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: ${fill}%;
          background: repeating-linear-gradient(
            -45deg, ${accentColor}, ${accentColor} 12px, #3ed432 12px, #3ed432 24px
          );
          box-shadow: 0 0 14px ${accentColor}99;
          transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1);
          animation: olkc-stripes-${uid} 0.8s linear infinite;
        }
        @keyframes olkc-stripes-${uid} {
          to { background-position: 33.9px 0; }
        }
        .olkc-marks-${uid} {
          display: grid;
          grid-template-columns: repeat(${Math.max(tiers.length, 1)}, 1fr);
          margin-top: 6px;
        }
        .olkc-mark-${uid} {
          text-align: right;
          font-size: 0.72rem; font-weight: 700;
          color: rgba(255, 252, 240, 0.5);
        }
        .olkc-mark-hit-${uid} { color: ${accentColor}; }
        @media (prefers-reduced-motion: reduce) {
          .olkc-fill-${uid} { animation: none; transition: none; }
        }
        @media (max-width: 820px) {
          .olkc-card-${uid} { grid-template-columns: 1fr; }
          .olkc-imgwrap-${uid} { order: -1; min-height: 200px; }
        }
      `}</style>
      <div className={`olkc-card-${uid}`}>
        <div className={`olkc-glow-${uid}`} />
        <div className={`olkc-body-${uid}`}>
          {eyebrow && <span className={`olkc-eyebrow-${uid}`}>{eyebrow}</span>}
          <h2 className={`olkc-heading-${uid}`}>
            {heading}
            <span className={`olkc-heading-solid-${uid}`}>{headingAccent}</span>
          </h2>
          <p className={`olkc-text-${uid}`}>{text}</p>
          <div className={`olkc-row-${uid}`}>
            <a href={ctaUrl} className={`olkc-cta-${uid}`}>
              {ctaText} →
            </a>
            {raised !== null && !showThermometer && (
              <span className={`olkc-raised-${uid}`}>
                <strong>${raised.toLocaleString("en-NZ")}</strong> {raisedSuffix}
              </span>
            )}
          </div>
          {showThermometer && raised !== null && (
            <div className={`olkc-thermo-${uid}`}>
              <div className={`olkc-thermo-top-${uid}`}>
                <span className={`olkc-thermo-num-${uid}`}>
                  ${raised.toLocaleString("en-NZ")}
                </span>
                <span className={`olkc-thermo-lbl-${uid}`}>{raisedSuffix}</span>
              </div>
              <div className={`olkc-track-${uid}`}>
                <div className={`olkc-fill-${uid}`} />
              </div>
              {tiers.length > 0 && (
                <div className={`olkc-marks-${uid}`}>
                  {tiers.map((t, i) => (
                    <span
                      key={i}
                      className={`olkc-mark-${uid}${raised >= t ? ` olkc-mark-hit-${uid}` : ""}`}
                    >
                      {fmt(t)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {kiwiSrc && (
          <div className={`olkc-imgwrap-${uid}`}>
            <img src={kiwiSrc} alt="" />
          </div>
        )}
      </div>
    </section>
  );
}
