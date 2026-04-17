"use client";

import React, { useId } from "react";

interface TccbWhyProps {
  heading?: string;
  body?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  bgColor?: string;
}

export default function TccbWhy(props: TccbWhyProps) {
  const {
    heading = "Businesses Need to Lead",
    body = "Businesses buy 60% of all new vehicles in New Zealand. Households can\u2019t drive this transition alone \u2014 and the second-hand EV market depends on what businesses buy today.",
    stat1Number = "150,000",
    stat1Label = "new vehicles bought per year",
    stat2Number = "60%",
    stat2Label = "purchased by businesses",
    stat3Number = "22,500",
    stat3Label = "BEVs = back to 2023 levels",
    bgColor = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");

  const stats = [
    { number: stat1Number, label: stat1Label },
    { number: stat2Number, label: stat2Label },
    { number: stat3Number, label: stat3Label },
  ];

  return (
    <div className={`tccbwhy-root-${uid}`}>
      <section className={`tccbwhy-section-${uid}`}>
        <div className={`tccbwhy-inner-${uid}`}>
          <h2 className={`tccbwhy-heading-${uid}`}>{heading}</h2>
          <div
            className={`tccbwhy-body-${uid}`}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className={`tccbwhy-stats-${uid}`}>
            {stats.map((stat, i) => (
              <div key={i} className={`tccbwhy-card-${uid}`}>
                <span className={`tccbwhy-number-${uid}`}>{stat.number}</span>
                <span className={`tccbwhy-label-${uid}`}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccbwhy-root-${uid} { width: 100%; }

        .tccbwhy-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccbwhy-inner-${uid} {
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          text-align: center;
        }

        .tccbwhy-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccbwhy-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.7;
          max-width: 680px;
          margin: 0;
        }

        .tccbwhy-body-${uid} p {
          margin: 0 0 12px;
        }

        .tccbwhy-body-${uid} p:last-child {
          margin-bottom: 0;
        }

        .tccbwhy-stats-${uid} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          width: 100%;
          margin-top: 12px;
        }

        .tccbwhy-card-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 36px 24px;
          border: 3px dashed #f5b731;
          border-radius: 20px;
          background: #FFFCF0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tccbwhy-card-${uid}:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.1);
        }

        .tccbwhy-number-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #f5b731;
          line-height: 1.1;
        }

        .tccbwhy-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tccbwhy-stats-${uid} {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 400px;
          }

          .tccbwhy-section-${uid} {
            padding: 60px 24px;
          }
        }

        @media (max-width: 480px) {
          .tccbwhy-section-${uid} {
            padding: 40px 16px;
          }

          .tccbwhy-card-${uid} {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}
