"use client";

// Shared presentation for the "simple" (link-out) variants of the region-report
// sections — Local stories, Electric community and the report footer. While the
// CMS-bound versions are still being built, these render a single centred card:
// heading, a short paragraph, and one button through to the page where the real
// detail lives.
//
// Not registered with Webflow itself (the webflow.json glob only picks up
// *.webflow.tsx) — the three thin wrappers around it are.
import React, { useId } from "react";

export type SimpleIcon = "arrow" | "book" | "people" | "download" | "none";

export interface SimpleSectionProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  /** Resolved href. Blank renders the card with no button rather than a dead link. */
  href?: string;
  icon?: SimpleIcon;
  /** Optional second button (the region footer's per-location PDF). Blank label or href = no button. */
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryIcon?: SimpleIcon;
  /**
   * Optional banner photo across the top of the card, with the heading laid
   * over it on a dark-green fade - the same treatment as the PDF's community
   * card. Blank = the plain centred card.
   */
  imageUrl?: string;
  imageAlt?: string;
  /** Anchor id so the report's jump cards still land here (#stories, #community). */
  anchorId?: string;
  /** Section background; "transparent" sits on whatever the page already has. */
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

const isExternal = (href: string) => /^(https?:\/\/|www\.)/i.test(href);

function Icon({ kind }: { kind: SimpleIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (kind === "none") return null;
  if (kind === "book")
    return (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
  if (kind === "download")
    return (
      <svg {...common}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );
  if (kind === "people")
    return (
      <svg {...common}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  return (
    <svg {...common}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function SimpleSection({
  heading = "",
  body = "",
  buttonLabel = "",
  href = "",
  icon = "arrow",
  secondaryLabel = "",
  secondaryHref = "",
  secondaryIcon = "download",
  imageUrl = "",
  imageAlt = "",
  anchorId = "",
  bgColor = "transparent",
  cardColor = "#ffffff",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: SimpleSectionProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const c = (n: string) => `rw-ss-${n}-${uid}`;
  const link = (href || "").trim();
  const external = isExternal(link);
  const link2 = (secondaryHref || "").trim();
  const external2 = isExternal(link2);
  const img = (imageUrl || "").trim();

  return (
    <div className={c("root")} {...(anchorId ? { id: anchorId } : {})}>
      <style>{`
        .${c("root")}, .${c("root")} * { box-sizing: border-box; }
        .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: ${bgColor}; padding: 96px 24px; }
        .${c("card")} { max-width: 720px; margin: 0 auto; text-align: center; background: ${cardColor}; border: 2px dashed ${goldColor}; border-radius: 32px 8px 28px 8px / 8px 28px 8px 32px; padding: 52px 40px; }
        .${c("title")} { font-size: clamp(26px, 3vw, 36px); font-weight: 700; color: ${accentColor}; margin: 0 0 12px; line-height: 1.15; letter-spacing: -0.01em; }
        .${c("body")} { font-size: 16px; line-height: 1.55; color: #4a6664; margin: 0 auto; max-width: 540px; }
        .${c("body")}:last-child { margin-bottom: 0; }
        .${c("btns")} { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 28px; }
        .${c("btn")} { display: inline-flex; align-items: center; gap: 10px; background: ${goldColor}; color: ${inkColor}; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 26px; border-radius: 100px; border: none; cursor: pointer; transition: background-color .18s ease, transform .18s ease; font-family: inherit; }
        .${c("btn")}:hover { background: #ffc94d; transform: translateY(-2px); }
        .${c("btn")} svg { width: 18px; height: 18px; flex: none; }
        .${c("card")}.${c("hasimg")} { padding: 0; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; }
        .${c("banner")} { position: relative; height: 200px; flex: none; background: ${accentColor}; }
        .${c("banner")} img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
        .${c("banner")}::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, ${accentColor} 0%, rgba(35, 78, 76, 0.55) 45%, rgba(35, 78, 76, 0) 80%); }
        .${c("banner")} .${c("title")} { position: absolute; left: 32px; right: 32px; bottom: 22px; z-index: 1; margin: 0; color: #fff; text-align: left; }
        .${c("inner")} { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 32px 40px 44px; }
        @media (max-width: 780px) { .${c("root")} { padding: 56px 20px; } .${c("card")} { padding: 36px 24px; } .${c("banner")} { height: 160px; } .${c("banner")} .${c("title")} { left: 24px; right: 24px; bottom: 18px; } .${c("inner")} { padding: 24px 24px 32px; } }
      `}</style>

      <div className={img ? `${c("card")} ${c("hasimg")}` : c("card")}>
        {img ? (
          <div className={c("banner")}>
            <img src={img} alt={imageAlt} loading="lazy" />
            {heading ? <h2 className={c("title")}>{heading}</h2> : null}
          </div>
        ) : heading ? (
          <h2 className={c("title")}>{heading}</h2>
        ) : null}
        <Body wrap={img ? c("inner") : ""}>
        {body ? <p className={c("body")}>{body}</p> : null}
        {(link && buttonLabel) || (link2 && secondaryLabel) ? (
          <div className={c("btns")}>
            {link && buttonLabel ? (
              <a className={c("btn")} href={link} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon kind={icon} />
                {buttonLabel}
              </a>
            ) : null}
            {link2 && secondaryLabel ? (
              <a className={c("btn")} href={link2} {...(external2 ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon kind={secondaryIcon} />
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        ) : null}
        </Body>
      </div>
    </div>
  );
}

/** Wraps the body + buttons in a padded column only when there's a banner, so the plain card's markup is unchanged. */
function Body({ wrap, children }: { wrap: string; children: React.ReactNode }) {
  return wrap ? <div className={wrap}>{children}</div> : <>{children}</>;
}
