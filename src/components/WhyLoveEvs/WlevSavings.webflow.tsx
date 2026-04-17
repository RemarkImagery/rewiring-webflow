import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevSavings from "./WlevSavings";

export default declareComponent(WlevSavings, {
  name: "WLEV Savings",
  description: "Stat cards showing EV cost savings — energy, maintenance, lifetime",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "EVs Save You Money", group: "Content" }),
    body: props.RichText({ name: "Body", defaultValue: "We love EVs because they\u2019re kinder on your wallet. Cheaper energy, fewer moving parts, and lower lifetime costs.", group: "Content" }),
    stat1Number: props.Text({ name: "Stat 1 Number", defaultValue: "~$1.50/L", group: "Stat 1" }),
    stat1Label: props.Text({ name: "Stat 1 Label", defaultValue: "equivalent cost to charge at home (incl. RUCs)", group: "Stat 1" }),
    stat2Number: props.Text({ name: "Stat 2 Number", defaultValue: "20", group: "Stat 2" }),
    stat2Label: props.Text({ name: "Stat 2 Label", defaultValue: "moving parts vs 2,000 in a petrol car", group: "Stat 2" }),
    stat3Number: props.Text({ name: "Stat 3 Number", defaultValue: "67.5%", group: "Stat 3" }),
    stat3Label: props.Text({ name: "Stat 3 Label", defaultValue: "the 5-year cost of a petrol car (EECA)", group: "Stat 3" }),
    detail1Title: props.Text({ name: "Detail 1 Title", defaultValue: "Cheaper energy", group: "Detail 1" }),
    detail1Text: props.RichText({ name: "Detail 1 Text", defaultValue: "Charging at home at off-peak rates costs about $1.50/L equivalent. Rooftop solar pushes this even lower.", group: "Detail 1" }),
    detail2Title: props.Text({ name: "Detail 2 Title", defaultValue: "Cheaper to maintain", group: "Detail 2" }),
    detail2Text: props.RichText({ name: "Detail 2 Text", defaultValue: "No oil changes, no exhaust system, no clutch or spark plugs. Hundreds of dollars saved every year.", group: "Detail 2" }),
    btnLabel: props.Text({ name: "Button Label", defaultValue: "", group: "Button" }),
    btnUrl: props.Text({ name: "Button URL", defaultValue: "", group: "Button", tooltip: "Page path, #section-id, or full URL" }),
    btnNewTab: props.Boolean({ name: "Open in new tab", defaultValue: false, group: "Button" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#1a3c3c", group: "Style" }),
  },
  options: { ssr: true },
});
