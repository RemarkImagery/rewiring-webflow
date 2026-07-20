"use client";

import React from "react";

interface LinkValue {
  href: string;
  target?: string;
}

export interface RwRegionFooterProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  /** Optional PDF link. If empty, the button triggers the browser print dialog. */
  pdfUrl?: LinkValue;
  learnMoreLabel?: string;
  learnMoreUrl?: LinkValue;
  dataNote?: string;
  bgColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwRegionFooter({
  title = "Take the report with you",
  subtitle = "Download a shareable PDF of the full electrification report — perfect for council meetings, community groups, or sharing with your neighbours.",
  buttonLabel = "Download report (PDF)",
  pdfUrl,
  learnMoreLabel = "rewiring.nz",
  learnMoreUrl,
  dataNote = "Data from the Rewiring Aotearoa Household Electrification Model 2026",
  bgColor = "#fdf7ea",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: RwRegionFooterProps) {
  const pdfHref = pdfUrl?.href || "";
  const learnHref = learnMoreUrl?.href || "https://rewiring.nz";
  const onDownload = (e: React.MouseEvent) => {
    if (!pdfHref) {
      e.preventDefault();
      if (typeof window !== "undefined") window.print();
    }
  };

  return (
    <div className="rw-region-footer">
      <style>{`
        .rw-region-footer { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: ${bgColor}; }
        .rw-region-footer .rw-rf-download { padding: 80px 24px; }
        .rw-region-footer .rw-rf-card { max-width: 720px; margin: 0 auto; text-align: center; background: #fff; border: 2px dashed ${goldColor}; border-radius: 24px; padding: 44px 36px; }
        .rw-region-footer .rw-rf-title { font-size: clamp(26px, 3.4vw, 36px); font-weight: 700; color: ${accentColor}; margin: 0 0 12px; line-height: 1.1; }
        .rw-region-footer .rw-rf-sub { font-size: 16px; line-height: 1.55; color: #4a6664; margin: 0 auto 26px; max-width: 540px; }
        .rw-region-footer .rw-rf-btn { display: inline-flex; align-items: center; gap: 10px; background: ${goldColor}; color: ${inkColor}; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 26px; border-radius: 100px; border: none; cursor: pointer; transition: background-color .18s ease, transform .18s ease; font-family: inherit; }
        .rw-region-footer .rw-rf-btn:hover { background: #ffc94d; transform: translateY(-2px); }
        .rw-region-footer .rw-rf-btn svg { width: 20px; height: 20px; }
        .rw-region-footer .rw-rf-foot { text-align: center; padding: 0 24px 56px; }
        .rw-region-footer .rw-rf-foot p { margin: 0; font-size: 15px; }
        .rw-region-footer .rw-rf-foot a { color: ${accentColor}; font-weight: 600; }
        .rw-region-footer .rw-rf-note { margin-top: 8px !important; opacity: 0.6; font-size: 12px !important; }
        @media print { .rw-region-footer .rw-rf-download { display: none; } }
      `}</style>

      <div className="rw-rf-download">
        <div className="rw-rf-card">
          <h2 className="rw-rf-title">{title}</h2>
          <p className="rw-rf-sub">{subtitle}</p>
          <a className="rw-rf-btn" href={pdfHref || "#"} onClick={onDownload} {...(pdfHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {buttonLabel}
          </a>
        </div>
      </div>

      <div className="rw-rf-foot">
        <p>
          Learn more:{" "}
          <a href={learnHref} target="_blank" rel="noopener noreferrer">{learnMoreLabel}</a>
        </p>
        <p className="rw-rf-note">{dataNote}</p>
      </div>
    </div>
  );
}
