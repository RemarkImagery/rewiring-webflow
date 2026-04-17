import TccbTimeline from "./TccbTimeline";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbTimeline, {
  name: "TCCB Timeline",
  description: "The Second-Hand Market Story — visual timeline showing the journey from business fleet purchase to affordable family EV, with policy levers callout.",
  group: "TCC Business",
  options: { ssr: true },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "Creating Tomorrow's Affordable EVs",
      group: "Content",
    }),
    body: props.RichText({
      name: "Body",
      defaultValue:
        "Japan produces 90% of NZ\u2019s used car imports \u2014 but they\u2019re years behind on EV production. We can\u2019t wait 7\u201310 years for affordable used EVs to arrive. The fastest path? NZ businesses buying new EVs today, creating our own second-hand supply in just 2\u20134 years.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
  },
});
