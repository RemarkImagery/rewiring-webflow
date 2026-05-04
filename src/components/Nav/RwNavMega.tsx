"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

type Menus = 1 | 2 | 3 | 4 | 5;
type Cols = 1 | 2 | 3;
type Links = 1 | 2 | 3 | 4 | 5 | 6;

type MenuProps = {
  [K in `menu${Menus}Label`]?: string;
} & {
  [K in `menu${Menus}Thumb`]?: ImageValue;
} & {
  [K in `m${Menus}c${Cols}Title`]?: string;
} & {
  [K in `m${Menus}c${Cols}Subtitle`]?: string;
} & {
  [K in `m${Menus}c${Cols}l${Links}Label`]?: string;
} & {
  [K in `m${Menus}c${Cols}l${Links}Desc`]?: string;
} & {
  [K in `m${Menus}c${Cols}l${Links}Link`]?: LinkValue;
} & {
  [K in `m${Menus}c${Cols}l${Links}Featured`]?: boolean;
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
  donateLabel?: string;
  donateHref?: LinkValue;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedColor?: string;
  panelBg?: string;
  featuredBg?: string;
  goldColor?: string;
}

type LinkItem = {
  label: string;
  desc: string;
  link?: LinkValue;
  featured: boolean;
};
type ColItem = { title: string; subtitle: string; links: LinkItem[] };
type MenuItem = { label: string; thumb?: ImageValue; columns: ColItem[] };

const MENUS = [1, 2, 3, 4, 5] as const;
const COLS = [1, 2, 3] as const;
const LINKS = [1, 2, 3, 4, 5, 6] as const;

