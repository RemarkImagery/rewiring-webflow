// Unit tests for the shared report engine. Run with `npm test` (vitest, jsdom).
//
// These cover the three things in this library that fail silently on the
// live site: token substitution, copy overrides from the properties panel,
// and in-page navigation across the shadow roots Webflow renders into.
import { describe, expect, it, vi } from "vitest";
import { EDITABLE_TEXT } from "./reportEditable";
import { applyTextOverrides, findAnchor, scrollToAnchor, sub } from "./reportSections";

describe("sub()", () => {
  it("fills every {{token}} from the fields", () => {
    expect(sub("Electrifying {{location}}: {{bill_savings}} a year", { location: "Dunedin", bill_savings: "$7,700" }))
      .toBe("Electrifying Dunedin: $7,700 a year");
  });
});

describe("applyTextOverrides()", () => {
  const heading = EDITABLE_TEXT.find((e) => e.key === "economicsHeading")!;
  const para = EDITABLE_TEXT.find((e) => e.key === "economicsPara1")!;
  const html = `<h2><span class="squiggle-under">${heading.def}</span></h2><p>${para.def}</p>`;

  it("leaves the template alone when nothing is overridden", () => {
    expect(applyTextOverrides(html, {})).toBe(html);
    expect(applyTextOverrides(html, { economicsHeading: heading.def })).toBe(html);
    expect(applyTextOverrides(html, { economicsHeading: "   " })).toBe(html);
  });

  it("swaps a heading inside its squiggle span", () => {
    expect(applyTextOverrides(html, { economicsHeading: "Money talk" }))
      .toContain('<span class="squiggle-under">Money talk</span>');
  });

  it("keeps a rewritten sentence's tokens so the location's figures still fill in", () => {
    const out = applyTextOverrides(html, { economicsPara1: "Rewritten for {{location}}: {{fossil_spend_annual}} a year." });
    expect(sub(out, { location: "Dunedin", fossil_spend_annual: "$210 million" }))
      .toContain("Rewritten for Dunedin: $210 million a year.");
  });

  it("does not treat $& in the new copy as a replacement pattern", () => {
    expect(applyTextOverrides(html, { economicsHeading: "Cost $& savings" }))
      .toContain('<span class="squiggle-under">Cost $& savings</span>');
  });

  it("ignores keys whose default is not in this chunk", () => {
    const bills = EDITABLE_TEXT.find((e) => e.chunk === "bills")!;
    expect(applyTextOverrides(html, { [bills.key]: "anything" })).toBe(html);
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
