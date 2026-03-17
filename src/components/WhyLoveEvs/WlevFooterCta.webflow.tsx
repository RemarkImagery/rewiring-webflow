import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevFooterCta from "./WlevFooterCta";

export default declareComponent(WlevFooterCta, {
  name: "WLEV Footer CTA",
  description: "Full-width CTA banner with buttons and social sharing links",
  group: "Why Love EVs",
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Ready to go electric?",
      group: "Content",
    }),
    primaryText: props.Text({
      name: "Primary Button",
      defaultValue: "Learn More",
      group: "Content",
    }),
    secondaryText: props.Text({
      name: "Secondary Button",
      defaultValue: "Find an EV",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#f5b731",
      group: "Style",
    }),
  },
  options: {
    ssr: true,
  },
});
