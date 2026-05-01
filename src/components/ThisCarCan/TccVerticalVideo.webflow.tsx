import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import TccVerticalVideo from "./TccVerticalVideo";

export default declareComponent(TccVerticalVideo, {
  name: "TCC Vertical Video",
  description: "Single vertical YouTube video left-aligned with heading and body text on the right, with up to 4 CTA buttons",
  group: "This Car Can",
  props: {
    youtubeUrl: props.Text({ name: "YouTube URL", defaultValue: "", group: "Video", tooltip: "Full YouTube URL (youtube.com/watch?v=, youtu.be/, or /shorts/)" }),
    heading: props.Text({ name: "Heading", defaultValue: "This Is What My Car Can Do", group: "Content" }),
    body: props.RichText({ name: "Body", defaultValue: "There are so many good stories to tell about electric vehicles and so many features worth promoting. EV owners love what their cars can do \u2014 and they can do a lot these days.", group: "Content" }),
    btn1Label: props.Text({ name: "Button 1 Label", defaultValue: "", group: "Button 1" }),
    btn1Url: props.Text({ name: "Button 1 URL", defaultValue: "", group: "Button 1", tooltip: "Page path, #section-id, or full URL" }),
    btn1NewTab: props.Boolean({ name: "Open in new tab", defaultValue: false, group: "Button 1" }),
    btn2Label: props.Text({ name: "Button 2 Label", defaultValue: "", group: "Button 2" }),
    btn2Url: props.Text({ name: "Button 2 URL", defaultValue: "", group: "Button 2", tooltip: "Page path, #section-id, or full URL" }),
    btn2NewTab: props.Boolean({ name: "Open in new tab", defaultValue: false, group: "Button 2" }),
    btn3Label: props.Text({ name: "Button 3 Label", defaultValue: "", group: "Button 3" }),
    btn3Url: props.Text({ name: "Button 3 URL", defaultValue: "", group: "Button 3", tooltip: "Page path, #section-id, or full URL" }),
    btn3NewTab: props.Boolean({ name: "Open in new tab", defaultValue: false, group: "Button 3" }),
    btn4Label: props.Text({ name: "Button 4 Label", defaultValue: "", group: "Button 4" }),
    btn4Url: props.Text({ name: "Button 4 URL", defaultValue: "", group: "Button 4", tooltip: "Page path, #section-id, or full URL" }),
    btn4NewTab: props.Boolean({ name: "Open in new tab", defaultValue: false, group: "Button 4" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#f5b731", group: "Style" }),
  },
  options: { ssr: false },
});
