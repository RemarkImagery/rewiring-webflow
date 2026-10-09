"use client";

import React from "react";
import CampaignCard, { CampaignCardProps } from "./campaignCard";

// Single source for the copy + colours: the .webflow.tsx reads these too.
export const PFW_DEFAULTS = {
  heading: "Powered",
  headingAccent: "from Within",
  subheading: "New Zealand-made energy = New Zealand security.",
  text: "Our 2026 think piece outlines a plan to keep hospitals, freight, food and other critical services running through fuel shocks, and save New Zealand hugely in the process.",
  ctaText: "See the plan",
  ctaUrl: "https://pages.rewiring.nz/powered-from-within",
  secondaryText: "",
  secondaryUrl: "",
  imageAlt:
    "Illustration of a New Zealand valley powered by hydro, wind, geothermal and solar, with an electric ambulance, bus and tanker on the road",
  bgColor: "#fffcf0",
  textColor: "#1a3c3c",
  accentColor: "#f5b731",
  buttonColor: "#1a3c3c",
  buttonTextColor: "#fffcf0",
};

// Same drawing as the page hero (hospital, school, ambulance behind the bus).
// Transparent, art sits in the right-hand ~55% of the frame.
const PRESET = {
  defaultImage: "https://pages.rewiring.nz/powered-from-within-assets/img/cut/hero-scene-1200.webp",
  accentStyle: "swipe" as const,
  imagePosition: "100% 50%",
  imageFit: "cover" as const,
  defaults: PFW_DEFAULTS,
};

export default function PfwCtaCard(props: CampaignCardProps) {
  return <CampaignCard preset={PRESET} {...props} />;
}
