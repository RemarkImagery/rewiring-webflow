"use client";

import React, { useId } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevBenefitsProps {
  heading?: string;
  subtitle?: string;
  card1Title?: string;
  card1Desc?: string;
  card2Title?: string;
  card2Desc?: string;
  card3Title?: string;
  card3Desc?: string;
  card4Title?: string;
  card4Desc?: string;
  card5Title?: string;
  card5Desc?: string;
  card6Title?: string;
  card6Desc?: string;
  bgColor?: string;
}

const icons = [
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M16 30c0-4 3-6 8-6s8 2 8 6" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round" opacity="0.3"/><path d="M18 20c0 0 2-4 6-4s6 4 6 4" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="28" x2="24" y2="34" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="3" fill="#f5b731" opacity="0.5"/></svg>`,
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M24 12c-5 0-10 4-10 10 0 4 2 6 5 8 1.5 1 2 2.5 2 4h6c0-1.5.5-3 2-4 3-2 5-4 5-8 0-6-5-10-10-10z" fill="#2d5c5a" opacity="0.15"/><path d="M24 12c-1 4-4 6-4 10s2 6 4 8c2-2 4-4 4-8s-3-6-4-10z" fill="#2d5c5a" opacity="0.3"/><text x="24" y="30" text-anchor="middle" font-family="Rubik,sans-serif" font-size="11" font-weight="700" fill="#2d5c5a">60%</text></svg>`,
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M27 10L19 26h8l-4 14 12-18h-9l4-12z" fill="#f5b731" stroke="#2d5c5a" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M16 28l4-12h8l4 12" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="20" r="4" fill="#f5b731" opacity="0.4"/><text x="24" y="23" text-anchor="middle" font-family="Rubik,sans-serif" font-size="9" font-weight="700" fill="#2d5c5a">20x</text><path d="M15 32h18" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><rect x="16" y="18" width="16" height="12" rx="2" stroke="#2d5c5a" stroke-width="2" fill="none"/><path d="M20 18v-4h8v4" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="24" x2="28" y2="24" stroke="#f5b731" stroke-width="2.5" stroke-linecap="round"/><line x1="24" y1="21" x2="24" y2="27" stroke="#f5b731" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><rect x="18" y="14" width="12" height="20" rx="3" stroke="#2d5c5a" stroke-width="2" fill="none"/><rect x="20" y="17" width="8" height="6" rx="1" fill="#f5b731" opacity="0.4"/><line x1="22" y1="26" x2="26" y2="26" stroke="#2d5c5a" stroke-width="1.5" stroke-linecap="round"/><line x1="22" y1="29" x2="26" y2="29" stroke="#2d5c5a" stroke-width="1.5" stroke-linecap="round"/><text x="24" y="21" text-anchor="middle" font-family="Rubik,sans-serif" font-size="6" font-weight="700" fill="#2d5c5a">95%</text></svg>`,
];

export default function WlevBenefits(props: WlevBenefitsProps) {
  const {
    heading = "More Reasons Kiwis Love EVs",
    subtitle = "It\u2019s not just about the money \u2014 EVs are better in almost every way.",
    card1Title = "Quieter & Smoother",
    card1Desc = "Much less noise and vibration. Smooth, instant acceleration with no gear changes. No exhaust fumes improving air quality in our neighbourhoods.",
    card2Title = "60% Fewer Emissions",
    card2Desc = "Nearly 90% of NZ\u2019s electricity is renewable. An EV here emits up to 90% less CO\u2082 per km. Even factoring in manufacturing, 60% fewer lifetime emissions.",
    card3Title = "\u2018Free Fuel\u2019",
    card3Desc = "Regenerative braking recovers energy while stopping or going downhill. One-pedal driving means your brakes barely wear out.",
    card4Title = "20x Safer",
    card4Desc = "Petrol cars are around 20 times more likely to catch fire. No flammable fuel tank means a fundamentally safer vehicle.",
    card5Title = "Power On The Go",
    card5Desc = "Vehicle-to-Load lets you power kettles, fridges, power tools \u2014 great for camping and trade work. V2G can even back up your home for days.",
    card6Title = "Batteries Built to Last",
    card6Desc = "15\u201320 year lifespan, 80% capacity after a decade. Warranties of 8 years / 160,000km. And 95% of battery materials can be recovered and reused.",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");

  const cards = [
    { title: card1Title, desc: card1Desc },
    { title: card2Title, desc: card2Desc },
    { title: card3Title, desc: card3Desc },
    { title: card4Title, desc: card4Desc },
    { title: card5Title, desc: card5Desc },
    { title: card6Title, desc: card6Desc },
  ];

  return (
    <div className={`wlev-ben-root-${uid}`}>
      <section className={`wlev-ben-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-ben-inner-${uid}`}>
          <div className={`wlev-ben-header-${uid}`}>
            <h2 className={`wlev-ben-heading-${uid}`}>{heading}</h2>
            <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-ben-squiggle-${uid}`} />
            <p className={`wlev-ben-subtitle-${uid}`}>{subtitle}</p>
          </div>
          <div className={`wlev-ben-grid-${uid}`}>
            {cards.map((b, i) => (
              <div key={i} className={`wlev-ben-card-${uid}`}>
                <div className={`wlev-ben-icon-${uid}`} dangerouslySetInnerHTML={{ __html: icons[i] }} />
                <h3 className={`wlev-ben-title-${uid}`}>{b.title}</h3>
                {renderRichText(b.desc, `wlev-ben-desc-${uid}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');
        .wlev-ben-root-${uid} { width: 100%; }
        .wlev-ben-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; }
        .wlev-ben-inner-${uid} { max-width: 1100px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 48px; }
        .wlev-ben-header-${uid} { text-align: center; display: flex; flex-direction: column; gap: 12px; max-width: 640px; }
        .wlev-ben-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #1a3c3c; margin: 0; line-height: 1.2; }
        .wlev-ben-subtitle-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #5a7a78; margin: 0; line-height: 1.6; }
        .wlev-ben-grid-${uid} { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; width: 100%; }
        .wlev-ben-card-${uid} { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 36px 28px; background: #ffffff; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; box-shadow: 0 2px 12px rgba(26, 60, 60, 0.06); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .wlev-ben-card-${uid}:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(26, 60, 60, 0.12); }
        .wlev-ben-icon-${uid} { width: 48px; height: 48px; flex-shrink: 0; }
        .wlev-ben-icon-${uid} svg { width: 48px; height: 48px; }
        .wlev-ben-title-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.05rem, 1.8vw, 1.2rem); font-weight: 600; color: #1a3c3c; margin: 0; line-height: 1.3; }
        .wlev-ben-desc-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.9rem, 1.5vw, 1rem); font-weight: 400; color: #5a7a78; margin: 0; line-height: 1.6; }
        .wlev-ben-desc-${uid} p { margin: 0; }
        .wlev-ben-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }
        @media (max-width: 900px) { .wlev-ben-grid-${uid} { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .wlev-ben-grid-${uid} { grid-template-columns: 1fr; gap: 20px; } .wlev-ben-section-${uid} { padding: 60px 24px; } .wlev-ben-card-${uid} { padding: 28px 24px; } }
        @media (max-width: 480px) { .wlev-ben-section-${uid} { padding: 40px 16px; } }
      `}</style>
    </div>
  );
}
