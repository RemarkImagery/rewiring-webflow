"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

// Programmatically build prop interface for 4 menus × 3 columns × 5 links
type MenuProps = {
  [K in `menu${1 | 2 | 3 | 4}Label`]?: string;
} & {
  [K in `m${1 | 2 | 3 | 4}c${1 | 2 | 3}Title`]?: string;
} & {
  [K in `m${1 | 2 | 3 | 4}c${1 | 2 | 3}l${1 | 2 | 3 | 4 | 5}Label`]?: string;
} & {
  [K in `m${1 | 2 | 3 | 4}c${1 | 2 | 3}l${1 | 2 | 3 | 4 | 5}Link`]?: LinkValue;
};

interface ImageValue {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface RwNavMegaProps extends MenuProps {
  logo?: ImageValue;
  logoAlt?: string;
  logoHref?: LinkValue;
  shopLabel?: string;
  shopHref?: LinkValue;
  donateLabel?: string;
  donateHref?: LinkValue;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  panelBg?: string;
  goldColor?: string;
}

export default function RwNavMega(props: RwNavMegaProps) {
  const {
    logo,
    logoAlt = "Rewiring Aotearoa",
    logoHref,
    shopLabel = "Shop",
    shopHref,
    donateLabel = "Donate",
    donateHref,
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

  const get = (k: string) => (props as Record<string, unknown>)[k];

  const logoSrc =
    logo?.src ||
    "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg";
  const logoAltResolved = logo?.alt || logoAlt;

  const menus = [1, 2, 3, 4].map((m) => {
    const label = (get(`menu${m}Label`) as string) || "";
    const columns = [1, 2, 3]
      .map((c) => {
        const title = (get(`m${m}c${c}Title`) as string) || "";
        const links = [1, 2, 3, 4, 5]
          .map((l) => {
            const lbl = (get(`m${m}c${c}l${l}Label`) as string) || "";
            const lnk = get(`m${m}c${c}l${l}Link`) as LinkValue | undefined;
            return lbl ? { label: lbl, link: lnk } : null;
          })
          .filter(Boolean) as { label: string; link?: LinkValue }[];
        return title || links.length ? { title, links } : null;
      })
      .filter(Boolean) as { title: string; links: { label: string; link?: LinkValue }[] }[];
    return { label, columns };
  });

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
    <div className={`rwnm-root-${uid}`}>
      <header className={`rwnm-${uid}`}>
        <div className={`rwnm-inner-${uid}`}>
          <a href={logoHref?.href || "/"} target={logoHref?.target} className={`rwnm-logo-${uid}`} aria-label={logoAltResolved}>
            <img src={logoSrc} alt={logoAltResolved} />
          </a>

          <nav className={`rwnm-list-${uid}`} aria-label="Primary">
            {menus.map((m, i) => {
              const hasCols = m.columns.length > 0;
              const isOpen = open === i;
              if (!m.label) return null;
              return (
                <div
                  key={i}
                  className={`rwnm-item-${uid}`}
                  onMouseEnter={() => hasCols && handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    className={`rwnm-link-${uid} ${isOpen ? `rwnm-link-active-${uid}` : ""}`}
                    aria-expanded={isOpen}
                    aria-haspopup={hasCols}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {m.label}
                    {hasCols && (
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {hasCols && isOpen && (
                    <div
                      className={`rwnm-panel-${uid}`}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={handleLeave}
                    >
                      <div className={`rwnm-panel-inner-${uid}`}>
                        {m.columns.map((col, ci) => (
                          <div key={ci} className={`rwnm-col-${uid}`}>
                            {col.title && <h4 className={`rwnm-col-title-${uid}`}>{col.title}</h4>}
                            <ul className={`rwnm-col-list-${uid}`}>
                              {col.links.map((l, li) => (
                                <li key={li}>
                                  <a
                                    href={l.link?.href || "#"}
                                    target={l.link?.target}
                                    className={`rwnm-col-link-${uid}`}
                                  >
                                    {l.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <svg className={`rwnm-squiggle-${uid}`} viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 6 Q 30 0 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6 T 420 6 T 480 6 T 540 6 T 600 6 T 660 6 T 720 6 T 780 6 T 840 6 T 900 6 T 960 6 T 1020 6 T 1080 6 T 1140 6 T 1200 6" stroke={accentColor} strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}

            {shopLabel && (
              <div className={`rwnm-item-${uid}`}>
                <a href={shopHref?.href || "#"} target={shopHref?.target} className={`rwnm-link-${uid}`}>
                  {shopLabel}
                </a>
              </div>
            )}
          </nav>

          <div className={`rwnm-actions-${uid}`}>
            <button
              type="button"
              className={`rwnm-icon-${uid}`}
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            {donateLabel && (
              <a href={donateHref?.href || "#"} target={donateHref?.target} className={`rwnm-donate-${uid}`}>
                {donateLabel}
              </a>
            )}
            <button
              type="button"
              className={`rwnm-burger-${uid}`}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className={`rwnm-search-${uid}`}>
            <form className={`rwnm-search-form-${uid}`} action="/search">
              <input type="search" name="q" placeholder="Search rewiring.nz…" autoFocus className={`rwnm-search-input-${uid}`} />
              <button type="submit" className={`rwnm-search-submit-${uid}`}>Search</button>
            </form>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className={`rwnm-mobile-${uid}`}>
          {menus.map((m, i) =>
            m.label ? (
              <details key={i} className={`rwnm-m-item-${uid}`}>
                <summary className={`rwnm-m-summary-${uid}`}>{m.label}</summary>
                <div className={`rwnm-m-body-${uid}`}>
                  {m.columns.map((col, ci) => (
                    <div key={ci}>
                      {col.title && <h4 className={`rwnm-m-col-title-${uid}`}>{col.title}</h4>}
                      <ul className={`rwnm-m-col-list-${uid}`}>
                        {col.links.map((l, li) => (
                          <li key={li}>
                            <a href={l.link?.href || "#"} target={l.link?.target}>{l.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ) : null
          )}
          {shopLabel && (
            <a href={shopHref?.href || "#"} target={shopHref?.target} className={`rwnm-m-link-${uid}`}>
              {shopLabel}
            </a>
          )}
          {donateLabel && (
            <a href={donateHref?.href || "#"} target={donateHref?.target} className={`rwnm-m-donate-${uid}`}>
              {donateLabel}
            </a>
          )}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .rwnm-root-${uid} { font-family: 'Rubik', sans-serif; color: ${textColor}; }

        .rwnm-${uid} {
          position: sticky; top: 0; z-index: 100;
          background: ${bgColor};
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnm-inner-${uid} {
          max-width: 1280px; margin: 0 auto;
          padding: 16px 24px;
          display: flex; align-items: center; gap: 28px;
        }
        .rwnm-logo-${uid} img { height: 36px; display: block; }

        .rwnm-list-${uid} {
          display: flex; align-items: center; gap: 4px;
          flex: 1; justify-content: center;
        }
        .rwnm-item-${uid} { position: relative; }
        .rwnm-link-${uid} {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          font-size: 0.98rem; font-weight: 500;
          color: ${textColor};
          background: transparent; border: none; border-radius: 999px;
          cursor: pointer; text-decoration: none;
          font-family: inherit;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .rwnm-link-${uid}:hover, .rwnm-link-active-${uid} {
          background: rgba(35,78,76,0.08);
          color: ${accentColor};
        }

        .rwnm-panel-${uid} {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 720px;
          background: ${panelBg};
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(26,60,60,0.18), 0 2px 6px rgba(26,60,60,0.08);
          padding: 28px 32px 32px;
          animation: rwnm-fade-${uid} 0.18s ease-out;
          overflow: hidden;
        }
        @keyframes rwnm-fade-${uid} {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .rwnm-panel-inner-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 32px;
        }
        .rwnm-col-title-${uid} {
          margin: 0 0 12px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: ${accentColor}; opacity: 0.7;
        }
        .rwnm-col-list-${uid} {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 2px;
        }
        .rwnm-col-link-${uid} {
          display: block; padding: 6px 0;
          font-size: 0.95rem; font-weight: 500;
          color: ${textColor}; text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .rwnm-col-link-${uid}:hover { color: ${accentColor}; transform: translateX(3px); }
        .rwnm-squiggle-${uid} {
          position: absolute; left: 0; right: 0; bottom: 6px;
          width: 100%; height: 8px; opacity: 0.35;
        }

        .rwnm-actions-${uid} { display: flex; align-items: center; gap: 10px; }
        .rwnm-icon-${uid} {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 999px; background: transparent; border: none;
          color: ${textColor}; cursor: pointer;
          transition: background 0.2s ease;
        }
        .rwnm-icon-${uid}:hover { background: rgba(35,78,76,0.08); }
        .rwnm-donate-${uid} {
          display: inline-block; padding: 10px 22px;
          background: ${goldColor}; color: #1a3c3c;
          font-weight: 600; border-radius: 999px; text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .rwnm-donate-${uid}:hover { background: #ffc94d; transform: translateY(-1px); }

        .rwnm-burger-${uid} {
          display: none; width: 40px; height: 40px;
          background: transparent; border: none;
          flex-direction: column; justify-content: center; align-items: center; gap: 4px;
          cursor: pointer;
        }
        .rwnm-burger-${uid} span { width: 22px; height: 2px; background: ${textColor}; border-radius: 2px; }

        .rwnm-search-${uid} {
          border-top: 1px solid rgba(26,60,60,0.08);
          background: ${panelBg};
          padding: 16px 24px;
        }
        .rwnm-search-form-${uid} {
          max-width: 720px; margin: 0 auto;
          display: flex; gap: 8px;
        }
        .rwnm-search-input-${uid} {
          flex: 1; padding: 12px 16px;
          border: 1px solid rgba(26,60,60,0.2); border-radius: 999px;
          font-family: inherit; font-size: 1rem; outline: none;
        }
        .rwnm-search-input-${uid}:focus { border-color: ${accentColor}; }
        .rwnm-search-submit-${uid} {
          padding: 12px 22px; background: ${accentColor}; color: #fff;
          border: none; border-radius: 999px;
          font-family: inherit; font-weight: 600; cursor: pointer;
        }

        .rwnm-mobile-${uid} {
          background: ${bgColor};
          padding: 16px 24px 24px;
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnm-m-item-${uid} {
          border-bottom: 1px solid rgba(26,60,60,0.08);
          padding: 8px 0;
        }
        .rwnm-m-summary-${uid} {
          padding: 10px 0;
          font-size: 1.05rem; font-weight: 600;
          cursor: pointer; list-style: none;
        }
        .rwnm-m-body-${uid} { padding: 4px 0 14px; }
        .rwnm-m-col-title-${uid} {
          margin: 8px 0 6px;
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: ${accentColor};
        }
        .rwnm-m-col-list-${uid} {
          list-style: none; padding: 0; margin: 0 0 12px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .rwnm-m-col-list-${uid} a {
          display: block; padding: 6px 0;
          color: ${textColor}; text-decoration: none;
        }
        .rwnm-m-link-${uid} {
          display: block; padding: 14px 0;
          font-weight: 600; color: ${textColor}; text-decoration: none;
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnm-m-donate-${uid} {
          display: block; text-align: center; margin-top: 16px;
          padding: 14px; background: ${goldColor}; color: #1a3c3c;
          font-weight: 600; border-radius: 999px; text-decoration: none;
        }

        @media (max-width: 1024px) {
          .rwnm-list-${uid} { display: none; }
          .rwnm-burger-${uid} { display: inline-flex; }
          .rwnm-inner-${uid} { justify-content: space-between; }
        }
        @media (min-width: 1025px) {
          .rwnm-mobile-${uid} { display: none; }
        }
      `}</style>
    </div>
  );
}
