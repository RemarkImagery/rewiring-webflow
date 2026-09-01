"use client";

// Simple (link-out) stand-in for RwCommunityGroups: one card with a button
// through to the community groups directory. No Collection List, no hosted
// JSON, no map — use it while the full version and its CMS wiring are being
// finished. Carries the same "#community" anchor as the full component.
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

const COMMUNITIES_URL = "https://www.rewiring.nz/communities";

export interface RwCommunitySimpleProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  communitiesUrl?: LinkValue;
  anchorId?: string;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwCommunitySimple({
  heading = "Electric community",
  body = "Electric community groups across the country are helping locals go electric. These groups share honest advice, run home tours and events, and can help households make the switch.",
  buttonLabel = "Find a community group",
  communitiesUrl,
  anchorId = "community",
  bgColor = "transparent",
  cardColor = "#ffffff",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: RwCommunitySimpleProps) {
  return (
    <SimpleSection
      heading={heading}
      body={body}
      buttonLabel={buttonLabel}
      href={linkHref(communitiesUrl) || COMMUNITIES_URL}
      icon="people"
      anchorId={anchorId}
      bgColor={bgColor}
      cardColor={cardColor}
      inkColor={inkColor}
      accentColor={accentColor}
      goldColor={goldColor}
    />
  );
}
