import { describe, expect, it } from "vitest";
import { META, DISTRICTS } from "../RegionReport/districtData";
import { HOME_REGIONS } from "./regionalReportsHomeData";
import { RRH_DEFAULTS } from "./RwRegionalReportsHome";

describe("Regional Reports Home Section data", () => {
  it("location list matches districtData (run node scripts/sync-home-regions.js)", () => {
    const expected = META.filter((m) => m.type !== "Country").map((m) => [m.slug, m.location, m.type]);
    expect(HOME_REGIONS).toEqual(expected);
  });

  it("intro copy states the real location count", () => {
    expect(RRH_DEFAULTS.text).toContain(`${HOME_REGIONS.length} cities`);
  });

  it("stat defaults match the New Zealand page figures", () => {
    const nz = (DISTRICTS as any)["new-zealand"].fields;
    expect(RRH_DEFAULTS.stat1Value).toBe(nz.elec_savings_daily);
    expect(RRH_DEFAULTS.stat2Value).toBe(nz.bill_savings);
    expect(RRH_DEFAULTS.stat3Value).toBe(nz.jobs_created);
  });
});
