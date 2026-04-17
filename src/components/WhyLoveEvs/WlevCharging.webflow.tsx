import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCharging from "./WlevCharging";

export default declareComponent(WlevCharging, {
  name: "WLEV Charging",
  description: "Tabbed charging guide — At Home, On the Road, Charger Types table",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Charging is Simple, Smart, and Affordable", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Another reason we love EVs: charging fits seamlessly into everyday life.", group: "Content" }),
    tab1Title: props.Text({ name: "Home Title", defaultValue: "Plug in like a phone. Wake up to a full battery.", group: "Tab 1: Home" }),
    tab1Body: props.RichText({ name: "Home Body", defaultValue: "Most EV owners charge at home \u2014 no detours to the petrol station, no queues. Just plug in when you get home and your car charges while you sleep.", group: "Tab 1: Home" }),
    tab1Image: props.Image({ name: "Home Image", group: "Tab 1: Home" }),
    tab1H1: props.Text({ name: "Home Point 1", defaultValue: "Standard wall outlet works for short daily driving", group: "Tab 1: Home" }),
    tab1H2: props.Text({ name: "Home Point 2", defaultValue: "Dedicated home charger is faster and runs during off-peak hours", group: "Tab 1: Home" }),
    tab1H3: props.Text({ name: "Home Point 3", defaultValue: "Overnight charging easily covers the average driver\u2019s daily needs", group: "Tab 1: Home" }),
    tab1H4: props.Text({ name: "Home Point 4", defaultValue: "One of the cheapest ways to fuel any vehicle", group: "Tab 1: Home" }),
    tab2Title: props.Text({ name: "Road Title", defaultValue: "Fast chargers every ~75km along major highways.", group: "Tab 2: Road" }),
    tab2Body: props.RichText({ name: "Road Body", defaultValue: "NZ has a growing network of public chargers. Apps like PlugShare and ChargeNet make finding one simple. A 15\u201330 minute stop adds around 100km of range \u2014 perfect for a coffee and a stretch.", group: "Tab 2: Road" }),
    tab2H1: props.Text({ name: "Road Point 1", defaultValue: "Charging every 2\u20133 hours builds in safer driving habits", group: "Tab 2: Road" }),
    tab2H2: props.Text({ name: "Road Point 2", defaultValue: "Reduces fatigue \u2014 a major factor in NZ road crashes", group: "Tab 2: Road" }),
    tab2H3: props.Text({ name: "Road Point 3", defaultValue: "Kids get to burn off energy at each stop", group: "Tab 2: Road" }),
    tab2H4: props.Text({ name: "Road Point 4", defaultValue: "Your EV encourages breaks that keep everyone alert", group: "Tab 2: Road" }),
    tab3Title: props.Text({ name: "Types Title", defaultValue: "From slow home top-ups to ultra-fast highway charging.", group: "Tab 3: Types" }),
    tab3Body: props.RichText({ name: "Types Body", defaultValue: "Different chargers suit different situations. Home chargers are cheapest; public DC chargers are fastest.", group: "Tab 3: Types" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#ffffff", group: "Style" }),
  },
  options: { ssr: false },
});
