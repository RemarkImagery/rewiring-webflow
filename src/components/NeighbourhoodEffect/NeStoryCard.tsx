"use client";

import React, { useState, useEffect, useId } from "react";

interface NeStoryCardProps {
  quote?: string;
  attribution?: string;
  context?: string;
  photo?: any;
  videoUrl?: any;
  featured?: boolean;
  readMoreText?: string;
  closeLabel?: string;
  cardBg?: string;
  featuredBg?: string;
  accentColor?: string;
  textColor?: string;
  mutedColor?: string;
  modalBg?: string;
  modalOverlayColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function resolveVideo(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val.url || val.src || val.href || undefined;
  }
  return undefined;
}

export default function NeStoryCard(props: NeStoryCardProps) {
  const {
    quote = "Mike Casey's TikTok was the catalyst to get me over the line a year ago and put a system on the roof. Cost $13,500. First year we have saved just over $3,000. I've convinced three neighbours to do the same. We also bought a second-hand Nissan Leaf for $5,000 — that vehicle has quickly become our main vehicle. We charge it about every third day, and the solar system mostly covers it.",
    attribution = "Influenced by Mike Casey",
    context = "Solar + EV convert · Three neighbours followed",
    photo,
    videoUrl,
    featured = false,
    readMoreText = "Read full story",
    closeLabel = "Close",
    cardBg = "#FFFCF0",
    featuredBg = "#fdf7ea",
    accentColor = "#f5b731",
    textColor = "#1a3c3c",
    mutedColor = "#5a7a78",
    modalBg = "#FFFCF0",
    modalOverlayColor = "rgba(15, 35, 35, 0.78)",
  } = props;

  const uid = useId().replace(/:/g, "");
  const photoSrc = resolveImage(photo);
  const videoSrc = resolveVideo(videoUrl);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <article
        className={`ne-card-${uid} ${featured ? `ne-card-featured-${uid}` : ""}`}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Read story from ${attribution}`}
      >
        <div className={`ne-card-quote-mark-${uid}`} aria-hidden="true">"</div>

        {videoSrc && (
          <span className={`ne-card-video-badge-${uid}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="9,7 9,17 17,12" />
            </svg>
            Video story
          </span>
        )}

        <div className={`ne-card-body-${uid}`}>
          <blockquote className={`ne-card-quote-${uid}`}>{quote}</blockquote>
        </div>

        <div className={`ne-card-meta-${uid}`}>
          <div className={`ne-card-text-${uid}`}>
            <span className={`ne-card-name-${uid}`}>{attribution}</span>
            {context && <span className={`ne-card-context-${uid}`}>{context}</span>}
          </div>
          <span className={`ne-card-readmore-${uid}`}>
            {readMoreText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </article>

      {open && (
        <div
          className={`ne-modal-${uid}`}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Story from ${attribution}`}
        >
          <div className={`ne-modal-content-${uid}`} onClick={(e) => e.stopPropagation()}>
            <button
              className={`ne-modal-close-${uid}`}
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {videoSrc ? (
              <div className={`ne-modal-video-${uid}`}>
                <video
                  src={videoSrc}
                  poster={photoSrc}
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            ) : photoSrc ? (
              <div className={`ne-modal-image-${uid}`}>
                <img src={photoSrc} alt={attribution} />
              </div>
            ) : null}

            <div className={`ne-modal-body-${uid}`}>
              <div className={`ne-modal-quote-mark-${uid}`} aria-hidden="true">"</div>
              <blockquote className={`ne-modal-quote-${uid}`}>{quote}</blockquote>
              <div className={`ne-modal-meta-${uid}`}>
                <span className={`ne-modal-name-${uid}`}>{attribution}</span>
                {context && <span className={`ne-modal-context-${uid}`}>{context}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        /* ─── Card ─── */
        .ne-card-${uid} {
          background: ${cardBg};
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 36px 32px 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.25s ease;
          height: 100%;
          min-height: 360px;
          box-sizing: border-box;
          cursor: pointer;
          overflow: hidden;
        }
        .ne-card-${uid}:hover,
        .ne-card-${uid}:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.24);
          outline: none;
        }
        .ne-card-${uid}:focus-visible {
          border-color: ${accentColor};
        }

        .ne-card-featured-${uid} {
          background: ${featuredBg};
          border-color: ${accentColor};
        }

        .ne-card-quote-mark-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 5.5rem;
          font-weight: 700;
          color: ${accentColor};
          line-height: 0.6;
          margin: 0;
          position: absolute;
          top: 22px;
          right: 28px;
          opacity: 0.5;
          pointer-events: none;
        }

        .ne-card-body-${uid} {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          margin-bottom: 18px;
        }

        .ne-card-quote-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 400;
          font-style: italic;
          color: ${textColor};
          margin: 0;
          line-height: 1.6;
          padding-right: 24px;
        }

        .ne-card-meta-${uid} {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(45, 92, 90, 0.15);
          position: relative;
          flex-shrink: 0;
          z-index: 1;
        }

        .ne-card-meta-${uid}::before {
          content: "";
          position: absolute;
          left: -32px;
          right: -32px;
          bottom: 100%;
          height: 70px;
          background: linear-gradient(to bottom, transparent 0%, ${cardBg} 75%);
          pointer-events: none;
          z-index: 1;
        }
        .ne-card-featured-${uid} .ne-card-meta-${uid}::before {
          background: linear-gradient(to bottom, transparent 0%, ${featuredBg} 75%);
        }

        .ne-card-text-${uid} {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .ne-card-name-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: ${textColor};
        }

        .ne-card-context-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: ${mutedColor};
        }

        .ne-card-readmore-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: ${accentColor};
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: gap 0.25s ease;
        }
        .ne-card-readmore-${uid} svg { width: 14px; height: 14px; }
        .ne-card-${uid}:hover .ne-card-readmore-${uid} { gap: 10px; }

        .ne-card-video-badge-${uid} {
          position: absolute;
          top: 22px;
          left: 28px;
          font-family: 'Rubik', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fdf7ea;
          background: ${accentColor};
          padding: 6px 10px 6px 6px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        }
        .ne-card-video-badge-${uid} svg {
          width: 16px;
          height: 16px;
          color: #1a3c3c;
          background: #fdf7ea;
          border-radius: 50%;
          padding: 2px;
          box-sizing: border-box;
        }

        /* ─── Modal ─── */
        .ne-modal-${uid} {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: ${modalOverlayColor};
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: ne-modal-fade-${uid} 0.25s ease;
        }
        @keyframes ne-modal-fade-${uid} {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ne-modal-content-${uid} {
          position: relative;
          background: ${modalBg};
          border-radius: 24px;
          overflow: hidden;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          animation: ne-modal-slide-${uid} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes ne-modal-slide-${uid} {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ne-modal-close-${uid} {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(26, 60, 60, 0.92);
          color: #fdf7ea;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ne-modal-close-${uid}:hover {
          background: #1a3c3c;
          transform: scale(1.05);
        }
        .ne-modal-close-${uid} svg { width: 20px; height: 20px; }

        .ne-modal-image-${uid} {
          width: 100%;
          background: #1a3c3c;
          flex-shrink: 0;
        }
        .ne-modal-image-${uid} img {
          width: 100%;
          max-height: 50vh;
          object-fit: cover;
          display: block;
        }

        .ne-modal-video-${uid} {
          width: 100%;
          background: #000;
          flex-shrink: 0;
          aspect-ratio: 16 / 9;
        }
        .ne-modal-video-${uid} video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          background: #000;
        }

        .ne-modal-body-${uid} {
          padding: 44px 48px 40px;
          position: relative;
        }

        .ne-modal-quote-mark-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 7rem;
          font-weight: 700;
          color: ${accentColor};
          line-height: 0.6;
          margin: 0 0 -8px;
          opacity: 0.6;
        }

        .ne-modal-quote-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          font-weight: 400;
          font-style: italic;
          color: ${textColor};
          margin: 0;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .ne-modal-meta-${uid} {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 24px;
          margin-top: 28px;
          border-top: 1px solid rgba(45, 92, 90, 0.15);
        }

        .ne-modal-name-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: ${textColor};
        }

        .ne-modal-context-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: ${mutedColor};
        }

        @media (max-width: 600px) {
          .ne-modal-${uid} { padding: 16px; }
          .ne-modal-content-${uid} { border-radius: 18px; }
          .ne-modal-body-${uid} { padding: 32px 28px; }
          .ne-modal-quote-mark-${uid} { font-size: 5rem; }
        }
      `}</style>
    </>
  );
}
