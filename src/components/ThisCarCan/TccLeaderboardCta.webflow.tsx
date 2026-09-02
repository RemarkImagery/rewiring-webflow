import TccLeaderboardCta from "./TccLeaderboardCta";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccLeaderboardCta, {
  name: "TCC EV Leaderboard CTA",
  description:
    "Card promoting the NZ EV Leaderboard — top-3 region podium teaser plus a button to the full ranking on pages.rewiring.nz.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    kicker: props.Text({
      name: "Kicker",
      defaultValue: "NZ EV Leaderboard",
      group: "Content",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Where does your region rank?",
      group: "Content",
    }),
    description: props.RichText({
      name: "Description",
      defaultValue:
        "We rank all 16 regions by the share of new car registrations that are electric, updated with the latest NZTA data. See who's leading the charge — and where your neighbourhood sits.",
      group: "Content",
    }),
    buttonText: props.Text({
      name: "Button Text",
      defaultValue: "See the full leaderboard",
      group: "Content",
    }),
    buttonHref: props.Link({
      name: "Button URL",
      group: "Content",
      tooltip:
        "Where the button goes. Defaults to pages.rewiring.nz/ev-leaderboard.",
    }),
    footnote: props.Text({
      name: "Footnote",
      defaultValue:
        "EV share of new registrations, latest 12 months of NZTA data.",
      group: "Content",
    }),
    region1Name: props.Text({
      name: "1st Region",
      defaultValue: "Wellington",
      group: "Top 3",
    }),
    region1Share: props.Text({
      name: "1st Share",
      defaultValue: "12.8%",
      group: "Top 3",
    }),
    region2Name: props.Text({
      name: "2nd Region",
      defaultValue: "Nelson",
      group: "Top 3",
    }),
    region2Share: props.Text({
      name: "2nd Share",
      defaultValue: "9.2%",
      group: "Top 3",
    }),
    region3Name: props.Text({
      name: "3rd Region",
      defaultValue: "Tasman",
      group: "Top 3",
    }),
    region3Share: props.Text({
      name: "3rd Share",
      defaultValue: "8.9%",
      group: "Top 3",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#234e4c",
      group: "Style",
    }),
    cardColor: props.Text({
      name: "Card Color",
      defaultValue: "#fdf7ea",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
});
