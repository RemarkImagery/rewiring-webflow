import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevBenefits from "./WlevBenefits";

export default declareComponent(WlevBenefits, {
  name: "WLEV Benefits",
  description: "6-card grid — quieter, emissions, regen, safety, V2L, batteries",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "More Reasons Kiwis Love EVs",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "It\u2019s not just about the money \u2014 EVs are better in almost every way.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
  options: {
    ssr: true,
  },
});
