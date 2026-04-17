import TccbFaq from "./TccbFaq";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbFaq, {
  name: "TCCB FAQ",
  description:
    "FAQ / myth-busting accordion section with card-style items and plus/minus toggle icons.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Common Questions",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue:
        "Everything you need to know about the 25% challenge",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
