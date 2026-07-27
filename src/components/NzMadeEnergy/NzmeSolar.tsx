"use client";

import React, { useId } from "react";

interface NzmeSolarProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  outro?: string;
  image?: any;
  chip1Raised?: string;
  chip1Solar?: string;
  chip2Raised?: string;
  chip2Solar?: string;
  chip3Raised?: string;
  chip3Solar?: string;
  ctaText?: string;
  ctaUrl?: any;
  darkColor?: string;
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

export default function NzmeSolar(props: NzmeSolarProps) {
  const {
    eyebrow = "The charitable component",
    heading = "Plug-in solar for low-income homes",
    intro = "If we reach our stretch targets, we will commit to buying plug-in solar panels that we can give to low-income homes. The further the thermometer climbs, the more homes get New Zealand-made energy on the wall.",
    outro = "The charitable component is also something that should inspire plenty of support.",
    image,
    chip1Raised = "$50,000 raised",
    chip1Solar = "$10,000 worth of plug-in solar panels for low-income homes",
    chip2Raised = "$100,000 raised",
    chip2Solar = "$20,000 worth of plug-in solar panels for low-income homes",
    chip3Raised = "$250,000 raised",
    chip3Solar = "$50,000 worth of plug-in solar panels for low-income homes",
    ctaText = "Push the thermometer up",
    ctaUrl = "#donate",
    darkColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const imgSrc = resolveImage(image);
  const ctaHref = resolveLink(ctaUrl, "#donate");
  const chips = [
    { raised: chip1Raised, solar: chip1Solar },
    { raised: chip2Raised, solar: chip2Solar },
    { raised: chip3Raised, solar: chip3Solar },
  ].filter((c) => c.raised && c.solar);

  return (
    <section className={`nzsl-wrap-${uid}`} id="solar">
      <style>{`
        .nzsl-wrap-${uid} {
          background: #ffffff;
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzsl-inner-${uid} {
          max-width: 1100px; margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: center;
        }
        .nzsl-imgwrap-${uid} {
          background: #FFFCF0;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          overflow: hidden;
        }
        .nzsl-imgwrap-${uid} img { width: 100%; display: block; }
        .nzsl-eyebrow-${uid} {
          display: block;
          font-size: 13px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #d99a06;
          margin-bottom: 12px;
        }
        .nzsl-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 16px; line-height: 1.15;
        }
        .nzsl-intro-${uid} {
          font-size: 1.05rem; color: #5c7a78;
          line-height: 1.7; margin: 0 0 26px;
        }
        .nzsl-chips-${uid} { display: flex; flex-direction: column; gap: 12px; margin-bottom: 26px; }
        .nzsl-chip-${uid} {
          display: flex; align-items: center; gap: 14px;
          background: #FFFCF0;
          border: 2px dashed ${darkColor}55;
          border-radius: 12px 4px 12px 4px;
          padding: 12px 16px;
        }
        .nzsl-chip-raised-${uid} {
          flex-shrink: 0;
          font-size: 0.95rem; font-weight: 900; color: ${darkColor};
          background: #f5b731;
          padding: 6px 14px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          white-space: nowrap;
        }
        .nzsl-chip-solar-${uid} {
          font-size: 0.9rem; color: #5c7a78; line-height: 1.45;
        }
        .nzsl-outro-${uid} {
          font-size: 0.95rem; font-style: italic; color: #5c7a78;
          margin: 0 0 26px;
        }
        .nzsl-cta-${uid} {
          display: inline-block;
          font-size: 15px; font-weight: 700;
          padding: 14px 36px; text-decoration: none;
          background: ${darkColor}; color: #FFFCF0;
          border: 3px solid ${darkColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
        }
        .nzsl-cta-${uid}:hover { background: transparent; color: ${darkColor}; }
        @media (max-width: 820px) {
          .nzsl-wrap-${uid} { padding: 72px 24px; }
          .nzsl-inner-${uid} { grid-template-columns: 1fr; }
          .nzsl-imgwrap-${uid} { max-width: 420px; margin: 0 auto; }
        }
      `}</style>

      <div className={`nzsl-inner-${uid}`}>
        {imgSrc && (
          <div className={`nzsl-imgwrap-${uid}`}>
            <img src={imgSrc} alt="Plug-in solar panel with a household wall plug" />
          </div>
        )}
        <div>
          {eyebrow && <span className={`nzsl-eyebrow-${uid}`}>{eyebrow}</span>}
          <h2 className={`nzsl-heading-${uid}`}>{heading}</h2>
          <p className={`nzsl-intro-${uid}`}>{intro}</p>
          <div className={`nzsl-chips-${uid}`}>
            {chips.map((c, i) => (
              <div key={i} className={`nzsl-chip-${uid}`}>
                <span className={`nzsl-chip-raised-${uid}`}>{c.raised}</span>
                <span className={`nzsl-chip-solar-${uid}`}>{c.solar}</span>
              </div>
            ))}
          </div>
          {outro && <p className={`nzsl-outro-${uid}`}>{outro}</p>}
          {ctaText && <a href={ctaHref} className={`nzsl-cta-${uid}`}>{ctaText}</a>}
        </div>
      </div>
    </section>
  );
}
