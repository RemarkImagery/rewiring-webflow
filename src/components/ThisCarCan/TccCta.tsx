"use client";

import React, { useId } from "react";

interface TccCtaProps {
  heading?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  bgColor?: string;
  accentColor?: string;
}

export default function TccCta(props: TccCtaProps) {
  const {
    heading = "What is This Car Can?",
    description = "This Car Can is a campaign celebrating the real stories of everyday people making the switch to electric vehicles. From saving thousands on fuel to charging on the driveway — we're sharing the awesome ways car electrification is changing lives across Aotearoa.",
    primaryButtonText = "Share Your Story",
    secondaryButtonText = "Read the Stories",
    bgColor = "#234e4c",
    accentColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`tcc-cta-root-${uid}`}>
      <section className={`tcc-cta-${uid}`}>
        <div className={`tcc-cta-inner-${uid}`}>
          <h2 className={`tcc-cta-heading-${uid}`}>{heading}</h2>
          <p className={`tcc-cta-text-${uid}`}>{description}</p>
          <div className={`tcc-cta-buttons-${uid}`}>
            <a href="#share" className={`tcc-cta-btn-${uid}`}>{primaryButtonText}</a>
            <a href="#read" className={`tcc-cta-btn-${uid} tcc-cta-btn-outline-${uid}`}>{secondaryButtonText}</a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-cta-root-${uid} { width: 100%; }

        .tcc-cta-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 60px 24px;
          box-sizing: border-box;
        }

        .tcc-cta-inner-${uid} {
          max-width: 680px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .tcc-cta-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700;
          color: ${accentColor};
          margin: 0;
          line-height: 1.2;
        }

        .tcc-cta-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #d1e0df;
          margin: 0;
          line-height: 1.7;
        }

        .tcc-cta-buttons-${uid} {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 4px;
        }

        .tcc-cta-btn-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
          background: ${accentColor};
          padding: 14px 36px;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }

        .tcc-cta-btn-outline-${uid} {
          background: transparent;
          color: ${accentColor};
          border: 2px solid ${accentColor};
        }

        .tcc-cta-btn-${uid}:hover {
          background: #ffc94d;
          color: #1a3c3c;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .tcc-cta-${uid} { padding: 40px 16px; }
        }
      `}</style>
    </div>
  );
}
