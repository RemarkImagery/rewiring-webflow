import NeLinks from "./NeLinks";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeLinks, {
  name: "NE Resource Links",
  description:
    "Four-card grid linking out to Solar Streets, Going Electric, Bright Sparks, and This Car Can stories. Each card auto-detects external links and adds an arrow icon.",
  group: "Neighbourhood Effect",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Keep the spark spreading.",
      group: "Header",
    }),
    intro: props.Text({
      name: "Intro Text",
      defaultValue:
        "These groups are doing the mahi to make electrification easier for everyone.",
      group: "Header",
    }),

    link1Title: props.Text({
      name: "Link 1 Title",
      defaultValue: "Solar Streets",
      group: "Link 1",
    }),
    link1Desc: props.Text({
      name: "Link 1 Description",
      defaultValue:
        "Group-buy solar with your neighbours and bring the cost down for the whole street.",
      group: "Link 1",
    }),
    link1Href: props.Link({
      name: "Link 1 URL",
      group: "Link 1",
    }),

    link2Title: props.Text({
      name: "Link 2 Title",
      defaultValue: "Going Electric",
      group: "Link 2",
    }),
    link2Desc: props.Text({
      name: "Link 2 Description",
      defaultValue:
        "Join New Zealand's biggest community of EV owners on Facebook — ask anything.",
      group: "Link 2",
    }),
    link2Href: props.Link({
      name: "Link 2 URL",
      group: "Link 2",
    }),

    link3Title: props.Text({
      name: "Link 3 Title",
      defaultValue: "Bright Sparks",
      group: "Link 3",
    }),
    link3Desc: props.Text({
      name: "Link 3 Description",
      defaultValue:
        "Connect with local champions in your community already helping people switch.",
      group: "Link 3",
    }),
    link3Href: props.Link({
      name: "Link 3 URL",
      group: "Link 3",
    }),

    link4Title: props.Text({
      name: "Link 4 Title",
      defaultValue: "This Car Can stories",
      group: "Link 4",
    }),
    link4Desc: props.Text({
      name: "Link 4 Description",
      defaultValue:
        "Read more stories from Kiwis who've made the switch to electric — and what got them over the line.",
      group: "Link 4",
    }),
    link4Href: props.Link({
      name: "Link 4 URL",
      group: "Link 4",
    }),

    bgColor: props.Text({
      name: "Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent",
      defaultValue: "#2d5c5a",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
  },
});
