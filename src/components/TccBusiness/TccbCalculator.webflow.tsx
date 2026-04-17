import TccbCalculator from "./TccbCalculator";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbCalculator, {
  name: "TCCB Calculator",
  description:
    "Interactive fleet savings calculator with range slider, key stat tiles, and animated donut chart for BEV sales targets.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "See What 25% Could Save Your Business",
      group: "Content",
    }),
    currentBevSales: props.Number({
      name: "Current BEV Sales",
      defaultValue: 9173,
      group: "Content",
      tooltip: "Current annual BEV sales figure shown in the donut chart",
    }),
    targetBevSales: props.Number({
      name: "Target BEV Sales",
      defaultValue: 26000,
      group: "Content",
      tooltip: "Target annual BEV sales figure for the donut chart total",
    }),
    fuelSavingPerVehicle: props.Number({
      name: "Fuel Saving Per Vehicle",
      defaultValue: 2500,
      group: "Content",
      tooltip: "Annual fuel saving in dollars per BEV",
    }),
    co2PerVehicle: props.Number({
      name: "CO₂ Per Vehicle",
      defaultValue: 2.4,
      group: "Content",
      tooltip: "Tonnes of CO₂ saved per BEV per year",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
});
