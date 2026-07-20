import TcccSubmit from "./TcccSubmit";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TcccSubmit, {
  name: "Company EV Submit",
  description:
    "CTA section for businesses to download the EV case study template and submit their story. Place below the company stories grid.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Share Your Company’s EV Story",
      group: "Content",
    }),
    description: props.Text({
      name: "Description",
      defaultValue:
        "Help inspire other NZ businesses by sharing your fleet electrification journey. Download the case study template, complete it, and send it back to us.",
      group: "Content",
    }),
    downloadUrl: props.Text({
      name: "Download URL",
      defaultValue: "#",
      group: "Content",
      tooltip: "URL to the case study template PDF (upload to Webflow assets)",
    }),
    downloadLabel: props.Text({
      name: "Download Button Label",
      defaultValue: "Download the template",
      group: "Content",
    }),
    emailAddress: props.Text({
      name: "Email Address",
      defaultValue: "dawn@rewiring.nz",
      group: "Content",
      tooltip: "Where completed forms should be sent",
    }),
    emailLabel: props.Text({
      name: "Email Button Label",
      defaultValue: "Email your completed form",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#1B4A4A",
      group: "Style",
    }),
  },
});
