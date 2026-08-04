import NzmeSolar from "./NzmeSolar";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeSolar, {
  name: "NZME Solar Giveaway",
  description: "Plug-in solar donations section - what each stretch threshold gives to low-income homes.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "The charitable component", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "Plug-in solar for low-income homes", group: "Content" }),
    intro: props.Text({
      name: "Intro",
      defaultValue:
        "If we reach our stretch targets, we will commit to buying plug-in solar panels that we can give to low-income homes. The further the thermometer climbs, the more homes get New Zealand-made energy on the wall.",
      group: "Content",
    }),
    outro: props.Text({
      name: "Outro",
      defaultValue: "",
      group: "Content",
    }),
    image: props.Image({ name: "Image", group: "Content" }),
    chip1Raised: props.Text({ name: "Milestone 1 raised", defaultValue: "$50,000 raised", group: "Milestones" }),
    chip1Solar: props.Text({ name: "Milestone 1 solar", defaultValue: "$10,000 worth of plug-in solar panels for low-income homes", group: "Milestones" }),
    chip2Raised: props.Text({ name: "Milestone 2 raised", defaultValue: "$100,000 raised", group: "Milestones" }),
    chip2Solar: props.Text({ name: "Milestone 2 solar", defaultValue: "$20,000 worth of plug-in solar panels for low-income homes", group: "Milestones" }),
    chip3Raised: props.Text({ name: "Milestone 3 raised", defaultValue: "$250,000 raised", group: "Milestones" }),
    chip3Solar: props.Text({ name: "Milestone 3 solar", defaultValue: "$50,000 worth of plug-in solar panels for low-income homes", group: "Milestones" }),
    ctaText: props.Text({ name: "CTA text", defaultValue: "Push the thermometer up", group: "CTA" }),
    ctaUrl: props.Link({ name: "CTA URL", group: "CTA" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
  },
});
