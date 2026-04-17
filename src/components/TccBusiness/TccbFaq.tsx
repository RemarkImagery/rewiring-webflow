"use client";

import React, { useId, useState } from "react";

interface TccbFaqProps {
  heading?: string;
  subtitle?: string;
  bgColor?: string;
}

const defaultItems = [
  {
    question: "What about range anxiety?",
    answer:
      "Most business fleets drive well within the range of modern EVs. The average NZ commute is 30km \u2014 even the most affordable EVs cover 300km+. And with This Car Can stories from real drivers, you\u2019ll see range isn\u2019t the issue people think it is.",
  },
  {
    question: "EVs are too expensive for our fleet",
    answer:
      "When you factor in fuel savings, lower maintenance, and potential tax benefits, EVs cost less over their lifetime. The total cost of ownership for a BEV is around $19,000 less than an equivalent ICE vehicle.",
  },
  {
    question: "Is the charging infrastructure ready?",
    answer:
      "NZ\u2019s public charging network is growing fast, and most fleet vehicles charge overnight at base. We can connect you with workplace charging providers to make it seamless.",
  },
  {
    question: "Won\u2019t this look like greenwashing?",
    answer:
      "The 25% pledge is specific, measurable, and time-bound \u2014 the opposite of greenwashing. You\u2019re committing to real action with real reporting.",
  },
  {
    question: "What if we can\u2019t hit 25% by June 2027?",
    answer:
      "The pledge is a target, not a penalty. Any movement toward electric is progress. We\u2019ll support you wherever you are in the journey.",
  },
  {
    question: "What vehicles are available for fleets?",
    answer:
      "From utes and vans to sedans and SUVs, there are now EV options across most fleet categories. We can help you find the right fit.",
  },
];

export default function TccbFaq(props: TccbFaqProps) {
  const {
    heading = "Common Questions",
    subtitle = "Everything you need to know about the 25% challenge",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={`tccbfaq-root-${uid}`}>
      <section className={`tccbfaq-section-${uid}`}>
        <div className={`tccbfaq-inner-${uid}`}>
          <h2 className={`tccbfaq-heading-${uid}`}>{heading}</h2>
          <p className={`tccbfaq-subtitle-${uid}`}>{subtitle}</p>

          <div className={`tccbfaq-accordion-${uid}`}>
            {defaultItems.map((item, i) => {
              const isOpen = openIndices.has(i);
              return (
                <div
                  key={i}
                  className={`tccbfaq-item-${uid}${isOpen ? ` tccbfaq-item-open-${uid}` : ""}`}
                >
                  <button
                    className={`tccbfaq-header-${uid}`}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={`tccbfaq-question-${uid}`}>
                      {item.question}
                    </span>
                    <span className={`tccbfaq-icon-${uid}`}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {isOpen ? (
                          <line x1="5" y1="12" x2="19" y2="12" />
                        ) : (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </>
                        )}
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`tccbfaq-body-${uid}${isOpen ? ` tccbfaq-body-open-${uid}` : ""}`}
                  >
                    <div className={`tccbfaq-body-inner-${uid}`}>
                      <p className={`tccbfaq-answer-${uid}`}>{item.answer}</p>
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

        .tccbfaq-root-${uid} { width: 100%; }

        .tccbfaq-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccbfaq-inner-${uid} {
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .tccbfaq-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
          text-align: center;
        }

        .tccbfaq-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.6;
          margin: 0 0 20px;
          text-align: center;
          max-width: 600px;
        }

        .tccbfaq-accordion-${uid} {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tccbfaq-item-${uid} {
          background: #ffffff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(26, 60, 60, 0.05);
          transition: box-shadow 0.3s ease;
        }

        .tccbfaq-item-open-${uid} {
          box-shadow: 0 4px 20px rgba(26, 60, 60, 0.1);
        }

        .tccbfaq-header-${uid} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background 0.2s ease;
        }

        .tccbfaq-header-${uid}:hover {
          background: rgba(26, 60, 60, 0.02);
        }

        .tccbfaq-question-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.1rem);
          font-weight: 600;
          color: #1a3c3c;
          line-height: 1.4;
        }

        .tccbfaq-icon-${uid} {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f5b731;
          color: #1a3c3c;
          transition: transform 0.3s ease;
        }

        .tccbfaq-body-${uid} {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }

        .tccbfaq-body-open-${uid} {
          max-height: 400px;
        }

        .tccbfaq-body-inner-${uid} {
          padding: 0 24px 22px;
        }

        .tccbfaq-answer-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .tccbfaq-section-${uid} {
            padding: 60px 24px;
          }

          .tccbfaq-header-${uid} {
            padding: 18px 20px;
          }

          .tccbfaq-body-inner-${uid} {
            padding: 0 20px 18px;
          }
        }

        @media (max-width: 480px) {
          .tccbfaq-section-${uid} {
            padding: 40px 16px;
          }

          .tccbfaq-header-${uid} {
            padding: 16px 16px;
          }

          .tccbfaq-body-inner-${uid} {
            padding: 0 16px 16px;
          }

          .tccbfaq-icon-${uid} {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}
