import NeBanner from "./NeBanner";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeBanner, {
  name: "NE Banner",
  description:
    "Dark teal banner with cycling 'Electrify your X' phrase, closing line, and CTA. Sits below the NE Hero.",
  group: "Neighbourhood Effect",
  options: { ssr: false },
  props: {
    phrasePrefix: props.Text({
      name: "Phrase Prefix",
      defaultValue: "Electrify",
      group: "Content",
      tooltip: "Static word at the start of every cycle. e.g. 'Electrify'.",
    }),
    phrase1: props.Text({
      name: "Phrase 1",
      defaultValue: "your mum",
      group: "Phrases",
    }),
    phrase2: props.Text({
      name: "Phrase 2",
      defaultValue: "your dad",
      group: "Phrases",
    }),
    phrase3: props.Text({
      name: "Phrase 3",
      defaultValue: "your grumpy uncle",
      group: "Phrases",
    }),
    phrase4: props.Text({
      name: "Phrase 4",
      defaultValue: "your boss",
      group: "Phrases",
    }),
    phrase5: props.Text({
      name: "Phrase 5",
      defaultValue: "your mates",
      group: "Phrases",
    }),
    phrase6: props.Text({
      name: "Phrase 6",
      defaultValue: "everyone!",
      group: "Phrases",
    }),
    closingLine: props.Text({
      name: "Closing Line",
      defaultValue: "And then tell us how you did it.",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "Or tell us who influenced you.",
      group: "Content",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Share Your Story",
      group: "CTA",
    }),
    ctaHref: props.Link({
      name: "CTA Link",
      group: "CTA",
      tooltip: "Where the button goes. Default '#share' jumps to the share form anchor.",
    }),
    bgColor: props.Text({
      name: "Background",
      defaultValue: "#234e4c",
      group: "Style",
    }),
    prefixColor: props.Text({
      name: "Prefix Color",
      defaultValue: "#fdf7ea",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Cycling Word Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    closingColor: props.Text({
      name: "Closing Text Color",
      defaultValue: "#d1e0df",
      group: "Style",
    }),
    ctaBgColor: props.Text({
      name: "CTA Background",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    ctaTextColor: props.Text({
      name: "CTA Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
  },
});
