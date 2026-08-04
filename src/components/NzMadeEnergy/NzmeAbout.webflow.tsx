import NzmeAbout from "./NzmeAbout";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeAbout, {
  name: "NZME About / Big Idea",
  description: "Campaign explainer - the big idea, top-down/bottom-up/a-bit-mad pillars, and headline stats.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "What's the big idea?", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "A serious message, delivered by a Laser Kiwi", group: "Content" }),
    intro1: props.Text({
      name: "Intro paragraph 1",
      defaultValue:
        "As always, our approach is to try and capture mainstream and social media attention and share our serious message in an engaging way. To do that, we need to do something a bit mad, so we're sending Mike Casey on a mission to the Beehive dressed as a Laser Kiwi to promote the idea of New Zealand-made energy.",
      group: "Content",
    }),
    intro2: props.Text({
      name: "Intro paragraph 2",
      defaultValue:
        "Everyone wins when we go electric. And in the coming years, New Zealand has a unique opportunity to set itself up as a beacon for the world to follow on. This campaign is a cherry on top of three years of relentless advocacy to ensure that happens.",
      group: "Content",
    }),
    card1Title: props.Text({ name: "Pillar 1 title", defaultValue: "Top-down", group: "Pillars" }),
    card1Text: props.Text({
      name: "Pillar 1 text",
      defaultValue:
        "We want all our MPs, no matter where they are on the political spectrum, to push for more New Zealand-made energy running through more efficient electric machines, because electrification is key to our economic growth, energy security and emissions reduction goals.",
      group: "Pillars",
    }),
    card2Title: props.Text({ name: "Pillar 2 title", defaultValue: "Bottom-up", group: "Pillars" }),
    card2Text: props.Text({
      name: "Pillar 2 text",
      defaultValue:
        "We want more New Zealanders to understand the benefits of going electric in their own lives. Energy is a low-interest category. We want to capture their attention.",
      group: "Pillars",
    }),
    card3Title: props.Text({ name: "Pillar 3 title", defaultValue: "A bit mad", group: "Pillars" }),
    card3Text: props.Text({
      name: "Pillar 3 text",
      defaultValue:
        "If we get enough support, we'll go bigger and book billboards and TV ads, or actually build a massive Laser Kiwi that we will tow to Wellington.",
      group: "Pillars",
    }),
    stat1Number: props.Text({ name: "Stat 1 number", defaultValue: "", group: "Stats" }),
    stat1Label: props.Text({ name: "Stat 1 label", defaultValue: "", group: "Stats" }),
    stat2Number: props.Text({ name: "Stat 2 number", defaultValue: "", group: "Stats" }),
    stat2Label: props.Text({ name: "Stat 2 label", defaultValue: "", group: "Stats" }),
    stat3Number: props.Text({ name: "Stat 3 number", defaultValue: "", group: "Stats" }),
    stat3Label: props.Text({ name: "Stat 3 label", defaultValue: "", group: "Stats" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
