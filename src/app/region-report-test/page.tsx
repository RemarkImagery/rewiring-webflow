"use client";

// Dev-harness page for the v2 Region Report components — not shipped to Webflow
// (webflow.json only scans *.webflow.tsx). Visit /region-report-test?slug=dunedin
import React, { useEffect, useState } from "react";
import RwRegionReport from "../../components/RegionReport/RwRegionReport";
import RwLocalStoryCard from "../../components/RegionReport/RwLocalStoryCard";
import RwRegionFooter from "../../components/RegionReport/RwRegionFooter";
import RwCommunityGroups from "../../components/RegionReport/RwCommunityGroups";

/* mimics the Webflow Collection List ("locations" wrapper) the component parses */
function FakeCmsList() {
  const groups = [
    { name: "Electrify Dunedin", lat: "-45.8742", lng: "170.5036", blurb: "Locals helping locals go electric — workshops, home tours and honest advice.", url: "https://example.com/electrify-dunedin" },
    { name: "Otago Peninsula Energy Group", lat: "-45.8636", lng: "170.6280", blurb: "Community energy projects across the peninsula.", url: "" },
    { name: "Mosgiel Solar Collective", lat: "-45.8753", lng: "170.3487", blurb: "Bulk-buy solar for Taieri households.", url: "" },
  ];
  return (
    <div className="locations w-dyn-list">
      {groups.map((g, i) => (
        <div key={i} className="w-dyn-item">
          <div data-rw-group data-name={g.name} data-lat={g.lat} data-lng={g.lng} data-blurb={g.blurb} data-url={g.url} />
        </div>
      ))}
    </div>
  );
}

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
      <div style={{ padding: "40px 0 60px", background: "#fdf7ea" }}>
        <FakeCmsList />
        <RwCommunityGroups heading="Electric community" />
      </div>
      <RwRegionFooter districtSlug={slug} />
    </div>
  );
}
