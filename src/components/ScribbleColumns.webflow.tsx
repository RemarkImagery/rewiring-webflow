import ScribbleColumns from "./ScribbleColumns";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(ScribbleColumns, {
  name: "Scribble Columns",
  description: "Hand-drawn three-column section with animated icons, titles, and descriptions on a sketched card.",
  group: "Sections",
  options: { ssr: false },
  props: {
    col1Title: props.Text({ name: "Column 1 Title", defaultValue: "WHEN THEY'RE SICK", group: "Column 1" }),
    col1Desc: props.Text({ name: "Column 1 Description", defaultValue: "Our insurance helps you get the diagnostics, treatment and Rx medicine they need to get better.", group: "Column 1" }),
    col2Title: props.Text({ name: "Column 2 Title", defaultValue: "WHEN THEY'RE HURT", group: "Column 2" }),
    col2Desc: props.Text({ name: "Column 2 Description", defaultValue: "Our insurance helps you give them the emergency care, surgery & rehab therapy it takes to recover.", group: "Column 2" }),
    col3Title: props.Text({ name: "Column 3 Title", defaultValue: "WHEN THEY'RE HEALTHY", group: "Column 3" }),
    col3Desc: props.Text({ name: "Column 3 Description", defaultValue: "Our preventive care pack helps you keep up with yearly check-ups, vaccines & lab tests.", group: "Column 3" }),
  },
});
