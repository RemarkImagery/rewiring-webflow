"use client";

import React, { useId, useState } from "react";

interface TccbSupportProps {
  heading?: string;
  subtitle?: string;
  bgColor?: string;
}

const defaultItems = [
  {
    title: "Advocacy",
    description:
      "We\u2019re pushing for accelerated depreciation, FBT exemptions on EVs, and low-cost transition loans to make the business case even stronger.",
  },
  {
    title: "Resources",
    description:
      "Access myth-busting guides, total cost of ownership calculators, charging infrastructure guides, and staff training materials.",
  },
  {
    title: "Promotion",
    description:
      "Get media coverage, be featured in case studies, and celebrate your progress with our community.",
  },
  {
    title: "Deals & Partnerships",
    description:
      "Trial EVs before you commit, access dealer offers, and connect with charging provider partnerships.",
  },
  {
    title: "Monitoring & Reporting",
    description:
      "Track your fleet\u2019s transition progress with our tools and share your results publicly.",
  },
];

export default function TccbSupport(props: TccbSupportProps) {
  const {
    heading = "How We\u2019ll Support You",
    subtitle = "Rewiring Aotearoa is here to make your transition easier",
    bgColor = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`tccbsupport-root-${uid}`}>
      <section className={`tccbsupport-section-${uid}`}>
        <div className={`tccbsupport-inner-${uid}`}>
          <h2 className={`tccbsupport-heading-${uid}`}>{heading}</h2>
          <p className={`tccbsupport-subtitle-${uid}`}>{subtitle}</p>

          <div className={`tccbsupport-accordion-${uid}`}>
            {defaultItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`tccbsupport-item-${uid}${isOpen ? ` tccbsupport-item-open-${uid}` : ""}`}
                >
                  <button
                    className={`tccbsupport-header-${uid}`}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={`tccbsupport-title-${uid}`}>
                      {item.title}
                    </span>
                    <svg
                      className={`tccbsupport-chevron-${uid}${isOpen ? ` tccbsupport-chevron-open-${uid}` : ""}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className={`tccbsupport-body-${uid}${isOpen ? ` tccbsupport-body-open-${uid}` : ""}`}
                  >
                    <div className={`tccbsupport-body-inner-${uid}`}>
                      <p className={`tccbsupport-desc-${uid}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccbsupport-root-${uid} { width: 100%; }

        .tccbsupport-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccbsupport-inner-${uid} {
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .tccbsupport-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
          text-align: center;
        }

        .tccbsupport-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.6;
          margin: 0 0 20px;
          text-align: center;
          max-width: 600px;
        }

        .tccbsupport-accordion-${uid} {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tccbsupport-item-${uid} {
          border: 1px solid #e0e8e7;
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          border-left: 4px solid transparent;
        }

        .tccbsupport-item-open-${uid} {
          border-left: 4px solid #f5b731;
          box-shadow: 0 4px 16px rgba(26, 60, 60, 0.06);
        }

        .tccbsupport-header-${uid} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background 0.2s ease;
        }

        .tccbsupport-header-${uid}:hover {
          background: rgba(26, 60, 60, 0.02);
        }

        .tccbsupport-title-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 600;
          color: #1a3c3c;
          line-height: 1.4;
        }

        .tccbsupport-chevron-${uid} {
          flex-shrink: 0;
          color: #2d5c5a;
          transition: transform 0.3s ease;
        }

        .tccbsupport-chevron-open-${uid} {
          transform: rotate(180deg);
        }

        .tccbsupport-body-${uid} {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }

        .tccbsupport-body-open-${uid} {
          max-height: 300px;
        }

        .tccbsupport-body-inner-${uid} {
          padding: 0 24px 20px;
        }

        .tccbsupport-desc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .tccbsupport-section-${uid} {
            padding: 60px 24px;
          }

          .tccbsupport-header-${uid} {
            padding: 16px 20px;
          }

          .tccbsupport-body-inner-${uid} {
            padding: 0 20px 16px;
          }
        }

        @media (max-width: 480px) {
          .tccbsupport-section-${uid} {
            padding: 40px 16px;
          }

          .tccbsupport-header-${uid} {
            padding: 14px 16px;
          }

          .tccbsupport-body-inner-${uid} {
            padding: 0 16px 14px;
          }
        }
      `}</style>
    </div>
  );
}
