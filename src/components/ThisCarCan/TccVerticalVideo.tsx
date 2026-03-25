"use client";

import React, { useId } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface TccVerticalVideoProps {
  youtubeUrl?: string;
  heading?: string;
  body?: string;
  btn1Label?: string;
  btn1Url?: string;
  btn1NewTab?: boolean;
  btn2Label?: string;
  btn2Url?: string;
  btn2NewTab?: boolean;
  btn3Label?: string;
  btn3Url?: string;
  btn3NewTab?: boolean;
  bgColor?: string;
  accentColor?: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export default function TccVerticalVideo(props: TccVerticalVideoProps) {
  const {
    youtubeUrl = "",
    heading = "This Is What My Car Can Do",
    body = "There are so many good stories to tell about electric vehicles and so many features worth promoting. EV owners love what their cars can do \u2014 and they can do a lot these days.",
    btn1Label, btn1Url, btn1NewTab,
    btn2Label, btn2Url, btn2NewTab,
    btn3Label, btn3Url, btn3NewTab,
    bgColor = "#1a3c3c",
    accentColor = "#f5b731",
  } = props;

  const buttons = [
    { label: btn1Label, url: btn1Url, newTab: btn1NewTab },
    { label: btn2Label, url: btn2Url, newTab: btn2NewTab },
    { label: btn3Label, url: btn3Url, newTab: btn3NewTab },
  ].filter((b) => b.label && b.url);

  const uid = useId().replace(/:/g, "");
  const videoId = extractYouTubeId(youtubeUrl);

  return (
    <div className={`tcc-vv-root-${uid}`}>
      <section className={`tcc-vv-section-${uid}`} style={{ background: bgColor }}>
        <div className={`tcc-vv-inner-${uid}`}>
          {/* Left: Video */}
          <div className={`tcc-vv-video-col-${uid}`}>
            <div className={`tcc-vv-card-${uid}`}>
              <div className={`tcc-vv-frame-${uid}`}>
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="EV Story Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={`tcc-vv-iframe-${uid}`}
                  />
                ) : (
                  <div className={`tcc-vv-placeholder-${uid}`}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Add YouTube URL</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className={`tcc-vv-text-col-${uid}`}>
            <h2 className={`tcc-vv-heading-${uid}`}>{heading}</h2>
            <img
              src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg"
              alt="" aria-hidden="true" className={`tcc-vv-squiggle-${uid}`}
            />
            {renderRichText(body, `tcc-vv-body-${uid}`)}
            {buttons.length > 0 && (
              <div className={`tcc-vv-buttons-${uid}`}>
                {buttons.map((b, i) => (
                  <a
                    key={i}
                    href={b.url}
                    target={b.newTab ? "_blank" : "_self"}
                    rel={b.newTab ? "noopener noreferrer" : undefined}
                    className={`tcc-vv-btn-${uid}${i === 0 ? ` tcc-vv-btn-primary-${uid}` : ""}`}
                  >
                    {b.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-vv-root-${uid} { width: 100%; }

        .tcc-vv-section-${uid} {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tcc-vv-inner-${uid} {
          max-width: 1060px;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 56px;
          align-items: center;
        }

        /* Video column */
        .tcc-vv-video-col-${uid} {
          display: flex;
          justify-content: flex-start;
        }

        .tcc-vv-card-${uid} {
          width: clamp(260px, 28vw, 340px);
          border: solid 3px ${accentColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          overflow: hidden;
          background: #000000;
          filter: drop-shadow(4px 6px 20px rgba(0, 0, 0, 0.4));
        }

        .tcc-vv-frame-${uid} {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          overflow: hidden;
        }

        .tcc-vv-iframe-${uid} {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .tcc-vv-placeholder-${uid} {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.25);
        }

        /* Text column */
        .tcc-vv-text-col-${uid} {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tcc-vv-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: ${accentColor};
          margin: 0;
          line-height: 1.2;
        }

        .tcc-vv-squiggle-${uid} {
          width: clamp(120px, 18vw, 180px);
          height: auto;
          margin-top: -6px;
          filter: brightness(0) invert(1);
          opacity: 0.4;
        }

        .tcc-vv-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #d1e0df;
          line-height: 1.7;
          margin-top: 8px;
        }

        .tcc-vv-body-${uid} p { margin: 0 0 12px; }
        .tcc-vv-body-${uid} p:last-child { margin-bottom: 0; }

        /* Buttons */
        .tcc-vv-buttons-${uid} {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .tcc-vv-btn-${uid} {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.25s ease;
          cursor: pointer;
          border: 2px solid ${accentColor};
          color: ${accentColor};
          background: transparent;
        }

        .tcc-vv-btn-${uid}:hover {
          background: rgba(245, 183, 49, 0.12);
          transform: translateY(-1px);
        }

        .tcc-vv-btn-primary-${uid} {
          background: ${accentColor};
          color: #1a3c3c;
          border-color: ${accentColor};
        }

        .tcc-vv-btn-primary-${uid}:hover {
          background: #e5a820;
          border-color: #e5a820;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .tcc-vv-inner-${uid} {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .tcc-vv-video-col-${uid} {
            justify-content: center;
          }
          .tcc-vv-text-col-${uid} {
            text-align: center;
            align-items: center;
          }
          .tcc-vv-buttons-${uid} {
            justify-content: center;
          }
          .tcc-vv-card-${uid} {
            width: clamp(240px, 50vw, 320px);
          }
          .tcc-vv-section-${uid} { padding: 60px 20px; }
        }

        @media (max-width: 480px) {
          .tcc-vv-section-${uid} { padding: 40px 16px; }
          .tcc-vv-card-${uid} {
            width: clamp(220px, 65vw, 280px);
          }
        }
      `}</style>
    </div>
  );
}
