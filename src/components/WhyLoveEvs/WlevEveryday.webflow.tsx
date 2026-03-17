import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevEveryday from "./WlevEveryday";

export default declareComponent(WlevEveryday, {
  name: "WLEV Everyday",
  description: "Tabbed section — Range, Commute, Hills, Fun & Fast",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Built for Everyday Life", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "EVs go further than most Kiwis drive in a typical day \u2014 or week.", group: "Content" }),
    tab1Label: props.Text({ name: "Tab 1 Label", defaultValue: "Range", group: "Tab 1: Range" }),
    tab1Stat: props.Text({ name: "Tab 1 Stat", defaultValue: "300\u2013500km", group: "Tab 1: Range" }),
    tab1StatLabel: props.Text({ name: "Tab 1 Stat Label", defaultValue: "range from a full charge", group: "Tab 1: Range" }),
    tab1Body: props.RichText({ name: "Tab 1 Body", defaultValue: "Around 90% of trips are under 90km, and the average trip is just 20km. Most drivers cover about 270km per week. Modern EVs comfortably exceed this \u2014 giving you more than enough for commuting, errands, kids\u2019 activities and trips to the bach.", group: "Tab 1: Range" }),
    tab2Label: props.Text({ name: "Tab 2 Label", defaultValue: "Commute", group: "Tab 2: Commute" }),
    tab2Stat: props.Text({ name: "Tab 2 Stat", defaultValue: "$1,500", group: "Tab 2: Commute" }),
    tab2StatLabel: props.Text({ name: "Tab 2 Stat Label", defaultValue: "for a second-hand Nissan Leaf", group: "Tab 2: Commute" }),
    tab2Body: props.RichText({ name: "Tab 2 Body", defaultValue: "The most affordable EVs handle everyday driving with ease. The original Nissan Leaf \u2014 the OG of NZ\u2019s EV scene \u2014 can be picked up from just $1,500 second-hand. It\u2019s one of the cheapest ways to electrify your commute.", group: "Tab 2: Commute" }),
    tab3Label: props.Text({ name: "Tab 3 Label", defaultValue: "Hills & Roads", group: "Tab 3: Hills" }),
    tab3Stat: props.Text({ name: "Tab 3 Stat", defaultValue: "85\u201390%", group: "Tab 3: Hills" }),
    tab3StatLabel: props.Text({ name: "Tab 3 Stat Label", defaultValue: "motor efficiency", group: "Tab 3: Hills" }),
    tab3Body: props.RichText({ name: "Tab 3 Body", defaultValue: "EVs deliver power instantly \u2014 excellent hill-climbing, smooth acceleration and strong performance on varied terrain. With regenerative braking that recovers energy on descents, they\u2019re perfectly suited for New Zealand\u2019s hilly landscapes. Petrol engines? Just 20\u201330% efficient.", group: "Tab 3: Hills" }),
    tab4Label: props.Text({ name: "Tab 4 Label", defaultValue: "Fun & Fast", group: "Tab 4: Fun" }),
    tab4Stat: props.Text({ name: "Tab 4 Stat", defaultValue: "2.3s", group: "Tab 4: Fun" }),
    tab4StatLabel: props.Text({ name: "Tab 4 Stat Label", defaultValue: "0\u2013100km/h (Porsche Taycan)", group: "Tab 4: Fun" }),
    tab4Body: props.RichText({ name: "Tab 4 Body", defaultValue: "Ask any EV owner \u2014 driving electric is just more fun. F1 cars average 2.6 seconds to 100km/h. The Porsche Taycan does it in 2.3s. The Tesla 3 Performance ($89,990) takes just 3.1 seconds. Instant torque, no matter the size of the car.", group: "Tab 4: Fun" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#ffffff", group: "Style" }),
  },
  options: { ssr: false },
});
