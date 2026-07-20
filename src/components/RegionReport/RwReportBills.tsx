"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BILLS_HTML, sub, mergeFields, getDistrict, ensureReportCss, initReveal } from "./reportSections";
import { StackedBarChart, buildBillCfg } from "./reportCharts";

export interface RwReportBillsProps {
  districtSlug?: string;
  location?: string;
  billFossil?: string;
  billElectric?: string;
}

export default function RwReportBills({
  districtSlug = "dunedin",
  location,
  billFossil,
  billElectric,
}: RwReportBillsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ensureReportCss();
    const fields = mergeFields(districtSlug, {
      location,
      bill_fossil: billFossil,
      bill_electric: billElectric,
    });
    root.innerHTML = sub(BILLS_HTML, fields);

    // Bill chart reads the bundled per-location array (not a CMS field).
    const roots: Root[] = [];
    const d = getDistrict(districtSlug);
    const mount = root.querySelector("#bill-chart");
    if (d && mount) {
      const r = createRoot(mount);
      r.render(<StackedBarChart cfg={buildBillCfg(d)} id="bills" />);
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
  }, [districtSlug, location, billFossil, billElectric]);

  return <div className="rw-region-report" ref={rootRef} />;
}
