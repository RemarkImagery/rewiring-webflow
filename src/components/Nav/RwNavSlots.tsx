"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface RwNavSlotsProps {
  logoUrl?: string;
  logoAlt?: string;
  logoHref?: LinkValue;
  donateLabel?: string;
  donateHref?: LinkValue;
  shopLabel?: string;
  shopHref?: LinkValue;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  panel1?: React.ReactNode;
  panel2?: React.ReactNode;
  panel3?: React.ReactNode;
  panel4?: React.ReactNode;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  panelBg?: string;
  goldColor?: string;
}

export default function RwNavSlots(props: RwNavSlotsProps) {
  const {
    logoUrl = "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg",
    logoAlt = "Rewiring Aotearoa",
    logoHref,
    donateLabel = "Donate",
    donateHref,
    shopLabel = "Shop",
    shopHref,
    label1 = "Learn",
    label2 = "Take Action",
    label3 = "Stories",
    label4 = "About",
    panel1,
    panel2,
    panel3,
    panel4,
    bgColor = "#fdf7ea",
    accentColor = "#234e4c",
    textColor = "#1a3c3c",
    panelBg = "#ffffff",
    goldColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const items: { label: string; slot: React.ReactNode }[] = [
    { label: label1, slot: panel1 },
    { label: label2, slot: panel2 },
    { label: label3, slot: panel3 },
    { label: label4, slot: panel4 },
  ];

  const handleEnter = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const handleLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`rwnavs-root-${uid}`}>
      <header className={`rwnavs-${uid}`}>
        <div className={`rwnavs-inner-${uid}`}>
          <a href={logoHref?.href || "/"} target={logoHref?.target} className={`rwnavs-logo-${uid}`} aria-label={logoAlt}>
            <img src={logoUrl} alt={logoAlt} />
          </a>

          <nav className={`rwnavs-list-${uid}`} aria-label="Primary">
            {items.map((item, i) => {
              const hasSlot = !!item.slot;
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`rwnavs-item-${uid}`}
                  onMouseEnter={() => hasSlot && handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    className={`rwnavs-link-${uid} ${isOpen ? `rwnavs-link-active-${uid}` : ""}`}
                    aria-expanded={isOpen}
                    aria-haspopup={hasSlot}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.label}
                    {hasSlot && (
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {hasSlot && isOpen && (
                    <div
                      className={`rwnavs-panel-${uid}`}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={handleLeave}
                    >
                      <div className={`rwnavs-panel-inner-${uid}`}>{item.slot}</div>
                      <svg className={`rwnavs-squiggle-${uid}`} viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 6 Q 30 0 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6 T 420 6 T 480 6 T 540 6 T 600 6 T 660 6 T 720 6 T 780 6 T 840 6 T 900 6 T 960 6 T 1020 6 T 1080 6 T 1140 6 T 1200 6" stroke={accentColor} strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}

            <div className={`rwnavs-item-${uid}`}>
              <a href={shopHref?.href || "#"} target={shopHref?.target} className={`rwnavs-link-${uid}`}>{shopLabel}</a>
            </div>
          </nav>

          <div className={`rwnavs-actions-${uid}`}>
            <button
              type="button"
              className={`rwnavs-icon-${uid}`}
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <a href={donateHref?.href || "#"} target={donateHref?.target} className={`rwnavs-donate-${uid}`}>{donateLabel}</a>
            <button
              type="button"
              className={`rwnavs-burger-${uid}`}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className={`rwnavs-search-${uid}`}>
            <form className={`rwnavs-search-form-${uid}`} action="/search">
              <input type="search" name="q" placeholder="Search rewiring.nz…" autoFocus className={`rwnavs-search-input-${uid}`} />
              <button type="submit" className={`rwnavs-search-submit-${uid}`}>Search</button>
            </form>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className={`rwnavs-mobile-${uid}`}>
          {items.map((item, i) => (
            <details key={i} className={`rwnavs-m-item-${uid}`}>
              <summary className={`rwnavs-m-summary-${uid}`}>{item.label}</summary>
              {item.slot && <div className={`rwnavs-m-body-${uid}`}>{item.slot}</div>}
            </details>
          ))}
          <a href={shopHref?.href || "#"} target={shopHref?.target} className={`rwnavs-m-link-${uid}`}>{shopLabel}</a>
          <a href={donateHref?.href || "#"} target={donateHref?.target} className={`rwnavs-m-donate-${uid}`}>{donateLabel}</a>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .rwnavs-root-${uid} { font-family: 'Rubik', sans-serif; color: ${textColor}; }

        .rwnavs-${uid} {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${bgColor};
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }

        .rwnavs-inner-${uid} {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .rwnavs-logo-${uid} img { height: 36px; display: block; }

        .rwnavs-list-${uid} {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        .rwnavs-item-${uid} { position: relative; }

        .rwnavs-link-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          font-size: 0.98rem;
          font-weight: 500;
          color: ${textColor};
          background: transparent;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          font-family: inherit;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .rwnavs-link-${uid}:hover,
        .rwnavs-link-active-${uid} {
          background: rgba(35,78,76,0.08);
          color: ${accentColor};
        }

        .rwnavs-panel-${uid} {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 720px;
          background: ${panelBg};
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(26,60,60,0.18), 0 2px 6px rgba(26,60,60,0.08);
          padding: 28px 32px 32px;
          animation: rwnavs-fade-${uid} 0.18s ease-out;
          overflow: hidden;
        }
        @keyframes rwnavs-fade-${uid} {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }

        .rwnavs-panel-inner-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 32px;
        }

        .rwnavs-squiggle-${uid} {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6px;
          width: 100%;
          height: 8px;
          opacity: 0.35;
        }

        .rwnavs-actions-${uid} {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rwnavs-icon-${uid} {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: transparent;
          border: none;
          color: ${textColor};
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .rwnavs-icon-${uid}:hover { background: rgba(35,78,76,0.08); }

        .rwnavs-donate-${uid} {
          display: inline-block;
          padding: 10px 22px;
          background: ${goldColor};
          color: #1a3c3c;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .rwnavs-donate-${uid}:hover { background: #ffc94d; transform: translateY(-1px); }

        .rwnavs-burger-${uid} {
          display: none;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .rwnavs-burger-${uid} span {
          width: 22px; height: 2px; background: ${textColor}; border-radius: 2px;
        }

        .rwnavs-search-${uid} {
          border-top: 1px solid rgba(26,60,60,0.08);
          background: ${panelBg};
          padding: 16px 24px;
        }
        .rwnavs-search-form-${uid} {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
        }
        .rwnavs-search-input-${uid} {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid rgba(26,60,60,0.2);
          border-radius: 999px;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
        }
        .rwnavs-search-input-${uid}:focus { border-color: ${accentColor}; }
        .rwnavs-search-submit-${uid} {
          padding: 12px 22px;
          background: ${accentColor};
          color: #fff;
          border: none;
          border-radius: 999px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .rwnavs-mobile-${uid} {
          background: ${bgColor};
          padding: 16px 24px 24px;
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnavs-m-item-${uid} {
          border-bottom: 1px solid rgba(26,60,60,0.08);
          padding: 8px 0;
        }
        .rwnavs-m-summary-${uid} {
          padding: 10px 0;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          list-style: none;
        }
        .rwnavs-m-body-${uid} { padding: 4px 0 14px; }
        .rwnavs-m-link-${uid} {
          display: block;
          padding: 14px 0;
          font-weight: 600;
          color: ${textColor};
          text-decoration: none;
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnavs-m-donate-${uid} {
          display: block;
          text-align: center;
          margin-top: 16px;
          padding: 14px;
          background: ${goldColor};
          color: #1a3c3c;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          .rwnavs-list-${uid} { display: none; }
          .rwnavs-burger-${uid} { display: inline-flex; }
          .rwnavs-inner-${uid} { justify-content: space-between; }
        }
        @media (min-width: 1025px) {
          .rwnavs-mobile-${uid} { display: none; }
        }
      `}</style>
    </div>
  );
}
