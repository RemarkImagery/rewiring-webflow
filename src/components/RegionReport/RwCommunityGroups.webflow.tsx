import RwCommunityGroups from "./RwCommunityGroups";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwCommunityGroups, {
  name: "RW Community Groups",
  description:
    'Community groups selector bar + card carousel + mini map for a regional report page. Reads a Collection List already on the page (wrapper class "locations", filtered to the current location). Each item needs an HTML Embed: <div data-rw-group data-name="..." data-lat="..." data-lng="..." data-blurb="..." data-url="..." data-image="..."></div> — missing attrs fall back to the item\'s first heading/paragraph/image/link. The raw list is hidden once parsed. The map needs a Mapbox token; without one (or without coordinates) the carousel takes the full width.',
  group: "Region Reports",
  options: { ssr: false },
  props: {
    listSelector: props.Text({ name: "Collection list selector", defaultValue: ".locations", group: "Data" }),
    mapboxToken: props.Text({ name: "Mapbox token", defaultValue: "", group: "Map" }),
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
