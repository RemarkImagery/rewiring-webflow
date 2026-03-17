import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCostCompare from "./WlevCostCompare";

export default declareComponent(WlevCostCompare, {
  name: "WLEV Cost Compare",
  description: "Interactive petrol vs EV weekly cost comparison with finance options",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The Savings Stack Up Fast", group: "Content" }),
    subtitle: props.RichText({ name: "Subtitle", defaultValue: "EECA estimates the five-year cost of owning an EV is just 67.5% of the cost of a petrol car.", group: "Content" }),
    petrolFuelWk: props.Text({ name: "Petrol Fuel /wk", defaultValue: "$58", group: "Petrol Costs" }),
    petrolMaintWk: props.Text({ name: "Petrol Maintenance /wk", defaultValue: "$22", group: "Petrol Costs" }),
    petrolRepayWk: props.Text({ name: "Petrol Repayments /wk", defaultValue: "$68", group: "Petrol Costs" }),
    petrolRepayNote: props.Text({ name: "Petrol Repay Note", defaultValue: "$39K on finance", group: "Petrol Costs" }),
    petrolTotalWk: props.Text({ name: "Petrol Total /wk", defaultValue: "$148", group: "Petrol Costs" }),
    petrolLifetime: props.Text({ name: "Petrol Lifetime", defaultValue: "$116k lifetime", group: "Petrol Costs" }),
    evPowerWk: props.Text({ name: "EV Power /wk", defaultValue: "$13", group: "EV Costs" }),
    evRucsWk: props.Text({ name: "EV RUCs /wk", defaultValue: "$16", group: "EV Costs" }),
    evMaintWk: props.Text({ name: "EV Maintenance /wk", defaultValue: "$13", group: "EV Costs" }),
    evRepayWk: props.Text({ name: "EV Repayments /wk", defaultValue: "$92", group: "EV Costs" }),
    evRepayNote: props.Text({ name: "EV Repay Note", defaultValue: "$52K on finance", group: "EV Costs" }),
    evTotalWk: props.Text({ name: "EV Total /wk", defaultValue: "$135", group: "EV Costs" }),
    evLifetime: props.Text({ name: "EV Lifetime", defaultValue: "$105k lifetime", group: "EV Costs" }),
    savingBadge: props.RichText({ name: "Saving Badge", defaultValue: 'You save <strong>$13/week</strong> &mdash; <strong>$11,000+ over the life of the vehicle</strong>', group: "Content" }),
    finance1Title: props.Text({ name: "Finance 1 Title", defaultValue: "Regular Finance", group: "Finance 1" }),
    finance1Body: props.RichText({ name: "Finance 1 Body", defaultValue: "At current mortgage rates (~5.5%), you could swap higher fuel costs for lower finance repayments. You\u2019d be better off buying an EV on finance than a petrol car on finance.", group: "Finance 1" }),
    finance2Title: props.Text({ name: "Finance 2 Title", defaultValue: "Green Loans", group: "Finance 2" }),
    finance2Body: props.RichText({ name: "Finance 2 Body", defaultValue: "Some banks offer 0\u20131% loans for sustainable purchases like EVs and solar panels. Short-term repayments may be higher, but running cost savings kick in fast.", group: "Finance 2" }),
    finance3Title: props.Text({ name: "Finance 3 Title", defaultValue: "Car-Share Services", group: "Finance 3" }),
    finance3Body: props.RichText({ name: "Finance 3 Body", defaultValue: "Not ready to buy? Companies like Mevo, Zilch, Cityhop and Ryd offer EVs by the hour, day or month \u2014 with insurance, charging and maintenance included.", group: "Finance 3" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#FFFCF0", group: "Style" }),
  },
  options: { ssr: false },
});
