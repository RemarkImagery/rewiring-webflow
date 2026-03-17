import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevFaq from "./WlevFaq";

export default declareComponent(WlevFaq, {
  name: "WLEV FAQ",
  description: "Accordion FAQ — range, batteries, grid, recycling, cost, terrain, safety",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Frequently Asked Questions",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Everything you need to know about going electric in New Zealand.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
  options: {
    ssr: false,
  },
});
