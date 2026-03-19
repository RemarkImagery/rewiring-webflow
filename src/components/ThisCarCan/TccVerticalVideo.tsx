"use client";

import React, { useId, useState } from "react";

interface TccVerticalVideoProps {
  heading?: string;
  subtitle?: string;
  youtubeUrl1?: string;
  youtubeUrl2?: string;
  youtubeUrl3?: string;
  bgColor?: string;
  accentColor?: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // Handle youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, youtube.com/embed/ID
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
    heading = "EV Stories",
    subtitle = "Real people sharing what their car can do.",
    youtubeUrl1 = "",
    youtubeUrl2 = "",
    youtubeUrl3 = "",
    bgColor = "#1a3c3c",
    accentColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");

  const videos = [youtubeUrl1, youtubeUrl2, youtubeUrl3]
    .map((url) => ({ url, id: extractYouTubeId(url) }))
    .filter((v) => v.id);

  const placeholders = videos.length === 0 ? [0, 1, 2] : [];

  return (
    <div className={`tcc-vv-root-${uid}`}>
      <section className={`tcc-vv-section-${uid}`} style={{ background: bgColor }}>
        <div className={`tcc-vv-inner-${uid}`}>
          <div className={`tcc-vv-header-${uid}`}>
            <h2 className={`tcc-vv-heading-${uid}`}>{heading}</h2>
            <img
              src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg"
              alt="" aria-hidden="true" className={`tcc-vv-squiggle-${uid}`}
            />
            <p className={`tcc-vv-subtitle-${uid}`}>{subtitle}</p>
          </div>

          <div className={`tcc-vv-grid-${uid}`}>
            {videos.map((v, i) => (
              <div key={i} className={`tcc-vv-card-${uid}`}>
                <div className={`tcc-vv-frame-${uid}`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                    title={`Video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={`tcc-vv-iframe-${uid}`}
                  />
                </div>
              </div>
            ))}
            {placeholders.map((i) => (
              <div key={i} className={`tcc-vv-card-${uid}`}>
                <div className={`tcc-vv-frame-${uid}`}>
                  <div className={`tcc-vv-placeholder-${uid}`}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Add YouTube URL</span>
                  </div>
                </div>
              </div>
            ))}
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
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }

        .tcc-vv-header-${uid} {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
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
          width: clamp(120px, 20vw, 200px);
          height: auto;
          margin-top: -8px;
          filter: brightness(0) invert(1);
          opacity: 0.4;
        }

        .tcc-vv-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: #d1e0df;
          margin: 0;
          line-height: 1.6;
          max-width: 500px;
        }

        .tcc-vv-grid-${uid} {
          display: flex;
          gap: 28px;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .tcc-vv-card-${uid} {
          flex: 0 0 auto;
          width: clamp(240px, 28vw, 320px);
          border: solid 3px ${accentColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          overflow: hidden;
          background: #000000;
          filter: drop-shadow(4px 6px 16px rgba(0, 0, 0, 0.4));
          transition: transform 0.3s ease;
        }

        .tcc-vv-card-${uid}:hover {
          transform: translateY(-4px);
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

        @media (max-width: 900px) {
          .tcc-vv-grid-${uid} { gap: 20px; }
          .tcc-vv-card-${uid} { width: clamp(200px, 40vw, 280px); }
        }

        @media (max-width: 600px) {
          .tcc-vv-section-${uid} { padding: 60px 16px; }
          .tcc-vv-grid-${uid} {
            flex-direction: row;
            overflow-x: auto;
            flex-wrap: nowrap;
            justify-content: flex-start;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
          }
          .tcc-vv-card-${uid} {
            width: clamp(220px, 65vw, 280px);
            scroll-snap-align: center;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
