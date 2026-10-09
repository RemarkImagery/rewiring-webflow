"use client";

// Shared homepage campaign card used by PfwCtaCard and EsbCtaCard.
// A plain module (no .webflow. in the name), so it registers nothing itself.

import React, { useId } from "react";

export interface CampaignCardProps {
  heading?: string;
  headingAccent?: string;
  subheading?: string;
  text?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryText?: string;
  secondaryUrl?: string;
  image?: any;
  imageAlt?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

interface Preset {
  defaultImage: string;
  // "swipe" = gold highlighter block behind the accent words (Powered from Within)
  // "text"  = accent words in the accent colour (EV Salary Boost)
  accentStyle: "swipe" | "text";
  // where the art sits inside its box when it is cropped
  imagePosition: string;
  imageFit: "cover" | "contain";
  // copy + colour defaults, so the card renders the same outside Webflow
  defaults: CampaignCardProps;
}

export function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

const isExternal = (href: string) =>
  /^(https?:\/\/|www\.)/i.test(href) && !/^(https?:\/\/)?(www\.|pages\.)?rewiring\.nz/i.test(href);

// Webflow hands back "#" for an emptied link field
const cleanHref = (href?: string) => (href && href.trim() !== "#" ? href.trim() : "");

export default function CampaignCard({ preset, ...given }: CampaignCardProps & { preset: Preset }) {
  // unset Webflow props arrive as undefined; don't let them blank a default
  const props: CampaignCardProps = { ...preset.defaults };
  for (const [k, v] of Object.entries(given)) if (v !== undefined) (props as any)[k] = v;
  const {
    heading = "",
    headingAccent = "",
    subheading = "",
    text = "",
    ctaText = "",
    secondaryText = "",
    image,
    imageAlt = "",
    bgColor = "#1a3c3c",
    textColor = "#ffffff",
    accentColor = "#f5b731",
    buttonColor = "#f5b731",
    buttonTextColor = "#1a3c3c",
  } = props;
  const ctaUrl = cleanHref(props.ctaUrl);
  const secondaryUrl = cleanHref(props.secondaryUrl);

  const uid = useId().replace(/:/g, "");
  const imgSrc = resolveImage(image) || preset.defaultImage;
  const linkAttrs = (href: string) =>
    isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <section className={`rwcc-wrap-${uid}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800&display=swap');
        .rwcc-wrap-${uid} {
          font-family: 'Rubik', sans-serif;
          padding: 24px;
          display: flex;
          justify-content: center;
        }
        .rwcc-card-${uid} {
          width: min(1100px, 100%);
          background: ${bgColor};
          color: ${textColor};
          border-radius: 22px 8px 22px 8px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: center;
        }
        .rwcc-body-${uid} {
          padding: clamp(32px, 5vw, 56px);
        }
        .rwcc-heading-${uid} {
          font-size: clamp(2.1rem, 4.6vw, 3.5rem);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.01em;
          color: ${textColor};
          margin: 0 0 14px;
        }
        .rwcc-accent-${uid} {
          ${
            preset.accentStyle === "swipe"
              ? `background: linear-gradient(${accentColor}, ${accentColor}) no-repeat 0 82% / 100% 0.42em;
                 box-decoration-break: clone; -webkit-box-decoration-break: clone;
                 padding: 0 0.06em;`
              : `color: ${accentColor};`
          }
        }
        .rwcc-sub-${uid} {
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 12px;
          max-width: 520px;
        }
        .rwcc-text-${uid} {
          font-size: clamp(0.98rem, 1.3vw, 1.06rem);
          line-height: 1.65;
          opacity: 0.88;
          max-width: 520px;
          margin: 0 0 26px;
        }
        .rwcc-row-${uid} {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 22px;
        }
        .rwcc-cta-${uid} {
          display: inline-block;
          font-size: 15px; font-weight: 700;
          padding: 14px 32px; text-decoration: none;
          background: ${buttonColor}; color: ${buttonTextColor};
          border: 3px solid ${buttonColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.25s, color 0.25s;
        }
        .rwcc-cta-${uid}:hover { background: transparent; color: ${textColor}; }
        .rwcc-sec-${uid} {
          font-size: 15px; font-weight: 600;
          color: ${textColor};
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
          text-decoration-color: ${accentColor};
        }
        .rwcc-sec-${uid}:hover { color: ${accentColor}; }
        .rwcc-imgwrap-${uid} {
          position: relative;
          align-self: stretch;
          min-height: 300px;
        }
        .rwcc-imgwrap-${uid} img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: ${preset.imageFit};
          object-position: ${preset.imagePosition};
          display: block;
        }
        @media (max-width: 820px) {
          .rwcc-wrap-${uid} { padding: 16px; }
          .rwcc-card-${uid} { grid-template-columns: 1fr; }
          .rwcc-imgwrap-${uid} { order: -1; min-height: 240px; margin: 16px 16px 0; }
        }
      `}</style>
      <div className={`rwcc-card-${uid}`}>
        <div className={`rwcc-body-${uid}`}>
          <h2 className={`rwcc-heading-${uid}`}>
            {heading}
            {heading && headingAccent ? (preset.accentStyle === "swipe" ? <br /> : " ") : ""}
            {headingAccent && <span className={`rwcc-accent-${uid}`}>{headingAccent}</span>}
          </h2>
          {subheading && <p className={`rwcc-sub-${uid}`}>{subheading}</p>}
          {text && <p className={`rwcc-text-${uid}`}>{text}</p>}
          {((ctaText && ctaUrl) || (secondaryText && secondaryUrl)) && (
            <div className={`rwcc-row-${uid}`}>
              {ctaText && ctaUrl && (
                <a href={ctaUrl} className={`rwcc-cta-${uid}`} {...linkAttrs(ctaUrl)}>
                  {ctaText} →
                </a>
              )}
              {secondaryText && secondaryUrl && (
                <a href={secondaryUrl} className={`rwcc-sec-${uid}`} {...linkAttrs(secondaryUrl)}>
                  {secondaryText}
                </a>
              )}
            </div>
          )}
        </div>
        {imgSrc && (
          <div className={`rwcc-imgwrap-${uid}`}>
            <img src={imgSrc} alt={imageAlt} loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
}
