"use client";

// Jump-link harness. Each chunk mounts in its OWN shadow root, the way Webflow
// renders code islands — which is the only way to reproduce the broken jump
// links (a plain React page resolves the ids in the light DOM and passes).
// Visit /region-anchor-test?slug=wellington
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import RwReportIntro from "../../components/RegionReport/RwReportIntro";
import RwReportBills from "../../components/RegionReport/RwReportBills";
import RwReportMachines from "../../components/RegionReport/RwReportMachines";
import RwCommunitySimple from "../../components/RegionReport/RwCommunitySimple";
import RwLocalStoriesSimple from "../../components/RegionReport/RwLocalStoriesSimple";

function Island({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current || host.current.shadowRoot) return;
    const shadow = host.current.attachShadow({ mode: "open" });
    const mount = document.createElement("div");
    shadow.appendChild(mount);
    createRoot(mount).render(<>{children}</>);
  }, [children]);
  return <div ref={host} />;
}

export default function RegionAnchorTest() {
  const [slug, setSlug] = useState("wellington");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("slug");
    if (q) setSlug(q);
  }, []);
  return (
    <div>
      <div style={{ padding: 12, background: "#14302f", color: "#fff", fontFamily: "Rubik, sans-serif" }}>
        Jump-link harness — each chunk in its own shadow root — slug <strong>{slug}</strong>
      </div>
      <Island><RwReportIntro districtSlug={slug} /></Island>
      <Island><RwReportBills districtSlug={slug} /></Island>
      <Island><RwLocalStoriesSimple /></Island>
      <Island><RwReportMachines districtSlug={slug} /></Island>
      <Island><RwCommunitySimple /></Island>
    </div>
  );
}
