"use client";

// Dev-harness for the regional-reports landing page component. Rendered twice:
// normally, and inside a shadow root — Webflow code islands mount in a shadow
// root, so a plain React page masks any reliance on document-level CSS.
// Visit /region-index-test
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import RwRegionIndexPage from "../../components/RegionReport/RwRegionIndexPage";

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

const nz = { href: "/regional-reports/new-zealand" };
const cta = { href: "https://pages.rewiring.nz/electric-homes-and-vehicles" };

export default function RegionIndexTest() {
  return (
    <div style={{ background: "#FFFCF0" }}>
      <div style={bar}>Harness: RW Region Index Page — light DOM (defaults + NZ link + CTA link)</div>
      <RwRegionIndexPage nzUrl={nz} ctaUrl={cta} />

      <div style={bar}>Same component inside a shadow root (as Webflow renders it)</div>
      <ShadowMount>
        <RwRegionIndexPage nzUrl={nz} ctaUrl={cta} />
      </ShadowMount>

      <div style={bar}>Hero image variant, no search, no CTA, no NZ link</div>
      <RwRegionIndexPage
        heroImage={{ src: "/neighbourhood-effect-hero.png", alt: "Sample cover" }}
        showSearch={false}
        showCta={false}
        heroTitle="Electrifying your region"
      />
    </div>
  );
}
