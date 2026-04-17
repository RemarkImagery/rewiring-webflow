import RwNavMega from "./RwNavMega";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

const MENU_DEFAULTS: Record<number, { label: string; cols: { title: string; links: string[] }[] }> = {
  1: {
    label: "Learn",
    cols: [
      { title: "Research", links: ["2025 Policy Manifesto", "Electric Homes", "Electric Farms", "Delivered Cost of Energy", "All Reports"] },
      { title: "Explainers", links: ["Guides", "Videos", "Explainers", "FAQ", ""] },
      { title: "Tools", links: ["Electric Calculator", "Make a Plan", "EDB Scoreboard", "", ""] },
    ],
  },
  2: {
    label: "Take Action",
    cols: [
      { title: "For You", links: ["Go Electric", "Get Advice", "Surveys", "Make a Plan", ""] },
      { title: "For Your Community", links: ["Find a Group", "Start a Group", "Kill Bills Tour", "Resources", ""] },
      { title: "For Business", links: ["This Car Can", "Ratepayers Scheme", "", "", ""] },
    ],
  },
  3: {
    label: "Stories",
    cols: [
      { title: "News", links: ["Latest News", "Submissions", "Electric Avenue", "", ""] },
      { title: "Spotlights", links: ["Success Stories", "Why We Love EVs", "", "", ""] },
      { title: "Gather", links: ["Events", "Merchandise", "", "", ""] },
    ],
  },
  4: {
    label: "About",
    cols: [
      { title: "Who", links: ["About Us", "Partners", "Contact", "", ""] },
      { title: "Impact", links: ["What We've Done", "What We're Doing", "Projects", "", ""] },
      { title: "", links: ["", "", "", "", ""] },
    ],
  },
};

function buildMenuProps() {
  const out: Record<string, ReturnType<typeof props.Text> | ReturnType<typeof props.Link>> = {};
  for (const m of [1, 2, 3, 4] as const) {
    const d = MENU_DEFAULTS[m];
    const group = `Menu ${m}`;
    out[`menu${m}Label`] = props.Text({ name: `Menu ${m} Label`, defaultValue: d.label, group });
    for (const c of [1, 2, 3] as const) {
      const colGroup = `Menu ${m} · Col ${c}`;
      out[`m${m}c${c}Title`] = props.Text({
        name: `Col ${c} Heading`,
        defaultValue: d.cols[c - 1].title,
        group: colGroup,
      });
      for (const l of [1, 2, 3, 4, 5] as const) {
        out[`m${m}c${c}l${l}Label`] = props.Text({
          name: `Link ${l} Label`,
          defaultValue: d.cols[c - 1].links[l - 1] || "",
          group: colGroup,
        });
        out[`m${m}c${c}l${l}Link`] = props.Link({
          name: `Link ${l} URL`,
          group: colGroup,
        });
      }
    }
  }
  return out;
}

export default declareComponent(RwNavMega, {
  name: "RW Mega Nav (Pro)",
  description:
    "Primary nav with 4 structured mega dropdowns. Each dropdown has up to 3 columns × 5 links. Every link uses Webflow's native Link picker (internal page, external URL, email, phone, anchor). Plus logo, Shop, Donate, search, and mobile accordion.",
  group: "Navigation",
  options: { ssr: true },
  props: {
    logo: props.Image({ name: "Logo", group: "Brand" }),
    logoAlt: props.Text({ name: "Logo Alt (fallback)", defaultValue: "Rewiring Aotearoa", group: "Brand" }),
    logoHref: props.Link({ name: "Logo Link", group: "Brand" }),

    ...buildMenuProps(),

    shopLabel: props.Text({ name: "Shop Label", defaultValue: "Shop", group: "Shop Link" }),
    shopHref: props.Link({ name: "Shop URL", group: "Shop Link" }),

    donateLabel: props.Text({ name: "Donate Label", defaultValue: "Donate", group: "Donate CTA" }),
    donateHref: props.Link({ name: "Donate URL", group: "Donate CTA" }),

    bgColor: props.Text({ name: "Header Background", defaultValue: "#fdf7ea", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#234e4c", group: "Style" }),
    textColor: props.Text({ name: "Text Color", defaultValue: "#1a3c3c", group: "Style" }),
    panelBg: props.Text({ name: "Dropdown Background", defaultValue: "#ffffff", group: "Style" }),
    goldColor: props.Text({ name: "CTA Color", defaultValue: "#f5b731", group: "Style" }),
  },
});
