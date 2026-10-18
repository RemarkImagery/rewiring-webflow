import RwSiteSearch from "./RwSiteSearch";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwSiteSearch, {
  name: "RW Site Search",
  description:
    "Search box + results covering rewiring.nz AND pages.rewiring.nz, from the nightly Pagefind index (RemarkImagery/rewiring-search). Place on the /search page in place of Webflow's search results; reads ?query= so the nav search lands here.",
  group: "Navigation",
  options: { ssr: false },
  props: {
    heading: props.Text({ name: "Heading", defaultValue: "Search", group: "Content" }),
    placeholder: props.Text({ name: "Placeholder", defaultValue: "Search Rewiring Aotearoa…", group: "Content" }),
    showImages: props.Boolean({ name: "Show thumbnails", defaultValue: true, group: "Content" }),
    indexUrl: props.Text({
      name: "Index URL (pagefind.js)",
      defaultValue: "https://rewiring-search.pages.dev/pagefind/pagefind.js",
      group: "Behaviour",
    }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    mutedColor: props.Text({ name: "Muted text colour", defaultValue: "#5c7a78", group: "Style" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold colour", defaultValue: "#f5b731", group: "Style" }),
    cardColor: props.Text({ name: "Result card colour", defaultValue: "#ffffff", group: "Style" }),
  },
});
