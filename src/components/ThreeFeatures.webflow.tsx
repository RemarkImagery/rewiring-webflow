import ThreeFeatures from "./ThreeFeatures";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

function featProps(n: number) {
  return {
    [`feat${n}Icon`]: props.Image({
      name: `Feature ${n} Icon`,
      group: `Feature ${n}`,
    }),
    [`feat${n}Title`]: props.Text({
      name: `Feature ${n} Title`,
      defaultValue: "",
      group: `Feature ${n}`,
    }),
    [`feat${n}Body`]: props.Text({
      name: `Feature ${n} Body`,
      defaultValue: "",
      group: `Feature ${n}`,
    }),
  };
}

export default declareComponent(ThreeFeatures, {
  name: "Three Features",
  description:
    "Three-column feature section with icons, uppercase titles, and body text inside a rounded card.",
  group: "Sections",
  options: {
    ssr: false,
  },
  props: {
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "transparent",
      group: "Settings",
    }),
...featProps(1),
    ...featProps(2),
    ...featProps(3),
  },
});
