"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type District } from "./districtData";
import { resolveSlug, getDistrict, sub, installAnchorNav, applyTextOverrides } from "./reportSections";
import { CSS, TEMPLATE } from "./reportContent";
import {
  TabbedCharts,
  BillTabs,
  CumulativeChart,
  buildBillTabs,
  mergeTabs,
  EV_TABS,
  HEATING_TABS,
  WATER_TABS,
  COOKTOP_TABS,
} from "./reportCharts";

export interface RwRegionReportProps {
  /** District/region slug, e.g. "dunedin", "queenstown-lakes-district", "waikato-region" */
  districtSlug?: string;
  /** Copy edited in Webflow's properties panel - see reportEditable.ts. */
  [key: string]: string | undefined;
}

function mountCharts(root: HTMLElement, d: District): Root[] {
  const { cfgA, cfgB } = buildBillTabs(d);
  const MT: any = (d as any).machineTabs || {};
  const mounts: Array<[string, React.ReactNode]> = [
    ["bill-chart", <BillTabs cfgA={cfgA} cfgB={cfgB} />],
    ["ev-tabs", <TabbedCharts {...mergeTabs(EV_TABS, MT.ev)} />],
    ["heating-tabs", <TabbedCharts {...mergeTabs(HEATING_TABS, MT.heating)} />],
    ["water-tabs", <TabbedCharts {...mergeTabs(WATER_TABS, MT.water)} />],
    ["cooktop-tabs", <TabbedCharts {...mergeTabs(COOKTOP_TABS, MT.cooktop)} />],
  ];
  const roots: Root[] = [];
  mounts.forEach(([id, node]) => {
    const n = root.querySelector("#" + id);
    if (n) {
      const r = createRoot(n);
      r.render(node);
      roots.push(r);
    }
  });
  const cn = root.querySelector("#cumulative-chart");
  if (cn && d.cumulative) {
    cn.classList.remove("cumulative-ph");
    const r = createRoot(cn);
    r.render(<CumulativeChart cfg={d.cumulative} />);
    roots.push(r);
  }
  return roots;
}

/** Scroll-reveal + active jump-nav, scoped to the report root. Returns a cleanup fn. */
function initInteractions(root: HTMLElement): () => void {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const observers: IntersectionObserver[] = [];
  const clickCleanups: Array<() => void> = [];

  if (!reduce && "IntersectionObserver" in window) {
    const blocks = root.querySelectorAll(".jumpnav, .section-head, .two-col, .container > .prose, .chart-wrap, .headline-stats, .cumulative-block");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    blocks.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    observers.push(io);
  }

  const cards = Array.from(root.querySelectorAll<HTMLAnchorElement>(".jump-card"));
  const byId: Record<string, Element> = {};
  const sections: Element[] = [];
  cards.forEach((c) => {
    const id = (c.getAttribute("href") || "").slice(1);
    const target = id ? root.querySelector("#" + id) : null;
    const sec = target ? target.closest(".section") : null;
    if (sec) {
      sec.setAttribute("data-spy", id);
      byId[id] = c;
      sections.push(sec);
    }
    // smooth in-page scroll (html scroll-behavior can't be scoped). Targets may
    // live OUTSIDE this component — e.g. the Stories/Community sections a
    // designer builds around it (give them id="stories" / id="community").
    const onClick = (ev: Event) => {
      const t = id ? root.querySelector("#" + id) || document.getElementById(id) : null;
      if (t) { ev.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    };
    c.addEventListener("click", onClick);
    clickCleanups.push(() => c.removeEventListener("click", onClick));
  });

  if ("IntersectionObserver" in window && sections.length) {
    let current: string | null = null;
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).getAttribute("data-spy");
          if (id && current !== id) {
            current = id;
            cards.forEach((c) => c.classList.remove("is-active"));
            if (byId[id]) byId[id].classList.add("is-active");
          }
        }
      }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
    observers.push(spy);
  }

  return () => {
    observers.forEach((o) => o.disconnect());
    clickCleanups.forEach((fn) => fn());
  };
}

export default function RwRegionReport(allProps: RwRegionReportProps) {
  const { districtSlug = "" } = allProps;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const slug = resolveSlug(districtSlug);
    const d = getDistrict(slug);
    if (!d) return;

    root.innerHTML = `<style>${CSS}</style>` + sub(applyTextOverrides(TEMPLATE, allProps), d.fields);
    const roots = mountCharts(root, d);
    const cleanupInteractions = initInteractions(root);
    // fallback for anchors this component doesn't own — e.g. #community, which
    // lives in the separate RwCommunityGroups island's shadow root
    const cleanupAnchors = installAnchorNav();

    return () => {
      // defer: unmounting synchronously during a re-render commit is a React error
      roots.forEach((r) => setTimeout(() => { try { r.unmount(); } catch { /* node already gone */ } }, 0));
      cleanupInteractions();
      cleanupAnchors();
    };
  }, [districtSlug, JSON.stringify(allProps)]);

  return <div className="rw-region-report" ref={rootRef} />;
}
