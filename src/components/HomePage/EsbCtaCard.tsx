"use client";

import React from "react";
import CampaignCard, { CampaignCardProps } from "./campaignCard";

// Single source for the copy + colours: the .webflow.tsx reads these too.
export const ESB_DEFAULTS = {
  heading: "EV Salary",
  headingAccent: "Boost",
  subheading: "A pay rise you can drive.",
  text: "Lease a new or near-new electric vehicle using your pre-tax salary. One weekly payment covers the car, charging, insurance and maintenance, and most workers come out ahead from week one.",
  ctaText: "See the numbers",
  ctaUrl: "https://pages.rewiring.nz/ev-salary-boost",
  secondaryText: "I'm an employer",
  secondaryUrl: "https://pages.rewiring.nz/ev-salary-boost#employers",
  imageAlt: "An electric car riding a rising arrow, with coins and a waving family",
  bgColor: "#1a3c3c",
  textColor: "#ffffff",
  accentColor: "#f5b731",
  buttonColor: "#f5b731",
  buttonTextColor: "#1a3c3c",
};

// The page's hero art: Zeekr riding the arrow, coins, family waving.
const PRESET = {
  defaultImage: "https://pages.rewiring.nz/ev-salary-boost-assets/zeekr-arrow-family.webp",
  accentStyle: "text" as const,
  imagePosition: "50% 100%",
  imageFit: "contain" as const,
  defaults: ESB_DEFAULTS,
};

export default function EsbCtaCard(props: CampaignCardProps) {
  return <CampaignCard preset={PRESET} {...props} />;
}
