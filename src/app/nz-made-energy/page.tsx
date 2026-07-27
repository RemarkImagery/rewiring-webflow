import NzmeHero from "../../components/NzMadeEnergy/NzmeHero";
import NzmeThermometer from "../../components/NzMadeEnergy/NzmeThermometer";
import NzmeTierGrid from "../../components/NzMadeEnergy/NzmeTierGrid";
import NzmeJourney from "../../components/NzMadeEnergy/NzmeJourney";
import NzmeSupportCta from "../../components/NzMadeEnergy/NzmeSupportCta";
import NzmeDonate from "../../components/NzMadeEnergy/NzmeDonate";

export const metadata = {
  title: "New Zealand Made Energy — Operation Laser Kiwi",
  description:
    "Help send Mike Casey to the Beehive dressed as a Laser Kiwi — and unlock billboards, TV ads and the world's biggest ever Laser Kiwi.",
};

// Demo raised amount so the thermometer + tier 1 "Unlocked" state show off.
const RAISED = "32500";

export default function NzMadeEnergyPage() {
  return (
    <main style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}>
      <NzmeHero backgroundImage="/nzme/nzme-hero-bg-felt.jpeg" />
      <NzmeThermometer raisedAmount={RAISED} />
      <NzmeTierGrid
        raisedAmount={RAISED}
        tier1Image="/nzme/nzme-tier1-kiwi-suit.jpeg"
        tier2Image="/nzme/nzme-tier2-billboard.jpeg"
        tier3Image="/nzme/nzme-tier3-tv.jpeg"
        tier4Image="/nzme/nzme-tier4-giant-kiwi.jpeg"
      />
      <NzmeJourney />
      <NzmeSupportCta />
      <NzmeDonate />
    </main>
  );
}
