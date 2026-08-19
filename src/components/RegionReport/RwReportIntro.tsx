"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { INTRO_HTML, sub, mergeFields, getDistrict, ensureReportCss, initReveal, resolveSlug } from "./reportSections";
import { CumulativeChart } from "./reportCharts";

export interface RwReportIntroProps {
  districtSlug?: string;
  location?: string;
  elecSavingsAnnual?: string;
  machinesTotal?: string;
  co2eAnnual?: string;
  jobsCreated?: string;
  billSavings?: string;
  cumulativeSavings?: string;
}

export default function RwReportIntro({
  districtSlug = "",
  location,
  elecSavingsAnnual,
  machinesTotal,
  co2eAnnual,
  jobsCreated,
  billSavings,
  cumulativeSavings,
}: RwReportIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ensureReportCss();
    const slug = resolveSlug(districtSlug);
    const fields = mergeFields(slug, {
      location,
      elec_savings_annual: elecSavingsAnnual,
      machines_total: machinesTotal,
      co2e_annual: co2eAnnual,
      jobs_created: jobsCreated,
      bill_savings: billSavings,
      cumulative_savings: cumulativeSavings,
    });
    root.innerHTML = sub(INTRO_HTML, fields);

    // Mount the cumulative savings chart into its placeholder (per-location data).
    const roots: Root[] = [];
    const d = getDistrict(slug);
    const cn = root.querySelector("#cumulative-chart");
    if (cn && d?.cumulative) {
      cn.classList.remove("cumulative-ph");
      const r = createRoot(cn);
      r.render(<CumulativeChart cfg={d.cumulative} />);
      roots.push(r);
    }
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
  }, [districtSlug, location, elecSavingsAnnual, machinesTotal, co2eAnnual, jobsCreated, billSavings, cumulativeSavings]);

  return <div className="rw-region-report" ref={rootRef} />;
}
