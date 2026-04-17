"use client";

import React, { useId, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";

interface TccVehicleCostChartProps {
  heading?: string;
  subtitle?: string;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  mutedColor?: string;
  gridColor?: string;
  colorMaintenance?: string;
  colorPetrol?: string;
  colorDiesel?: string;
  colorElectricity?: string;
  colorRucs?: string;
  colorFuelCrisis?: string;
}

type CostKey =
  | "maintenance"
  | "petrol"
  | "diesel"
  | "electricity"
  | "rucs"
  | "fuelCrisis";

interface Row {
  name: string;
  maintenance: number;
  petrol: number;
  diesel: number;
  electricity: number;
  rucs: number;
  fuelCrisis: number;
  total: string;
  image: string;
}

const CDN = "https://rewiring-fuel-worker.oj-f3d.workers.dev/cars";

const DATA: Row[] = [
  { name: "Honda Jazz\n(petrol)",          maintenance: 1460, petrol: 2791, diesel: 0,    electricity: 0,   rucs: 0,    fuelCrisis: 706,  total: "$4,957 (+$706)",   image: `${CDN}/honda-jazz.png` },
  { name: "BYD Atto 1\n(electric)",        maintenance: 1033, petrol: 0,    diesel: 0,    electricity: 645, rucs: 1088, fuelCrisis: 0,    total: "$2,766 (+$0)",     image: `${CDN}/byd-atto-1.png` },
  { name: "Toyota RAV4\n(hybrid)",         maintenance: 1317, petrol: 2263, diesel: 0,    electricity: 0,   rucs: 0,    fuelCrisis: 572,  total: "$4,152 (+$572)",   image: `${CDN}/toyota-rav4.png` },
  { name: "Tesla Model Y\n(electric)",     maintenance: 1033, petrol: 0,    diesel: 0,    electricity: 597, rucs: 1088, fuelCrisis: 0,    total: "$2,718 (+$0)",     image: `${CDN}/tesla-model-y.png` },
  { name: "Ford Ranger\n(diesel)",         maintenance: 2076, petrol: 0,    diesel: 2908, electricity: 0,   rucs: 1088, fuelCrisis: 3220, total: "$9,292 (+$3,220)", image: `${CDN}/ford-ranger.png` },
  { name: "Geely Riddara RD6\n(electric)", maintenance: 1033, petrol: 0,    diesel: 0,    electricity: 861, rucs: 1088, fuelCrisis: 0,    total: "$2,983 (+$0)",     image: `${CDN}/geely-riddara-rd6.png` },
];

const STACK_ORDER: CostKey[] = [
  "maintenance",
  "petrol",
  "diesel",
  "electricity",
  "rucs",
  "fuelCrisis",
];

const money = (n: number) => "$" + Number(n).toLocaleString();

const topKeyFor = (row: Row): CostKey =>
  [...STACK_ORDER].reverse().find((k) => row[k] > 0) as CostKey;

export default function TccVehicleCostChart(props: TccVehicleCostChartProps) {
  const {
    heading = "Yearly vehicle operating cost comparison",
    subtitle = "BAU prices: $2.63/L for petrol, $1.90/L for diesel, $0.26/kWh for grid electricity. Fuel shock prices: $3.30/L for petrol, $4/L for diesel.",
    bgColor = "#fdfaf1",
    cardColor = "#ffffff",
    inkColor = "#0b0b0b",
    mutedColor = "#6b6b6b",
    gridColor = "#e3e3e3",
    colorMaintenance = "#1B4F5E",
    colorPetrol = "#E88B8B",
    colorDiesel = "#8B1A1A",
    colorElectricity = "#4A90E2",
    colorRucs = "#A0A0A0",
    colorFuelCrisis = "#E89420",
  } = props;

  const uid = useId().replace(/:/g, "");

  const COLORS: Record<CostKey, string> = {
    maintenance: colorMaintenance,
    petrol: colorPetrol,
    diesel: colorDiesel,
    electricity: colorElectricity,
    rucs: colorRucs,
    fuelCrisis: colorFuelCrisis,
  };

  const LABELS: Record<CostKey, string> = {
    maintenance: "Maintenance",
    petrol: "Petrol (2026)",
    diesel: "Diesel",
    electricity: "Electricity",
    rucs: "RUCs (2026)",
    fuelCrisis: "Fuel crisis premium",
  };

  const legendOrder: { key: CostKey; label: string }[] = [
    { key: "fuelCrisis",  label: LABELS.fuelCrisis },
    { key: "rucs",        label: LABELS.rucs },
    { key: "electricity", label: LABELS.electricity },
    { key: "diesel",      label: LABELS.diesel },
    { key: "petrol",      label: LABELS.petrol },
    { key: "maintenance", label: LABELS.maintenance },
  ];

  const [activeKey, setActiveKey] = useState<CostKey | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sticky, setSticky] = useState(false);

  const activate = (key: CostKey, idx: number | null, makeSticky: boolean) => {
    setActiveKey(key);
    setActiveIndex(idx);
    if (makeSticky) setSticky(true);
  };
  const clear = () => { setActiveKey(null); setActiveIndex(null); setSticky(false); };

  const dim = (key: CostKey, idx: number) => {
    if (activeKey == null) return 1;
    if (activeKey === key && (activeIndex == null || activeIndex === idx)) return 1;
    return 0.35;
  };

  const handleBarEnter = (key: CostKey, idx: number) => { if (!sticky) activate(key, idx, false); };
  const handleBarLeave = () => { if (!sticky) clear(); };
  const handleBarClick = (key: CostKey, idx: number) => {
    if (sticky && activeKey === key && activeIndex === idx) clear();
    else activate(key, idx, true);
  };

  const yFmt = (v: number) => "$" + v.toLocaleString();

  const CAR_IMG_W = 120;
  const CAR_IMG_H = 80;

  const MultiLineTick = (tickProps: any) => {
    const { x, y, payload, index } = tickProps;
    const lines = String(payload.value).split("\n");
    const row = DATA[index];
    const imgSrc = row?.image;
    return (
      <g transform={`translate(${x},${y + 12})`}>
        {lines.map((ln, i) => (
          <text
            key={i}
            x={0}
            y={i * 16}
            textAnchor="middle"
            fill={inkColor}
            fontFamily="Rubik, sans-serif"
            fontSize="13"
            fontWeight={600}
          >
            {ln}
          </text>
        ))}
        {imgSrc && (
          <image
            href={imgSrc}
            x={-CAR_IMG_W / 2}
            y={lines.length * 16 + 6}
            width={CAR_IMG_W}
            height={CAR_IMG_H}
            preserveAspectRatio="xMidYMid meet"
          />
        )}
      </g>
    );
  };

  const TotalLabel = (labelProps: any) => {
    const { x, y, width, index } = labelProps;
    const d = DATA[index];
    if (!d) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        textAnchor="middle"
        fill={inkColor}
        fontFamily="Rubik, sans-serif"
        fontSize="16"
        fontWeight={600}
      >
        {d.total}
      </text>
    );
  };

  const SegmentTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length || !activeKey) return null;
    const row = payload[0].payload as Row;
    const value = row[activeKey];
    if (!value) return null;
    const total =
      row.maintenance + row.petrol + row.diesel + row.electricity + row.rucs + row.fuelCrisis;
    const pct = Math.round((value / total) * 100);
    return (
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 8,
          fontFamily: "Rubik, sans-serif",
          fontSize: 13,
          lineHeight: 1.45,
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          pointerEvents: "none",
          minWidth: 180,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{row.name.replace("\n", " ")}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: COLORS[activeKey],
              display: "inline-block",
            }}
          />
          <span style={{ flex: 1 }}>{LABELS[activeKey]}</span>
          <span style={{ fontWeight: 600 }}>{money(value)}</span>
        </div>
        <div style={{ color: "#bbb", fontSize: 11, marginTop: 4 }}>
          {pct}% of total · {row.total}
        </div>
      </div>
    );
  };

  const renderBar = (key: CostKey, isFuelCrisis = false) => (
    <Bar
      key={key}
      dataKey={key}
      stackId="a"
      isAnimationActive={false}
      onMouseEnter={(_: any, idx: number) => handleBarEnter(key, idx)}
      onMouseLeave={handleBarLeave}
      onClick={(_: any, idx: number) => handleBarClick(key, idx)}
      shape={(shapeProps: any) => {
        const { x, y, width, height, index } = shapeProps;
        if (!height) return <g />;
        const isTop = isFuelCrisis || topKeyFor(DATA[index]) === key;
        const r = isTop ? 6 : 0;
        const opacity = dim(key, index);
        if (r) {
          const path = `M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} L${x},${y + height} Z`;
          return (
            <path
              d={path}
              fill={COLORS[key]}
              opacity={opacity}
              style={{ transition: "opacity 120ms" }}
            />
          );
        }
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={COLORS[key]}
            opacity={opacity}
            style={{ transition: "opacity 120ms" }}
          />
        );
      }}
    >
      {isFuelCrisis && <LabelList dataKey="total" content={<TotalLabel />} />}
    </Bar>
  );

  return (
    <section className={`tcc-vcc-wrap-${uid}`}>
      <div className={`tcc-vcc-inner-${uid}`}>
        <h1 className={`tcc-vcc-h1-${uid}`}>{heading}</h1>
        <div className={`tcc-vcc-legend-${uid}`}>
          {legendOrder.map((l) => (
            <div
              className={`tcc-vcc-legend-item-${uid}`}
              key={l.key}
              data-dim={activeKey != null && activeKey !== l.key}
              onClick={() => {
                if (activeKey === l.key && sticky) clear();
                else {
                  setActiveKey(l.key);
                  setActiveIndex(null);
                  setSticky(true);
                }
              }}
            >
              <span
                className={`tcc-vcc-swatch-${uid}`}
                style={{ background: COLORS[l.key] }}
              />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
        <div
          className={`tcc-vcc-card-${uid}`}
          onClick={(e) => {
            if (e.target === e.currentTarget && sticky) clear();
          }}
        >
          <div className={`tcc-vcc-scroll-${uid}`}>
            <div className={`tcc-vcc-chart-${uid}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DATA}
                  margin={{ top: 40, right: 24, left: 0, bottom: 110 }}
                  barCategoryGap="22%"
                >
                  <CartesianGrid stroke={gridColor} strokeDasharray="6 6" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={{ stroke: "#000", strokeWidth: 1.5 }}
                    interval={0}
                    tick={<MultiLineTick />}
                    height={110}
                  />
                  <YAxis
                    tickFormatter={yFmt}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 10000]}
                    ticks={[0, 2500, 5000, 7500, 10000]}
                    width={60}
                    tick={{ fontFamily: "Rubik, sans-serif", fontSize: 12, fill: inkColor } as any}
                  />
                  <Tooltip
                    cursor={false}
                    wrapperStyle={{ outline: "none" }}
                    content={<SegmentTooltip />}
                  />
                  {renderBar("maintenance")}
                  {renderBar("petrol")}
                  {renderBar("diesel")}
                  {renderBar("electricity")}
                  {renderBar("rucs")}
                  {renderBar("fuelCrisis", true)}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <p className={`tcc-vcc-sub-${uid}`}>{subtitle}</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tcc-vcc-wrap-${uid} {
          background: ${bgColor};
          color: ${inkColor};
          font-family: 'Rubik', system-ui, sans-serif;
          width: 100%;
          -webkit-text-size-adjust: 100%;
        }
        .tcc-vcc-wrap-${uid} * { box-sizing: border-box; }

        .tcc-vcc-inner-${uid} {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px 64px;
        }

        .tcc-vcc-h1-${uid} {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
          color: ${inkColor};
        }

        .tcc-vcc-sub-${uid} {
          color: ${mutedColor};
          font-size: 13px;
          margin: 14px 0 0;
          max-width: 1100px;
        }

        .tcc-vcc-legend-${uid} {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
          margin: 0 0 16px;
          font-size: 13px;
        }

        .tcc-vcc-legend-item-${uid} {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .tcc-vcc-legend-item-${uid}[data-dim="true"] { opacity: 0.35; }

        .tcc-vcc-swatch-${uid} {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          display: inline-block;
          flex-shrink: 0;
        }

        .tcc-vcc-card-${uid} {
          background: ${cardColor};
          border-radius: 10px;
          padding: 16px 20px 24px;
          box-shadow: 0 1px 0 rgba(0,0,0,0.04);
          touch-action: manipulation;
        }

        .tcc-vcc-scroll-${uid} {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
          touch-action: pan-x;
        }

        .tcc-vcc-chart-${uid} {
          min-width: 720px;
          height: 560px;
        }

        .tcc-vcc-wrap-${uid} .recharts-cartesian-axis-tick-value {
          font-family: 'Rubik', sans-serif;
          font-size: 12px;
        }
        .tcc-vcc-wrap-${uid} .recharts-bar-rectangle { cursor: pointer; }

        @media (max-width: 780px) {
          .tcc-vcc-inner-${uid} { padding: 20px 16px 40px; }
          .tcc-vcc-h1-${uid} { font-size: 22px; }
          .tcc-vcc-sub-${uid} { font-size: 12px; }
          .tcc-vcc-legend-${uid} { font-size: 12px; gap: 8px 16px; }
          .tcc-vcc-swatch-${uid} { width: 12px; height: 12px; }
          .tcc-vcc-card-${uid} { padding: 12px 10px 16px; }
          .tcc-vcc-chart-${uid} { height: 480px; min-width: 720px; }
        }
        @media (max-width: 480px) {
          .tcc-vcc-h1-${uid} { font-size: 20px; }
          .tcc-vcc-chart-${uid} { height: 440px; min-width: 720px; }
        }
      `}</style>
    </section>
  );
}
