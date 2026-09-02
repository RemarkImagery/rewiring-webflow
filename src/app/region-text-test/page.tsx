"use client";

// Harness for the editable-copy props. Renders the intro chunk twice: once with
// defaults, once with overrides — including a rewritten sentence that keeps its
// {{location}} and {{elec_savings_daily}} tokens, which is the whole point of
// editing the template string rather than the rendered text.
// Visit /region-text-test?slug=dunedin
import React, { useEffect, useState } from "react";
import RwReportIntro from "../../components/RegionReport/RwReportIntro";

const bar = { padding: 12, background: "#14302f", color: "#fff", fontFamily: "Rubik, sans-serif" } as const;

export default function RegionTextTest() {
  const [slug, setSlug] = useState("dunedin");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("slug");
    if (q) setSlug(q);
  }, []);
  return (
    <div>
      <div style={bar}>Defaults — slug <strong>{slug}</strong></div>
      <div data-case="default">
        <RwReportIntro districtSlug={slug} />
      </div>

      <div style={bar}>Overridden from the properties panel</div>
      <div data-case="override">
        <RwReportIntro
          districtSlug={slug}
          economicsHeading="Money talk"
          economicsPara1="Rewritten for {{location}}: households burn {{fossil_spend_annual}} a year on fossil fuels."
          heroAndOpportunityPara1="A custom hero line with no tokens at all."
        />
      </div>
    </div>
  );
}
