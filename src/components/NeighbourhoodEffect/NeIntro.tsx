"use client";

import React, { useId } from "react";

interface NeIntroProps {
  para1?: string;
  para2?: string;
  highlight?: string;
  highlightLabel?: string;
  para3?: string;
  para4?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function NeIntro(props: NeIntroProps) {
  const {
    para1 = "We've been collecting stories of bill savings, self-sufficiency and emissions reductions from homeowners, farms and businesses that have gone electric for a while now — and they are a potent illustration of what's possible.",
    para2 = "For many, it feels like they've accessed a cheat code that unlocks a much cheaper, cleaner and more stable energy subscription. Some had to take a risk or pay a premium to go early on electric technology, but these pioneers are the ones who help create the conditions for others to adopt it — and in many cases, it's their experiences that help convince others to follow suit.",
    highlight = "Neighbourhood Effect",
    highlightLabel = "Why it works",
    para3 = "We are herding creatures, after all, and research shows that seeing others adopt rooftop solar increases the number of nearby installations — something called the 'neighbourhood effect'. It's in full swing right now, with more New Zealanders looking at EVs and solar than perhaps ever before.",
    para4 = "When it comes to technological changes, the majority tends to wait until lots of others have jumped on board before they decide to take the plunge. And our community groups are doing great work ensuring the neighbourhood effect takes hold in their areas.",
    bgColor = "#FFFCF0",
    textColor = "#1a3c3c",
    accentColor = "#2d5c5a",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`ne-intro-root-${uid}`}>
      <section className={`ne-intro-${uid}`}>
        <div className={`ne-intro-inner-${uid}`}>
          <p className={`ne-para-${uid}`}>{para1}</p>
          <p className={`ne-para-${uid}`}>{para2}</p>

          <div className={`ne-highlight-${uid}`}>
            <span className={`ne-highlight-label-${uid}`}>{highlightLabel}</span>
            <h3 className={`ne-highlight-title-${uid}`}>{highlight}</h3>
            <p className={`ne-highlight-text-${uid}`}>{para3}</p>
          </div>

          <p className={`ne-para-${uid}`}>{para4}</p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .ne-intro-root-${uid} { width: 100%; }

        .ne-intro-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: 80px 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
        }

        .ne-intro-inner-${uid} {
          max-width: 720px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ne-para-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.05rem, 1.6vw, 1.2rem);
          font-weight: 400;
          line-height: 1.75;
          color: ${textColor};
          margin: 0;
        }

        .ne-highlight-${uid} {
          background: #ffffff;
          border-left: 5px solid ${accentColor};
          border-radius: 0 16px 16px 0;
          padding: 28px 32px;
          margin: 16px 0;
          box-shadow: 0 4px 18px rgba(45, 92, 90, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ne-highlight-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${accentColor};
        }

        .ne-highlight-title-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.4rem, 2.6vw, 1.8rem);
          font-weight: 700;
          color: ${accentColor};
          margin: 0;
          line-height: 1.2;
        }

        .ne-highlight-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.1rem);
          font-weight: 400;
          line-height: 1.7;
          color: ${textColor};
          margin: 0;
        }

        @media (max-width: 480px) {
          .ne-intro-${uid} { padding: 56px 18px; }
          .ne-highlight-${uid} { padding: 22px 20px; }
        }
      `}</style>
    </div>
  );
}
