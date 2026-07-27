"use client";

import React, { useEffect, useId, useState } from "react";

interface NzmeThermometerProps {
  heading?: string;
  subheading?: string;
  raisedAmount?: string;
  tier1Amount?: string;
  tier1Label?: string;
  tier2Amount?: string;
  tier2Label?: string;
  tier3Amount?: string;
  tier3Label?: string;
  tier4Amount?: string;
  tier4Label?: string;
  neonColor?: string;
  darkColor?: string;
}

function parseAmount(val: string | undefined, fallback: number): number {
  if (!val) return fallback;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatNZD(n: number): string {
  return "$" + n.toLocaleString("en-NZ", { maximumFractionDigits: 0 });
}

export default function NzmeThermometer(props: NzmeThermometerProps) {
  const {
    heading = "The fundraising thermometer",
    subheading = "Four thresholds. We do something no matter what — but every dollar takes it up a notch.",
    raisedAmount = "0",
    tier1Amount = "5000",
    tier1Label = "Laser Kiwi suit + the big ride",
    tier2Amount = "50000",
    tier2Label = "Billboards + $10k of solar for homes",
    tier3Amount = "100000",
    tier3Label = "TV ads + $20k of solar for homes",
    tier4Amount = "250000",
    tier4Label = "The world's biggest Laser Kiwi",
    neonColor = "#4bf03c",
    darkColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const raised = parseAmount(raisedAmount, 0);
  const tiers = [
    { amount: parseAmount(tier1Amount, 5000), label: tier1Label },
    { amount: parseAmount(tier2Amount, 50000), label: tier2Label },
    { amount: parseAmount(tier3Amount, 100000), label: tier3Label },
    { amount: parseAmount(tier4Amount, 250000), label: tier4Label },
  ];

  // Tiers sit at even 25% steps; fill interpolates piecewise between them so
  // the $5k marker isn't crushed into the first 2% of the bar.
  const segStops = [0, ...tiers.map((t) => t.amount)];
  let pct = 0;
  for (let i = 1; i < segStops.length; i++) {
    if (raised >= segStops[i]) {
      pct = (i / tiers.length) * 100;
    } else {
      const segSpan = segStops[i] - segStops[i - 1];
      const into = Math.max(0, raised - segStops[i - 1]);
      pct = ((i - 1) / tiers.length) * 100 + (into / segSpan) * (100 / tiers.length);
      break;
    }
  }
  pct = Math.min(100, pct);

  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <section className={`nzmt-wrap-${uid}`}>
      <style>{`
        .nzmt-wrap-${uid} {
          background: #FFFCF0;
          padding: 88px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzmt-inner-${uid} { max-width: 980px; margin: 0 auto; }
        .nzmt-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px; text-align: center;
        }
        .nzmt-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78; text-align: center;
          max-width: 620px; margin: 0 auto 24px; line-height: 1.6;
        }
        .nzmt-raised-${uid} {
          text-align: center; margin-bottom: 44px;
        }
        .nzmt-raised-num-${uid} {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 900; color: ${darkColor};
        }
        .nzmt-raised-lbl-${uid} {
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #5c7a78;
        }
        .nzmt-track-${uid} {
          position: relative;
          height: 34px;
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          overflow: hidden;
        }
        .nzmt-fill-${uid} {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: ${fill}%;
          background: repeating-linear-gradient(
            -45deg, ${neonColor}, ${neonColor} 14px, #3ed432 14px, #3ed432 28px
          );
          transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nzmt-marks-${uid} {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 18px;
        }
        .nzmt-mark-${uid} {
          position: relative;
          text-align: right;
          padding: 0 6px 0 12px;
        }
        .nzmt-mark-${uid}::before {
          content: '';
          position: absolute; right: 0; top: -52px;
          width: 3px; height: 30px;
          background: ${darkColor};
          opacity: 0.35;
        }
        .nzmt-mark-hit-${uid}::before { background: #f5b731; opacity: 1; }
        .nzmt-mark-amt-${uid} {
          display: block;
          font-weight: 800; font-size: clamp(0.95rem, 1.8vw, 1.25rem);
          color: ${darkColor};
        }
        .nzmt-mark-lbl-${uid} {
          display: block;
          font-size: clamp(0.72rem, 1.3vw, 0.85rem);
          color: #5c7a78; line-height: 1.4; margin-top: 4px;
        }
        .nzmt-mark-hit-${uid} .nzmt-mark-amt-${uid}::after {
          content: ' \\2713';
          color: #3ed432;
        }
        @media (max-width: 640px) {
          .nzmt-wrap-${uid} { padding: 64px 20px; }
          .nzmt-mark-lbl-${uid} { display: none; }
        }
      `}</style>

      <div className={`nzmt-inner-${uid}`}>
        <h2 className={`nzmt-heading-${uid}`}>{heading}</h2>
        <p className={`nzmt-sub-${uid}`}>{subheading}</p>
        <div className={`nzmt-raised-${uid}`}>
          <div className={`nzmt-raised-num-${uid}`}>{formatNZD(raised)}</div>
          <div className={`nzmt-raised-lbl-${uid}`}>raised so far</div>
        </div>
        <div className={`nzmt-track-${uid}`}>
          <div className={`nzmt-fill-${uid}`} />
        </div>
        <div className={`nzmt-marks-${uid}`}>
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`nzmt-mark-${uid}${raised >= t.amount ? ` nzmt-mark-hit-${uid}` : ""}`}
            >
              <span className={`nzmt-mark-amt-${uid}`}>{formatNZD(t.amount)}</span>
              <span className={`nzmt-mark-lbl-${uid}`}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
