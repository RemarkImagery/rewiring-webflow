import PfwCtaCard, { PFW_DEFAULTS as D } from "./PfwCtaCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(PfwCtaCard, {
  name: "Powered from Within Card",
  description: "Homepage card for the Powered from Within fuel-security think piece, linking to pages.rewiring.nz/powered-from-within.",
  group: "Home Page",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: D.heading, group: "Content" }),
    headingAccent: props.Text({ name: "Heading (gold highlight)", defaultValue: D.headingAccent, group: "Content" }),
    subheading: props.Text({ name: "Subheading", defaultValue: D.subheading, group: "Content" }),
    text: props.Text({ name: "Text", defaultValue: D.text, group: "Content" }),
    ctaText: props.Text({ name: "Button label", defaultValue: D.ctaText, group: "Content" }),
    ctaUrl: props.Text({ name: "Button URL", defaultValue: D.ctaUrl, group: "Content" }),
    secondaryText: props.Text({ name: "Second link label (blank = hidden)", defaultValue: D.secondaryText, group: "Content" }),
    secondaryUrl: props.Text({ name: "Second link URL", defaultValue: D.secondaryUrl, group: "Content" }),
    image: props.Image({ name: "Image (blank = page hero art)", group: "Content" }),
    imageAlt: props.Text({ name: "Image alt text", defaultValue: D.imageAlt, group: "Content" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: D.bgColor, group: "Colours" }),
    textColor: props.Text({ name: "Text colour", defaultValue: D.textColor, group: "Colours" }),
    accentColor: props.Text({ name: "Highlight colour", defaultValue: D.accentColor, group: "Colours" }),
    buttonColor: props.Text({ name: "Button colour", defaultValue: D.buttonColor, group: "Colours" }),
    buttonTextColor: props.Text({ name: "Button text colour", defaultValue: D.buttonTextColor, group: "Colours" }),
  },
});
