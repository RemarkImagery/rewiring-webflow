"use client";

import React, { useId } from "react";

interface NeLinksProps {
  heading?: string;
  intro?: string;
  link1Title?: string;
  link1Desc?: string;
  link1Href?: any;
  link2Title?: string;
  link2Desc?: string;
  link2Href?: any;
  link3Title?: string;
  link3Desc?: string;
  link3Href?: any;
  link4Title?: string;
  link4Desc?: string;
  link4Href?: any;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
}

const ICONS: Record<number, React.ReactNode> = {
  0: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 32c4-12 14-20 24-20s20 8 24 20" />
      <path d="M14 50h36" />
      <path d="M20 50V36M28 50V32M36 50V32M44 50V36" />
      <circle cx="32" cy="22" r="4" fill="currentColor" />
    </svg>
  ),
  1: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="22" />
      <path d="M36 22h-4c-2 0-4 1.6-4 4v6h-4v6h4v14h6V38h5l1-6h-6v-4c0-1.2.8-2 2-2h3v-4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6L18 32h10l-4 26 20-30H32l4-22z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 44c0-2 1-4 3-5l5-3c1-.5 1.5-1.5 1.5-3v-2c-2-1.5-3-4-3-7v-3c0-5 3-9 8-9s8 4 8 9v3c0 3-1 5.5-3 7v2c0 1.5.5 2.5 1.5 3l5 3c2 1 3 3 3 5v4H14v-4z" />
      <path d="M44 28c-1.5 0-3-.5-4-1.5M44 28c0 2 1 3.5 2.5 4.5l3.5 2c1.5.8 2 2 2 3.5V40h-12" />
    </svg>
  ),
};

export default function NeLinks(props: NeLinksProps) {
  const {
    heading = "Keep the spark spreading.",
    intro = "These groups are doing the mahi to make electrification easier for everyone.",
    link1Title = "Solar Streets",
    link1Desc = "Group-buy solar with your neighbours and bring the cost down for the whole street.",
    link1Href = "https://www.solarstreets.co.nz",
    link2Title = "Going Electric",
    link2Desc = "Join New Zealand's biggest community of EV owners on Facebook — ask anything.",
    link2Href = "https://www.facebook.com/groups/goingelectricnz",
    link3Title = "Bright Sparks",
    link3Desc = "Connect with local champions in your community already helping people switch.",
    link3Href = "https://rewiring.nz",
    link4Title = "This Car Can stories",
    link4Desc = "Read more stories from Kiwis who've made the switch to electric — and what got them over the line.",
    link4Href = "https://www.thiscarcan.nz",
    bgColor = "#FFFCF0",
    accentColor = "#2d5c5a",
    textColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");

  const resolveHref = (val: any): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object" && val.href) return val.href;
    return "";
  };

  const links = [
    { title: link1Title, desc: link1Desc, href: resolveHref(link1Href), icon: ICONS[0] },
    { title: link2Title, desc: link2Desc, href: resolveHref(link2Href), icon: ICONS[1] },
    { title: link3Title, desc: link3Desc, href: resolveHref(link3Href), icon: ICONS[2] },
    { title: link4Title, desc: link4Desc, href: resolveHref(link4Href), icon: ICONS[3] },
  ];

  return (
    <div className={`ne-links-root-${uid}`}>
      <section className={`ne-links-${uid}`}>
        <div className={`ne-links-inner-${uid}`}>
          <div className={`ne-links-header-${uid}`}>
            <h2 className={`ne-links-heading-${uid}`}>{heading}</h2>
            <p className={`ne-links-intro-${uid}`}>{intro}</p>
          </div>

          <div className={`ne-links-grid-${uid}`}>
            {links.map((l, i) => {
              const isExternal = /^(https?:\/\/|www\.)/i.test(l.href || "");
              return (
                <a
                  key={i}
                  className={`ne-link-card-${uid}`}
                  href={l.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <div className={`ne-link-icon-${uid}`}>{l.icon}</div>
                  <div className={`ne-link-text-${uid}`}>
                    <h3 className={`ne-link-title-${uid}`}>
                      {l.title}
                      {isExternal && (
                        <svg className={`ne-link-ext-${uid}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      )}
                    </h3>
                    <p className={`ne-link-desc-${uid}`}>{l.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .ne-links-root-${uid} { width: 100%; }

        .ne-links-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: 80px 24px 100px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
        }

        .ne-links-inner-${uid} {
          max-width: 1100px;
          width: 100%;
        }

        .ne-links-header-${uid} {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .ne-links-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.6rem, 3.4vw, 2.2rem);
          font-weight: 700;
          color: ${textColor};
          margin: 0 0 12px;
          line-height: 1.2;
        }

        .ne-links-intro-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        .ne-links-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .ne-link-card-${uid} {
          background: #ffffff;
          border: 1px solid #e8e2d0;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          gap: 18px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          align-items: flex-start;
        }
        .ne-link-card-${uid}:hover {
          transform: translateY(-4px);
          border-color: ${accentColor};
          box-shadow: 0 12px 28px rgba(45, 92, 90, 0.12);
        }

        .ne-link-icon-${uid} {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${accentColor};
          background: #FFFCF0;
          border-radius: 14px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .ne-link-icon-${uid} svg { width: 32px; height: 32px; }

        .ne-link-card-${uid}:hover .ne-link-icon-${uid} {
          background: ${accentColor};
          color: #fdf7ea;
          transform: scale(1.05) rotate(-3deg);
        }

        .ne-link-text-${uid} {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ne-link-title-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: ${textColor};
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ne-link-ext-${uid} {
          width: 14px;
          height: 14px;
          color: #9ab0ae;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .ne-link-card-${uid}:hover .ne-link-ext-${uid} {
          color: ${accentColor};
          transform: translate(2px, -2px);
        }

        .ne-link-desc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.55;
        }

        @media (max-width: 720px) {
          .ne-links-grid-${uid} {
            grid-template-columns: 1fr;
          }
          .ne-links-${uid} { padding: 60px 18px 80px; }
        }
      `}</style>
    </div>
  );
}
