import RwReportBills from "./RwReportBills";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportBills, {
  name: "RW Report · Bills",
  description:
    "Bills section (v2): headline bill-savings + net-savings stat boxes and the two-tab bills comparison chart. All figures are per-location from the bundled data (chosen from the page URL) — the text props override the stat-box numbers only; blank keeps the bundled value.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),
    billSavings: props.Text({ name: "Bill savings / yr", defaultValue: "", group: "Content" }),
    billsNetSavings: props.Text({ name: "Net savings / yr", defaultValue: "", group: "Content" }),
    billsNet15yr: props.Text({ name: "Net savings over 15 yrs", defaultValue: "", group: "Content" }),
    /* BEGIN generated text props - build_editable_text.py */
    billsHeading: props.Text({ name: "Heading · Bills", defaultValue: "Bills", group: "Bills" }),
    billsPara1: props.Text({ name: "Paragraph 1 · In a fossil fuel home, energy…", defaultValue: "In a fossil fuel home, energy spending is spread across multiple fuels, each with its own bill, its own price fluctuations, and its own supplier. When a {{location}} home electrifies (using electric heating and cooking, driving two EVs, plus solar and batteries), they consolidate their energy into a single source &mdash; electricity &mdash; meaning <strong>lower bills and far greater control</strong>.", group: "Bills" }),
    billsPara2: props.Text({ name: "Paragraph 2 · An average location home using gas…", defaultValue: "An average {{location}} home using gas appliances and petrol vehicles is missing out on around <strong>{{bill_savings}} in savings</strong> on its energy bills every year compared to a home with electrified appliances and vehicles plus a solar and battery system. <span class=\"fine\">Excludes upfront costs. Based on 2026 energy prices.</span>", group: "Bills" }),
    billsPara3: props.Text({ name: "Paragraph 3 · With upfront costs and loan…", defaultValue: "With upfront costs and loan repayments included, an all-electric {{location}} home is still <strong>{{bills_net_savings}} net better off per year</strong>, and a net <strong>{{bills_net_15yr}} better off over 15 years</strong>. <span class=\"fine\">Includes upfront costs and interest at 5.5% p.a. Based on 15 year average forward energy prices annualised and in 2026 dollars.</span>", group: "Bills" }),
    /* END generated text props */
  },
});
