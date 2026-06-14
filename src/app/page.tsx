import TcccCard from "../components/ThisCarCan/TcccCard";
import TcccDetail from "../components/ThisCarCan/TcccDetail";
import TccFuelRangeChart from "../components/ThisCarCan/TccFuelRangeChart";

const NZ_POST_FLEET_DATA = `Internal Fleet: corporate, mail and operational support vehicles
Car,,101,9,,110,100%
Van,,59,1,,60,100%
Forklifts,70,75,,,145,51%
Motorcycles,145,3,,,148,2%
Tugs,9,,,,9,0%
Paxsters,,262,,,262,100%
Total,,,,,734,69.5%

Contractor Fleet: last mile and heavy freight services
Motorbike,76,,,,76,0%
Car,94,3,,8,105,10%
Ute,157,2,,2,159,1%
Van,1867,92,2,,1961,4.8%
Truck,103,6,,,109,5.5%
Total,,,,,2410,4.7%`;

export default function Home() {
  return (
    <main style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}>
      {/* Fuel Range Chart Preview */}
      <TccFuelRangeChart />

      {/* Card Grid Preview */}
      <section style={{ padding: "48px 24px", background: "#fdf7ea" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1B4A4A", marginBottom: 8 }}>
            This Company Car Can
          </h2>
          <p style={{ fontSize: 16, color: "#5c7a78", marginBottom: 32 }}>
            NZ businesses leading the charge to electric fleets
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}>
            <TcccCard
              name="NZ Post"
              industry="Transport & Logistics"
              tagline="Don't be left behind, get into it!"
              fleetSize="3,144"
              evPercent="69.5%"
              journeyYear="2017"
            />
            <TcccCard
              name="Meridian Energy"
              industry="Energy"
              tagline="We switched our corporate fleet and never looked back."
              fleetSize="245"
              evPercent="85%"
              journeyYear="2019"
            />
            <TcccCard
              name="Countdown"
              industry="Retail"
              tagline="Electric delivery is the future of grocery."
              fleetSize="890"
              evPercent="22%"
              journeyYear="2021"
            />
          </div>
        </div>
      </section>

      {/* Detail Page Preview */}
      <div id="detail-preview" style={{ marginTop: 48, borderTop: "4px solid #f5b731" }}>
        <TcccDetail
          name="NZ Post"
          industry="Transport & Logistics"
          fleetSize="3,144"
          evPercent="69.5%"
          journeyYear="2017"
          quote="It's an inevitable technological transition that is possible for most businesses today, so don't be left behind, get into it!"
          journeyStory={`<p>NZ Post started its decarbonisation journey in <strong>2017</strong>, with the recognition that climate change and the need to decarbonise were becoming high profile issues for business, government and general society.</p><p>It was also noted that our customers need help to achieve their low carbon goals which includes managing emissions from their distribution networks.</p>`}
          fleetData={NZ_POST_FLEET_DATA}
          benefits={`<p><strong>Own internal fleet:</strong></p><ul><li>74% reduction in tCO2e from FY23</li><li>TCO cost savings on forklifts and motorbikes</li><li>Customer value pillar for attracting carbon-reducing customers</li><li>Maintaining brand and reputation as a sustainable business</li></ul><p><strong>Contractor fleet — last mile:</strong></p><ul><li>Customer and consumer visibility of decarbonisation action</li><li>Commitment to 2032 low-emission delivery service</li><li>Positive contractor relationship impact</li></ul>`}
          challenges={`<p><strong>Own internal fleet:</strong></p><ul><li><em>Cost of investment:</em> demonstrated TCO benefits</li><li><em>Resource constraints:</em> ensured active governance oversight</li><li><em>Charging infrastructure:</em> installed EV chargers across sites and at employees' homes</li></ul><p><strong>Contractor fleet — last mile:</strong></p><ul><li><em>Contractor fleet model:</em> robust consultation with contractors</li><li><em>Suitable vehicle technology:</em> provided expert advice, engaged with OEMs</li><li><em>Cost disparity:</em> provided EV incentives</li><li><em>Charging infrastructure:</em> financial support for home chargers</li></ul>`}
          proudOf={`<ul><li>Demonstrating cost savings associated with decarbonisation</li><li>Industry-leading commitment to low-emission delivery by 2032</li><li>Robust consultation with contractor network</li><li>Taking a chunk of linehaul emissions out of our network</li></ul>`}
          lessons={`<ol><li>Develop a view of your full barrier profile, and how this is projected to change over time.</li><li>You will get better results with a supportive/collaborative approach rather than a purely mandate approach.</li><li>Plan to invest a high amount of support in early transitions — early wins are worth their weight in gold.</li><li>Get expert advice from specialists — it can take you a long way in understanding your strategic options.</li></ol>`}
          obstacles={`<p><strong>Own internal fleet:</strong> Capex investment in constrained commercial environment.</p><p><strong>Contractor fleet — last mile:</strong> Insufficient public and commercial charging infrastructure. Vehicle tech still developing for longer distances.</p><p><strong>Heavy freight:</strong> Insufficient commercial charging/refuelling infrastructure. Significant TCO disparity. Vehicle tech still developing.</p>`}
          speedUp={`<ul><li>More collaboration between transport and infrastructure</li><li>More funding to support heavy freight charging/refuelling infrastructure development</li><li>LEV market development guidance for business roadmap planning</li></ul>`}
          backUrl="#"
        />
      </div>
    </main>
  );
}
