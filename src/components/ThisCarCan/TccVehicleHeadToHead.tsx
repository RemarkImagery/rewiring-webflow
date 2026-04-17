"use client";

import React, { useId, useState } from "react";

interface TccVehicleHeadToHeadProps {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  bauLabel?: string;
  crisisLabel?: string;
  footnote?: string;
  creamColor?: string;
  inkColor?: string;
  greenColor?: string;
  mutedColor?: string;
  yellowColor?: string;
}

type CostKey =
  | "maintenance"
  | "petrol"
  | "diesel"
  | "electricity"
  | "rucs"
  | "fuelCrisis";

interface Costs {
  maintenance: number;
  petrol: number;
  diesel: number;
  electricity: number;
  rucs: number;
  fuelCrisis: number;
}

interface Vehicle {
  name: string;
  type: string;
  spec: string;
  img: string;
  c: Costs;
}

interface Matchup {
  cat: string;
  ice: Vehicle;
  ev: Vehicle;
}

const CDN = "https://rewiring-fuel-worker.oj-f3d.workers.dev/cars";

const COLORS: Record<CostKey, string> = {
  maintenance: "#1B4F5E",
  petrol: "#e8927c",
  diesel: "#8B1A1A",
  electricity: "#4A90E2",
  rucs: "#A0A0A0",
  fuelCrisis: "#E89420",
};

const LABELS: Record<CostKey, string> = {
  maintenance: "Maintenance",
  petrol: "Petrol",
  diesel: "Diesel",
  electricity: "Electricity",
  rucs: "Road User Charges",
  fuelCrisis: "Fuel crisis premium",
};

const ORDER: CostKey[] = [
  "maintenance",
  "petrol",
  "diesel",
  "electricity",
  "rucs",
  "fuelCrisis",
];

const DATA: Matchup[] = [
  {
    cat: "Small car",
    ice: {
      name: "Honda Jazz", type: "Petrol", spec: "$30,700 upfront", img: `${CDN}/honda-jazz.png`,
      c: { maintenance: 1460, petrol: 2791, diesel: 0, electricity: 0, rucs: 0, fuelCrisis: 706 },
    },
    ev: {
      name: "BYD Atto 1", type: "Electric", spec: "$29,990 · 220 km range", img: `${CDN}/byd-atto-1.png`,
      c: { maintenance: 1033, petrol: 0, diesel: 0, electricity: 645, rucs: 1088, fuelCrisis: 0 },
    },
  },
  {
    cat: "Medium SUV",
    ice: {
      name: "Toyota RAV4", type: "Hybrid", spec: "$57,990 upfront", img: `${CDN}/toyota-rav4.png`,
      c: { maintenance: 1317, petrol: 2263, diesel: 0, electricity: 0, rucs: 0, fuelCrisis: 572 },
    },
    ev: {
      name: "Tesla Model Y", type: "Electric", spec: "$68,799 upfront", img: `${CDN}/tesla-model-y.png`,
      c: { maintenance: 1033, petrol: 0, diesel: 0, electricity: 597, rucs: 1088, fuelCrisis: 0 },
    },
  },
  {
    cat: "Ute",
    ice: {
      name: "Ford Ranger", type: "Diesel", spec: "$57,490 upfront", img: `${CDN}/ford-ranger.png`,
      c: { maintenance: 2076, petrol: 0, diesel: 2908, electricity: 0, rucs: 1088, fuelCrisis: 3220 },
    },
    ev: {
      name: "Geely Riddara", type: "Electric", spec: "$69,990 · 360 km range", img: `${CDN}/geely-riddara-rd6.png`,
      c: { maintenance: 1033, petrol: 0, diesel: 0, electricity: 861, rucs: 1088, fuelCrisis: 0 },
    },
  },
];

const money = (n: number) => "$" + Math.round(n).toLocaleString();

