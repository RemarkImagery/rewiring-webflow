import NzmeHero from "./NzmeHero";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeHero, {
  name: "NZME Hero",
  description: "NZ Made Energy campaign hero - neon outline headline, Laser Kiwi image, dual CTAs.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "New Zealand-made Energy", group: "Content" }),
    headingLine1: props.Text({ name: "Heading line 1", defaultValue: "Operation", group: "Content" }),
    headingLine2: props.Text({ name: "Heading line 2", defaultValue: "Laser Kiwi", group: "Content" }),
    tagline: props.Text({
      name: "Tagline",
      defaultValue:
        "We're sending Mike Casey on a mission to the Beehive dressed as a Laser Kiwi to promote the idea of New Zealand-made energy. We will do something no matter what, but if we raise money, we can take things up a few notches.",
      group: "Content",
    }),
    ctaText: props.Text({ name: "Primary CTA text", defaultValue: "Donate now", group: "CTAs" }),
    ctaUrl: props.Link({ name: "Primary CTA URL", group: "CTAs" }),
    secondaryCtaText: props.Text({ name: "Secondary CTA text", defaultValue: "See the stretch goals", group: "CTAs" }),
    secondaryCtaUrl: props.Link({ name: "Secondary CTA URL", group: "CTAs" }),
    kiwiImage: props.Image({ name: "Kiwi image (transparent PNG, side column)", group: "Media" }),
    backgroundImage: props.Image({ name: "Background image (full-bleed, overrides kiwi column)", group: "Media" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
