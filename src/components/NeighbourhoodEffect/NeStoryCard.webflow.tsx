import NeStoryCard from "./NeStoryCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeStoryCard, {
  name: "NE Story Card",
  description:
    "Single testimonial card. Drop inside a Webflow CMS Collection List bound to the 'Neighbourhood Effect Stories' collection. Card shows a truncated quote with a 'Read full story' link; clicking opens a modal with the full quote, photo, and/or video.",
  group: "Neighbourhood Effect",
  options: { ssr: true },
  props: {
    quote: props.Text({
      name: "Quote",
      defaultValue:
        "Mike Casey's TikTok was the catalyst to get me over the line. Cost $13,500 — first year we saved over $3,000. I've convinced three neighbours to do the same.",
      group: "Content",
      tooltip: "Bind to the 'Quote' CMS field.",
    }),
    attribution: props.Text({
      name: "Attribution",
      defaultValue: "Influenced by Mike Casey",
      group: "Content",
      tooltip: "Bind to the 'Attribution' CMS field.",
    }),
    context: props.Text({
      name: "Context",
      defaultValue: "Solar + EV convert · Three neighbours followed",
      group: "Content",
      tooltip: "Bind to the 'Context' CMS field.",
    }),
    photo: props.Image({
      name: "Photo",
      group: "Content",
      tooltip:
        "Bind to the 'Photo' CMS field. Shown in the modal. If a video is also set, the video plays in the modal and the photo is used as the poster.",
    }),
    videoUrl: props.Text({
      name: "Video URL",
      defaultValue: "",
      group: "Content",
      tooltip:
        "Bind to the 'Submitted Video' CMS field's URL value. When set, the card shows a 'Video story' badge and the modal plays the video.",
    }),
    featured: props.Boolean({
      name: "Featured",
      defaultValue: false,
      group: "Content",
      tooltip:
        "Switches to the gold-bordered featured variant. In Webflow, bind via a Conditional Visibility filter on the 'Style' CMS field set to 'Featured'.",
    }),
    readMoreText: props.Text({
      name: "Read More Label",
      defaultValue: "Read full story",
      group: "Content",
    }),
    closeLabel: props.Text({
      name: "Close Button Label",
      defaultValue: "Close",
      group: "Content",
      tooltip: "Accessible label for the modal close button.",
    }),
    cardBg: props.Text({
      name: "Default Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    featuredBg: props.Text({
      name: "Featured Background",
      defaultValue: "#fdf7ea",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent (border + quote mark + read more + video badge)",
      defaultValue: "#f5b731",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
    mutedColor: props.Text({
      name: "Context Color",
      defaultValue: "#5a7a78",
      group: "Style",
    }),
    modalBg: props.Text({
      name: "Modal Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    modalOverlayColor: props.Text({
      name: "Modal Overlay Color",
      defaultValue: "rgba(15, 35, 35, 0.78)",
      group: "Style",
      tooltip: "RGBA recommended so the page is visible underneath.",
    }),
  },
});
