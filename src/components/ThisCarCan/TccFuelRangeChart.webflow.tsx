import TccFuelRangeChart from "./TccFuelRangeChart";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccFuelRangeChart, {
  name: "TCC Fuel Range Chart",
  description:
    "How far will $5 of 'fuel' get you? — horizontal bar chart comparing range per $5 across ICE, hybrid, grid-charged EV and solar-charged EV, with a dashed '10x' multiplier annotation.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "How far will $5 of ‘fuel’ get you?",
      group: "Content",
    }),
    source: props.RichText({
      name: "Source / Caption",
      defaultValue:
        "Rewiring Aotearoa, 2026. MBIE Energy Prices, 2026. Fueleconomy.gov, Rightcar.govt.nz, Motor Vehicle Register.",
      group: "Content",
    }),
    unit: props.Text({
      name: "Value Unit",
      defaultValue: "km",
      group: "Content",
    }),
    axisMax: props.Number({
      name: "Axis Max",
      defaultValue: 250,
      group: "Content",
    }),
    axisStep: props.Number({
      name: "Axis Step",
      defaultValue: 50,
      group: "Content",
    }),

    label1: props.Text({
      name: "Label",
      defaultValue: "ICE — petrol",
      group: "Bar 1",
    }),
    value1: props.Number({
      name: "Value",
      defaultValue: 22,
      group: "Bar 1",
    }),
    color1: props.Text({
      name: "Color",
      defaultValue: "#E8473B",
      group: "Bar 1",
    }),

    label2: props.Text({
      name: "Label",
      defaultValue: "HEV — petrol hybrid",
      group: "Bar 2",
    }),
    value2: props.Number({
      name: "Value",
      defaultValue: 31,
      group: "Bar 2",
    }),
    color2: props.Text({
      name: "Color",
      defaultValue: "#9A9A9A",
      group: "Bar 2",
    }),

    label3: props.Text({
      name: "Label",
      defaultValue: "EV — grid charged",
      group: "Bar 3",
    }),
    value3: props.Number({
      name: "Value",
      defaultValue: 64,
      group: "Bar 3",
    }),
    color3: props.Text({
      name: "Color",
      defaultValue: "#3E86F4",
      group: "Bar 3",
    }),

    label4: props.Text({
      name: "Label",
      defaultValue: "EV — solar charged\n(5.5% finance)",
      group: "Bar 4",
    }),
    value4: props.Number({
      name: "Value",
      defaultValue: 234,
      group: "Bar 4",
    }),
    color4: props.Text({
      name: "Color",
      defaultValue: "#EFA022",
      group: "Bar 4",
    }),

    showMultiplier: props.Boolean({
      name: "Show Multiplier",
      defaultValue: true,
      group: "Multiplier",
    }),
    multiplierLabel: props.Text({
      name: "Multiplier Label",
      defaultValue: "10x",
      group: "Multiplier",
    }),
    multiplierColor: props.Text({
      name: "Multiplier Color",
      defaultValue: "#EF6A1F",
      group: "Multiplier",
    }),

    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#fdfaf1",
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
      defaultValue: "#dcdcdc",
      group: "Style",
    }),
  },
});
