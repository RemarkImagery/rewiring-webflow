import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevBenefits from "./WlevBenefits";

export default declareComponent(WlevBenefits, {
  name: "WLEV Benefits",
  description: "6-card grid — quieter, emissions, regen, safety, V2L, batteries",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "More Reasons Kiwis Love EVs", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "It\u2019s not just about the money \u2014 EVs are better in almost every way.", group: "Content" }),
    card1Title: props.Text({ name: "Card 1 Title", defaultValue: "Quieter & Smoother", group: "Card 1" }),
    card1Desc: props.RichText({ name: "Card 1 Description", defaultValue: "Much less noise and vibration. Smooth, instant acceleration with no gear changes. No exhaust fumes improving air quality in our neighbourhoods.", group: "Card 1" }),
    card2Title: props.Text({ name: "Card 2 Title", defaultValue: "60% Fewer Emissions", group: "Card 2" }),
    card2Desc: props.RichText({ name: "Card 2 Description", defaultValue: "Nearly 90% of NZ\u2019s electricity is renewable. An EV here emits up to 90% less CO\u2082 per km. Even factoring in manufacturing, 60% fewer lifetime emissions.", group: "Card 2" }),
    card3Title: props.Text({ name: "Card 3 Title", defaultValue: "\u2018Free Fuel\u2019", group: "Card 3" }),
    card3Desc: props.RichText({ name: "Card 3 Description", defaultValue: "Regenerative braking recovers energy while stopping or going downhill. One-pedal driving means your brakes barely wear out.", group: "Card 3" }),
    card4Title: props.Text({ name: "Card 4 Title", defaultValue: "20x Safer", group: "Card 4" }),
    card4Desc: props.RichText({ name: "Card 4 Description", defaultValue: "Petrol cars are around 20 times more likely to catch fire. No flammable fuel tank means a fundamentally safer vehicle.", group: "Card 4" }),
    card5Title: props.Text({ name: "Card 5 Title", defaultValue: "Power On The Go", group: "Card 5" }),
    card5Desc: props.RichText({ name: "Card 5 Description", defaultValue: "Vehicle-to-Load lets you power kettles, fridges, power tools \u2014 great for camping and trade work. V2G can even back up your home for days.", group: "Card 5" }),
    card6Title: props.Text({ name: "Card 6 Title", defaultValue: "Batteries Built to Last", group: "Card 6" }),
    card6Desc: props.RichText({ name: "Card 6 Description", defaultValue: "15\u201320 year lifespan, 80% capacity after a decade. Warranties of 8 years / 160,000km. And 95% of battery materials can be recovered and reused.", group: "Card 6" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#FFFCF0", group: "Style" }),
  },
  options: { ssr: true },
});
