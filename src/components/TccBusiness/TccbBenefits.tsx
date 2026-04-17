"use client";

import React, { useId } from "react";

interface TccbBenefitsProps {
  heading?: string;
  subtitle?: string;
  bgColor?: string;
}

const benefits = [
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><text x="24" y="30" text-anchor="middle" font-family="Rubik,sans-serif" font-size="22" font-weight="700" fill="#2d5c5a">$</text></svg>`,
    title: "Lower Operating Costs",
    description:
      "Fuel and maintenance savings add up fast \u2014 EVs cost around 30% less to run.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M24 12c-5 0-10 4-10 10 0 4 2 6 5 8 1.5 1 2 2.5 2 4h6c0-1.5.5-3 2-4 3-2 5-4 5-8 0-6-5-10-10-10z" fill="#2d5c5a" opacity="0.2"/><path d="M18 32c1-3 4-5 6-7 2 2 5 4 6 7" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/><path d="M24 12c-1 4-4 6-4 10s2 6 4 8c2-2 4-4 4-8s-3-6-4-10z" fill="#2d5c5a" opacity="0.4"/></svg>`,
    title: "Lower Carbon Footprint",
    description:
      "Meet your reduction targets with real action, not offsets.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><polygon points="24,10 27,20 38,20 29,26 32,36 24,30 16,36 19,26 10,20 21,20" fill="#f5b731" stroke="#2d5c5a" stroke-width="1.5"/></svg>`,
    title: "Brand Leadership",
    description:
      "Show customers and staff you\u2019re serious about the future.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M24 10 L24 14 M24 34 L24 38 M10 24 L14 24 M34 24 L38 24" stroke="#2d5c5a" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="8" stroke="#2d5c5a" stroke-width="2" fill="none"/><path d="M18 18 L30 30 M30 18 L18 30" stroke="#2d5c5a" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/><rect x="18" y="18" width="12" height="12" rx="2" stroke="#2d5c5a" stroke-width="2" fill="#2d5c5a" opacity="0.15"/></svg>`,
    title: "Energy Sovereignty",
    description:
      "Less exposure to global fuel price swings. Charge from the grid or your own solar.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M27 10L19 26h8l-4 14 12-18h-9l4-12z" fill="#f5b731" stroke="#2d5c5a" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    title: "Future-Ready Fleet",
    description:
      "V2L, V2H, V2G \u2014 your fleet becomes a mobile energy asset.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="#2d5c5a" stroke-width="2" fill="#FFFCF0"/><path d="M24 36s-12-7.5-12-16c0-5 3.5-8 7-8 2.5 0 4 1.5 5 3 1-1.5 2.5-3 5-3 3.5 0 7 3 7 8 0 8.5-12 16-12 16z" fill="#f5b731" stroke="#2d5c5a" stroke-width="1.5"/></svg>`,
    title: "Create a Legacy",
    description:
      "Today\u2019s fleet purchases become tomorrow\u2019s affordable second-hand EVs for all Kiwis.",
  },
];

export default function TccbBenefits(props: TccbBenefitsProps) {
  const {
    heading = "What\u2019s In It For Your Business?",
    subtitle = "The case for going electric is stronger than ever.",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`tccb-ben-root-${uid}`}>
      <section className={`tccb-ben-section-${uid}`}>
        <div className={`tccb-ben-inner-${uid}`}>
          <div className={`tccb-ben-header-${uid}`}>
            <h2 className={`tccb-ben-heading-${uid}`}>{heading}</h2>
            <p className={`tccb-ben-subtitle-${uid}`}>{subtitle}</p>
          </div>
          <div className={`tccb-ben-grid-${uid}`}>
            {benefits.map((b, i) => (
              <div key={i} className={`tccb-ben-card-${uid}`}>
                <div
                  className={`tccb-ben-icon-${uid}`}
                  dangerouslySetInnerHTML={{ __html: b.icon }}
                />
                <h3 className={`tccb-ben-title-${uid}`}>{b.title}</h3>
                <p className={`tccb-ben-desc-${uid}`}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccb-ben-root-${uid} { width: 100%; }

        .tccb-ben-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccb-ben-inner-${uid} {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }

        .tccb-ben-header-${uid} {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 640px;
        }

        .tccb-ben-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccb-ben-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        .tccb-ben-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          width: 100%;
        }

        .tccb-ben-card-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          padding: 36px 28px;
          background: #ffffff;
          border-radius: 20px 24px 18px 22px;
          box-shadow: 0 2px 12px rgba(26, 60, 60, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tccb-ben-card-${uid}:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(26, 60, 60, 0.12);
        }

        .tccb-ben-icon-${uid} {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .tccb-ben-icon-${uid} svg {
          width: 48px;
          height: 48px;
        }

        .tccb-ben-title-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.2rem);
          font-weight: 600;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.3;
        }

        .tccb-ben-desc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .tccb-ben-grid-${uid} {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .tccb-ben-grid-${uid} {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .tccb-ben-section-${uid} {
            padding: 60px 24px;
          }

          .tccb-ben-card-${uid} {
            padding: 28px 24px;
          }
        }

        @media (max-width: 480px) {
          .tccb-ben-section-${uid} {
            padding: 40px 16px;
          }
        }
      `}</style>
    </div>
  );
}
