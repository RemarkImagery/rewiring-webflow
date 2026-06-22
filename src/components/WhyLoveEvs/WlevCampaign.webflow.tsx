import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import WlevCampaign from "./WlevCampaign";

export default declareComponent(WlevCampaign, {
  name: "WLEV Campaign",
  description: "This Car Can campaign section with organic flair, feature pills, and story CTA",
  group: "Why Love EVs",
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "This Car Can \u2026", group: "Content" }),
    subtitle: props.Text({ name: "Subtitle", defaultValue: "Tapping into the enthusiasm of EV owners to convince others to go electric.", group: "Content" }),
    body: props.RichText({ name: "Body", defaultValue: "Whether it\u2019s to save money, reduce anxiety, lower your emissions or beat the bogans at the lights \u2014 there\u2019s an EV for you. It could be an old Nissan Leaf for a few grand that handles the daily duties for less, a new Polestar that can go the length of the North Island on one charge, a fleet of EVs for your workers, or an electric tractor fuelled by the sun.", group: "Content" }),
    closingLine: props.Text({ name: "Closing Line", defaultValue: "Let\u2019s get more New Zealanders driving on electrons.", group: "Content" }),
    ctaHeading: props.Text({ name: "CTA Heading", defaultValue: "Tell Us What Yours Can Do", group: "CTA" }),
    ctaBody: props.RichText({ name: "CTA Body", defaultValue: "We want to hear your EV stories. Send us photos, film videos and create your own little placards for social media.", group: "CTA" }),
    ctaButtonText: props.Text({ name: "CTA Button", defaultValue: "Share Your Story", group: "CTA" }),
    ctaButtonLink: props.Link({ name: "CTA Link", group: "CTA" }),
    bgColor: props.Text({ name: "Background Color", defaultValue: "#FFFCF0", group: "Style" }),
  },
  options: { ssr: true },
});
