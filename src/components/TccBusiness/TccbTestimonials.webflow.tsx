import TccbTestimonials from "./TccbTestimonials";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbTestimonials, {
  name: "TCCB Testimonials",
  description: "Auto-scrolling testimonial carousel with yellow cards showing NZ business case studies for going electric.",
  group: "TCC Business",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Businesses Already Leading",
      group: "Content",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      defaultValue: "See what NZ businesses are saying about going electric",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Style",
    }),
    autoScrollSpeed: props.Number({
      name: "Auto-Scroll Speed (ms)",
      defaultValue: 5000,
      group: "Settings",
    }),
  },
});
