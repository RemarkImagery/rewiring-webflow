import NzmeMerch from "./NzmeMerch";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeMerch, {
  name: "NZME Merch",
  description: "Campaign merch grid - t-shirts, key rings, stickers, calendar. Cards link out when a URL is set, otherwise show 'Coming soon'.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The merch", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Wear the campaign. Every purchase pushes the thermometer up.",
      group: "Content",
    }),
    demoNote: props.Text({
      name: "Note",
      defaultValue: "Store launching soon - for now, chip in above and we'll let you know when it's live.",
      group: "Content",
    }),
    item1Title: props.Text({ name: "Item 1 title", defaultValue: "New Zealand-made energy t-shirt", group: "Item 1" }),
    item1Price: props.Text({ name: "Item 1 price", defaultValue: "$45", group: "Item 1" }),
    item1Image: props.Image({ name: "Item 1 image", group: "Item 1" }),
    item1Url: props.Link({ name: "Item 1 buy URL", group: "Item 1" }),
    item2Title: props.Text({ name: "Item 2 title", defaultValue: "Laser Kiwi key ring", group: "Item 2" }),
    item2Price: props.Text({ name: "Item 2 price", defaultValue: "$15", group: "Item 2" }),
    item2Image: props.Image({ name: "Item 2 image", group: "Item 2" }),
    item2Url: props.Link({ name: "Item 2 buy URL", group: "Item 2" }),
    item3Title: props.Text({ name: "Item 3 title", defaultValue: "Laser Kiwi sticker pack", group: "Item 3" }),
    item3Price: props.Text({ name: "Item 3 price", defaultValue: "$10", group: "Item 3" }),
    item3Image: props.Image({ name: "Item 3 image", group: "Item 3" }),
    item3Url: props.Link({ name: "Item 3 buy URL", group: "Item 3" }),
    item4Title: props.Text({ name: "Item 4 title", defaultValue: "Sexiest Electric Machines calendar", group: "Item 4" }),
    item4Price: props.Text({ name: "Item 4 price", defaultValue: "$30", group: "Item 4" }),
    item4Image: props.Image({ name: "Item 4 image", group: "Item 4" }),
    item4Url: props.Link({ name: "Item 4 buy URL", group: "Item 4" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
