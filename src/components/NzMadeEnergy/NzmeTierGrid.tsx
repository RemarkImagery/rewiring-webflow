"use client";

import React, { useId } from "react";

interface NzmeTierGridProps {
  heading?: string;
  subheading?: string;
  raisedAmount?: string;
  tier1Amount?: string;
  tier1Title?: string;
  tier1Text?: string;
  tier1Image?: any;
  tier2Amount?: string;
  tier2Title?: string;
  tier2Text?: string;
  tier2Image?: any;
  tier3Amount?: string;
  tier3Title?: string;
  tier3Text?: string;
  tier3Image?: any;
  tier4Amount?: string;
  tier4Title?: string;
  tier4Text?: string;
  tier4Image?: any;
  darkColor?: string;
  neonColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function parseAmount(val: string | undefined, fallback: number): number {
  if (!val) return fallback;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatNZD(n: number): string {
  return "$" + n.toLocaleString("en-NZ", { maximumFractionDigits: 0 });
}

export default function NzmeTierGrid(props: NzmeTierGridProps) {
  const {
    heading = "The stretch goals",
    subheading = "The campaign is tiered so we do something great no matter what. Hit a threshold and the next thing unlocks.",
    raisedAmount = "0",
    tier1Amount = "5000",
    tier1Title = "The Laser Kiwi suit",
    tier1Text = "We buy Mike a Kiwi suit, laserify it, and he rides the length of the South Island — 944 km of electric hotspots, entrepreneurs and community groups, arriving at the Beehive with a Hiko Hikoi of EVs and e-bikes.",
    tier1Image,
    tier2Amount = "50000",
    tier2Title = "Billboards + solar for homes",
    tier2Text = "A nationwide billboard campaign pushing New Zealand-made energy — plus $10,000 of plug-in solar panels donated to low-income homes.",
    tier2Image,
    tier3Amount = "100000",
    tier3Title = "Prime-time TV ads",
    tier3Text = "TV ads take the message mainstream before the election — plus $20,000 of plug-in solar panels for low-income homes.",
    tier3Image,
    tier4Amount = "250000",
    tier4Title = "The world's biggest Laser Kiwi",
    tier4Text = "The full ad campaign, $50,000 of solar for low-income homes, and the world's biggest ever Laser Kiwi — solar panels on its back, green laser eyes — built and towed to Wellington.",
    tier4Image,
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const raised = parseAmount(raisedAmount, 0);
  const tiers = [
    { amount: parseAmount(tier1Amount, 5000), title: tier1Title, text: tier1Text, img: resolveImage(tier1Image) },
    { amount: parseAmount(tier2Amount, 50000), title: tier2Title, text: tier2Text, img: resolveImage(tier2Image) },
    { amount: parseAmount(tier3Amount, 100000), title: tier3Title, text: tier3Text, img: resolveImage(tier3Image) },
    { amount: parseAmount(tier4Amount, 250000), title: tier4Title, text: tier4Text, img: resolveImage(tier4Image) },
  ];

  return (
    <section className={`nztg-wrap-${uid}`} id="tiers">
      <style>{`
        .nztg-wrap-${uid} {
          background: #FFFCF0;
          padding: 40px 32px 96px;
          font-family: 'Rubik', sans-serif;
        }
        .nztg-inner-${uid} { max-width: 1180px; margin: 0 auto; }
        .nztg-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px; text-align: center;
        }
        .nztg-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78; text-align: center;
          max-width: 640px; margin: 0 auto 52px; line-height: 1.6;
        }
        .nztg-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 26px;
        }
        .nztg-card-${uid} {
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .nztg-card-${uid}:hover {
          transform: translateY(-6px) rotate(-0.5deg);
          box-shadow: 0 18px 40px rgba(26,60,60,0.18);
        }
        .nztg-card-hit-${uid} { border-color: #3ed432; }
        .nztg-imgwrap-${uid} {
          background: #FFFCF0;
          border-bottom: 3px dashed ${darkColor}33;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .nztg-imgwrap-${uid} img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .nztg-body-${uid} { padding: 22px 22px 26px; flex: 1; display: flex; flex-direction: column; }
        .nztg-badge-${uid} {
          display: inline-block; align-self: flex-start;
          font-size: 12px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${darkColor};
          background: #f5b731;
          padding: 5px 14px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          margin-bottom: 14px;
        }
        .nztg-badge-hit-${uid} { background: ${neonColor}; }
        .nztg-amount-${uid} {
          font-size: 1.9rem; font-weight: 900; color: ${darkColor};
          line-height: 1; margin-bottom: 6px;
        }
        .nztg-title-${uid} {
          font-size: 1.12rem; font-weight: 700; color: ${darkColor};
          margin: 0 0 10px;
        }
        .nztg-text-${uid} {
          font-size: 0.92rem; color: #5c7a78; line-height: 1.65; margin: 0;
        }
        @media (max-width: 640px) {
          .nztg-wrap-${uid} { padding: 24px 20px 72px; }
        }
      `}</style>

      <div className={`nztg-inner-${uid}`}>
        <h2 className={`nztg-heading-${uid}`}>{heading}</h2>
        <p className={`nztg-sub-${uid}`}>{subheading}</p>
        <div className={`nztg-grid-${uid}`}>
          {tiers.map((t, i) => {
            const hit = raised >= t.amount;
            return (
              <div key={i} className={`nztg-card-${uid}${hit ? ` nztg-card-hit-${uid}` : ""}`}>
                {t.img && (
                  <div className={`nztg-imgwrap-${uid}`}>
                    <img src={t.img} alt={t.title} />
                  </div>
                )}
                <div className={`nztg-body-${uid}`}>
                  <span className={`nztg-badge-${uid}${hit ? ` nztg-badge-hit-${uid}` : ""}`}>
                    {hit ? "Unlocked!" : `Tier ${i + 1}`}
                  </span>
                  <div className={`nztg-amount-${uid}`}>{formatNZD(t.amount)}</div>
                  <h3 className={`nztg-title-${uid}`}>{t.title}</h3>
                  <p className={`nztg-text-${uid}`}>{t.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
