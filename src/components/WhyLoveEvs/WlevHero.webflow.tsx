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
    subtitle: props.RichText({
      name: "Subtitle",
      defaultValue: "Good for your wallet, better for the environment, and very easy to do. Upgrading to an EV is also a lot of fun.",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Find Out More",
      group: "Content",
    }),
    evPartsLabel: props.Text({
      name: "EV Parts Label",
      defaultValue: "moving parts in an EV",
      group: "Counter",
    }),
    icePartsLabel: props.Text({
      name: "ICE Parts Label",
      defaultValue: "in a petrol car",
      group: "Counter",
    }),
    bullet1: props.Text({
      name: "Bullet 1",
      defaultValue: "Built for everyday life",
      group: "Bullets",
    }),
    bullet2: props.Text({
      name: "Bullet 2",
      defaultValue: "Cheaper to fill up and maintain",
      group: "Bullets",
    }),
    bullet3: props.Text({
      name: "Bullet 3",
      defaultValue: "Easy to charge at home and on trips",
      group: "Bullets",
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
  options: { ssr: false },
});
