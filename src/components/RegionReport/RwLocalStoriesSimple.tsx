"use client";

// Simple (link-out) stand-in for the Local Stories carousel: one card with a
// button through to the stories themselves. Use it while the CMS-bound
// RwLocalStoryCard version is being finished; the two are interchangeable in
// the page because both answer the report's "#stories" jump link.
import React from "react";
import SimpleSection from "./simpleSection";

interface LinkValue {
  href: string;
  target?: string;
}

/** Webflow Link props come back as "#" when left empty in the props panel. */
function linkHref(v?: LinkValue): string {
  const h = (v?.href || "").trim();
  return h && h !== "#" ? h : "";
}

export interface RwLocalStoriesSimpleProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  storiesUrl?: LinkValue;
  anchorId?: string;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwLocalStoriesSimple({
  heading = "Local stories",
  body = "Households around the motu have already made the switch — solar and batteries, EVs, heat pumps and induction cooking. Read what they changed, what it cost, and what they're saving now.",
  buttonLabel = "Read local stories",
  storiesUrl,
  anchorId = "stories",
  bgColor = "transparent",
  cardColor = "#ffffff",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: RwLocalStoriesSimpleProps) {
  // No default: there's no live stories index on rewiring.nz yet, and a button
  // pointing nowhere is worse than no button — so it only renders once the
  // Designer sets the URL.
  return (
    <SimpleSection
      heading={heading}
      body={body}
      buttonLabel={buttonLabel}
      href={linkHref(storiesUrl)}
      icon="arrow"
      anchorId={anchorId}
      bgColor={bgColor}
      cardColor={cardColor}
      inkColor={inkColor}
      accentColor={accentColor}
      goldColor={goldColor}
    />
  );
}
