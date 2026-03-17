import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevApproval from "./WlevApproval";

export default declareComponent(WlevApproval, {
  name: "WLEV Approval Bar",
  description: "96% approval stat with animated progress bar, scribble decorations",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "EV Owners Love Their Cars", group: "Content" }),
    statNumber: props.Text({ name: "Stat Number", defaultValue: "96%", group: "Content" }),
    statLabel: props.Text({ name: "Stat Label", defaultValue: "of EV owners would buy another one", group: "Content" }),
    quote: props.Text({ name: "Quote", defaultValue: "That\u2019s one hell of an approval rating.", group: "Content" }),
    body: props.RichText({ name: "Body", defaultValue: "There\u2019s a lot of talk about what electric vehicles can\u2019t do and plenty of myths that might stop people from upgrading. But the people who actually own EVs? They\u2019re overwhelmingly sold. There are now almost 100,000 full EVs on New Zealand roads \u2014 and interest keeps growing.", group: "Content" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#1a3c3c", group: "Style" }),
  },
  options: { ssr: false },
});
