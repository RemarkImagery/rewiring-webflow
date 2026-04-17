import RwNavSlots from "./RwNavSlots";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwNavSlots, {
  name: "RW Mega Nav (Slots)",
  description:
    "Mega nav shell with 4 configurable dropdown slots. Drop Webflow-native link blocks, CMS lists, or any layout into each Panel slot to build your mega menu with the full Webflow link picker and CMS binding.",
  group: "Navigation",
  options: { ssr: true },
  props: {
    logoUrl: props.Text({ name: "Logo URL", defaultValue: "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg", group: "Brand" }),
    logoAlt: props.Text({ name: "Logo Alt", defaultValue: "Rewiring Aotearoa", group: "Brand" }),
    logoHref: props.Link({ name: "Logo Link", group: "Brand" }),

    label1: props.Text({ name: "Menu 1 Label", defaultValue: "Learn", group: "Menu 1" }),
    panel1: props.Slot({ name: "Menu 1 Panel", group: "Menu 1" }),

    label2: props.Text({ name: "Menu 2 Label", defaultValue: "Take Action", group: "Menu 2" }),
    panel2: props.Slot({ name: "Menu 2 Panel", group: "Menu 2" }),

    label3: props.Text({ name: "Menu 3 Label", defaultValue: "Stories", group: "Menu 3" }),
    panel3: props.Slot({ name: "Menu 3 Panel", group: "Menu 3" }),

    label4: props.Text({ name: "Menu 4 Label", defaultValue: "About", group: "Menu 4" }),
    panel4: props.Slot({ name: "Menu 4 Panel", group: "Menu 4" }),

    shopLabel: props.Text({ name: "Shop Label", defaultValue: "Shop", group: "Shop Link" }),
    shopHref: props.Link({ name: "Shop Link", group: "Shop Link" }),

    donateLabel: props.Text({ name: "Donate Label", defaultValue: "Donate", group: "Donate CTA" }),
    donateHref: props.Link({ name: "Donate Link", group: "Donate CTA" }),

    bgColor: props.Text({ name: "Header Background", defaultValue: "#fdf7ea", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#234e4c", group: "Style" }),
    textColor: props.Text({ name: "Text Color", defaultValue: "#1a3c3c", group: "Style" }),
    panelBg: props.Text({ name: "Dropdown Background", defaultValue: "#ffffff", group: "Style" }),
    goldColor: props.Text({ name: "CTA Color", defaultValue: "#f5b731", group: "Style" }),
  },
});
