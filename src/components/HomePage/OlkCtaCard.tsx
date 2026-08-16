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
    liveTotalsUrl = "https://nzme-raisely-total.oj-f3d.workers.dev",
    raisedSuffix = "raised so far",
    bgColor = "#143a1e",
    accentColor = "#4bf03c",
    buttonColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  // Ships with the campaign hero art; picking an image in Webflow overrides it.
  const kiwiSrc =
    resolveImage(kiwiImage) ||
    "https://pages.rewiring.nz/themes/rewiring/images/olk/nzme-hero-bg-felt.jpeg";
  const [raised, setRaised] = useState<number | null>(null);

  useEffect(() => {
    if (!liveTotalsUrl) return;
    fetch(liveTotalsUrl)
      .then((r) => r.json())
      .then((j) => {
        if (j && typeof j.raised === "number" && j.raised > 0) setRaised(j.raised);
      })
      .catch(() => {});
  }, [liveTotalsUrl]);

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
            {raised !== null && (
              <span className={`olkc-raised-${uid}`}>
                <strong>${raised.toLocaleString("en-NZ")}</strong> {raisedSuffix}
              </span>
            )}
          </div>
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
