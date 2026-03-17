import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevSavings from "./WlevSavings";

export default declareComponent(WlevSavings, {
  name: "WLEV Savings",
  description: "Stat cards showing EV cost savings — energy, maintenance, lifetime",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "EVs Save You Money",
      group: "Content",
    }),
    body: props.Text({
      name: "Body",
      defaultValue: "We love EVs because they\u2019re kinder on your wallet. Cheaper energy, fewer moving parts, and lower lifetime costs.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
  options: {
    ssr: true,
  },
});
