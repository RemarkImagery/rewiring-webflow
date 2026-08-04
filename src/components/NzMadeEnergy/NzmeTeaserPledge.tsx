"use client";

import React, { useId, useState } from "react";

interface NzmeTeaserPledgeProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  submitUrl?: string;
  amountsCsv?: string;
  successMessage?: string;
  darkColor?: string;
  neonColor?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NzmeTeaserPledge(props: NzmeTeaserPledgeProps) {
  const {
    eyebrow = "Get involved early",
    heading = "Make a pre-campaign pledge",
    intro = "The thermometer isn't live yet, but you can get your name on it now. Tell us you're in and roughly what you'd chip in, and the moment Operation Laser Kiwi launches we'll email you first so your pledge lands on day one.",
    submitUrl = "https://nzme-teaser-forms.oj-f3d.workers.dev",
    amountsCsv = "$20, $50, $100, $250, $500",
    successMessage = "Legend! You're on the list. We'll email you the moment the campaign goes live so your pledge can land on day one.",
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const amounts = amountsCsv.split(",").map((a) => a.trim()).filter(Boolean);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Tell us your name.");
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email address.");
    setSending(true);
    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "pledge",
          name,
          email,
          amount: customAmount.trim() ? `$${customAmount.replace(/[^0-9.]/g, "")}` : amount,
          message,
          hp,
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setDone(true);
    } catch {
      setError("Something went wrong sending your pledge. Please try again in a minute.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={`nzpl-wrap-${uid}`} id="pledge">
      <style>{`
        .nzpl-wrap-${uid} {
          background: #FFFCF0;
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzpl-inner-${uid} { max-width: 680px; margin: 0 auto; text-align: center; }
        .nzpl-eyebrow-${uid} {
          display: block;
          font-size: 13px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #d99a06;
          margin-bottom: 12px;
        }
        .nzpl-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 14px;
        }
        .nzpl-intro-${uid} {
          font-size: 1.05rem; color: #5c7a78;
          line-height: 1.7; margin: 0 0 34px;
        }
        .nzpl-form-${uid} {
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          padding: 30px clamp(20px, 4vw, 40px) 34px;
          text-align: left;
        }
        .nzpl-label-${uid} {
          display: block;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #5c7a78; margin-bottom: 5px;
        }
        .nzpl-field-${uid} { margin-bottom: 14px; }
        .nzpl-row2-${uid} { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .nzpl-input-${uid}, .nzpl-area-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.95rem;
          width: 100%; box-sizing: border-box;
          padding: 12px 14px;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          outline: none; background: #fff; color: ${darkColor};
        }
        .nzpl-input-${uid}:focus, .nzpl-area-${uid}:focus { border-color: ${darkColor}; }
        .nzpl-area-${uid} { min-height: 76px; resize: vertical; }
        .nzpl-hp-${uid} { position: absolute; left: -9999px; opacity: 0; height: 0; overflow: hidden; }
        .nzpl-pills-${uid} { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 4px; }
        .nzpl-pill-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem; font-weight: 800;
          padding: 10px 20px; cursor: pointer;
          background: #FFFCF0; color: ${darkColor};
          border: 2px solid ${darkColor}55;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.2s, border-color 0.2s;
        }
        .nzpl-pill-on-${uid} {
          background: ${darkColor}; color: ${neonColor};
          border-color: ${darkColor};
        }
        .nzpl-custom-${uid} {
          display: flex; align-items: center;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          background: #fff; padding: 0 0 0 12px;
          max-width: 220px; margin-top: 10px;
        }
        .nzpl-custom-${uid}:focus-within { border-color: ${darkColor}; }
        .nzpl-custom-${uid} span { font-weight: 700; color: #5c7a78; }
        .nzpl-custom-${uid} input {
          font-family: 'Rubik', sans-serif; font-size: 0.95rem;
          border: 0; outline: none; width: 100%;
          padding: 11px 10px 11px 6px; border-radius: 10px;
          color: ${darkColor}; background: transparent;
        }
        .nzpl-error-${uid} {
          font-size: 0.85rem; font-weight: 600; color: #b3261e;
          background: #fdecea; border-radius: 8px; padding: 9px 12px;
          margin-bottom: 14px;
        }
        .nzpl-success-${uid} {
          font-size: 1rem; font-weight: 600; color: #14611f;
          background: ${neonColor}30;
          border: 2px solid #3ed432;
          border-radius: 12px 4px 12px 4px;
          padding: 18px 20px; line-height: 1.6;
        }
        .nzpl-submit-${uid} {
          display: block; width: 100%;
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 800;
          padding: 15px 20px; cursor: pointer;
          background: #f5b731; color: ${darkColor};
          border: 3px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s, opacity 0.3s;
        }
        .nzpl-submit-${uid}:hover { background: transparent; color: #a87c12; }
        .nzpl-submit-${uid}[disabled] { opacity: 0.6; cursor: wait; }
        @media (max-width: 640px) {
          .nzpl-wrap-${uid} { padding: 72px 24px; }
          .nzpl-row2-${uid} { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`nzpl-inner-${uid}`}>
        {eyebrow && <span className={`nzpl-eyebrow-${uid}`}>{eyebrow}</span>}
        <h2 className={`nzpl-heading-${uid}`}>{heading}</h2>
        <p className={`nzpl-intro-${uid}`}>{intro}</p>
        <div className={`nzpl-form-${uid}`}>
          {done ? (
            <div className={`nzpl-success-${uid}`}>{successMessage}</div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className={`nzpl-row2-${uid}`}>
                <div className={`nzpl-field-${uid}`}>
                  <label className={`nzpl-label-${uid}`}>Your name *</label>
                  <input
                    className={`nzpl-input-${uid}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kiri Watts"
                  />
                </div>
                <div className={`nzpl-field-${uid}`}>
                  <label className={`nzpl-label-${uid}`}>Email *</label>
                  <input
                    type="email"
                    className={`nzpl-input-${uid}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kiri@example.nz"
                  />
                </div>
              </div>
              <div className={`nzpl-field-${uid}`}>
                <label className={`nzpl-label-${uid}`}>Roughly what are you thinking? (optional)</label>
                <div className={`nzpl-pills-${uid}`}>
                  {amounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`nzpl-pill-${uid}${amount === a && !customAmount ? ` nzpl-pill-on-${uid}` : ""}`}
                      onClick={() => {
                        setAmount(a);
                        setCustomAmount("");
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className={`nzpl-custom-${uid}`}>
                  <span>$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Or your own amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    aria-label="Custom pledge amount in dollars"
                  />
                </div>
              </div>
              <div className={`nzpl-field-${uid}`}>
                <label className={`nzpl-label-${uid}`}>Anything you want to tell us? (optional)</label>
                <textarea
                  className={`nzpl-area-${uid}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. I want to ride a leg of the Hiko Hikoi..."
                />
              </div>
              <div className={`nzpl-hp-${uid}`} aria-hidden="true">
                <label>
                  Leave this empty
                  <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </label>
              </div>
              {error && <div className={`nzpl-error-${uid}`}>{error}</div>}
              <button type="submit" className={`nzpl-submit-${uid}`} disabled={sending}>
                {sending ? "Sending..." : "Pledge my support →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
