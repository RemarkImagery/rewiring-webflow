"use client";

import React, { useId, useRef, useState } from "react";

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
  formHeading?: string;
  formDemoNote?: string;
  formSuccess?: string;
  darkColor?: string;
  neonColor?: string;
}

function resolveLink(val: any, fallback: string): string {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.href) return val.href;
  return fallback;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NzmeSupportCta(props: NzmeSupportCtaProps) {
  const {
    heading = "Help make the electric boat go faster",
    subheading = "Three ways to get behind Operation Laser Kiwi - every dollar pushes the thermometer up a tier.",
    card1Title = "Donate",
    card1Text = "Chip in whatever you can, or grab some merch - Laser Kiwi t-shirts, key rings, stickers and the Sexiest Electric Machines calendar.",
    card2Title = "Donate something of value",
    card2Text = "Got an experience worth auctioning? A guitar lesson, a boat party, a drag race in an electric truck, lunch at the cherry orchard - we'll auction it for the cause.",
    card3Title = "Business contra offers",
    card3Text = "In the sector? Donate an EV, a solar and battery install, an induction hob, a hot water heat pump, an EV charger or $10,000 of electricity.",
    matchNote = "We're working on a funder matching every dollar raised - doubling whatever you give.",
    ctaText = "Donate to the campaign",
    ctaUrl = "#donate",
    formHeading = "Offer a product or service",
    formDemoNote = "Demo only - offers aren't stored or binding (yet!).",
    formSuccess = "Legend! Your offer is in. The Rewiring team will be in touch to sort the details.",
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const ctaHref = resolveLink(ctaUrl, "#donate");
  const external = /^(https?:\/\/|www\.)/i.test(ctaHref);

  const [formOpen, setFormOpen] = useState(false);
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [offer, setOffer] = useState("");
  const [value, setValue] = useState("");
  const [okToContact, setOkToContact] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function toggleForm() {
    setFormOpen((open) => {
      const next = !open;
      if (next) {
        setTimeout(
          () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          60
        );
      }
      return next;
    });
  }

  function submitOffer(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!business.trim()) return setError("Tell us your business name.");
    if (!contact.trim()) return setError("Tell us who to talk to.");
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email address.");
    if (!offer.trim()) return setError("Tell us what you're offering.");
    if (!okToContact) return setError("We need your OK to get in touch about the offer.");
    setSubmitted(true);
  }

  const cards = [
    { title: card1Title, text: card1Text, href: "#donate", hint: "Donate now" },
    { title: card2Title, text: card2Text, href: "#auctions", hint: "See the auctions" },
    { title: card3Title, text: card3Text, href: null, hint: "Offer a product or service" },
  ].filter((c) => c.title && c.text);

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
          align-items: start;
        }
        .nzsc-card-${uid} {
          display: block;
          background: #ffffff;
          border: 3px dashed ${darkColor};
          border-radius: 8px 22px 8px 22px;
          padding: 26px 24px;
          transition: transform 0.3s, border-style 0.3s, box-shadow 0.3s;
          cursor: pointer;
          text-decoration: none;
          font-family: 'Rubik', sans-serif;
          text-align: left;
        }
        .nzsc-card-${uid}:hover {
          transform: translateY(-4px); border-style: solid;
          box-shadow: 0 14px 30px rgba(26,60,60,0.14);
        }
        .nzsc-cardon-${uid} { border-style: solid; border-color: #3ed432; }
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
          font-size: 0.94rem; color: #5c7a78; line-height: 1.65; margin: 0 0 14px;
        }
        .nzsc-card-hint-${uid} {
          font-size: 0.85rem; font-weight: 700; color: ${darkColor};
        }
        .nzsc-form-${uid} {
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          padding: 30px clamp(20px, 4vw, 40px) 34px;
          max-width: 680px;
          margin: 0 auto 44px;
          text-align: left;
        }
        .nzsc-form-h-${uid} {
          font-size: 1.35rem; font-weight: 800; color: ${darkColor};
          margin: 0 0 4px;
        }
        .nzsc-form-demo-${uid} {
          font-size: 0.78rem; font-weight: 600; color: #8a7a4a;
          margin: 0 0 20px;
        }
        .nzsc-row2-${uid} {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .nzsc-field-${uid} { margin-bottom: 12px; }
        .nzsc-label-${uid} {
          display: block;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #5c7a78; margin-bottom: 5px;
        }
        .nzsc-input-${uid}, .nzsc-area-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.95rem;
          width: 100%; box-sizing: border-box;
          padding: 12px 14px;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          outline: none; background: #fff; color: ${darkColor};
        }
        .nzsc-input-${uid}:focus, .nzsc-area-${uid}:focus { border-color: ${darkColor}; }
        .nzsc-area-${uid} { min-height: 96px; resize: vertical; }
        .nzsc-check-${uid} {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.85rem; color: #5c7a78; line-height: 1.5;
          margin: 6px 0 18px; cursor: pointer;
        }
        .nzsc-check-${uid} input { margin-top: 3px; accent-color: ${darkColor}; }
        .nzsc-error-${uid} {
          font-size: 0.85rem; font-weight: 600; color: #b3261e;
          background: #fdecea; border-radius: 8px; padding: 9px 12px;
          margin-bottom: 14px;
        }
        .nzsc-success-${uid} {
          font-size: 1rem; font-weight: 600; color: #14611f;
          background: ${neonColor}30;
          border: 2px solid #3ed432;
          border-radius: 12px 4px 12px 4px;
          padding: 18px 20px; line-height: 1.6;
        }
        .nzsc-submit-${uid} {
          display: block; width: 100%;
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 800;
          padding: 15px 20px; cursor: pointer;
          background: #f5b731; color: ${darkColor};
          border: 3px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
        }
        .nzsc-submit-${uid}:hover { background: transparent; color: #a87c12; }
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
          .nzsc-row2-${uid} { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`nzsc-inner-${uid}`}>
        <h2 className={`nzsc-heading-${uid}`}>{heading}</h2>
        <p className={`nzsc-sub-${uid}`}>{subheading}</p>
        <div className={`nzsc-grid-${uid}`}>
          {cards.map((c, i) =>
            c.href ? (
              <a key={i} href={c.href} className={`nzsc-card-${uid}`}>
                <span className={`nzsc-num-${uid}`}>{i + 1}</span>
                <h3 className={`nzsc-card-title-${uid}`}>{c.title}</h3>
                <p className={`nzsc-card-text-${uid}`}>{c.text}</p>
                <span className={`nzsc-card-hint-${uid}`}>{c.hint} &rarr;</span>
              </a>
            ) : (
              <button
                key={i}
                type="button"
                onClick={toggleForm}
                className={`nzsc-card-${uid}${formOpen ? ` nzsc-cardon-${uid}` : ""}`}
              >
                <span className={`nzsc-num-${uid}`}>{i + 1}</span>
                <h3 className={`nzsc-card-title-${uid}`}>{c.title}</h3>
                <p className={`nzsc-card-text-${uid}`}>{c.text}</p>
                <span className={`nzsc-card-hint-${uid}`}>
                  {formOpen ? "Close the form" : c.hint} &rarr;
                </span>
              </button>
            )
          )}
        </div>

        {formOpen && (
          <div ref={formRef} className={`nzsc-form-${uid}`}>
            <h3 className={`nzsc-form-h-${uid}`}>{formHeading}</h3>
            <p className={`nzsc-form-demo-${uid}`}>{formDemoNote}</p>
            {submitted ? (
              <div className={`nzsc-success-${uid}`}>{formSuccess}</div>
            ) : (
              <form onSubmit={submitOffer} noValidate>
                <div className={`nzsc-row2-${uid}`}>
                  <div className={`nzsc-field-${uid}`}>
                    <label className={`nzsc-label-${uid}`}>Business name *</label>
                    <input
                      className={`nzsc-input-${uid}`}
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Laser Solar Ltd"
                    />
                  </div>
                  <div className={`nzsc-field-${uid}`}>
                    <label className={`nzsc-label-${uid}`}>Contact name *</label>
                    <input
                      className={`nzsc-input-${uid}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Kiri Watts"
                    />
                  </div>
                </div>
                <div className={`nzsc-row2-${uid}`}>
                  <div className={`nzsc-field-${uid}`}>
                    <label className={`nzsc-label-${uid}`}>Email *</label>
                    <input
                      type="email"
                      className={`nzsc-input-${uid}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kiri@lasersolar.nz"
                    />
                  </div>
                  <div className={`nzsc-field-${uid}`}>
                    <label className={`nzsc-label-${uid}`}>Phone</label>
                    <input
                      className={`nzsc-input-${uid}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="021 ..."
                    />
                  </div>
                </div>
                <div className={`nzsc-field-${uid}`}>
                  <label className={`nzsc-label-${uid}`}>What are you offering? *</label>
                  <textarea
                    className={`nzsc-area-${uid}`}
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="e.g. A 5kW solar + battery install, an induction hob, an EV charger, $10,000 of electricity..."
                  />
                </div>
                <div className={`nzsc-field-${uid}`}>
                  <label className={`nzsc-label-${uid}`}>Approx retail value (NZD)</label>
                  <input
                    className={`nzsc-input-${uid}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="$5,000"
                  />
                </div>
                <label className={`nzsc-check-${uid}`}>
                  <input
                    type="checkbox"
                    checked={okToContact}
                    onChange={(e) => setOkToContact(e.target.checked)}
                  />
                  <span>The Rewiring team can contact me about this offer.</span>
                </label>
                {error && <div className={`nzsc-error-${uid}`}>{error}</div>}
                <button type="submit" className={`nzsc-submit-${uid}`}>
                  Offer it up &rarr;
                </button>
              </form>
            )}
          </div>
        )}

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
