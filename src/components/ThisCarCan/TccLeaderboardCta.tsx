"use client";

import React, { useId } from "react";

interface RegionRow {
  name?: string;
  share?: string;
}

interface TccLeaderboardCtaProps {
  kicker?: string;
  heading?: string;
  description?: string;
  region1Name?: string;
  region1Share?: string;
  region2Name?: string;
  region2Share?: string;
  region3Name?: string;
  region3Share?: string;
  buttonText?: string;
  buttonHref?: any;
  footnote?: string;
  bgColor?: string;
  cardColor?: string;
  accentColor?: string;
}

const isExternal = (href: string) => /^(https?:\/\/|www\.)/i.test(href);

export default function TccLeaderboardCta(props: TccLeaderboardCtaProps) {
  const {
    kicker = "NZ EV Leaderboard",
    heading = "Where does your region rank?",
    description =
      "We rank all 16 regions by the share of new car registrations that are electric, updated with the latest NZTA data. See who's leading the charge — and where your neighbourhood sits.",
    region1Name = "Wellington",
    region1Share = "12.8%",
    region2Name = "Nelson",
    region2Share = "9.2%",
    region3Name = "Tasman",
    region3Share = "8.9%",
    buttonText = "See the full leaderboard",
    buttonHref,
    footnote = "EV share of new registrations, latest 12 months of NZTA data.",
    bgColor = "#234e4c",
    cardColor = "#fdf7ea",
    accentColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");

  const rows: RegionRow[] = [
    { name: region1Name, share: region1Share },
    { name: region2Name, share: region2Share },
    { name: region3Name, share: region3Share },
  ].filter((r) => r.name);

  // Bar lengths scale relative to the leader's share so the podium
  // reads correctly even when the numbers are edited in Webflow.
  const values = rows.map((r) => parseFloat(r.share || "") || 0);
  const max = Math.max(...values, 0.001);

  // Webflow Link props arrive as an object ({ href }) or string; fall back to
  // the leaderboard URL when unset.
  const href =
    (typeof buttonHref === "string" ? buttonHref : buttonHref?.href) ||
    "https://pages.rewiring.nz/ev-leaderboard";
  const external = isExternal(href);

  return (
    <div className={`tcc-lb-root-${uid}`}>
      <section className={`tcc-lb-${uid}`}>
        <div className={`tcc-lb-card-${uid}`}>
          <div className={`tcc-lb-copy-${uid}`}>
            <span className={`tcc-lb-kicker-${uid}`}>{kicker}</span>
            <h2 className={`tcc-lb-heading-${uid}`}>{heading}</h2>
            <p className={`tcc-lb-text-${uid}`}>{description}</p>
            <a
              href={href}
              className={`tcc-lb-btn-${uid}`}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {buttonText}
              <svg
                className={`tcc-lb-btn-arrow-${uid}`}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h9M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className={`tcc-lb-board-${uid}`} aria-hidden="true">
            {rows.map((row, n) => (
              <div key={n} className={`tcc-lb-row-${uid}`}>
                <span
                  className={`tcc-lb-rank-${uid} ${
                    n === 0 ? `tcc-lb-rank-first-${uid}` : ""
                  }`}
                >
                  {n + 1}
                </span>
                <div className={`tcc-lb-row-body-${uid}`}>
                  <div className={`tcc-lb-row-top-${uid}`}>
                    <span className={`tcc-lb-region-${uid}`}>{row.name}</span>
                    <span className={`tcc-lb-share-${uid}`}>{row.share}</span>
                  </div>
                  <div className={`tcc-lb-track-${uid}`}>
                    <div
                      className={`tcc-lb-bar-${uid}`}
                      style={{
                        width: `${Math.max(
                          (values[n] / max) * 100,
                          8
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {footnote ? (
              <p className={`tcc-lb-footnote-${uid}`}>{footnote}</p>
            ) : null}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tcc-lb-root-${uid} { width: 100%; }

        .tcc-lb-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 60px 24px;
          box-sizing: border-box;
        }

        .tcc-lb-card-${uid} {
          width: 100%;
          max-width: 960px;
          background: ${cardColor};
          border-radius: 24px;
          padding: 44px 48px;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .tcc-lb-copy-${uid} {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .tcc-lb-kicker-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #234e4c;
          background: ${accentColor};
          padding: 6px 14px;
          border-radius: 50px;
        }

        .tcc-lb-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.5rem, 3.2vw, 2.1rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tcc-lb-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          font-weight: 400;
          color: #5c7a78;
          margin: 0;
          line-height: 1.7;
        }

        .tcc-lb-btn-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
          background: ${accentColor};
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
          cursor: pointer;
          margin-top: 6px;
        }

        .tcc-lb-btn-${uid}:hover {
          background: #ffc94d;
          transform: translateY(-2px);
        }

        .tcc-lb-btn-arrow-${uid} {
          transition: transform 0.25s ease;
        }

        .tcc-lb-btn-${uid}:hover .tcc-lb-btn-arrow-${uid} {
          transform: translateX(3px);
        }

        .tcc-lb-board-${uid} {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tcc-lb-row-${uid} {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .tcc-lb-rank-${uid} {
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a3c3c;
          background: transparent;
          border: 2px solid #234e4c;
        }

        .tcc-lb-rank-first-${uid} {
          background: ${accentColor};
          border-color: ${accentColor};
        }

        .tcc-lb-row-body-${uid} {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tcc-lb-row-top-${uid} {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }

        .tcc-lb-region-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
        }

        .tcc-lb-share-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #234e4c;
        }

        .tcc-lb-track-${uid} {
          width: 100%;
          height: 10px;
          border-radius: 50px;
          background: rgba(35, 78, 76, 0.12);
          overflow: hidden;
        }

        .tcc-lb-bar-${uid} {
          height: 100%;
          border-radius: 50px;
          background: #234e4c;
        }

        .tcc-lb-footnote-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #5c7a78;
          margin: 4px 0 0;
          line-height: 1.5;
        }

        @media (max-width: 720px) {
          .tcc-lb-${uid} { padding: 40px 16px; }
          .tcc-lb-card-${uid} {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}
