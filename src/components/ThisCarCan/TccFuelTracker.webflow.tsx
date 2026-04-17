import TccFuelTracker from "./TccFuelTracker";
import { props, PropType, PropValues } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

type LinkValue = PropValues[PropType.Link];

interface WebflowProps {
  imageUrl?: string;
  imageAlt?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkValue;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  headingColor?: string;
}

function TccFuelTrackerWrapper(webflowProps: WebflowProps) {
  const { buttonLink, ...rest } = webflowProps;
  const resolvedLink =
    buttonLink && typeof buttonLink === "object" && "href" in buttonLink
      ? { href: (buttonLink as LinkValue).href, target: (buttonLink as LinkValue).target }
      : undefined;
  return <TccFuelTracker {...rest} buttonLink={resolvedLink} />;
}

export default declareComponent(TccFuelTrackerWrapper, {
  name: "TCC Fuel Tracker",
  description:
    "Live NZ fuel price tracker image on the left with supporting copy and optional CTA button. Image refreshes daily from the Rewiring fuel worker.",
  group: "This Car Can",
  options: { ssr: true },
  props: {
    imageUrl: props.Text({
      name: "Image URL",
      defaultValue: "https://rewiring-fuel-worker.oj-f3d.workers.dev/latest.png",
      group: "Content",
      tooltip:
        "Live image URL. Defaults to the Rewiring fuel worker — updates daily. Leave as-is to keep it live.",
    }),
    imageAlt: props.Text({
      name: "Image Alt Text",
      defaultValue: "Live New Zealand fuel price tracker",
      group: "Content",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Run on the sun, not the pump.",
      group: "Content",
    }),
    description: props.RichText({
      name: "Description",
      defaultValue:
        "Running on New Zealand-made energy made economic sense before the fuel crisis kicked off and it makes even more sense now that fuel prices have gone through the roof. You could shop around and get slightly cheaper petrol or diesel, but history suggests the price will keep going up. As this live price tracker shows, the best bet is to go electric and, if you can, run on the sun.",
      group: "Content",
    }),
    buttonText: props.Text({
      name: "Button Text",
      defaultValue: "",
      group: "Button",
      tooltip: "Leave empty to hide the button.",
    }),
    buttonLink: props.Link({
      name: "Button Link",
      group: "Button",
      tooltip: "Choose a page, external URL, email or phone number.",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#f5f1e8",
      group: "Style",
    }),
    headingColor: props.Text({
      name: "Heading Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#2a2a2a",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
});
