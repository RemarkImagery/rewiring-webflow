"use client";

// Dev-harness for the "simple" link-out variants (stories / community /
// footer). Rendered twice: normally, and inside a shadow root — Webflow code
// islands mount in a shadow root, so a plain React page masks any reliance on
// document-level CSS. Not shipped to Webflow.
// Visit /region-simple-test
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import RwLocalStoriesSimple from "../../components/RegionReport/RwLocalStoriesSimple";
import RwCommunitySimple from "../../components/RegionReport/RwCommunitySimple";
import RwRegionFooterSimple from "../../components/RegionReport/RwRegionFooterSimple";

function ShadowMount({ children }: { children: React.ReactNode }) {
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

const bar = { padding: 12, background: "#14302f", color: "#fff", fontFamily: "Rubik, sans-serif" } as const;

export default function RegionSimpleTest() {
  return (
    <div style={{ background: "#fdf7ea" }}>
      <div style={bar}>Harness: simple link-out sections — light DOM</div>
      <RwLocalStoriesSimple storiesUrl={{ href: "https://www.rewiring.nz/communities" }} />
      <RwCommunitySimple />
      <RwRegionFooterSimple />

      <div style={bar}>Same three inside a shadow root (as Webflow renders them)</div>
      <ShadowMount>
        <>
          <RwLocalStoriesSimple storiesUrl={{ href: "https://www.rewiring.nz/communities" }} />
          <RwCommunitySimple />
          <RwRegionFooterSimple />
        </>
      </ShadowMount>

      <div style={bar}>Story button with no URL set (button should be absent)</div>
      <RwLocalStoriesSimple />
    </div>
  );
}
