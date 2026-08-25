"use client";

import React, { useId } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export interface RwCommunityCardProps {
  logo?: any;
  bgImage?: any;
  title?: string;
  subtitle?: string;
  location?: string;
  info?: string;
  meetups?: string;
  link1Url?: LinkValue;
  link1Label?: string;
  link2Url?: LinkValue;
  link2Label?: string;
  facebookUrl?: LinkValue;
  accentColor?: string;
  inkColor?: string;
  goldColor?: string;
}

const isExternal = (href: string) => /^(https?:\/\/|www\.)/i.test(href);

function extAttrs(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default function RwCommunityCard({
  logo,
  bgImage,
  title = "Community group",
  subtitle,
  location,
  info,
  meetups,
  link1Url,
  link1Label = "Learn more",
  link2Url,
  link2Label = "Join",
  facebookUrl,
  accentColor = "#234e4c",
  inkColor = "#1a3c3c",
  goldColor = "#f5b731",
}: RwCommunityCardProps) {
  const uid = useId().replace(/[:]/g, "");
  const c = (n: string) => `rwcc-${n}-${uid}`;
  const logoSrc = resolveImage(logo);
  const bgSrc = resolveImage(bgImage);
  const l1 = link1Url?.href || "";
  const l2 = link2Url?.href || "";
  const fb = facebookUrl?.href || "";

  return (
    <div className={c("root")}>
      <div className={c("media")}>
        {bgSrc ? <img className={c("bg")} src={bgSrc} alt="" /> : <div className={c("bg-ph")} />}
        {logoSrc ? <img className={c("logo")} src={logoSrc} alt={title} /> : null}
      </div>
      <div className={c("body")}>
        <h3 className={c("title")}>{title}</h3>
        {subtitle ? <p className={c("subtitle")}>{subtitle}</p> : null}
        {location ? (
          <p className={c("location")}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
        ) : null}
        {info ? <p className={c("info")}>{info}</p> : null}
        {meetups ? (
          <p className={c("meetups")}>
            <strong>Meet-ups:</strong> {meetups}
          </p>
        ) : null}
        {(l1 || l2 || fb) && (
          <div className={c("links")}>
            {l1 ? (
              <a className={`${c("btn")} ${c("btn-primary")}`} href={l1} {...extAttrs(l1)}>
                {link1Label}
              </a>
            ) : null}
            {l2 ? (
              <a className={c("btn")} href={l2} {...extAttrs(l2)}>
                {link2Label}
              </a>
            ) : null}
            {fb ? (
              <a className={c("icon")} href={fb} aria-label="Facebook page" {...extAttrs(fb)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
            ) : null}
          </div>
        )}
      </div>

      <style>{`
        .${c("root")}, .${c("root")} * { box-sizing: border-box; }
        .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; background: #fff; border: 3px solid ${inkColor}; border-radius: 28px 8px 24px 8px / 8px 24px 8px 28px; overflow: hidden; display: flex; flex-direction: column; height: 100%; }
        .${c("media")} { position: relative; height: 148px; background: linear-gradient(135deg, ${accentColor}, ${inkColor}); }
        .${c("bg")} { width: 100%; height: 100%; object-fit: cover; display: block; }
        .${c("bg-ph")} { width: 100%; height: 100%; background: linear-gradient(135deg, ${accentColor}, ${inkColor}); }
        .${c("logo")} { position: absolute; left: 18px; bottom: -26px; width: 64px; height: 64px; object-fit: contain; background: #fff; border-radius: 14px; border: 2px solid ${inkColor}; padding: 6px; }
        .${c("body")} { padding: 34px 22px 22px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .${c("title")} { font-size: 21px; font-weight: 700; line-height: 1.15; margin: 0; color: ${inkColor}; }
        .${c("subtitle")} { font-size: 15px; color: ${accentColor}; font-weight: 600; margin: 0; }
        .${c("location")} { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: #5c7a78; margin: 0; }
        .${c("info")} { font-size: 15px; line-height: 1.55; color: #4a6664; margin: 4px 0 0; }
        .${c("meetups")} { font-size: 14px; color: #4a6664; margin: 0; }
        .${c("meetups")} strong { color: ${inkColor}; }
        .${c("links")} { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: auto; padding-top: 14px; }
        .${c("btn")} { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 100px; border: 2px solid ${inkColor}; background: #fff; color: ${inkColor}; font-weight: 600; font-size: 14px; text-decoration: none; transition: transform .18s ease, background-color .18s ease; }
        .${c("btn")}:hover { transform: translateY(-2px); }
        .${c("btn-primary")} { background: ${goldColor}; border-color: ${goldColor}; }
        .${c("btn-primary")}:hover { background: #ffc94d; }
        .${c("icon")} { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; border: 2px solid ${inkColor}; color: ${inkColor}; text-decoration: none; transition: transform .18s ease, background-color .18s ease, color .18s ease; }
        .${c("icon")}:hover { transform: translateY(-2px); background: ${inkColor}; color: #fff; }
      `}</style>
    </div>
  );
}
