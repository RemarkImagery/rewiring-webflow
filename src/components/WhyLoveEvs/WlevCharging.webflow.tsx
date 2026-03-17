import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCharging from "./WlevCharging";

export default declareComponent(WlevCharging, {
  name: "WLEV Charging",
  description: "Tabbed charging guide — At Home, On the Road, Charger Types table",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Charging is Simple, Smart, and Affordable",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Another reason we love EVs: charging fits seamlessly into everyday life.",
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
