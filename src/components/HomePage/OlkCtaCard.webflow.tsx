import OlkCtaCard from "./OlkCtaCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(OlkCtaCard, {
  name: "OLK CTA Card",
  description: "Operation Laser Kiwi campaign card with live raised total and CTA to the campaign page.",
  group: "NZ Made Energy",
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "New Zealand-made Energy", group: "Content" }),
    heading: props.Text({ name: "Heading line 1 (outline)", defaultValue: "Operation", group: "Content" }),
    headingAccent: props.Text({ name: "Heading line 2 (solid)", defaultValue: "Laser Kiwi", group: "Content" }),
    text: props.Text({
      name: "Text",
      defaultValue:
        "We're sending Mike Casey to the Beehive dressed as a Laser Kiwi to make the case for New Zealand-made energy. Fuel the mission: donate, bid in the auctions or grab some merch.",
      group: "Content",
    }),
    ctaText: props.Text({ name: "CTA label", defaultValue: "Join the mission", group: "Content" }),
    ctaUrl: props.Text({
      name: "CTA URL",
      defaultValue: "https://pages.rewiring.nz/operation-laser-kiwi",
      group: "Content",
    }),
    kiwiImage: props.Image({ name: "Side image (optional)", group: "Content" }),
    liveTotalsUrl: props.Text({
      name: "Live totals URL",
      defaultValue: "https://nzme-raisely-total.oj-f3d.workers.dev",
      group: "Advanced",
    }),
    raisedSuffix: props.Text({ name: "Raised suffix", defaultValue: "raised so far", group: "Advanced" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Colours" }),
    accentColor: props.Text({ name: "Neon accent colour", defaultValue: "#4bf03c", group: "Colours" }),
    buttonColor: props.Text({ name: "Button colour", defaultValue: "#f5b731", group: "Colours" }),
  },
});
