import NeStories from "./NeStories";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeStories, {
  name: "NE Stories Frame",
  description:
    "Section frame for the Stories block — heading, intro, and closing copy on a dark teal background. Toggle the header/footer halves on or off so a CMS Collection List of NE Story Cards can sit between them.",
  group: "Neighbourhood Effect",
  options: { ssr: true },
  props: {
    showHeader: props.Boolean({
      name: "Show Heading + Intro",
      defaultValue: true,
      group: "Layout",
      tooltip:
        "Drop one instance with this ON above the Collection List, and another with this OFF + Show Closing ON below it.",
    }),
    showFooter: props.Boolean({
      name: "Show Closing Copy",
      defaultValue: true,
      group: "Layout",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Real Kiwis, electrifying their people.",
      group: "Header",
    }),
    intro: props.Text({
      name: "Intro Text",
      defaultValue:
        "Rewiring Aotearoa CEO Mike Casey has electrified his mum and dad — who are at quite different ends of the political spectrum — and influenced many other electric decisions.",
      group: "Header",
    }),
    closing: props.Text({
      name: "Closing Copy",
      defaultValue:
        "We've heard about an 88-year-old Leaf-driving Gran in an all-electric retirement village, and multi-generational families putting on solar and ripping out gas — and we want to hear more stories like this. Because the more you share stories, the more others are likely to follow.",
      group: "Footer",
    }),
    bgColor: props.Text({
      name: "Background",
      defaultValue: "#234e4c",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Heading Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#fdf7ea",
      group: "Style",
    }),
    mutedColor: props.Text({
      name: "Muted Text Color",
      defaultValue: "#d1e0df",
      group: "Style",
    }),
    topPadding: props.Text({
      name: "Top Padding",
      defaultValue: "80px",
      group: "Style",
      tooltip:
        "Set to '0' or '0px' on the bottom instance so it sits flush against the cards above.",
    }),
    bottomPadding: props.Text({
      name: "Bottom Padding",
      defaultValue: "80px",
      group: "Style",
    }),
  },
});
