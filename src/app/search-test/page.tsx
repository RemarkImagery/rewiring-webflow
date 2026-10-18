import RwSiteSearch from "@/components/Search/RwSiteSearch";

// Dev harness for the site search component (not scanned by webflow.json).
export default function SearchTest() {
  return (
    <main style={{ background: "#fdf7ea", minHeight: "100vh" }}>
      <RwSiteSearch />
    </main>
  );
}
