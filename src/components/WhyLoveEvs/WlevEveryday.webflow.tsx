import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevEveryday from "./WlevEveryday";

export default declareComponent(WlevEveryday, {
  name: "WLEV Everyday",
  description: "Tabbed section — Range, Commute, Hills, Fun & Fast",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Built for Everyday Life",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "EVs go further than most Kiwis drive in a typical day \u2014 or week.",
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
