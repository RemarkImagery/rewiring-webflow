import RwRegionReport from "./RwRegionReport";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionReport, {
  name: "RW Region Report",
  description:
    "Full electrification report for one district/region (v2 layout: banner, hero, headline stats, cumulative graph, jump-navs, economics, emissions & jobs, bills, solar, EV, heat pump, hot water, induction) with per-location charts for all 82 locations built in. Blank slug = auto from the page URL. The 'Local stories' and 'Community group' jump cards scroll to elements with id=\"stories\" and id=\"community\" — set those ids on the sections you build around this component.",
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
