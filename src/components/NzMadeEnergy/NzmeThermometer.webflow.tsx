import NzmeThermometer from "./NzmeThermometer";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeThermometer, {
  name: "NZME Thermometer",
  description: "Fundraising thermometer with four stretch-goal thresholds and animated fill.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The fundraising thermometer", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Four thresholds. We do something no matter what - but every dollar takes it up a notch.",
      group: "Content",
    }),
    raisedAmount: props.Text({ name: "Raised so far (number)", defaultValue: "0", group: "Content" }),
    liveTotalsUrl: props.Text({ name: "Live totals URL (JSON {raised})", group: "Content" }),
    kiwiImage: props.Image({ name: "Kiwi mascot (rides the bar tip)", group: "Content" }),
    tier1Amount: props.Text({ name: "Tier 1 amount", defaultValue: "25000", group: "Tier 1" }),
    tier1Label: props.Text({ name: "Tier 1 label", defaultValue: "Laser Kiwi suit + the big ride + Wellington billboards", group: "Tier 1" }),
    tier2Amount: props.Text({ name: "Tier 2 amount", defaultValue: "50000", group: "Tier 2" }),
    tier2Label: props.Text({ name: "Tier 2 label", defaultValue: "National billboards + $10k of solar for homes", group: "Tier 2" }),
    tier3Amount: props.Text({ name: "Tier 3 amount", defaultValue: "100000", group: "Tier 3" }),
    tier3Label: props.Text({ name: "Tier 3 label", defaultValue: "TV ads + $20k of solar for homes", group: "Tier 3" }),
    tier4Amount: props.Text({ name: "Tier 4 amount", defaultValue: "250000", group: "Tier 4" }),
    tier4Label: props.Text({ name: "Tier 4 label", defaultValue: "All of the above, plus we build a massive laser kiwi and tow it to Wellington.", group: "Tier 4" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
  },
});
