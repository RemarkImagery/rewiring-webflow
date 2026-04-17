import TccbPledge from "./TccbPledge";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbPledge, {
  name: "TCCB Pledge",
  description: "The Pledge — How It Works. Three-step visual with CTA button and optional digital badge preview.",
  group: "TCC Business",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "How It Works",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Three simple steps to join the Drive to 25",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Take the 25% Challenge",
      group: "Content",
    }),
    showBadge: props.Boolean({
      name: "Show Badge",
      defaultValue: true,
      group: "Display",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
});
