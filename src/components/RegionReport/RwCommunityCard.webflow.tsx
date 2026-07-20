import RwCommunityCard from "./RwCommunityCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwCommunityCard, {
  name: "RW Community Card",
  description:
    "A local electric-community group card. Drop it inside a Collection List of Communities filtered to 'Feature on Regional Report includes Current Regional Report', and bind each field to the community record (logo, title, subtitle, location, info, meet-ups, links).",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    logo: props.Image({ name: "Group logo", group: "Content" }),
    bgImage: props.Image({ name: "Background image", group: "Content" }),
    title: props.Text({ name: "Group title", defaultValue: "Community group", group: "Content" }),
    subtitle: props.Text({ name: "Group subtitle", defaultValue: "", group: "Content" }),
    location: props.Text({ name: "Group location", defaultValue: "", group: "Content" }),
    info: props.Text({ name: "Group information", defaultValue: "", group: "Content" }),
    meetups: props.Text({ name: "Meet-ups", defaultValue: "", group: "Content" }),
    link1Url: props.Link({ name: "Link 1 URL", group: "Links" }),
    link1Label: props.Text({ name: "Link 1 label", defaultValue: "Learn more", group: "Links" }),
    link2Url: props.Link({ name: "Link 2 URL", group: "Links" }),
    link2Label: props.Text({ name: "Link 2 label", defaultValue: "Join", group: "Links" }),
    facebookUrl: props.Link({ name: "Facebook page URL", group: "Links" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    goldColor: props.Text({ name: "Gold colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
