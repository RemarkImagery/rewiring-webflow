import RwNavMega from "./RwNavMega";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

type LinkDefault = { label: string; desc?: string; featured?: boolean };
type ColDefault = { title: string; subtitle?: string; links: LinkDefault[] };
type MenuDefault = { label: string; cols: ColDefault[] };

const MENU_DEFAULTS: Record<number, MenuDefault> = {
  1: {
    label: "Learn",
    cols: [
      {
        title: "Resources",
        subtitle: "All the essentials",
        links: [
          { label: "Electric Home 101", desc: "How to save on your energy bill & reduce emissions" },
          { label: "FAQs", desc: "Everything from the basics to the nitty gritty" },
          { label: "Explainers", desc: "Deep dives on everything from your house to the energy system" },
          { label: "Videos", desc: "" },
        ],
      },
      {
        title: "Spotlights",
        subtitle: "Real world examples of electrification",
        links: [
          { label: "Success stories", desc: "Homes, businesses, farms, and communities who have electrified" },
          { label: "Bright Sparks", desc: "Our video series on NZers taking the lead" },
          { label: "Why we love EVs", desc: "Cars use the most energy in your home; EVs can help", featured: true },
        ],
      },
      {
        title: "Research",
        subtitle: "Independent reports by our team of experts",
        links: [
          { label: "Electric Homes", desc: "What can your household save?", featured: true },
          { label: "Investing in Tomorrow", desc: "What could our country save?" },
          { label: "Policy Manifesto", desc: "Our top policy recommendations" },
          { label: "Electric Farms", desc: "The opportunity for rural businesses" },
          { label: "Machine Count", desc: "10 million fossil fuel machines" },
          { label: "All Reports", desc: "" },
        ],
      },
    ],
  },
  2: {
    label: "Go Electric",
    cols: [
      {
        title: "Get started",
        subtitle: "Relevant for both homes & businesses",
        links: [
          { label: "Appliances guide", desc: "Heat your rooms, hot water, and cooking efficiently" },
          { label: "Electric vehicles guide", desc: "All about EVs and charging" },
          { label: "Solar & batteries guide", desc: "Lower bills & better resilience starts here" },
          { label: "Finance options", desc: "Ways to lower the upfront cost, from our friends at QEA", featured: true },
          { label: "FAQs", desc: "From the basics to the nitty gritty" },
          { label: "Get advice", desc: "From folks who have done it before" },
        ],
      },
      {
        title: "For your home",
        subtitle: "",
        links: [
          { label: "Make a plan", desc: "A step-by-step planning template" },
          { label: "Household calculator", desc: "What could your household save?" },
          { label: "Solar Streets map", desc: "Who already has solar in your neighbourhood?" },
        ],
      },
      {
        title: "For business",
        subtitle: "",
        links: [
          { label: "Fleet guide", desc: "How to electrify your fleet, from our friends in Queenstown" },
          { label: "Case studies", desc: "Feasibility studies from Queenstown" },
        ],
      },
    ],
  },
  3: {
    label: "Get Involved",
    cols: [
      {
        title: "Volunteer",
        subtitle: "Join our network of independent local groups that help bring electrification to your community",
        links: [
          { label: "Find a group", desc: "Join one of the 30+ local groups all around the country" },
          { label: "Start a group", desc: "Be the change in your community" },
          { label: "Free resources", desc: "Handouts, flyers, fact sheets, and more" },
        ],
      },
      {
        title: "Campaigns",
        subtitle: "Add your voice to help our country go electric",
        links: [
          { label: "NZ Made Energy", desc: "Way better than imported fossil fuels", featured: true },
          { label: "Ratepayers Assistance Scheme", desc: "Accessible finance for home upgrades" },
          { label: "LNG terminal alternatives", desc: "There are cheaper, better ways to solve dry year" },
          { label: "Up the Kilowahs!", desc: "A scoreboard for local EDBs making electrifying easier" },
        ],
      },
      {
        title: "Merch",
        subtitle: "",
        links: [
          { label: "Shop", desc: "Wear and share the better energy story" },
        ],
      },
    ],
  },
  4: {
    label: "News & Events",
    cols: [
      {
        title: "News",
        subtitle: "",
        links: [
          { label: "Latest news & updates", desc: "Announcements, media interviews, stories, etc." },
          { label: "Electric Avenue", desc: "Our weekly newsletter" },
          { label: "Policy submissions", desc: "Archive from government consultations" },
        ],
      },
      {
        title: "Events",
        subtitle: "",
        links: [
          { label: "Kill Bills tour", desc: "Hear us in person", featured: true },
          { label: "All events", desc: "" },
        ],
      },
      { title: "", links: [] },
    ],
  },
  5: {
    label: "About",
    cols: [
      {
        title: "Who",
        subtitle: "",
        links: [
          { label: "Team & Organisation", desc: "" },
          { label: "Partners", desc: "" },
          { label: "Contact", desc: "" },
        ],
      },
      {
        title: "Impact",
        subtitle: "",
        links: [
          { label: "What we've done", desc: "" },
          { label: "What we're doing", desc: "" },
          { label: "Current Projects", desc: "" },
        ],
      },
      { title: "", links: [] },
    ],
  },
};

