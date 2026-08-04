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
    intro1 = "As always, our approach is to try and capture mainstream and social media attention and share our serious message in an engaging way. To do that, we need to do something a bit mad, so we're sending Mike Casey on a mission to the Beehive dressed as a Laser Kiwi to promote the idea of New Zealand-made energy.",
    intro2 = "Everyone wins when we go electric. And in the coming years, New Zealand has a unique opportunity to set itself up as a beacon for the world to follow on. This campaign is a cherry on top of three years of relentless advocacy to ensure that happens.",
    card1Title = "Top-down",
    card1Text = "We want all our MPs, no matter where they are on the political spectrum, to push for more New Zealand-made energy running through more efficient electric machines, because electrification is key to our economic growth, energy security and emissions reduction goals.",
    card2Title = "Bottom-up",
    card2Text = "We want more New Zealanders to understand the benefits of going electric in their own lives. Energy is a low-interest category. We want to capture their attention.",
    card3Title = "A bit mad",
    card3Text = "If we get enough support, we'll go bigger and book billboards and TV ads, or actually build a massive Laser Kiwi that we will tow to Wellington.",
    stat1Number = "",
    stat1Label = "",
    stat2Number = "",
    stat2Label = "",
    stat3Number = "",
    stat3Label = "",
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
        {stats.length > 0 && (
          <div className={`nzab-stats-${uid}`}>
            {stats.map((s, i) => (
              <div key={i}>
                <span className={`nzab-statnum-${uid}`}>{s.num}</span>
                <span className={`nzab-statlbl-${uid}`}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
