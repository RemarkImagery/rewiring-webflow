"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BILLS_HTML, sub, mergeFields, getDistrict, ensureReportCss, initReveal, resolveSlug } from "./reportSections";
import { BillTabs, buildBillTabs } from "./reportCharts";

export interface RwReportBillsProps {
  districtSlug?: string;
  location?: string;
  billSavings?: string;
  billsNetSavings?: string;
  billsNet15yr?: string;
}

export default function RwReportBills({
  districtSlug = "",
  location,
  billSavings,
  billsNetSavings,
  billsNet15yr,
}: RwReportBillsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ensureReportCss();
    const slug = resolveSlug(districtSlug);
    const fields = mergeFields(slug, {
      location,
      bill_savings: billSavings,
      bills_net_savings: billsNetSavings,
      bills_net_15yr: billsNet15yr,
    });
    root.innerHTML = sub(BILLS_HTML, fields);

    // Bill charts read the bundled per-location configs (not a CMS field).
    const roots: Root[] = [];
    const d = getDistrict(slug);
    const mount = root.querySelector("#bill-chart");
    if (d && mount) {
      const { cfgA, cfgB } = buildBillTabs(d);
      const r = createRoot(mount);
      r.render(<BillTabs cfgA={cfgA} cfgB={cfgB} />);
      roots.push(r);
    }
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
  }, [districtSlug, location, billSavings, billsNetSavings, billsNet15yr]);

  return <div className="rw-region-report" ref={rootRef} />;
}
