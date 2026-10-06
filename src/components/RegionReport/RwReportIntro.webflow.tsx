import RwReportIntro from "./RwReportIntro";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportIntro, {
  name: "RW Report · Intro & Opportunity",
  description:
    "Top of an electrification report (v2 layout): report banner, hero, the five headline opportunity stats, the cumulative-savings graph, the section jump-navs, and the Economics and Emissions & jobs sections. All data is hard-coded and chosen from the page URL on load — leave District slug blank on a Regional Reports Collection Page.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),
    elecSavingsAnnual: props.Text({ name: "Bill savings / yr (region)", defaultValue: "", group: "Content" }),
    machinesTotal: props.Text({ name: "Fossil fuel machines (count)", defaultValue: "", group: "Content" }),
    co2eAnnual: props.Text({ name: "CO₂e avoided / yr (tonnes)", defaultValue: "", group: "Content" }),
    jobsCreated: props.Text({ name: "New local jobs", defaultValue: "", group: "Content" }),
    billSavings: props.Text({ name: "Saved per household / yr", defaultValue: "", group: "Content" }),
    cumulativeSavings: props.Text({ name: "Cumulative savings 2026–2040", defaultValue: "", group: "Content" }),
  },
});
