import RwStoriesCommunitySimple from "./RwStoriesCommunitySimple";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwStoriesCommunitySimple, {
  name: "RW Stories + Community (Simple, side by side)",
  description:
    "The Local Stories (Simple) and Community Groups (Simple) cards side by side in one component — use it in place of those two. Stacks on phones. Keeps the #stories and #community anchors for the report's jump cards.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    storiesHeading: props.Text({ name: "Stories heading", defaultValue: "Local stories", group: "Local stories" }),
    storiesBody: props.Text({
      name: "Stories body text",
      defaultValue:
        "Households around the motu have already made the switch — solar and batteries, EVs, heat pumps and induction cooking. Read what they changed, what it cost, and what they're saving now.",
      group: "Local stories",
    }),
    storiesButtonLabel: props.Text({ name: "Stories button label", defaultValue: "Explore case studies", group: "Local stories" }),
    storiesUrl: props.Link({ name: "Stories button URL (blank = rewiring.nz/story)", group: "Local stories" }),
    communityHeading: props.Text({ name: "Community heading", defaultValue: "Your local community groups", group: "Community groups" }),
    communityBody: props.Text({
      name: "Community body text",
      defaultValue:
        "Volunteer-run community groups driven by locals for locals are making it easier for people across the region to electrify their lives. Running regular events, leading local advocacy and providing advice to households, these electric communities are your local guide to lower energy bills, lower emissions and greater resilience by going electric.",
      group: "Community groups",
    }),
    communityButtonLabel: props.Text({ name: "Community button label", defaultValue: "Find your nearest group", group: "Community groups" }),
    communitiesUrl: props.Link({ name: "Community button URL (blank = rewiring.nz/communities)", group: "Community groups" }),
    bgColor: props.Text({ name: "Section background", defaultValue: "transparent", group: "Style" }),
    cardColor: props.Text({ name: "Card background", defaultValue: "#ffffff", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
