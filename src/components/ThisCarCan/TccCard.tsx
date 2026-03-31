"use client";

import React, { useState, useEffect, useId } from "react";

interface TccCardProps {
  type?: string;
  name?: string;
  car?: string;
  statement?: string;
  story?: string;
  image?: any;
  videoUrl?: string;
  logoImage?: any;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function TccCard(props: TccCardProps) {
  const {
    type = "story",
    name = "",
    car = "",
    statement = "",
    story = "",
    image,
    videoUrl = "",
    logoImage,
  } = props;

  const uid = useId().replace(/:/g, "");
  const imgSrc = resolveImage(image);
  const logoSrc = resolveImage(logoImage);
  const [open, setOpen] = useState(false);

  // Close on escape, lock body scroll
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const cardType = type.toLowerCase().trim();
  const STORY_LIMIT = 120;
  // Strip HTML tags for plain text truncation
  const storyStr = typeof story === "string" ? story : "";
  const storyPlain = storyStr.replace(/<[^>]*>/g, "");
  const storyTruncated = storyPlain.length > STORY_LIMIT
    ? storyPlain.slice(0, STORY_LIMIT).replace(/\s+\S*$/, "") + "..."
    : storyPlain;
  const storyNeedsTruncation = storyPlain.length > STORY_LIMIT;

  return (
    <div className={`tc-root-${uid}`}>
      {/* ── Card ── */}
      <div className={`tc-card-${uid}`} onClick={() => setOpen(true)}>
        {cardType === "image" && (
          <>
            <div className={`tc-media-${uid}`}>
              {imgSrc && <img src={imgSrc} alt={statement} className={`tc-img-${uid}`} />}
            </div>
            <div className={`tc-bar-${uid}`}>
              {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-logo-${uid}`} />}
              <p className={`tc-stmt-${uid}`}>{statement}</p>
            </div>
          </>
        )}

        {cardType === "video" && (
          <>
            <div className={`tc-media-${uid}`}>
              {imgSrc && <img src={imgSrc} alt={statement} className={`tc-img-${uid}`} />}
              <div className={`tc-play-${uid}`}>
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.5)" />
                  <polygon points="19,14 36,24 19,34" fill="#ffffff" />
                </svg>
              </div>
            </div>
            <div className={`tc-bar-${uid}`}>
              {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-logo-${uid}`} />}
              <p className={`tc-stmt-${uid}`}>{statement}</p>
            </div>
          </>
        )}

        {cardType === "story" && (
          <>
            <div className={`tc-story-top-${uid}`}>
              {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-logo-${uid}`} />}
              <p className={`tc-stmt-${uid}`}>{statement}</p>
            </div>
            <p className={`tc-story-text-${uid}`}>
              {storyTruncated}
              {storyNeedsTruncation && (
                <span className={`tc-readmore-${uid}`}> Read more</span>
              )}
            </p>
          </>
        )}

        <div className={`tc-meta-${uid}`}>
          <span className={`tc-name-${uid}`}>{name}</span>
          <span className={`tc-car-${uid}`}>{car}</span>
        </div>
        <span className={`tc-badge-${uid}`}>{cardType}</span>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div className={`tc-modal-${uid}`} onClick={() => setOpen(false)}>
          <div className={`tc-modal-content-${uid}`} onClick={(e) => e.stopPropagation()}>
            <button
              className={`tc-modal-close-${uid}`}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {cardType === "image" && (
              <div className={`tc-m-wrap-${uid}`}>
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={statement}
                    className={`tc-m-image-${uid}`}
                  />
                )}
                <div className={`tc-m-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-m-logo-${uid}`} />}
                  <p className={`tc-m-stmt-${uid}`}>{statement}</p>
                </div>
              </div>
            )}

            {cardType === "video" && (
              <div className={`tc-m-wrap-${uid}`}>
                <video
                  className={`tc-m-video-${uid}`}
                  src={videoUrl}
                  poster={imgSrc}
                  controls
                  autoPlay
                  playsInline
                />
                <div className={`tc-m-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-m-logo-${uid}`} />}
                  <p className={`tc-m-stmt-${uid}`}>{statement}</p>
                </div>
              </div>
            )}

            {cardType === "story" && (
              <div className={`tc-m-wrap-${uid}`}>
                <div className={`tc-m-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tc-m-logo-${uid}`} />}
                  <p className={`tc-m-stmt-${uid}`}>{statement}</p>
                </div>
                <p className={`tc-m-story-${uid}`}>{story}</p>
              </div>
            )}

            <div className={`tc-m-meta-${uid}`}>
              <span className={`tc-m-name-${uid}`}>{name}</span>
              <span className={`tc-m-car-${uid}`}>{car}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tc-root-${uid} { width: 100%; }

        /* ── Card ── */
        .tc-card-${uid} {
          position: relative; border-radius: 16px; overflow: hidden;
          background: #234e4c; display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
          height: 100%;
        }
        .tc-card-${uid}:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
        }

        .tc-media-${uid} {
          position: relative; width: 100%; height: 200px;
          overflow: hidden; background: #1a3c3c;
        }
        .tc-img-${uid} {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .tc-play-${uid} {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 56px; height: 56px; transition: transform 0.25s;
        }
        .tc-card-${uid}:hover .tc-play-${uid} {
          transform: translate(-50%, -50%) scale(1.1);
        }
        .tc-play-${uid} svg { width: 100%; height: 100%; }

        .tc-bar-${uid} {
          padding: 14px 16px; display: flex; flex-direction: column;
          align-items: center; gap: 2px; background: #2d5c5a;
        }
        .tc-logo-${uid} { width: 100px; height: auto; }
        .tc-stmt-${uid} {
          font-family: 'Diary Notes', sans-serif;
          font-size: 1rem; color: #fff; text-transform: uppercase;
          text-align: center; margin: 0; line-height: 1.2;
        }

        .tc-story-top-${uid} {
          padding: 24px 20px 12px; display: flex; flex-direction: column;
          align-items: center; gap: 4px; background: #2d5c5a;
        }
        .tc-story-text-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem;
          color: #d1e0df; line-height: 1.6; margin: 0;
          padding: 0 20px 16px; flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tc-readmore-${uid} {
          color: #f5b731; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s;
        }
        .tc-readmore-${uid}:hover { opacity: 0.8; }

        .tc-meta-${uid} {
          padding: 12px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; justify-content: space-between; align-items: center;
          margin-top: auto;
        }
        .tc-name-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.85rem;
          font-weight: 600; color: #fff;
        }
        .tc-car-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #a8c5c3;
        }

        .tc-badge-${uid} {
          position: absolute; top: 12px; right: 12px;
          font-family: 'Rubik', sans-serif; font-size: 0.7rem;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          padding: 4px 10px; border-radius: 20px;
          background: rgba(0,0,0,0.4); color: #fff;
          backdrop-filter: blur(4px);
        }

        /* ── Modal ── */
        .tc-modal-${uid} {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: tc-fi-${uid} 0.25s ease;
        }
        @keyframes tc-fi-${uid} { from { opacity: 0; } to { opacity: 1; } }

        .tc-modal-content-${uid} {
          position: relative; background: #2d5c5a; border-radius: 20px;
          overflow: hidden; max-width: 640px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          animation: tc-su-${uid} 0.3s cubic-bezier(0,0,0.2,1);
        }
        @keyframes tc-su-${uid} {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tc-modal-close-${uid} {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          width: 40px; height: 40px; border-radius: 50%; border: none;
          background: rgba(0,0,0,0.4); color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; padding: 0;
        }
        .tc-modal-close-${uid}:hover { background: rgba(0,0,0,0.6); }
        .tc-modal-close-${uid} svg { width: 20px; height: 20px; }

        .tc-m-wrap-${uid} { display: flex; flex-direction: column; }

        .tc-m-image-${uid} {
          width: 100%; max-height: 65vh; object-fit: contain;
          background: #1a3c3c; display: block;
        }
        .tc-m-video-${uid} {
          width: 100%; max-height: 65vh; background: #000; display: block;
        }
        .tc-m-story-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1.05rem;
          color: #d1e0df; line-height: 1.8; margin: 0;
          padding: 20px 28px 24px;
        }

        .tc-m-bar-${uid} {
          padding: 20px 24px; display: flex; flex-direction: column;
          align-items: center; gap: 4px; background: #2d5c5a;
        }
        .tc-m-logo-${uid} { width: 160px; height: auto; }
        .tc-m-stmt-${uid} {
          font-family: 'Diary Notes', sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem); color: #fff;
          text-transform: uppercase; text-align: center; margin: 0; line-height: 1.2;
        }

        .tc-m-meta-${uid} {
          padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; justify-content: space-between; align-items: center;
        }
        .tc-m-name-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem;
          font-weight: 600; color: #fff;
        }
        .tc-m-car-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #a8c5c3;
        }

        @media (max-width: 480px) {
          .tc-modal-${uid} { padding: 12px; }
          .tc-modal-content-${uid} { border-radius: 14px; }
          .tc-m-story-${uid} { padding: 16px 20px 20px; }
        }
      `}</style>
    </div>
  );
}
