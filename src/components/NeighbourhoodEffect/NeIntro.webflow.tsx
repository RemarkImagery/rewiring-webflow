import NeIntro from "./NeIntro";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NeIntro, {
  name: "NE Intro",
  description:
    "Reading column with intro paragraphs and a highlighted 'Neighbourhood Effect' callout card.",
  group: "Neighbourhood Effect",
  options: { ssr: true },
  props: {
    para1: props.Text({
      name: "Paragraph 1",
      defaultValue:
        "We've been collecting stories of bill savings, self-sufficiency and emissions reductions from homeowners, farms and businesses that have gone electric for a while now — and they are a potent illustration of what's possible.",
      group: "Content",
    }),
    para2: props.Text({
      name: "Paragraph 2",
      defaultValue:
        "For many, it feels like they've accessed a cheat code that unlocks a much cheaper, cleaner and more stable energy subscription. Some had to take a risk or pay a premium to go early on electric technology, but these pioneers are the ones who help create the conditions for others to adopt it — and in many cases, it's their experiences that help convince others to follow suit.",
      group: "Content",
    }),
    highlightLabel: props.Text({
      name: "Highlight Label",
      defaultValue: "Why it works",
      group: "Highlight",
    }),
    highlight: props.Text({
      name: "Highlight Title",
      defaultValue: "Neighbourhood Effect",
      group: "Highlight",
    }),
    para3: props.Text({
      name: "Highlight Body",
      defaultValue:
        "We are herding creatures, after all, and research shows that seeing others adopt rooftop solar increases the number of nearby installations — something called the 'neighbourhood effect'. It's in full swing right now, with more New Zealanders looking at EVs and solar than perhaps ever before.",
      group: "Highlight",
    }),
    para4: props.Text({
      name: "Paragraph 4",
      defaultValue:
        "When it comes to technological changes, the majority tends to wait until lots of others have jumped on board before they decide to take the plunge. And our community groups are doing great work ensuring the neighbourhood effect takes hold in their areas.",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background",
      defaultValue: "#FFFCF0",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Highlight Accent",
      defaultValue: "#2d5c5a",
      group: "Style",
    }),
  },
});
