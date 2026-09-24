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

/** Webflow Image props arrive as { src, alt } (or a bare string in the harness). */
export function imageSrc(v: any): string {
  if (!v) return "";
  if (typeof v === "string") return v.trim();
  return typeof v === "object" && v.src ? String(v.src).trim() : "";
}

/** The volunteers photo from the PDF's community card (Jay, 25 Sep). Hosted beside the PDFs. */
export const COMMUNITY_PHOTO = "https://regional-reports.pages.dev/img/community-volunteers.jpg";

export interface RwCommunitySimpleProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  communitiesUrl?: LinkValue;
  /** Banner photo; blank = the PDF's volunteers photo. */
  image?: any;
  /** "off" hides the photo and renders the plain card. */
  showImage?: string;
  anchorId?: string;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwCommunitySimple({
  heading = "Your local community groups",
  body = "Volunteer-run community groups driven by locals for locals are making it easier for people across the region to electrify their lives. Running regular events, leading local advocacy and providing advice to households, these electric communities are your local guide to lower energy bills, lower emissions and greater resilience by going electric.",
  buttonLabel = "Find your nearest group",
  communitiesUrl,
  image,
  showImage = "on",
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
      imageUrl={showImage === "off" ? "" : imageSrc(image) || COMMUNITY_PHOTO}
      imageAlt={image?.alt || "Electric community volunteers"}
      anchorId={anchorId}
      bgColor={bgColor}
      cardColor={cardColor}
      inkColor={inkColor}
      accentColor={accentColor}
      goldColor={goldColor}
    />
  );
}
