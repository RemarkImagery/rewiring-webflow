"use client";

import React, { useEffect, useId, useState } from "react";

interface NzmeThermometerProps {
  heading?: string;
  subheading?: string;
  raisedAmount?: string;
  liveTotalsUrl?: string;
  kiwiImage?: any;
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

export default function NzmeThermometer(props: NzmeThermometerProps) {
  const {
    heading = "The fundraising thermometer",
    subheading = "Four thresholds. We do something no matter what — but every dollar takes it up a notch.",
    raisedAmount = "0",
    liveTotalsUrl,
    kiwiImage,
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
  const kiwiSrc = resolveImage(kiwiImage);
  const propRaised = parseAmount(raisedAmount, 0);
  const [raised, setRaised] = useState(propRaised);
  useEffect(() => setRaised(propRaised), [propRaised]);
  useEffect(() => {
    if (!liveTotalsUrl) return;
    let alive = true;
    fetch(liveTotalsUrl)
      .then((r) => r.json())
      .then((j) => {
        if (alive && typeof j.raised === "number") setRaised(j.raised);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [liveTotalsUrl]);

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

  // Animated fill width (eases out over 1.6s once mounted / on new totals).
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);

  // Count-up on the big raised number, synced to the same duration as the bar.
  const [displayRaised, setDisplayRaised] = useState(0);
  useEffect(() => {
    if (raised <= 0) {
      setDisplayRaised(0);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const dur = 1600;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayRaised(Math.round(raised * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const delay = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 300);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [raised]);

  return (
    <section className={`nzmt-wrap-${uid}`}>
      <style>{`
        .nzmt-wrap-${uid} {
          background: #FFFCF0;
          padding: 88px 32px 72px;
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
          text-align: center; margin-bottom: ${kiwiSrc ? "110px" : "44px"};
        }
        .nzmt-raised-num-${uid} {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 900; color: ${darkColor};
          font-variant-numeric: tabular-nums;
        }
        .nzmt-raised-lbl-${uid} {
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #5c7a78;
        }
        .nzmt-trackwrap-${uid} { position: relative; }
        .nzmt-track-${uid} {
          position: relative;
          height: 64px;
          background: #ffffff;
          border: 4px solid ${darkColor};
          border-radius: 255px 20px 225px 20px / 30px 225px 30px 255px;
          overflow: hidden;
        }
        .nzmt-fill-${uid} {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: ${fill}%;
          overflow: hidden;
          background: repeating-linear-gradient(
            -45deg, ${neonColor}, ${neonColor} 20px, #3ed432 20px, #3ed432 40px
          );
          transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1);
          animation: nzmt-stripes-${uid} 0.8s linear infinite,
                     nzmt-glow-${uid} 2.2s ease-in-out infinite;
        }
        @keyframes nzmt-stripes-${uid} {
          to { background-position: 56.6px 0; }
        }
        @keyframes nzmt-glow-${uid} {
          0%, 100% { box-shadow: 0 0 10px ${neonColor}66, inset 0 0 6px rgba(255,255,255,0.25); }
          50% { box-shadow: 0 0 26px ${neonColor}cc, inset 0 0 12px rgba(255,255,255,0.45); }
        }
        .nzmt-fill-${uid}::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%);
          transform: translateX(-100%);
          animation: nzmt-shimmer-${uid} 2.6s ease-in-out infinite;
        }
        @keyframes nzmt-shimmer-${uid} {
          0% { transform: translateX(-100%); }
          55%, 100% { transform: translateX(100%); }
        }
        .nzmt-kiwi-${uid} {
          position: absolute;
          left: ${fill}%;
          bottom: 44px;
          transform: translateX(-50%);
          width: clamp(72px, 9vw, 108px);
          z-index: 3;
          transition: left 1.6s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .nzmt-kiwi-${uid} img {
          width: 100%; display: block;
          filter: drop-shadow(0 0 12px ${neonColor}88) drop-shadow(0 6px 10px rgba(26,60,60,0.3));
          animation: nzmt-hop-${uid} 1.1s ease-in-out infinite;
        }
        @keyframes nzmt-hop-${uid} {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          30% { transform: translateY(-9px) rotate(2deg); }
          60% { transform: translateY(-2px) rotate(-1deg); }
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
          position: absolute; right: 0; top: -82px;
          width: 4px; height: 56px;
          background: ${darkColor};
          opacity: 0.35;
        }
        .nzmt-mark-hit-${uid}::before {
          background: #f5b731; opacity: 1;
          box-shadow: 0 0 10px #f5b731aa;
        }
        .nzmt-mark-amt-${uid} {
          display: inline-block;
          font-weight: 800; font-size: clamp(0.95rem, 1.8vw, 1.25rem);
          color: ${darkColor};
        }
        .nzmt-mark-hit-${uid} .nzmt-mark-amt-${uid} {
          animation: nzmt-pop-${uid} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.7s backwards;
        }
        @keyframes nzmt-pop-${uid} {
          0% { transform: scale(1); }
          40% { transform: scale(1.35) rotate(-3deg); }
          100% { transform: scale(1); }
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
          .nzmt-wrap-${uid} { padding: 64px 20px 56px; }
          .nzmt-mark-lbl-${uid} { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzmt-fill-${uid}, .nzmt-fill-${uid}::after, .nzmt-kiwi-${uid} img,
          .nzmt-mark-hit-${uid} .nzmt-mark-amt-${uid} { animation: none; }
        }
      `}</style>

      <div className={`nzmt-inner-${uid}`}>
        <h2 className={`nzmt-heading-${uid}`}>{heading}</h2>
        <p className={`nzmt-sub-${uid}`}>{subheading}</p>
        <div className={`nzmt-raised-${uid}`}>
          <div className={`nzmt-raised-num-${uid}`}>{formatNZD(displayRaised)}</div>
          <div className={`nzmt-raised-lbl-${uid}`}>raised so far</div>
        </div>
        <div className={`nzmt-trackwrap-${uid}`}>
          {kiwiSrc && (
            <div className={`nzmt-kiwi-${uid}`}>
              <img src={kiwiSrc} alt="" />
            </div>
          )}
          <div className={`nzmt-track-${uid}`}>
            <div className={`nzmt-fill-${uid}`} />
          </div>
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
