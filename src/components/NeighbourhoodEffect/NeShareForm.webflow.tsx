import NeShareForm from "./NeShareForm";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeShareForm, {
  name: "NE Share Form",
  description:
    "Single submission form for the Neighbourhood Effect campaign — text story plus optional image and video upload. Posts to the configured API endpoint.",
  group: "Neighbourhood Effect",
  options: { ssr: false },
  props: {
    subtitle: props.Text({
      name: "Eyebrow",
      defaultValue: "Share your story",
      group: "Content",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Tell us how you did it.",
      group: "Content",
    }),
    intro: props.Text({
      name: "Intro Text",
      defaultValue:
        "Whether at home or at work, tell us how much you're saving on electricity, gas, petrol or diesel — and what got you over the line. And share any stories about how you convinced others to follow your lead.",
      group: "Content",
    }),
    influencedLabel: props.Text({
      name: "Influenced Label",
      defaultValue: "Who did you electrify? (or who influenced you?)",
      group: "Content",
    }),
    influencedPlaceholder: props.Text({
      name: "Influenced Placeholder",
      defaultValue: "e.g. My mum, my dad, three neighbours, my boss…",
      group: "Content",
    }),
    storyLabel: props.Text({
      name: "Story Label",
      defaultValue: "Your story",
      group: "Content",
    }),
    storyPlaceholder: props.Text({
      name: "Story Placeholder",
      defaultValue:
        "How did you electrify your life — and how did you electrify someone else's? What got you over the line? What got them over the line?",
      group: "Content",
    }),
    buttonText: props.Text({
      name: "Button Text",
      defaultValue: "Share Your Story",
      group: "Content",
    }),
    apiUrl: props.Text({
      name: "API URL",
      defaultValue: "https://neighbourhood-effect-api.oj-f3d.workers.dev",
      group: "Settings",
      tooltip:
        "Worker endpoint for /api/upload/image, /api/upload/video and /api/submit. Default points at the production worker.",
    }),
    bgColor: props.Text({
      name: "Section Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    cardBg: props.Text({
      name: "Form Card Background",
      defaultValue: "#ffffff",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent (CTA)",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
  },
});
