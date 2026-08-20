import RwReportMachines from "./RwReportMachines";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportMachines, {
  name: "RW Report · Machines",
  description:
    "The five machine sections (v2) — solar & batteries, EV, heat pump, hot water and induction — each with its stat boxes, prose and per-location tabbed cost charts. All figures come from the bundled per-location data (chosen from the page URL); the text props override individual stat figures only — blank keeps the bundled value.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),

    solarBox1Num: props.Text({ name: "Box 1 figure (bill savings / yr)", defaultValue: "", group: "Solar" }),
    solarBox1Meta: props.Text({ name: "Box 1 label", defaultValue: "", group: "Solar" }),
    solarPanelLife: props.Text({ name: "Panel lifetime (years)", defaultValue: "", group: "Solar" }),
    batteryLife: props.Text({ name: "Battery lifetime (years)", defaultValue: "", group: "Solar" }),
    solarFinanceRate: props.Text({ name: "Finance rate", defaultValue: "", group: "Solar" }),
    solarEffectiveRate: props.Text({ name: "Effective solar price", defaultValue: "", group: "Solar" }),
    gridRate: props.Text({ name: "Grid price", defaultValue: "", group: "Solar" }),

    evNetSavings: props.Text({ name: "Net savings (petrol SUV, 15yr)", defaultValue: "", group: "EV" }),
    carsFossil: props.Text({ name: "Fossil cars count", defaultValue: "", group: "EV" }),
    evAnnualSavings: props.Text({ name: "Annual savings (petrol SUV)", defaultValue: "", group: "EV" }),
    evUteSavings: props.Text({ name: "Net savings (diesel ute, 15yr)", defaultValue: "", group: "EV" }),
    evUteAnnualSavings: props.Text({ name: "Annual savings (diesel ute)", defaultValue: "", group: "EV" }),
    drivingWeeklyKm: props.Text({ name: "Weekly driving distance", defaultValue: "", group: "EV" }),

    heatpumpLifetime: props.Text({ name: "Lifetime savings", defaultValue: "", group: "Heat pump" }),
    heatersFossil: props.Text({ name: "Fossil heaters count", defaultValue: "", group: "Heat pump" }),
    heatpumpEnergyPct: props.Text({ name: "Energy saving %", defaultValue: "", group: "Heat pump" }),
    heatpump15yr: props.Text({ name: "15-year bill savings", defaultValue: "", group: "Heat pump" }),
    heatpumpAnnual: props.Text({ name: "Annual savings", defaultValue: "", group: "Heat pump" }),

    water15yr: props.Text({ name: "15-year bill savings", defaultValue: "", group: "Hot water" }),
    waterHeatersFossil: props.Text({ name: "Fossil water heaters count", defaultValue: "", group: "Hot water" }),
    waterLifetime: props.Text({ name: "Lifetime savings", defaultValue: "", group: "Hot water" }),
    waterEnergyPct: props.Text({ name: "Share of home energy %", defaultValue: "", group: "Hot water" }),

    cooktopSavings: props.Text({ name: "15-year savings (LPG)", defaultValue: "", group: "Induction" }),
    cooktopsGas: props.Text({ name: "Fossil cooktops count", defaultValue: "", group: "Induction" }),
  },
});
