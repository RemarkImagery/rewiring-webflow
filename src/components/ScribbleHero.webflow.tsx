import ScribbleHero from "./ScribbleHero";
import { props, PropType, PropValues } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

type LinkValue = PropValues[PropType.Link];

interface WebflowProps {
  headingLine1?: string;
  headingLine2?: string;
  accentWord?: string;
  subtitle1?: string;
  subtitle2?: string;
  ctaText?: string;
  ctaLink?: LinkValue;
  image?: any;
  accentColor?: string;
}

function Wrapper({ ctaLink, ...rest }: WebflowProps) {
  const link = ctaLink && typeof ctaLink === "object" && "href" in ctaLink
    ? { href: ctaLink.href, target: ctaLink.target }
    : undefined;
  return <ScribbleHero {...rest} ctaLink={link} />;
}

export default declareComponent(Wrapper, {
  name: "Scribble Hero",
  description: "Hand-drawn hero section with animated scribble accents, heading, photo circle, and CTA button.",
  group: "Sections",
  options: { ssr: false },
  props: {
    headingLine1: props.Text({ name: "Heading Line 1", defaultValue: "The best way to", group: "Content" }),
    headingLine2: props.Text({ name: "Heading Line 2", defaultValue: "take care of your", group: "Content" }),
    accentWord: props.Text({ name: "Accent Word", defaultValue: "pet", group: "Content" }),
    subtitle1: props.Text({ name: "Subtitle Line 1", defaultValue: "We offer pet health insurance plans for illness, injury and wellness care.", group: "Content" }),
    subtitle2: props.Text({ name: "Subtitle Line 2", defaultValue: "New, chronic and pre-existing illnesses are covered at no additional cost.", group: "Content" }),
    ctaText: props.Text({ name: "CTA Text", defaultValue: "Get Started →", group: "Content" }),
    ctaLink: props.Link({ name: "CTA Link", group: "Content" }),
    image: props.Image({ name: "Hero Image", group: "Content" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#8b6db5", group: "Style" }),
  },
});
