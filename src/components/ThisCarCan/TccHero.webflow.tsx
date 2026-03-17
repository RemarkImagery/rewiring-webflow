import TccHero from "./TccHero";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccHero, {
  name: "TCC Hero",
  description:
    "Animated hero section with typewriter phrases, cycling car images, and radial gradient background.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    logoImage: props.Image({
      name: "Logo Image",
      group: "Content",
      tooltip: "The 'This Car Can' branded logo image",
    }),
    bgPatternImage: props.Image({
      name: "Background Pattern",
      group: "Style",
      tooltip: "Semi-transparent pattern overlay on the hero background",
    }),
    personImage: props.Image({
      name: "Person Image",
      group: "Content",
      tooltip: "Cut-out person image that pops up in front of the car",
    }),
    phrase1: props.Text({
      name: "Phrase 1",
      defaultValue: "Super Fast Charge",
      group: "Content",
    }),
    phrase2: props.Text({
      name: "Phrase 2",
      defaultValue: "Charge On My Drive",
      group: "Content",
    }),
    phrase3: props.Text({
      name: "Phrase 3",
      defaultValue: "Save Me Thousands",
      group: "Content",
    }),
    phrase4: props.Text({
      name: "Phrase 4",
      defaultValue: "Reduce My Emissions",
      group: "Content",
    }),
    carImage1: props.Image({
      name: "Car Image 1",
      group: "Content",
    }),
    carImage2: props.Image({
      name: "Car Image 2",
      group: "Content",
    }),
    carImage3: props.Image({
      name: "Car Image 3",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#2d5c5a",
      group: "Style",
      tooltip: "Outer gradient color",
    }),
    bgCenterColor: props.Text({
      name: "Background Center Color",
      defaultValue: "#1e3f3e",
      group: "Style",
      tooltip: "Inner radial gradient center color",
    }),
  },
});
