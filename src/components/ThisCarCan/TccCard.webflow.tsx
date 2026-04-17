import TccCard from "./TccCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccCard, {
  name: "TCC Card",
  description:
    "CMS-bindable gallery card for stories, images, and videos with built-in popup modal. Drop inside a Collection List.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    type: props.Text({
      name: "Type",
      defaultValue: "story",
      group: "CMS Fields",
      tooltip: "Card type: 'story', 'image', or 'video'",
    }),
    name: props.Text({
      name: "Name",
      defaultValue: "Sarah",
      group: "CMS Fields",
    }),
    car: props.Text({
      name: "Car",
      defaultValue: "BYD Atto 3",
      group: "CMS Fields",
    }),
    statement: props.Text({
      name: "Statement",
      defaultValue: "Save me thousands on fuel",
      group: "CMS Fields",
      tooltip: "The 'This car can...' phrase",
    }),
    story: props.RichText({
      name: "Story Text",
      defaultValue:
        "Switching to electric was the best decision. I save $200 a month and love the quiet drive.",
      group: "CMS Fields",
      tooltip: "Only used when type is 'story'",
    }),
    image: props.Image({
      name: "Image / Thumbnail",
      group: "CMS Fields",
      tooltip: "Card image for 'image' type, or video thumbnail for 'video' type",
    }),
    videoUrl: props.Text({
      name: "Video URL",
      defaultValue: "",
      group: "CMS Fields",
      tooltip: "Video source URL for 'video' type cards",
    }),
    logoImage: props.Image({
      name: "Logo Image",
      group: "Branding",
      tooltip: "This Car Can logo shown on card and modal",
    }),
  },
});
