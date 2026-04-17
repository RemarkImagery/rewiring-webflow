import ArcCarousel from "../components/ArcCarousel";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ padding: "40px 0 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700 }}>Rewiring Components</h1>
        <p>Configure card data in the component settings panel.</p>
      </div>
      <ArcCarousel
        card1Image="https://picsum.photos/seed/1/400/300"
        card1Title="Card One"
        card1Desc="First card"
        card2Image="https://picsum.photos/seed/2/400/300"
        card2Title="Card Two"
        card2Desc="Second card"
        card3Image="https://picsum.photos/seed/3/400/300"
        card3Title="Card Three"
        card3Desc="Third card"
        card4Image="https://picsum.photos/seed/4/400/300"
        card4Title="Card Four"
        card4Desc="Fourth card"
        card5Image="https://picsum.photos/seed/5/400/300"
        card5Title="Card Five"
        card5Desc="Fifth card"
        card6Image="https://picsum.photos/seed/6/400/300"
        card6Title="Card Six"
        card6Desc="Sixth card"
        card6BtnText="Learn More"
        card6BtnLink={{ href: "#" }}
      />
    </main>
  );
}
