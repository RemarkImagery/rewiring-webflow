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
    /* BEGIN generated text props - build_editable_text.py */
    heroAndOpportunityHeading: props.Text({ name: "Heading · Electrifying location", defaultValue: "Electrifying {{location}}", group: "Hero and opportunity" }),
    heroAndOpportunityPara1: props.Text({ name: "Paragraph 1 · A pathway to savings for households,…", defaultValue: "A pathway to savings for households, economic growth for the community, reduced emissions and greater resilience.", group: "Hero and opportunity" }),
    heroAndOpportunityPara2: props.Text({ name: "Paragraph 2 · location has crossed the…", defaultValue: "{{location}} has <strong>crossed the electrification tipping point</strong> where homes can save money and reduce their emissions by going electric.", group: "Hero and opportunity" }),
    heroAndOpportunityPara3: props.Text({ name: "Paragraph 3 · The technology is proven, the…", defaultValue: "The technology is proven, the economics stack up, and the transition is already underway. But there are still plenty of households paying more than they need to by running on fossil fuels.", group: "Hero and opportunity" }),
    heroAndOpportunityHeading2: props.Text({ name: "Heading 2 · The opportunity for location", defaultValue: "The opportunity for {{location}}", group: "Hero and opportunity" }),
    heroAndOpportunityPara4: props.Text({ name: "Paragraph 4 · *upgrading appliances to electric and…", defaultValue: "*upgrading appliances to electric and adding solar and batteries to 80% of homes", group: "Hero and opportunity" }),
    heroAndOpportunityPara5: props.Text({ name: "Paragraph 5 · See what my household could save", defaultValue: "<a href=\"#bills\">See what my household could save &rarr;</a>", group: "Hero and opportunity" }),
    heroAndOpportunityHeading3: props.Text({ name: "Heading 3 · location homes could cumulatively…", defaultValue: "{{location}} homes could cumulatively save a net {{cumulative_savings}} between 2026 and 2040", group: "Hero and opportunity" }),
    economicsHeading: props.Text({ name: "Heading · Economics", defaultValue: "Economics", group: "Economics" }),
    economicsPara1: props.Text({ name: "Paragraph 1 · That's fossil spend annual spent each…", defaultValue: "That's <strong>{{fossil_spend_annual}} spent each year</strong> on fossil fuels by just households in {{location}}. Most of these fossil fuels are imported, meaning this money leaves the local economy. Plus, history shows fossil fuel costs are volatile, with <strong>prices rising faster than the rate of inflation</strong>.", group: "Economics" }),
    economicsPara2: props.Text({ name: "Paragraph 2 · If every location home were to…", defaultValue: "If every {{location}} home were to electrify all appliances and vehicles, with 80% also adopting rooftop solar and home batteries, household energy costs would drop significantly. That's <strong>{{elec_savings_daily}} saved per day</strong>, and meaningful cost of living relief for {{location}} households.", group: "Economics" }),
    emissionsAndJobsHeading: props.Text({ name: "Heading · Emissions and jobs", defaultValue: "Emissions and jobs", group: "Emissions and jobs" }),
    emissionsAndJobsPara1: props.Text({ name: "Paragraph 1 · Electrifying location's homes will…", defaultValue: "Electrifying {{location}}'s homes will result in a significant reduction in emissions. That's the equivalent of <strong>{{equiv_flights}} one-way flights</strong> per passenger from Auckland to Queenstown.", group: "Emissions and jobs" }),
    emissionsAndJobsPara2: props.Text({ name: "Paragraph 2 · New local jobs, driven by additional…", defaultValue: "<strong>New local jobs</strong>, driven by additional installation labour and the savings flowing through the community.", group: "Emissions and jobs" }),
    /* END generated text props */
  },
});
