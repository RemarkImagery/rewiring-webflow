import OlkVideoCard from "./OlkVideoCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(OlkVideoCard, {
  name: "OLK Video",
  description: "Operation Laser Kiwi campaign video embed (any YouTube link) with optional heading, caption and CTA.",
  group: "NZ Made Energy",
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "Watch", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "Operation Laser Kiwi is go", group: "Content" }),
    videoUrl: props.Text({
      name: "YouTube URL",
      defaultValue: "https://www.youtube.com/watch?v=5uNCpoSxbKs",
      group: "Content",
    }),
    caption: props.Text({ name: "Caption (optional)", defaultValue: "", group: "Content" }),
    ctaText: props.Text({ name: "CTA label (blank = hidden)", defaultValue: "", group: "Content" }),
    ctaUrl: props.Text({
      name: "CTA URL",
      defaultValue: "https://pages.rewiring.nz/operation-laser-kiwi",
      group: "Content",
    }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Colours" }),
    accentColor: props.Text({ name: "Neon accent colour", defaultValue: "#4bf03c", group: "Colours" }),
  },
});
