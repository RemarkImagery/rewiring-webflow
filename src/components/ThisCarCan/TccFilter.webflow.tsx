import TccFilter from "./TccFilter";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccFilter, {
  name: "TCC Filter",
  description:
    "Title section with filter buttons for the CMS gallery. Filters collection items by type.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Community Stories",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "See what cars can do across Aotearoa.",
      group: "Content",
    }),
    galleryId: props.Text({
      name: "Gallery Wrapper ID",
      defaultValue: "tcc-gallery",
      group: "Settings",
      tooltip: "The HTML ID of the Collection List wrapper element",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
