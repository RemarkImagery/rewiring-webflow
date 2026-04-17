import TccbPartners from "./TccbPartners";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbPartners, {
  name: "TCCB Partners",
  description: "Partners logo grid with progress tracker and government challenge callout for NZ electric fleet transition.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Who\u2019s On Board",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Collaborating to accelerate NZ\u2019s electric fleet transition",
      group: "Content",
    }),
    pledgeCount: props.Number({
      name: "Pledge Count",
      defaultValue: 42,
      group: "Progress",
    }),
    pledgeTarget: props.Number({
      name: "Pledge Target",
      defaultValue: 100,
      group: "Progress",
    }),
    showProgressBar: props.Boolean({
      name: "Show Progress Bar",
      defaultValue: true,
      group: "Progress",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
