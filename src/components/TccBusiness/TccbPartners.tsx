"use client";

import React, { useId, useRef, useState, useEffect, useCallback } from "react";

interface TccbPartnersProps {
  heading?: string;
  subtitle?: string;
  pledgeCount?: number;
  pledgeTarget?: number;
  showProgressBar?: boolean;
  bgColor?: string;
}

const partners = [
  "Drive Electric",
  "Sustainable Business Council",
  "BusinessNZ",
  "Climate Leaders Coalition",
  "Sustainable Business Network",
  "EECA",
];

export default function TccbPartners(props: TccbPartnersProps) {
  const {
    heading = "Who\u2019s On Board",
    subtitle = "Collaborating to accelerate NZ\u2019s electric fleet transition",
    pledgeCount = 42,
    pledgeTarget = 100,
    showProgressBar = true,
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const pct = Math.min((pledgeCount / Math.max(pledgeTarget, 1)) * 100, 100);

  // IntersectionObserver for progress bar animation
  useEffect(() => {
    if (!showProgressBar) return;
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showProgressBar]);

  return (
    <div className={`tccb-part-root-${uid}`}>
      <section className={`tccb-part-section-${uid}`}>
        <div className={`tccb-part-inner-${uid}`}>
          {/* Header */}
          <div className={`tccb-part-header-${uid}`}>
            <h2 className={`tccb-part-heading-${uid}`}>{heading}</h2>
            <p className={`tccb-part-subtitle-${uid}`}>{subtitle}</p>
          </div>

          {/* Logo Grid */}
          <div className={`tccb-part-grid-${uid}`}>
            {partners.map((name, i) => (
              <div key={i} className={`tccb-part-card-${uid}`}>
                <div className={`tccb-part-avatar-${uid}`}>
                  {name.charAt(0)}
                </div>
                <span className={`tccb-part-name-${uid}`}>{name}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {showProgressBar && (
            <div className={`tccb-part-progress-wrap-${uid}`} ref={barRef}>
              <div className={`tccb-part-progress-header-${uid}`}>
                <span className={`tccb-part-pledge-count-${uid}`}>
                  {pledgeCount}
                </span>
                <span className={`tccb-part-pledge-label-${uid}`}>
                  {" "}businesses pledged out of{" "}
                  <span className={`tccb-part-pledge-target-${uid}`}>
                    {pledgeTarget}
                  </span>{" "}
                  target
                </span>
              </div>
              <div className={`tccb-part-bar-bg-${uid}`}>
                <div
                  className={`tccb-part-bar-fill-${uid}`}
                  style={{ width: animated ? `${pct}%` : "0%" }}
                />
              </div>
            </div>
          )}

          {/* Government Callout */}
          <div className={`tccb-part-callout-${uid}`}>
            <p className={`tccb-part-callout-text-${uid}`}>
              We\u2019re also challenging local and central government to lead by example
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccb-part-root-${uid} { width: 100%; }

        .tccb-part-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccb-part-inner-${uid} {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }

        /* Header */
        .tccb-part-header-${uid} {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 640px;
        }

        .tccb-part-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccb-part-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        /* Grid */
        .tccb-part-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .tccb-part-card-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 32px 20px;
          background: #ffffff;
          border: 1px solid #d1e0df;
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tccb-part-card-${uid}:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.08);
        }

        .tccb-part-avatar-${uid} {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #234e4c;
          color: #FFFCF0;
          font-family: 'Rubik', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tccb-part-name-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.85rem, 1.4vw, 0.95rem);
          font-weight: 600;
          color: #1a3c3c;
          text-align: center;
          line-height: 1.3;
        }

        /* Progress Bar */
        .tccb-part-progress-wrap-${uid} {
          width: 100%;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tccb-part-progress-header-${uid} {
          font-family: 'Rubik', sans-serif;
          color: #1a3c3c;
          display: flex;
          align-items: baseline;
          gap: 4px;
          flex-wrap: wrap;
        }

        .tccb-part-pledge-count-${uid} {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #2d5c5a;
          line-height: 1;
        }

        .tccb-part-pledge-label-${uid} {
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
        }

        .tccb-part-pledge-target-${uid} {
          font-weight: 700;
          color: #1a3c3c;
        }

        .tccb-part-bar-bg-${uid} {
          width: 100%;
          height: 16px;
          background: #d1e0df;
          border-radius: 10px;
          overflow: hidden;
        }

        .tccb-part-bar-fill-${uid} {
          height: 100%;
          background: #2d5c5a;
          border-radius: 10px;
          transition: width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Government Callout */
        .tccb-part-callout-${uid} {
          width: 100%;
          max-width: 680px;
          border: 2px dashed #2d5c5a;
          border-radius: 14px;
          padding: 20px 28px;
          text-align: center;
          background: rgba(45, 92, 90, 0.04);
        }

        .tccb-part-callout-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          font-weight: 400;
          color: #2d5c5a;
          margin: 0;
          line-height: 1.5;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .tccb-part-grid-${uid} {
            grid-template-columns: repeat(2, 1fr);
          }

          .tccb-part-section-${uid} {
            padding: 60px 20px;
          }
        }

        @media (max-width: 480px) {
          .tccb-part-section-${uid} {
            padding: 40px 16px;
          }

          .tccb-part-grid-${uid} {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .tccb-part-card-${uid} {
            padding: 24px 16px;
          }

          .tccb-part-avatar-${uid} {
            width: 44px;
            height: 44px;
            font-size: 1.1rem;
          }

          .tccb-part-callout-${uid} {
            padding: 16px 20px;
          }
        }
      `}</style>
    </div>
  );
}
