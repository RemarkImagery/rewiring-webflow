"use client";

// Dev-harness page for the v2 Region Report components — not shipped to Webflow
// (webflow.json only scans *.webflow.tsx). Visit /region-report-test?slug=dunedin
import React, { useEffect, useState } from "react";
import RwRegionReport from "../../components/RegionReport/RwRegionReport";
import RwLocalStoryCard from "../../components/RegionReport/RwLocalStoryCard";

export default function RegionReportTest() {
  const [slug, setSlug] = useState("dunedin");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("slug");
    if (q) setSlug(q);
  }, []);
  return (
    <div>
      <div style={{ padding: 12, background: "#14302f", color: "#fff", fontFamily: "Rubik, sans-serif" }}>
        Harness: RwRegionReport — slug <strong>{slug}</strong> (?slug=… to switch)
      </div>
      <RwRegionReport districtSlug={slug} />
      <div style={{ padding: "40px 16px", background: "#fdf7ea" }}>
        <RwLocalStoryCard />
      </div>
    </div>
  );
}
