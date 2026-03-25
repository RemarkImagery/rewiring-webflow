"use client";

import React, { useId, useState } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevChargingProps {
  heading?: string;
  subtitle?: string;
  tab1Title?: string;
  tab1Body?: string;
  tab1H1?: string;
  tab1H2?: string;
  tab1H3?: string;
  tab1H4?: string;
  tab2Title?: string;
  tab2Body?: string;
  tab2H1?: string;
  tab2H2?: string;
  tab2H3?: string;
  tab2H4?: string;
  tab3Title?: string;
  tab3Body?: string;
  bgColor?: string;
}

const tabIcons = [
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
];

const tabLabels = ["At Home", "On the Road", "Charger Types"];

const chargerTable = [
  { type: "AC Single Phase", location: "Home / Business", size: "7.4kW", range: "33km/hr", time: "7.1 hrs", cost: "$7\u2013$16" },
  { type: "AC Three Phase", location: "Home / Business", size: "22kW", range: "100km/hr", time: "2.4 hrs", cost: "$7\u2013$16" },
  { type: "DC Charger", location: "Public", size: "25kW", range: "115km/hr", time: "2.1 hrs", cost: "$34\u2013$45" },
  { type: "DC Charger", location: "Public", size: "50kW", range: "230km/hr", time: "1.1 hrs", cost: "$34\u2013$45" },
  { type: "DC Fast Charger", location: "Public", size: "175kW", range: "800km/hr", time: "30 min", cost: "~$48" },
];

