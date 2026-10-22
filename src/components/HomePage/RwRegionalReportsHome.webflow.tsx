import RwRegionalReportsHome, { RRH_DEFAULTS as D } from "./RwRegionalReportsHome";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionalReportsHome, {
  name: "Regional Reports Home Section",
  description:
    "Homepage section for the regional reports: NZ headline figures plus a location picker that opens /regional-reports/<slug>.",
  group: "Home Page",
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: D.eyebrow, group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: D.heading, group: "Content" }),
    headingAccent: props.Text({ name: "Heading (gold)", defaultValue: D.headingAccent, group: "Content" }),
    text: props.Text({ name: "Text", defaultValue: D.text, group: "Content" }),
    stat1Value: props.Text({ name: "Stat 1 value (blank = hidden)", defaultValue: D.stat1Value, group: "Stats" }),
    stat1Label: props.Text({ name: "Stat 1 label", defaultValue: D.stat1Label, group: "Stats" }),
    stat2Value: props.Text({ name: "Stat 2 value (blank = hidden)", defaultValue: D.stat2Value, group: "Stats" }),
    stat2Label: props.Text({ name: "Stat 2 label", defaultValue: D.stat2Label, group: "Stats" }),
    stat3Value: props.Text({ name: "Stat 3 value (blank = hidden)", defaultValue: D.stat3Value, group: "Stats" }),
    stat3Label: props.Text({ name: "Stat 3 label", defaultValue: D.stat3Label, group: "Stats" }),
    footnote: props.Text({ name: "Footnote (blank = hidden)", defaultValue: D.footnote, group: "Stats" }),
    pickerHeading: props.Text({ name: "Picker heading", defaultValue: D.pickerHeading, group: "Picker" }),
    typeLabel: props.Text({ name: "Area type label (screen readers)", defaultValue: D.typeLabel, group: "Picker" }),
    locationLabel: props.Text({ name: "Location label", defaultValue: D.locationLabel, group: "Picker" }),
    locationPlaceholder: props.Text({ name: "Location placeholder", defaultValue: D.locationPlaceholder, group: "Picker" }),
    goLabel: props.Text({ name: "Button label", defaultValue: D.goLabel, group: "Picker" }),
    allText: props.Text({ name: "All-reports link label (blank = hidden)", defaultValue: D.allText, group: "Picker" }),
    allUrl: props.Text({ name: "All-reports link URL", defaultValue: D.allUrl, group: "Picker" }),
    basePath: props.Text({ name: "Report path prefix (slug is appended)", defaultValue: D.basePath, group: "Picker" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: D.bgColor, group: "Colours" }),
    textColor: props.Text({ name: "Text colour", defaultValue: D.textColor, group: "Colours" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: D.accentColor, group: "Colours" }),
  },
});
