import RwReportMachines from "./RwReportMachines";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportMachines, {
  name: "RW Report · Machines",
  description:
    "The five machine sections — solar & batteries, EV, heat pump, hot water and induction — each with its headline savings, prose and tabbed cost charts. Bind the per-location figures to the CMS record; bind District slug to the record's Slug.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug", defaultValue: "dunedin", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),

    solarNetSavings: props.Text({ name: "Net savings (panel lifetime)", defaultValue: "", group: "Solar" }),
    solarPanelLife: props.Text({ name: "Panel lifetime (years)", defaultValue: "", group: "Solar" }),
    solarCost: props.Text({ name: "Solar install cost", defaultValue: "", group: "Solar" }),
    solarSize: props.Text({ name: "Solar system size", defaultValue: "", group: "Solar" }),
    batteryCost: props.Text({ name: "Battery cost", defaultValue: "", group: "Solar" }),
    batterySize: props.Text({ name: "Battery size", defaultValue: "", group: "Solar" }),
    solarBattery15yr: props.Text({ name: "Solar+battery 15yr bill savings", defaultValue: "", group: "Solar" }),
    solarFinanceRate: props.Text({ name: "Finance rate", defaultValue: "", group: "Solar" }),
    solarEffectiveRate: props.Text({ name: "Effective electricity price", defaultValue: "", group: "Solar" }),
    gridRate: props.Text({ name: "Average grid rate", defaultValue: "", group: "Solar" }),

    evNetSavings: props.Text({ name: "EV net savings (15yr)", defaultValue: "", group: "EV" }),
    carsFossil: props.Text({ name: "Fossil-fuel cars", defaultValue: "", group: "EV" }),
    evSuvSavings: props.Text({ name: "SUV switch 15yr savings", defaultValue: "", group: "EV" }),
    evAnnualSavings: props.Text({ name: "EV annual savings", defaultValue: "", group: "EV" }),
    evUteSavings: props.Text({ name: "Ute switch 15yr savings", defaultValue: "", group: "EV" }),
    drivingWeeklyKm: props.Text({ name: "Average weekly km", defaultValue: "", group: "EV" }),

    heatpumpLifetime: props.Text({ name: "Heat pump lifetime savings", defaultValue: "", group: "Heat pump" }),
    heatersFossil: props.Text({ name: "Fossil-fuel heaters", defaultValue: "", group: "Heat pump" }),
    heatpumpEnergyPct: props.Text({ name: "Energy reduction %", defaultValue: "", group: "Heat pump" }),
    heatpump15yr: props.Text({ name: "Heat pump 15yr bill savings", defaultValue: "", group: "Heat pump" }),
    heatpumpAnnual: props.Text({ name: "Heat pump annual savings", defaultValue: "", group: "Heat pump" }),
    heatersLpg: props.Text({ name: "LPG heaters", defaultValue: "", group: "Heat pump" }),

    water15yr: props.Text({ name: "Hot water 15yr bill savings", defaultValue: "", group: "Hot water" }),
    waterHeatersFossil: props.Text({ name: "Fossil-fuel water heaters", defaultValue: "", group: "Hot water" }),
    waterLifetime: props.Text({ name: "Hot water lifetime savings", defaultValue: "", group: "Hot water" }),
    waterHeatersLpg: props.Text({ name: "LPG instant water heaters", defaultValue: "", group: "Hot water" }),
    waterEnergyPct: props.Text({ name: "Water share of home energy %", defaultValue: "", group: "Hot water" }),

    cooktopSavings: props.Text({ name: "Induction 15yr savings", defaultValue: "", group: "Induction" }),
    cooktopsGas: props.Text({ name: "Gas cooktops", defaultValue: "", group: "Induction" }),
  },
});
