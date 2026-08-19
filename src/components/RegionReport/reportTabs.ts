// AUTO-GENERATED national fallback chart configs (v2 template). Do not edit by hand.
// Per-location data (District.billTabs / District.machineTabs) overrides these at render.
/* eslint-disable */
export const BILL_CFG = {
  titleHtml: "Energy bills",
  subtitle: "Excludes upfront costs. Based on 2026 energy prices. Average household for the selected location.",
  hideSegLabels: true,
  yMin: 0, yMax: 12500,
  yTicks: [0, 2500, 5000, 7500, 10000, 12500],
  valuePrefix: "$", valueSuffix: "",
  segments: [
    { key: "base", label: "", color: "transparent" },
    { key: "maintenance", label: "Car maintenance", color: "#b7b7b7" },
    { key: "electricity", label: "Electricity bills", color: "#6d9eeb" },
    { key: "gas", label: "Gas bills", color: "#c27ba0" },
    { key: "petrol", label: "Petrol bills", color: "#e06666" },
    { key: "rucs", label: "RUCs", color: "#ea9999" },
    { key: "savings", label: "Savings", color: "#93c47d" },
  ],
  legendOrder: ["petrol", "gas", "electricity", "maintenance", "rucs", "savings"],
  data: [
    { name: "Gas heating and cooking,\n2 petrol vehicles", base: 0, maintenance: 2300, electricity: 1900, gas: 2100, petrol: 4300, rucs: 0, savings: 0, total: "$10,600 /yr" },
    { name: "Electric heating and cooking,\n2 electric vehicles,\nwith solar and battery", base: 0, maintenance: 900, electricity: 2500, gas: 0, petrol: 0, rucs: 900, savings: 0, total: "$4,300 /yr" },
    { name: "Savings", base: 4300, maintenance: 0, electricity: 0, gas: 0, petrol: 0, rucs: 0, savings: 6300, total: "$6,300 /yr" },
  ],
};

export const SAVINGS_CFG = {
  title: "Lifetime savings by electrification switch",
  subtitle: "Net savings including upfront costs. Solar: 30 years, 9kW system at 5.5% finance. All others: 15 years. Vehicle and cooking figures use bill savings (not net) as upfront costs vary.",
  yMin: 0, yMax: 25000,
  yTicks: [0, 5000, 10000, 15000, 20000, 25000],
  valuePrefix: "$", valueSuffix: "",
  segments: [
    { key: "savings", label: "Net savings / bill savings", color: "#93c47d" },
  ],
  legendOrder: ["savings"],
  data: [
    { name: "EV\n(petrol SUV)", savings: 22837, total: "$22,837" },
    { name: "Solar\n(9kW, 30yr)", savings: 18656, total: "$18,656" },
    { name: "Heat pump\n(LPG fire)", savings: 19300, total: "$19,300" },
    { name: "Hot water HP\n(LPG instant)", savings: 10000, total: "$10,000" },
    { name: "EV\n(diesel ute)", savings: 14170, total: "$14,170" },
    { name: "Induction\n(LPG cooktop)", savings: 1638, total: "$1,638" },
  ],
};

