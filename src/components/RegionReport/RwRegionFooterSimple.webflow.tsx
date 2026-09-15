import RwRegionFooterSimple from "./RwRegionFooterSimple";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionFooterSimple, {
  name: "RW Region Report Footer (Simple)",
  description:
    "Plain report footer: one card with the per-location PDF download button (auto-linked from the page URL; hidden on pages with no hosted PDF) and the national Electric Homes & Vehicles Report button. 'RW Region Report Footer' is the two-card version.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    districtSlug: props.Text({ name: "Location slug (blank = from page URL)", defaultValue: "", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "Take this report with you", group: "Content" }),
    body: props.Text({
      name: "Body text",
      defaultValue:
        "Download a shareable PDF of this report for council meetings, community groups or your neighbours. Unless otherwise stated, data in this report is drawn from Rewiring Aotearoa's independent, peer reviewed modelling - dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026.",
      group: "Content",
    }),
    pdfButtonLabel: props.Text({
      name: "PDF button label ({location} = place name)",
      defaultValue: "Download the {location} report (PDF)",
      group: "PDF",
    }),
    pdfUrl: props.Link({ name: "PDF URL (blank = hosted PDF for this page)", group: "PDF" }),
    buttonLabel: props.Text({ name: "National report button label", defaultValue: "Electric Homes & Vehicles Report", group: "Content" }),
    reportUrl: props.Link({ name: "National report URL (blank = pages.rewiring.nz report)", group: "Content" }),
    bgColor: props.Text({ name: "Section background", defaultValue: "#fdf7ea", group: "Style" }),
    cardColor: props.Text({ name: "Card background", defaultValue: "#ffffff", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
