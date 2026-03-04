import ArcCarousel from "./ArcCarousel";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(ArcCarousel, {
  name: "Arc Carousel",
  description:
    "Fan/arc card carousel. Place near a Collection List section. Set Target Selector to match the collection list (e.g. #venues-section .w-dyn-items).",
  group: "Sliders",
  props: {
    targetSelector: props.Text({
      name: "Target Selector",
      defaultValue: "#venues-section .w-dyn-items",
    }),
    rotationDeg: props.Number({
      name: "Rotation Angle",
      defaultValue: 12,
    }),
    dropPx: props.Number({
      name: "Drop Distance",
      defaultValue: 30,
    }),
    autoplayDelay: props.Number({
      name: "Autoplay Delay (ms)",
      defaultValue: 3500,
    }),
    cardWidth: props.Number({
      name: "Card Width (px)",
      defaultValue: 280,
    }),
    showOverlay: props.Boolean({
      name: "Show Overlay",
      defaultValue: true,
    }),
  },
});
