"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MACHINES_HTML, sub, mergeFields, getDistrict, ensureReportCss, initReveal, resolveSlug } from "./reportSections";
import { TabbedCharts, mergeTabs, EV_TABS, HEATING_TABS, WATER_TABS, COOKTOP_TABS } from "./reportCharts";

export interface RwReportMachinesProps {
  districtSlug?: string;
  location?: string;
  // Solar
  solarBox1Num?: string;
  solarBox1Meta?: string;
  solarPanelLife?: string;
  batteryLife?: string;
  solarFinanceRate?: string;
  solarEffectiveRate?: string;
  gridRate?: string;
  // EV
  evNetSavings?: string;
  carsFossil?: string;
  evAnnualSavings?: string;
  evUteSavings?: string;
  evUteAnnualSavings?: string;
  drivingWeeklyKm?: string;
  // Heat pump
  heatpumpLifetime?: string;
  heatersFossil?: string;
  heatpumpEnergyPct?: string;
  heatpump15yr?: string;
  heatpumpAnnual?: string;
  // Hot water
  water15yr?: string;
  waterHeatersFossil?: string;
  waterLifetime?: string;
  waterEnergyPct?: string;
  // Induction
  cooktopSavings?: string;
  cooktopsGas?: string;
}

export default function RwReportMachines(p: RwReportMachinesProps) {
  const { districtSlug = "" } = p;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ensureReportCss();
    const slug = resolveSlug(districtSlug);
    const fields = mergeFields(slug, {
      location: p.location,
      solar_box1_num: p.solarBox1Num,
      solar_box1_meta: p.solarBox1Meta,
      solar_panel_life: p.solarPanelLife,
      battery_life: p.batteryLife,
      solar_finance_rate: p.solarFinanceRate,
      solar_effective_rate: p.solarEffectiveRate,
      grid_rate: p.gridRate,
      ev_net_savings: p.evNetSavings,
      cars_fossil: p.carsFossil,
      ev_annual_savings: p.evAnnualSavings,
      ev_ute_savings: p.evUteSavings,
      ev_ute_annual_savings: p.evUteAnnualSavings,
      driving_weekly_km: p.drivingWeeklyKm,
      heatpump_lifetime_savings: p.heatpumpLifetime,
      heaters_fossil: p.heatersFossil,
      heatpump_energy_pct: p.heatpumpEnergyPct,
      heatpump_15yr_savings: p.heatpump15yr,
      heatpump_annual_savings: p.heatpumpAnnual,
      water_15yr_savings: p.water15yr,
      water_heaters_fossil: p.waterHeatersFossil,
      water_lifetime_savings: p.waterLifetime,
      water_energy_pct: p.waterEnergyPct,
      cooktop_savings: p.cooktopSavings,
      cooktops_gas: p.cooktopsGas,
    });
    root.innerHTML = sub(MACHINES_HTML, fields);

    // v2: tabbed charts are PER-LOCATION (District.machineTabs overlays the
    // national fallbacks). The solar chart was removed per client feedback.
    const d = getDistrict(slug);
    const MT: any = (d as any)?.machineTabs || {};
    const roots: Root[] = [];
    const mounts: Array<[string, React.ReactNode]> = [
      ["ev-tabs", <TabbedCharts {...mergeTabs(EV_TABS, MT.ev)} />],
      ["heating-tabs", <TabbedCharts {...mergeTabs(HEATING_TABS, MT.heating)} />],
      ["water-tabs", <TabbedCharts {...mergeTabs(WATER_TABS, MT.water)} />],
      ["cooktop-tabs", <TabbedCharts {...mergeTabs(COOKTOP_TABS, MT.cooktop)} />],
    ];
    mounts.forEach(([id, node]) => {
      const n = root.querySelector("#" + id);
      if (n) {
        const r = createRoot(n);
        r.render(node);
        roots.push(r);
      }
    });
    const cleanupReveal = initReveal(root);

    return () => {
      // defer: unmounting synchronously during a re-render commit is a React error
      roots.forEach((r) =>
        setTimeout(() => {
          try {
            r.unmount();
          } catch {
            /* node already gone */
          }
        }, 0),
      );
      cleanupReveal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(p)]);

  return <div className="rw-region-report" ref={rootRef} />;
}
