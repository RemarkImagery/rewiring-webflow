"use client";

// v2 chart runtime for the Region Report components — TSX port of the live
// preview's chart script (rewiring-region-reports.pages.dev, 2026-08-19).
// Per-location configs come from District.billTabs / District.machineTabs;
// the national fallbacks in reportTabs.ts fill any missing tab.
import React, { useEffect, useState } from "react";
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
import {
  BILL_CFG,
  SAVINGS_CFG,
  HEATING_TABS,
  WATER_TABS,
  COOKTOP_TABS,
  EV_TABS,
} from "./reportTabs";

export { HEATING_TABS, WATER_TABS, COOKTOP_TABS, EV_TABS };

/* ─── Shared helpers ─── */
const fmt = (prefix?: string, suffix?: string) => (n: any) =>
  (prefix || "") + Number(n).toLocaleString("en-NZ") + (suffix || "");

/** Phone breakpoint; components re-render when the breakpoint is crossed. */
function useIsPhone(): boolean {
  const [phone, setPhone] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setPhone(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", on);
    else (mq as any).addListener(on);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", on);
      else (mq as any).removeListener(on);
    };
  }, []);
  return phone;
}

const MultiLineTick = ({ x, y, payload, fs }: any) => {
  const size = fs || 13;
  const lines = String(payload.value).split("\n");
  return (
    <g transform={`translate(${x},${y + 12})`}>
      {lines.map((ln: string, i: number) => (
        <text key={i} x={0} y={i * (size + 3)} textAnchor="middle" fill="#1a3c3c" fontFamily="Rubik" fontSize={size} fontWeight={600}>
          {ln}
        </text>
      ))}
    </g>
  );
};

