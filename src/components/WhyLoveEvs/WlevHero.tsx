"use client";

import React, { useId, useEffect, useRef, useState } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevHeroProps {
  heading?: string;
  subtitle?: string;
  ctaText?: string;
  evPartsLabel?: string;
  icePartsLabel?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  bgColor?: string;
  accentColor?: string;
}

export default function WlevHero(props: WlevHeroProps) {
  const {
    heading = "Lower Bills and Way More Fun!",
    subtitle = "Good for your wallet, better for the environment, and very easy to do. Upgrading to an EV is also a lot of fun.",
    ctaText = "Find Out More",
    evPartsLabel = "moving parts in an EV",
    icePartsLabel = "in a petrol car",
    bullet1 = "Built for everyday life",
    bullet2 = "Cheaper to fill up and maintain",
    bullet3 = "Easy to charge at home and on trips",
    bgColor = "#FFFCF0",
    accentColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [evParts, setEvParts] = useState(0);
  const [iceParts, setIceParts] = useState(0);

  useEffect(() => {
    const el = counterRef.current;
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
              setEvParts(Math.round(eased * 20));
              setIceParts(Math.round(eased * 2000));
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

  const bullets = [bullet1, bullet2, bullet3].filter(Boolean);

  return (
    <div className={`wlev-hero-root-${uid}`}>
      <section className={`wlev-hero-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-hero-inner-${uid}`}>
          <div className={`wlev-hero-heading-wrap-${uid}`}>
            <div className={`wlev-hero-blob-${uid}`} aria-hidden="true" style={{ background: accentColor }} />
            <h1 className={`wlev-hero-heading-${uid}`}>{heading}</h1>
          </div>

          {renderRichText(subtitle, `wlev-hero-subtitle-${uid}`)}

          <div ref={counterRef} className={`wlev-hero-compare-${uid}`}>
            <div className={`wlev-hero-compare-card-${uid} wlev-hero-compare-ev-${uid}`}>
              <span className={`wlev-hero-compare-num-${uid}`} style={{ color: accentColor }}>{evParts}</span>
              <span className={`wlev-hero-compare-label-${uid}`}>{evPartsLabel}</span>
            </div>
            <span className={`wlev-hero-compare-vs-${uid}`}>vs</span>
            <div className={`wlev-hero-compare-card-${uid}`}>
              <span className={`wlev-hero-compare-num-${uid}`} style={{ color: "#2d5c5a" }}>{iceParts.toLocaleString()}</span>
              <span className={`wlev-hero-compare-label-${uid}`}>{icePartsLabel}</span>
            </div>
          </div>

          <a href="#" className={`wlev-hero-cta-${uid}`} style={{ background: accentColor }}>
            {ctaText}
          </a>

          {bullets.length > 0 && (
            <div className={`wlev-hero-bullets-${uid}`}>
              {bullets.map((b, i) => (
                <div key={i} className={`wlev-hero-bullet-${uid}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .wlev-hero-root-${uid} { width: 100%; }

        .wlev-hero-${uid} {
          width: 100%;
          min-height: 80svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .wlev-hero-inner-${uid} {
          max-width: 820px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .wlev-hero-heading-wrap-${uid} {
          position: relative;
          display: inline-block;
          padding: 16px 24px;
        }

        .wlev-hero-blob-${uid} {
          position: absolute;
          inset: -20px -40px;
          border-radius: 60% 40% 50% 45% / 45% 55% 40% 60%;
          opacity: 0.15;
          z-index: -1;
          pointer-events: none;
        }

        .wlev-hero-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .wlev-hero-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.65;
          max-width: 620px;
          margin: 0;
        }

        .wlev-hero-subtitle-${uid} p { margin: 0; }

        .wlev-hero-compare-${uid} {
          display: flex;
          align-items: center;
          gap: 24px;
          margin: 12px 0;
        }

        .wlev-hero-compare-card-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 24px 32px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(26, 60, 60, 0.08);
        }

        .wlev-hero-compare-ev-${uid} { border: 2px solid #f5b731; }

        .wlev-hero-compare-num-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3rem);
          font-weight: 700;
          line-height: 1;
        }

        .wlev-hero-compare-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.85rem, 1.4vw, 1rem);
          font-weight: 400;
          color: #5a7a78;
        }

        .wlev-hero-compare-vs-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #5a7a78;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .wlev-hero-cta-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 600;
          color: #1a3c3c;
          padding: 16px 44px;
          border-radius: 50px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          box-shadow: 0 4px 16px rgba(245, 183, 49, 0.3);
        }

        .wlev-hero-cta-${uid}:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(245, 183, 49, 0.4);
          filter: brightness(1.06);
        }

        .wlev-hero-cta-${uid}:active { transform: translateY(0) scale(0.98); }

        .wlev-hero-bullets-${uid} {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px 32px;
          margin-top: 8px;
        }

        .wlev-hero-bullet-${uid} {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.4vw, 1rem);
          font-weight: 400;
          color: #1a3c3c;
        }

        @media (max-width: 768px) {
          .wlev-hero-${uid} { min-height: 70svh; padding: 40px 20px; }
          .wlev-hero-blob-${uid} { inset: -14px -24px; }
        }

        @media (max-width: 540px) {
          .wlev-hero-compare-${uid} { flex-direction: column; gap: 12px; }
          .wlev-hero-compare-card-${uid} { padding: 18px 28px; width: 100%; max-width: 240px; }
          .wlev-hero-bullets-${uid} { flex-direction: column; align-items: flex-start; gap: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-hero-cta-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
