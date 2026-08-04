import NzmeTeaserPledge from "./NzmeTeaserPledge";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeTeaserPledge, {
  name: "NZME Teaser Pledge",
  description: "Pre-campaign pledge form - name, email, indicative amount pills. Stores submissions via the nzme-teaser-forms worker.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "Get involved early", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "Make a pre-campaign pledge", group: "Content" }),
    intro: props.Text({
      name: "Intro",
      defaultValue:
        "The thermometer isn't live yet, but you can get your name on it now. Tell us you're in and roughly what you'd chip in, and the moment Operation Laser Kiwi launches we'll email you first so your pledge lands on day one.",
      group: "Content",
    }),
    submitUrl: props.Text({
      name: "Submit endpoint URL",
      defaultValue: "https://nzme-teaser-forms.oj-f3d.workers.dev",
      group: "Form",
    }),
    amountsCsv: props.Text({
      name: "Amount pills (comma-separated)",
      defaultValue: "$20, $50, $100, $250, $500",
      group: "Form",
    }),
    successMessage: props.Text({
      name: "Success message",
      defaultValue:
        "Legend! You're on the list. We'll email you the moment the campaign goes live so your pledge can land on day one.",
      group: "Form",
    }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
