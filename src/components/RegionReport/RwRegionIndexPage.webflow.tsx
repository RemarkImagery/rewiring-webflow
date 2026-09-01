import RwRegionIndexPage from "./RwRegionIndexPage";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RwRegionIndexPage, {
  name: "RW Region Index Page",
  description:
    "The whole rewiring.nz/regional-reports landing page in one component: dark-green hero (eyebrow, headline, intro, optional image, live search and up to three stat chips), an optional feature link to the national New Zealand report, the searchable directory of every location report grouped into City councils / District councils / Regions, and a closing CTA band. Every piece of text is editable here — leave a field blank to hide that bit. Use 'RW Region Index' instead if you only want the directory columns.",
  group: "Region Reports",
  options: { ssr: true },
  props: {
    /* ---- Hero ---- */
    heroEyebrow: props.Text({ name: "Hero eyebrow", defaultValue: "Regional reports", group: "Hero" }),
    heroTitle: props.Text({
      name: "Hero headline",
      defaultValue: "Electrifying Aotearoa, one place at a time",
      group: "Hero",
    }),
    heroSubtitle: props.Text({
      name: "Hero intro",
      defaultValue:
        "Every city, district and region in New Zealand has its own electrification story. Find yours to see what households, the local economy and emissions stand to gain from going electric.",
      group: "Hero",
    }),
    heroImage: props.Image({ name: "Hero image (blank = centred hero)", group: "Hero" }),
    stat1Value: props.Text({ name: "Stat 1 number", defaultValue: "82", group: "Hero" }),
    stat1Label: props.Text({ name: "Stat 1 label", defaultValue: "locations covered", group: "Hero" }),
    stat2Value: props.Text({ name: "Stat 2 number", defaultValue: "6", group: "Hero" }),
    stat2Label: props.Text({ name: "Stat 2 label", defaultValue: "machines to swap", group: "Hero" }),
    stat3Value: props.Text({ name: "Stat 3 number", defaultValue: "2026", group: "Hero" }),
    stat3Label: props.Text({ name: "Stat 3 label", defaultValue: "electrification model", group: "Hero" }),

    /* ---- Search ---- */
    showSearch: props.Boolean({ name: "Show search box", defaultValue: true, group: "Search" }),
    searchPlaceholder: props.Text({
      name: "Search placeholder",
      defaultValue: "Search for your city, district or region…",
      group: "Search",
    }),
    countTemplate: props.Text({
      name: "Result count ({n} = number shown)",
      defaultValue: "{n} locations",
      group: "Search",
    }),
    noResultsText: props.Text({
      name: "No-results message",
      defaultValue: "No locations match that search. Try a shorter word, or browse the full list below.",
      group: "Search",
    }),

    /* ---- New Zealand feature link ---- */
    nzUrl: props.Link({ name: "New Zealand page URL (blank = hidden)", group: "New Zealand" }),
    nzLabel: props.Text({
      name: "New Zealand link title",
      defaultValue: "See the report for all of New Zealand",
      group: "New Zealand",
    }),
    nzBlurb: props.Text({
      name: "New Zealand link blurb",
      defaultValue: "The national picture — every household, vehicle and machine, added up.",
      group: "New Zealand",
    }),

    /* ---- Directory ---- */
    directoryTitle: props.Text({ name: "Directory heading", defaultValue: "Find your place", group: "Directory" }),
    directoryIntro: props.Text({
      name: "Directory intro",
      defaultValue: "Reports are grouped by council type. Pick a location to see its numbers.",
      group: "Directory",
    }),
    cityHeading: props.Text({ name: "Column 1 heading", defaultValue: "City councils", group: "Directory" }),
    districtHeading: props.Text({ name: "Column 2 heading", defaultValue: "District councils", group: "Directory" }),
    regionHeading: props.Text({ name: "Column 3 heading", defaultValue: "Regions", group: "Directory" }),
    basePath: props.Text({ name: "Base path", defaultValue: "/regional-reports/", group: "Directory" }),

    /* ---- Closing CTA ---- */
    showCta: props.Boolean({ name: "Show closing CTA", defaultValue: true, group: "CTA" }),
    ctaHeading: props.Text({ name: "CTA heading", defaultValue: "Read the full national report", group: "CTA" }),
    ctaBody: props.Text({
      name: "CTA body",
      defaultValue:
        "Dig into the numbers behind these figures in the Electric Homes & Vehicles Report 2026 — Rewiring Aotearoa's full analysis of the opportunity of going electric across New Zealand.",
      group: "CTA",
    }),
    ctaButtonLabel: props.Text({
      name: "CTA button label",
      defaultValue: "Electric Homes & Vehicles Report",
      group: "CTA",
    }),
    ctaUrl: props.Link({ name: "CTA button URL (blank = no button)", group: "CTA" }),

    /* ---- Style ---- */
    inkColor: props.Text({ name: "Text colour", defaultValue: "#1a3c3c", group: "Style" }),
    accentColor: props.Text({ name: "Heading colour", defaultValue: "#234e4c", group: "Style" }),
    goldColor: props.Text({ name: "Gold / CTA colour", defaultValue: "#f5b731", group: "Style" }),
    creamColor: props.Text({ name: "Page background", defaultValue: "#FFFCF0", group: "Style" }),
    heroFromColor: props.Text({ name: "Hero gradient top", defaultValue: "#2c5e5b", group: "Style" }),
    heroToColor: props.Text({ name: "Hero gradient bottom", defaultValue: "#14302f", group: "Style" }),
    onDarkColor: props.Text({ name: "Text on dark", defaultValue: "#d1e0df", group: "Style" }),
  },
});
