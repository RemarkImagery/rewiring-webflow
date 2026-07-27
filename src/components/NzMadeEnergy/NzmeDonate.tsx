"use client";

import React, { useEffect, useId } from "react";

interface NzmeDonateProps {
  heading?: string;
  subheading?: string;
  campaignPath?: string;
  embedHeight?: string;
  darkColor?: string;
}

const RAISELY_SRC = "https://cdn.raisely.com/v3/public/embed.js";

export default function NzmeDonate(props: NzmeDonateProps) {
  const {
    heading = "Chip in to Operation Laser Kiwi",
    subheading = "Donations go through Raisely, same as rewiring.nz — every dollar pushes the thermometer up.",
    campaignPath = "rewiring-aotearoa",
    embedHeight = "800",
    darkColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");

  // Raisely's embed.js scans for .raisely-donate divs when it executes, so it
  // must be (re)appended after this component has mounted.
  useEffect(() => {
    const existing = document.querySelector(`script[src="${RAISELY_SRC}"]`);
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.src = RAISELY_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [campaignPath]);

  return (
    <section className={`nzmd-wrap-${uid}`} id="donate">
      <style>{`
        .nzmd-wrap-${uid} {
          background: #ffffff;
          padding: 88px 32px 96px;
          font-family: 'Rubik', sans-serif;
        }
        .nzmd-inner-${uid} { max-width: 780px; margin: 0 auto; }
        .nzmd-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px; text-align: center;
        }
        .nzmd-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78; text-align: center;
          max-width: 620px; margin: 0 auto 40px; line-height: 1.6;
        }
        .nzmd-embed-${uid} {
          background: #FFFCF0;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          padding: 18px;
          overflow: hidden;
        }
        .nzmd-embed-${uid} iframe { border: 0; }
        @media (max-width: 640px) {
          .nzmd-wrap-${uid} { padding: 64px 16px 72px; }
          .nzmd-embed-${uid} { padding: 10px; }
        }
      `}</style>

      <div className={`nzmd-inner-${uid}`}>
        <h2 className={`nzmd-heading-${uid}`}>{heading}</h2>
        <p className={`nzmd-sub-${uid}`}>{subheading}</p>
        <div className={`nzmd-embed-${uid}`}>
          <div
            className="raisely-donate"
            data-campaign-path={campaignPath}
            data-profile=""
            data-width="100%"
            data-height={embedHeight}
          />
        </div>
      </div>
    </section>
  );
}
