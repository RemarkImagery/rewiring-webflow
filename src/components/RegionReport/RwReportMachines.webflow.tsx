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
    /* BEGIN generated text props - build_editable_text.py */
    solarAndBatteriesHeading: props.Text({ name: "Heading · Solar and batteries", defaultValue: "Solar and batteries", group: "Solar and batteries" }),
    solarAndBatteriesPara1: props.Text({ name: "Paragraph 1 · Solar offers strong payback for…", defaultValue: "Solar offers strong payback for {{location}} homes, even in shaded areas, while improving energy independence.", group: "Solar and batteries" }),
    solarAndBatteriesPara2: props.Text({ name: "Paragraph 2 · With solar, the household is paying…", defaultValue: "With solar, the household is paying an <strong>effective electricity price of {{solar_effective_rate}}</strong> (financed at {{solar_finance_rate}}), compared to the grid rate of <strong>{{grid_rate}}</strong> (excludes fixed cost).", group: "Solar and batteries" }),
    solarAndBatteriesPara3: props.Text({ name: "Paragraph 3 · Solar panels are expected to last…", defaultValue: "Solar panels are expected to <strong>last {{solar_panel_life}} years</strong>, with warranties of a similar length, meaning the system well outlasts any loan used to finance it. And a battery adds resilience, <strong>keeping essential appliances running during outages</strong>.", group: "Solar and batteries" }),
    electricVehicleHeading: props.Text({ name: "Heading · Electric vehicle", defaultValue: "Electric vehicle", group: "Electric vehicle" }),
    electricVehiclePara1: props.Text({ name: "Paragraph 1 · EVs are far cheaper to run, require…", defaultValue: "EVs are <strong>far cheaper to run</strong>, require little maintenance and aren't exposed to volatile global fuel prices. Plus they're quiet, comfortable and fun to drive! Switching from a petrol to an electric medium SUV <strong>saves around {{ev_annual_savings}} every year</strong>, including road user charges. Diesel ute drivers save even more at <strong>{{ev_ute_savings}} net over 15 years</strong>, or {{ev_ute_annual_savings}} every year. Households in {{location}} currently spend <strong>{{pump_spend_daily}} at the pump every day</strong>.", group: "Electric vehicle" }),
    electricVehiclePara2: props.Text({ name: "Paragraph 2 · location drivers cover an average of…", defaultValue: "{{location}} drivers cover an average of <strong>{{driving_weekly_km}} per week</strong>: well within the range of a modern EV. And charging is easy. 80% of EV owners do more than half their charging at home. 60% trickle charge using a standard three-pin plug. Charging at home using grid electricity costs <strong>effectively half what you'd spend on petrol or diesel</strong>, and for those with rooftop solar, the savings are even greater. And for when you do need to charge on the go, public chargers are available at least every 75km on 97% of New Zealand highways. Savings assume a driving distance of {{driving_annual_km}} per year &mdash; for drivers exceeding this, the savings will be greater.", group: "Electric vehicle" }),
    heatPumpHeading: props.Text({ name: "Heading · Heat pump", defaultValue: "Heat pump", group: "Heat pump" }),
    heatPumpPara1: props.Text({ name: "Paragraph 1 · Heat pumps use around heatpump energy…", defaultValue: "Heat pumps use around <strong>{{heatpump_energy_pct}} less energy</strong> than gas heaters to deliver the same warmth, and, unlike gas, they cool in summer too. Switching from {{heatpump_switch_from}} to a heat pump <strong>saves {{heatpump_15yr_savings}} on bills over 15 years</strong> (around {{heatpump_annual_savings}} every year) and {{heatpump_lifetime_savings}} over the lifetime including upfront costs. {{heater_breakdown}} Whatever the fuel type, going electric brings significant savings, and the comfort upgrade is immediate.", group: "Heat pump" }),
    hotWaterHeatPumpHeading: props.Text({ name: "Heading · Hot water heat pump", defaultValue: "Hot water heat pump", group: "Hot water heat pump" }),
    hotWaterHeatPumpPara1: props.Text({ name: "Paragraph 1 · Hot water heat pumps have a higher…", defaultValue: "Hot water heat pumps have a higher upfront cost, but <strong>deliver the lowest ongoing energy bills</strong> of any water heating option. In {{location}}, switching from {{water_switch_from}} to a hot water heat pump <strong>saves {{water_15yr_savings}} on bills over 15 years</strong>, or {{water_lifetime_savings}} over the lifetime including upfront costs. {{water_breakdown}}", group: "Hot water heat pump" }),
    hotWaterHeatPumpPara2: props.Text({ name: "Paragraph 2 · Water heating makes up around water…", defaultValue: "Water heating makes up around <strong>{{water_energy_pct}} of an average home's energy load</strong> &mdash; making it one of the highest-impact switches a household can make. Hot water heat pumps can also act as a 'thermal battery' where you time it to heat water when electricity is cheapest, or when your solar panels are generating.", group: "Hot water heat pump" }),
    inductionCooktopHeading: props.Text({ name: "Heading · Induction cooktop", defaultValue: "Induction cooktop", group: "Induction cooktop" }),
    inductionCooktopPara1: props.Text({ name: "Paragraph 1 · Cooking doesn't use a lot of energy…", defaultValue: "Cooking doesn't use a lot of energy but electric cooking is <strong>lower cost (and much lower emissions)</strong> than cooking with gas. Induction is more expensive upfront than resistive electric cooking, but offers lower ongoing bills. {{cooktop_breakdown}}", group: "Induction cooktop" }),
    inductionCooktopPara2: props.Text({ name: "Paragraph 2 · But the most compelling case for…", defaultValue: "But the most compelling case for induction might be <strong>health</strong>. Gas cooking releases nitrogen dioxide and other pollutants into the home, linked nationally to <strong>200+ premature deaths, 3,200+ child asthma cases, and $3.3 billion</strong> in productivity and health costs every year.", group: "Induction cooktop" }),
    /* END generated text props */
  },
});
