"use client";

/* Ported from the Electrifying-[region] report prototype. Recharts 3. */
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Tooltip,
  ComposedChart,
  Area,
  Line,
  Legend,
} from "recharts";
import type { District } from "./districtData";

const fmt =
  (prefix?: string, suffix?: string) =>
  (n: any) =>
    (prefix || "") + Number(n).toLocaleString("en-NZ") + (suffix || "");

const MultiLineTick = ({ x, y, payload }: any) => {
  const lines = String(payload.value).split("\n");
  return (
    <g transform={`translate(${x},${y + 12})`}>
      {lines.map((ln: string, i: number) => (
        <text key={i} x={0} y={i * 16} textAnchor="middle" fill="#1a3c3c" fontFamily="Rubik" fontSize="13" fontWeight={600}>
          {ln}
        </text>
      ))}
    </g>
  );
};

const TotalLabel = ({ x, y, width, index, data }: any) => {
  const d = data[index];
  if (!d || !d.total) return null;
  return (
    <text x={x + width / 2} y={y - 10} textAnchor="middle" fill="#1a3c3c" fontFamily="Rubik" fontSize="15" fontWeight={700}>
      {d.total}
    </text>
  );
};

/* ─── Vertical stacked bar (bills + lifetime-savings) ─── */
export function StackedBarChart({ cfg }: { cfg: any; id?: string }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [sticky, setSticky] = useState(false);
  const COLORS: any = Object.fromEntries(cfg.segments.map((s: any) => [s.key, s.color]));
  const LABELS: any = Object.fromEntries(cfg.segments.map((s: any) => [s.key, s.label]));
  const STACK = cfg.segments.map((s: any) => s.key);
  const fmtVal = fmt(cfg.valuePrefix, cfg.valueSuffix);
  const topKey = (row: any) => [...STACK].reverse().find((k) => row[k] > 0);
  const rowTotal = (row: any) => STACK.reduce((a: number, k: string) => a + (row[k] || 0), 0);

  const clear = () => {
    setActiveKey(null);
    setSticky(false);
  };
  const dim = (key: string) => (activeKey == null ? 1 : activeKey === key ? 1 : 0.35);

  const SegTip = ({ active, payload }: any) => {
    if (!active || !payload?.length || !activeKey) return null;
    const row = payload[0].payload;
    const val = row[activeKey];
    if (!val) return null;
    const pct = Math.round((val / rowTotal(row)) * 100);
    return (
      <div style={{ background: "#111", color: "#fff", padding: "10px 14px", borderRadius: 8, fontFamily: "Rubik", fontSize: 13, boxShadow: "0 6px 20px rgba(0,0,0,0.18)", pointerEvents: "none", minWidth: 160 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{String(row.name).replace("\n", " ")}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[activeKey], display: "inline-block" }} />
          <span style={{ flex: 1 }}>{LABELS[activeKey]}</span>
          <span style={{ fontWeight: 600 }}>{fmtVal(val)}</span>
        </div>
        {row.total && <div style={{ color: "#bbb", fontSize: 11, marginTop: 4 }}>{pct}% of total</div>}
      </div>
    );
  };

  return (
    <div className="chart-wrap">
      <div className="chart-title">{cfg.title}</div>
      <div className="legend">
        {cfg.legendOrder.map((k: string) => (
          <div className="legend-item" key={k} data-dim={activeKey != null && activeKey !== k}
            onClick={() => {
              if (activeKey === k && sticky) clear();
              else {
                setActiveKey(k);
                setSticky(true);
              }
            }}>
            <span className="swatch" style={{ background: COLORS[k] }} />
            <span>{LABELS[k]}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "0" }} onClick={(e) => { if (e.target === e.currentTarget && sticky) clear(); }}>
        <div className="chart-scroll">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cfg.data} margin={{ top: 40, right: 24, left: 0, bottom: 60 }} barCategoryGap="30%">
                <CartesianGrid stroke="#E3E3E3" strokeDasharray="6 6" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: "#000", strokeWidth: 1.5 }} interval={0} tick={<MultiLineTick />} height={60} />
                <YAxis tickFormatter={fmtVal} tickLine={false} axisLine={false} domain={[cfg.yMin, cfg.yMax]} ticks={cfg.yTicks} width={70} tick={{ fontFamily: "Rubik", fontSize: 12, fill: "#1a3c3c" } as any} />
                <Tooltip cursor={false} isAnimationActive={false} wrapperStyle={{ outline: "none" }} content={<SegTip />} />
                {cfg.segments.map((s: any, i: number) => (
                  <Bar key={s.key} dataKey={s.key} stackId="a" isAnimationActive={false}
                    onMouseEnter={() => { if (!sticky) setActiveKey(s.key); }}
                    onMouseLeave={() => { if (!sticky) clear(); }}
                    onClick={() => { if (sticky && activeKey === s.key) clear(); else { setActiveKey(s.key); setSticky(true); } }}
                    shape={(props: any) => {
                      const { x, y, width, height, index } = props;
                      if (!height) return <g />;
                      const isTop = topKey(cfg.data[index]) === s.key;
                      const r = isTop ? 6 : 0;
                      const opacity = dim(s.key);
                      const val = cfg.data[index][s.key];
                      const cx = x + width / 2;
                      const cy = y + height / 2;
                      const showLabel = height > 60 && width > 100 && val > 0;
                      const showValue = height > 30 && val > 0;
                      const rectEl = r
                        ? <path d={`M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} L${x},${y + height} Z`} fill={s.color} opacity={opacity} style={{ transition: "opacity 120ms" }} />
                        : <rect x={x} y={y} width={width} height={height} fill={s.color} opacity={opacity} style={{ transition: "opacity 120ms" }} />;
                      return (
                        <g>
                          {rectEl}
                          {showLabel && <text x={cx} y={cy - (showValue ? 7 : 0)} textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="Rubik" fontSize="11" fontWeight={500} opacity={opacity} style={{ transition: "opacity 120ms", pointerEvents: "none" }}>{LABELS[s.key]}</text>}
                          {showValue && <text x={cx} y={cy + (showLabel ? 9 : 0)} textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="Rubik" fontSize="13" fontWeight={700} opacity={opacity} style={{ transition: "opacity 120ms", pointerEvents: "none" }}>{fmtVal(val)}</text>}
                        </g>
                      );
                    }}>
                    {i === cfg.segments.length - 1 && <LabelList content={<TotalLabel data={cfg.data} />} />}
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p style={{ color: "#5c7a78", fontSize: 12, marginTop: 14, maxWidth: 900 }}>{cfg.subtitle}</p>
    </div>
  );
}

/* ─── Horizontal bar (machine comparisons) ─── */
function HorizBarChart({ data, segments, xMax, xTicks, valuePrefix, valueSuffix, subtitle }: any) {
  const fmtVal = fmt(valuePrefix, valueSuffix);
  const STACK = segments.map((s: any) => s.key);
  const rightKey = (row: any) => [...STACK].reverse().find((k) => row[k] > 0);
  const chartH = Math.max(280, data.length * 62 + 50);

  return (
    <div>
      <div className="legend" style={{ marginBottom: 12 }}>
        {segments.map((s: any) => (
          <div className="legend-item" key={s.key}>
            <span className="swatch" style={{ background: s.color }} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="chart-scroll">
        <div className="horiz-chart-inner" style={{ height: chartH }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 80, left: 10, bottom: 8 }} barCategoryGap="6%" barSize={46}>
              <CartesianGrid stroke="#E3E3E3" strokeDasharray="6 6" horizontal={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={140} tick={{ fontFamily: "Rubik", fontSize: 12, fill: "#1a3c3c", fontWeight: 500 } as any} />
              <XAxis type="number" tickFormatter={fmtVal} tickLine={false} axisLine={{ stroke: "#000", strokeWidth: 1.5 }} domain={[0, xMax]} ticks={xTicks} tick={{ fontFamily: "Rubik", fontSize: 11, fill: "#5c7a78" } as any} />
              {segments.map((s: any, i: number) => (
                <Bar key={s.key} dataKey={s.key} stackId="a" fill={s.color} isAnimationActive={false} radius={0}
                  shape={(props: any) => {
                    const { x, y, width, height } = props;
                    if (!width) return <g />;
                    const idx = props.index;
                    const isRight = rightKey(data[idx]) === s.key;
                    const r = isRight ? 4 : 0;
                    if (r) {
                      const path = `M${x},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height - r} Q${x + width},${y + height} ${x + width - r},${y + height} L${x},${y + height} Z`;
                      return <path d={path} fill={s.color} />;
                    }
                    return <rect x={x} y={y} width={width} height={height} fill={s.color} />;
                  }}>
                  {i === segments.length - 1 && (
                    <LabelList content={({ x, y, width, height, index }: any) => {
                      const d = data[index];
                      if (!d || !d.total) return null;
                      return <text x={x + width + 8} y={y + height / 2} dominantBaseline="central" fill="#1a3c3c" fontFamily="Rubik" fontSize="13" fontWeight={700}>{d.total}</text>;
                    }} />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {subtitle && <p style={{ color: "#5c7a78", fontSize: 11, marginTop: 8 }}>{subtitle}</p>}
    </div>
  );
}

/* ─── Tabbed wrapper ─── */
export function TabbedCharts({ title, tabs }: any) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="tabs-title">{title}</div>
      <div className="tabs-header">
        {tabs.map((t: any, i: number) => (
          <button key={i} className={`tab-btn ${i === active ? "active" : ""}`} onClick={() => setActive(i)}>{t.label}</button>
        ))}
      </div>
      <div className="tabs-card">
        {tabs.map((t: any, i: number) => (
          <div key={i} className={`tab-panel ${i === active ? "active" : ""}`}>
            <HorizBarChart {...t.chart} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Per-location config builders ─── */
const BILL_CFG_BASE = {
  title: "Energy bills per year in 2026",
  subtitle: "Excludes upfront costs. Based on 2026 energy prices. Average household for the selected location.",
  yMin: 0,
  valuePrefix: "$",
  valueSuffix: "",
  segments: [
    { key: "maintenance", label: "Car maintenance", color: "#A0A0A0" },
    { key: "electricity", label: "Electricity bills", color: "#4A90E2" },
    { key: "gas", label: "Gas bills", color: "#9B7DC8" },
    { key: "petrol", label: "Petrol bills", color: "#E88B8B" },
    { key: "rucs", label: "RUCs", color: "#E89420" },
    { key: "savings", label: "Savings", color: "#7DB87D" },
  ],
  legendOrder: ["petrol", "gas", "electricity", "maintenance", "rucs", "savings"],
};

const SAVINGS_CFG_BASE = {
  title: "Lifetime savings by electrification switch",
  subtitle: "Net savings including upfront costs. Solar: 30 years, 9kW system at 5.5% finance. All others: 15 years. Vehicle and cooking figures use bill savings (not net) as upfront costs vary.",
  yMin: 0,
  valuePrefix: "$",
  valueSuffix: "",
  segments: [{ key: "savings", label: "Net savings / bill savings", color: "#234e4c" }],
  legendOrder: ["savings"],
};

export function buildBillCfg(d: District) {
  return {
    ...BILL_CFG_BASE,
    title: `The average ${d.fields.location} home could save ${d.fields.bill_savings} every year by electrifying`,
    data: d.bill,
    yMax: d.billYMax,
    yTicks: d.billYTicks,
  };
}
export function buildSavingsCfg(d: District) {
  return { ...SAVINGS_CFG_BASE, data: d.savings, yMax: d.savingsYMax, yTicks: d.savingsYTicks };
}

/* ─── Cumulative savings chart (2026–2040) — ported from the live preview.
   single mode: one cumulative-savings area; dual: net area + bill-savings line. ─── */
type CumulativePoint = { year: number; bills: number | null; net: number | null };
export type CumulativeCfg = {
  data: CumulativePoint[];
  single?: boolean;
  billsEnd?: string | null;
  netEnd?: string | null;
};

const fmtShort = (n: any) => {
  if (n == null) return "";
  const a = Math.abs(n);
  if (a >= 1e9) return "$" + (n / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  if (a >= 1e6) return "$" + (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  if (a >= 1e3) return "$" + Math.round(n / 1e3) + "k";
  return "$" + Math.round(n);
};

const CumulTip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: "#111", color: "#fff", padding: "10px 14px", borderRadius: 8, fontFamily: "Rubik", fontSize: 13, boxShadow: "0 6px 20px rgba(0,0,0,0.18)", pointerEvents: "none" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span>{p.name}: {"$" + Number(p.value).toLocaleString("en-NZ")}</span>
        </div>
      ))}
    </div>
  );
};

export function CumulativeChart({ cfg }: { cfg: CumulativeCfg }) {
  const endLabel = (text?: string | null) => (props: any) => {
    if (props.index !== cfg.data.length - 1 || text == null) return null;
    return (
      <text x={props.x + 8} y={props.y + 4} textAnchor="start" fill="#1a3c3c" fontFamily="Rubik" fontSize="14" fontWeight={700}>
        {text}
      </text>
    );
  };
  return (
    <div style={{ width: "100%", height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={cfg.data} margin={{ top: 16, right: 96, bottom: 4, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e3" vertical={false} />
          <XAxis dataKey="year" interval={1} tickLine={false} axisLine={{ stroke: "#c9c9c2" }} tick={{ fill: "#1a3c3c", fontFamily: "Rubik", fontSize: 12 }} />
          <YAxis tickFormatter={fmtShort} tickLine={false} axisLine={false} width={64} tick={{ fill: "#5f6f6f", fontFamily: "Rubik", fontSize: 12 }} />
          <Tooltip content={<CumulTip />} cursor={{ stroke: "#c9c9c2", strokeWidth: 1 }} />
          {!cfg.single && (
            <Legend wrapperStyle={{ fontFamily: "Rubik", fontSize: 13, color: "#1a3c3c" }} formatter={(v) => <span style={{ color: "#1a3c3c" }}>{v}</span>} />
          )}
          {cfg.single ? (
            <Area type="monotone" dataKey="bills" name="Cumulative savings" stroke="#93c47d" strokeWidth={2} fill="#93c47d" fillOpacity={0.3} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.billsEnd)} />
          ) : (
            <>
              <Area type="monotone" dataKey="net" name="Net savings (after upfront costs)" stroke="#93c47d" strokeWidth={2} fill="#93c47d" fillOpacity={0.3} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.netEnd)} />
              <Line type="monotone" dataKey="bills" name="Energy bill savings" stroke="#3c78d8" strokeWidth={2} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.billsEnd)} />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── National appliance-comparison tabs (same for every location) ─── */
export const HEATING_TABS = {
  title: "Space heating savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#5B2D8E" },
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "wood", label: "Wood costs", color: "#B8A060" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 35000, xTicks: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average home heating needs (RBS 2021), 2026 energy prices with forward inflation (real) based on historic averages, 15 year appliance lifetime.",
      data: [
        { name: "Heat pump", upfront: 3500, elec: 5600, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,100" },
        { name: "Wood fire", upfront: 4500, elec: 0, wood: 13700, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$18,200" },
        { name: "Resistive heater", upfront: 500, elec: 20500, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$21,000" },
        { name: "Gas heater flued", upfront: 3000, elec: 0, wood: 0, gasVol: 15500, gasDaily: 5600, lpgVol: 0, lpgDaily: 0, total: "$24,100" },
        { name: "Gas heater fire", upfront: 3000, elec: 0, wood: 0, gasVol: 17800, gasDaily: 5600, lpgVol: 0, lpgDaily: 0, total: "$26,400" },
        { name: "LPG heater flued", upfront: 3000, elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 22500, lpgDaily: 3000, total: "$28,500" },
        { name: "LPG heater fire", upfront: 3000, elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 25400, lpgDaily: 3000, total: "$31,400" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "wood", label: "Wood costs", color: "#B8A060" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 1750, xTicks: [0, 250, 500, 750, 1000, 1250, 1500, 1750],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Heat pump", elec: 330, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$330 /yr" },
        { name: "Wood fire", elec: 0, wood: 740, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$740 /yr" },
        { name: "Resistive heater", elec: 1220, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$1,220 /yr" },
        { name: "Gas heater flued", elec: 0, wood: 0, gasVol: 870, gasDaily: 320, lpgVol: 0, lpgDaily: 0, total: "$1,190 /yr" },
        { name: "Gas heater fire", elec: 0, wood: 0, gasVol: 950, gasDaily: 320, lpgVol: 0, lpgDaily: 0, total: "$1,270 /yr" },
        { name: "LPG heater flued", elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 1210, lpgDaily: 200, total: "$1,410 /yr" },
        { name: "LPG heater fire", elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 1350, lpgDaily: 200, total: "$1,550 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [{ key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#E88B8B" }],
      xMax: 1250, xTicks: [0, 250, 500, 750, 1000, 1250],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average home heating needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Heat pump", emissions: 80, total: "80" },
        { name: "Wood fire", emissions: 100, total: "100" },
        { name: "Resistive heater", emissions: 290, total: "290" },
        { name: "Gas heater flued", emissions: 1000, total: "1,000" },
        { name: "Gas heater fire", emissions: 1100, total: "1,100" },
        { name: "LPG heater flued", emissions: 1090, total: "1,090" },
        { name: "LPG heater fire", emissions: 1200, total: "1,200" },
      ],
    }},
  ],
};

export const WATER_TABS = {
  title: "Water heating savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#5B2D8E" },
        { key: "solar", label: "Solar financed", color: "#F5C542" },
        { key: "ripple", label: "Ripple", color: "#4A90E2" },
        { key: "elec", label: "Electricity costs", color: "#7BAFD4" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 25000, xTicks: [0, 5000, 10000, 15000, 20000, 25000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average home water heating needs (RBS 2021), 2026 energy prices with forward inflation, 15 year appliance lifetime.",
      data: [
        { name: "Hot water heat pump (solar)", upfront: 5000, solar: 3600, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$8,600" },
        { name: "Hot water heat pump (night)", upfront: 5000, solar: 0, ripple: 4500, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,500" },
        { name: "Hot water heat pump (grid)", upfront: 5000, solar: 0, ripple: 0, elec: 6000, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$11,000" },
        { name: "Resistive on solar", upfront: 1500, solar: 8350, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,850" },
        { name: "Resistive night rate", upfront: 1500, solar: 0, ripple: 11950, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$13,450" },
        { name: "Resistive avg grid", upfront: 1500, solar: 0, ripple: 0, elec: 17950, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$19,450" },
        { name: "Gas instant", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 10000, gasDaily: 4500, lpgVol: 0, lpgDaily: 0, total: "$17,500" },
        { name: "Gas tank", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 12900, gasDaily: 4500, lpgVol: 0, lpgDaily: 0, total: "$20,400" },
        { name: "LPG instant", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 13700, lpgDaily: 3000, total: "$19,700" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "solar", label: "Solar financed", color: "#F5C542" },
        { key: "ripple", label: "Ripple", color: "#4A90E2" },
        { key: "elec", label: "Electricity costs", color: "#7BAFD4" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 1250, xTicks: [0, 250, 500, 750, 1000, 1250],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Hot water heat pump (solar)", solar: 90, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$90 /yr" },
        { name: "Hot water heat pump (night)", solar: 0, ripple: 130, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$130 /yr" },
        { name: "Hot water heat pump (grid)", solar: 0, ripple: 0, elec: 220, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$220 /yr" },
        { name: "Resistive on solar", solar: 360, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$360 /yr" },
        { name: "Resistive night rate", solar: 0, ripple: 540, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$540 /yr" },
        { name: "Resistive avg grid", solar: 0, ripple: 0, elec: 910, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$910 /yr" },
        { name: "Gas instant", solar: 0, ripple: 0, elec: 0, gasVol: 540, gasDaily: 300, lpgVol: 0, lpgDaily: 0, total: "$840 /yr" },
        { name: "Gas tank", solar: 0, ripple: 0, elec: 0, gasVol: 640, gasDaily: 300, lpgVol: 0, lpgDaily: 0, total: "$940 /yr" },
        { name: "LPG instant", solar: 0, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 750, lpgDaily: 200, total: "$950 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [{ key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#E88B8B" }],
      xMax: 800, xTicks: [0, 200, 400, 600, 800],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average water heating needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Hot water heat pump", emissions: 50, total: "50" },
        { name: "Resistive", emissions: 220, total: "220" },
        { name: "Gas instant", emissions: 620, total: "620" },
        { name: "Gas tank", emissions: 740, total: "740" },
        { name: "LPG instant", emissions: 670, total: "670" },
      ],
    }},
  ],
};

export const COOKTOP_TABS = {
  title: "Cooking savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#5B2D8E" },
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 5000, xTicks: [0, 1000, 2000, 3000, 4000, 5000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average cooktop energy needs (RBS 2021), 2026 energy prices with forward inflation (real), 15 year appliance lifetime.",
      data: [
        { name: "Induction cooktop", upfront: 1200, elec: 2127, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$3,327" },
        { name: "Resistive cooktop", upfront: 500, elec: 2565, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$3,065" },
        { name: "Gas cooktop", upfront: 800, elec: 0, gasVol: 1824, gasDaily: 1000, lpgVol: 0, lpgDaily: 0, total: "$3,624" },
        { name: "LPG cooktop", upfront: 800, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 2977, lpgDaily: 1000, total: "$4,777" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#7DB87D" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#A8D4A8" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#9B7DC8" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#C4ADE0" },
      ],
      xMax: 200, xTicks: [0, 50, 100, 150, 200],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Induction cooktop", elec: 80, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$80 /yr" },
        { name: "Resistive cooktop", elec: 89, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$89 /yr" },
        { name: "Gas cooktop", elec: 0, gasVol: 50, gasDaily: 68, lpgVol: 0, lpgDaily: 0, total: "$118 /yr" },
        { name: "LPG cooktop", elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 120, lpgDaily: 67, total: "$187 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [{ key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#E88B8B" }],
      xMax: 150, xTicks: [0, 50, 100, 150],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average cooktop energy needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Induction cooktop", emissions: 19, total: "19" },
        { name: "Resistive cooktop", emissions: 21, total: "21" },
        { name: "Gas cooktop", emissions: 136, total: "136" },
        { name: "LPG cooktop", emissions: 147, total: "147" },
      ],
    }},
  ],
};

export const SOLAR_TABS = {
  title: "Solar & battery savings",
  tabs: [
    { label: "Effective Price", chart: {
      segments: [{ key: "price", label: "Effective electricity price (c/kWh)", color: "#234e4c" }],
      xMax: 50, xTicks: [0, 10, 20, 30, 40, 50],
      valuePrefix: "", valueSuffix: "c",
      subtitle: "Effective price per kWh paid by the household, including financing at 5.5%. Lower is better.",
      data: [
        { name: "Grid only", price: 40, total: "40c" },
        { name: "Solar only", price: 28, total: "28c" },
        { name: "Solar + battery", price: 23, total: "23c" },
      ],
    }},
    { label: "15 Year Electricity Cost", chart: {
      segments: [{ key: "cost", label: "Electricity cost over 15 years", color: "#234e4c" }],
      xMax: 50000, xTicks: [0, 10000, 20000, 30000, 40000, 50000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Total household electricity spend over 15 years, including solar and battery financing at 5.5%.",
      data: [
        { name: "Grid only", cost: 48000, total: "$48,000" },
        { name: "Solar only", cost: 26000, total: "$26,000" },
        { name: "Solar + battery", cost: 13700, total: "$13,700" },
      ],
    }},
  ],
};

export const EV_TABS = {
  title: "Vehicle savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "petrol", label: "Petrol costs", color: "#E88B8B" },
        { key: "diesel", label: "Diesel costs", color: "#C4884A" },
        { key: "rucs", label: "Road user charges", color: "#E89420" },
        { key: "maintenance", label: "Maintenance", color: "#A0A0A0" },
      ],
      xMax: 55000, xTicks: [0, 10000, 20000, 30000, 40000, 50000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Running costs only (excludes vehicle purchase price). Medium vehicle, 188km/week, 2026 prices with forward inflation, 15 year ownership.",
      data: [
        { name: "Electric (EV)", elec: 9500, petrol: 0, diesel: 0, rucs: 13400, maintenance: 3800, total: "$26,700" },
        { name: "Hybrid SUV", elec: 0, petrol: 25200, diesel: 0, rucs: 0, maintenance: 7800, total: "$33,000" },
        { name: "Petrol SUV", elec: 0, petrol: 41000, diesel: 0, rucs: 0, maintenance: 8500, total: "$49,500" },
        { name: "Diesel ute", elec: 0, petrol: 0, diesel: 31500, rucs: 13400, maintenance: 9000, total: "$53,900" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#4A90E2" },
        { key: "petrol", label: "Petrol costs", color: "#E88B8B" },
        { key: "diesel", label: "Diesel costs", color: "#C4884A" },
        { key: "rucs", label: "Road user charges", color: "#E89420" },
        { key: "maintenance", label: "Maintenance", color: "#A0A0A0" },
      ],
      xMax: 4000, xTicks: [0, 1000, 2000, 3000, 4000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices, 188km/week.",
      data: [
        { name: "Electric (EV)", elec: 530, petrol: 0, diesel: 0, rucs: 745, maintenance: 300, total: "$1,575 /yr" },
        { name: "Hybrid SUV", elec: 0, petrol: 1400, diesel: 0, rucs: 0, maintenance: 600, total: "$2,000 /yr" },
        { name: "Petrol SUV", elec: 0, petrol: 2600, diesel: 0, rucs: 0, maintenance: 700, total: "$3,300 /yr" },
        { name: "Diesel ute", elec: 0, petrol: 0, diesel: 2000, rucs: 750, maintenance: 800, total: "$3,550 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [{ key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#E88B8B" }],
      xMax: 3000, xTicks: [0, 1000, 2000, 3000],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Tailpipe and electricity emissions, 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Electric (EV)", emissions: 130, total: "130" },
        { name: "Hybrid SUV", emissions: 1400, total: "1,400" },
        { name: "Petrol SUV", emissions: 2300, total: "2,300" },
        { name: "Diesel ute", emissions: 2600, total: "2,600" },
      ],
    }},
  ],
};
