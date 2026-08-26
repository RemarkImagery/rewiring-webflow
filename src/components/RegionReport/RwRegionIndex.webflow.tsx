import RwRegionIndex from "./RwRegionIndex";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionIndex, {
  name: "RW Region Index",
  description:
    "Directory for the rewiring.nz/regional-reports index page: every regional report linked, grouped into City councils / District councils / Regions columns (82 locations from the bundled data). Optional feature link to the standalone New Zealand page at the top (set its URL to show it).",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    basePath: props.Text({ name: "Base path", defaultValue: "/regional-reports/", group: "Behaviour" }),
    nzUrl: props.Text({ name: "New Zealand page URL (blank = hidden)", defaultValue: "", group: "Behaviour" }),
    nzLabel: props.Text({ name: "New Zealand link label", defaultValue: "See the report for all of New Zealand", group: "Content" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    goldColor: props.Text({ name: "Gold colour", defaultValue: "#f5b731", group: "Style" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
  },
});
