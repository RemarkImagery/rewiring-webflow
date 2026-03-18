"use client";

import React, { useId } from "react";

interface WlevFooterCtaProps {
  heading?: string;
  primaryText?: string;
  secondaryText?: string;
  bgColor?: string;
}

export default function WlevFooterCta(props: WlevFooterCtaProps) {
  const {
    heading = "Ready to go electric?",
    primaryText = "Learn More",
    secondaryText = "Find an EV",
    bgColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`wlev-fcta-root-${uid}`}>
      <section className={`wlev-fcta-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-fcta-inner-${uid}`}>
          <h2 className={`wlev-fcta-heading-${uid}`}>{heading}</h2>
          <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-fcta-squiggle-${uid}`} />

          <div className={`wlev-fcta-buttons-${uid}`}>
            <a href="#" className={`wlev-fcta-btn-primary-${uid}`}>{primaryText}</a>
            <a href="#" className={`wlev-fcta-btn-secondary-${uid}`}>{secondaryText}</a>
          </div>

          <div className={`wlev-fcta-social-${uid}`}>
            <span className={`wlev-fcta-social-label-${uid}`}>Share:</span>
            {/* X/Twitter */}
            <a href="#" className={`wlev-fcta-social-link-${uid}`} aria-label="Share on X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className={`wlev-fcta-social-link-${uid}`} aria-label="Share on LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Facebook */}
            <a href="#" className={`wlev-fcta-social-link-${uid}`} aria-label="Share on Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Email */}
            <a href="#" className={`wlev-fcta-social-link-${uid}`} aria-label="Share via email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .wlev-fcta-root-${uid} { width: 100%; }

        .wlev-fcta-section-${uid} {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .wlev-fcta-inner-${uid} {
          max-width: 700px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          text-align: center;
        }

        .wlev-fcta-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .wlev-fcta-buttons-${uid} {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .wlev-fcta-btn-primary-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 600;
          color: #ffffff;
          background: #1a3c3c;
          padding: 16px 44px;
          border-radius: 50px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(26, 60, 60, 0.25);
        }

        .wlev-fcta-btn-primary-${uid}:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.35);
        }

        .wlev-fcta-btn-secondary-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 600;
          color: #1a3c3c;
          background: transparent;
          padding: 14px 44px;
          border-radius: 50px;
          border: 2px solid #1a3c3c;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .wlev-fcta-btn-secondary-${uid}:hover {
          transform: translateY(-2px);
          background: rgba(26, 60, 60, 0.08);
        }

        .wlev-fcta-social-${uid} {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }

        .wlev-fcta-social-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a3c3c;
          opacity: 0.7;
        }

        .wlev-fcta-social-link-${uid} {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(26, 60, 60, 0.1);
          color: #1a3c3c;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .wlev-fcta-social-link-${uid}:hover {
          background: rgba(26, 60, 60, 0.2);
          transform: scale(1.1);
        }

        .wlev-fcta-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }

        @media (max-width: 540px) {
          .wlev-fcta-section-${uid} { padding: 60px 20px; }
          .wlev-fcta-buttons-${uid} { flex-direction: column; width: 100%; }
          .wlev-fcta-btn-primary-${uid},
          .wlev-fcta-btn-secondary-${uid} { width: 100%; text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-fcta-btn-primary-${uid},
          .wlev-fcta-btn-secondary-${uid},
          .wlev-fcta-social-link-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
