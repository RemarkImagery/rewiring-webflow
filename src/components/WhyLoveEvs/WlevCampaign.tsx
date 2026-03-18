"use client";

import React, { useId } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevCampaignProps {
  heading?: string;
  subtitle?: string;
  body?: string;
  closingLine?: string;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonText?: string;
  bgColor?: string;
}

export default function WlevCampaign(props: WlevCampaignProps) {
  const {
    heading = "This Car Can \u2026",
    subtitle = "Tapping into the enthusiasm of EV owners to convince others to go electric.",
    body = "Whether it\u2019s to save money, reduce anxiety, lower your emissions or beat the bogans at the lights \u2014 there\u2019s an EV for you. It could be an old Nissan Leaf for a few grand that handles the daily duties for less, a new Polestar that can go the length of the North Island on one charge, a fleet of EVs for your workers, or an electric tractor fuelled by the sun.",
    closingLine = "Let\u2019s get more New Zealanders driving on electrons.",
    ctaHeading = "Tell Us What Yours Can Do",
    ctaBody = "We want to hear your EV stories. Send us photos, film videos and create your own little placards for social media.",
    ctaButtonText = "Share Your Story",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");

  const features = [
    { icon: "save", label: "Save money", desc: "Cheaper to run than petrol or diesel" },
    { icon: "charge", label: "Charge at home", desc: "Plug in overnight, wake up full" },
    { icon: "clean", label: "Cut emissions", desc: "60% fewer lifetime emissions in NZ" },
    { icon: "fun", label: "More fun to drive", desc: "Instant torque, smooth and quiet" },
  ];

  const featureIcons: Record<string, string> = {
    save: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#2d5c5a" stroke-width="2" fill="none"/><text x="16" y="21" text-anchor="middle" font-family="Rubik,sans-serif" font-size="14" font-weight="700" fill="#f5b731">$</text></svg>`,
    charge: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#2d5c5a" stroke-width="2" fill="none"/><path d="M18 8L12 18h6l-2 8 8-12h-7l3-6z" fill="#f5b731" stroke="#2d5c5a" stroke-width="1"/></svg>`,
    clean: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#2d5c5a" stroke-width="2" fill="none"/><path d="M16 8c-3 0-6 3-6 6 0 2.5 1.5 4 3.5 5.5 1 .7 1 1.5 1 2.5h3c0-1 0-1.8 1-2.5C20.5 18 22 16.5 22 14c0-3-3-6-6-6z" fill="#2d5c5a" opacity="0.2"/><path d="M16 8c-0.5 2.5-2.5 4-2.5 6.5s1.5 4 2.5 5c1-1 2.5-2.5 2.5-5S16.5 10.5 16 8z" fill="#2d5c5a" opacity="0.3"/></svg>`,
    fun: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#2d5c5a" stroke-width="2" fill="none"/><path d="M10 20c1.5-2 3.5-3 6-3s4.5 1 6 3" stroke="#f5b731" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="13" r="1.5" fill="#2d5c5a"/><circle cx="20" cy="13" r="1.5" fill="#2d5c5a"/></svg>`,
  };

  return (
    <div className={`wlev-cm-root-${uid}`}>
      <section className={`wlev-cm-section-${uid}`} style={{ background: bgColor }}>
        {/* Organic background shapes */}
        <svg className={`wlev-cm-bg-shape1-${uid}`} width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <path d="M150 20C220 20 280 80 280 150C280 220 220 280 150 280C80 280 20 220 20 150C20 80 80 20 150 20Z" fill="#2d5c5a" opacity="0.04"/>
        </svg>
        <svg className={`wlev-cm-bg-shape2-${uid}`} width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <path d="M100 10C140 10 180 40 190 80C200 120 180 160 140 180C100 200 50 180 20 140C-10 100 10 50 50 25C65 16 82 10 100 10Z" fill="#f5b731" opacity="0.06"/>
        </svg>

        <div className={`wlev-cm-inner-${uid}`}>
          {/* Header with scribble */}
          <div className={`wlev-cm-header-${uid}`}>
            <h2 className={`wlev-cm-heading-${uid}`}>{heading}</h2>
            <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-cm-squiggle-${uid}`} />
            <p className={`wlev-cm-subtitle-${uid}`}>{subtitle}</p>
          </div>

          {/* Feature pills */}
          <div className={`wlev-cm-features-${uid}`}>
            {features.map((f, i) => (
              <div key={i} className={`wlev-cm-feature-${uid}`}>
                <div className={`wlev-cm-feature-icon-${uid}`} dangerouslySetInnerHTML={{ __html: featureIcons[f.icon] }} />
                <div>
                  <strong className={`wlev-cm-feature-label-${uid}`}>{f.label}</strong>
                  <span className={`wlev-cm-feature-desc-${uid}`}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Body with organic border */}
          <div className={`wlev-cm-body-wrap-${uid}`}>
            {renderRichText(body, `wlev-cm-body-${uid}`)}
          </div>

          {/* Closing line */}
          <p className={`wlev-cm-closing-${uid}`}>{closingLine}</p>

          {/* Leaf divider */}
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true">
            <path d="M10 12C15 6 25 4 30 12C35 4 45 6 50 12" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M30 12L30 22" stroke="#2d5c5a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M25 8C28 10 30 12 30 12" stroke="#2d5c5a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <path d="M35 8C32 10 30 12 30 12" stroke="#2d5c5a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
          </svg>

          {/* CTA card */}
          <div className={`wlev-cm-cta-card-${uid}`}>
            <h3 className={`wlev-cm-cta-heading-${uid}`}>{ctaHeading}</h3>
            {renderRichText(ctaBody, `wlev-cm-cta-body-${uid}`)}

            <div className={`wlev-cm-cta-methods-${uid}`}>
              <div className={`wlev-cm-cta-method-${uid}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Photos</span>
              </div>
              <div className={`wlev-cm-cta-method-${uid}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                <span>Videos</span>
              </div>
              <div className={`wlev-cm-cta-method-${uid}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>Stories</span>
              </div>
            </div>

            <a href="#" className={`wlev-cm-cta-btn-${uid}`}>{ctaButtonText}</a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .wlev-cm-root-${uid} { width: 100%; }

        .wlev-cm-section-${uid} {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .wlev-cm-bg-shape1-${uid} { position: absolute; top: -60px; left: -80px; pointer-events: none; }
        .wlev-cm-bg-shape2-${uid} { position: absolute; bottom: -40px; right: -60px; pointer-events: none; }

        .wlev-cm-inner-${uid} {
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          position: relative;
          z-index: 2;
        }

        .wlev-cm-header-${uid} {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .wlev-cm-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.15;
        }

        .wlev-cm-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }

        .wlev-cm-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
          max-width: 560px;
        }

        /* Feature pills */
        .wlev-cm-features-${uid} {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        .wlev-cm-feature-${uid} {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: #ffffff;
          border-radius: 60px 16px 16px 60px;
          border: 2px solid rgba(45, 92, 90, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .wlev-cm-feature-${uid}:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(26, 60, 60, 0.08);
        }

        .wlev-cm-feature-icon-${uid} {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
        }

        .wlev-cm-feature-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a3c3c;
          display: block;
          line-height: 1.3;
        }

        .wlev-cm-feature-desc-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          color: #5a7a78;
          line-height: 1.4;
        }

        /* Body */
        .wlev-cm-body-wrap-${uid} {
          padding: 28px 32px;
          border-left: 4px solid #f5b731;
          border-radius: 0 225px 15px 0 / 0 15px 225px 0;
          background: rgba(245, 183, 49, 0.06);
        }

        .wlev-cm-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          font-weight: 400;
          color: #1a3c3c;
          line-height: 1.7;
        }

        .wlev-cm-body-${uid} p { margin: 0; }

        .wlev-cm-closing-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
          font-weight: 700;
          color: #2d5c5a;
          margin: 0;
          text-align: center;
          line-height: 1.3;
        }

        /* CTA card */
        .wlev-cm-cta-card-${uid} {
          width: 100%;
          background: #1a3c3c;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .wlev-cm-cta-card-${uid}::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(245, 183, 49, 0.08);
          pointer-events: none;
        }

        .wlev-cm-cta-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          color: #f5b731;
          margin: 0;
          line-height: 1.2;
        }

        .wlev-cm-cta-body-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          color: #d1e0df;
          line-height: 1.6;
          max-width: 500px;
        }

        .wlev-cm-cta-body-${uid} p { margin: 0; }

        .wlev-cm-cta-methods-${uid} {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .wlev-cm-cta-method-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1e0df;
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .wlev-cm-cta-method-${uid}:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .wlev-cm-cta-method-${uid} svg { stroke: #f5b731; }

        .wlev-cm-cta-btn-${uid} {
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 600;
          color: #1a3c3c;
          background: #f5b731;
          padding: 16px 48px;
          border-radius: 50px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(245, 183, 49, 0.3);
          margin-top: 4px;
        }

        .wlev-cm-cta-btn-${uid}:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(245, 183, 49, 0.4);
        }

        @media (max-width: 640px) {
          .wlev-cm-section-${uid} { padding: 60px 16px; }
          .wlev-cm-features-${uid} { grid-template-columns: 1fr; }
          .wlev-cm-cta-card-${uid} { padding: 32px 24px; }
          .wlev-cm-body-wrap-${uid} { padding: 20px 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-cm-feature-${uid},
          .wlev-cm-cta-btn-${uid},
          .wlev-cm-cta-method-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
