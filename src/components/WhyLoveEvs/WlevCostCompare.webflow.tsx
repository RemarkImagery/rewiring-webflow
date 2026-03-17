import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCostCompare from "./WlevCostCompare";

export default declareComponent(WlevCostCompare, {
  name: "WLEV Cost Compare",
  description: "Interactive petrol vs EV weekly cost comparison with finance options",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "The Savings Stack Up Fast",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "EECA estimates the five-year cost of owning an EV is just 67.5% of the cost of a petrol car.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
  options: {
    ssr: false,
  },
});
