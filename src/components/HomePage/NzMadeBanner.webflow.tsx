import NzMadeBanner from "./NzMadeBanner";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzMadeBanner, {
  name: "NZ Made Energy Banner",
  description:
    "Hero banner for NZ Made Energy campaign with parallax banner image, Mike Casey cutout, heading, tagline and CTA button.",
  group: "Home Page",
  options: { ssr: false },
  props: {
    bannerImage: props.Image({
      name: "Banner Image",
      group: "Content",
      tooltip: "The hanging neon NZ Made Energy banner",
    }),
    mikeImage: props.Image({
      name: "Mike Image",
      group: "Content",
      tooltip: "Mike Casey cutout image (screen blend mode)",
    }),
    backgroundImage: props.Image({
      name: "Background Image",
      group: "Content",
      tooltip: "Background landscape image",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "New Zealand",
      group: "Content",
    }),
    headingAccent: props.Text({
      name: "Heading Accent",
      defaultValue: "Made Energy",
      group: "Content",
    }),
    tagline: props.Text({
      name: "Tagline",
      defaultValue:
        "The status quo is a choice. But there is another option: make New Zealand-made energy our North Star.",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Learn more",
      group: "Content",
    }),
    ctaUrl: props.Text({
      name: "CTA URL",
      defaultValue: "https://nzmadeenergy.nz",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
  },
});
