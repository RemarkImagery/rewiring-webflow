"use client";

import React, { useId } from "react";

interface TccbFooterCtaProps {
  heading?: string;
  primaryText?: string;
  secondaryText?: string;
  bgColor?: string;
  showSocialLinks?: boolean;
}

export default function TccbFooterCta(props: TccbFooterCtaProps) {
  const {
    heading = "Join the Drive to 25. Take the pledge today.",
    primaryText = "Take the Pledge",
    secondaryText = "Talk to Us",
    bgColor = "#f5b731",
    showSocialLinks = true,
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`tccb-fcta-root-${uid}`}>
      <section className={`tccb-fcta-${uid}`} style={{ background: bgColor }}>
        <div className={`tccb-fcta-inner-${uid}`}>
          <h2 className={`tccb-fcta-heading-${uid}`}>{heading}</h2>

          <div className={`tccb-fcta-buttons-${uid}`}>
            <a href="#" className={`tccb-fcta-btn-primary-${uid}`}>
              {primaryText}
            </a>
            <a href="#" className={`tccb-fcta-btn-secondary-${uid}`}>
              {secondaryText}
            </a>
          </div>

          {showSocialLinks && (
            <div className={`tccb-fcta-social-${uid}`}>
              {/* Twitter/X */}
              <a
                href="#"
                className={`tccb-fcta-social-link-${uid}`}
                aria-label="Share on X"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className={`tccb-fcta-social-link-${uid}`}
                aria-label="Share on LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                className={`tccb-fcta-social-link-${uid}`}
                aria-label="Share on Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:?subject=The%2025%25%20Electric%20Challenge"
                className={`tccb-fcta-social-link-${uid}`}
                aria-label="Share via Email"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" fill="currentColor"/>
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccb-fcta-root-${uid} {
          width: 100%;
        }

        .tccb-fcta-${uid} {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccb-fcta-inner-${uid} {
          max-width: 720px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 28px;
        }

        .tccb-fcta-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .tccb-fcta-buttons-${uid} {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tccb-fcta-btn-primary-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          background: #1a3c3c;
          padding: 16px 40px;
          border-radius: 50px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          box-shadow: 0 4px 16px rgba(26, 60, 60, 0.25);
        }

        .tccb-fcta-btn-primary-${uid}:hover {
          background: #234e4c;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.35);
        }

        .tccb-fcta-btn-primary-${uid}:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(26, 60, 60, 0.2);
        }

        .tccb-fcta-btn-secondary-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
          background: transparent;
          padding: 14px 38px;
          border-radius: 50px;
          border: 2px solid #1a3c3c;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }

        .tccb-fcta-btn-secondary-${uid}:hover {
          background: #1a3c3c;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.25);
        }

        .tccb-fcta-btn-secondary-${uid}:active {
          transform: translateY(0);
          box-shadow: none;
        }

        .tccb-fcta-social-${uid} {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 8px;
        }

        .tccb-fcta-social-link-${uid} {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(26, 60, 60, 0.1);
          color: #1a3c3c;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease, color 0.25s ease;
          cursor: pointer;
        }

        .tccb-fcta-social-link-${uid}:hover {
          background: #1a3c3c;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .tccb-fcta-social-link-${uid}:active {
          transform: translateY(0);
        }

        .tccb-fcta-social-link-${uid} svg {
          display: block;
        }

        @media (max-width: 768px) {
          .tccb-fcta-${uid} {
            padding: 60px 20px;
          }
        }

        @media (max-width: 480px) {
          .tccb-fcta-${uid} {
            padding: 40px 16px;
          }

          .tccb-fcta-buttons-${uid} {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .tccb-fcta-btn-primary-${uid},
          .tccb-fcta-btn-secondary-${uid} {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tccb-fcta-btn-primary-${uid},
          .tccb-fcta-btn-secondary-${uid},
          .tccb-fcta-social-link-${uid} {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
