import TccbWhy from "./TccbWhy";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbWhy, {
  name: "TCCB Why Businesses Lead",
  description: "Section explaining why business fleet purchases matter for NZ's EV transition, with three stat callout cards.",
  group: "TCC Business",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Businesses Need to Lead",
      group: "Content",
    }),
    body: props.RichText({
      name: "Body",
      defaultValue:
        "Businesses buy 60% of all new vehicles in New Zealand. Households can\u2019t drive this transition alone \u2014 and the second-hand EV market depends on what businesses buy today.",
      group: "Content",
    }),
    stat1Number: props.Text({
      name: "Stat 1 Number",
      defaultValue: "150,000",
      group: "Stats",
    }),
    stat1Label: props.Text({
      name: "Stat 1 Label",
      defaultValue: "new vehicles bought per year",
      group: "Stats",
    }),
    stat2Number: props.Text({
      name: "Stat 2 Number",
      defaultValue: "60%",
      group: "Stats",
    }),
    stat2Label: props.Text({
      name: "Stat 2 Label",
      defaultValue: "purchased by businesses",
      group: "Stats",
    }),
    stat3Number: props.Text({
      name: "Stat 3 Number",
      defaultValue: "22,500",
      group: "Stats",
    }),
    stat3Label: props.Text({
      name: "Stat 3 Label",
      defaultValue: "BEVs = back to 2023 levels",
      group: "Stats",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
});
