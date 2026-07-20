"use client";

import React, { useState, useEffect, useId } from "react";

interface NeBannerProps {
  phrasePrefix?: string;
  phrase1?: string;
  phrase2?: string;
  phrase3?: string;
  phrase4?: string;
  phrase5?: string;
  phrase6?: string;
  closingLine?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: any;
  bgColor?: string;
  prefixColor?: string;
  accentColor?: string;
  closingColor?: string;
  ctaBgColor?: string;
  ctaTextColor?: string;
}

export default function NeBanner(props: NeBannerProps) {
  const {
    phrasePrefix = "Electrify",
    phrase1 = "your mum",
    phrase2 = "your dad",
    phrase3 = "your grumpy uncle",
    phrase4 = "your boss",
    phrase5 = "your mates",
    phrase6 = "everyone!",
    closingLine = "And then tell us how you did it.",
    subtitle = "Or tell us who influenced you.",
    ctaText = "Share Your Story",
    ctaHref = "#share",
    bgColor = "#234e4c",
    prefixColor = "#fdf7ea",
    accentColor = "#f5b731",
    closingColor = "#d1e0df",
    ctaBgColor = "#f5b731",
    ctaTextColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const phrases = [phrase1, phrase2, phrase3, phrase4, phrase5, phrase6].filter(Boolean);
  const resolvedHref =
    typeof ctaHref === "string" ? ctaHref : ctaHref?.href || "#share";

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseState, setPhraseState] = useState<"in" | "out">("in");

  useEffect(() => {
    if (phrases.length <= 1) return;
    const cycle = setInterval(() => {
      setPhraseState("out");
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setPhraseState("in");
      }, 350);
    }, 2400);
    return () => clearInterval(cycle);
  }, [phrases.length]);

  return (
    <div className={`ne-banner-root-${uid}`}>
      <section className={`ne-banner-${uid}`}>
        {/* Decorative spark dots */}
        <div className={`ne-banner-sparks-${uid}`} aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`ne-banner-spark-${uid} ne-banner-spark-${i}-${uid}`} />
          ))}
        </div>

        <div className={`ne-banner-inner-${uid}`}>
          <p className={`ne-banner-line-${uid}`}>
            <span className={`ne-banner-prefix-${uid}`}>{phrasePrefix}</span>
            <span className={`ne-banner-phrase-wrap-${uid}`}>
              <span
                key={phraseIdx}
                className={`ne-banner-phrase-${uid} ne-banner-phrase-${phraseState}-${uid}`}
                aria-live="polite"
              >
                {phrases[phraseIdx % phrases.length]}
              </span>
            </span>
          </p>

          <p className={`ne-banner-closing-${uid}`}>
            {closingLine}
            {subtitle && <span className={`ne-banner-sub-${uid}`}> {subtitle}</span>}
          </p>

          <a href={resolvedHref} className={`ne-banner-cta-${uid}`}>
            {ctaText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap');

        .ne-banner-root-${uid} { width: 100%; }

        .ne-banner-${uid} {
          position: relative;
          width: 100%;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(245, 183, 49, 0.15) 0%, transparent 60%),
            ${bgColor};
          padding: 70px 24px 80px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .ne-banner-sparks-${uid} {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .ne-banner-spark-${uid} {
          position: absolute;
          border-radius: 50%;
          background: ${accentColor};
          opacity: 0.3;
          animation: ne-banner-twinkle-${uid} 4s ease-in-out infinite;
        }
        ${Array.from({ length: 14 }).map((_, i) => {
          const top = ((i * 41) % 90) + 5;
          const left = ((i * 67 + 11) % 95) + 2;
          const delay = (i * 0.31) % 4;
          const size = 4 + (i % 4) * 2;
          return `.ne-banner-spark-${i}-${uid} { top: ${top}%; left: ${left}%; width: ${size}px; height: ${size}px; animation-delay: ${delay}s; }`;
        }).join("\n        ")}

        @keyframes ne-banner-twinkle-${uid} {
          0%, 100% { opacity: 0.12; transform: scale(0.8); }
          50% { opacity: 0.55; transform: scale(1.15); }
        }

        .ne-banner-inner-${uid} {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 18px;
        }

        .ne-banner-line-${uid} {
          font-family: 'Rubik', sans-serif;
          font-weight: 800;
          font-size: clamp(1.9rem, 5.2vw, 3.8rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1.05;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15em;
          justify-content: center;
          width: 100%;
        }

        .ne-banner-prefix-${uid} { color: ${prefixColor}; }

        .ne-banner-phrase-wrap-${uid} {
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          min-height: 1em;
          justify-content: center;
          width: 100%;
        }

        .ne-banner-phrase-${uid} {
          color: ${accentColor};
          will-change: transform, opacity;
          display: inline-block;
          white-space: nowrap;
        }

        .ne-banner-phrase-in-${uid} {
          animation: ne-banner-roll-in-${uid} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ne-banner-phrase-out-${uid} {
          animation: ne-banner-roll-out-${uid} 0.3s cubic-bezier(0.7, 0, 1, 0.5) forwards;
        }

        @keyframes ne-banner-roll-in-${uid} {
          0% { transform: translateY(70%) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes ne-banner-roll-out-${uid} {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-70%) scale(0.95); opacity: 0; }
        }

        .ne-banner-closing-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 500;
          color: ${closingColor};
          margin: 0;
          line-height: 1.6;
          max-width: 560px;
        }

        .ne-banner-sub-${uid} {
          color: #a8c5c3;
          font-style: italic;
          font-weight: 400;
        }

        .ne-banner-cta-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: ${ctaTextColor};
          background: ${ctaBgColor};
          padding: 16px 36px;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 18px rgba(245, 183, 49, 0.35);
        }
        .ne-banner-cta-${uid} svg {
          width: 18px; height: 18px;
          transition: transform 0.25s ease;
        }
        .ne-banner-cta-${uid}:hover {
          background: #ffc94d;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(245, 183, 49, 0.5);
        }
        .ne-banner-cta-${uid}:hover svg { transform: translateX(4px); }

        @media (max-width: 768px) {
          .ne-banner-${uid} { padding: 56px 18px 64px; }
          .ne-banner-line-${uid} { font-size: clamp(1.6rem, 7vw, 2.6rem); }
          .ne-banner-phrase-wrap-${uid} { min-width: 7em; }
        }

        @media (max-width: 480px) {
          .ne-banner-${uid} { padding: 44px 14px 52px; }
          .ne-banner-cta-${uid} { padding: 14px 28px; font-size: 0.95rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ne-banner-phrase-${uid},
          .ne-banner-spark-${uid} {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
