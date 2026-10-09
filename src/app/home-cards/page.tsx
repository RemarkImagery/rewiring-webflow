import PfwCtaCard from "../../components/HomePage/PfwCtaCard";
import EsbCtaCard from "../../components/HomePage/EsbCtaCard";

// Harness for the homepage campaign cards. Not scanned by webflow.json.
export default function HomeCardsTest() {
  return (
    <main style={{ background: "#f3efe4", padding: "40px 0" }}>
      <PfwCtaCard />
      <EsbCtaCard />
    </main>
  );
}
