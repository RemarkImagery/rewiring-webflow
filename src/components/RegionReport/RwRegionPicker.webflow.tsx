import RwRegionPicker from "./RwRegionPicker";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionPicker, {
  name: "RW Region Picker",
  description:
    "Two-stage location dropdown (council type → location, all 82 report locations) ported from the preview site. Selecting a location navigates to that location's report page (Base path + slug — default /regional-reports/). Pre-selects the current page's location when the URL already ends in a report slug. Turn on 'Require Go button' to navigate only when the button is pressed.",
  group: "Region Reports",
  options: { ssr: false },
  props: {
    basePath: props.Text({ name: "Base path", defaultValue: "/regional-reports/", group: "Behaviour" }),
    requireGo: props.Boolean({ name: "Require Go button", defaultValue: false, group: "Behaviour" }),
    goLabel: props.Text({ name: "Go button label", defaultValue: "View report", group: "Behaviour" }),
    label: props.Text({ name: "Label", defaultValue: "See the report for another location", group: "Content" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / border colour", defaultValue: "#f5b731", group: "Style" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#234e4c", group: "Style" }),
    labelColor: props.Text({ name: "Label colour", defaultValue: "#fdf7ea", group: "Style" }),
  },
});
