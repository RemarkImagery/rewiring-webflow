"use client";

import React, { useId } from "react";

interface NzMadeBannerProps {
  bannerImage?: any;
  mikeImage?: any;
  backgroundImage?: any;
  heading?: string;
  headingAccent?: string;
  tagline?: string;
  ctaText?: string;
  ctaUrl?: string;
  bgColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function NzMadeBanner(props: NzMadeBannerProps) {
  const {
    bannerImage,
    mikeImage,
    backgroundImage,
    heading = "New Zealand",
    headingAccent = "Made Energy",
    tagline = "The status quo is a choice. But there is another option: make New Zealand-made energy our North Star.",
    ctaText = "Learn more",
    ctaUrl = "https://nzmadeenergy.nz",
    bgColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const bannerSrc = resolveImage(bannerImage);
  const mikeSrc = resolveImage(mikeImage);
  const bgSrc = resolveImage(backgroundImage);

  return (
    <section className={`nzmb-wrap-${uid}`}>
      <style>{`
        .nzmb-wrap-${uid} {
          position: relative;
          width: 100%;
          min-height: 600px;
          overflow: hidden;
          background: ${bgColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Rubik', sans-serif;
        }
        .nzmb-bg-${uid} {
          position: absolute; inset: 0;
          background: ${bgSrc ? `url('${bgSrc}') center/cover no-repeat` : bgColor};
          opacity: 0.7;
        }
        .nzmb-vignette-${uid} {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }
        .nzmb-banner-${uid} {
          position: absolute;
          top: -10px; left: 50%;
          transform: translateX(-50%);
          width: min(75vw, 800px);
          z-index: 3;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.7));
          pointer-events: none;
        }
        .nzmb-banner-${uid} img { width: 100%; display: block; }
        .nzmb-mike-${uid} {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          height: 55%;
          z-index: 4;
          pointer-events: none;
        }
        .nzmb-mike-${uid} img {
          height: 100%; width: auto; display: block;
          mix-blend-mode: screen;
        }
        .nzmb-content-${uid} {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 10;
          text-align: center;
          padding: 120px 20px 48px;
          background: linear-gradient(transparent, rgba(10,20,20,0.95) 70%);
        }
        .nzmb-heading-${uid} {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700; line-height: 1.08;
          color: #ffffff; margin-bottom: 12px;
        }
        .nzmb-accent-${uid} { color: #f5b731; }
        .nzmb-tagline-${uid} {
          font-size: clamp(0.9rem, 1.6vw, 1.1rem);
          color: rgba(209,224,223,0.9); max-width: 540px;
          margin: 0 auto 24px; line-height: 1.7;
        }
        .nzmb-cta-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif; font-size: 14px; font-weight: 600;
          padding: 14px 36px; text-decoration: none;
          background: #f5b731; color: ${bgColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          border: 3px solid #f5b731;
          transition: background 0.3s, color 0.3s;
          cursor: pointer;
        }
        .nzmb-cta-${uid}:hover { background: transparent; color: #f5b731; }
        @media (max-width: 600px) {
          .nzmb-wrap-${uid} { min-height: 500px; }
          .nzmb-banner-${uid} { width: 95vw; }
          .nzmb-mike-${uid} { height: 40%; }
          .nzmb-heading-${uid} { font-size: 1.8rem; }
        }
      `}</style>

      <div className={`nzmb-bg-${uid}`} />
      <div className={`nzmb-vignette-${uid}`} />

      {bannerSrc && (
        <div className={`nzmb-banner-${uid}`}>
          <img src={bannerSrc} alt="" />
        </div>
      )}

      {mikeSrc && (
        <div className={`nzmb-mike-${uid}`}>
          <img src={mikeSrc} alt="" />
        </div>
      )}

      <div className={`nzmb-content-${uid}`}>
        <h2 className={`nzmb-heading-${uid}`}>
          {heading}<br />
          <span className={`nzmb-accent-${uid}`}>{headingAccent}</span>
        </h2>
        <p className={`nzmb-tagline-${uid}`}>{tagline}</p>
        {ctaText && ctaUrl && (
          <a href={ctaUrl} className={`nzmb-cta-${uid}`}>{ctaText}</a>
        )}
      </div>
    </section>
  );
}
