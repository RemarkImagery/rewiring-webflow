import TccVehicleHeadToHead from "./TccVehicleHeadToHead";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccVehicleHeadToHead, {
  name: "TCC Vehicle Head to Head",
  description:
    "Three head-to-head vehicle matchups (Small car / Medium SUV / Ute) comparing petrol vs electric yearly running costs, with a toggle between normal prices and the 2026 fuel shock scenario.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    eyebrow: props.Text({
      name: "Eyebrow",
      defaultValue: "Running costs · New Zealand · 2026",
      group: "Content",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Petrol vs electric — same category, very different running costs.",
      group: "Content",
    }),
    subtitle: props.RichText({
      name: "Subtitle",
      defaultValue:
        "Three head-to-head matchups for popular New Zealand vehicles, based on Rewiring Aotearoa's 2026 cost model.",
      group: "Content",
    }),
    bauLabel: props.Text({
      name: "Normal Prices Label",
      defaultValue: "Normal prices",
      group: "Content",
    }),
    crisisLabel: props.Text({
      name: "Fuel Shock Label",
      defaultValue: "2026 fuel shock",
      group: "Content",
    }),
    footnote: props.RichText({
      name: "Footnote",
      defaultValue:
        "Sources: Rewiring Aotearoa vehicle cost model (NZ, 2026). BAU prices: $2.63/L petrol, $1.90/L diesel, $0.26/kWh grid electricity. Fuel-shock scenario: $3.30/L petrol, $4.00/L diesel.",
      group: "Content",
    }),
    creamColor: props.Text({
      name: "Cream / Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    inkColor: props.Text({
      name: "Ink / Primary",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
    greenColor: props.Text({
      name: "Green Accent",
      defaultValue: "#2d5c5a",
      group: "Style",
    }),
    mutedColor: props.Text({
      name: "Muted Text",
      defaultValue: "#5a7a78",
      group: "Style",
    }),
    yellowColor: props.Text({
      name: "Yellow Accent",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
});
