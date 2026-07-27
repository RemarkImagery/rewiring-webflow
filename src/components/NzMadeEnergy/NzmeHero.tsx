"use client";

import React, { useId } from "react";

interface NzmeHeroProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  tagline?: string;
  ctaText?: string;
  ctaUrl?: any;
  secondaryCtaText?: string;
  secondaryCtaUrl?: any;
  kiwiImage?: any;
  backgroundImage?: any;
  bgColor?: string;
  neonColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function resolveLink(val: any, fallback: string): string {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.href) return val.href;
  return fallback;
}

export default function NzmeHero(props: NzmeHeroProps) {
  const {
    eyebrow = "Operation Laser Kiwi",
    headingLine1 = "New Zealand",
    headingLine2 = "Made Energy",
    tagline = "We're sending Mike Casey to the Beehive dressed as a Laser Kiwi. The more you chip in, the bigger this gets — billboards, TV ads, and maybe the world's biggest ever Laser Kiwi towed to Wellington.",
    ctaText = "Donate now",
    ctaUrl = "#donate",
    secondaryCtaText = "See the stretch goals",
    secondaryCtaUrl = "#tiers",
    kiwiImage,
    backgroundImage,
    bgColor = "#143a1e",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const kiwiSrc = resolveImage(kiwiImage);
  const bgSrc = resolveImage(backgroundImage);
  const ctaHref = resolveLink(ctaUrl, "#donate");
  const secondaryHref = resolveLink(secondaryCtaUrl, "#tiers");
  const twoCol = Boolean(kiwiSrc && !bgSrc);

  return (
    <section className={`nzmh-wrap-${uid}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');
        .nzmh-wrap-${uid} {
          position: relative;
          width: 100%;
          min-height: 88vh;
          overflow: hidden;
          background: ${bgColor};
          display: flex;
          align-items: center;
          font-family: 'Rubik', sans-serif;
        }
        .nzmh-bg-${uid} {
          position: absolute; inset: 0;
          background: url('${bgSrc || ""}') center / cover no-repeat;
        }
        .nzmh-scrim-${uid} {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(8,26,12,0.86) 0%, rgba(8,26,12,0.55) 42%, rgba(8,26,12,0.08) 75%, rgba(8,26,12,0.25) 100%),
            linear-gradient(180deg, rgba(8,26,12,0.35) 0%, transparent 30%, transparent 70%, rgba(8,26,12,0.55) 100%);
          pointer-events: none;
        }
        .nzmh-glow-${uid} {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 70% 45%, ${neonColor}14 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 20% 80%, ${neonColor}0d 0%, transparent 70%);
          pointer-events: none;
        }
        .nzmh-inner-${uid} {
          position: relative; z-index: 2;
          max-width: 1180px; margin: 0 auto;
          padding: 96px 32px 72px;
          display: grid;
          grid-template-columns: ${twoCol ? "1.15fr 0.85fr" : "1fr"};
          gap: 40px;
          align-items: center;
          width: 100%;
        }
        .nzmh-copy-${uid} { max-width: ${twoCol ? "none" : "640px"}; }
        .nzmh-copy-${uid} .nzmh-tagline-${uid} {
          ${bgSrc ? "text-shadow: 0 1px 10px rgba(8,26,12,0.8);" : ""}
        }
        .nzmh-eyebrow-${uid} {
          display: inline-block;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${bgColor};
          background: ${neonColor};
          padding: 8px 18px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          margin-bottom: 24px;
        }
        .nzmh-heading-${uid} {
          font-size: clamp(2.6rem, 6.4vw, 5.2rem);
          font-weight: 900;
          line-height: 0.98;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          color: transparent;
          -webkit-text-stroke: 3px ${neonColor};
          text-shadow: 0 0 22px ${neonColor}59;
          margin: 0 0 8px;
        }
        .nzmh-heading-solid-${uid} {
          display: block;
          color: ${neonColor};
          -webkit-text-stroke: 0;
          text-shadow: 0 0 30px ${neonColor}73;
        }
        .nzmh-tagline-${uid} {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.7;
          color: rgba(255, 252, 240, 0.88);
          max-width: 520px;
          margin: 20px 0 32px;
        }
        .nzmh-ctas-${uid} { display: flex; gap: 16px; flex-wrap: wrap; }
        .nzmh-cta-${uid} {
          display: inline-block;
          font-size: 15px; font-weight: 700;
          padding: 15px 38px; text-decoration: none;
          background: #f5b731; color: #1a3c3c;
          border: 3px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
        }
        .nzmh-cta-${uid}:hover { background: transparent; color: #f5b731; }
        .nzmh-cta2-${uid} {
          display: inline-block;
          font-size: 15px; font-weight: 700;
          padding: 15px 38px; text-decoration: none;
          background: transparent; color: ${neonColor};
          border: 3px solid ${neonColor};
          border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px;
          transition: background 0.3s, color 0.3s;
        }
        .nzmh-cta2-${uid}:hover { background: ${neonColor}; color: ${bgColor}; }
        .nzmh-kiwi-${uid} { position: relative; text-align: center; }
        .nzmh-kiwi-${uid} img {
          width: min(100%, 460px);
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.45));
          animation: nzmh-bob-${uid} 5s ease-in-out infinite;
        }
        @keyframes nzmh-bob-${uid} {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @media (max-width: 820px) {
          .nzmh-inner-${uid} { grid-template-columns: 1fr; padding: 72px 24px 56px; text-align: center; }
          .nzmh-tagline-${uid} { margin-left: auto; margin-right: auto; }
          .nzmh-ctas-${uid} { justify-content: center; }
          .nzmh-kiwi-${uid} img { width: min(80%, 340px); }
        }
      `}</style>

      {bgSrc && <div className={`nzmh-bg-${uid}`} />}
      {bgSrc && <div className={`nzmh-scrim-${uid}`} />}
      <div className={`nzmh-glow-${uid}`} />
      <div className={`nzmh-inner-${uid}`}>
        <div className={`nzmh-copy-${uid}`}>
          {eyebrow && <span className={`nzmh-eyebrow-${uid}`}>{eyebrow}</span>}
          <h1 className={`nzmh-heading-${uid}`}>
            {headingLine1}
            <span className={`nzmh-heading-solid-${uid}`}>{headingLine2}</span>
          </h1>
          <p className={`nzmh-tagline-${uid}`}>{tagline}</p>
          <div className={`nzmh-ctas-${uid}`}>
            {ctaText && <a href={ctaHref} className={`nzmh-cta-${uid}`}>{ctaText}</a>}
            {secondaryCtaText && (
              <a href={secondaryHref} className={`nzmh-cta2-${uid}`}>{secondaryCtaText}</a>
            )}
          </div>
        </div>
        {twoCol && (
          <div className={`nzmh-kiwi-${uid}`}>
            <img src={kiwiSrc} alt="Laser Kiwi with solar panels firing green laser eyes" />
          </div>
        )}
      </div>
    </section>
  );
}
