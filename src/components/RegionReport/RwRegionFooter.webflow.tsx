import RwRegionFooter from "./RwRegionFooter";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionFooter, {
  name: "RW Region Report Footer",
  description:
    "Download CTA + footer for the region report — the section that sits beneath the Local Stories collection list. Button prints the page to PDF, or links to a supplied PDF URL.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    title: props.Text({ name: "Title", defaultValue: "Take the report with you", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Download a shareable PDF of the full electrification report — perfect for council meetings, community groups, or sharing with your neighbours.", group: "Content" }),
    buttonLabel: props.Text({ name: "Button label", defaultValue: "Download report (PDF)", group: "Content" }),
    pdfUrl: props.Link({ name: "PDF URL (optional)", group: "Content" }),
    learnMoreLabel: props.Text({ name: "Learn-more label", defaultValue: "rewiring.nz", group: "Content" }),
    learnMoreUrl: props.Link({ name: "Learn-more URL", group: "Content" }),
    dataNote: props.Text({ name: "Data note", defaultValue: "Data from the Rewiring Aotearoa Household Electrification Model 2026", group: "Content" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#fdf7ea", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
