"use client";

import React, { useId } from "react";

interface OlkVideoCardProps {
  eyebrow?: string;
  heading?: string;
  caption?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  bgColor?: string;
  accentColor?: string;
}

function youtubeId(url: string): string {
  const v = (url || "").trim();
  if (/^[A-Za-z0-9_-]{8,16}$/.test(v)) return v;
  const m = v.match(/(?:youtu\.be\/|shorts\/|embed\/|[?&]v=)([A-Za-z0-9_-]{8,16})/);
  return m ? m[1] : "";
}

export default function OlkVideoCard(props: OlkVideoCardProps) {
  const {
    eyebrow = "Watch",
    heading = "Operation Laser Kiwi is go",
    caption = "",
    videoUrl = "https://www.youtube.com/watch?v=5uNCpoSxbKs",
    ctaText = "",
    ctaUrl = "https://pages.rewiring.nz/operation-laser-kiwi",
    bgColor = "#143a1e",
    accentColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const id = youtubeId(videoUrl);

  return (
    <section className={`olkv-wrap-${uid}`}>
      <style>{`
        .olkv-wrap-${uid} {
          font-family: 'Rubik', sans-serif;
          background: ${bgColor};
          padding: clamp(48px, 7vw, 88px) 24px;
          text-align: center;
        }
        .olkv-inner-${uid} { max-width: 900px; margin: 0 auto; }
        .olkv-eyebrow-${uid} {
          display: block;
          font-size: 13px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${accentColor};
          margin-bottom: 12px;
        }
        .olkv-heading-${uid} {
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          font-weight: 800; color: #FFFCF0;
          margin: 0 0 28px; line-height: 1.15;
        }
        .olkv-frame-${uid} {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #0d2413;
          border: 2px solid ${accentColor}55;
          border-radius: 8px 22px 8px 22px;
          overflow: hidden;
        }
        .olkv-frame-${uid} iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          border: 0; display: block;
        }
        .olkv-caption-${uid} {
          font-size: 0.95rem; font-weight: 600;
          color: rgba(255, 252, 240, 0.8);
          margin: 16px 0 0;
        }
        .olkv-cta-${uid} {
          display: inline-block;
          margin-top: 26px;
          font-size: 15px; font-weight: 700;
          padding: 13px 32px; text-decoration: none;
          background: transparent; color: ${accentColor};
          border: 3px solid ${accentColor};
          border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px;
          transition: background 0.3s, color 0.3s;
        }
        .olkv-cta-${uid}:hover { background: ${accentColor}; color: ${bgColor}; }
      `}</style>
      <div className={`olkv-inner-${uid}`}>
        {eyebrow && <span className={`olkv-eyebrow-${uid}`}>{eyebrow}</span>}
        {heading && <h2 className={`olkv-heading-${uid}`}>{heading}</h2>}
        {id ? (
          <div className={`olkv-frame-${uid}`}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={heading || "Campaign video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : null}
        {caption && <p className={`olkv-caption-${uid}`}>{caption}</p>}
        {ctaText && (
          <a href={ctaUrl} className={`olkv-cta-${uid}`}>
            {ctaText} →
          </a>
        )}
      </div>
    </section>
  );
}
