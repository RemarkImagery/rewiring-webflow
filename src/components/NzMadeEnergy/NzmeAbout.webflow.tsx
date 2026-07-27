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
        "Energy is a low-interest category - most New Zealanders switch off the moment it comes up. So we're doing something a bit mad to switch them back on: sending Mike Casey the length of the country to the Beehive, dressed as a Laser Kiwi, to make the case for New Zealand-made energy.",
      group: "Content",
    }),
    intro2: props.Text({
      name: "Intro paragraph 2",
      defaultValue:
        "More than half of the energy New Zealand uses is imported. Energy independence doesn't come on ships - it comes from rooftops, hydro dams, wind turbines, geothermal wells and solar farms, running through efficient electric machines. Everyone wins when we go electric.",
      group: "Content",
    }),
    card1Title: props.Text({ name: "Pillar 1 title", defaultValue: "Top-down", group: "Pillars" }),
    card1Text: props.Text({
      name: "Pillar 1 text",
      defaultValue:
        "Get every MP - whatever their colours - pushing for New Zealand-made energy, so electrification is baked into our national psyche well beyond the election.",
      group: "Pillars",
    }),
    card2Title: props.Text({ name: "Pillar 2 title", defaultValue: "Bottom-up", group: "Pillars" }),
    card2Text: props.Text({
      name: "Pillar 2 text",
      defaultValue:
        "Show everyday New Zealanders what going electric does for their own lives: warmer homes, cheaper driving, lower bills.",
      group: "Pillars",
    }),
    card3Title: props.Text({ name: "Pillar 3 title", defaultValue: "A bit mad", group: "Pillars" }),
    card3Text: props.Text({
      name: "Pillar 3 text",
      defaultValue:
        "Capture attention the Rewiring way - a Laser Kiwi mission to Parliament, and if the country gets behind it, the world's biggest ever Laser Kiwi.",
      group: "Pillars",
    }),
    stat1Number: props.Text({ name: "Stat 1 number", defaultValue: "$7,600", group: "Stats" }),
    stat1Label: props.Text({ name: "Stat 1 label", defaultValue: "a household can save every year by going electric", group: "Stats" }),
    stat2Number: props.Text({ name: "Stat 2 number", defaultValue: ">50%", group: "Stats" }),
    stat2Label: props.Text({ name: "Stat 2 label", defaultValue: "of the energy New Zealand uses is imported", group: "Stats" }),
    stat3Number: props.Text({ name: "Stat 3 number", defaultValue: "Billions", group: "Stats" }),
    stat3Label: props.Text({ name: "Stat 3 label", defaultValue: "saved for the country when we run on our own electrons", group: "Stats" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