export default function RwNavMega(props: RwNavMegaProps) {
  const {
    logo,
    logoAlt = "Rewiring Aotearoa",
    logoHref,
    donateLabel = "Donate",
    donateHref,
    bgColor = "#fdf7ea",
    accentColor = "#234e4c",
    textColor = "#1a3c3c",
    mutedColor = "#5c7a78",
    panelBg = "#ffffff",
    featuredBg = "#f7efd4",
    goldColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDrill, setMobileDrill] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const get = (k: string) => (props as Record<string, unknown>)[k];

  const logoSrc =
    logo?.src ||
    "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg";
  const logoAltResolved = logo?.alt || logoAlt;

  const isExternal = (href?: string) =>
    !!href && /^(https?:\/\/|www\.)/i.test(href);

  const menus: MenuItem[] = MENUS.map((m) => {
    const label = (get(`menu${m}Label`) as string) || "";
    const thumb = get(`menu${m}Thumb`) as ImageValue | undefined;
    const columns = COLS.map((c) => {
      const title = (get(`m${m}c${c}Title`) as string) || "";
      const subtitle = (get(`m${m}c${c}Subtitle`) as string) || "";
      const links = LINKS.map((l) => {
        const lbl = (get(`m${m}c${c}l${l}Label`) as string) || "";
        const desc = (get(`m${m}c${c}l${l}Desc`) as string) || "";
        const lnk = get(`m${m}c${c}l${l}Link`) as LinkValue | undefined;
        const featured = !!get(`m${m}c${c}l${l}Featured`);
        return lbl ? { label: lbl, desc, link: lnk, featured } : null;
      }).filter(Boolean) as LinkItem[];
      return title || subtitle || links.length ? { title, subtitle, links } : null;
    }).filter(Boolean) as ColItem[];
    return { label, thumb, columns };
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
        if (mobileDrill !== null) setMobileDrill(null);
        else setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileDrill]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  // Defensive: always release body lock on unmount, no matter what state we're in.
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  // bfcache safety: when iOS Safari restores this page from back-forward cache,
  // ensure the menu is closed and the body lock is released. Only listens for
  // pageshow with `persisted` so we don't interfere with normal navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setMobileOpen(false);
      setMobileDrill(null);
      setSearchOpen(false);
      setOpen(null);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const closeMobile = () => { setMobileOpen(false); setMobileDrill(null); };

  // Defer state change to the next tick so the browser can fully process the
  // click's default action (navigation) before React unmounts the link element.
  // Without this, iOS Safari occasionally cancels navigation when the menu
  // unmounts mid-click.
  const handleLinkClick = () => {
    if (typeof window !== "undefined") window.setTimeout(closeMobile, 0);
    else closeMobile();
  };

  const ExternalIcon = () => (
    <svg className={`rwnm-ext-${uid}`} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 8 L8 2 M8 2 H3.5 M8 2 V6.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const renderLink = (l: LinkItem, key: React.Key) => {
    const ext = isExternal(l.link?.href);
    const className = `rwnm-col-link-${uid} ${l.featured ? `rwnm-col-link-featured-${uid}` : ""}`;
    return (
      <a
        key={key}
        href={l.link?.href || "#"}
        target={l.link?.target || (ext ? "_blank" : undefined)}
        rel={ext ? "noopener noreferrer" : undefined}
        className={className}
      >
        <span className={`rwnm-link-label-${uid}`}>
          {l.label}
          {ext && <ExternalIcon />}
        </span>
        {l.desc && <span className={`rwnm-link-desc-${uid}`}>{l.desc}</span>}
      </a>
    );
  };

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
              if (!m.label || !hasCols) return null;
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
                      style={{ gridTemplateColumns: `repeat(${m.columns.length}, minmax(220px, 1fr))` }}
                    >
                      <div
                        className={`rwnm-panel-inner-${uid}`}
                        style={{ gridTemplateColumns: `repeat(${m.columns.length}, minmax(220px, 1fr))` }}
                      >
                        {m.columns.map((col, ci) => (
                          <div key={ci} className={`rwnm-col-${uid}`}>
                            {col.title && <h4 className={`rwnm-col-title-${uid}`}>{col.title}</h4>}
                            {col.subtitle && <p className={`rwnm-col-sub-${uid}`}>{col.subtitle}</p>}
                            <div className={`rwnm-col-list-${uid}`}>
                              {col.links.map((l, li) => renderLink(l, li))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            <form className={`rwnm-search-form-${uid}`} action="https://www.rewiring.nz/search" method="get">
              <input type="search" name="query" placeholder="Search rewiring.nz…" autoFocus className={`rwnm-search-input-${uid}`} />
              <button type="submit" className={`rwnm-search-submit-${uid}`}>Search</button>
            </form>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className={`rwnm-mobile-${uid}`} role="dialog" aria-modal="true">
          <div className={`rwnm-m-topbar-${uid}`}>
            {mobileDrill === null ? (
              <>
                <a
                  href={logoHref?.href || "/"}
                  target={logoHref?.target}
                  className={`rwnm-m-logo-${uid}`}
                  onClick={handleLinkClick}
                >
                  <img src={logoSrc} alt={logoAltResolved} />
                </a>
                <button
                  type="button"
                  className={`rwnm-m-close-${uid}`}
                  aria-label="Close menu"
                  onClick={closeMobile}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`rwnm-m-back-${uid}`}
                  aria-label="Back"
                  onClick={() => setMobileDrill(null)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className={`rwnm-m-title-${uid}`}>{menus[mobileDrill]?.label}</span>
                <button
                  type="button"
                  className={`rwnm-m-close-${uid}`}
                  aria-label="Close menu"
                  onClick={closeMobile}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className={`rwnm-m-scroll-${uid}`}>
            {mobileDrill === null ? (
              <div className={`rwnm-m-cards-${uid}`}>
                {menus.map((m, i) => {
                  if (!m.label) return null;
                  const hasCols = m.columns.length > 0;
                  if (!hasCols) return null;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`rwnm-m-card-${uid}`}
                      onClick={() => setMobileDrill(i)}
                    >
                      {m.thumb?.src && (
                        <span className={`rwnm-m-card-thumb-${uid}`}>
                          <img src={m.thumb.src} alt={m.thumb.alt || m.label} />
                        </span>
                      )}
                      <span className={`rwnm-m-card-label-${uid}`}>{m.label}</span>
                      <svg className={`rwnm-m-card-chev-${uid}`} width="10" height="14" viewBox="0 0 10 14" aria-hidden="true">
                        <path d="M2 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  );
                })}
                {donateLabel && (
                  <a
                    href={donateHref?.href || "#"}
                    target={donateHref?.target}
                    className={`rwnm-m-donate-${uid}`}
                    onClick={handleLinkClick}
                  >
                    {donateLabel}
                  </a>
                )}
              </div>
            ) : (
              <div className={`rwnm-m-drill-${uid}`}>
                {menus[mobileDrill]?.columns.map((col, ci) => (
                  <div key={ci} className={`rwnm-m-section-${uid}`}>
                    {col.title && <h4 className={`rwnm-m-col-title-${uid}`}>{col.title}</h4>}
                    {col.subtitle && <p className={`rwnm-m-col-sub-${uid}`}>{col.subtitle}</p>}
                    <div className={`rwnm-m-col-list-${uid}`}>
                      {col.links.map((l, li) => {
                        const ext = isExternal(l.link?.href);
                        return (
                          <a
                            key={li}
                            href={l.link?.href || "#"}
                            target={l.link?.target || (ext ? "_blank" : undefined)}
                            rel={ext ? "noopener noreferrer" : undefined}
                            className={`rwnm-m-link-item-${uid} ${l.featured ? `rwnm-m-link-featured-${uid}` : ""}`}
                            onClick={handleLinkClick}
                          >
                            <span className={`rwnm-m-link-label-${uid}`}>
                              {l.label}
                              {ext && <ExternalIcon />}
                            </span>
                            {l.desc && <span className={`rwnm-m-link-desc-${uid}`}>{l.desc}</span>}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
          max-width: 1320px; margin: 0 auto;
          padding: 14px 24px;
          display: flex; align-items: center; gap: 28px;
        }
        .rwnm-logo-${uid} img { height: 36px; display: block; }

        .rwnm-list-${uid} {
          display: flex; align-items: center; gap: 6px;
          flex: 1; justify-content: center;
        }
        .rwnm-item-${uid} { position: relative; }
        .rwnm-link-${uid} {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 18px;
          font-size: 0.98rem; font-weight: 500;
          color: ${textColor};
          background: rgba(35,78,76,0.06);
          border: none; border-radius: 999px;
          cursor: pointer; text-decoration: none;
          font-family: inherit;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .rwnm-link-${uid}:hover {
          background: rgba(35,78,76,0.14);
        }
        .rwnm-link-active-${uid} {
          background: ${accentColor};
          color: ${goldColor};
        }

        .rwnm-panel-${uid} {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: ${panelBg};
          border-radius: 20px;
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(0, 0, 0, 0.06),
            0 12px 24px rgba(0, 0, 0, 0.04);
          padding: 28px 30px 30px;
          animation: rwnm-fade-${uid} 0.18s ease-out;
          overflow: hidden;
          display: block;
        }
        @keyframes rwnm-fade-${uid} {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .rwnm-panel-inner-${uid} {
          display: grid;
          gap: 28px;
        }
        .rwnm-col-title-${uid} {
          margin: 0 0 4px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${mutedColor};
        }
        .rwnm-col-sub-${uid} {
          margin: 0 0 14px;
          font-size: 0.82rem; font-weight: 400;
          color: ${mutedColor};
          line-height: 1.4;
        }
        .rwnm-col-list-${uid} {
          display: flex; flex-direction: column; gap: 4px;
        }
        .rwnm-col-link-${uid} {
          display: block;
          padding: 10px 12px;
          margin: 0 -12px;
          border-radius: 12px;
          color: ${textColor}; text-decoration: none;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .rwnm-col-link-${uid}:hover {
          background: rgba(35,78,76,0.06);
        }
        .rwnm-col-link-featured-${uid} {
          background: ${featuredBg};
        }
        .rwnm-col-link-featured-${uid}:hover {
          background: ${featuredBg};
          filter: brightness(0.97);
        }
        .rwnm-link-label-${uid} {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 1rem; font-weight: 600;
          color: ${textColor};
          line-height: 1.2;
        }
        .rwnm-link-desc-${uid} {
          display: block;
          margin-top: 4px;
          font-size: 0.84rem; font-weight: 400;
          color: ${mutedColor};
          line-height: 1.35;
        }
        .rwnm-ext-${uid} {
          color: ${accentColor};
          flex-shrink: 0;
        }

        .rwnm-actions-${uid} { display: flex; align-items: center; gap: 10px; }
        .rwnm-icon-${uid} {
          width: 40px; height: 40px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 999px; background: transparent; border: none;
          color: ${textColor}; cursor: pointer;
          transition: background 0.2s ease;
        }
        .rwnm-icon-${uid}:hover { background: rgba(35,78,76,0.08); }
        .rwnm-donate-${uid} {
          display: inline-block; padding: 11px 24px;
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
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
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
          position: fixed; inset: 0;
          z-index: 9999;
          background: ${bgColor};
          display: flex; flex-direction: column;
          /* iOS Safari: dynamic viewport height handles toolbar show/hide */
          height: 100vh;
          height: 100dvh;
          animation: rwnm-slide-up-${uid} 0.22s ease-out;
        }
        @keyframes rwnm-slide-up-${uid} {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rwnm-m-topbar-${uid} {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          padding-top: max(14px, env(safe-area-inset-top));
          background: ${bgColor};
          border-bottom: 1px solid rgba(26,60,60,0.08);
          flex-shrink: 0;
        }
        .rwnm-m-logo-${uid} { display: inline-flex; }
        .rwnm-m-logo-${uid} img { height: 32px; display: block; }
        .rwnm-m-title-${uid} {
          flex: 1; text-align: center;
          font-size: 1rem; font-weight: 600;
          color: ${textColor};
        }
        .rwnm-m-back-${uid}, .rwnm-m-close-${uid} {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(26,60,60,0.08);
          border: none; border-radius: 999px;
          color: ${textColor}; cursor: pointer;
          flex-shrink: 0;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .rwnm-m-back-${uid}:hover, .rwnm-m-close-${uid}:hover,
        .rwnm-m-back-${uid}:active, .rwnm-m-close-${uid}:active {
          background: rgba(26,60,60,0.14);
        }
        .rwnm-m-scroll-${uid} {
          flex: 1 1 auto;
          /* CRITICAL: without min-height:0, flex children with overflow:auto
             expand to fit content instead of scrolling on iOS Safari */
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .rwnm-m-cards-${uid} {
          padding: 16px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom));
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .rwnm-m-card-${uid} {
          display: flex; align-items: center; gap: 14px;
          width: 100%;
          padding: 12px 16px;
          background: ${panelBg};
          border: 1px solid rgba(26,60,60,0.08);
          border-radius: 14px;
          box-shadow: 0 1px 2px rgba(26,60,60,0.04);
          cursor: pointer;
          text-align: left;
          color: ${textColor};
          font-family: inherit;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(26,60,60,0.06);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .rwnm-m-card-${uid}:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26,60,60,0.08);
        }
        .rwnm-m-card-${uid}:active {
          background: rgba(35,78,76,0.04);
        }
        .rwnm-m-card-thumb-${uid} {
          width: 60px; height: 60px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background: ${featuredBg};
        }
        .rwnm-m-card-thumb-${uid} img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .rwnm-m-card-label-${uid} {
          flex: 1;
          font-size: 1.05rem; font-weight: 600;
        }
        .rwnm-m-card-chev-${uid} {
          color: ${mutedColor};
          flex-shrink: 0;
        }

        .rwnm-m-drill-${uid} {
          padding: 8px 16px 24px;
          padding-bottom: calc(24px + env(safe-area-inset-bottom));
          animation: rwnm-drill-${uid} 0.22s ease-out;
        }
        @keyframes rwnm-drill-${uid} {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .rwnm-m-section-${uid} {
          padding: 16px 0;
          border-bottom: 1px solid rgba(26,60,60,0.06);
        }
        .rwnm-m-section-${uid}:last-child { border-bottom: none; }
        .rwnm-m-col-title-${uid} {
          margin: 0 0 4px;
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.14em; color: ${mutedColor}; font-weight: 700;
        }
        .rwnm-m-col-sub-${uid} {
          margin: 0 0 10px; font-size: 0.82rem;
          color: ${mutedColor}; line-height: 1.4;
        }
        .rwnm-m-col-list-${uid} {
          display: flex; flex-direction: column; gap: 2px;
        }
        .rwnm-m-link-item-${uid} {
          display: block;
          padding: 12px;
          margin: 0 -12px;
          border-radius: 12px;
          color: ${textColor}; text-decoration: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(35,78,76,0.08);
          transition: background 0.15s ease;
        }
        .rwnm-m-link-item-${uid}:active {
          background: rgba(35,78,76,0.08);
        }
        .rwnm-m-link-featured-${uid} { background: ${featuredBg}; }
        .rwnm-m-link-featured-${uid}:active { background: ${featuredBg}; filter: brightness(0.95); }
        .rwnm-m-link-label-${uid} {
          display: inline-flex; align-items: center; gap: 6px;
          font-weight: 600; font-size: 1rem;
        }
        .rwnm-m-link-desc-${uid} {
          display: block; margin-top: 3px;
          font-size: 0.82rem; color: ${mutedColor}; line-height: 1.4;
        }
        .rwnm-m-donate-${uid} {
          display: block; text-align: center; margin-top: 8px;
          padding: 14px; background: ${goldColor}; color: #1a3c3c;
          font-weight: 600; border-radius: 999px; text-decoration: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .rwnm-m-donate-${uid}:active { background: #ffc94d; }

        @media (max-width: 1100px) {
          .rwnm-list-${uid} { display: none; }
          .rwnm-burger-${uid} { display: inline-flex; }
          .rwnm-donate-${uid} { display: none; }
          .rwnm-inner-${uid} { justify-content: space-between; }
        }
        @media (min-width: 1101px) {
          .rwnm-mobile-${uid} { display: none; }
        }
        @media (max-width: 900px) {
          .rwnm-panel-inner-${uid} {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
