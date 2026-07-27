import NzmeSupportCta from "./NzmeSupportCta";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeSupportCta, {
  name: "NZME Support CTA",
  description: "Three ways to support the campaign (donate / auction items / contra offers) plus matched-funding note and donate CTA.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Help make the electric boat go faster", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Three ways to get behind Operation Laser Kiwi - every dollar pushes the thermometer up a tier.",
      group: "Content",
    }),
    card1Title: props.Text({ name: "Card 1 title", defaultValue: "Donate", group: "Card 1" }),
    card1Text: props.Text({
      name: "Card 1 text",
      defaultValue:
        "Chip in whatever you can, or grab some merch - Laser Kiwi t-shirts, key rings, stickers and the Sexiest Electric Machines calendar.",
      group: "Card 1",
    }),
    card1Image: props.Image({ name: "Card 1 image", group: "Card 1" }),
    card2Title: props.Text({ name: "Card 2 title", defaultValue: "Donate something of value", group: "Card 2" }),
    card2Text: props.Text({
      name: "Card 2 text",
      defaultValue:
        "Got an experience worth auctioning? A guitar lesson, a boat party, a drag race in an electric truck, lunch at the cherry orchard - we'll auction it for the cause.",
      group: "Card 2",
    }),
    card2Image: props.Image({ name: "Card 2 image", group: "Card 2" }),
    card3Title: props.Text({ name: "Card 3 title", defaultValue: "Business contra offers", group: "Card 3" }),
    card3Text: props.Text({
      name: "Card 3 text",
      defaultValue:
        "In the sector? Donate an EV, a solar and battery install, an induction hob, a hot water heat pump, an EV charger or $10,000 of electricity.",
      group: "Card 3",
    }),
    card3Image: props.Image({ name: "Card 3 image", group: "Card 3" }),
    matchNote: props.Text({
      name: "Matched funding note",
      defaultValue: "We're working on a funder matching every dollar raised - doubling whatever you give.",
      group: "Content",
    }),
    ctaText: props.Text({ name: "CTA text", defaultValue: "Donate to the campaign", group: "CTA" }),
    ctaUrl: props.Link({ name: "CTA URL", group: "CTA" }),
    formHeading: props.Text({ name: "Contra form heading", defaultValue: "Offer a product or service", group: "Contra form" }),
    formDemoNote: props.Text({ name: "Contra form demo note", defaultValue: "Demo only - offers aren't stored or binding (yet!).", group: "Contra form" }),
    formSuccess: props.Text({
      name: "Contra form success message",
      defaultValue: "Legend! Your offer is in. The Rewiring team will be in touch to sort the details.",
      group: "Contra form",
    }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
