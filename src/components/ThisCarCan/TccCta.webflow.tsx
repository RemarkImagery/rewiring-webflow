import TccCta from "./TccCta";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccCta, {
  name: "TCC Call to Action",
  description: "Campaign intro section with heading, description, and two CTA buttons.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "What is This Car Can?",
      group: "Content",
    }),
    description: props.RichText({
      name: "Description",
      defaultValue:
        "This Car Can is a campaign celebrating the real stories of everyday people making the switch to electric vehicles. From saving thousands on fuel to charging on the driveway — we're sharing the awesome ways car electrification is changing lives across Aotearoa.",
      group: "Content",
    }),
    primaryButtonText: props.Text({
      name: "Primary Button Text",
      defaultValue: "Share Your Story",
      group: "Content",
    }),
    secondaryButtonText: props.Text({
      name: "Secondary Button Text",
      defaultValue: "Read the Stories",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#234e4c",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
});
