import TccbHero from "./TccbHero";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbHero, {
  name: "TCCB Hero",
  description:
    "Hero section for The 25% Electric Challenge business page with animated pledge counter.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Drive to 25 — NZ Businesses Leading the Charge",
      group: "Content",
    }),
    subtitle: props.RichText({
      name: "Subtitle",
      defaultValue:
        "A challenge to NZ businesses to make 25% of new fleet purchases fully electric by June 2027",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Take the Pledge",
      group: "Content",
    }),
    pledgeCount: props.Number({
      name: "Pledge Count",
      defaultValue: 42,
      group: "Content",
    }),
    showCounter: props.Boolean({
      name: "Show Counter",
      defaultValue: true,
      group: "Content",
    }),
    logoImage: props.Image({
      name: "Logo Image",
      group: "Content",
      tooltip: "Optional logo displayed above the headline",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
});
