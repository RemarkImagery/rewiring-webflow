"use client";

import React, { useId } from "react";

interface TccbTimelineProps {
  heading?: string;
  body?: string;
  bgColor?: string;
}

export default function TccbTimeline(props: TccbTimelineProps) {
  const {
    heading = "Creating Tomorrow's Affordable EVs",
    body = "Japan produces 90% of NZ\u2019s used car imports \u2014 but they\u2019re years behind on EV production. We can\u2019t wait 7\u201310 years for affordable used EVs to arrive. The fastest path? NZ businesses buying new EVs today, creating our own second-hand supply in just 2\u20134 years.",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");

  const timelineSteps = [
    {
      year: "Year 0",
      title: "Business buys new EV",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="8" y="16" width="32" height="24" rx="3" stroke="#1a3c3c" strokeWidth="2.5" fill="none" />
          <rect x="14" y="22" width="8" height="6" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <rect x="26" y="22" width="8" height="6" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <rect x="14" y="32" width="8" height="6" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <rect x="26" y="32" width="8" height="6" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <path d="M20 16V10h8v6" stroke="#1a3c3c" strokeWidth="2.5" fill="none" />
          <line x1="24" y1="10" x2="24" y2="6" stroke="#1a3c3c" strokeWidth="2.5" />
          <line x1="20" y1="6" x2="28" y2="6" stroke="#1a3c3c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      year: "Year 2–3",
      title: "Used in fleet operations",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 36 C6 36 12 12 24 12 C36 12 42 36 42 36" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="30" r="3" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <circle cx="24" cy="18" r="3" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <circle cx="36" cy="30" r="3" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <path d="M6 38h36" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
        </svg>
      ),
    },
    {
      year: "Year 3–4",
      title: "Enters second-hand market",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M28 8L14 22h8l-4 18 14-18h-8L28 8z" stroke="#1a3c3c" strokeWidth="2.5" fill="#FFFCF0" strokeLinejoin="round" />
          <circle cx="36" cy="36" r="8" stroke="#1a3c3c" strokeWidth="2" fill="none" />
          <text x="36" y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a3c3c" fontFamily="Rubik, sans-serif">$</text>
        </svg>
      ),
    },
    {
      year: "Year 4+",
      title: "Affordable EV for families",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 40V20l16-12 16 12v20H8z" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <rect x="19" y="28" width="10" height="12" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <circle cx="24" cy="22" r="3" stroke="#1a3c3c" strokeWidth="2" fill="none" />
          <path d="M18 22a6 6 0 0 1 12 0" stroke="#1a3c3c" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
  ];

  const policyLevers = [
    "Accelerated depreciation",
    "FBT exemptions",
    "Faster fleet turnover partnerships",
    "Low-cost transition loans",
  ];

  return (
    <div className={`tccbtl-root-${uid}`}>
      <section className={`tccbtl-section-${uid}`}>
        <div className={`tccbtl-inner-${uid}`}>
          <h2 className={`tccbtl-heading-${uid}`}>{heading}</h2>
          <div
            className={`tccbtl-body-${uid}`}
            dangerouslySetInnerHTML={{ __html: body }}
          />

          {/* Timeline */}
          <div className={`tccbtl-timeline-${uid}`}>
            <div className={`tccbtl-line-${uid}`} aria-hidden="true" />
            {timelineSteps.map((step, i) => (
              <div key={i} className={`tccbtl-step-${uid}`}>
                <div className={`tccbtl-node-${uid}`}>
                  <div className={`tccbtl-dot-${uid}`} aria-hidden="true" />
                </div>
                <div className={`tccbtl-icon-${uid}`}>{step.icon}</div>
                <span className={`tccbtl-year-${uid}`}>{step.year}</span>
                <span className={`tccbtl-desc-${uid}`}>{step.title}</span>
              </div>
            ))}
          </div>

          {/* Policy Levers */}
          <div className={`tccbtl-policy-${uid}`}>
            <h3 className={`tccbtl-policy-heading-${uid}`}>
              Policy levers that could accelerate this:
            </h3>
            <ul className={`tccbtl-policy-list-${uid}`}>
              {policyLevers.map((item, i) => (
                <li key={i} className={`tccbtl-policy-item-${uid}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccbtl-root-${uid} { width: 100%; }

        .tccbtl-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccbtl-inner-${uid} {
          max-width: 1060px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .tccbtl-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbtl-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.7;
          max-width: 720px;
          margin: 0;
        }

        .tccbtl-body-${uid} p {
          margin: 0 0 12px;
        }

        .tccbtl-body-${uid} p:last-child {
          margin-bottom: 0;
        }

        /* ---- Timeline ---- */
        .tccbtl-timeline-${uid} {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          width: 100%;
          padding: 24px 0;
        }

        .tccbtl-line-${uid} {
          position: absolute;
          top: 36px;
          left: 12.5%;
          right: 12.5%;
          height: 4px;
          background: #2d5c5a;
          border-radius: 2px;
        }

        .tccbtl-step-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .tccbtl-node-${uid} {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .tccbtl-dot-${uid} {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5b731;
          border: 4px solid #2d5c5a;
          box-sizing: border-box;
          transition: transform 0.3s ease;
        }

        .tccbtl-step-${uid}:hover .tccbtl-dot-${uid} {
          transform: scale(1.3);
        }

        .tccbtl-icon-${uid} {
          width: 52px;
          height: 52px;
        }

        .tccbtl-icon-${uid} svg {
          width: 100%;
          height: 100%;
        }

        .tccbtl-year-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.85rem, 1.4vw, 1rem);
          font-weight: 700;
          color: #2d5c5a;
          line-height: 1.2;
        }

        .tccbtl-desc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.85rem, 1.4vw, 0.95rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.5;
          max-width: 180px;
        }

        /* ---- Policy Levers ---- */
        .tccbtl-policy-${uid} {
          border: 3px dashed #f5b731;
          border-radius: 20px;
          padding: 36px 40px;
          max-width: 640px;
          width: 100%;
          box-sizing: border-box;
          text-align: left;
          background: rgba(255, 252, 240, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tccbtl-policy-${uid}:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.08);
        }

        .tccbtl-policy-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          font-weight: 600;
          color: #1a3c3c;
          margin: 0 0 16px;
          line-height: 1.3;
        }

        .tccbtl-policy-list-${uid} {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .tccbtl-policy-item-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.6;
          padding-left: 24px;
          position: relative;
        }

        .tccbtl-policy-item-${uid}::before {
          content: '\\2713';
          position: absolute;
          left: 0;
          color: #f5b731;
          font-weight: 700;
          font-size: 1.1em;
        }

        /* ---- Mobile ---- */
        @media (max-width: 768px) {
          .tccbtl-section-${uid} {
            padding: 60px 24px;
          }

          .tccbtl-timeline-${uid} {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0;
          }

          .tccbtl-line-${uid} {
            top: 0;
            bottom: 0;
            left: 12px;
            right: auto;
            width: 4px;
            height: auto;
          }

          .tccbtl-step-${uid} {
            flex-direction: row;
            align-items: flex-start;
            gap: 16px;
            padding: 20px 0;
            text-align: left;
          }

          .tccbtl-node-${uid} {
            flex-shrink: 0;
          }

          .tccbtl-icon-${uid} {
            flex-shrink: 0;
            width: 44px;
            height: 44px;
          }

          .tccbtl-step-${uid} {
            flex-wrap: wrap;
          }

          /* On mobile, reorder: dot, icon, then text stacked */
          .tccbtl-step-${uid} {
            display: grid;
            grid-template-columns: 28px 48px 1fr;
            grid-template-rows: auto auto;
            column-gap: 12px;
            row-gap: 2px;
            align-items: center;
          }

          .tccbtl-node-${uid} {
            grid-row: 1 / 3;
            grid-column: 1;
            align-self: center;
          }

          .tccbtl-icon-${uid} {
            grid-row: 1 / 3;
            grid-column: 2;
            align-self: center;
          }

          .tccbtl-year-${uid} {
            grid-row: 1;
            grid-column: 3;
          }

          .tccbtl-desc-${uid} {
            grid-row: 2;
            grid-column: 3;
            max-width: none;
          }

          .tccbtl-policy-${uid} {
            padding: 28px 24px;
          }
        }

        @media (max-width: 480px) {
          .tccbtl-section-${uid} {
            padding: 40px 16px;
          }

          .tccbtl-policy-${uid} {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}
