import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import TccSlider from "./TccSlider";

export default declareComponent(TccSlider, {
  name: "TCC Parallax Slider",
  description: "Full-width parallax image slider with zoom transitions, captions, and auto-play",
  group: "This Car Can",
  props: {
    img1: props.Image({ name: "Image 1", group: "Images" }),
    img2: props.Image({ name: "Image 2", group: "Images" }),
    img3: props.Image({ name: "Image 3", group: "Images" }),
    img4: props.Image({ name: "Image 4", group: "Images" }),
    img5: props.Image({ name: "Image 5", group: "Images" }),
    caption1: props.RichText({ name: "Caption 1", group: "Captions" }),
    caption2: props.RichText({ name: "Caption 2", group: "Captions" }),
    caption3: props.RichText({ name: "Caption 3", group: "Captions" }),
    caption4: props.RichText({ name: "Caption 4", group: "Captions" }),
    caption5: props.RichText({ name: "Caption 5", group: "Captions" }),
    autoPlayInterval: props.Number({
      name: "Auto-play Interval (ms)",
      defaultValue: 5000,
      group: "Settings",
      tooltip: "Time between slide transitions in milliseconds",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
  },
  options: { ssr: false },
});
