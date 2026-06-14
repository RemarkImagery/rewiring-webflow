"use client";

import React, { useId } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
  Customized,
  useXAxisScale,
  useYAxisScale,
} from "recharts";

interface TccFuelRangeChartProps {
  heading?: string;
  source?: string;
  axisMax?: number;
  axisStep?: number;
  unit?: string;
  multiplierLabel?: string;
  showMultiplier?: boolean;

  label1?: string;
  value1?: number;
  color1?: string;

  label2?: string;
  value2?: number;
  color2?: string;

  label3?: string;
  value3?: number;
  color3?: string;

  label4?: string;
  value4?: number;
  color4?: string;

  bgColor?: string;
  inkColor?: string;
  mutedColor?: string;
  gridColor?: string;
  multiplierColor?: string;
}

interface Row {
  name: string;
  value: number;
  color: string;
}

export default function TccFuelRangeChart(props: TccFuelRangeChartProps) {
  const {
    heading = "How far will $5 of ‘fuel’ get you?",
    source =
      "Rewiring Aotearoa, 2026. MBIE Energy Prices, 2026. Fueleconomy.gov, Rightcar.govt.nz, Motor Vehicle Register.",
    axisMax = 250,
    axisStep = 50,
    unit = "km",
    multiplierLabel = "10x",
    showMultiplier = true,

    label1 = "ICE — petrol",
    value1 = 22,
    color1 = "#E8473B",

    label2 = "HEV — petrol hybrid",
    value2 = 31,
    color2 = "#9A9A9A",

    label3 = "EV — grid charged",
    value3 = 64,
    color3 = "#3E86F4",

    label4 = "EV — solar charged\n(5.5% finance)",
    value4 = 234,
    color4 = "#EFA022",

    bgColor = "#fdfaf1",
    inkColor = "#0b0b0b",
    mutedColor = "#6b6b6b",
    gridColor = "#dcdcdc",
    multiplierColor = "#EF6A1F",
  } = props;

  const uid = useId().replace(/:/g, "");

  const DATA: Row[] = [
    { name: label1, value: value1, color: color1 },
    { name: label2, value: value2, color: color2 },
    { name: label3, value: value3, color: color3 },
    { name: label4, value: value4, color: color4 },
  ];

  const ticks: number[] = [];
  for (let t = 0; t <= axisMax; t += axisStep) ticks.push(t);

  const MultiLineTick = (tickProps: any) => {
    const { x, y, payload } = tickProps;
    const lines = String(payload.value).split("\n");
    const startY = y - ((lines.length - 1) * 15) / 2;
    return (
      <g transform={`translate(${x},${startY})`}>
        {lines.map((ln, i) => (
          <text
            key={i}
            x={-6}
            y={i * 15}
            dy={4}
            textAnchor="end"
            fill={inkColor}
            fontFamily="Rubik, sans-serif"
            fontSize="13"
            fontWeight={600}
          >
            {ln}
          </text>
        ))}
      </g>
    );
  };

  const ValueLabel = (labelProps: any) => {
    const { x, y, width, height, value } = labelProps;
    return (
      <text
        x={x + width + 10}
        y={y + height / 2}
        dy={5}
        textAnchor="start"
        fill={inkColor}
        fontFamily="Rubik, sans-serif"
        fontSize="15"
        fontWeight={700}
      >
        {`${value} ${unit}`}
      </text>
    );
  };

  // Diagonal "10x" annotation line drawn tip-to-tip across the first and last bar.
  const MultiplierLayer = () => {
    const xScale = useXAxisScale(0) as any;
    const yScale = useYAxisScale(0) as any;
    if (!showMultiplier || !xScale || !yScale) return null;

    const band = typeof yScale.bandwidth === "function" ? yScale.bandwidth() : 0;

    const first = DATA[0];
    const last = DATA[DATA.length - 1];

    const x1 = xScale(first.value);
    const y1 = (yScale(first.name) ?? 0) + band / 2;
    const x2 = xScale(last.value);
    const y2 = (yScale(last.name) ?? 0) + band / 2;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={multiplierColor}
          strokeWidth={3}
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <text
          x={midX}
          y={midY - 14}
          textAnchor="middle"
          fill={multiplierColor}
          fontFamily="Rubik, sans-serif"
          fontSize="44"
          fontWeight={700}
        >
          {multiplierLabel}
        </text>
      </g>
    );
  };

  return (
    <section className={`tcc-frc-wrap-${uid}`}>
      <div className={`tcc-frc-inner-${uid}`}>
        <h2 className={`tcc-frc-h2-${uid}`}>{heading}</h2>
        <div className={`tcc-frc-card-${uid}`}>
          <div className={`tcc-frc-scroll-${uid}`}>
            <div className={`tcc-frc-chart-${uid}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={DATA}
                  margin={{ top: 16, right: 70, left: 24, bottom: 8 }}
                  barCategoryGap="34%"
                >
                  <CartesianGrid
                    stroke={gridColor}
                    strokeDasharray="4 5"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    domain={[0, axisMax]}
                    ticks={ticks}
                    tickLine={false}
                    axisLine={{ stroke: "#000", strokeWidth: 1.5 }}
                    tick={
                      {
                        fontFamily: "Rubik, sans-serif",
                        fontSize: 12,
                        fill: mutedColor,
                      } as any
                    }
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    width={150}
                    tick={<MultiLineTick />}
                  />
                  <Bar dataKey="value" isAnimationActive={false} radius={[0, 2, 2, 0]}>
                    {DATA.map((row, i) => (
                      <Cell key={i} fill={row.color} />
                    ))}
                    <LabelList dataKey="value" content={<ValueLabel />} />
                  </Bar>
                  <Customized component={MultiplierLayer} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <p className={`tcc-frc-source-${uid}`}>{source}</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tcc-frc-wrap-${uid} {
          background: ${bgColor};
          color: ${inkColor};
          font-family: 'Rubik', system-ui, sans-serif;
          width: 100%;
          -webkit-text-size-adjust: 100%;
        }
        .tcc-frc-wrap-${uid} * { box-sizing: border-box; }

        .tcc-frc-inner-${uid} {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 32px 48px;
        }

        .tcc-frc-h2-${uid} {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 20px;
          letter-spacing: -0.01em;
          color: ${inkColor};
        }

        .tcc-frc-card-${uid} {
          background: ${bgColor};
          touch-action: manipulation;
        }

        .tcc-frc-scroll-${uid} {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x;
        }

        .tcc-frc-chart-${uid} {
          min-width: 560px;
          height: 420px;
        }

        .tcc-frc-source-${uid} {
          color: ${mutedColor};
          font-size: 12px;
          margin: 18px 0 0;
          text-align: right;
          max-width: 100%;
        }

        @media (max-width: 780px) {
          .tcc-frc-inner-${uid} { padding: 24px 16px 36px; }
          .tcc-frc-h2-${uid} { font-size: 21px; }
          .tcc-frc-chart-${uid} { height: 380px; min-width: 560px; }
          .tcc-frc-source-${uid} { font-size: 11px; text-align: left; }
        }
        @media (max-width: 480px) {
          .tcc-frc-h2-${uid} { font-size: 19px; }
        }
      `}</style>
    </section>
  );
}
