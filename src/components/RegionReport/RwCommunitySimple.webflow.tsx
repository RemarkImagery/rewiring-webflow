import RwCommunitySimple from "./RwCommunitySimple";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwCommunitySimple, {
  name: "RW Community Groups (Simple)",
  description:
    "Plain stand-in for the community groups carousel + map: heading, short paragraph and one button through to rewiring.nz/communities. No Collection List or CMS setup needed. Keeps the #community anchor so the report's jump cards still work.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Your local community groups", group: "Content" }),
    body: props.Text({
      name: "Body text",
      defaultValue:
        "Volunteer-run community groups driven by locals for locals are making it easier for people across the region to electrify their lives. Running regular events, leading local advocacy and providing advice to households, these electric communities are your local guide to lower energy bills, lower emissions and greater resilience by going electric.",
      group: "Content",
    }),
    buttonLabel: props.Text({ name: "Button label", defaultValue: "Find your nearest group", group: "Content" }),
    communitiesUrl: props.Link({ name: "Button URL (blank = rewiring.nz/communities)", group: "Content" }),
    anchorId: props.Text({ name: "Anchor id", defaultValue: "community", group: "Content" }),
    bgColor: props.Text({ name: "Section background", defaultValue: "transparent", group: "Style" }),
    cardColor: props.Text({ name: "Card background", defaultValue: "#ffffff", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
