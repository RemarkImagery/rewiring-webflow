import RwRegionFooterSimple from "./RwRegionFooterSimple";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionFooterSimple, {
  name: "RW Region Report Footer (Simple)",
  description:
    "Plain report footer: one card linking to the national Electric Homes & Vehicles Report. No per-location PDF download — use 'RW Region Report Footer' for the two-card version with the PDF button.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Read the full national report", group: "Content" }),
    body: props.Text({
      name: "Body text",
      defaultValue:
        "Unless otherwise stated, data in this report is drawn from Rewiring Aotearoa's independent, peer reviewed modelling. Dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026 — Rewiring Aotearoa's full analysis of the opportunity of going electric across New Zealand.",
      group: "Content",
    }),
    buttonLabel: props.Text({ name: "Button label", defaultValue: "Electric Homes & Vehicles Report", group: "Content" }),
    reportUrl: props.Link({ name: "Report URL (blank = pages.rewiring.nz report)", group: "Content" }),
    bgColor: props.Text({ name: "Section background", defaultValue: "#fdf7ea", group: "Style" }),
    cardColor: props.Text({ name: "Card background", defaultValue: "#ffffff", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
