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

export type SimpleIcon = "arrow" | "book" | "people" | "none";

export interface SimpleSectionProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  /** Resolved href. Blank renders the card with no button rather than a dead link. */
  href?: string;
  icon?: SimpleIcon;
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

  return (
    <div className={c("root")} {...(anchorId ? { id: anchorId } : {})}>
      <style>{`
        .${c("root")}, .${c("root")} * { box-sizing: border-box; }
        .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: ${bgColor}; padding: 96px 24px; }
        .${c("card")} { max-width: 720px; margin: 0 auto; text-align: center; background: ${cardColor}; border: 2px dashed ${goldColor}; border-radius: 32px 8px 28px 8px / 8px 28px 8px 32px; padding: 52px 40px; }
        .${c("title")} { font-size: clamp(26px, 3vw, 36px); font-weight: 700; color: ${accentColor}; margin: 0 0 12px; line-height: 1.15; letter-spacing: -0.01em; }
        .${c("body")} { font-size: 16px; line-height: 1.55; color: #4a6664; margin: 0 auto; max-width: 540px; }
        .${c("body")}:last-child { margin-bottom: 0; }
        .${c("btn")} { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; background: ${goldColor}; color: ${inkColor}; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 26px; border-radius: 100px; border: none; cursor: pointer; transition: background-color .18s ease, transform .18s ease; font-family: inherit; }
        .${c("btn")}:hover { background: #ffc94d; transform: translateY(-2px); }
        .${c("btn")} svg { width: 18px; height: 18px; flex: none; }
        @media (max-width: 780px) { .${c("root")} { padding: 56px 20px; } .${c("card")} { padding: 36px 24px; } }
      `}</style>

      <div className={c("card")}>
        {heading ? <h2 className={c("title")}>{heading}</h2> : null}
        {body ? <p className={c("body")}>{body}</p> : null}
        {link && buttonLabel ? (
          <a className={c("btn")} href={link} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <Icon kind={icon} />
            {buttonLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
