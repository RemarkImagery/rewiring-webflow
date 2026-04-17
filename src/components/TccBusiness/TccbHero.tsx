"use client";

import React, { useId, useEffect, useRef, useState } from "react";

interface TccbHeroProps {
  heading?: string;
  subtitle?: string;
  ctaText?: string;
  pledgeCount?: number;
  showCounter?: boolean;
  logoImage?: any;
  bgColor?: string;
  accentColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function TccbHero(props: TccbHeroProps) {
  const {
    heading = "Drive to 25 — NZ Businesses Leading the Charge",
    subtitle = "A challenge to NZ businesses to make 25% of new fleet purchases fully electric by June 2027",
    ctaText = "Take the Pledge",
    pledgeCount = 42,
    showCounter = true,
    logoImage,
    bgColor = "#FFFCF0",
    accentColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  const logoSrc = resolveImage(logoImage);
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!showCounter || hasAnimated) return;
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();

            const target = pledgeCount;
            const duration = 1600;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayCount(Math.round(eased * target));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showCounter, pledgeCount, hasAnimated]);

  return (
    <div className={`tccb-hero-root-${uid}`}>
      <section className={`tccb-hero-${uid}`} style={{ background: bgColor }}>
        <div className={`tccb-hero-inner-${uid}`}>
          {logoSrc && (
            <img
              className={`tccb-hero-logo-${uid}`}
              src={logoSrc}
              alt="The 25% Electric Challenge"
              draggable={false}
            />
          )}

          <div className={`tccb-hero-heading-wrap-${uid}`}>
            <div className={`tccb-hero-blob-${uid}`} aria-hidden="true" style={{ background: accentColor }} />
            <h1 className={`tccb-hero-heading-${uid}`}>{heading}</h1>
          </div>

          <div
            className={`tccb-hero-subtitle-${uid}`}
            dangerouslySetInnerHTML={{ __html: subtitle || "" }}
          />

          <a href="#" className={`tccb-hero-cta-${uid}`} style={{ background: accentColor }}>
            {ctaText}
          </a>

          {showCounter && (
            <div ref={counterRef} className={`tccb-hero-counter-${uid}`}>
              <span className={`tccb-hero-counter-num-${uid}`} style={{ color: accentColor }}>
                {displayCount}
              </span>
              <span className={`tccb-hero-counter-label-${uid}`}>
                businesses have pledged
              </span>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccb-hero-root-${uid} {
          width: 100%;
        }

        .tccb-hero-${uid} {
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

        .tccb-hero-inner-${uid} {
          max-width: 780px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .tccb-hero-logo-${uid} {
          width: clamp(70px, 14vw, 120px);
          height: auto;
          margin-bottom: 8px;
        }

        .tccb-hero-heading-wrap-${uid} {
          position: relative;
          display: inline-block;
          padding: 16px 24px;
        }

        .tccb-hero-blob-${uid} {
          position: absolute;
          inset: -20px -40px;
          border-radius: 60% 40% 50% 45% / 45% 55% 40% 60%;
          opacity: 0.15;
          z-index: -1;
          pointer-events: none;
        }

        .tccb-hero-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .tccb-hero-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.65;
          max-width: 620px;
          margin: 0;
        }

        .tccb-hero-subtitle-${uid} p {
          margin: 0;
        }

        .tccb-hero-cta-${uid} {
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
          margin-top: 4px;
        }

        .tccb-hero-cta-${uid}:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(245, 183, 49, 0.4);
          filter: brightness(1.06);
        }

        .tccb-hero-cta-${uid}:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 8px rgba(245, 183, 49, 0.3);
        }

        .tccb-hero-counter-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 12px;
        }

        .tccb-hero-counter-num-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          line-height: 1;
        }

        .tccb-hero-counter-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .tccb-hero-${uid} {
            min-height: 70svh;
            padding: 40px 20px;
          }

          .tccb-hero-blob-${uid} {
            inset: -14px -24px;
          }
        }

        @media (max-width: 480px) {
          .tccb-hero-${uid} {
            padding: 40px 16px;
          }

          .tccb-hero-inner-${uid} {
            gap: 18px;
          }

          .tccb-hero-cta-${uid} {
            padding: 14px 36px;
          }

          .tccb-hero-blob-${uid} {
            inset: -10px -16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tccb-hero-cta-${uid} {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
