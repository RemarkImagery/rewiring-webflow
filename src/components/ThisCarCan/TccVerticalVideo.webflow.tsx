import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import TccVerticalVideo from "./TccVerticalVideo";

export default declareComponent(TccVerticalVideo, {
  name: "TCC Vertical Video",
  description: "Vertical 9:16 YouTube video cards with squiggle borders for TCC page",
  group: "This Car Can",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "EV Stories", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Real people sharing what their car can do.", group: "Content" }),
    youtubeUrl1: props.Text({ name: "YouTube URL 1", defaultValue: "", group: "Videos", tooltip: "Full YouTube URL (youtube.com/watch?v=, youtu.be/, or /shorts/)" }),
    youtubeUrl2: props.Text({ name: "YouTube URL 2", defaultValue: "", group: "Videos" }),
    youtubeUrl3: props.Text({ name: "YouTube URL 3", defaultValue: "", group: "Videos" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#f5b731", group: "Style" }),
  },
  options: { ssr: false },
});
