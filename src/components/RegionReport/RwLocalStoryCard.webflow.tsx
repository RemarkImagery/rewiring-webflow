import RwLocalStoryCard from "./RwLocalStoryCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwLocalStoryCard, {
  name: "RW Local Story Card",
  description:
    "A single local electrification story card matching the Case Studies CMS collection. Drop inside a Collection List item and bind each prop to its CMS field.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    photo: props.Image({ name: "Image", group: "Content" }),
    name: props.Text({ name: "Name", defaultValue: "First Last", group: "Content" }),
    location: props.Text({ name: "Location name", defaultValue: "Tawa, Wellington", group: "Content" }),
    entitySize: props.Text({ name: "Entity size", defaultValue: "4 people, 206 m²", group: "Content" }),
    highlightQuote: props.Text({ name: "Highlight Quote", defaultValue: "We don't have to worry about fuel and energy prices.", group: "Content" }),
    largeQuote: props.Text({ name: "Large Quote", defaultValue: "We don't have to worry about fuel and energy prices and we've really appreciated having our own generation and battery backup when storms have caused blackouts.", group: "Content" }),
    technologies: props.Text({ name: "Technologies (comma separated)", defaultValue: "Battery, EV, Heat pump, Hot water heat pump, Induction cooking, Solar", group: "Content" }),
    headlineStat: props.Text({ name: "Headline stat 1", defaultValue: "$470", group: "Stats" }),
    headlineStatLabel: props.Text({ name: "Headline stat 1 label", defaultValue: "saved per month", group: "Stats" }),
    stat1Label: props.Text({ name: "Stat 1 Label", defaultValue: "Home bills", group: "Stats" }),
    stat1Before: props.Text({ name: "Stat 1 Before", defaultValue: "$445 / month", group: "Stats" }),
    stat1After: props.Text({ name: "Stat 1 After", defaultValue: "$145 / month", group: "Stats" }),
    stat2Label: props.Text({ name: "Stat 2 Label", defaultValue: "Vehicle costs", group: "Stats" }),
    stat2Before: props.Text({ name: "Stat 2 Before", defaultValue: "$180 / month", group: "Stats" }),
    stat2After: props.Text({ name: "Stat 2 After", defaultValue: "$10 / month", group: "Stats" }),
    cardColor: props.Text({ name: "Card background (gold)", defaultValue: "#f5b731", group: "Style" }),
    frameColor: props.Text({ name: "Frame colour", defaultValue: "#131a18", group: "Style" }),
    accentColor: props.Text({ name: "Check / arrow green", defaultValue: "#2f9e44", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#23312e", group: "Style" }),
  },
});
