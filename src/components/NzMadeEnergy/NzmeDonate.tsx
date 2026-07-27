"use client";

import React, { useId, useState } from "react";

interface NzmeDonateProps {
  heading?: string;
  subheading?: string;
  campaignPath?: string;
  amount1?: string;
  label1?: string;
  amount2?: string;
  label2?: string;
  amount3?: string;
  label3?: string;
  amount4?: string;
  label4?: string;
  amount5?: string;
  label5?: string;
  amount6?: string;
  label6?: string;
  embedHeight?: string;
  darkColor?: string;
  neonColor?: string;
}

function parseAmount(val: string | undefined, fallback: number): number {
  if (!val) return fallback;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatNZD(n: number): string {
  return "$" + n.toLocaleString("en-NZ", { maximumFractionDigits: 0 });
}

export default function NzmeDonate(props: NzmeDonateProps) {
  const {
    heading = "Chip in to Operation Laser Kiwi",
    subheading = "Pick your pew. Every dollar pushes the thermometer up - and payment goes through Rewiring's secure Raisely checkout.",
    campaignPath = "new-zealand-made-energy",
    amount1 = "20",
    label1 = "Pew pew!",
    amount2 = "50",
    label2 = "A feather for the suit",
    amount3 = "100",
    label3 = "Fuel money? Never heard of it",
    amount4 = "250",
    label4 = "Solar for a low-income home",
    amount5 = "500",
    label5 = "A chunk of billboard",
    amount6 = "1000",
    label6 = "Absolute legend",
    embedHeight = "760",
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const options = [
    { amount: parseAmount(amount1, 20), label: label1 },
    { amount: parseAmount(amount2, 50), label: label2 },
    { amount: parseAmount(amount3, 100), label: label3 },
    { amount: parseAmount(amount4, 250), label: label4 },
    { amount: parseAmount(amount5, 500), label: label5 },
    { amount: parseAmount(amount6, 1000), label: label6 },
  ];

  const [freq, setFreq] = useState<"ONCE" | "MONTHLY">("ONCE");
  const [selected, setSelected] = useState<number | null>(options[1].amount);
  const [custom, setCustom] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const customAmount = Number(custom);
  const activeAmount =
    custom && Number.isFinite(customAmount) && customAmount > 0
      ? Math.round(customAmount)
      : selected;

  function startCheckout() {
    if (!activeAmount) return;
    const url =
      `https://${campaignPath}.raisely.com/embed/donate` +
      `?amount=${activeAmount}&frequency=${freq}`;
    setCheckoutUrl(url);
  }

  return (
    <section className={`nzmd-wrap-${uid}`} id="donate">
      <style>{`
        .nzmd-wrap-${uid} {
          background: ${darkColor};
          padding: 88px 32px 96px;
          font-family: 'Rubik', sans-serif;
        }
        .nzmd-inner-${uid} { max-width: 820px; margin: 0 auto; }
        .nzmd-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: #FFFCF0;
          margin: 0 0 10px; text-align: center;
        }
        .nzmd-sub-${uid} {
          font-size: 1.05rem; color: rgba(255,252,240,0.75); text-align: center;
          max-width: 620px; margin: 0 auto 40px; line-height: 1.6;
        }
        .nzmd-card-${uid} {
          background: #FFFCF0;
          border: 3px solid ${neonColor};
          border-radius: 22px 8px 22px 8px;
          padding: 30px clamp(20px, 4vw, 40px) 36px;
          box-shadow: 0 0 40px ${neonColor}2e;
        }
        .nzmd-freq-${uid} {
          display: flex; justify-content: center; margin-bottom: 26px;
        }
        .nzmd-freqbtn-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 700;
          padding: 10px 26px; cursor: pointer;
          background: #fff; color: ${darkColor};
          border: 3px solid ${darkColor};
        }
        .nzmd-freqbtn-${uid}:first-child { border-radius: 255px 0 0 255px / 60px 0 0 60px; border-right-width: 1.5px; }
        .nzmd-freqbtn-${uid}:last-child { border-radius: 0 255px 255px 0 / 0 60px 60px 0; border-left-width: 1.5px; }
        .nzmd-freqon-${uid} { background: ${darkColor}; color: ${neonColor}; }
        .nzmd-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        .nzmd-pill-${uid} {
          font-family: 'Rubik', sans-serif;
          background: #ffffff;
          border: 3px solid ${darkColor}44;
          border-radius: 16px 6px 16px 6px;
          padding: 14px 10px 12px;
          cursor: pointer;
          text-align: center;
          transition: transform 0.15s, border-color 0.2s, background 0.2s;
        }
        .nzmd-pill-${uid}:hover { transform: translateY(-3px) rotate(-0.5deg); border-color: ${darkColor}; }
        .nzmd-pillamt-${uid} { display: block; font-size: 1.35rem; font-weight: 900; color: ${darkColor}; }
        .nzmd-pilllbl-${uid} { display: block; font-size: 0.72rem; font-weight: 600; color: #5c7a78; margin-top: 3px; line-height: 1.3; }
        .nzmd-pillon-${uid} {
          background: ${darkColor}; border-color: ${darkColor};
          box-shadow: 0 6px 18px rgba(26,60,60,0.35);
        }
        .nzmd-pillon-${uid} .nzmd-pillamt-${uid} { color: ${neonColor}; }
        .nzmd-pillon-${uid} .nzmd-pilllbl-${uid} { color: rgba(255,252,240,0.75); }
        .nzmd-customrow-${uid} {
          display: flex; align-items: center; gap: 10px;
          border: 3px dashed ${darkColor}55;
          border-radius: 16px 6px 16px 6px;
          background: #fff;
          padding: 0 0 0 16px;
          margin-bottom: 24px;
        }
        .nzmd-customrow-${uid}:focus-within { border-style: solid; border-color: ${darkColor}; }
        .nzmd-customrow-${uid} span { font-weight: 800; color: #5c7a78; font-size: 1.1rem; }
        .nzmd-customrow-${uid} input {
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600;
          flex: 1; border: 0; outline: none; background: transparent;
          padding: 15px 14px 15px 0; color: ${darkColor};
        }
        .nzmd-cta-${uid} {
          display: block; width: 100%;
          font-family: 'Rubik', sans-serif; font-size: 1.1rem; font-weight: 800;
          padding: 17px 20px; cursor: pointer;
          background: #f5b731; color: ${darkColor};
          border: 3px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s, transform 0.15s;
        }
        .nzmd-cta-${uid}:hover { transform: scale(1.02); }
        .nzmd-cta-${uid}:disabled { opacity: 0.5; cursor: not-allowed; }
        .nzmd-note-${uid} {
          text-align: center; font-size: 0.78rem; color: #5c7a78;
          margin: 14px 0 0;
        }
        .nzmd-back-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.85rem; font-weight: 700;
          background: none; border: 0; cursor: pointer;
          color: ${darkColor}; text-decoration: underline;
          margin-bottom: 14px; padding: 0;
        }
        .nzmd-iframe-${uid} {
          width: 100%; border: 0; border-radius: 12px;
          background: #fff;
        }
        @media (max-width: 640px) {
          .nzmd-wrap-${uid} { padding: 64px 16px 72px; }
          .nzmd-grid-${uid} { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className={`nzmd-inner-${uid}`}>
        <h2 className={`nzmd-heading-${uid}`}>{heading}</h2>
        <p className={`nzmd-sub-${uid}`}>{subheading}</p>
        <div className={`nzmd-card-${uid}`}>
          {checkoutUrl ? (
            <>
              <button
                type="button"
                className={`nzmd-back-${uid}`}
                onClick={() => setCheckoutUrl(null)}
              >
                &larr; Change amount
              </button>
              <iframe
                src={checkoutUrl}
                className={`nzmd-iframe-${uid}`}
                style={{ height: `${parseAmount(embedHeight, 760)}px` }}
                title="Donate to the campaign"
                allow="payment"
              />
            </>
          ) : (
            <>
              <div className={`nzmd-freq-${uid}`}>
                <button
                  type="button"
                  className={`nzmd-freqbtn-${uid}${freq === "ONCE" ? ` nzmd-freqon-${uid}` : ""}`}
                  onClick={() => setFreq("ONCE")}
                >
                  One-time
                </button>
                <button
                  type="button"
                  className={`nzmd-freqbtn-${uid}${freq === "MONTHLY" ? ` nzmd-freqon-${uid}` : ""}`}
                  onClick={() => setFreq("MONTHLY")}
                >
                  Monthly
                </button>
              </div>
              <div className={`nzmd-grid-${uid}`}>
                {options.map((o) => {
                  const on = !custom && selected === o.amount;
                  return (
                    <button
                      key={o.amount}
                      type="button"
                      className={`nzmd-pill-${uid}${on ? ` nzmd-pillon-${uid}` : ""}`}
                      onClick={() => {
                        setSelected(o.amount);
                        setCustom("");
                      }}
                    >
                      <span className={`nzmd-pillamt-${uid}`}>{formatNZD(o.amount)}</span>
                      <span className={`nzmd-pilllbl-${uid}`}>{o.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className={`nzmd-customrow-${uid}`}>
                <span>$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Or enter your own amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  aria-label="Custom donation amount"
                />
              </div>
              <button
                type="button"
                className={`nzmd-cta-${uid}`}
                disabled={!activeAmount}
                onClick={startCheckout}
              >
                Donate {activeAmount ? formatNZD(activeAmount) : ""}
                {freq === "MONTHLY" ? " monthly" : ""} &rarr;
              </button>
              <p className={`nzmd-note-${uid}`}>
                Secure checkout by Raisely - the same platform behind rewiring.nz/donate.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
