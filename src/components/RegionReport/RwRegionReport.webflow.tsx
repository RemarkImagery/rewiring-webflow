import RwRegionReport from "./RwRegionReport";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionReport, {
  name: "RW Region Report",
  description:
    "Full electrification report for one district/region (hero, jump-nav, economics, emissions & jobs, bills, solar, EV, heat pump, hot water, induction) with live charts. Data for all 88 locations is built in — pin this instance to a location with the District slug prop. Place above the Local Stories collection list.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    districtSlug: props.Text({
      name: "District slug (blank = auto from URL)",
      defaultValue: "",
      group: "Content",
    }),
  },
});
