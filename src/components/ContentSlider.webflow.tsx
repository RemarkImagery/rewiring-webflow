import ContentSlider from "./ContentSlider";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

function slideProps(n: number, title?: string, body?: string, btnText?: string, btnLink?: string) {
  return {
    [`slide${n}Title`]: props.Text({
      name: `Slide ${n} Title`,
      defaultValue: title || "",
      group: `Slide ${n}`,
    }),
    [`slide${n}Body`]: props.Text({
      name: `Slide ${n} Body`,
      defaultValue: body || "",
      group: `Slide ${n}`,
    }),
    [`slide${n}Image`]: props.Image({
      name: `Slide ${n} Image`,
      group: `Slide ${n}`,
    }),
    [`slide${n}BtnText`]: props.Text({
      name: `Slide ${n} Button Text`,
      defaultValue: btnText || "",
      group: `Slide ${n}`,
    }),
    [`slide${n}BtnLink`]: props.Text({
      name: `Slide ${n} Button Link`,
      defaultValue: btnLink || "",
      group: `Slide ${n}`,
    }),
  };
}

export default declareComponent(ContentSlider, {
  name: "Content Slider",
  description:
    "Full-width content slider with up to 10 slides. Each slide shows a title, body text, and image side by side with an optional CTA button.",
  group: "Sliders",
  options: {
    ssr: false,
  },
  props: {
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#ffffff",
      group: "Settings",
    }),
    autoplayDelay: props.Number({
      name: "Autoplay Delay (ms)",
      defaultValue: 5000,
      group: "Settings",
    }),
    speed: props.Number({
      name: "Transition Speed (ms)",
      defaultValue: 600,
      group: "Settings",
    }),
    ...slideProps(1),
    ...slideProps(2),
    ...slideProps(3),
  },
});