function buildMenuProps() {
  const out: Record<
    string,
    | ReturnType<typeof props.Text>
    | ReturnType<typeof props.Link>
    | ReturnType<typeof props.Boolean>
    | ReturnType<typeof props.Image>
  > = {};
  for (const m of [1, 2, 3, 4, 5] as const) {
    const d = MENU_DEFAULTS[m];
    const group = `Menu ${m}`;
    out[`menu${m}Label`] = props.Text({ name: `Menu ${m} Label`, defaultValue: d.label, group });
    out[`menu${m}Thumb`] = props.Image({ name: `Menu ${m} Thumbnail (mobile)`, group });
    for (const c of [1, 2, 3] as const) {
      const col = d.cols[c - 1] || { title: "", subtitle: "", links: [] };
      const colGroup = `Menu ${m} · Col ${c}`;
      out[`m${m}c${c}Title`] = props.Text({
        name: `Col ${c} Heading`,
        defaultValue: col.title,
        group: colGroup,
      });
      out[`m${m}c${c}Subtitle`] = props.Text({
        name: `Col ${c} Subtitle`,
        defaultValue: col.subtitle || "",
        group: colGroup,
      });
      for (const l of [1, 2, 3, 4, 5, 6, 7] as const) {
        const link = col.links[l - 1];
        out[`m${m}c${c}l${l}Label`] = props.Text({
          name: `Link ${l} Label`,
          defaultValue: link?.label || "",
          group: colGroup,
        });
        out[`m${m}c${c}l${l}Desc`] = props.Text({
          name: `Link ${l} Description`,
          defaultValue: link?.desc || "",
          group: colGroup,
        });
        out[`m${m}c${c}l${l}Link`] = props.Link({
          name: `Link ${l} URL`,
          group: colGroup,
        });
        out[`m${m}c${c}l${l}Featured`] = props.Boolean({
          name: `Link ${l} Featured`,
          defaultValue: !!link?.featured,
          trueLabel: "Featured",
          falseLabel: "Standard",
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
    "Primary nav with 5 structured mega dropdowns (Learn, Go Electric, Get Involved, News & Events, About). Each column has a heading + subtitle and up to 7 links with label, description, URL, and a per-link Featured toggle. External URLs automatically show an arrow icon. Includes logo, Donate CTA, search, and mobile accordion.",
  group: "Navigation",
  options: { ssr: true },
  props: {
    logo: props.Image({ name: "Logo", group: "Brand" }),
    logoAlt: props.Text({ name: "Logo Alt (fallback)", defaultValue: "Rewiring Aotearoa", group: "Brand" }),
    logoHref: props.Link({ name: "Logo Link", group: "Brand" }),

    ...buildMenuProps(),

    donateLabel: props.Text({ name: "Donate Label", defaultValue: "Donate", group: "Donate CTA" }),
    donateHref: props.Link({ name: "Donate URL", group: "Donate CTA" }),

    bgColor: props.Text({ name: "Header Background", defaultValue: "#fdf7ea", group: "Style" }),
    accentColor: props.Text({ name: "Accent Color", defaultValue: "#234e4c", group: "Style" }),
    textColor: props.Text({ name: "Text Color", defaultValue: "#1a3c3c", group: "Style" }),
    mutedColor: props.Text({ name: "Muted Text", defaultValue: "#5c7a78", group: "Style" }),
    panelBg: props.Text({ name: "Dropdown Background", defaultValue: "#ffffff", group: "Style" }),
    featuredBg: props.Text({ name: "Featured Card Background", defaultValue: "#f7efd4", group: "Style" }),
    goldColor: props.Text({ name: "CTA Color", defaultValue: "#f5b731", group: "Style" }),
  },
});
