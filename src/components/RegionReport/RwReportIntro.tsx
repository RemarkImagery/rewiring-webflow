"use client";

import React, { useEffect, useRef } from "react";
import { INTRO_HTML, sub, mergeFields, ensureReportCss, initReveal, resolveSlug } from "./reportSections";

export interface RwReportIntroProps {
  districtSlug?: string;
  location?: string;
  elecSavingsAnnual?: string;
  co2eAnnual?: string;
  jobsCreated?: string;
  billSavings?: string;
  cumulativeSavings?: string;
}

export default function RwReportIntro({
  districtSlug = "",
  location,
  elecSavingsAnnual,
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
      co2e_annual: co2eAnnual,
      jobs_created: jobsCreated,
      bill_savings: billSavings,
      cumulative_savings: cumulativeSavings,
    });
    root.innerHTML = sub(INTRO_HTML, fields);
    return initReveal(root);
  }, [districtSlug, location, elecSavingsAnnual, co2eAnnual, jobsCreated, billSavings, cumulativeSavings]);

  return <div className="rw-region-report" ref={rootRef} />;
}
