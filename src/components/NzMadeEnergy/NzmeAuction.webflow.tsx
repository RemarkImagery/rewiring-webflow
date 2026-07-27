import NzmeAuction from "./NzmeAuction";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeAuction, {
  name: "NZME Auction Grid",
  description: "Trade Me-style auction cards (demo, frontend only) - email + bid + T&C checkbox, local bid state.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The Laser Kiwi auctions", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue:
        "Legends of the electric movement have donated one-of-a-kind experiences. Every winning bid goes straight into the campaign.",
      group: "Content",
    }),
    demoNote: props.Text({ name: "Demo note", defaultValue: "Demo only - bids aren't stored or binding (yet!).", group: "Content" }),
    item1Title: props.Text({ name: "Item 1 title", defaultValue: "Guitar lesson with Jon Toogood", group: "Item 1" }),
    item1Desc: props.Text({
      name: "Item 1 description",
      defaultValue: "An hour one-on-one with the Shihad frontman. Bring your own axe - the amp runs on New Zealand-made energy.",
      group: "Item 1",
    }),
    item1Image: props.Image({ name: "Item 1 image", group: "Item 1" }),
    item1StartBid: props.Text({ name: "Item 1 start bid", defaultValue: "150", group: "Item 1" }),
    item1Closes: props.Text({ name: "Item 1 closes label", defaultValue: "Closes Mon 1 Sep", group: "Item 1" }),
    item2Title: props.Text({ name: "Item 2 title", defaultValue: "Party on an electric hydrofoil boat", group: "Item 2" }),
    item2Desc: props.Text({
      name: "Item 2 description",
      defaultValue: "You and your mates on the Vessev - a silent, flying, fully-electric boat party on Auckland harbour.",
      group: "Item 2",
    }),
    item2Image: props.Image({ name: "Item 2 image", group: "Item 2" }),
    item2StartBid: props.Text({ name: "Item 2 start bid", defaultValue: "500", group: "Item 2" }),
    item2Closes: props.Text({ name: "Item 2 closes label", defaultValue: "Closes Mon 1 Sep", group: "Item 2" }),
    item3Title: props.Text({ name: "Item 3 title", defaultValue: "Drag race an electric truck", group: "Item 3" }),
    item3Desc: props.Text({
      name: "Item 3 description",
      defaultValue: "Line up against Ross Linton in his electric truck. Spoiler: instant torque wins. Passenger seat for the brave.",
      group: "Item 3",
    }),
    item3Image: props.Image({ name: "Item 3 image", group: "Item 3" }),
    item3StartBid: props.Text({ name: "Item 3 start bid", defaultValue: "200", group: "Item 3" }),
    item3Closes: props.Text({ name: "Item 3 closes label", defaultValue: "Closes Mon 1 Sep", group: "Item 3" }),
    item4Title: props.Text({ name: "Item 4 title", defaultValue: "The wrecking room", group: "Item 4" }),
    item4Desc: props.Text({
      name: "Item 4 description",
      defaultValue: "Take a sledgehammer to a gas stove, a califont and a petrol car. Extremely therapeutic. Safety gear provided.",
      group: "Item 4",
    }),
    item4Image: props.Image({ name: "Item 4 image", group: "Item 4" }),
    item4StartBid: props.Text({ name: "Item 4 start bid", defaultValue: "100", group: "Item 4" }),
    item4Closes: props.Text({ name: "Item 4 closes label", defaultValue: "Closes Mon 1 Sep", group: "Item 4" }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
