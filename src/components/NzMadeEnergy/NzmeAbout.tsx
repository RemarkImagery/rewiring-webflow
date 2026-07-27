"use client";

import React, { useId } from "react";

interface NzmeAboutProps {
  eyebrow?: string;
  heading?: string;
  intro1?: string;
  intro2?: string;
  card1Title?: string;
  card1Text?: string;
  card2Title?: string;
  card2Text?: string;
  card3Title?: string;
  card3Text?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  bgColor?: string;
  neonColor?: string;
}

export default function NzmeAbout(props: NzmeAboutProps) {
  const {
    eyebrow = "What's the big idea?",
    heading = "A serious message, delivered by a Laser Kiwi",
    intro1 = "Energy is a low-interest category - most New Zealanders switch off the moment it comes up. So we're doing something a bit mad to switch them back on: sending Mike Casey the length of the country to the Beehive, dressed as a Laser Kiwi, to make the case for New Zealand-made energy.",
    intro2 = "More than half of the energy New Zealand uses is imported. Energy independence doesn't come on ships - it comes from rooftops, hydro dams, wind turbines, geothermal wells and solar farms, running through efficient electric machines. Everyone wins when we go electric.",
    card1Title = "Top-down",
    card1Text = "Get every MP - whatever their colours - pushing for New Zealand-made energy, so electrification is baked into our national psyche well beyond the election.",
    card2Title = "Bottom-up",
    card2Text = "Show everyday New Zealanders what going electric does for their own lives: warmer homes, cheaper driving, lower bills.",
    card3Title = "A bit mad",
    card3Text = "Capture attention the Rewiring way - a Laser Kiwi mission to Parliament, and if the country gets behind it, the world's biggest ever Laser Kiwi.",
    stat1Number = "$7,600",
    stat1Label = "a household can save every year by going electric",
    stat2Number = ">50%",
    stat2Label = "of the energy New Zealand uses is imported",
    stat3Number = "Billions",
    stat3Label = "saved for the country when we run on our own electrons",
    bgColor = "#143a1e",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const cards = [
    { title: card1Title, text: card1Text },
    { title: card2Title, text: card2Text },
    { title: card3Title, text: card3Text },
  ].filter((c) => c.title && c.text);
  const stats = [
    { num: stat1Number, label: stat1Label },
    { num: stat2Number, label: stat2Label },
    { num: stat3Number, label: stat3Label },
  ].filter((s) => s.num && s.label);

  return (
    <section className={`nzab-wrap-${uid}`} id="about">
      <style>{`
        .nzab-wrap-${uid} {
          background: ${bgColor};
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzab-inner-${uid} { max-width: 1100px; margin: 0 auto; }
        .nzab-eyebrow-${uid} {
          display: block; text-align: center;
          font-size: 13px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${neonColor};
          margin-bottom: 14px;
        }
        .nzab-heading-${uid} {
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800; color: #FFFCF0;
          margin: 0 auto 26px; text-align: center;
          max-width: 760px; line-height: 1.15;
        }
        .nzab-intro-${uid} {
          font-size: clamp(1rem, 1.5vw, 1.13rem);
          color: rgba(255,252,240,0.85);
          line-height: 1.75;
          max-width: 760px;
          margin: 0 auto 18px;
          text-align: center;
        }
        .nzab-cards-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 22px;
          margin: 48px 0 48px;
        }
        .nzab-card-${uid} {
          background: rgba(255,252,240,0.06);
          border: 2px solid ${neonColor}55;
          border-radius: 8px 22px 8px 22px;
          padding: 26px 24px;
        }
        .nzab-cardnum-${uid} {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          font-weight: 900; font-size: 0.95rem;
          color: ${bgColor}; background: ${neonColor};
          border-radius: 50% 42% 55% 45%;
          margin-bottom: 14px;
        }
        .nzab-cardtitle-${uid} {
          font-size: 1.15rem; font-weight: 800; color: ${neonColor};
          margin: 0 0 10px;
        }
        .nzab-cardtext-${uid} {
          font-size: 0.93rem; color: rgba(255,252,240,0.8);
          line-height: 1.65; margin: 0;
        }
        .nzab-stats-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 22px;
          border-top: 2px dashed ${neonColor}44;
          padding-top: 40px;
          text-align: center;
        }
        .nzab-statnum-${uid} {
          display: block;
          font-size: clamp(1.9rem, 3.6vw, 2.6rem);
          font-weight: 900; color: #f5b731;
          line-height: 1.1;
        }
        .nzab-statlbl-${uid} {
          display: block;
          font-size: 0.88rem; color: rgba(255,252,240,0.7);
          line-height: 1.5; margin-top: 6px;
          max-width: 250px; margin-left: auto; margin-right: auto;
        }
        @media (max-width: 640px) {
          .nzab-wrap-${uid} { padding: 72px 24px; }
        }
      `}</style>

      <div className={`nzab-inner-${uid}`}>
        {eyebrow && <span className={`nzab-eyebrow-${uid}`}>{eyebrow}</span>}
        <h2 className={`nzab-heading-${uid}`}>{heading}</h2>
        {intro1 && <p className={`nzab-intro-${uid}`}>{intro1}</p>}
        {intro2 && <p className={`nzab-intro-${uid}`}>{intro2}</p>}
        <div className={`nzab-cards-${uid}`}>
          {cards.map((c, i) => (
            <div key={i} className={`nzab-card-${uid}`}>
              <span className={`nzab-cardnum-${uid}`}>{i + 1}</span>
              <h3 className={`nzab-cardtitle-${uid}`}>{c.title}</h3>
              <p className={`nzab-cardtext-${uid}`}>{c.text}</p>
            </div>
          ))}
        </div>
        <div className={`nzab-stats-${uid}`}>
          {stats.map((s, i) => (
            <div key={i}>
              <span className={`nzab-statnum-${uid}`}>{s.num}</span>
              <span className={`nzab-statlbl-${uid}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
