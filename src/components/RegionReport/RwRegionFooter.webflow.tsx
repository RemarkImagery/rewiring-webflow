import RwRegionFooter from "./RwRegionFooter";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionFooter, {
  name: "RW Region Report Footer",
  description:
    "Two download cards + footer for the region report: the location PDF (auto-linked from the page slug, e.g. /regional-reports/dunedin → electrifying-dunedin.pdf) and the national Electric Homes & Vehicles Report. Blank text props auto-fill with the location name.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    districtSlug: props.Text({ name: "District slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    location: props.Text({ name: "Location name (blank = auto)", defaultValue: "", group: "Data" }),
    title: props.Text({ name: "Title (blank = auto)", defaultValue: "", group: "Location card" }),
    subtitle: props.Text({ name: "Subtitle (blank = auto)", defaultValue: "", group: "Location card" }),
    buttonLabel: props.Text({ name: "Button label (blank = auto)", defaultValue: "", group: "Location card" }),
    pdfUrl: props.Link({ name: "PDF URL (blank = auto from page slug)", group: "Location card" }),
    nationalTitle: props.Text({ name: "Title", defaultValue: "Read the full national report", group: "National card" }),
    nationalSubtitle: props.Text({
      name: "Subtitle",
      defaultValue:
        "Dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026 — Rewiring Aotearoa's full analysis of the opportunity of going electric across New Zealand.",
      group: "National card",
    }),
    nationalButtonLabel: props.Text({ name: "Button label", defaultValue: "Electric Homes & Vehicles Report", group: "National card" }),
    nationalUrl: props.Link({ name: "Report URL", group: "National card" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#fdf7ea", group: "Style" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
  },
});
