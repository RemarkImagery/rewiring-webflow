"use client";

import React, { useId, useState } from "react";

interface NzmeAuctionDonateProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  examplesCsv?: string;
  submitUrl?: string;
  successMessage?: string;
  darkColor?: string;
  neonColor?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NzmeAuctionDonate(props: NzmeAuctionDonateProps) {
  const {
    eyebrow = "The Laser Kiwi auctions",
    heading = "Donate an auction item",
    intro = "When the campaign launches we'll auction one-of-a-kind items and experiences from legends of the electric movement, with every winning bid going straight into the campaign. Got something worth bidding on? Tell us about it and we'll take care of the rest.",
    examplesCsv = "A guitar lesson with a rock legend, A party on an electric hydrofoil boat, A Lightfoot solar scooter, Lunch at the electric cherry orchard, A sledgehammer session in the wrecking room",
    submitUrl = "https://nzme-teaser-forms.oj-f3d.workers.dev",
    successMessage = "Legend! Your offer is in. The Rewiring team will be in touch to sort the details before launch.",
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const examples = examplesCsv.split(",").map((e) => e.trim()).filter(Boolean);

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [offer, setOffer] = useState("");
  const [value, setValue] = useState("");
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Tell us your name.");
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email address.");
    if (!offer.trim()) return setError("Tell us what you're offering.");
    setSending(true);
    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "auction-item",
          name,
          business,
          email,
          phone,
          offer,
          value,
          hp,
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setDone(true);
    } catch {
      setError("Something went wrong sending your offer. Please try again in a minute.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={`nzad-wrap-${uid}`} id="donate-an-item">
      <style>{`
        .nzad-wrap-${uid} {
          background: #f7efd4;
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzad-inner-${uid} { max-width: 680px; margin: 0 auto; text-align: center; }
        .nzad-eyebrow-${uid} {
          display: block;
          font-size: 13px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #d99a06;
          margin-bottom: 12px;
        }
        .nzad-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 14px;
        }
        .nzad-intro-${uid} {
          font-size: 1.05rem; color: #5c7a78;
          line-height: 1.7; margin: 0 0 24px;
        }
        .nzad-chips-${uid} {
          display: flex; flex-wrap: wrap; gap: 10px;
          justify-content: center;
          margin-bottom: 34px;
        }
        .nzad-chip-${uid} {
          font-size: 0.85rem; font-weight: 600; color: ${darkColor};
          background: #FFFCF0;
          border: 2px dashed ${darkColor}55;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          padding: 8px 16px;
        }
        .nzad-form-${uid} {
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          padding: 30px clamp(20px, 4vw, 40px) 34px;
          text-align: left;
        }
        .nzad-label-${uid} {
          display: block;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #5c7a78; margin-bottom: 5px;
        }
        .nzad-field-${uid} { margin-bottom: 14px; }
        .nzad-row2-${uid} { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .nzad-input-${uid}, .nzad-area-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.95rem;
          width: 100%; box-sizing: border-box;
          padding: 12px 14px;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          outline: none; background: #fff; color: ${darkColor};
        }
        .nzad-input-${uid}:focus, .nzad-area-${uid}:focus { border-color: ${darkColor}; }
        .nzad-area-${uid} { min-height: 96px; resize: vertical; }
        .nzad-hp-${uid} { position: absolute; left: -9999px; opacity: 0; height: 0; overflow: hidden; }
        .nzad-error-${uid} {
          font-size: 0.85rem; font-weight: 600; color: #b3261e;
          background: #fdecea; border-radius: 8px; padding: 9px 12px;
          margin-bottom: 14px;
        }
        .nzad-success-${uid} {
          font-size: 1rem; font-weight: 600; color: #14611f;
          background: ${neonColor}30;
          border: 2px solid #3ed432;
          border-radius: 12px 4px 12px 4px;
          padding: 18px 20px; line-height: 1.6;
        }
        .nzad-submit-${uid} {
          display: block; width: 100%;
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 800;
          padding: 15px 20px; cursor: pointer;
          background: ${darkColor}; color: #FFFCF0;
          border: 3px solid ${darkColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s, opacity 0.3s;
        }
        .nzad-submit-${uid}:hover { background: transparent; color: ${darkColor}; }
        .nzad-submit-${uid}[disabled] { opacity: 0.6; cursor: wait; }
        @media (max-width: 640px) {
          .nzad-wrap-${uid} { padding: 72px 24px; }
          .nzad-row2-${uid} { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`nzad-inner-${uid}`}>
        {eyebrow && <span className={`nzad-eyebrow-${uid}`}>{eyebrow}</span>}
        <h2 className={`nzad-heading-${uid}`}>{heading}</h2>
        <p className={`nzad-intro-${uid}`}>{intro}</p>
        {examples.length > 0 && (
          <div className={`nzad-chips-${uid}`}>
            {examples.map((ex, i) => (
              <span key={i} className={`nzad-chip-${uid}`}>{ex}</span>
            ))}
          </div>
        )}
        <div className={`nzad-form-${uid}`}>
          {done ? (
            <div className={`nzad-success-${uid}`}>{successMessage}</div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className={`nzad-row2-${uid}`}>
                <div className={`nzad-field-${uid}`}>
                  <label className={`nzad-label-${uid}`}>Your name *</label>
                  <input
                    className={`nzad-input-${uid}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kiri Watts"
                  />
                </div>
                <div className={`nzad-field-${uid}`}>
                  <label className={`nzad-label-${uid}`}>Business (optional)</label>
                  <input
                    className={`nzad-input-${uid}`}
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder="Laser Solar Ltd"
                  />
                </div>
              </div>
              <div className={`nzad-row2-${uid}`}>
                <div className={`nzad-field-${uid}`}>
                  <label className={`nzad-label-${uid}`}>Email *</label>
                  <input
                    type="email"
                    className={`nzad-input-${uid}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kiri@example.nz"
                  />
                </div>
                <div className={`nzad-field-${uid}`}>
                  <label className={`nzad-label-${uid}`}>Phone (optional)</label>
                  <input
                    className={`nzad-input-${uid}`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="021 ..."
                  />
                </div>
              </div>
              <div className={`nzad-field-${uid}`}>
                <label className={`nzad-label-${uid}`}>What are you offering? *</label>
                <textarea
                  className={`nzad-area-${uid}`}
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="e.g. A weekend with our electric campervan, a heat pump install, dinner for six at the vineyard..."
                />
              </div>
              <div className={`nzad-field-${uid}`}>
                <label className={`nzad-label-${uid}`}>Approx retail value (optional)</label>
                <input
                  className={`nzad-input-${uid}`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="$1,000"
                />
              </div>
              <div className={`nzad-hp-${uid}`} aria-hidden="true">
                <label>
                  Leave this empty
                  <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </label>
              </div>
              {error && <div className={`nzad-error-${uid}`}>{error}</div>}
              <button type="submit" className={`nzad-submit-${uid}`} disabled={sending}>
                {sending ? "Sending..." : "Offer it up →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
