import RwReportIntro from "./RwReportIntro";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportIntro, {
  name: "RW Report · Intro & Opportunity",
  description:
    "Top of an electrification report: hero, the four headline opportunity stats, the cumulative-savings headline and the section jump-nav. All data is hard-coded and chosen from the page URL on load — leave District slug blank on a Regional Reports Collection Page.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),
    elecSavingsAnnual: props.Text({ name: "Annual savings (region)", defaultValue: "", group: "Content" }),
    co2eAnnual: props.Text({ name: "CO₂e avoided / yr (tonnes)", defaultValue: "", group: "Content" }),
    jobsCreated: props.Text({ name: "New local jobs", defaultValue: "", group: "Content" }),
    billSavings: props.Text({ name: "Saved per household / yr", defaultValue: "", group: "Content" }),
    cumulativeSavings: props.Text({ name: "Cumulative savings 2026–2040", defaultValue: "", group: "Content" }),
  },
});
