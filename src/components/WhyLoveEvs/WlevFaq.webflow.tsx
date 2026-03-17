import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevFaq from "./WlevFaq";

export default declareComponent(WlevFaq, {
  name: "WLEV FAQ",
  description: "Accordion FAQ — range, batteries, grid, recycling, cost, terrain, safety",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Frequently Asked Questions", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Everything you need to know about going electric in New Zealand.", group: "Content" }),
    q1: props.Text({ name: "Question 1", defaultValue: "How far can an EV go on a single charge?", group: "FAQ 1" }),
    a1: props.RichText({ name: "Answer 1", defaultValue: "Most modern EVs offer 300\u2013500km from a full charge. That\u2019s well beyond the average Kiwi\u2019s weekly driving of about 270km. Around 90% of all trips are under 90km.", group: "FAQ 1" }),
    q2: props.Text({ name: "Question 2", defaultValue: "How long do EV batteries last?", group: "FAQ 2" }),
    a2: props.RichText({ name: "Answer 2", defaultValue: "Modern EV batteries are designed for 15\u201320 years and still maintain around 80% capacity after a decade. Most new EVs in NZ come with battery warranties of 8 years or 160,000km. For many drivers, the battery will last longer than the time they own the car.", group: "FAQ 2" }),
    q3: props.Text({ name: "Question 3", defaultValue: "Can the NZ grid handle everyone charging EVs?", group: "FAQ 3" }),
    a3: props.RichText({ name: "Answer 3", defaultValue: "Yes. Transpower\u2019s analysis shows that even if every light vehicle went electric, electricity demand would rise by only around 20%. With smart charging \u2014 shifting to off-peak hours \u2014 the system becomes even more efficient. V2G technology lets EVs actually support the grid.", group: "FAQ 3" }),
    q4: props.Text({ name: "Question 4", defaultValue: "What happens to EV batteries at end of life?", group: "FAQ 4" }),
    a4: props.RichText({ name: "Answer 4", defaultValue: "Modern EV batteries are designed with recycling in mind. Around 95% of the materials \u2014 including lithium, nickel, cobalt, copper, aluminium and graphite \u2014 can be recovered and reused.", group: "FAQ 4" }),
    q5: props.Text({ name: "Question 5", defaultValue: "What if I can\u2019t afford to buy an EV outright?", group: "FAQ 5" }),
    a5: props.RichText({ name: "Answer 5", defaultValue: "There are options. Regular car finance often works out cheaper for EVs when you factor in lower fuel costs. Some banks offer green loans at 0\u20131%. And car-share services like Mevo, Zilch, Cityhop and Ryd let you try EVs by the hour or day.", group: "FAQ 5" }),
    q6: props.Text({ name: "Question 6", defaultValue: "Can EVs handle NZ\u2019s hilly terrain?", group: "FAQ 6" }),
    a6: props.RichText({ name: "Answer 6", defaultValue: "Absolutely. EVs deliver instant torque for excellent hill-climbing. With 85\u201390% motor efficiency (vs 20\u201330% for petrol) and regenerative braking that recovers energy on descents, they\u2019re perfectly suited for NZ\u2019s landscape.", group: "FAQ 6" }),
    q7: props.Text({ name: "Question 7", defaultValue: "Is home charging expensive to set up?", group: "FAQ 7" }),
    a7: props.RichText({ name: "Answer 7", defaultValue: "Most households can start charging with a standard wall outlet at no extra cost. A dedicated home charger adds faster charging and off-peak scheduling. Home charging is one of the cheapest ways to fuel any vehicle.", group: "FAQ 7" }),
    q8: props.Text({ name: "Question 8", defaultValue: "Are EVs safe?", group: "FAQ 8" }),
    a8: props.RichText({ name: "Answer 8", defaultValue: "Very. Petrol and diesel cars are around 20 times more likely to catch fire because they contain a tank of flammable liquid. EVs have no exhaust fumes, improving air quality in our cities and neighbourhoods.", group: "FAQ 8" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#ffffff", group: "Style" }),
  },
  options: { ssr: false },
});
