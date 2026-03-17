"use client";

import React, { useId } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevSavingsProps {
  heading?: string;
  body?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  detail1Title?: string;
  detail1Text?: string;
  detail2Title?: string;
  detail2Text?: string;
  bgColor?: string;
}

export default function WlevSavings(props: WlevSavingsProps) {
  const {
    heading = "EVs Save You Money",
    body = "We love EVs because they\u2019re kinder on your wallet. Cheaper energy, fewer moving parts, and lower lifetime costs.",
    stat1Number = "~$1.50/L",
    stat1Label = "equivalent cost to charge at home (incl. RUCs)",
    stat2Number = "20",
    stat2Label = "moving parts vs 2,000 in a petrol car",
    stat3Number = "67.5%",
    stat3Label = "the 5-year cost of a petrol car (EECA)",
    detail1Title = "Cheaper energy",
    detail1Text = "Charging at home at off-peak rates costs about $1.50/L equivalent. Rooftop solar pushes this even lower.",
    detail2Title = "Cheaper to maintain",
    detail2Text = "No oil changes, no exhaust system, no clutch or spark plugs. Hundreds of dollars saved every year.",
    bgColor = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");

  const stats = [
    { number: stat1Number, label: stat1Label },
    { number: stat2Number, label: stat2Label },
    { number: stat3Number, label: stat3Label },
  ];

  return (
    <div className={`wlev-sav-root-${uid}`}>
      <section className={`wlev-sav-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-sav-inner-${uid}`}>
          <h2 className={`wlev-sav-heading-${uid}`}>{heading}</h2>
          {renderRichText(body, `wlev-sav-body-${uid}`)}
          <div className={`wlev-sav-stats-${uid}`}>
            {stats.map((stat, i) => (
              <div key={i} className={`wlev-sav-card-${uid}`}>
                <span className={`wlev-sav-number-${uid}`}>{stat.number}</span>
                <span className={`wlev-sav-label-${uid}`}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={`wlev-sav-details-${uid}`}>
            <div className={`wlev-sav-detail-${uid}`}>
              <div className={`wlev-sav-detail-icon-${uid}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <strong className={`wlev-sav-detail-title-${uid}`}>{detail1Title}</strong>
                {renderRichText(detail1Text, `wlev-sav-detail-text-${uid}`)}
              </div>
            </div>
            <div className={`wlev-sav-detail-${uid}`}>
              <div className={`wlev-sav-detail-icon-${uid}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div>
                <strong className={`wlev-sav-detail-title-${uid}`}>{detail2Title}</strong>
                {renderRichText(detail2Text, `wlev-sav-detail-text-${uid}`)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');
        .wlev-sav-root-${uid} { width: 100%; }
        .wlev-sav-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; }
        .wlev-sav-inner-${uid} { max-width: 1000px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 32px; text-align: center; }
        .wlev-sav-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #1a3c3c; margin: 0; line-height: 1.2; }
        .wlev-sav-body-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #5a7a78; line-height: 1.7; max-width: 680px; margin: 0; }
        .wlev-sav-body-${uid} p { margin: 0 0 8px; }
        .wlev-sav-body-${uid} p:last-child { margin-bottom: 0; }
        .wlev-sav-stats-${uid} { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; width: 100%; margin-top: 12px; }
        .wlev-sav-card-${uid} { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 36px 24px; border: 3px dashed #f5b731; border-radius: 20px; background: #FFFCF0; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .wlev-sav-card-${uid}:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(26, 60, 60, 0.1); }
        .wlev-sav-number-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; color: #f5b731; line-height: 1.1; }
        .wlev-sav-label-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.9rem, 1.5vw, 1.05rem); font-weight: 400; color: #5a7a78; line-height: 1.5; }
        .wlev-sav-details-${uid} { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; width: 100%; max-width: 800px; margin-top: 8px; }
        .wlev-sav-detail-${uid} { display: flex; gap: 16px; text-align: left; padding: 28px 24px; background: #f8fafa; border-radius: 16px; }
        .wlev-sav-detail-icon-${uid} { flex-shrink: 0; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #FFFCF0; border-radius: 12px; }
        .wlev-sav-detail-title-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.5vw, 1.1rem); font-weight: 600; color: #1a3c3c; display: block; margin-bottom: 6px; }
        .wlev-sav-detail-text-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 400; color: #5a7a78; line-height: 1.6; }
        .wlev-sav-detail-text-${uid} p { margin: 0; }
        @media (max-width: 768px) { .wlev-sav-stats-${uid} { grid-template-columns: 1fr; gap: 20px; max-width: 400px; } .wlev-sav-details-${uid} { grid-template-columns: 1fr; } .wlev-sav-section-${uid} { padding: 60px 24px; } }
        @media (max-width: 480px) { .wlev-sav-section-${uid} { padding: 40px 16px; } .wlev-sav-card-${uid} { padding: 28px 20px; } }
      `}</style>
    </div>
  );
}
