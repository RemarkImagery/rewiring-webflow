import NzmeHero from "../../components/NzMadeEnergy/NzmeHero";
import NzmeAbout from "../../components/NzMadeEnergy/NzmeAbout";
import NzmeTeaserPledge from "../../components/NzMadeEnergy/NzmeTeaserPledge";
import NzmeAuctionDonate from "../../components/NzMadeEnergy/NzmeAuctionDonate";

export const metadata = {
  title: "Operation Laser Kiwi is coming - New Zealand-made Energy",
  description:
    "Something a bit mad is coming. Pledge your support before launch, or donate an item for the Laser Kiwi auctions.",
};

export default function OperationLaserKiwiTeaserPage() {
  return (
    <main style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}>
      <NzmeHero
        backgroundImage="/nzme/nzme-hero-bg-felt.jpeg"
        tagline="Something a bit mad is coming. We're about to send Mike Casey on a mission to the Beehive dressed as a Laser Kiwi to promote the idea of New Zealand-made energy. Get in before the lasers switch on: pledge your support, or donate an item for the auctions."
        ctaText="Make a pledge"
        ctaUrl="#pledge"
        secondaryCtaText="Donate an auction item"
        secondaryCtaUrl="#donate-an-item"
      />
      <NzmeAbout
        eyebrow="Coming soon"
        heading="What's coming"
        intro1="Operation Laser Kiwi is the next campaign from Rewiring Aotearoa: a serious message about New Zealand-made energy, delivered in the least serious way possible. Here's the shape of it."
        intro2=""
        card1Title="The mission"
        card1Text="Mike Casey rides the length of the South Island in a laserified Kiwi suit - 944 km of electric hotspots, entrepreneurs and community groups, arriving at the Beehive with a Hiko Hikoi of EVs and e-bikes."
        card2Title="The stretch goals"
        card2Text="The more we raise, the madder it gets: Wellington billboards, national billboards, prime-time TV ads, plug-in solar for low-income homes, and a massive Laser Kiwi towed to Wellington."
        card3Title="The auctions"
        card3Text="Legends of the electric movement donate one-of-a-kind items and experiences, and we auction them off with every winning bid going straight into the campaign. That's where you come in."
      />
      <NzmeTeaserPledge />
      <NzmeAuctionDonate />
    </main>
  );
}
