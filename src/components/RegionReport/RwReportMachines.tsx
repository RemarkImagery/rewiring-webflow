"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MACHINES_HTML, sub, mergeFields, ensureReportCss, initReveal, resolveSlug } from "./reportSections";
import { TabbedCharts, SOLAR_TABS, EV_TABS, HEATING_TABS, WATER_TABS, COOKTOP_TABS } from "./reportCharts";

export interface RwReportMachinesProps {
  districtSlug?: string;
  location?: string;
  // Solar
  solarNetSavings?: string;
  solarPanelLife?: string;
  solarCost?: string;
  solarSize?: string;
  batteryCost?: string;
  batterySize?: string;
  solarBattery15yr?: string;
  solarFinanceRate?: string;
  solarEffectiveRate?: string;
  gridRate?: string;
  // EV
  evNetSavings?: string;
  carsFossil?: string;
  evSuvSavings?: string;
  evAnnualSavings?: string;
  evUteSavings?: string;
  drivingWeeklyKm?: string;
  // Heat pump
  heatpumpLifetime?: string;
  heatersFossil?: string;
  heatpumpEnergyPct?: string;
  heatpump15yr?: string;
  heatpumpAnnual?: string;
  heatersLpg?: string;
  // Hot water
  water15yr?: string;
  waterHeatersFossil?: string;
  waterLifetime?: string;
  waterHeatersLpg?: string;
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
      solar_net_savings: p.solarNetSavings,
      solar_panel_life: p.solarPanelLife,
      solar_cost: p.solarCost,
      solar_size: p.solarSize,
      battery_cost: p.batteryCost,
      battery_size: p.batterySize,
      solar_battery_15yr_savings: p.solarBattery15yr,
      solar_finance_rate: p.solarFinanceRate,
      solar_effective_rate: p.solarEffectiveRate,
      grid_rate: p.gridRate,
      ev_net_savings: p.evNetSavings,
      cars_fossil: p.carsFossil,
      ev_suv_savings: p.evSuvSavings,
      ev_annual_savings: p.evAnnualSavings,
      ev_ute_savings: p.evUteSavings,
      driving_weekly_km: p.drivingWeeklyKm,
      heatpump_lifetime_savings: p.heatpumpLifetime,
      heaters_fossil: p.heatersFossil,
      heatpump_energy_pct: p.heatpumpEnergyPct,
      heatpump_15yr_savings: p.heatpump15yr,
      heatpump_annual_savings: p.heatpumpAnnual,
      heaters_lpg: p.heatersLpg,
      water_15yr_savings: p.water15yr,
      water_heaters_fossil: p.waterHeatersFossil,
      water_lifetime_savings: p.waterLifetime,
      water_heaters_lpg: p.waterHeatersLpg,
      water_energy_pct: p.waterEnergyPct,
      cooktop_savings: p.cooktopSavings,
      cooktops_gas: p.cooktopsGas,
    });
    root.innerHTML = sub(MACHINES_HTML, fields);

    // Tabbed charts use shared/national figures (flagged to Josh), so they need
    // no per-location data — but keep the mount pattern so drift is easy to fix.
    const roots: Root[] = [];
    const mounts: Array<[string, React.ReactNode]> = [
      ["solar-tabs", <TabbedCharts {...SOLAR_TABS} />],
      ["ev-tabs", <TabbedCharts {...EV_TABS} />],
      ["heating-tabs", <TabbedCharts {...HEATING_TABS} />],
      ["water-tabs", <TabbedCharts {...WATER_TABS} />],
      ["cooktop-tabs", <TabbedCharts {...COOKTOP_TABS} />],
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
      roots.forEach((r) => {
        try {
          r.unmount();
        } catch {
          /* node already gone */
        }
      });
      cleanupReveal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(p)]);

  return <div className="rw-region-report" ref={rootRef} />;
}