/* two-line word-wrapped category tick for narrow horizontal charts */
const WrapTick = ({ x, y, payload }: any) => {
  const words = String(payload.value).replace("\n", " ").split(" ");
  const lines: string[] = [""];
  words.forEach((w: string) => {
    const cur = lines[lines.length - 1];
    if (cur && (cur + " " + w).length > 13 && lines.length < 3) lines.push(w);
    else lines[lines.length - 1] = cur ? cur + " " + w : w;
  });
  const y0 = y - (lines.length - 1) * 5.5;
  return (
    <g>
      {lines.map((ln, i) => (
        <text key={i} x={x} y={y0 + i * 11} textAnchor="end" fill="#1a3c3c" fontFamily="Rubik" fontSize="10" fontWeight={500} dominantBaseline="central">
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

/* ─── Vertical stacked bar chart (bills comparison) ─── */
export function StackedBarChart({ cfg }: { cfg: any; id?: string }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [sticky, setSticky] = useState(false);
  const mobile = useIsPhone();
  const rows = mobile ? cfg.data.map((r: any) => ({ ...r, name: r.short || String(r.name).split("\n")[0] })) : cfg.data;
  const COLORS = Object.fromEntries(cfg.segments.map((s: any) => [s.key, s.color]));
  const LABELS = Object.fromEntries(cfg.segments.map((s: any) => [s.key, s.label]));
  const STACK = cfg.segments.map((s: any) => s.key);
  const fmtFull = fmt(cfg.valuePrefix, cfg.valueSuffix);
  const fmtVal =
    mobile && cfg.valuePrefix === "$"
      ? (v: any) => (Math.abs(v) >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 ? 1 : 0).replace(/\.0$/, "") + "k" : "$" + v)
      : fmtFull;
  const topKey = (row: any) => [...STACK].reverse().find((k) => row[k] > 0);
  const rowTotal = (row: any) => STACK.reduce((a: number, k: string) => a + (k === "base" ? 0 : row[k] || 0), 0);

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
      {cfg.titleHtml ? (
        <div className="chart-title" dangerouslySetInnerHTML={{ __html: cfg.titleHtml }} />
      ) : (
        <div className="chart-title">{cfg.title}</div>
      )}
      <div className="legend">
        {cfg.legendOrder.map((k: string) => (
          <div
            className="legend-item"
            key={k}
            data-dim={activeKey != null && activeKey !== k}
            onClick={() => {
              if (activeKey === k && sticky) clear();
              else {
                setActiveKey(k);
                setSticky(true);
              }
            }}
          >
            <span className="swatch" style={{ background: COLORS[k] }} />
            <span>{LABELS[k]}</span>
          </div>
        ))}
      </div>
      <div
        style={{ padding: "0" }}
        onClick={(e) => {
          if (e.target === e.currentTarget && sticky) clear();
        }}
      >
        <div className="chart-scroll">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ top: 40, right: mobile ? 6 : 24, left: 0, bottom: mobile ? 34 : 60 }} barCategoryGap={mobile ? "18%" : "30%"}>
                <CartesianGrid stroke="#E3E3E3" strokeDasharray="6 6" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: "#000", strokeWidth: 1.5 }} interval={0} tick={<MultiLineTick fs={mobile ? 11 : 13} />} height={mobile ? 34 : 60} />
                <YAxis tickFormatter={fmtVal} tickLine={false} axisLine={false} domain={[cfg.yMin, cfg.yMax]} ticks={cfg.yTicks} width={mobile ? 44 : 70} tick={{ fontFamily: "Rubik", fontSize: mobile ? 11 : 12, fill: "#1a3c3c" }} />
                <Tooltip cursor={false} isAnimationActive={false} wrapperStyle={{ outline: "none" }} content={<SegTip />} />
                {cfg.segments.map((s: any, i: number) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    stackId="a"
                    isAnimationActive={false}
                    onMouseEnter={() => {
                      if (!sticky) setActiveKey(s.key);
                    }}
                    onMouseLeave={() => {
                      if (!sticky) clear();
                    }}
                    onClick={() => {
                      if (sticky && activeKey === s.key) clear();
                      else {
                        setActiveKey(s.key);
                        setSticky(true);
                      }
                    }}
                    shape={(props: any) => {
                      const { x, y, width, height, index } = props;
                      if (!height || s.key === "base") return <g />;
                      const isTop = topKey(rows[index]) === s.key;
                      const r = isTop ? 6 : 0;
                      const opacity = dim(s.key);
                      const val = rows[index][s.key];
                      const cx = x + width / 2;
                      const cy = y + height / 2;
                      const showLabel = !cfg.hideSegLabels && height > 60 && width > 100 && val > 0;
                      const showValue = height > 30 && val > 0;
                      const rectEl = r ? (
                        <path d={`M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} L${x},${y + height} Z`} fill={s.color} opacity={opacity} style={{ transition: "opacity 120ms" }} />
                      ) : (
                        <rect x={x} y={y} width={width} height={height} fill={s.color} opacity={opacity} style={{ transition: "opacity 120ms" }} />
                      );
                      return (
                        <g>
                          {rectEl}
                          {showLabel && (
                            <text x={cx} y={cy - (showValue ? 7 : 0)} textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="Rubik" fontSize="11" fontWeight={500} opacity={opacity} style={{ transition: "opacity 120ms", pointerEvents: "none" }}>
                              {LABELS[s.key]}
                            </text>
                          )}
                          {showValue && (
                            <text x={cx} y={cy + (showLabel ? 9 : 0)} textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="Rubik" fontSize="13" fontWeight={700} opacity={opacity} style={{ transition: "opacity 120ms", pointerEvents: "none" }}>
                              {fmtVal(val)}
                            </text>
                          )}
                        </g>
                      );
                    }}
                  >
                    {i === cfg.segments.length - 1 && <LabelList content={<TotalLabel data={rows} />} />}
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

/* ─── Horizontal bar chart (machine comparisons) ─── */
function HorizBarChart({ data, segments, xMax, xTicks, valuePrefix, valueSuffix, subtitle }: any) {
  const mobile = useIsPhone();
  const fmtFull = fmt(valuePrefix, valueSuffix);
  const fmtVal =
    mobile && valuePrefix === "$"
      ? (v: any) => (Math.abs(v) >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 ? 1 : 0).replace(/\.0$/, "") + "k" : "$" + v)
      : fmtFull;
  const STACK = segments.map((s: any) => s.key);
  const rightKey = (row: any) => [...STACK].reverse().find((k) => row[k] > 0);
  const chartH = Math.max(mobile ? 220 : 280, data.length * (mobile ? 46 : 62) + 50);

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
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: mobile ? 52 : 80, left: mobile ? 0 : 10, bottom: 8 }} barCategoryGap="6%" barSize={mobile ? 30 : 46}>
              <CartesianGrid stroke="#E3E3E3" strokeDasharray="6 6" horizontal={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={mobile ? 104 : 188} tick={mobile ? <WrapTick /> : { fontFamily: "Rubik", fontSize: 12, fill: "#1a3c3c", fontWeight: 500 }} />
              <XAxis type="number" tickFormatter={fmtVal} tickLine={false} axisLine={{ stroke: "#000", strokeWidth: 1.5 }} domain={[0, xMax]} ticks={mobile && xTicks.length > 4 ? xTicks.filter((_t: any, i: number) => i % 2 === 0) : xTicks} tick={{ fontFamily: "Rubik", fontSize: mobile ? 10 : 11, fill: "#5c7a78" }} />
              {segments.map((s: any, i: number) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  stackId="a"
                  fill={s.color}
                  isAnimationActive={false}
                  radius={0}
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
                  }}
                >
                  {i === segments.length - 1 && (
                    <LabelList
                      content={({ x, y, width, height, index }: any) => {
                        const d = data[index];
                        if (!d || !d.total) return null;
                        let label = d.total;
                        if (mobile && /^\$[\d,]+/.test(String(label))) {
                          const n = parseInt(String(label).replace(/[^0-9]/g, ""), 10);
                          if (n >= 10000) label = "$" + Math.round(n / 1000) + "k" + (String(d.total).indexOf("/yr") > -1 ? " /yr" : "");
                        }
                        return (
                          <text x={x + width + 8} y={y + height / 2} dominantBaseline="central" fill="#1a3c3c" fontFamily="Rubik" fontSize={mobile ? 11 : 13} fontWeight={700}>
                            {label}
                          </text>
                        );
                      }}
                    />
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

/* ─── Tabbed chart wrapper (with optional per-tab group picker) ─── */
export function TabbedCharts({ title, tabs }: any) {
  const [active, setActive] = useState(0);
  const [groupSel, setGroupSel] = useState<Record<number, number>>({});
  return (
    <div>
      <div className="tabs-title">{title}</div>
      <div className="tabs-header">
        {tabs.map((t: any, i: number) => (
          <button key={i} className={`tab-btn ${i === active ? "active" : ""}`} onClick={() => setActive(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="tabs-card">
        {tabs.map((t: any, i: number) => {
          const gi = groupSel[i] !== undefined ? groupSel[i] : t.defaultGroup || 0;
          return (
            <div key={i} className={`tab-panel ${i === active ? "active" : ""}`}>
              {t.groups && t.groups.length ? (
                <React.Fragment>
                  <div className="group-picker">
                    <label>{t.pickerLabel || "Type"}</label>
                    <select value={gi} onChange={(e) => setGroupSel({ ...groupSel, [i]: +e.target.value })}>
                      {t.groups.map((g: any, j: number) => (
                        <option key={j} value={j}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <HorizBarChart {...t.groups[Math.min(gi, t.groups.length - 1)].chart} />
                </React.Fragment>
              ) : (
                <HorizBarChart {...t.chart} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Bills: two-tab wrapper (annual bills / incl. upfront) ─── */
export function BillTabs({ cfgA, cfgB }: { cfgA?: any; cfgB?: any }) {
  const tabs = ["Bill savings", "Bill savings including upfront costs"];
  const [active, setActive] = useState(0);
  const a = cfgA || BILL_CFG;
  const b = cfgB || SAVINGS_CFG;
  return (
    <div>
      <div className="tabs-header">
        {tabs.map((t, i) => (
          <button key={i} className={`tab-btn ${i === active ? "active" : ""}`} onClick={() => setActive(i)}>
            {t}
          </button>
        ))}
      </div>
      {active === 0 ? <StackedBarChart cfg={a} id="bills" /> : <StackedBarChart cfg={b} id="savings" />}
    </div>
  );
}

/* ─── Cumulative savings chart (net-first, endpoint == the C23 headline) ─── */
export type CumulativeCfg = {
  data: Array<{ year: number; bills: number | null; net: number | null }>;
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
          <span>
            {p.name}: {"$" + Number(p.value).toLocaleString("en-NZ")}
          </span>
        </div>
      ))}
    </div>
  );
};

export function CumulativeChart({ cfg }: { cfg: CumulativeCfg }) {
  const mobile = useIsPhone();
  const endLabel = (text: string | null | undefined) => (props: any) => {
    if (props.index !== cfg.data.length - 1 || text == null) return null;
    const label = mobile ? String(text).replace(" billion", "b").replace(" million", "m") : text;
    return (
      <text x={props.x + 6} y={props.y + 4} textAnchor="start" fill="#1a3c3c" fontFamily="Rubik" fontSize={mobile ? 11 : 14} fontWeight={700}>
        {label}
      </text>
    );
  };
  return (
    <div style={{ width: "100%", height: mobile ? 300 : 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={cfg.data} margin={{ top: 16, right: mobile ? 56 : 96, bottom: 4, left: mobile ? 0 : 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e3" vertical={false} />
          <XAxis dataKey="year" interval={mobile ? 3 : 1} tickLine={false} axisLine={{ stroke: "#c9c9c2" }} tick={{ fill: "#1a3c3c", fontFamily: "Rubik", fontSize: mobile ? 11 : 12 }} />
          <YAxis tickFormatter={fmtShort} tickLine={false} axisLine={false} width={mobile ? 50 : 64} tick={{ fill: "#5f6f6f", fontFamily: "Rubik", fontSize: mobile ? 11 : 12 }} />
          <Tooltip content={<CumulTip />} cursor={{ stroke: "#c9c9c2", strokeWidth: 1 }} />
          {!cfg.single && <Legend wrapperStyle={{ fontFamily: "Rubik", fontSize: 13, color: "#1a3c3c" }} formatter={(v) => <span style={{ color: "#1a3c3c" }}>{v}</span>} />}
          {cfg.single ? (
            <Area type="monotone" dataKey="bills" name="Cumulative savings" stroke="#93c47d" strokeWidth={2} fill="#93c47d" fillOpacity={0.3} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.billsEnd)} />
          ) : (
            <React.Fragment>
              <Area type="monotone" dataKey="net" name="Net savings (after upfront costs)" stroke="#93c47d" strokeWidth={2} fill="#93c47d" fillOpacity={0.3} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.netEnd)} />
              <Line type="monotone" dataKey="bills" name="Energy bill savings" stroke="#3c78d8" strokeWidth={2} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} label={endLabel(cfg.billsEnd)} />
            </React.Fragment>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Per-location shaping ─── */

/** Overlay a location's tab list (from District.machineTabs) onto a national base. */
export function mergeTabs(base: any, locTabs: any) {
  if (!locTabs || !locTabs.length) return base;
  const t = base.tabs.slice();
  for (let i = 0; i < locTabs.length && i < t.length; i++) t[i] = locTabs[i];
  return { title: base.title, tabs: t };
}

/** Build the two BillTabs configs for a district, with the per-location savings title. */
export function buildBillTabs(d: District): { cfgA: any; cfgB: any } {
  const title = (sav: string) =>
    "The average " + (d.fields.location || "NZ") + ' home could save around <span style="color:#27ae60">' + sav + "</span> on their bills every year by electrifying";
  const bt: any = (d as any).billTabs;
  if (bt) {
    const cfgA = { ...bt.a, titleHtml: title(bt.billSavings) };
    const cfgB = { ...bt.b, titleHtml: title(bt.netSavings) + " (incl. upfront costs)" };
    return { cfgA, cfgB };
  }
  return { cfgA: BILL_CFG, cfgB: SAVINGS_CFG };
}
