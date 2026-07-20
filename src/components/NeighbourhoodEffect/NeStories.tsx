"use client";

import React, { useId } from "react";

interface NeStoriesProps {
  heading?: string;
  intro?: string;
  closing?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedColor?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  topPadding?: string;
  bottomPadding?: string;
}

export default function NeStories(props: NeStoriesProps) {
  const {
    heading = "Real Kiwis, electrifying their people.",
    intro = "Rewiring Aotearoa CEO Mike Casey has electrified his mum and dad — who are at quite different ends of the political spectrum — and influenced many other electric decisions.",
    closing = "We've heard about an 88-year-old Leaf-driving Gran in an all-electric retirement village, and multi-generational families putting on solar and ripping out gas — and we want to hear more stories like this. Because the more you share stories, the more others are likely to follow.",
    bgColor = "#234e4c",
    accentColor = "#f5b731",
    textColor = "#fdf7ea",
    mutedColor = "#d1e0df",
    showHeader = true,
    showFooter = true,
    topPadding = "80px",
    bottomPadding = "80px",
  } = props;

  const uid = useId().replace(/:/g, "");

  return (
    <div className={`ne-stories-root-${uid}`}>
      <section className={`ne-stories-${uid}`}>
        <div className={`ne-stories-inner-${uid}`}>
          {showHeader && (
            <header className={`ne-stories-header-${uid}`}>
              {heading && <h2 className={`ne-stories-heading-${uid}`}>{heading}</h2>}
              {intro && <p className={`ne-stories-intro-${uid}`}>{intro}</p>}
            </header>
          )}

          {showFooter && closing && (
            <p className={`ne-stories-closing-${uid}`}>{closing}</p>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .ne-stories-root-${uid} { width: 100%; }

        .ne-stories-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: ${topPadding} 24px ${bottomPadding};
          box-sizing: border-box;
          display: flex;
          justify-content: center;
        }

        .ne-stories-inner-${uid} {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }

        .ne-stories-header-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          text-align: center;
        }

        .ne-stories-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.7rem, 3.6vw, 2.4rem);
          font-weight: 700;
          color: ${accentColor};
          margin: 0;
          line-height: 1.2;
        }

        .ne-stories-intro-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          font-weight: 400;
          color: ${mutedColor};
          margin: 0;
          line-height: 1.7;
          max-width: 680px;
        }

        .ne-stories-closing-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 400;
          color: ${mutedColor};
          margin: 0;
          text-align: center;
          line-height: 1.7;
          max-width: 760px;
        }

        @media (max-width: 768px) {
          .ne-stories-${uid} { padding: 60px 18px; }
        }
      `}</style>
    </div>
  );
}
