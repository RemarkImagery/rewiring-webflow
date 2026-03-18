"use client";

import React, { useId, useState, useEffect, useRef } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevApprovalProps {
  heading?: string;
  statNumber?: string;
  statLabel?: string;
  quote?: string;
  body?: string;
  bgColor?: string;
}

export default function WlevApproval(props: WlevApprovalProps) {
  const {
    heading = "EV Owners Love Their Cars",
    statNumber = "96%",
    statLabel = "of EV owners would buy another one",
    quote = "That\u2019s one hell of an approval rating.",
    body = "There\u2019s a lot of talk about what electric vehicles can\u2019t do and plenty of myths that might stop people from upgrading. But the people who actually own EVs? They\u2019re overwhelmingly sold. There are now almost 100,000 full EVs on New Zealand roads \u2014 and interest keeps growing.",
    bgColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();
            const duration = 1800;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setBarWidth(eased * 96);
              setDisplayCount(Math.round(eased * 96));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className={`wlev-ap-root-${uid}`}>
      <section className={`wlev-ap-section-${uid}`} style={{ background: bgColor }}>
        {/* Organic leaf SVG decorations */}
        <svg className={`wlev-ap-deco-left-${uid}`} width="120" height="200" viewBox="0 0 120 200" fill="none" aria-hidden="true">
          <path d="M60 180C20 140 5 80 30 30C40 55 55 90 60 130C65 90 80 55 90 30C115 80 100 140 60 180Z" fill="#2d5c5a" opacity="0.15"/>
          <path d="M60 180C60 180 58 130 60 80" stroke="#f5b731" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
          <path d="M40 100C50 95 55 90 60 100" stroke="#f5b731" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
          <path d="M80 90C70 88 65 85 60 95" stroke="#f5b731" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
        </svg>
        <svg className={`wlev-ap-deco-right-${uid}`} width="100" height="160" viewBox="0 0 100 160" fill="none" aria-hidden="true">
          <circle cx="50" cy="30" r="8" fill="#f5b731" opacity="0.12"/>
          <circle cx="70" cy="60" r="5" fill="#f5b731" opacity="0.08"/>
          <circle cx="30" cy="80" r="6" fill="#2d5c5a" opacity="0.15"/>
          <path d="M20 120C35 100 65 100 80 120C65 130 35 130 20 120Z" fill="#2d5c5a" opacity="0.1"/>
          <path d="M50 110L50 140" stroke="#f5b731" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
        </svg>

        <div className={`wlev-ap-inner-${uid}`}>
          <h2 className={`wlev-ap-heading-${uid}`}>{heading}</h2>

          {/* Scribble underline */}
          <svg className={`wlev-ap-scribble-${uid}`} width="200" height="12" viewBox="0 0 200 12" fill="none" aria-hidden="true">
            <path d="M5 8C30 3 60 10 100 6C140 2 170 9 195 5" stroke="#f5b731" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>

          <div className={`wlev-ap-stat-${uid}`}>
            <span className={`wlev-ap-stat-num-${uid}`}>{displayCount}%</span>
            <span className={`wlev-ap-stat-label-${uid}`}>{statLabel}</span>
          </div>

          {/* Animated bar */}
          <div ref={barRef} className={`wlev-ap-bar-wrap-${uid}`}>
            <div className={`wlev-ap-bar-track-${uid}`}>
              <div className={`wlev-ap-bar-fill-${uid}`} style={{ width: `${barWidth}%` }}>
                <span className={`wlev-ap-bar-label-${uid}`}>{Math.round(barWidth)}%</span>
              </div>
            </div>
            <div className={`wlev-ap-bar-legend-${uid}`}>
              <span>0%</span>
              <span>Would buy another EV</span>
              <span>100%</span>
            </div>
          </div>

          <blockquote className={`wlev-ap-quote-${uid}`}>
            {/* Scribble quote mark */}
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
              <path d="M4 20C2 14 6 6 14 4C12 8 10 12 12 16C14 12 18 10 20 14C22 18 18 24 12 22C8 21 5 18 4 20Z" fill="#f5b731" opacity="0.3"/>
              <path d="M20 20C18 14 22 6 30 4C28 8 26 12 28 16C30 12 34 10 36 14C38 18 34 24 28 22C24 21 21 18 20 20Z" fill="#f5b731" opacity="0.3"/>
            </svg>
            <p>{quote}</p>
          </blockquote>

          {renderRichText(body, `wlev-ap-body-${uid}`)}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .wlev-ap-root-${uid} { width: 100%; }

        .wlev-ap-section-${uid} {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 100px 24px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .wlev-ap-deco-left-${uid} {
          position: absolute;
          left: 20px;
          top: 60px;
          opacity: 0.7;
          pointer-events: none;
        }

        .wlev-ap-deco-right-${uid} {
          position: absolute;
          right: 30px;
          bottom: 40px;
          opacity: 0.7;
          pointer-events: none;
        }

        .wlev-ap-inner-${uid} {
          max-width: 760px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .wlev-ap-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .wlev-ap-scribble-${uid} {
          margin-top: -16px;
          margin-bottom: 4px;
        }

        .wlev-ap-stat-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .wlev-ap-stat-num-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(4rem, 10vw, 7rem);
          font-weight: 700;
          color: #f5b731;
          line-height: 1;
          text-shadow: 0 4px 20px rgba(245, 183, 49, 0.3);
        }

        .wlev-ap-stat-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          font-weight: 400;
          color: #d1e0df;
          line-height: 1.4;
        }

        /* Animated bar */
        .wlev-ap-bar-wrap-${uid} {
          width: 100%;
          max-width: 600px;
          margin: 12px 0;
        }

        .wlev-ap-bar-track-${uid} {
          width: 100%;
          height: 40px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          overflow: hidden;
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .wlev-ap-bar-fill-${uid} {
          height: 100%;
          background: linear-gradient(90deg, #2d5c5a 0%, #f5b731 100%);
          border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 14px;
          min-width: 60px;
          transition: width 0.05s linear;
          box-shadow: 0 0 20px rgba(245, 183, 49, 0.3);
        }

        .wlev-ap-bar-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a3c3c;
          white-space: nowrap;
        }

        .wlev-ap-bar-legend-${uid} {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-family: 'Rubik', sans-serif;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* Quote */
        .wlev-ap-quote-${uid} {
          margin: 8px 0;
          padding: 0;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .wlev-ap-quote-${uid} p {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          font-weight: 600;
          color: #ffffff;
          font-style: italic;
          margin: 0;
          line-height: 1.4;
        }

        .wlev-ap-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          font-weight: 400;
          color: #b8cccb;
          line-height: 1.7;
          max-width: 620px;
        }

        .wlev-ap-body-${uid} p { margin: 0; }

        @media (max-width: 768px) {
          .wlev-ap-section-${uid} { padding: 70px 20px; }
          .wlev-ap-deco-left-${uid} { display: none; }
          .wlev-ap-deco-right-${uid} { display: none; }
        }

        @media (max-width: 480px) {
          .wlev-ap-section-${uid} { padding: 50px 16px; }
          .wlev-ap-bar-track-${uid} { height: 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-ap-bar-fill-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
