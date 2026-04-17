"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavItem {
  label: string;
  href?: string;
  columns?: NavColumn[];
  featured?: { heading: string; text: string; ctaLabel: string; ctaHref: string };
}

const NAV: NavItem[] = [
  {
    label: "Learn",
    columns: [
      {
        title: "Research",
        links: [
          { label: "2025 Policy Manifesto", href: "/research/manifesto" },
          { label: "Electric Homes", href: "/research/electric-homes" },
          { label: "Electric Farms", href: "/research/electric-farms" },
          { label: "Delivered Cost of Energy", href: "/research/delivered-cost" },
          { label: "The Machine Count", href: "/research/machine-count" },
          { label: "All Reports", href: "/research" },
        ],
      },
      {
        title: "Explainers",
        links: [
          { label: "Guides", href: "/guides" },
          { label: "Videos", href: "/videos" },
          { label: "Explainers", href: "/explainers" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Electric Calculator", href: "/calculator" },
          { label: "Make a Plan", href: "/plan" },
          { label: "EDB Scoreboard", href: "/edb-scoreboard" },
        ],
      },
    ],
  },
  {
    label: "Take Action",
    columns: [
      {
        title: "For You",
        links: [
          { label: "Go Electric", href: "/go-electric" },
          { label: "Get Advice", href: "/advice" },
          { label: "Surveys", href: "/surveys" },
          { label: "Make a Plan", href: "/plan" },
        ],
      },
      {
        title: "For Your Community",
        links: [
          { label: "Find a Group", href: "/communities/find" },
          { label: "Start a Group", href: "/communities/start" },
          { label: "Kill Bills Tour", href: "/kill-bills-tour" },
          { label: "Resources", href: "/communities/resources" },
        ],
      },
      {
        title: "For Business",
        links: [
          { label: "This Car Can", href: "/this-car-can" },
          { label: "Ratepayers Scheme", href: "/ratepayers-scheme" },
        ],
      },
    ],
  },
  {
    label: "Stories",
    columns: [
      {
        title: "News",
        links: [
          { label: "Latest News", href: "/news" },
          { label: "Submissions", href: "/submissions" },
          { label: "Electric Avenue", href: "/electric-avenue" },
        ],
      },
      {
        title: "Spotlights",
        links: [
          { label: "Success Stories", href: "/success-stories" },
          { label: "Why We Love EVs", href: "/why-we-love-evs" },
        ],
      },
      {
        title: "Gather",
        links: [
          { label: "Events", href: "/events" },
          { label: "Merchandise", href: "/merch" },
        ],
      },
    ],
  },
  {
    label: "About",
    columns: [
      {
        title: "Who",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Partners", href: "/partners" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Impact",
        links: [
          { label: "What We've Done", href: "/impact/done" },
          { label: "What We're Doing", href: "/impact/doing" },
          { label: "Projects", href: "/projects" },
        ],
      },
    ],
  },
  { label: "Shop", href: "https://shop.rewiring.nz" },
];

interface RwNavProps {
  logoUrl?: string;
  logoAlt?: string;
  donateHref?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  panelBg?: string;
}

export default function RwNav(props: RwNavProps) {
  const {
    logoUrl = "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg",
    logoAlt = "Rewiring Aotearoa",
    donateHref = "/donate",
    bgColor = "#fdf7ea",
    accentColor = "#234e4c",
    textColor = "#1a3c3c",
    panelBg = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const handleEnter = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(label);
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
    <div className={`rwnav-root-${uid}`}>
      <header className={`rwnav-${uid}`}>
        <div className={`rwnav-inner-${uid}`}>
          <a href="/" className={`rwnav-logo-${uid}`} aria-label="Rewiring Aotearoa home">
            <img src={logoUrl} alt={logoAlt} />
          </a>

          <nav className={`rwnav-list-${uid}`} aria-label="Primary">
            {NAV.map((item) => {
              const hasMenu = !!item.columns;
              const isOpen = open === item.label;
              return (
                <div
                  key={item.label}
                  className={`rwnav-item-${uid}`}
                  onMouseEnter={() => hasMenu && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      className={`rwnav-link-${uid} ${isOpen ? `rwnav-link-active-${uid}` : ""}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpen(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <a href={item.href} className={`rwnav-link-${uid}`}>
                      {item.label}
                    </a>
                  )}

                  {hasMenu && isOpen && (
                    <div
                      className={`rwnav-panel-${uid}`}
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                    >
                      <div className={`rwnav-panel-inner-${uid}`}>
                        {item.columns!.map((col) => (
                          <div key={col.title} className={`rwnav-col-${uid}`}>
                            <h4 className={`rwnav-col-title-${uid}`}>{col.title}</h4>
                            <ul className={`rwnav-col-list-${uid}`}>
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <a href={l.href} className={`rwnav-col-link-${uid}`}>
                                    {l.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <svg className={`rwnav-squiggle-${uid}`} viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0 6 Q 30 0 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6 T 420 6 T 480 6 T 540 6 T 600 6 T 660 6 T 720 6 T 780 6 T 840 6 T 900 6 T 960 6 T 1020 6 T 1080 6 T 1140 6 T 1200 6" stroke={accentColor} strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className={`rwnav-actions-${uid}`}>
            <button
              type="button"
              className={`rwnav-icon-${uid}`}
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <a href={donateHref} className={`rwnav-donate-${uid}`}>Donate</a>
            <button
              type="button"
              className={`rwnav-burger-${uid}`}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className={`rwnav-search-${uid}`}>
            <form className={`rwnav-search-form-${uid}`} action="/search">
              <input type="search" name="q" placeholder="Search rewiring.nz…" autoFocus className={`rwnav-search-input-${uid}`} />
              <button type="submit" className={`rwnav-search-submit-${uid}`}>Search</button>
            </form>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className={`rwnav-mobile-${uid}`}>
          {NAV.map((item) => (
            <details key={item.label} className={`rwnav-m-item-${uid}`}>
              <summary className={`rwnav-m-summary-${uid}`}>
                {item.columns ? item.label : <a href={item.href}>{item.label}</a>}
              </summary>
              {item.columns && (
                <div className={`rwnav-m-cols-${uid}`}>
                  {item.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className={`rwnav-m-col-title-${uid}`}>{col.title}</h4>
                      <ul className={`rwnav-m-col-list-${uid}`}>
                        {col.links.map((l) => (
                          <li key={l.label}><a href={l.href}>{l.label}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </details>
          ))}
          <a href={donateHref} className={`rwnav-m-donate-${uid}`}>Donate</a>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .rwnav-root-${uid} { font-family: 'Rubik', sans-serif; color: ${textColor}; }

        .rwnav-${uid} {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${bgColor};
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }

        .rwnav-inner-${uid} {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .rwnav-logo-${uid} img { height: 36px; display: block; }

        .rwnav-list-${uid} {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        .rwnav-item-${uid} { position: relative; }

        .rwnav-link-${uid} {
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
          transition: background 0.2s ease, color 0.2s ease;
        }
        .rwnav-link-${uid}:hover,
        .rwnav-link-active-${uid} {
          background: rgba(35,78,76,0.08);
          color: ${accentColor};
        }

        .rwnav-panel-${uid} {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 720px;
          background: ${panelBg};
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(26,60,60,0.18), 0 2px 6px rgba(26,60,60,0.08);
          padding: 28px 32px 32px;
          animation: rwnav-fade-${uid} 0.18s ease-out;
          overflow: hidden;
        }
        @keyframes rwnav-fade-${uid} {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }

        .rwnav-panel-inner-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 32px;
        }

        .rwnav-col-title-${uid} {
          margin: 0 0 12px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${accentColor};
          opacity: 0.7;
        }

        .rwnav-col-list-${uid} {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .rwnav-col-link-${uid} {
          display: block;
          padding: 6px 0;
          font-size: 0.95rem;
          font-weight: 500;
          color: ${textColor};
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .rwnav-col-link-${uid}:hover {
          color: ${accentColor};
          transform: translateX(3px);
        }

        .rwnav-squiggle-${uid} {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6px;
          width: 100%;
          height: 8px;
          opacity: 0.35;
        }

        .rwnav-actions-${uid} {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rwnav-icon-${uid} {
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
        .rwnav-icon-${uid}:hover { background: rgba(35,78,76,0.08); }

        .rwnav-donate-${uid} {
          display: inline-block;
          padding: 10px 22px;
          background: #f5b731;
          color: #1a3c3c;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .rwnav-donate-${uid}:hover { background: #ffc94d; transform: translateY(-1px); }

        .rwnav-burger-${uid} {
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
        .rwnav-burger-${uid} span {
          width: 22px; height: 2px; background: ${textColor}; border-radius: 2px;
        }

        .rwnav-search-${uid} {
          border-top: 1px solid rgba(26,60,60,0.08);
          background: ${panelBg};
          padding: 16px 24px;
        }
        .rwnav-search-form-${uid} {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
        }
        .rwnav-search-input-${uid} {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid rgba(26,60,60,0.2);
          border-radius: 999px;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
        }
        .rwnav-search-input-${uid}:focus { border-color: ${accentColor}; }
        .rwnav-search-submit-${uid} {
          padding: 12px 22px;
          background: ${accentColor};
          color: #fff;
          border: none;
          border-radius: 999px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .rwnav-mobile-${uid} {
          background: ${bgColor};
          padding: 16px 24px 24px;
          border-bottom: 1px solid rgba(26,60,60,0.08);
        }
        .rwnav-m-item-${uid} {
          border-bottom: 1px solid rgba(26,60,60,0.08);
          padding: 8px 0;
        }
        .rwnav-m-summary-${uid} {
          padding: 10px 0;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          list-style: none;
        }
        .rwnav-m-summary-${uid} a { color: inherit; text-decoration: none; }
        .rwnav-m-cols-${uid} {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 8px 0 16px;
        }
        .rwnav-m-col-title-${uid} {
          margin: 0 0 6px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: ${accentColor};
        }
        .rwnav-m-col-list-${uid} {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .rwnav-m-col-list-${uid} a {
          display: block;
          padding: 6px 0;
          color: ${textColor};
          text-decoration: none;
        }
        .rwnav-m-donate-${uid} {
          display: block;
          text-align: center;
          margin-top: 16px;
          padding: 14px;
          background: #f5b731;
          color: #1a3c3c;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          .rwnav-list-${uid} { display: none; }
          .rwnav-burger-${uid} { display: inline-flex; }
          .rwnav-inner-${uid} { justify-content: space-between; }
        }
        @media (min-width: 1025px) {
          .rwnav-mobile-${uid} { display: none; }
        }
      `}</style>
    </div>
  );
}
