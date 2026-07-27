import NzmeHero from "../../components/NzMadeEnergy/NzmeHero";
import NzmeAbout from "../../components/NzMadeEnergy/NzmeAbout";
import NzmeThermometer from "../../components/NzMadeEnergy/NzmeThermometer";
import NzmeDonate from "../../components/NzMadeEnergy/NzmeDonate";
import NzmeTierGrid from "../../components/NzMadeEnergy/NzmeTierGrid";
import NzmeAuction from "../../components/NzMadeEnergy/NzmeAuction";
import NzmeSupportCta from "../../components/NzMadeEnergy/NzmeSupportCta";

export const metadata = {
  title: "New Zealand Made Energy — Operation Laser Kiwi",
  description:
    "Help send Mike Casey to the Beehive dressed as a Laser Kiwi — and unlock billboards, TV ads and the world's biggest ever Laser Kiwi.",
};

// Live raised total comes from the Raisely campaign via the CF Worker;
// RAISED is only the pre-fetch/fallback value.
const TOTALS_URL = "https://nzme-raisely-total.oj-f3d.workers.dev";
const RAISED = "0";

export default function NzMadeEnergyPage() {
  return (
    <main style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}>
      <NzmeHero backgroundImage="/nzme/nzme-hero-bg-felt.jpeg" />
      <NzmeAbout />
      <NzmeThermometer
        raisedAmount={RAISED}
        liveTotalsUrl={TOTALS_URL}
        kiwiImage="/nzme/nzme-hero-laser-kiwi.png"
      />
      <NzmeDonate campaignPath="new-zealand-made-energy" />
      <NzmeTierGrid
        raisedAmount={RAISED}
        liveTotalsUrl={TOTALS_URL}
        tier1Image="/nzme/nzme-tier1-kiwi-suit.jpeg"
        tier2Image="/nzme/nzme-tier2-billboard.jpeg"
        tier3Image="/nzme/nzme-tier3-tv.jpeg"
        tier4Image="/nzme/nzme-tier4-giant-kiwi.jpeg"
      />
      <NzmeAuction
        item1Image="/nzme/nzme-auction-guitar.jpeg"
        item2Image="/nzme/nzme-auction-boat.jpeg"
        item3Image="/nzme/nzme-auction-dragrace.jpeg"
        item4Image="/nzme/nzme-auction-wrecking.jpeg"
      />
      <NzmeSupportCta />
    </main>
  );
}