export const HEATING_TABS = {
  title: "Space heating savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#434343" },
        { key: "elec", label: "Electricity costs", color: "#6fa8dc" },
        { key: "wood", label: "Wood costs", color: "#ac9e76" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 35000, xTicks: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average home heating needs (RBS 2021), 2026 energy prices with forward inflation (real) based on historic averages, 15 year appliance lifetime.",
      data: [
        { name: "Heat pump", upfront: 3500, elec: 5600, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,100" },
        { name: "Wood fire", upfront: 4500, elec: 0, wood: 13700, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$18,200" },
        { name: "Resistive heater", upfront: 500, elec: 20500, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$21,000" },
        { name: "Gas heater flued", upfront: 3000, elec: 0, wood: 0, gasVol: 15500, gasDaily: 5600, lpgVol: 0, lpgDaily: 0, total: "$24,100" },
        { name: "Gas heater fire", upfront: 3000, elec: 0, wood: 0, gasVol: 17800, gasDaily: 5600, lpgVol: 0, lpgDaily: 0, total: "$26,400" },
        { name: "LPG heater flued", upfront: 3000, elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 22500, lpgDaily: 3000, total: "$28,500" },
        { name: "LPG heater fire", upfront: 3000, elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 25400, lpgDaily: 3000, total: "$31,400" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#6fa8dc" },
        { key: "wood", label: "Wood costs", color: "#ac9e76" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 1750, xTicks: [0, 250, 500, 750, 1000, 1250, 1500, 1750],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Heat pump", elec: 330, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$330 /yr" },
        { name: "Wood fire", elec: 0, wood: 740, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$740 /yr" },
        { name: "Resistive heater", elec: 1220, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$1,220 /yr" },
        { name: "Gas heater flued", elec: 0, wood: 0, gasVol: 870, gasDaily: 320, lpgVol: 0, lpgDaily: 0, total: "$1,190 /yr" },
        { name: "Gas heater fire", elec: 0, wood: 0, gasVol: 950, gasDaily: 320, lpgVol: 0, lpgDaily: 0, total: "$1,270 /yr" },
        { name: "LPG heater flued", elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 1210, lpgDaily: 200, total: "$1,410 /yr" },
        { name: "LPG heater fire", elec: 0, wood: 0, gasVol: 0, gasDaily: 0, lpgVol: 1350, lpgDaily: 200, total: "$1,550 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [
        { key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#e06666" },
      ],
      xMax: 1250, xTicks: [0, 250, 500, 750, 1000, 1250],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average home heating needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Heat pump", emissions: 80, total: "80" },
        { name: "Wood fire", emissions: 100, total: "100" },
        { name: "Resistive heater", emissions: 290, total: "290" },
        { name: "Gas heater flued", emissions: 1000, total: "1,000" },
        { name: "Gas heater fire", emissions: 1100, total: "1,100" },
        { name: "LPG heater flued", emissions: 1090, total: "1,090" },
        { name: "LPG heater fire", emissions: 1200, total: "1,200" },
      ],
    }},
  ],
};

export const WATER_TABS = {
  title: "Water heating savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#434343" },
        { key: "solar", label: "Solar financed", color: "#fbbc04" },
        { key: "ripple", label: "Ripple", color: "#6d9eeb" },
        { key: "elec", label: "Electricity costs", color: "#3c78d8" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 25000, xTicks: [0, 5000, 10000, 15000, 20000, 25000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average home water heating needs (RBS 2021), 2026 energy prices with forward inflation, 15 year appliance lifetime.",
      data: [
        { name: "Hot water heat pump (solar)", upfront: 5000, solar: 3600, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$8,600" },
        { name: "Hot water heat pump (night)", upfront: 5000, solar: 0, ripple: 4500, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,500" },
        { name: "Hot water heat pump (grid)", upfront: 5000, solar: 0, ripple: 0, elec: 6000, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$11,000" },
        { name: "Resistive on solar", upfront: 1500, solar: 8350, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$9,850" },
        { name: "Resistive night rate", upfront: 1500, solar: 0, ripple: 11950, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$13,450" },
        { name: "Resistive avg grid", upfront: 1500, solar: 0, ripple: 0, elec: 17950, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$19,450" },
        { name: "Gas instant", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 10000, gasDaily: 4500, lpgVol: 0, lpgDaily: 0, total: "$17,500" },
        { name: "Gas tank", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 12900, gasDaily: 4500, lpgVol: 0, lpgDaily: 0, total: "$20,400" },
        { name: "LPG instant", upfront: 3000, solar: 0, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 13700, lpgDaily: 3000, total: "$19,700" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "solar", label: "Solar financed", color: "#fbbc04" },
        { key: "ripple", label: "Ripple", color: "#6d9eeb" },
        { key: "elec", label: "Electricity costs", color: "#3c78d8" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 1250, xTicks: [0, 250, 500, 750, 1000, 1250],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Hot water heat pump (solar)", solar: 90, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$90 /yr" },
        { name: "Hot water heat pump (night)", solar: 0, ripple: 130, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$130 /yr" },
        { name: "Hot water heat pump (grid)", solar: 0, ripple: 0, elec: 220, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$220 /yr" },
        { name: "Resistive on solar", solar: 360, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$360 /yr" },
        { name: "Resistive night rate", solar: 0, ripple: 540, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$540 /yr" },
        { name: "Resistive avg grid", solar: 0, ripple: 0, elec: 910, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$910 /yr" },
        { name: "Gas instant", solar: 0, ripple: 0, elec: 0, gasVol: 540, gasDaily: 300, lpgVol: 0, lpgDaily: 0, total: "$840 /yr" },
        { name: "Gas tank", solar: 0, ripple: 0, elec: 0, gasVol: 640, gasDaily: 300, lpgVol: 0, lpgDaily: 0, total: "$940 /yr" },
        { name: "LPG instant", solar: 0, ripple: 0, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 750, lpgDaily: 200, total: "$950 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [
        { key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#e06666" },
      ],
      xMax: 800, xTicks: [0, 200, 400, 600, 800],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average water heating needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Hot water heat pump", emissions: 50, total: "50" },
        { name: "Resistive", emissions: 220, total: "220" },
        { name: "Gas instant", emissions: 620, total: "620" },
        { name: "Gas tank", emissions: 740, total: "740" },
        { name: "LPG instant", emissions: 670, total: "670" },
      ],
    }},
  ],
};

export const COOKTOP_TABS = {
  title: "Cooking savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "upfront", label: "Upfront costs", color: "#434343" },
        { key: "elec", label: "Electricity costs", color: "#6fa8dc" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 5000, xTicks: [0, 1000, 2000, 3000, 4000, 5000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on average cooktop energy needs (RBS 2021), 2026 energy prices with forward inflation (real), 15 year appliance lifetime.",
      data: [
        { name: "Induction cooktop", upfront: 1200, elec: 2127, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$3,327" },
        { name: "Resistive cooktop", upfront: 500, elec: 2565, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$3,065" },
        { name: "Gas cooktop", upfront: 800, elec: 0, gasVol: 1824, gasDaily: 1000, lpgVol: 0, lpgDaily: 0, total: "$3,624" },
        { name: "LPG cooktop", upfront: 800, elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 2977, lpgDaily: 1000, total: "$4,777" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#6fa8dc" },
        { key: "gasVol", label: "Gas costs (volume)", color: "#a64d79" },
        { key: "gasDaily", label: "Gas costs (daily)", color: "#c27ba0" },
        { key: "lpgVol", label: "LPG costs (volume)", color: "#674ea7" },
        { key: "lpgDaily", label: "LPG costs (daily)", color: "#8e7cc3" },
      ],
      xMax: 200, xTicks: [0, 50, 100, 150, 200],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices.",
      data: [
        { name: "Induction cooktop", elec: 80, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$80 /yr" },
        { name: "Resistive cooktop", elec: 89, gasVol: 0, gasDaily: 0, lpgVol: 0, lpgDaily: 0, total: "$89 /yr" },
        { name: "Gas cooktop", elec: 0, gasVol: 50, gasDaily: 68, lpgVol: 0, lpgDaily: 0, total: "$118 /yr" },
        { name: "LPG cooktop", elec: 0, gasVol: 0, gasDaily: 0, lpgVol: 120, lpgDaily: 67, total: "$187 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [
        { key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#e06666" },
      ],
      xMax: 150, xTicks: [0, 50, 100, 150],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Based on average cooktop energy needs (RBS 2021), 2023 emissions factors (Ministry for the Environment 2023).",
      data: [
        { name: "Induction cooktop", emissions: 19, total: "19" },
        { name: "Resistive cooktop", emissions: 21, total: "21" },
        { name: "Gas cooktop", emissions: 136, total: "136" },
        { name: "LPG cooktop", emissions: 147, total: "147" },
      ],
    }},
  ],
};

export const EV_TABS = {
  title: "Vehicle savings",
  tabs: [
    { label: "15 Year Lifetime", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#3c78d8" },
        { key: "petrol", label: "Petrol costs", color: "#e06666" },
        { key: "diesel", label: "Diesel costs", color: "#cc4125" },
        { key: "rucs", label: "Road user charges", color: "#b7b7b7" },
        { key: "maintenance", label: "Maintenance", color: "#76a5af" },
      ],
      xMax: 55000, xTicks: [0, 10000, 20000, 30000, 40000, 50000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Running costs only (excludes vehicle purchase price). Medium vehicle, 188km/week, 2026 prices with forward inflation, 15 year ownership. Solar charging at the effective solar electricity price (23c/kWh vs 40c/kWh grid). Placeholder figures — to confirm against the model.",
      data: [
        { name: "Electric (grid charged)", elec: 9500, petrol: 0, diesel: 0, rucs: 13400, maintenance: 3800, total: "$26,700" },
        { name: "Electric (solar charged)", elec: 5500, petrol: 0, diesel: 0, rucs: 13400, maintenance: 3800, total: "$22,700" },
        { name: "Hybrid SUV", elec: 0, petrol: 25200, diesel: 0, rucs: 0, maintenance: 7800, total: "$33,000" },
        { name: "Petrol SUV", elec: 0, petrol: 41000, diesel: 0, rucs: 0, maintenance: 8500, total: "$49,500" },
        { name: "Diesel ute", elec: 0, petrol: 0, diesel: 31500, rucs: 13400, maintenance: 9000, total: "$53,900" },
      ],
    }},
    { label: "Yearly Bills", chart: {
      segments: [
        { key: "elec", label: "Electricity costs", color: "#3c78d8" },
        { key: "petrol", label: "Petrol costs", color: "#e06666" },
        { key: "diesel", label: "Diesel costs", color: "#cc4125" },
        { key: "rucs", label: "Road user charges", color: "#b7b7b7" },
        { key: "maintenance", label: "Maintenance", color: "#76a5af" },
      ],
      xMax: 4000, xTicks: [0, 1000, 2000, 3000, 4000],
      valuePrefix: "$", valueSuffix: "",
      subtitle: "Based on 2026 energy prices, 188km/week. Placeholder figures — to confirm against the model.",
      data: [
        { name: "Electric (grid charged)", elec: 530, petrol: 0, diesel: 0, rucs: 745, maintenance: 300, total: "$1,575 /yr" },
        { name: "Electric (solar charged)", elec: 300, petrol: 0, diesel: 0, rucs: 745, maintenance: 300, total: "$1,345 /yr" },
        { name: "Hybrid SUV", elec: 0, petrol: 1400, diesel: 0, rucs: 0, maintenance: 600, total: "$2,000 /yr" },
        { name: "Petrol SUV", elec: 0, petrol: 2600, diesel: 0, rucs: 0, maintenance: 700, total: "$3,300 /yr" },
        { name: "Diesel ute", elec: 0, petrol: 0, diesel: 2000, rucs: 750, maintenance: 800, total: "$3,550 /yr" },
      ],
    }},
    { label: "Yearly Emissions", chart: {
      segments: [
        { key: "emissions", label: "Yearly emissions (kg CO2e/yr)", color: "#e06666" },
      ],
      xMax: 3000, xTicks: [0, 1000, 2000, 3000],
      valuePrefix: "", valueSuffix: "",
      subtitle: "Tailpipe and electricity emissions, 2023 emissions factors (Ministry for the Environment 2023). Placeholder figures — to confirm against the model.",
      data: [
        { name: "Electric (EV)", emissions: 130, total: "130" },
        { name: "Hybrid SUV", emissions: 1400, total: "1,400" },
        { name: "Petrol SUV", emissions: 2300, total: "2,300" },
        { name: "Diesel ute", emissions: 2600, total: "2,600" },
      ],
    }},
  ],
};
