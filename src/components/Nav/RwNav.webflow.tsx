import RwNav from "./RwNav";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwNav, {
  name: "RW Mega Nav",
  description:
    "Primary site navigation with 4-column mega dropdowns (Learn, Take Action, Stories, About), Shop link, search, and Donate CTA. Mobile accordion below 1024px.",
  group: "Navigation",
  options: { ssr: true },
  props: {
    logoUrl: props.Text({
      name: "Logo URL",
      defaultValue:
        "https://cdn.prod.website-files.com/66a8c2c60c3a6f71a739d96d/66a8c2c60c3a6f71a739d9a2_rewiring-logo.svg",
      group: "Content",
    }),
    logoAlt: props.Text({
      name: "Logo Alt Text",
      defaultValue: "Rewiring Aotearoa",
      group: "Content",
    }),
    donateHref: props.Text({
      name: "Donate URL",
      defaultValue: "/donate",
      group: "Content",
    }),
    bgColor: props.Text({
      name: "Background Color",
      defaultValue: "#fdf7ea",
      group: "Style",
    }),
    accentColor: props.Text({
      name: "Accent Color",
      defaultValue: "#234e4c",
      group: "Style",
    }),
    textColor: props.Text({
      name: "Text Color",
      defaultValue: "#1a3c3c",
      group: "Style",
    }),
    panelBg: props.Text({
      name: "Dropdown Panel Background",
      defaultValue: "#ffffff",
      group: "Style",
    }),
  },
});
