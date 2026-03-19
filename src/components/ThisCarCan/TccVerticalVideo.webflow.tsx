import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import TccVerticalVideo from "./TccVerticalVideo";

export default declareComponent(TccVerticalVideo, {
  name: "TCC Vertical Video",
  description: "Single vertical YouTube video left-aligned with heading and body text on the right",
  group: "This Car Can",
  props: {
    youtubeUrl: props.Text({ name: "YouTube URL", defaultValue: "", group: "Video", tooltip: "Full YouTube URL (youtube.com/watch?v=, youtu.be/, or /shorts/)" }),
    heading: props.Text({ name: "Heading", defaultValue: "This Is What My Car Can Do", group: "Content" }),
    body: props.RichText({ name: "Body", defaultValue: "There are so many good stories to tell about electric vehicles and so many features worth promoting. EV owners love what their cars can do \u2014 and they can do a lot these days.", group: "Content" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#f5b731", group: "Style" }),
  },
  options: { ssr: false },
});
