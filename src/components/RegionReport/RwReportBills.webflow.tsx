import RwReportBills from "./RwReportBills";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwReportBills, {
  name: "RW Report · Bills",
  description:
    "Fossil-fuel vs electric annual-bill comparison (two stat cards) plus the stacked bill-breakdown chart. Bind the two bill figures to the CMS record; bind District slug to the record's Slug so the chart matches the location.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({ name: "District slug", defaultValue: "dunedin", group: "Data" }),
    location: props.Text({ name: "Location name", defaultValue: "", group: "Content" }),
    billFossil: props.Text({ name: "Fossil-fuel home annual bill", defaultValue: "", group: "Content" }),
    billElectric: props.Text({ name: "Electric home annual bill", defaultValue: "", group: "Content" }),
  },
});
