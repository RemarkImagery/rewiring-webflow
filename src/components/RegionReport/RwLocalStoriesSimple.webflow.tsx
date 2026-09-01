import RwLocalStoriesSimple from "./RwLocalStoriesSimple";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwLocalStoriesSimple, {
  name: "RW Local Stories (Simple)",
  description:
    "Plain stand-in for the local stories carousel: heading, short paragraph and one button through to the stories. No CMS binding needed. Keeps the #stories anchor so the report's jump cards still work. The button only appears once a URL is set.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Local stories", group: "Content" }),
    body: props.Text({
      name: "Body text",
      defaultValue:
        "Households around the motu have already made the switch — solar and batteries, EVs, heat pumps and induction cooking. Read what they changed, what it cost, and what they're saving now.",
      group: "Content",
    }),
    buttonLabel: props.Text({ name: "Button label", defaultValue: "Read local stories", group: "Content" }),
    storiesUrl: props.Link({ name: "Button URL (button hides until set)", group: "Content" }),
    anchorId: props.Text({ name: "Anchor id", defaultValue: "stories", group: "Content" }),
    bgColor: props.Text({ name: "Section background", defaultValue: "transparent", group: "Style" }),
    cardColor: props.Text({ name: "Card background", defaultValue: "#ffffff", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
