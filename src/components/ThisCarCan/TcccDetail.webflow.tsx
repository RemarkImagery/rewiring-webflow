import TcccDetail from "./TcccDetail";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TcccDetail, {
  name: "Company EV Detail",
  description:
    "Full case study page for a Company EV Story. Place on the CMS template page and bind all fields. Parses fleet CSV data into styled tables.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    name: props.Text({
      name: "Company Name",
      defaultValue: "NZ Post",
      group: "Company",
    }),
    logo: props.Image({
      name: "Logo",
      group: "Company",
    }),
    industry: props.Text({
      name: "Industry",
      defaultValue: "Transport & Logistics",
      group: "Company",
    }),
    heroImage: props.Image({
      name: "Hero Image",
      group: "Company",
      tooltip: "Full-width hero photo (recommended 1600x900+)",
    }),
    fleetSize: props.Text({
      name: "Fleet Size",
      defaultValue: "3,144",
      group: "Stats",
    }),
    evPercent: props.Text({
      name: "EV Percent",
      defaultValue: "69.5%",
      group: "Stats",
    }),
    journeyYear: props.Text({
      name: "Journey Year",
      defaultValue: "2017",
      group: "Stats",
    }),
    quote: props.Text({
      name: "Quote",
      defaultValue: "Don't be left behind, get into it!",
      group: "Highlight",
      tooltip: "One-sentence call to action (Q14)",
    }),
    journeyStory: props.RichText({
      name: "Journey Story",
      defaultValue: "How and why we started our EV transition...",
      group: "Narrative",
      tooltip: "Q4: When/why they started",
    }),
    fleetData: props.Text({
      name: "Fleet Data (CSV)",
      defaultValue:
        "Internal Fleet\nCar||101|9||110|100%\nVan||59|1||60|100%\nTotal|||||734|69.5%",
      group: "Narrative",
      tooltip:
        "Fleet table data. Section headers on their own line, data rows: Type|ICE|BEV|PHEV|Hybrid|Total|EV%. Blank line = new table. Use pipe | as delimiter.",
    }),
    benefits: props.RichText({
      name: "Benefits",
      defaultValue: "The biggest benefits from electrifying our fleet...",
      group: "Narrative",
      tooltip: "Q7: Benefits experienced",
    }),
    challenges: props.RichText({
      name: "Challenges",
      defaultValue: "Our biggest challenges and how we overcame them...",
      group: "Narrative",
      tooltip: "Q8: Challenges and solutions",
    }),
    proudOf: props.RichText({
      name: "Proud Of",
      defaultValue: "What we are most proud of...",
      group: "Narrative",
      tooltip: "Q9: Proud moments and milestones",
    }),
    lessons: props.RichText({
      name: "Lessons",
      defaultValue: "What we would share with other businesses...",
      group: "Narrative",
      tooltip: "Q11: Lessons for others",
    }),
    obstacles: props.RichText({
      name: "Obstacles",
      defaultValue: "What is still standing in the way...",
      group: "Narrative",
      tooltip: "Q12: Remaining barriers",
    }),
    speedUp: props.RichText({
      name: "What Would Help",
      defaultValue: "What we would like to see to speed things up...",
      group: "Narrative",
      tooltip: "Q13: Policy/infrastructure/support wanted",
    }),
    backUrl: props.Text({
      name: "Back URL",
      defaultValue: "/this-car-can",
      group: "Navigation",
      tooltip: "URL to return to the stories grid",
    }),
    backLabel: props.Text({
      name: "Back Label",
      defaultValue: "Back to all stories",
      group: "Navigation",
    }),
  },
});
