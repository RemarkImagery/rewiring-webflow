"use client";

import React, { useId } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface TccFuelTrackerProps {
  imageUrl?: string;
  imageAlt?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkValue;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  headingColor?: string;
}

export default function TccFuelTracker(props: TccFuelTrackerProps) {
  const {
    imageUrl = "https://rewiring-fuel-worker.oj-f3d.workers.dev/latest.png",
    imageAlt = "Live New Zealand fuel price tracker",
    heading = "Run on the sun, not the pump.",
    description = "Running on New Zealand-made energy made economic sense before the fuel crisis kicked off and it makes even more sense now that fuel prices have gone through the roof. You could shop around and get slightly cheaper petrol or diesel, but history suggests the price will keep going up. As this live price tracker shows, the best bet is to go electric and, if you can, run on the sun.",
    buttonText = "",
    buttonLink,
    bgColor = "#f5f1e8",
    accentColor = "#f5b731",
    textColor = "#2a2a2a",
    headingColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const showButton = Boolean(buttonText && buttonText.trim().length > 0);

  return (
    <section className={`tcc-fuel-${uid}`}>
      <div className={`tcc-fuel-inner-${uid}`}>
        <div className={`tcc-fuel-media-${uid}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`tcc-fuel-img-${uid}`}
            loading="lazy"
          />
          <span className={`tcc-fuel-badge-${uid}`}>
            <span className={`tcc-fuel-dot-${uid}`} aria-hidden="true" />
            Updated daily
          </span>
        </div>


        <div className={`tcc-fuel-content-${uid}`}>
          <h2 className={`tcc-fuel-heading-${uid}`}>{heading}</h2>
          <p className={`tcc-fuel-text-${uid}`}>{description}</p>
          {showButton && (
            <a
              href={buttonLink?.href || "#"}
              target={buttonLink?.target}
              className={`tcc-fuel-btn-${uid}`}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tcc-fuel-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: 80px 24px;
          box-sizing: border-box;
          font-family: 'Rubik', sans-serif;
        }

        .tcc-fuel-inner-${uid} {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .tcc-fuel-media-${uid} {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: transparent;
        }

        .tcc-fuel-img-${uid} {
          display: block;
          width: 100%;
          height: auto;
          background: transparent;
        }

        .tcc-fuel-badge-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(26, 60, 60, 0.92);
          color: #fff;
          font-family: 'Rubik', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 12px 7px 10px;
          border-radius: 999px;
        }

        .tcc-fuel-dot-${uid} {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${accentColor};
          box-shadow: 0 0 0 0 ${accentColor};
          animation: tcc-fuel-pulse-${uid} 2s ease-out infinite;
        }

        @keyframes tcc-fuel-pulse-${uid} {
          0%   { box-shadow: 0 0 0 0 ${accentColor}88; }
          70%  { box-shadow: 0 0 0 8px ${accentColor}00; }
          100% { box-shadow: 0 0 0 0 ${accentColor}00; }
        }

        .tcc-fuel-content-${uid} {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .tcc-fuel-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          font-weight: 700;
          color: ${headingColor};
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .tcc-fuel-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          font-weight: 400;
          color: ${textColor};
          margin: 0;
          line-height: 1.65;
        }

        .tcc-fuel-btn-${uid} {
          align-self: flex-start;
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
          background: ${accentColor};
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          margin-top: 6px;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .tcc-fuel-btn-${uid}:hover {
          background: #ffc94d;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .tcc-fuel-${uid} { padding: 56px 20px; }
          .tcc-fuel-inner-${uid} {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
