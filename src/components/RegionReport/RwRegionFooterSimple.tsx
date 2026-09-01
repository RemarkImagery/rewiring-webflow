"use client";

// Simple (link-out) footer for the region report: the national Electric Homes
// & Vehicles Report card only. The per-location PDF download card is
// deliberately left out here — use RwRegionFooter once the PDFs are on a
// client-facing host.
import React from "react";
import SimpleSection from "./simpleSection";

interface LinkValue {
  href: string;
  target?: string;
}

function linkHref(v?: LinkValue): string {
  const h = (v?.href || "").trim();
  return h && h !== "#" ? h : "";
}

const NATIONAL_REPORT_URL = "https://pages.rewiring.nz/electric-homes-and-vehicles";

export interface RwRegionFooterSimpleProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  reportUrl?: LinkValue;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwRegionFooterSimple({
  heading = "Read the full national report",
  body = "Dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026 — Rewiring Aotearoa's full analysis of the opportunity of going electric across New Zealand.",
  buttonLabel = "Electric Homes & Vehicles Report",
  reportUrl,
  bgColor = "#fdf7ea",
  cardColor = "#ffffff",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: RwRegionFooterSimpleProps) {
  return (
    <SimpleSection
      heading={heading}
      body={body}
      buttonLabel={buttonLabel}
      href={linkHref(reportUrl) || NATIONAL_REPORT_URL}
      icon="book"
      bgColor={bgColor}
      cardColor={cardColor}
      inkColor={inkColor}
      accentColor={accentColor}
      goldColor={goldColor}
    />
  );
}
