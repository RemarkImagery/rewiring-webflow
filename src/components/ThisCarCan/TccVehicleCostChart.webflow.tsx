import TccVehicleCostChart from "./TccVehicleCostChart";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccVehicleCostChart, {
  name: "TCC Vehicle Cost Chart",
  description:
    "Yearly vehicle operating cost comparison — stacked bar chart comparing 6 vehicles across maintenance, fuel, electricity, RUCs and fuel crisis premium. Interactive: hover to highlight, click to pin.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Yearly vehicle operating cost comparison",
      group: "Content",
    }),
    subtitle: props.RichText({
      name: "Subtitle / Caption",
      defaultValue:
        "BAU prices: $2.63/L for petrol, $1.90/L for diesel, $0.26/kWh for grid electricity. Fuel shock prices: $3.30/L for petrol, $4/L for diesel.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#fdfaf1",
      group: "Style",
    }),
    cardColor: props.Text({
      name: "Card Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
    inkColor: props.Text({
      name: "Ink / Text Color",
      defaultValue: "#0b0b0b",
      group: "Style",
    }),
    mutedColor: props.Text({
      name: "Muted Color",
      defaultValue: "#6b6b6b",
      group: "Style",
    }),
    gridColor: props.Text({
      name: "Grid Line Color",
      defaultValue: "#e3e3e3",
      group: "Style",
    }),
    colorMaintenance: props.Text({
      name: "Maintenance Color",
      defaultValue: "#1B4F5E",
      group: "Segment Colors",
    }),
    colorPetrol: props.Text({
      name: "Petrol Color",
      defaultValue: "#E88B8B",
      group: "Segment Colors",
    }),
    colorDiesel: props.Text({
      name: "Diesel Color",
      defaultValue: "#8B1A1A",
      group: "Segment Colors",
    }),
    colorElectricity: props.Text({
      name: "Electricity Color",
      defaultValue: "#4A90E2",
      group: "Segment Colors",
    }),
    colorRucs: props.Text({
      name: "RUCs Color",
      defaultValue: "#A0A0A0",
      group: "Segment Colors",
    }),
    colorFuelCrisis: props.Text({
      name: "Fuel Crisis Color",
      defaultValue: "#E89420",
      group: "Segment Colors",
    }),
  },
});
