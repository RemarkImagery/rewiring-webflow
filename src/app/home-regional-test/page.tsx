"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import RwRegionalReportsHome from "../../components/HomePage/RwRegionalReportsHome";

// Harness for the Regional Reports homepage section. Renders it in the light
// DOM and inside a shadow root (how Webflow mounts code components).
// Not scanned by webflow.json.
export default function HomeRegionalTest() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current || host.current.shadowRoot) return;
    const root = host.current.attachShadow({ mode: "open" });
    const mount = document.createElement("div");
    root.appendChild(mount);
    createRoot(mount).render(<RwRegionalReportsHome />);
  }, []);
  return (
    <main style={{ background: "#fffcf0" }}>
      <RwRegionalReportsHome />
      <div style={{ height: 40 }} />
      <div ref={host} id="shadow-host" />
    </main>
  );
}
