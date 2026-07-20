import TcccCard from "./TcccCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TcccCard, {
  name: "Company EV Card",
  description:
    "CMS-bindable card for Company EV case studies. Shows logo, name, industry, tagline, and fleet stats. Drop inside a Collection List bound to Company EV Stories.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    name: props.Text({
      name: "Company Name",
      defaultValue: "NZ Post",
      group: "CMS Fields",
    }),
    logo: props.Image({
      name: "Logo",
      group: "CMS Fields",
      tooltip: "Square company logo",
    }),
    industry: props.Text({
      name: "Industry",
      defaultValue: "Transport & Logistics",
      group: "CMS Fields",
    }),
    tagline: props.Text({
      name: "Tagline",
      defaultValue: "Don't be left behind, get into it!",
      group: "CMS Fields",
      tooltip: "One-sentence quote from Q14",
    }),
fleetSize: props.Text({
      name: "Fleet Size",
      defaultValue: "3,144",
      group: "CMS Fields",
      tooltip: 'Total vehicles as formatted text (e.g. "3,144")',
    }),
    evPercent: props.Text({
      name: "EV Percent",
      defaultValue: "69.5%",
      group: "CMS Fields",
      tooltip: 'Overall EV percentage (e.g. "69.5%")',
    }),
    journeyYear: props.Text({
      name: "Journey Year",
      defaultValue: "2017",
      group: "CMS Fields",
      tooltip: "Year they started their EV transition",
    }),
  },
});
