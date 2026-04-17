import CardReveal from "./CardReveal";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

function cardProps(n: number) {
  return {
    [`card${n}Image`]: props.Image({
      name: `Card ${n} Image`,
      group: `Card ${n}`,
    }),
    [`card${n}Title`]: props.Text({
      name: `Card ${n} Title`,
      defaultValue: "",
      group: `Card ${n}`,
    }),
    [`card${n}Body`]: props.Text({
      name: `Card ${n} Body`,
      defaultValue: "",
      group: `Card ${n}`,
    }),
    [`card${n}BtnText`]: props.Text({
      name: `Card ${n} Button Text`,
      defaultValue: "",
      group: `Card ${n}`,
    }),
    [`card${n}BtnLink`]: props.Text({
      name: `Card ${n} Button Link`,
      defaultValue: "",
      group: `Card ${n}`,
    }),
  };
}

export default declareComponent(CardReveal, {
  name: "Card Reveal",
  description:
    "Three cards that animate in on scroll with a slide-up and rotation effect. Each card has an image, title, body text, and optional button.",
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
    ...cardProps(1),
    ...cardProps(2),
    ...cardProps(3),
  },
});
