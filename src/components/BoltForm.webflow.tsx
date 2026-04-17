import BoltForm from "./BoltForm";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(BoltForm, {
  name: "Bolt Form",
  description: "Hand-drawn contact form section with animated electric bolt decorations inside and outside the frame.",
  group: "Sections",
  options: { ssr: false },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Get In Touch", group: "Content" }),
    subheading: props.Text({ name: "Subheading", defaultValue: "We'd love to hear from you. Send us a message and we'll get back to you shortly.", group: "Content" }),
    namePlaceholder: props.Text({ name: "Name Placeholder", defaultValue: "Your Name", group: "Form" }),
    emailPlaceholder: props.Text({ name: "Email Placeholder", defaultValue: "Your Email", group: "Form" }),
    messagePlaceholder: props.Text({ name: "Message Placeholder", defaultValue: "Your Message", group: "Form" }),
    submitText: props.Text({ name: "Submit Text", defaultValue: "Submit ⚡", group: "Form" }),
    formAction: props.Text({ name: "Form Action URL", defaultValue: "", group: "Form", tooltip: "Leave empty for no submission. Set to a URL to POST form data." }),
    accentColor: props.Text({ name: "Bolt Color (accent)", defaultValue: "#f5c518", group: "Style" }),
    boltColor: props.Text({ name: "Frame/Text Color", defaultValue: "#1a1a2e", group: "Style" }),
  },
});
