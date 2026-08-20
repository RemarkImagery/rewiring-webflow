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
  },
});
