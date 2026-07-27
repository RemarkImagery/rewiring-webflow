import NzmeDonate from "./NzmeDonate";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeDonate, {
  name: "NZME Donate (Raisely)",
  description: "Inline Raisely donation form — same embed as rewiring.nz/donate (campaign path configurable).",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Chip in to Operation Laser Kiwi", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Donations go through Raisely, same as rewiring.nz — every dollar pushes the thermometer up.",
      group: "Content",
    }),
    campaignPath: props.Text({ name: "Raisely campaign path", defaultValue: "rewiring-aotearoa", group: "Embed" }),
    embedHeight: props.Text({ name: "Embed height (px)", defaultValue: "800", group: "Embed" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
  },
});
