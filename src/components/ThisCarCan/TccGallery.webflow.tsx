import TccGallery from "./TccGallery";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccGallery, {
  name: "TCC Gallery",
  description:
    "Filterable community gallery showing stories, images, and videos with modal popups.",
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
    logoImage: props.Image({
      name: "Logo Image",
      group: "Content",
      tooltip: "Logo displayed on gallery cards and modal",
    }),
    apiUrl: props.Text({
      name: "API URL",
      defaultValue: "https://this-car-can-api.noisy-scene-d996.workers.dev",
      group: "Settings",
      tooltip: "Cloudflare Worker API URL. Leave empty for demo data.",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