export default function WlevCharging(props: WlevChargingProps) {
  const {
    heading = "Charging is Simple, Smart, and Affordable",
    subtitle = "Another reason we love EVs: charging fits seamlessly into everyday life.",
    tab1Title = "Plug in like a phone. Wake up to a full battery.",
    tab1Body = "Most EV owners charge at home \u2014 no detours to the petrol station, no queues. Just plug in when you get home and your car charges while you sleep.",
    tab1H1 = "Standard wall outlet works for short daily driving",
    tab1H2 = "Dedicated home charger is faster and runs during off-peak hours",
    tab1H3 = "Overnight charging easily covers the average driver\u2019s daily needs",
    tab1H4 = "One of the cheapest ways to fuel any vehicle",
    tab2Title = "Fast chargers every ~75km along major highways.",
    tab2Body = "NZ has a growing network of public chargers. Apps like PlugShare and ChargeNet make finding one simple. A 15\u201330 minute stop adds around 100km of range \u2014 perfect for a coffee and a stretch.",
    tab2H1 = "Charging every 2\u20133 hours builds in safer driving habits",
    tab2H2 = "Reduces fatigue \u2014 a major factor in NZ road crashes",
    tab2H3 = "Kids get to burn off energy at each stop",
    tab2H4 = "Your EV encourages breaks that keep everyone alert",
    tab3Title = "From slow home top-ups to ultra-fast highway charging.",
    tab3Body = "Different chargers suit different situations. Home chargers are cheapest; public DC chargers are fastest.",
    bgColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [activeTab, setActiveTab] = useState(0);

  const renderHighlights = (items: string[]) => (
    <ul className={`wlev-ch-highlights-${uid}`}>
      {items.filter(Boolean).map((h, i) => (
        <li key={i} className={`wlev-ch-highlight-${uid}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5b731" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`wlev-ch-root-${uid}`}>
      <section className={`wlev-ch-section-${uid}`}>
        <div className={`wlev-ch-inner-${uid}`}>
          <div className={`wlev-ch-header-${uid}`}>
            <h2 className={`wlev-ch-heading-${uid}`}>{heading}</h2>
            <p className={`wlev-ch-subtitle-${uid}`}>{subtitle}</p>
          </div>

          <div className={`wlev-ch-tabs-${uid}`} role="tablist">
            {tabLabels.map((label, i) => (
              <button key={i} role="tab" aria-selected={activeTab === i} className={`wlev-ch-tab-${uid}${activeTab === i ? ` wlev-ch-tab-active-${uid}` : ""}`} onClick={() => setActiveTab(i)}>
                <span className={`wlev-ch-tab-icon-${uid}`} dangerouslySetInnerHTML={{ __html: tabIcons[i] }} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className={`wlev-ch-panel-${uid}`} role="tabpanel" key={activeTab}>
            {activeTab === 0 && (
              <>
                <h3 className={`wlev-ch-panel-title-${uid}`}>{tab1Title}</h3>
                {renderRichText(tab1Body, `wlev-ch-panel-body-${uid}`)}
                {renderHighlights([tab1H1, tab1H2, tab1H3, tab1H4])}
              </>
            )}
            {activeTab === 1 && (
              <>
                <h3 className={`wlev-ch-panel-title-${uid}`}>{tab2Title}</h3>
                {renderRichText(tab2Body, `wlev-ch-panel-body-${uid}`)}
                {renderHighlights([tab2H1, tab2H2, tab2H3, tab2H4])}
              </>
            )}
            {activeTab === 2 && (
              <>
                <h3 className={`wlev-ch-panel-title-${uid}`}>{tab3Title}</h3>
                {renderRichText(tab3Body, `wlev-ch-panel-body-${uid}`)}
                <div className={`wlev-ch-table-wrap-${uid}`}>
                  <table className={`wlev-ch-table-${uid}`}>
                    <thead><tr><th>Type</th><th>Location</th><th>Size</th><th>Range/hr</th><th>To 80%</th><th>Cost (80%)</th></tr></thead>
                    <tbody>
                      {chargerTable.map((row, i) => (
                        <tr key={i}><td>{row.type}</td><td>{row.location}</td><td>{row.size}</td><td>{row.range}</td><td>{row.time}</td><td>{row.cost}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');
        .wlev-ch-root-${uid} { width: 100%; }
        .wlev-ch-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; background: #1a3c3c !important; }
        .wlev-ch-inner-${uid} { max-width: 920px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 36px; }
        .wlev-ch-header-${uid} { text-align: center; display: flex; flex-direction: column; gap: 12px; max-width: 640px; }
        .wlev-ch-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #ffffff; margin: 0; line-height: 1.2; }
        .wlev-ch-subtitle-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #d1e0df; margin: 0; line-height: 1.6; }
        .wlev-ch-tabs-${uid} { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .wlev-ch-tab-${uid} { display: flex; align-items: center; gap: 8px; padding: 12px 22px; font-family: 'Rubik', sans-serif; font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 600; color: #d1e0df; background: rgba(255,255,255,0.1); border: 2px solid transparent; border-radius: 50px; cursor: pointer; transition: all 0.25s ease; }
        .wlev-ch-tab-${uid}:hover { color: #ffffff; background: rgba(255,255,255,0.15); }
        .wlev-ch-tab-active-${uid} { color: #1a3c3c; background: #ffffff; border-color: #f5b731; box-shadow: 0 4px 16px rgba(245, 183, 49, 0.2); }
        .wlev-ch-tab-icon-${uid} { display: flex; align-items: center; width: 20px; height: 20px; }
        .wlev-ch-tab-icon-${uid} svg { width: 20px; height: 20px; }
        .wlev-ch-panel-${uid} { width: 100%; background: #FFFCF0; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; padding: 44px 40px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 4px 24px rgba(26, 60, 60, 0.06); animation: wlev-ch-fade-${uid} 0.3s ease; border: solid 3px #1a3c3c; }
        @keyframes wlev-ch-fade-${uid} { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .wlev-ch-panel-title-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; color: #1a3c3c; margin: 0; line-height: 1.3; }
        .wlev-ch-panel-body-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.6vw, 1.1rem); font-weight: 400; color: #5a7a78; line-height: 1.7; margin: 0; }
        .wlev-ch-panel-body-${uid} p { margin: 0; }
        .wlev-ch-highlights-${uid} { list-style: none; padding: 0; margin: 8px 0 0; display: flex; flex-direction: column; gap: 12px; }
        .wlev-ch-highlight-${uid} { display: flex; align-items: flex-start; gap: 10px; font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.4vw, 1.05rem); color: #1a3c3c; line-height: 1.5; }
        .wlev-ch-highlight-${uid} svg { flex-shrink: 0; margin-top: 2px; }
        .wlev-ch-table-wrap-${uid} { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 8px; }
        .wlev-ch-table-${uid} { width: 100%; border-collapse: collapse; font-family: 'Rubik', sans-serif; font-size: 0.9rem; min-width: 560px; }
        .wlev-ch-table-${uid} th { text-align: left; padding: 12px 14px; font-weight: 600; color: #1a3c3c; border-bottom: 2px solid #2d5c5a; white-space: nowrap; }
        .wlev-ch-table-${uid} td { padding: 12px 14px; color: #5a7a78; border-bottom: 1px solid #e0e8e7; }
        .wlev-ch-table-${uid} tr:last-child td { border-bottom: none; font-weight: 600; color: #2d5c5a; }
        .wlev-ch-table-${uid} tr:hover td { background: rgba(245, 183, 49, 0.06); }
        @media (max-width: 640px) { .wlev-ch-section-${uid} { padding: 60px 16px; } .wlev-ch-panel-${uid} { padding: 28px 20px; } .wlev-ch-tabs-${uid} { gap: 6px; } .wlev-ch-tab-${uid} { padding: 10px 16px; } }
      `}</style>
    </div>
  );
}
