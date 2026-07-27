import NzmeTierGrid from "./NzmeTierGrid";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeTierGrid, {
  name: "NZME Tier Grid",
  description: "Four stretch-goal cards with illustrations; cards flip to 'Unlocked' as the raised amount passes each threshold.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The stretch goals", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "The campaign is tiered so we do something great no matter what. Hit a threshold and the next thing unlocks.",
      group: "Content",
    }),
    raisedAmount: props.Text({ name: "Raised so far (number)", defaultValue: "0", group: "Content" }),
    tier1Amount: props.Text({ name: "Tier 1 amount", defaultValue: "5000", group: "Tier 1" }),
    tier1Title: props.Text({ name: "Tier 1 title", defaultValue: "The Laser Kiwi suit", group: "Tier 1" }),
    tier1Text: props.Text({
      name: "Tier 1 text",
      defaultValue:
        "We buy Mike a Kiwi suit, laserify it, and he rides the length of the South Island — 944 km of electric hotspots, entrepreneurs and community groups, arriving at the Beehive with a Hiko Hikoi of EVs and e-bikes.",
      group: "Tier 1",
    }),
    tier1Image: props.Image({ name: "Tier 1 image", group: "Tier 1" }),
    tier2Amount: props.Text({ name: "Tier 2 amount", defaultValue: "50000", group: "Tier 2" }),
    tier2Title: props.Text({ name: "Tier 2 title", defaultValue: "Billboards + solar for homes", group: "Tier 2" }),
    tier2Text: props.Text({
      name: "Tier 2 text",
      defaultValue:
        "A nationwide billboard campaign pushing New Zealand-made energy — plus $10,000 of plug-in solar panels donated to low-income homes.",
      group: "Tier 2",
    }),
    tier2Image: props.Image({ name: "Tier 2 image", group: "Tier 2" }),
    tier3Amount: props.Text({ name: "Tier 3 amount", defaultValue: "100000", group: "Tier 3" }),
    tier3Title: props.Text({ name: "Tier 3 title", defaultValue: "Prime-time TV ads", group: "Tier 3" }),
    tier3Text: props.Text({
      name: "Tier 3 text",
      defaultValue:
        "TV ads take the message mainstream before the election — plus $20,000 of plug-in solar panels for low-income homes.",
      group: "Tier 3",
    }),
    tier3Image: props.Image({ name: "Tier 3 image", group: "Tier 3" }),
    tier4Amount: props.Text({ name: "Tier 4 amount", defaultValue: "250000", group: "Tier 4" }),
    tier4Title: props.Text({ name: "Tier 4 title", defaultValue: "The world's biggest Laser Kiwi", group: "Tier 4" }),
    tier4Text: props.Text({
      name: "Tier 4 text",
      defaultValue:
        "The full ad campaign, $50,000 of solar for low-income homes, and the world's biggest ever Laser Kiwi — solar panels on its back, green laser eyes — built and towed to Wellington.",
      group: "Tier 4",
    }),
    tier4Image: props.Image({ name: "Tier 4 image", group: "Tier 4" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
