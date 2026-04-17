import TccbSupport from "./TccbSupport";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbSupport, {
  name: "TCCB Support",
  description:
    "Accordion section showing how Rewiring Aotearoa supports businesses through advocacy, resources, promotion, deals, and monitoring.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "How We\u2019ll Support You",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue:
        "Rewiring Aotearoa is here to make your transition easier",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
});
