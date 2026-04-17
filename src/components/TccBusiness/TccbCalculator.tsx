"use client";

import React, { useId, useState, useEffect, useRef, useCallback } from "react";

interface TccbCalculatorProps {
  heading?: string;
  currentBevSales?: number;
  targetBevSales?: number;
  fuelSavingPerVehicle?: number;
  co2PerVehicle?: number;
  bgColor?: string;
}

export default function TccbCalculator(props: TccbCalculatorProps) {
  const {
    heading = "See What 25% Could Save Your Business",
    currentBevSales = 9173,
    targetBevSales = 26000,
    fuelSavingPerVehicle = 2500,
    co2PerVehicle = 2.4,
    bgColor = "#ffffff",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [fleetSize, setFleetSize] = useState(20);
  const donutRef = useRef<SVGCircleElement>(null);
  const donutWrapRef = useRef<HTMLDivElement>(null);
  const [donutAnimated, setDonutAnimated] = useState(false);
  const [donutProgress, setDonutProgress] = useState(0);

  // Calculations
  const bevCount = Math.round(fleetSize * 0.25);
  const annualSavings = bevCount * fuelSavingPerVehicle;
  const lifetimeSavings = annualSavings * 8;
  const co2Reduction = bevCount * co2PerVehicle;

  // Donut chart math
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const bevRatio = currentBevSales / targetBevSales;
  const targetOffset = circumference - circumference * bevRatio * donutProgress;

  // Stat tiles data
  const statTiles = [
    { value: "$40M/day", label: "spent on imported fuel" },
    { value: "$19,000", label: "saved per ICE→BEV replacement" },
    { value: "$494M", label: "saved at 26,000 new BEV sales" },
    { value: "7M tonnes", label: "CO₂ cut by 2035" },
  ];

  // Donut scroll animation
  useEffect(() => {
    const el = donutWrapRef.current;
    if (!el || donutAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !donutAnimated) {
            setDonutAnimated(true);
            observer.disconnect();

            const duration = 1400;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDonutProgress(eased);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [donutAnimated]);

  const fmt = useCallback((n: number) => n.toLocaleString("en-NZ"), []);

  return (
    <div className={`tccb-calc-root-${uid}`}>
      <section className={`tccb-calc-section-${uid}`} style={{ background: bgColor }}>
        {/* ───── Part 1: Calculator ───── */}
        <div className={`tccb-calc-top-${uid}`}>
          <div className={`tccb-calc-panel-${uid}`}>
            <h2 className={`tccb-calc-heading-${uid}`}>{heading}</h2>

            <label className={`tccb-calc-slider-label-${uid}`}>
              How many vehicles does your fleet buy per year?
            </label>

            <div className={`tccb-calc-slider-wrap-${uid}`}>
              <input
                type="range"
                min={1}
                max={500}
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className={`tccb-calc-range-${uid}`}
              />
              <span className={`tccb-calc-slider-val-${uid}`}>{fmt(fleetSize)}</span>
            </div>

            <div className={`tccb-calc-results-${uid}`}>
              <div className={`tccb-calc-result-card-${uid}`}>
                <span className={`tccb-calc-result-num-${uid}`}>{fmt(bevCount)}</span>
                <span className={`tccb-calc-result-lbl-${uid}`}>
                  BEVs per year at 25% electric
                </span>
              </div>
              <div className={`tccb-calc-result-card-${uid}`}>
                <span className={`tccb-calc-result-num-${uid}`}>
                  ${fmt(annualSavings)}
                </span>
                <span className={`tccb-calc-result-lbl-${uid}`}>
                  Annual fuel savings
                </span>
              </div>
              <div className={`tccb-calc-result-card-${uid}`}>
                <span className={`tccb-calc-result-num-${uid}`}>
                  ${fmt(lifetimeSavings)}
                </span>
                <span className={`tccb-calc-result-lbl-${uid}`}>
                  Lifetime savings (8 yr fleet life)
                </span>
              </div>
              <div className={`tccb-calc-result-card-${uid}`}>
                <span className={`tccb-calc-result-num-${uid}`}>
                  {co2Reduction.toFixed(1)}
                </span>
                <span className={`tccb-calc-result-lbl-${uid}`}>
                  tonnes CO₂ reduced / year
                </span>
              </div>
            </div>
          </div>

          {/* ───── Part 3: Donut Chart ───── */}
          <div className={`tccb-calc-donut-wrap-${uid}`} ref={donutWrapRef}>
            <svg
              className={`tccb-calc-donut-svg-${uid}`}
              viewBox="0 0 220 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#d1e0df"
                strokeWidth="22"
              />
              {/* Filled ring */}
              <circle
                ref={donutRef}
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#2d5c5a"
                strokeWidth="22"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={targetOffset}
                transform="rotate(-90 110 110)"
                style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
              />
            </svg>
            <div className={`tccb-calc-donut-center-${uid}`}>
              <span className={`tccb-calc-donut-current-${uid}`}>
                {fmt(currentBevSales)}
              </span>
              <span className={`tccb-calc-donut-sep-${uid}`}>/</span>
              <span className={`tccb-calc-donut-target-${uid}`}>
                {fmt(targetBevSales)}
              </span>
            </div>
            <p className={`tccb-calc-donut-label-${uid}`}>
              Current vs Target Annual BEV Sales
            </p>
          </div>
        </div>

        {/* ───── Part 2: Stat Tiles ───── */}
        <div className={`tccb-calc-tiles-${uid}`}>
          {statTiles.map((tile, i) => (
            <div key={i} className={`tccb-calc-tile-${uid}`}>
              <span className={`tccb-calc-tile-val-${uid}`}>{tile.value}</span>
              <span className={`tccb-calc-tile-lbl-${uid}`}>{tile.label}</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        /* ── Root ── */
        .tccb-calc-root-${uid} {
          width: 100%;
        }

        .tccb-calc-section-${uid} {
          width: 100%;
          padding: 80px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 56px;
        }

        /* ── Top row: calculator + donut ── */
        .tccb-calc-top-${uid} {
          width: 100%;
          max-width: 1120px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Calculator Panel ── */
        .tccb-calc-panel-${uid} {
          background: #FFFCF0;
          border-radius: 24px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          box-shadow: 0 4px 24px rgba(26, 60, 60, 0.06);
        }

        .tccb-calc-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccb-calc-slider-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
        }

        /* ── Slider ── */
        .tccb-calc-slider-wrap-${uid} {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .tccb-calc-range-${uid} {
          flex: 1;
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #2d5c5a, #5a7a78);
          outline: none;
          cursor: pointer;
        }

        .tccb-calc-range-${uid}::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f5b731;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(245, 183, 49, 0.45);
          cursor: grab;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .tccb-calc-range-${uid}::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(245, 183, 49, 0.55);
        }

        .tccb-calc-range-${uid}::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
        }

        .tccb-calc-range-${uid}::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f5b731;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(245, 183, 49, 0.45);
          cursor: grab;
        }

        .tccb-calc-range-${uid}::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #2d5c5a, #5a7a78);
        }

        .tccb-calc-slider-val-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 700;
          color: #2d5c5a;
          min-width: 56px;
          text-align: right;
        }

        /* ── Results Grid ── */
        .tccb-calc-results-${uid} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .tccb-calc-result-card-${uid} {
          background: #ffffff;
          border: 1px solid rgba(45, 92, 90, 0.1);
          border-radius: 16px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .tccb-calc-result-card-${uid}:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 60, 60, 0.08);
        }

        .tccb-calc-result-num-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 700;
          color: #1a3c3c;
          line-height: 1.1;
          transition: transform 0.2s ease;
        }

        .tccb-calc-result-lbl-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.8rem, 1.2vw, 0.92rem);
          font-weight: 400;
          color: #5a7a78;
          line-height: 1.4;
        }

        /* ── Donut Chart ── */
        .tccb-calc-donut-wrap-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          align-self: center;
        }

        .tccb-calc-donut-svg-${uid} {
          width: clamp(200px, 22vw, 280px);
          height: auto;
        }

        .tccb-calc-donut-center-${uid} {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          display: flex;
          align-items: baseline;
          gap: 4px;
          pointer-events: none;
        }

        .tccb-calc-donut-current-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          font-weight: 700;
          color: #2d5c5a;
        }

        .tccb-calc-donut-sep-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0 2px;
        }

        .tccb-calc-donut-target-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          font-weight: 400;
          color: #5a7a78;
        }

        .tccb-calc-donut-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          font-weight: 400;
          color: #5a7a78;
          text-align: center;
          margin: 0;
          line-height: 1.4;
        }

        /* ── Stat Tiles ── */
        .tccb-calc-tiles-${uid} {
          width: 100%;
          max-width: 1120px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .tccb-calc-tile-${uid} {
          background: #f5b731;
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .tccb-calc-tile-${uid}:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(245, 183, 49, 0.35);
        }

        .tccb-calc-tile-val-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 700;
          color: #1a3c3c;
          line-height: 1.1;
        }

        .tccb-calc-tile-lbl-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.82rem, 1.2vw, 0.95rem);
          font-weight: 400;
          color: #234e4c;
          line-height: 1.4;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .tccb-calc-top-${uid} {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .tccb-calc-donut-wrap-${uid} {
            order: 2;
          }

          .tccb-calc-tiles-${uid} {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .tccb-calc-section-${uid} {
            padding: 48px 16px;
            gap: 40px;
          }

          .tccb-calc-panel-${uid} {
            padding: 32px 20px;
            gap: 22px;
          }

          .tccb-calc-results-${uid} {
            grid-template-columns: 1fr;
          }

          .tccb-calc-tiles-${uid} {
            grid-template-columns: 1fr;
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 14px;
            padding-bottom: 8px;
          }

          .tccb-calc-tile-${uid} {
            min-width: 220px;
            scroll-snap-align: start;
            flex-shrink: 0;
          }

          .tccb-calc-slider-wrap-${uid} {
            flex-direction: column;
            gap: 8px;
            align-items: stretch;
          }

          .tccb-calc-slider-val-${uid} {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tccb-calc-result-card-${uid},
          .tccb-calc-tile-${uid} {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
