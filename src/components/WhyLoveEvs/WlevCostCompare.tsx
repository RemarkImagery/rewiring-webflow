"use client";

import React, { useId, useState } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevCostCompareProps {
  heading?: string;
  subtitle?: string;
  petrolFuelWk?: string;
  petrolMaintWk?: string;
  petrolRepayWk?: string;
  petrolRepayNote?: string;
  petrolTotalWk?: string;
  petrolLifetime?: string;
  evPowerWk?: string;
  evRucsWk?: string;
  evMaintWk?: string;
  evRepayWk?: string;
  evRepayNote?: string;
  evTotalWk?: string;
  evLifetime?: string;
  savingBadge?: string;
  finance1Title?: string;
  finance1Body?: string;
  finance2Title?: string;
  finance2Body?: string;
  finance3Title?: string;
  finance3Body?: string;
  bgColor?: string;
}

export default function WlevCostCompare(props: WlevCostCompareProps) {
  const {
    heading = "The Savings Stack Up Fast",
    subtitle = "EECA estimates the five-year cost of owning an EV is just 67.5% of the cost of a petrol car.",
    petrolFuelWk = "$58",
    petrolMaintWk = "$22",
    petrolRepayWk = "$68",
    petrolRepayNote = "$39K on finance",
    petrolTotalWk = "$148",
    petrolLifetime = "$116k lifetime",
    evPowerWk = "$13",
    evRucsWk = "$16",
    evMaintWk = "$13",
    evRepayWk = "$92",
    evRepayNote = "$52K on finance",
    evTotalWk = "$135",
    evLifetime = "$105k lifetime",
    savingBadge = 'You save <strong>$13/week</strong> &mdash; <strong>$11,000+ over the life of the vehicle</strong>',
    finance1Title = "Regular Finance",
    finance1Body = "At current mortgage rates (~5.5%), you could swap higher fuel costs for lower finance repayments. You\u2019d be better off buying an EV on finance than a petrol car on finance.",
    finance2Title = "Green Loans",
    finance2Body = "Some banks offer 0\u20131% loans for sustainable purchases like EVs and solar panels. Short-term repayments may be higher, but running cost savings kick in fast.",
    finance3Title = "Car-Share Services",
    finance3Body = "Not ready to buy? Companies like Mevo, Zilch, Cityhop and Ryd offer EVs by the hour, day or month \u2014 with insurance, charging and maintenance included.",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [openFinance, setOpenFinance] = useState<number | null>(null);

  const petrolRows = [
    { label: "Fuel", val: petrolFuelWk },
    { label: "Maintenance", val: petrolMaintWk },
    { label: `Repayments (${petrolRepayNote})`, val: petrolRepayWk },
  ];

  const evRows = [
    { label: "Power", val: evPowerWk },
    { label: "RUCs", val: evRucsWk },
    { label: "Maintenance", val: evMaintWk },
    { label: `Repayments (${evRepayNote})`, val: evRepayWk },
  ];

  const financeOptions = [
    { title: finance1Title, body: finance1Body },
    { title: finance2Title, body: finance2Body },
    { title: finance3Title, body: finance3Body },
  ];

  // Parse dollar amounts for bar widths
  const parseVal = (v: string) => parseInt(v.replace(/[^0-9]/g, ""), 10) || 0;
  const allVals = [...petrolRows, ...evRows].map((r) => parseVal(r.val));
  const maxVal = Math.max(...allVals, 1);

  return (
    <div className={`wlev-cc-root-${uid}`}>
      <section className={`wlev-cc-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-cc-inner-${uid}`}>
          <div className={`wlev-cc-header-${uid}`}>
            <h2 className={`wlev-cc-heading-${uid}`}>{heading}</h2>
            <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-cc-squiggle-${uid}`} />
            {renderRichText(subtitle, `wlev-cc-subtitle-${uid}`)}
          </div>

          <div className={`wlev-cc-compare-${uid}`}>
            <div className={`wlev-cc-col-${uid}`}>
              <h3 className={`wlev-cc-col-title-${uid}`}>Petrol</h3>
              {petrolRows.map((c, i) => (
                <div key={i} className={`wlev-cc-row-${uid}`}>
                  <span className={`wlev-cc-row-label-${uid}`}>{c.label}</span>
                  <div className={`wlev-cc-bar-track-${uid}`}>
                    <div className={`wlev-cc-bar-${uid} wlev-cc-bar-petrol-${uid}`} style={{ width: `${(parseVal(c.val) / maxVal) * 100}%` }} />
                  </div>
                  <span className={`wlev-cc-row-val-${uid}`}>{c.val}/wk</span>
                </div>
              ))}
              <div className={`wlev-cc-total-${uid} wlev-cc-total-petrol-${uid}`}>
                <span>Total</span>
                <span className={`wlev-cc-total-num-${uid}`}>{petrolTotalWk}/wk</span>
                <span className={`wlev-cc-total-life-${uid}`}>{petrolLifetime}</span>
              </div>
            </div>

            <div className={`wlev-cc-col-${uid}`}>
              <h3 className={`wlev-cc-col-title-${uid} wlev-cc-col-title-ev-${uid}`}>EV</h3>
              {evRows.map((c, i) => (
                <div key={i} className={`wlev-cc-row-${uid}`}>
                  <span className={`wlev-cc-row-label-${uid}`}>{c.label}</span>
                  <div className={`wlev-cc-bar-track-${uid}`}>
                    <div className={`wlev-cc-bar-${uid} wlev-cc-bar-ev-${uid}`} style={{ width: `${(parseVal(c.val) / maxVal) * 100}%` }} />
                  </div>
                  <span className={`wlev-cc-row-val-${uid}`}>{c.val}/wk</span>
                </div>
              ))}
              <div className={`wlev-cc-total-${uid} wlev-cc-total-ev-${uid}`}>
                <span>Total</span>
                <span className={`wlev-cc-total-num-${uid}`}>{evTotalWk}/wk</span>
                <span className={`wlev-cc-total-life-${uid}`}>{evLifetime}</span>
              </div>
            </div>
          </div>

          {renderRichText(savingBadge, `wlev-cc-saving-badge-${uid}`)}

          <div className={`wlev-cc-finance-${uid}`}>
            <h3 className={`wlev-cc-finance-heading-${uid}`}>Ways to Get Started</h3>
            {financeOptions.map((opt, i) => {
              const isOpen = openFinance === i;
              return (
                <div key={i} className={`wlev-cc-fin-item-${uid}${isOpen ? ` wlev-cc-fin-open-${uid}` : ""}`}>
                  <button className={`wlev-cc-fin-header-${uid}`} onClick={() => setOpenFinance(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span className={`wlev-cc-fin-title-${uid}`}>{opt.title}</span>
                    <svg className={`wlev-cc-fin-chev-${uid}${isOpen ? ` wlev-cc-fin-chev-open-${uid}` : ""}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className={`wlev-cc-fin-body-${uid}${isOpen ? ` wlev-cc-fin-body-open-${uid}` : ""}`}>
                    {renderRichText(opt.body, `wlev-cc-fin-text-${uid}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');
        .wlev-cc-root-${uid} { width: 100%; }
        .wlev-cc-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; }
        .wlev-cc-inner-${uid} { max-width: 960px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 40px; }
        .wlev-cc-header-${uid} { text-align: center; display: flex; flex-direction: column; gap: 12px; max-width: 640px; }
        .wlev-cc-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #1a3c3c; margin: 0; line-height: 1.2; }
        .wlev-cc-subtitle-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #5a7a78; margin: 0; line-height: 1.6; }
        .wlev-cc-subtitle-${uid} p { margin: 0; }
        .wlev-cc-compare-${uid} { display: flex; flex-direction: column; gap: 28px; width: 100%; max-width: 600px; }
        .wlev-cc-col-${uid} { background: #ffffff; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; padding: 32px 28px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 2px 12px rgba(26, 60, 60, 0.06); border: solid 3px #1a3c3c; }
        .wlev-cc-col-title-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 700; color: #1a3c3c; margin: 0; }
        .wlev-cc-col-title-ev-${uid} { color: #2d5c5a; }
        .wlev-cc-row-${uid} { display: grid; grid-template-columns: 100px 1fr auto; align-items: center; gap: 12px; }
        .wlev-cc-row-label-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 400; color: #5a7a78; }
        .wlev-cc-bar-track-${uid} { height: 22px; background: #f0f4f3; border-radius: 11px; overflow: hidden; }
        .wlev-cc-bar-${uid} { height: 100%; border-radius: 11px; transition: width 0.6s ease; }
        .wlev-cc-bar-petrol-${uid} { background: #e8927c; }
        .wlev-cc-bar-ev-${uid} { background: #2d5c5a; }
        .wlev-cc-row-val-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 600; color: #1a3c3c; min-width: 60px; text-align: right; }
        .wlev-cc-total-${uid} { display: flex; align-items: baseline; gap: 12px; padding-top: 16px; border-top: 2px dashed #e0e8e7; font-family: 'Rubik', sans-serif; font-size: 0.95rem; color: #5a7a78; }
        .wlev-cc-total-num-${uid} { font-size: clamp(1.3rem, 2.5vw, 1.7rem); font-weight: 700; color: #1a3c3c; }
        .wlev-cc-total-ev-${uid} .wlev-cc-total-num-${uid} { color: #2d5c5a; }
        .wlev-cc-total-petrol-${uid} .wlev-cc-total-num-${uid} { color: #c0604d; }
        .wlev-cc-total-life-${uid} { font-size: 0.85rem; font-weight: 600; color: #5a7a78; margin-left: auto; }
        .wlev-cc-saving-badge-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.6vw, 1.15rem); color: #1a3c3c; background: #f5b731; padding: 16px 32px; border-radius: 50px; text-align: center; box-shadow: 0 4px 16px rgba(245, 183, 49, 0.3); }
        .wlev-cc-finance-${uid} { width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 12px; }
        .wlev-cc-finance-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; color: #1a3c3c; margin: 0 0 4px; text-align: center; }
        .wlev-cc-fin-item-${uid} { border: 1px solid #e0e8e7; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; overflow: hidden; border-left: 4px solid transparent; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .wlev-cc-fin-open-${uid} { border-left-color: #f5b731; box-shadow: 0 4px 16px rgba(26, 60, 60, 0.06); }
        .wlev-cc-fin-header-${uid} { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; background: none; border: none; cursor: pointer; gap: 16px; transition: background 0.2s ease; }
        .wlev-cc-fin-header-${uid}:hover { background: rgba(26, 60, 60, 0.02); }
        .wlev-cc-fin-title-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.6vw, 1.1rem); font-weight: 600; color: #1a3c3c; text-align: left; }
        .wlev-cc-fin-chev-${uid} { flex-shrink: 0; color: #2d5c5a; transition: transform 0.3s ease; }
        .wlev-cc-fin-chev-open-${uid} { transform: rotate(180deg); }
        .wlev-cc-fin-body-${uid} { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .wlev-cc-fin-body-open-${uid} { max-height: 300px; }
        .wlev-cc-fin-text-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.4vw, 1.05rem); font-weight: 400; color: #5a7a78; line-height: 1.7; padding: 0 24px 18px; }
        .wlev-cc-fin-text-${uid} p { margin: 0; }
        .wlev-cc-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }
        @media (max-width: 768px) { .wlev-cc-section-${uid} { padding: 60px 24px; } .wlev-cc-row-${uid} { grid-template-columns: 80px 1fr auto; } }
        @media (max-width: 480px) { .wlev-cc-section-${uid} { padding: 40px 16px; } .wlev-cc-col-${uid} { padding: 24px 20px; } .wlev-cc-saving-badge-${uid} { padding: 14px 20px; border-radius: 16px; } }
      `}</style>
    </div>
  );
}