export default function TccVehicleHeadToHead(props: TccVehicleHeadToHeadProps) {
  const {
    eyebrow = "Running costs · New Zealand · 2026",
    heading = "Petrol vs electric — same category, very different running costs.",
    subtitle = "Three head-to-head matchups for popular New Zealand vehicles, based on Rewiring Aotearoa's 2026 cost model.",
    bauLabel = "Normal prices",
    crisisLabel = "2026 fuel shock",
    footnote = "Sources: Rewiring Aotearoa vehicle cost model (NZ, 2026). BAU prices: $2.63/L petrol, $1.90/L diesel, $0.26/kWh grid electricity. Fuel-shock scenario: $3.30/L petrol, $4.00/L diesel.",
    creamColor = "#FFFCF0",
    inkColor = "#1a3c3c",
    greenColor = "#2d5c5a",
    mutedColor = "#5a7a78",
    yellowColor = "#f5b731",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [scenario, setScenario] = useState<"bau" | "crisis">("bau");

  const activeKeys: CostKey[] =
    scenario === "crisis" ? ORDER : ORDER.filter((k) => k !== "fuelCrisis");

  const total = (c: Costs) =>
    activeKeys.reduce((s, k) => s + (c[k] || 0), 0);

  const miniBarSegments = (c: Costs, tot: number) =>
    activeKeys.map((k) => {
      const v = c[k] || 0;
      if (!v) return null;
      return (
        <div
          key={k}
          className={`tcc-hth-s-${uid}`}
          data-k={k}
          style={{ width: `${(v / tot) * 100}%` }}
        />
      );
    });

  const lineItems = (c: Costs) =>
    activeKeys.map((k) => {
      const v = c[k] || 0;
      if (!v) return null;
      return (
        <li key={k}>
          <span>
            <span className={`tcc-hth-dot-${uid}`} style={{ background: COLORS[k] }} />
            <span className={`tcc-hth-lbl-${uid}`}>{LABELS[k]}</span>
          </span>
          <span className={`tcc-hth-val-${uid}`}>{money(v)}</span>
        </li>
      );
    });

  const renderSide = (v: Vehicle, side: "ice" | "ev") => {
    const t = total(v.c);
    return (
      <div className={`tcc-hth-side-${uid}`}>
        <span className={`tcc-hth-tag-${uid}`} data-side={side}>
          {v.type}
        </span>
        <div className={`tcc-hth-carimg-${uid}`}>
          <img src={v.img} alt={v.name} />
        </div>
        <div className={`tcc-hth-cartitle-${uid}`}>{v.name}</div>
        <div className={`tcc-hth-carspec-${uid}`}>{v.spec}</div>
        <div className={`tcc-hth-big-${uid}`}>
          {money(t)}
          <span className={`tcc-hth-yr-${uid}`}>/yr</span>
        </div>
        <div className={`tcc-hth-costcap-${uid}`}>yearly running cost</div>
        <div className={`tcc-hth-stack-${uid}`}>
          <div className={`tcc-hth-bar-${uid}`}>{miniBarSegments(v.c, t)}</div>
          <ul className={`tcc-hth-lines-${uid}`}>{lineItems(v.c)}</ul>
        </div>
      </div>
    );
  };

  return (
    <section className={`tcc-hth-wrap-${uid}`}>
      <div className={`tcc-hth-inner-${uid}`}>
        <p className={`tcc-hth-eyebrow-${uid}`}>{eyebrow}</p>
        <h1 className={`tcc-hth-h1-${uid}`}>{heading}</h1>
        <p className={`tcc-hth-sub-${uid}`}>{subtitle}</p>

        <div className={`tcc-hth-toggle-${uid}`} role="tablist">
          <button
            className={scenario === "bau" ? `tcc-hth-on-${uid}` : ""}
            onClick={() => setScenario("bau")}
            type="button"
          >
            {bauLabel}
          </button>
          <button
            className={scenario === "crisis" ? `tcc-hth-on-${uid}` : ""}
            onClick={() => setScenario("crisis")}
            type="button"
          >
            {crisisLabel}
          </button>
        </div>

        <div>
          {DATA.map((m, i) => {
            const iceT = total(m.ice.c);
            const evT = total(m.ev.c);
            const save = iceT - evT;
            const pct = iceT > 0 ? Math.round((save / iceT) * 100) : 0;
            const shockExtra = scenario === "crisis" ? m.ice.c.fuelCrisis || 0 : 0;
            return (
              <section key={i} className={`tcc-hth-matchup-${uid}`}>
                <div className={`tcc-hth-matchhdr-${uid}`}>
                  <div className={`tcc-hth-catname-${uid}`}>{m.cat}</div>
                </div>
                <div className={`tcc-hth-card-${uid}`}>
                  <div className={`tcc-hth-grid-${uid}`}>
                    {renderSide(m.ice, "ice")}
                    <div className={`tcc-hth-vscol-${uid}`}>
                      <div className={`tcc-hth-vsbadge-${uid}`}>VS</div>
                      <div className={`tcc-hth-savecard-${uid}`}>
                        <div className={`tcc-hth-saveeyebrow-${uid}`}>EV saves</div>
                        <div className={`tcc-hth-savenum-${uid}`}>
                          {money(save)}
                          <span className={`tcc-hth-saveyr-${uid}`}>/yr</span>
                        </div>
                        <div className={`tcc-hth-savesub-${uid}`}>
                          <strong>{pct}%</strong> lower running costs
                        </div>
                      </div>
                      {shockExtra > 0 && (
                        <div className={`tcc-hth-delta-${uid}`}>
                          <span className={`tcc-hth-plus-${uid}`}>
                            +{money(shockExtra)}
                          </span>{" "}
                          from fuel shock
                        </div>
                      )}
                    </div>
                    {renderSide(m.ev, "ev")}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p className={`tcc-hth-foot-${uid}`}>{footnote}</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');

        .tcc-hth-wrap-${uid} {
          background: ${creamColor};
          color: ${inkColor};
          font-family: 'Rubik', system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          width: 100%;
        }
        .tcc-hth-wrap-${uid} * { box-sizing: border-box; }

        .tcc-hth-inner-${uid} { max-width: 1280px; margin: 0 auto; padding: 56px 28px 80px; }

        .tcc-hth-eyebrow-${uid} {
          font-size: 0.875rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${greenColor}; margin: 0 0 12px;
        }
        .tcc-hth-h1-${uid} {
          font-size: clamp(30px, 4.5vw, 48px); font-weight: 800;
          letter-spacing: -0.025em; margin: 0 0 10px; max-width: 900px; line-height: 1.05;
          color: ${inkColor};
        }
        .tcc-hth-sub-${uid} {
          color: ${mutedColor}; font-size: 1rem; max-width: 720px;
          margin: 0 0 36px; line-height: 1.55;
        }

        .tcc-hth-toggle-${uid} {
          display: inline-flex; background: #fff; border: 2px solid ${inkColor};
          border-radius: 999px; padding: 4px; margin: 0 0 28px;
          box-shadow: 2px 4px 0 ${inkColor};
        }
        .tcc-hth-toggle-${uid} button {
          border: 0; background: transparent; font: inherit; font-weight: 600;
          padding: 9px 20px; border-radius: 999px; cursor: pointer;
          color: ${inkColor}; font-size: 1rem;
        }
        .tcc-hth-toggle-${uid} button.tcc-hth-on-${uid} {
          background: ${inkColor}; color: ${creamColor};
        }

        .tcc-hth-matchup-${uid} { margin: 0 0 36px; }
        .tcc-hth-matchhdr-${uid} {
          display: flex; align-items: baseline; justify-content: space-between;
          padding: 0 10px 12px;
        }
        .tcc-hth-catname-${uid} {
          font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; color: ${inkColor};
        }

        .tcc-hth-card-${uid} {
          background: #fff; border: 2px solid ${inkColor};
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          box-shadow: 6px 8px 0 ${inkColor};
          padding: 28px 28px 24px; position: relative; overflow: hidden;
        }

        .tcc-hth-grid-${uid} {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 0;
          align-items: stretch;
        }

        .tcc-hth-side-${uid} {
          padding: 0 14px; display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }

        .tcc-hth-tag-${uid} {
          display: inline-block;
          font-size: 0.875rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; padding: 6px 14px; border-radius: 999px; margin: 0 0 14px;
        }
        .tcc-hth-tag-${uid}[data-side="ice"] { background: #fce5dc; color: #c0604d; }
        .tcc-hth-tag-${uid}[data-side="ev"]  { background: #dff0d6; color: #3a6b2a; }

        .tcc-hth-carimg-${uid} {
          height: 160px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .tcc-hth-carimg-${uid} img {
          max-height: 100%; width: auto; max-width: 100%; display: block;
        }

        .tcc-hth-cartitle-${uid} { font-size: 1.5rem; font-weight: 700; margin: 8px 0 4px; color: ${inkColor}; }
        .tcc-hth-carspec-${uid}  { font-size: 1rem; color: ${mutedColor}; letter-spacing: 0.02em; margin-bottom: 16px; }

        .tcc-hth-big-${uid} {
          font-size: clamp(36px, 5vw, 52px); font-weight: 900;
          letter-spacing: -0.035em; line-height: 1; color: ${inkColor};
          min-width: 4.8ch; font-variant-numeric: tabular-nums;
        }
        .tcc-hth-yr-${uid} {
          font-size: 1.125rem; font-weight: 600; color: ${mutedColor};
          letter-spacing: 0.02em; margin-left: 2px;
        }
        .tcc-hth-costcap-${uid} {
          font-size: 0.9375rem; color: ${mutedColor}; letter-spacing: 0.1em;
          text-transform: uppercase; margin: 6px 0 22px; font-weight: 600;
        }

        .tcc-hth-stack-${uid} { width: 100%; max-width: 440px; margin: 0 auto; padding: 0 30px; box-sizing: border-box; }
        .tcc-hth-bar-${uid} {
          display: flex; width: 100%; height: 20px; border-radius: 8px;
          overflow: hidden; border: 2px solid ${inkColor};
        }
        .tcc-hth-s-${uid} { height: 100%; }
        .tcc-hth-s-${uid}[data-k="maintenance"] { background: ${COLORS.maintenance}; }
        .tcc-hth-s-${uid}[data-k="petrol"]      { background: ${COLORS.petrol}; }
        .tcc-hth-s-${uid}[data-k="diesel"]      { background: ${COLORS.diesel}; }
        .tcc-hth-s-${uid}[data-k="electricity"] { background: ${COLORS.electricity}; }
        .tcc-hth-s-${uid}[data-k="rucs"]        { background: ${COLORS.rucs}; }
        .tcc-hth-s-${uid}[data-k="fuelCrisis"]  {
          background: repeating-linear-gradient(135deg, ${COLORS.fuelCrisis}, ${COLORS.fuelCrisis} 5px, #f5a848 5px 10px);
        }

        .tcc-hth-lines-${uid} {
          margin: 16px 0 0; padding: 0; font-size: 1.125rem;
          color: ${inkColor}; text-align: left; list-style: none;
        }
        .tcc-hth-lines-${uid} li {
          display: flex; justify-content: space-between; padding: 8px 0; list-style: none;
        }
        .tcc-hth-dot-${uid} {
          width: 14px; height: 14px; border-radius: 3px;
          display: inline-block; margin-right: 10px; vertical-align: -2px;
        }
        .tcc-hth-lbl-${uid} { color: ${mutedColor}; font-weight: 500; }
        .tcc-hth-val-${uid} { color: ${inkColor}; font-weight: 700; font-variant-numeric: tabular-nums; }

        .tcc-hth-vscol-${uid} {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 0 18px; width: 260px; flex-shrink: 0; text-align: center;
        }
        .tcc-hth-vsbadge-${uid} {
          background: ${inkColor}; color: ${creamColor};
          font-size: 1.125rem; font-weight: 800; letter-spacing: 0.24em;
          width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          box-shadow: 3px 4px 0 ${yellowColor};
          text-indent: 0.24em;
        }
        .tcc-hth-savecard-${uid} {
          background: ${yellowColor}; border: 2px solid ${inkColor};
          border-radius: 14px; padding: 16px 14px 18px;
          box-shadow: 3px 4px 0 ${inkColor};
          width: 100%; max-width: 240px; min-width: 200px; box-sizing: border-box;
        }
        .tcc-hth-saveeyebrow-${uid} {
          font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${inkColor};
        }
        .tcc-hth-savenum-${uid} {
          font-size: clamp(28px, 2.8vw, 36px); font-weight: 900;
          letter-spacing: -0.03em; color: ${inkColor}; line-height: 1.05;
          margin: 6px 0 6px; font-variant-numeric: tabular-nums; white-space: nowrap;
        }
        .tcc-hth-saveyr-${uid} {
          font-size: 0.45em; font-weight: 600; color: ${inkColor}; letter-spacing: 0.02em;
        }
        .tcc-hth-savesub-${uid} { font-size: 1rem; color: ${inkColor}; font-weight: 600; line-height: 1.3; }
        .tcc-hth-savesub-${uid} strong { color: #c0604d; }
        .tcc-hth-delta-${uid} {
          display: inline-block; margin-top: 10px;
          background: ${inkColor}; color: ${creamColor};
          font-size: 0.875rem; font-weight: 700; padding: 5px 10px;
          border-radius: 6px; font-variant-numeric: tabular-nums; letter-spacing: 0.01em;
        }
        .tcc-hth-plus-${uid} { color: ${COLORS.fuelCrisis}; }

        .tcc-hth-foot-${uid} {
          font-size: 0.9375rem; color: ${mutedColor};
          margin: 28px 0 0; line-height: 1.6; max-width: 800px;
        }

        @media (max-width: 900px) {
          .tcc-hth-grid-${uid} { grid-template-columns: 1fr; }
          .tcc-hth-vscol-${uid} {
            flex-direction: row; gap: 14px; padding: 18px 0;
            justify-content: center; width: 100%;
          }
          .tcc-hth-vsbadge-${uid} { margin-bottom: 0; }
          .tcc-hth-savecard-${uid} { max-width: none; flex: 1; }
          .tcc-hth-card-${uid} { padding: 22px 18px; }
          .tcc-hth-side-${uid} { padding: 14px 0; }
        }
      `}</style>
    </section>
  );
}
