"use client";

import React, { useId } from "react";

interface TcccSubmitProps {
  heading?: string;
  description?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  emailAddress?: string;
  emailLabel?: string;
  bgColor?: string;
}

export default function TcccSubmit(props: TcccSubmitProps) {
  const {
    heading = "Share Your Company’s EV Story",
    description = "Help inspire other NZ businesses by sharing your fleet electrification journey. Download the case study template, complete it, and send it back to us.",
    downloadUrl = "#",
    downloadLabel = "Download the template",
    emailAddress = "dawn@rewiring.nz",
    emailLabel = "Email your completed form",
    bgColor = "#1B4A4A",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <>
      <section className={`tccs-${uid}`} style={{ background: bgColor }}>
        <div className={`tccs-inner-${uid}`}>
          <div className={`tccs-icon-${uid}`}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="4" width="24" height="32" rx="3" stroke="#f5b731" strokeWidth="2.5" fill="none" />
              <path d="M14 14h12M14 20h12M14 26h8" stroke="#f5b731" strokeWidth="2" strokeLinecap="round" />
              <rect x="16" y="28" width="24" height="16" rx="3" fill="#f5b731" />
              <path d="M28 33v6M25 36l3 3 3-3" stroke="#1B4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={`tccs-heading-${uid}`}>{heading}</h2>
          <p className={`tccs-desc-${uid}`}>{description}</p>
          <div className={`tccs-actions-${uid}`}>
            <a
              href={downloadUrl}
              download
              className={`tccs-btn-${uid} tccs-btn-primary-${uid}`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 15v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {downloadLabel}
            </a>
            <a
              href={`mailto:${emailAddress}?subject=Company%20EV%20Case%20Study%20Submission`}
              className={`tccs-btn-${uid} tccs-btn-secondary-${uid}`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {emailLabel}
            </a>
          </div>
          <p className={`tccs-note-${uid}`}>
            Or send your completed template directly to{" "}
            <a href={`mailto:${emailAddress}`} className={`tccs-email-link-${uid}`}>
              {emailAddress}
            </a>
          </p>
        </div>
      </section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tccs-${uid} {
          padding: 64px 24px;
          font-family: 'Rubik', sans-serif;
          text-align: center;
        }

        .tccs-inner-${uid} {
          max-width: 640px;
          margin: 0 auto;
        }

        .tccs-icon-${uid} {
          margin-bottom: 20px;
        }

        .tccs-heading-${uid} {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px;
          line-height: 1.2;
        }

        .tccs-desc-${uid} {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 32px;
        }

        .tccs-actions-${uid} {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tccs-btn-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s, color 0.2s;
          white-space: nowrap;
        }

        .tccs-btn-${uid}:hover {
          transform: translateY(-2px);
        }

        .tccs-btn-primary-${uid} {
          background: #f5b731;
          color: #1B4A4A;
        }

        .tccs-btn-primary-${uid}:hover {
          background: #ffc94d;
        }

        .tccs-btn-secondary-${uid} {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .tccs-btn-secondary-${uid}:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .tccs-note-${uid} {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .tccs-email-link-${uid} {
          color: #f5b731;
          text-decoration: none;
        }

        .tccs-email-link-${uid}:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .tccs-${uid} { padding: 48px 20px; }
          .tccs-heading-${uid} { font-size: 24px; }
          .tccs-actions-${uid} { flex-direction: column; align-items: center; }
          .tccs-btn-${uid} { width: 100%; max-width: 300px; justify-content: center; }
        }
      `}</style>
    </>
  );
}
