import NzmeAuctionDonate from "./NzmeAuctionDonate";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeAuctionDonate, {
  name: "NZME Auction Donate",
  description: "Auction-item donation form - pitch, example chips, and offer form. Stores submissions via the nzme-teaser-forms worker.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    eyebrow: props.Text({ name: "Eyebrow", defaultValue: "The Laser Kiwi auctions", group: "Content" }),
    heading: props.Text({ name: "Heading", defaultValue: "Donate an auction item", group: "Content" }),
    intro: props.Text({
      name: "Intro",
      defaultValue:
        "When the campaign launches we'll auction one-of-a-kind items and experiences from legends of the electric movement, with every winning bid going straight into the campaign. Got something worth bidding on? Tell us about it and we'll take care of the rest.",
      group: "Content",
    }),
    examplesCsv: props.Text({
      name: "Example chips (comma-separated)",
      defaultValue:
        "A guitar lesson with a rock legend, A party on an electric hydrofoil boat, A Lightfoot solar scooter, Lunch at the electric cherry orchard, A sledgehammer session in the wrecking room",
      group: "Content",
    }),
    submitUrl: props.Text({
      name: "Submit endpoint URL",
      defaultValue: "https://nzme-teaser-forms.oj-f3d.workers.dev",
      group: "Form",
    }),
    successMessage: props.Text({
      name: "Success message",
      defaultValue:
        "Legend! Your offer is in. The Rewiring team will be in touch to sort the details before launch.",
      group: "Form",
    }),
    darkColor: props.Text({ name: "Dark colour", defaultValue: "#1a3c3c", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
