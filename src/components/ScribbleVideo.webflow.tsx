import ScribbleVideo from "./ScribbleVideo";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(ScribbleVideo, {
  name: "Scribble Video",
  description: "Hand-drawn video player section with YouTube embed. Shows thumbnail, plays on click. Film-strip sprocket decorations.",
  group: "Sections",
  options: { ssr: false },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "See it in", group: "Content" }),
    accentWord: props.Text({ name: "Accent Word", defaultValue: "action", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Watch how it all comes together — hit play to find out.", group: "Content" }),
    videoUrl: props.Text({ name: "YouTube URL", defaultValue: "", group: "Video", tooltip: "Paste a YouTube URL (e.g. https://youtube.com/watch?v=dQw4w9WgXcQ)" }),
    thumbnail: props.Image({ name: "Custom Thumbnail", group: "Video", tooltip: "Optional. If empty, YouTube thumbnail is used automatically." }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#8b6db5", group: "Style" }),
  },
});
