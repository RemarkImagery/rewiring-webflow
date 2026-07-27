"use client";

import React, { useId } from "react";

interface NzmeSupportCtaProps {
  heading?: string;
  subheading?: string;
  card1Title?: string;
  card1Text?: string;
  card2Title?: string;
  card2Text?: string;
  card3Title?: string;
  card3Text?: string;
  matchNote?: string;
  ctaText?: string;
  ctaUrl?: any;
  darkColor?: string;
}

function resolveLink(val: any, fallback: string): string {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.href) return val.href;
  return fallback;
}

export default function NzmeSupportCta(props: NzmeSupportCtaProps) {
  const {
    heading = "Help make the electric boat go faster",
    subheading = "Three ways to get behind Operation Laser Kiwi — every dollar pushes the thermometer up a tier.",
    card1Title = "Donate",
    card1Text = "Chip in whatever you can, or grab some merch — Laser Kiwi t-shirts, key rings, stickers and the Sexiest Electric Machines calendar.",
    card2Title = "Donate something of value",
    card2Text = "Got an experience worth auctioning? A guitar lesson, a boat party, a drag race in an electric truck, lunch at the cherry orchard — we'll auction it for the cause.",
    card3Title = "Business contra offers",
    card3Text = "In the sector? Donate an EV, a solar and battery install, an induction hob, a hot water heat pump, an EV charger or $10,000 of electricity.",
    matchNote = "We're working on a funder matching every dollar raised — doubling whatever you give.",
    ctaText = "Donate to the campaign",
    ctaUrl = "https://www.rewiring.nz/donate",
    darkColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const cards = [
    { title: card1Title, text: card1Text },
    { title: card2Title, text: card2Text },
    { title: card3Title, text: card3Text },
  ].filter((c) => c.title && c.text);

  const ctaHref = resolveLink(ctaUrl, "https://www.rewiring.nz/donate");
  const external = /^(https?:\/\/|www\.)/i.test(ctaHref);

  return (
    <section className={`nzsc-wrap-${uid}`} id="support">
      <style>{`
        .nzsc-wrap-${uid} {
          background: #FFFCF0;
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzsc-inner-${uid} { max-width: 1100px; margin: 0 auto; text-align: center; }
        .nzsc-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px;
        }
        .nzsc-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78;
          max-width: 620px; margin: 0 auto 48px; line-height: 1.6;
        }
        .nzsc-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
          text-align: left;
        }
        .nzsc-card-${uid} {
          background: #ffffff;
          border: 3px dashed ${darkColor};
          border-radius: 8px 22px 8px 22px;
          padding: 26px 24px;
          transition: transform 0.3s, border-style 0.3s;
        }
        .nzsc-card-${uid}:hover { transform: translateY(-4px); border-style: solid; }
        .nzsc-num-${uid} {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          font-weight: 900; font-size: 1.05rem;
          color: ${darkColor};
          background: #f5b731;
          border-radius: 50% 42% 55% 45%;
          margin-bottom: 14px;
        }
        .nzsc-card-title-${uid} {
          font-size: 1.15rem; font-weight: 700; color: ${darkColor};
          margin: 0 0 10px;
        }
        .nzsc-card-text-${uid} {
          font-size: 0.94rem; color: #5c7a78; line-height: 1.65; margin: 0;
        }
        .nzsc-match-${uid} {
          display: inline-block;
          font-size: 0.95rem; font-weight: 600;
          color: ${darkColor};
          background: #f7efd4;
          border: 2px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          padding: 12px 26px;
          margin-bottom: 36px;
          line-height: 1.5;
        }
        .nzsc-cta-${uid} {
          display: inline-block;
          font-size: 16px; font-weight: 700;
          padding: 17px 46px; text-decoration: none;
          background: ${darkColor}; color: #FFFCF0;
          border: 3px solid ${darkColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
        }
        .nzsc-cta-${uid}:hover { background: transparent; color: ${darkColor}; }
        @media (max-width: 640px) {
          .nzsc-wrap-${uid} { padding: 72px 24px; }
        }
      `}</style>

      <div className={`nzsc-inner-${uid}`}>
        <h2 className={`nzsc-heading-${uid}`}>{heading}</h2>
        <p className={`nzsc-sub-${uid}`}>{subheading}</p>
        <div className={`nzsc-grid-${uid}`}>
          {cards.map((c, i) => (
            <div key={i} className={`nzsc-card-${uid}`}>
              <span className={`nzsc-num-${uid}`}>{i + 1}</span>
              <h3 className={`nzsc-card-title-${uid}`}>{c.title}</h3>
              <p className={`nzsc-card-text-${uid}`}>{c.text}</p>
            </div>
          ))}
        </div>
        {matchNote && <div className={`nzsc-match-${uid}`}>{matchNote}</div>}
        <div>
          {ctaText && (
            <a
              href={ctaHref}
              className={`nzsc-cta-${uid}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
