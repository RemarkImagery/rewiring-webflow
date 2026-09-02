import RwCommunityGroups from "./RwCommunityGroups";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwCommunityGroups, {
  name: "RW Community Groups",
  description:
    'Community groups selector bar + card carousel + mini map for a regional report page. Data priority: (1) a Collection List on the page (wrapper class "locations") whose items carry an HTML Embed <div data-rw-group data-name="..." data-lat="..." data-lng="..." data-blurb="..." data-url="..." data-image="..."></div>; (2) the hosted groups JSON (per-location, maintained by Remark — shows groups with zero CMS setup); (3) nothing. The raw list is hidden only when it parsed successfully. Map uses the built-in QEA Mapbox token unless overridden.',
  group: "Region Reports",
  options: { ssr: false },
  props: {
    listSelector: props.Text({ name: "Collection list selector", defaultValue: ".locations", group: "Data" }),
    showDemo: props.Boolean({ name: "Show demo groups when list missing", defaultValue: false, group: "Data" }),
    districtSlug: props.Text({ name: "Location slug (blank = auto from URL)", defaultValue: "", group: "Data" }),
    dataUrl: props.Text({
      name: "Hosted groups JSON URL",
      defaultValue: "https://regional-reports.pages.dev/communities.json",
      group: "Data",
    }),
    // Leave blank to use the built-in default (the same public token the QEA
    // site uses, Oliver's Mapbox account) — see DEFAULT_MAPBOX_TOKEN in the
    // component. Paste a different pk. token here to override.
    mapboxToken: props.Text({ name: "Mapbox token (blank = QEA default)", defaultValue: "", group: "Map" }),
    mapHeight: props.Text({ name: "Map height (px)", defaultValue: "420", group: "Map" }),
    heading: props.Text({ name: "Heading (optional)", defaultValue: "", group: "Content" }),
    landColor: props.Text({ name: "Map land colour", defaultValue: "#2d5c5a", group: "Map" }),
    waterColor: props.Text({ name: "Map water colour", defaultValue: "#1a3c3c", group: "Map" }),
    roadColor: props.Text({ name: "Map road colour", defaultValue: "#4a7a77", group: "Map" }),
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / active colour", defaultValue: "#f5b731", group: "Style" }),
    accentColor: props.Text({ name: "Accent colour", defaultValue: "#234e4c", group: "Style" }),
  },
});
