import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCarousel from "./WlevCarousel";

export default declareComponent(WlevCarousel, {
  name: "WLEV Image Carousel",
  description: "Edge-to-edge auto-scrolling 1:1 image carousel with squiggle borders",
  group: "Why Love EVs",
  props: {
    img1: props.Image({ name: "Image 1", group: "Images" }),
    img2: props.Image({ name: "Image 2", group: "Images" }),
    img3: props.Image({ name: "Image 3", group: "Images" }),
    img4: props.Image({ name: "Image 4", group: "Images" }),
    img5: props.Image({ name: "Image 5", group: "Images" }),
    img6: props.Image({ name: "Image 6", group: "Images" }),
    img7: props.Image({ name: "Image 7", group: "Images" }),
    img8: props.Image({ name: "Image 8", group: "Images" }),
    img9: props.Image({ name: "Image 9", group: "Images" }),
    img10: props.Image({ name: "Image 10", group: "Images" }),
    speed: props.Number({ name: "Speed (s per image)", defaultValue: 30, group: "Settings" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#FFFCF0", group: "Style" }),
  },
  options: { ssr: false },
});
