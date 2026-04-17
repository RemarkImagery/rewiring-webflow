import TccbFooterCta from "./TccbFooterCta";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbFooterCta, {
  name: "TCCB Footer CTA",
  description:
    "Full-width footer call-to-action banner with dual buttons and social sharing icons.",
  group: "TCC Business",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Join the Drive to 25. Take the pledge today.",
      group: "Content",
    }),
    primaryText: props.Text({
      name: "Primary Button Text",
      defaultValue: "Take the Pledge",
      group: "Content",
    }),
    secondaryText: props.Text({
      name: "Secondary Button Text",
      defaultValue: "Talk to Us",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    showSocialLinks: props.Boolean({
      name: "Show Social Links",
      defaultValue: true,
      group: "Content",
    }),
  },
});
