import TccShareSection from "./TccShareSection";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccShareSection, {
  name: "TCC Share Section",
  description:
    "Interactive submission section with collapsible Story, Image Creator, and Video Uploader panels.",
  group: "This Car Can",
  options: { ssr: false },
  props: {
    heading: props.Text({
      name: "Heading",
      defaultValue: "How Would You Like to Share?",
      group: "Content",
    }),
    storyTitle: props.Text({
      name: "Story Card Title",
      defaultValue: "Share Your Story",
      group: "Cards",
    }),
    storyDescription: props.Text({
      name: "Story Card Description",
      defaultValue:
        "Tell us about your EV journey — what made you switch, what surprised you, and what you love most.",
      group: "Cards",
    }),
    imageTitle: props.Text({
      name: "Image Card Title",
      defaultValue: "Share an Image",
      group: "Cards",
    }),
    imageDescription: props.Text({
      name: "Image Card Description",
      defaultValue:
        "Snap a photo of your EV in action — on a road trip, charging up, or just looking good on the drive.",
      group: "Cards",
    }),
    videoTitle: props.Text({
      name: "Video Card Title",
      defaultValue: "Share a Video",
      group: "Cards",
    }),
    videoDescription: props.Text({
      name: "Video Card Description",
      defaultValue:
        "Record a short clip about your experience — show us what your car can do and why you love it.",
      group: "Cards",
    }),
    logoImage: props.Image({
      name: "Logo Image",
      group: "Content",
      tooltip: "Logo used in the image creator overlay",
    }),
    storyButtonText: props.Text({
      name: "Story Button Text",
      defaultValue: "Submit Your Story",
      group: "Buttons",
    }),
    imageButtonText: props.Text({
      name: "Image Button Text",
      defaultValue: "Download Image",
      group: "Buttons",
    }),
    videoButtonText: props.Text({
      name: "Video Button Text",
      defaultValue: "Upload & Share",
      group: "Buttons",
    }),
    apiUrl: props.Text({
      name: "API URL",
      defaultValue: "https://this-car-can-api.noisy-scene-d996.workers.dev",
      group: "Settings",
      tooltip: "Cloudflare Worker API URL",
    }),
  },
});
