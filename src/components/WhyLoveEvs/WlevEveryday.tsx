"use client";

import React, { useId, useState } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevEverydayProps {
  heading?: string;
  subtitle?: string;
  tab1Label?: string;
  tab1Stat?: string;
  tab1StatLabel?: string;
  tab1Body?: string;
  tab2Label?: string;
  tab2Stat?: string;
  tab2StatLabel?: string;
  tab2Body?: string;
  tab3Label?: string;
  tab3Stat?: string;
  tab3StatLabel?: string;
  tab3Body?: string;
  tab4Label?: string;
  tab4Stat?: string;
  tab4StatLabel?: string;
  tab4Body?: string;
  bgColor?: string;
}

const icons = [
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l-3.5 4L8 8l-5 6h18z"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
];

export default function WlevEveryday(props: WlevEverydayProps) {
  const {
    heading = "Built for Everyday Life",
    subtitle = "EVs go further than most Kiwis drive in a typical day \u2014 or week.",
    tab1Label = "Range",
    tab1Stat = "300\u2013500km",
    tab1StatLabel = "range from a full charge",
    tab1Body = "Around 90% of trips are under 90km, and the average trip is just 20km. Most drivers cover about 270km per week. Modern EVs comfortably exceed this \u2014 giving you more than enough for commuting, errands, kids\u2019 activities and trips to the bach.",
    tab2Label = "Commute",
    tab2Stat = "$1,500",
    tab2StatLabel = "for a second-hand Nissan Leaf",
    tab2Body = "The most affordable EVs handle everyday driving with ease. The original Nissan Leaf \u2014 the OG of NZ\u2019s EV scene \u2014 can be picked up from just $1,500 second-hand. It\u2019s one of the cheapest ways to electrify your commute.",
    tab3Label = "Hills & Roads",
    tab3Stat = "85\u201390%",
    tab3StatLabel = "motor efficiency",
    tab3Body = "EVs deliver power instantly \u2014 excellent hill-climbing, smooth acceleration and strong performance on varied terrain. With regenerative braking that recovers energy on descents, they\u2019re perfectly suited for New Zealand\u2019s hilly landscapes. Petrol engines? Just 20\u201330% efficient.",
    tab4Label = "Fun & Fast",
    tab4Stat = "2.3s",
    tab4StatLabel = "0\u2013100km/h (Porsche Taycan)",
    tab4Body = "Ask any EV owner \u2014 driving electric is just more fun. F1 cars average 2.6 seconds to 100km/h. The Porsche Taycan does it in 2.3s. The Tesla 3 Performance ($89,990) takes just 3.1 seconds. Instant torque, no matter the size of the car.",
    bgColor = "#2d5c5a",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: tab1Label, stat: tab1Stat, statLabel: tab1StatLabel, body: tab1Body },
    { label: tab2Label, stat: tab2Stat, statLabel: tab2StatLabel, body: tab2Body },
    { label: tab3Label, stat: tab3Stat, statLabel: tab3StatLabel, body: tab3Body },
    { label: tab4Label, stat: tab4Stat, statLabel: tab4StatLabel, body: tab4Body },
  ];

  const tab = tabs[activeTab];

  return (
    <div className={`wlev-ed-root-${uid}`}>
      <section className={`wlev-ed-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-ed-inner-${uid}`}>
          <div className={`wlev-ed-header-${uid}`}>
            <h2 className={`wlev-ed-heading-${uid}`}>{heading}</h2>
            <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-ed-squiggle-${uid}`} />
            <p className={`wlev-ed-subtitle-${uid}`}>{subtitle}</p>
          </div>

          <div className={`wlev-ed-tabs-${uid}`} role="tablist">
            {tabs.map((t, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeTab === i}
                className={`wlev-ed-tab-${uid}${activeTab === i ? ` wlev-ed-tab-active-${uid}` : ""}`}
                onClick={() => setActiveTab(i)}
              >
                <span className={`wlev-ed-tab-icon-${uid}`} dangerouslySetInnerHTML={{ __html: icons[i] }} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className={`wlev-ed-panel-${uid}`} role="tabpanel" key={activeTab}>
            <div className={`wlev-ed-panel-stat-${uid}`}>
              <span className={`wlev-ed-panel-stat-num-${uid}`}>{tab.stat}</span>
              <span className={`wlev-ed-panel-stat-label-${uid}`}>{tab.statLabel}</span>
            </div>
            {renderRichText(tab.body, `wlev-ed-panel-body-${uid}`)}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .wlev-ed-root-${uid} { width: 100%; }
        .wlev-ed-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; }
        .wlev-ed-inner-${uid} { max-width: 860px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 36px; }
        .wlev-ed-header-${uid} { text-align: center; display: flex; flex-direction: column; gap: 12px; max-width: 640px; }
        .wlev-ed-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #ffffff; margin: 0; line-height: 1.2; }
        .wlev-ed-subtitle-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #d1e0df; margin: 0; line-height: 1.6; }
        .wlev-ed-tabs-${uid} { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .wlev-ed-tab-${uid} { display: flex; align-items: center; gap: 8px; padding: 12px 22px; font-family: 'Rubik', sans-serif; font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 600; color: #d1e0df; background: rgba(255,255,255,0.1); border: 2px solid transparent; border-radius: 50px; cursor: pointer; transition: all 0.25s ease; }
        .wlev-ed-tab-${uid}:hover { color: #ffffff; background: rgba(255,255,255,0.15); }
        .wlev-ed-tab-active-${uid} { color: #1a3c3c; background: #ffffff; border-color: #f5b731; box-shadow: 0 4px 16px rgba(245, 183, 49, 0.2); }
        .wlev-ed-tab-icon-${uid} { display: flex; align-items: center; width: 20px; height: 20px; }
        .wlev-ed-tab-icon-${uid} svg { width: 20px; height: 20px; }
        .wlev-ed-panel-${uid} { width: 100%; background: #FFFCF0; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; padding: 48px 44px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 4px 24px rgba(26, 60, 60, 0.06); animation: wlev-ed-fadein-${uid} 0.3s ease; border: solid 3px #1a3c3c; }
        @keyframes wlev-ed-fadein-${uid} { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .wlev-ed-panel-stat-${uid} { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        .wlev-ed-panel-stat-num-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; color: #f5b731; line-height: 1.1; }
        .wlev-ed-panel-stat-label-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.5vw, 1.1rem); font-weight: 400; color: #5a7a78; }
        .wlev-ed-panel-body-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.6vw, 1.1rem); font-weight: 400; color: #1a3c3c; line-height: 1.7; margin: 0; }
        .wlev-ed-panel-body-${uid} p { margin: 0 0 8px; }
        .wlev-ed-panel-body-${uid} p:last-child { margin-bottom: 0; }

        .wlev-ed-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }

        @media (max-width: 640px) {
          .wlev-ed-section-${uid} { padding: 60px 16px; }
          .wlev-ed-panel-${uid} { padding: 32px 24px; }
          .wlev-ed-tabs-${uid} { gap: 6px; }
          .wlev-ed-tab-${uid} { padding: 10px 16px; font-size: 0.88rem; }
        }
      `}</style>
    </div>
  );
}
