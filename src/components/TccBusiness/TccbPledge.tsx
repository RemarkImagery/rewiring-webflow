"use client";

import React, { useId } from "react";

interface TccbPledgeProps {
  heading?: string;
  subtitle?: string;
  ctaText?: string;
  showBadge?: boolean;
  bgColor?: string;
}

export default function TccbPledge(props: TccbPledgeProps) {
  const {
    heading = "How It Works",
    subtitle = "Three simple steps to join the Drive to 25",
    ctaText = "Take the 25% Challenge",
    showBadge = true,
    bgColor = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");

  const steps = [
    {
      number: "1",
      title: "Commit",
      description:
        "Pledge to make 25% of new fleet purchases fully electric by June 2027",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 28c-2-1-4-3-4-6 0-4 3.5-7 8-5 1.5-3 5-5 8-3 3-2 6.5 0 8 3 4.5-2 8 1 8 5 0 3-2 5-4 6" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 28l4 4 8-10" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 36h16" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M20 40h8" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Act",
      description:
        "Use Rewiring\u2019s resources, calculators, and deals to make the switch",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M28 6L16 24h8l-4 18L36 22h-8l4-16z" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <circle cx="12" cy="36" r="5" stroke="#1a3c3c" strokeWidth="2" fill="none" />
          <path d="M12 34v4" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 36h4" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Report",
      description:
        "Share your progress, celebrate wins, inspire others",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 40V14l8-6 4 4 4-4 8 6v26H10z" stroke="#1a3c3c" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <rect x="16" y="22" width="4" height="12" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <rect x="22" y="18" width="4" height="16" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <rect x="28" y="26" width="4" height="8" rx="1" stroke="#1a3c3c" strokeWidth="2" fill="#FFFCF0" />
          <path d="M36 10l4-2v14l-4 2V10z" stroke="#1a3c3c" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`tccbpl-root-${uid}`}>
      <section className={`tccbpl-section-${uid}`}>
        <div className={`tccbpl-inner-${uid}`}>
          <h2 className={`tccbpl-heading-${uid}`}>{heading}</h2>
          <p className={`tccbpl-subtitle-${uid}`}>{subtitle}</p>

          {/* Steps */}
          <div className={`tccbpl-steps-${uid}`}>
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`tccbpl-step-${uid}`}>
                  <div className={`tccbpl-number-${uid}`}>
                    <span>{step.number}</span>
                  </div>
                  <div className={`tccbpl-sicon-${uid}`}>{step.icon}</div>
                  <h3 className={`tccbpl-stitle-${uid}`}>{step.title}</h3>
                  <p className={`tccbpl-sdesc-${uid}`}>{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`tccbpl-connector-${uid}`} aria-hidden="true">
                    <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 12h32m0 0l-8-7m8 7l-8 7" stroke="#2d5c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <div className={`tccbpl-cta-${uid}`}>
            <h3 className={`tccbpl-cta-heading-${uid}`}>Ready to lead?</h3>
            <a href="#pledge" className={`tccbpl-cta-btn-${uid}`}>
              {ctaText}
            </a>
          </div>

          {/* Badge */}
          {showBadge && (
            <div className={`tccbpl-badge-area-${uid}`}>
              <h3 className={`tccbpl-badge-heading-${uid}`}>Show Your Commitment</h3>
              <div className={`tccbpl-badge-${uid}`}>
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="25% Electric Pledge Badge">
                  <circle cx="100" cy="100" r="90" stroke="#2d5c5a" strokeWidth="4" fill="#FFFCF0" />
                  <circle cx="100" cy="100" r="80" stroke="#f5b731" strokeWidth="3" strokeDasharray="8 4" fill="none" />
                  <text x="100" y="72" textAnchor="middle" fontFamily="Rubik, sans-serif" fontSize="36" fontWeight="700" fill="#1a3c3c">25%</text>
                  <text x="100" y="96" textAnchor="middle" fontFamily="Rubik, sans-serif" fontSize="12" fontWeight="600" fill="#2d5c5a" letterSpacing="2">ELECTRIC</text>
                  <text x="100" y="114" textAnchor="middle" fontFamily="Rubik, sans-serif" fontSize="12" fontWeight="600" fill="#2d5c5a" letterSpacing="2">PLEDGE</text>
                  <circle cx="100" cy="140" r="14" fill="#2d5c5a" />
                  <path d="M93 140l4 4 10-10" stroke="#FFFCF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Decorative leaf accents */}
                  <path d="M48 80c8 4 6 16-2 18" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M44 86c6 1 8 8 4 12" stroke="#2d5c5a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M152 80c-8 4-6 16 2 18" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M156 86c-6 1-8 8-4 12" stroke="#2d5c5a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <p className={`tccbpl-badge-text-${uid}`}>
                Display your badge on your website, email signatures, and vehicles
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccbpl-root-${uid} { width: 100%; }

        .tccbpl-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccbpl-inner-${uid} {
          max-width: 1060px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .tccbpl-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbpl-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: #5a7a78;
          margin: -20px 0 0;
          line-height: 1.6;
        }

        /* ---- Steps ---- */
        .tccbpl-steps-${uid} {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          width: 100%;
        }

        .tccbpl-step-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          flex: 1;
          max-width: 260px;
          padding: 24px 16px;
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tccbpl-step-${uid}:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.08);
          background: rgba(255, 252, 240, 0.6);
        }

        .tccbpl-number-${uid} {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #f5b731;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tccbpl-number-${uid} span {
          font-family: 'Rubik', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a3c3c;
          line-height: 1;
        }

        .tccbpl-sicon-${uid} {
          width: 52px;
          height: 52px;
        }

        .tccbpl-sicon-${uid} svg {
          width: 100%;
          height: 100%;
        }

        .tccbpl-stitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbpl-sdesc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        /* Connector arrows */
        .tccbpl-connector-${uid} {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          flex-shrink: 0;
          padding-top: 36px;
        }

        .tccbpl-connector-${uid} svg {
          width: 40px;
          height: 24px;
        }

        /* ---- CTA ---- */
        .tccbpl-cta-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 32px 0 0;
        }

        .tccbpl-cta-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbpl-cta-btn-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 700;
          color: #1a3c3c;
          background: #f5b731;
          border: none;
          border-radius: 999px;
          padding: 16px 48px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          letter-spacing: 0.02em;
        }

        .tccbpl-cta-btn-${uid}:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 183, 49, 0.35);
          background: #f7c24a;
        }

        .tccbpl-cta-btn-${uid}:active {
          transform: translateY(0);
        }

        /* ---- Badge ---- */
        .tccbpl-badge-area-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 40px 0 0;
          border-top: 2px solid rgba(45, 92, 90, 0.1);
          width: 100%;
          max-width: 480px;
        }

        .tccbpl-badge-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.2rem, 2.2vw, 1.4rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbpl-badge-${uid} {
          width: 180px;
          height: 180px;
          transition: transform 0.4s ease;
        }

        .tccbpl-badge-${uid}:hover {
          transform: scale(1.06) rotate(2deg);
        }

        .tccbpl-badge-${uid} svg {
          width: 100%;
          height: 100%;
        }

        .tccbpl-badge-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
          max-width: 360px;
        }

        /* ---- Mobile ---- */
        @media (max-width: 768px) {
          .tccbpl-section-${uid} {
            padding: 60px 24px;
          }

          .tccbpl-steps-${uid} {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .tccbpl-step-${uid} {
            max-width: 340px;
          }

          .tccbpl-connector-${uid} {
            padding-top: 0;
            transform: rotate(90deg);
            width: 40px;
            height: 32px;
          }
        }

        @media (max-width: 480px) {
          .tccbpl-section-${uid} {
            padding: 40px 16px;
          }

          .tccbpl-step-${uid} {
            padding: 20px 12px;
          }

          .tccbpl-cta-btn-${uid} {
            padding: 14px 36px;
          }

          .tccbpl-badge-${uid} {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
