"use client";

// Dev-harness for the CMS-bindable chunk trio, stacked the way a designer
// would on a Regional Reports Collection Page. Not shipped to Webflow.
// Visit /region-chunks-test?slug=auckland
import React, { useEffect, useState } from "react";
import RwReportIntro from "../../components/RegionReport/RwReportIntro";
import RwReportBills from "../../components/RegionReport/RwReportBills";
import RwReportMachines from "../../components/RegionReport/RwReportMachines";
import RwLocalStoryCard from "../../components/RegionReport/RwLocalStoryCard";
import RwRegionFooter from "../../components/RegionReport/RwRegionFooter";

export default function RegionChunksTest() {
  const [slug, setSlug] = useState("auckland");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("slug");
    if (q) setSlug(q);
  }, []);
  return (
    <div>
      <div style={{ padding: 12, background: "#14302f", color: "#fff", fontFamily: "Rubik, sans-serif" }}>
        Harness: chunk trio — slug <strong>{slug}</strong>
      </div>
      <RwReportIntro districtSlug={slug} />
      <RwReportBills districtSlug={slug} />
      <div style={{ padding: "40px 16px", background: "#fdf7ea" }}>
        <RwLocalStoryCard />
      </div>
      <RwReportMachines districtSlug={slug} />
      <RwRegionFooter districtSlug={slug} />
    </div>
  );
}
