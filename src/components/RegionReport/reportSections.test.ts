// Unit tests for the shared report engine. Run with `npm test` (vitest, jsdom).
//
// These cover the two things in this library that fail silently on the
// live site: token substitution and in-page navigation across the shadow
// roots Webflow renders into.
import { describe, expect, it, vi } from "vitest";
import { findAnchor, scrollToAnchor, setReportTitle, sub } from "./reportSections";

describe("sub()", () => {
  it("fills every {{token}} from the fields", () => {
    expect(sub("Electrifying {{location}}: {{bill_savings}} a year", { location: "Dunedin", bill_savings: "$7,700" }))
      .toBe("Electrifying Dunedin: $7,700 a year");
  });
});

describe("anchors across shadow roots", () => {
  function island(id: string) {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const section = document.createElement("section");
    section.id = id;
    shadow.appendChild(section);
    return section;
  }

  it("finds an id that lives inside a code island's shadow root", () => {
    document.body.innerHTML = "";
    const bills = island("bills");
    expect(document.getElementById("bills")).toBeNull(); // what native fragment navigation sees
    expect(findAnchor("bills")).toBe(bills);
    expect(findAnchor("nope")).toBeNull();
  });

  it("scrolls to it with the sticky-nav offset", () => {
    document.body.innerHTML = "";
    const target = island("solar");
    target.getBoundingClientRect = () => ({ top: 1000 } as DOMRect);
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { value: scrollTo, writable: true });
    Object.defineProperty(window, "scrollY", { value: 200, writable: true });
    expect(scrollToAnchor("solar")).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 1000 + 200 - 80 }));
    expect(scrollToAnchor("missing")).toBe(false);
  });
});

describe("ensureReportCss()", () => {
  it("injects the report CSS into the component's own shadow root", async () => {
    const { ensureReportCss } = await import("./reportSections");
    document.body.innerHTML = "";
    const host = document.createElement("div");
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadow.appendChild(root);
    ensureReportCss(root);
    ensureReportCss(root); // idempotent per root
    expect(shadow.querySelectorAll("style[data-rw-report-css]").length).toBe(1);
    expect(shadow.querySelector("style")!.textContent).toContain(".rw-region-report");
    expect(document.head.querySelector("style[data-rw-report-css]")).toBeNull();
  });

  it("falls back to document.head on a plain page", async () => {
    const { ensureReportCss } = await import("./reportSections");
    document.head.querySelectorAll("style[data-rw-report-css]").forEach((s) => s.remove());
    const root = document.createElement("div");
    document.body.appendChild(root);
    ensureReportCss(root);
    expect(document.head.querySelectorAll("style[data-rw-report-css]").length).toBe(1);
  });
});

describe("unmatchedLiveSlug()", () => {
  const go = (path: string) => window.history.replaceState({}, "", path);

  it("flags a Collection Page whose slug is not in the bundle", async () => {
    const { unmatchedLiveSlug } = await import("./reportSections");
    go("/regional-reports/hawkes-bay");
    expect(unmatchedLiveSlug()).toBe("hawkes-bay");
  });

  it("is quiet for a bundled slug, the index page, and the Designer canvas", async () => {
    const { unmatchedLiveSlug } = await import("./reportSections");
    go("/regional-reports/dunedin");
    expect(unmatchedLiveSlug()).toBeNull();
    go("/regional-reports");
    expect(unmatchedLiveSlug()).toBeNull();
    go("/some-designer-canvas-path");
    expect(unmatchedLiveSlug()).toBeNull();
  });

  it("a wrong District slug prop is flagged wherever the page is", async () => {
    const { unmatchedLiveSlug } = await import("./reportSections");
    go("/");
    expect(unmatchedLiveSlug("nowhere")).toBe("nowhere");
    expect(unmatchedLiveSlug("dunedin")).toBeNull();
  });
});

describe("installAnchorNav()", () => {
  it("keeps the listener alive until the last island unmounts", async () => {
    const { installAnchorNav, scrollToAnchor } = await import("./reportSections");
    document.body.innerHTML = '<a id="l" href="#bills">Bills</a><section id="bills"></section>';
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { value: scrollTo, writable: true });
    const offA = installAnchorNav();
    const offB = installAnchorNav();
    offA(); // first island unmounts - links must still work for the second
    document.getElementById("l")!.click();
    expect(scrollTo).toHaveBeenCalledTimes(1);
    offB();
    document.getElementById("l")!.click();
    expect(scrollTo).toHaveBeenCalledTimes(1); // torn down once nobody is mounted
    expect(scrollToAnchor("bills")).toBe(true);
  });

  it("adds ONE back-to-top button to the light DOM and removes it with the last island", async () => {
    const { installAnchorNav, BACK_TO_TOP_ID } = await import("./reportSections");
    document.body.innerHTML = "";
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { value: scrollTo, writable: true });
    const offA = installAnchorNav();
    const offB = installAnchorNav();
    expect(document.querySelectorAll("#" + BACK_TO_TOP_ID)).toHaveLength(1);
    (document.getElementById(BACK_TO_TOP_ID) as HTMLButtonElement).click();
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
    offA();
    expect(document.getElementById(BACK_TO_TOP_ID)).not.toBeNull();
    offB();
    expect(document.getElementById(BACK_TO_TOP_ID)).toBeNull();
  });
});

describe("setReportTitle()", () => {
  it("names the tab after the location and restores the old title on cleanup", () => {
    document.title = "Rewiring Aotearoa";
    const restore = setReportTitle("Hawke's Bay");
    expect(document.title).toBe("Electrifying Hawke's Bay");
    restore();
    expect(document.title).toBe("Rewiring Aotearoa");
  });

  it("leaves the title alone when there's no location", () => {
    document.title = "Rewiring Aotearoa";
    setReportTitle("  ")();
    expect(document.title).toBe("Rewiring Aotearoa");
  });
});
