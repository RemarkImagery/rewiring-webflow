import NeHero from "./NeHero";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeHero, {
  name: "NE Hero",
  description:
    "Full-screen Neighbourhood Effect hero. Displays the hand-drawn artwork edge-to-edge at viewport height.",
  group: "Neighbourhood Effect",
  options: { ssr: true },
  props: {
    heroImage: props.Image({
      name: "Hero Image",
      group: "Content",
      tooltip: "Full-screen hero artwork. Default uses the Neighbourhood Effect houses illustration.",
    }),
    heroImageAlt: props.Text({
      name: "Image Alt Text",
      defaultValue:
        "Neighbourhood Effect — solar-powered houses connected by hand-drawn lines",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#fdf7ea",
      group: "Style",
      tooltip:
        "Cream by default — matches the artwork. Shows behind the image for any letterboxing.",
    }),
    fitMode: props.Text({
      name: "Fit Mode",
      defaultValue: "contain",
      group: "Style",
      tooltip: "'contain' shows the whole image at its natural scale (cream shows above/below on wide viewports - merges seamlessly with the artwork's own bg). 'cover' fills the viewport but crops the sides.",
    }),
    objectPosition: props.Text({
      name: "Object Position",
      defaultValue: "center",
      group: "Style",
      tooltip: "Where the image anchors when cropped. e.g. 'center', 'top', 'left center'.",
    }),
  },
});
