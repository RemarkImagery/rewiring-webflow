import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevHero from "./WlevHero";

export default declareComponent(WlevHero, {
  name: "WLEV Hero",
  description: "Hero section for Why We Love EVs — animated parts counter and CTA",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Lower Bills and Way More Fun!",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Good for your wallet, better for the environment, and very easy to do. Upgrading to an EV is also a lot of fun.",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Find Out More",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
  options: {
    ssr: false,
  },
});
