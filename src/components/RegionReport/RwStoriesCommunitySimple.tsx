"use client";

// Local stories + community groups as two cards side by side (Jay, 23 Sep:
// "side by side the local stories and community groups boxes at the bottom").
// Same cards as RwLocalStoriesSimple and RwCommunitySimple, in one component
// so the Designer only has to swap two instances for this one. Each card keeps
// its own anchor (#stories, #community) so the report's jump cards still land.
// Stacks to one column on phones.
import React, { useId } from "react";
import SimpleSection from "./simpleSection";
import { COMMUNITY_PHOTO, imageSrc } from "./RwCommunitySimple";

const STORIES_URL = "https://www.rewiring.nz/story";
const COMMUNITIES_URL = "https://www.rewiring.nz/communities";

interface LinkValue {
  href: string;
  target?: string;
}

/** Webflow Link props come back as "#" when left empty in the props panel. */
function linkHref(v?: LinkValue): string {
  const h = (v?.href || "").trim();
  return h && h !== "#" ? h : "";
}

export interface RwStoriesCommunitySimpleProps {
  storiesHeading?: string;
  storiesBody?: string;
  storiesButtonLabel?: string;
  storiesUrl?: LinkValue;
  communityHeading?: string;
  communityBody?: string;
  communityButtonLabel?: string;
  communitiesUrl?: LinkValue;
  /** Community card banner photo; blank = the PDF's volunteers photo. */
  communityImage?: any;
  /** "off" hides the photo and renders the plain card. */
  showCommunityImage?: string;
  bgColor?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  goldColor?: string;
}

export default function RwStoriesCommunitySimple({
  storiesHeading = "Local stories",
  storiesBody = "Households around the motu have already made the switch — solar and batteries, EVs, heat pumps and induction cooking. Read what they changed, what it cost, and what they're saving now.",
  storiesButtonLabel = "Explore case studies",
  storiesUrl,
  communityHeading = "Your local community groups",
  communityBody = "Volunteer-run community groups driven by locals for locals are making it easier for people across the region to electrify their lives. Running regular events, leading local advocacy and providing advice to households, these electric communities are your local guide to lower energy bills, lower emissions and greater resilience by going electric.",
  communityButtonLabel = "Find your nearest group",
  communitiesUrl,
  communityImage,
  showCommunityImage = "on",
  bgColor = "transparent",
  cardColor = "#ffffff",
  inkColor = "#1a3c3c",
  accentColor = "#234e4c",
  goldColor = "#f5b731",
}: RwStoriesCommunitySimpleProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const grid = `rw-scs-${uid}`;
  const style = { bgColor: "transparent", cardColor, inkColor, accentColor, goldColor };
  return (
    <div className={grid}>
      <style>{`
        .${grid}, .${grid} * { box-sizing: border-box; }
        .${grid} { background: ${bgColor}; padding: 96px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1200px; margin: 0 auto; align-items: stretch; }
        /* the cards' own section padding is for a full-width band; inside the grid the grid owns the spacing */
        .${grid} > div { padding: 0; }
        .${grid} > div > div { height: 100%; max-width: none; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        @media (max-width: 860px) { .${grid} { grid-template-columns: 1fr; padding: 56px 20px; gap: 20px; } }
      `}</style>
      <SimpleSection
        heading={storiesHeading}
        body={storiesBody}
        buttonLabel={storiesButtonLabel}
        href={linkHref(storiesUrl) || STORIES_URL}
        icon="arrow"
        anchorId="stories"
        {...style}
      />
      <SimpleSection
        heading={communityHeading}
        body={communityBody}
        buttonLabel={communityButtonLabel}
        href={linkHref(communitiesUrl) || COMMUNITIES_URL}
        icon="people"
        imageUrl={showCommunityImage === "off" ? "" : imageSrc(communityImage) || COMMUNITY_PHOTO}
        imageAlt={communityImage?.alt || "Electric community volunteers"}
        anchorId="community"
        {...style}
      />
    </div>
  );
}
