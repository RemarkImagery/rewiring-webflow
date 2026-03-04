import ArcCarousel from "../components/ArcCarousel";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ padding: "40px 0 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700 }}>Rewiring Components</h1>
        <p>Arc Carousel targets a Collection List on the page by CSS selector.</p>
      </div>
      <ArcCarousel targetSelector="#venues-section .w-dyn-items" />
    </main>
  );
}
