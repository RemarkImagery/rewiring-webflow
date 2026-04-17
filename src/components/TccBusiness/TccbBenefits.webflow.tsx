import TccbBenefits from "./TccbBenefits";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbBenefits, {
  name: "TCCB Benefits Grid",
  description: "Six benefit cards showing why going electric is good for business, in a responsive grid layout.",
  group: "TCC Business",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "What\u2019s In It For Your Business?",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "The case for going electric is stronger than ever.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
