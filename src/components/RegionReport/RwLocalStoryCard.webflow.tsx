import RwLocalStoryCard from "./RwLocalStoryCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwLocalStoryCard, {
  name: "RW Local Story Card",
  description:
    "A single local electrification story card. Drop it inside a Collection List item and bind each field to your CMS (photo, name, bills, quote, features). Sits between the Region Report and the footer.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    photo: props.Image({ name: "Photo", group: "Content" }),
    name: props.Text({ name: "Name / heading", defaultValue: "First Last", group: "Content" }),
    meta: props.Text({ name: "Meta (people, size)", defaultValue: "4 people, 180m²", group: "Content" }),
    billsBefore: props.Text({ name: "Bills before", defaultValue: "$1,200 / month", group: "Content" }),
    billsAfter: props.Text({ name: "Bills after", defaultValue: "$300 / month", group: "Content" }),
    savedLine: props.Text({ name: "Saved line", defaultValue: "That's $10,800 saved per year!", group: "Content" }),
    quote: props.Text({ name: "Quote", defaultValue: "We were nervous about the cost but the savings have been incredible — and the house is warmer than it's ever been.", group: "Content" }),
    features: props.Text({ name: "Features (one per line)", defaultValue: "9kW solar\n10kWh batteries\nHeat pump\nHot water heat pump\nInduction cooking", group: "Content" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
  },
});
