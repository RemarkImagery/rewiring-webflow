import NzmeJourney from "./NzmeJourney";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NzmeJourney, {
  name: "NZME Journey Timeline",
  description: "Campaign timeline from suit design to election ads — dashed neon timeline on dark green.",
  group: "NZ Made Energy",
  options: { ssr: true },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "The road to Wellington", group: "Content" }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "From Cromwell to the Beehive — the campaign runs in chunks around the launch, the fundraising and the journey.",
      group: "Content",
    }),
    date1: props.Text({ name: "Step 1 date", defaultValue: "27 July", group: "Step 1" }),
    text1: props.Text({ name: "Step 1 text", defaultValue: "Design of Mike's Laser Kiwi suit and the campaign collateral (including merch) begins.", group: "Step 1" }),
    date2: props.Text({ name: "Step 2 date", defaultValue: "3 August", group: "Step 2" }),
    text2: props.Text({ name: "Step 2 text", defaultValue: "Campaign launches. Fundraising begins — donate money, donate something of value, help make the electric boat go faster.", group: "Step 2" }),
    date3: props.Text({ name: "Step 3 date", defaultValue: "1 September", group: "Step 3" }),
    text3: props.Text({ name: "Step 3 text", defaultValue: "Fundraising finishes. If the stretch targets are hit, ad planning and the Laser Kiwi build kick off.", group: "Step 3" }),
    date4: props.Text({ name: "Step 4 date", defaultValue: "Mid September", group: "Step 4" }),
    text4: props.Text({ name: "Step 4 text", defaultValue: "Mike's Laser Kiwi Tour begins — 944 km up the South Island, stopping at electric hotspots to meet entrepreneurs and community groups.", group: "Step 4" }),
    date5: props.Text({ name: "Step 5 date", defaultValue: "Late September", group: "Step 5" }),
    text5: props.Text({ name: "Step 5 text", defaultValue: "Arrival in Wellington with a 'Hiko Hikoi' of electric cars and bikes, delivering the New Zealand-made energy manifesto to the Beehive.", group: "Step 5" }),
    date6: props.Text({ name: "Step 6 date", defaultValue: "October", group: "Step 6" }),
    text6: props.Text({ name: "Step 6 text", defaultValue: "If tier two or three is reached: billboards and TV ads run nationwide before the election.", group: "Step 6" }),
    bgColor: props.Text({ name: "Background colour", defaultValue: "#143a1e", group: "Theme" }),
    neonColor: props.Text({ name: "Neon colour", defaultValue: "#4bf03c", group: "Theme" }),
  },
});
