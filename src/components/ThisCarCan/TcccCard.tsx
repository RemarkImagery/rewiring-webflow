"use client";

import React, { useId } from "react";

interface TcccCardProps {
  name?: string;
  logo?: any;
  industry?: string;
  tagline?: string;
  fleetSize?: string;
  evPercent?: string;
  journeyYear?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function TcccCard(props: TcccCardProps) {
  const {
    name = "Company Name",
    logo,
    industry = "Industry",
    tagline = "Their EV transition story in one sentence.",
    fleetSize = "100",
    evPercent = "50%",
    journeyYear = "2020",
  } = props;

  const uid = useId().replace(/:/g, "");
  const logoSrc = resolveImage(logo);

  return (
    <>
      <div className={`tccc-card-${uid}`}>
        <div className={`tccc-logo-area-${uid}`}>
          {logoSrc ? (
            <img src={logoSrc} alt={`${name} logo`} className={`tccc-logo-${uid}`} />
          ) : (
            <div className={`tccc-logo-placeholder-${uid}`}>
              <span>{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className={`tccc-body-${uid}`}>
          <h3 className={`tccc-name-${uid}`}>{name}</h3>
          <span className={`tccc-industry-${uid}`}>{industry}</span>
          <p className={`tccc-tagline-${uid}`}>&ldquo;{tagline}&rdquo;</p>
          <div className={`tccc-stats-${uid}`}>
            <div className={`tccc-stat-${uid}`}>
              <span className={`tccc-stat-value-${uid}`}>{fleetSize}</span>
              <span className={`tccc-stat-label-${uid}`}>vehicles</span>
            </div>
            <div className={`tccc-stat-${uid}`}>
              <span className={`tccc-stat-value-${uid}`}>{evPercent}</span>
              <span className={`tccc-stat-label-${uid}`}>electric</span>
            </div>
            <div className={`tccc-stat-${uid}`}>
              <span className={`tccc-stat-value-${uid}`}>{journeyYear}</span>
              <span className={`tccc-stat-label-${uid}`}>started</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tccc-card-${uid} {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(27, 74, 74, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          border: 2px solid transparent;
          font-family: 'Rubik', sans-serif;
          position: relative;
        }

        .tccc-card-${uid}:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(27, 74, 74, 0.15);
          border-color: #1B4A4A;
        }

        .tccc-logo-area-${uid} {
          width: 100%;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7fafa;
          border-bottom: 1px solid #e8f0ef;
          overflow: hidden;
        }

        .tccc-logo-${uid} {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tccc-logo-placeholder-${uid} {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          background: #1B4A4A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
        }

        .tccc-body-${uid} {
          padding: 20px 24px 20px;
        }

        .tccc-name-${uid} {
          font-size: 18px;
          font-weight: 600;
          color: #1B4A4A;
          margin: 0 0 6px;
          line-height: 1.2;
        }

        .tccc-industry-${uid} {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #1B4A4A;
          background: #e8f0ef;
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        .tccc-tagline-${uid} {
          font-size: 14px;
          line-height: 1.55;
          color: #3a5f5e;
          margin: 0 0 16px;
          font-style: italic;
        }

        .tccc-stats-${uid} {
          display: flex;
          gap: 8px;
          border-top: 1px solid #e8f0ef;
          padding-top: 14px;
        }

        .tccc-stat-${uid} {
          flex: 1;
          text-align: center;
          padding: 8px 4px;
          background: #f7fafa;
          border-radius: 8px;
        }

        .tccc-stat-value-${uid} {
          display: block;
          font-size: 17px;
          font-weight: 700;
          color: #1B4A4A;
          line-height: 1.2;
        }

        .tccc-stat-label-${uid} {
          display: block;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5c7a78;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .tccc-body-${uid} {
            padding: 16px 18px 16px;
          }
          .tccc-name-${uid} {
            font-size: 16px;
          }
          .tccc-stat-value-${uid} {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}
