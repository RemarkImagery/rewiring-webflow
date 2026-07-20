"use client";

import React, { useId } from "react";

interface TcccDetailProps {
  name?: string;
  logo?: any;
  industry?: string;
  heroImage?: any;
  fleetSize?: string;
  evPercent?: string;
  journeyYear?: string;
  quote?: string;
  journeyStory?: any;
  fleetData?: string;
  benefits?: any;
  challenges?: any;
  proudOf?: any;
  lessons?: any;
  obstacles?: any;
  speedUp?: any;
  backUrl?: string;
  backLabel?: string;
}

interface FleetRow {
  type: string;
  ice: string;
  bev: string;
  phev: string;
  hybrid: string;
  total: string;
  evPercent: string;
}

interface FleetSection {
  title: string;
  rows: FleetRow[];
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function renderRichText(value: any, className?: string): React.ReactNode {
  if (!value) return null;
  if (typeof value === "string") {
    if (!value.trim()) return null;
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return <div className={className}>{value}</div>;
}

function hasContent(value: any): boolean {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function parseFleetData(raw: string): FleetSection[] {
  if (!raw || !raw.trim()) return [];

  let normalized = raw;
  if (!raw.includes("\n") && raw.includes(" | ")) {
    normalized = normalized.replace(/ \|\| /g, "\n\n");
    normalized = normalized.replace(/ \| /g, "\n");
  }

  const sections: FleetSection[] = [];
  let current: FleetSection | null = null;

  for (const line of normalized.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current && current.rows.length > 0) {
        sections.push(current);
        current = null;
      }
      continue;
    }
    const delim = trimmed.includes("|") ? "|" : ",";
    if (!trimmed.includes(delim)) {
      current = { title: trimmed, rows: [] };
      continue;
    }
    if (!current) {
      current = { title: "Fleet", rows: [] };
    }
    const parts = trimmed.split(delim).map((s) => s.trim());
    current.rows.push({
      type: parts[0] || "",
      ice: parts[1] || "",
      bev: parts[2] || "",
      phev: parts[3] || "",
      hybrid: parts[4] || "",
      total: parts[5] || "",
      evPercent: parts[6] || "",
    });
  }
  if (current && current.rows.length > 0) sections.push(current);
  return sections;
}

function cell(val: string): string {
  return val && val !== "0" ? val : "—";
}

export default function TcccDetail(props: TcccDetailProps) {
  const {
    name = "Company Name",
    logo,
    industry = "Industry",
    heroImage,
    fleetSize = "100",
    evPercent = "50%",
    journeyYear = "2020",
    quote = "",
    journeyStory,
    fleetData = "",
    benefits,
    challenges,
    proudOf,
    lessons,
    obstacles,
    speedUp,
    backUrl = "/this-car-can",
    backLabel = "Back to all stories",
  } = props;

  const uid = useId().replace(/:/g, "");
  const logoSrc = resolveImage(logo);
  const heroSrc = resolveImage(heroImage);
  const fleetSections = parseFleetData(fleetData);

  const narrativeSections = [
    { key: "journey", heading: "Their EV Journey", sub: "How and why they started", content: journeyStory },
    { key: "benefits", heading: "Benefits & Impact", sub: "What worked well", content: benefits },
    { key: "challenges", heading: "Challenges & Solutions", sub: "How they overcame obstacles", content: challenges },
    { key: "proud", heading: "Proud Moments", sub: "Milestones worth celebrating", content: proudOf },
    { key: "lessons", heading: "Lessons for Others", sub: "Advice for businesses considering the switch", content: lessons },
    { key: "obstacles", heading: "Remaining Barriers", sub: "What still needs solving", content: obstacles },
    { key: "speedup", heading: "What Would Help", sub: "Changes that would accelerate the transition", content: speedUp },
  ];

  let sectionIndex = 0;

  return (
    <>
      <article className={`tccd-${uid}`}>
        <a href={backUrl} className={`tccd-back-${uid}`}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {backLabel}
        </a>

        <div
          className={`tccd-hero-${uid}`}
          style={heroSrc ? { backgroundImage: `linear-gradient(to bottom, rgba(27,74,74,0.15) 0%, rgba(27,74,74,0.7) 100%), url(${heroSrc})` } : {}}
        >
          <div className={`tccd-hero-inner-${uid}`}>
            {logoSrc && <img src={logoSrc} alt="" className={`tccd-hero-logo-${uid}`} />}
            <h1 className={`tccd-hero-name-${uid}`}>{name}</h1>
            <span className={`tccd-hero-industry-${uid}`}>{industry}</span>
          </div>
        </div>

        <div className={`tccd-stats-bar-${uid}`}>
          <div className={`tccd-stat-${uid}`}>
            <span className={`tccd-stat-val-${uid}`}>{fleetSize}</span>
            <span className={`tccd-stat-lbl-${uid}`}>vehicles</span>
          </div>
          <div className={`tccd-stat-divider-${uid}`} />
          <div className={`tccd-stat-${uid}`}>
            <span className={`tccd-stat-val-${uid}`}>{evPercent}</span>
            <span className={`tccd-stat-lbl-${uid}`}>electric</span>
          </div>
          <div className={`tccd-stat-divider-${uid}`} />
          <div className={`tccd-stat-${uid}`}>
            <span className={`tccd-stat-val-${uid}`}>Since {journeyYear}</span>
            <span className={`tccd-stat-lbl-${uid}`}>EV journey</span>
          </div>
        </div>

        {quote && (
          <blockquote className={`tccd-quote-${uid}`}>
            <p>&ldquo;{quote}&rdquo;</p>
          </blockquote>
        )}

        {narrativeSections.map((section) => {
          if (!hasContent(section.content)) return null;
          const idx = sectionIndex++;
          const isAlt = idx % 2 === 1;

          const fleetAfterJourney = section.key === "journey" && fleetSections.length > 0;

          return (
            <React.Fragment key={section.key}>
              <section className={`tccd-section-${uid} ${isAlt ? `tccd-section-alt-${uid}` : ""}`}>
                <div className={`tccd-section-inner-${uid}`}>
                  <h2 className={`tccd-section-h-${uid}`}>{section.heading}</h2>
                  <p className={`tccd-section-sub-${uid}`}>{section.sub}</p>
                  {renderRichText(section.content, `tccd-richtext-${uid}`)}
                </div>
              </section>

              {fleetAfterJourney && (
                <section className={`tccd-section-${uid} ${(sectionIndex++) % 2 === 1 ? `tccd-section-alt-${uid}` : ""}`}>
                  <div className={`tccd-section-inner-${uid}`}>
                    <h2 className={`tccd-section-h-${uid}`}>Fleet Breakdown</h2>
                    <p className={`tccd-section-sub-${uid}`}>Vehicle types and electrification progress</p>
                    {fleetSections.map((fs, fi) => (
                      <div key={fi} className={`tccd-fleet-block-${uid}`}>
                        <h3 className={`tccd-fleet-title-${uid}`}>{fs.title}</h3>
                        <div className={`tccd-table-scroll-${uid}`}>
                          <table className={`tccd-table-${uid}`}>
                            <thead>
                              <tr>
                                <th>Vehicle</th>
                                <th>ICE</th>
                                <th>BEV</th>
                                <th>PHEV</th>
                                <th>Hybrid</th>
                                <th>Total</th>
                                <th>EV %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fs.rows.map((row, ri) => {
                                const isTotal = row.type.toLowerCase().includes("total");
                                return (
                                  <tr key={ri} className={isTotal ? `tccd-total-row-${uid}` : ""}>
                                    <td>{row.type}</td>
                                    <td>{cell(row.ice)}</td>
                                    <td>{cell(row.bev)}</td>
                                    <td>{cell(row.phev)}</td>
                                    <td>{cell(row.hybrid)}</td>
                                    <td className={`tccd-td-total-${uid}`}>{cell(row.total)}</td>
                                    <td className={`tccd-td-pct-${uid}`}>{cell(row.evPercent)}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </React.Fragment>
          );
        })}

        {fleetSections.length > 0 && !hasContent(narrativeSections[0].content) && (
          <section className={`tccd-section-${uid}`}>
            <div className={`tccd-section-inner-${uid}`}>
              <h2 className={`tccd-section-h-${uid}`}>Fleet Breakdown</h2>
              <p className={`tccd-section-sub-${uid}`}>Vehicle types and electrification progress</p>
              {fleetSections.map((fs, fi) => (
                <div key={fi} className={`tccd-fleet-block-${uid}`}>
                  <h3 className={`tccd-fleet-title-${uid}`}>{fs.title}</h3>
                  <div className={`tccd-table-scroll-${uid}`}>
                    <table className={`tccd-table-${uid}`}>
                      <thead>
                        <tr>
                          <th>Vehicle</th><th>ICE</th><th>BEV</th><th>PHEV</th><th>Hybrid</th><th>Total</th><th>EV %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fs.rows.map((row, ri) => {
                          const isTotal = row.type.toLowerCase().includes("total");
                          return (
                            <tr key={ri} className={isTotal ? `tccd-total-row-${uid}` : ""}>
                              <td>{row.type}</td>
                              <td>{cell(row.ice)}</td>
                              <td>{cell(row.bev)}</td>
                              <td>{cell(row.phev)}</td>
                              <td>{cell(row.hybrid)}</td>
                              <td className={`tccd-td-total-${uid}`}>{cell(row.total)}</td>
                              <td className={`tccd-td-pct-${uid}`}>{cell(row.evPercent)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={`tccd-footer-${uid}`}>
          <a href={backUrl} className={`tccd-footer-link-${uid}`}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {backLabel}
          </a>
        </div>
      </article>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tccd-${uid} {
          font-family: 'Rubik', sans-serif;
          color: #1a3c3c;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Back link */
        .tccd-back-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 16px 24px;
          font-size: 14px;
          font-weight: 500;
          color: #1B4A4A;
          text-decoration: none;
          transition: color 0.2s;
        }
        .tccd-back-${uid}:hover { color: #f5b731; }

        /* Hero */
        .tccd-hero-${uid} {
          width: 100%;
          min-height: 340px;
          background-color: #1B4A4A;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 48px 24px;
        }

        .tccd-hero-inner-${uid} {
          text-align: center;
          max-width: 720px;
        }

        .tccd-hero-logo-${uid} {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 12px;
          background: rgba(255,255,255,0.95);
          padding: 8px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .tccd-hero-name-${uid} {
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .tccd-hero-industry-${uid} {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1B4A4A;
          background: rgba(255,255,255,0.9);
          padding: 5px 16px;
          border-radius: 100px;
        }

        /* Stats bar */
        .tccd-stats-bar-${uid} {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: #ffffff;
          border-bottom: 1px solid #e8f0ef;
          padding: 24px 24px;
          flex-wrap: wrap;
        }

        .tccd-stat-${uid} {
          text-align: center;
          padding: 8px 32px;
        }

        .tccd-stat-divider-${uid} {
          width: 1px;
          height: 40px;
          background: #d4e4e2;
        }

        .tccd-stat-val-${uid} {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #1B4A4A;
          line-height: 1.2;
        }

        .tccd-stat-lbl-${uid} {
          display: block;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5c7a78;
          margin-top: 4px;
        }

        /* Quote */
        .tccd-quote-${uid} {
          margin: 0;
          padding: 32px 40px;
          background: #1B4A4A;
          border-left: 6px solid #f5b731;
          text-align: center;
        }

        .tccd-quote-${uid} p {
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.5;
          margin: 0;
          font-style: italic;
          max-width: 720px;
          margin: 0 auto;
        }

        /* Sections */
        .tccd-section-${uid} {
          padding: 48px 24px;
        }

        .tccd-section-alt-${uid} {
          background: #fdf7ea;
        }

        .tccd-section-inner-${uid} {
          max-width: 800px;
          margin: 0 auto;
        }

        .tccd-section-h-${uid} {
          font-size: 24px;
          font-weight: 700;
          color: #1B4A4A;
          margin: 0 0 4px;
          padding-left: 16px;
          border-left: 4px solid #f5b731;
          line-height: 1.3;
        }

        .tccd-section-sub-${uid} {
          font-size: 14px;
          color: #5c7a78;
          margin: 0 0 24px;
          padding-left: 20px;
        }

        /* RichText styling */
        .tccd-richtext-${uid} {
          font-size: 16px;
          line-height: 1.7;
          color: #1a3c3c;
        }

        .tccd-richtext-${uid} p { margin: 0 0 16px; }
        .tccd-richtext-${uid} p:last-child { margin-bottom: 0; }

        .tccd-richtext-${uid} ul,
        .tccd-richtext-${uid} ol {
          margin: 0 0 16px;
          padding-left: 24px;
        }

        .tccd-richtext-${uid} li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .tccd-richtext-${uid} strong {
          font-weight: 600;
          color: #1B4A4A;
        }

        .tccd-richtext-${uid} h3,
        .tccd-richtext-${uid} h4 {
          font-weight: 600;
          color: #1B4A4A;
          margin: 24px 0 12px;
        }

        .tccd-richtext-${uid} h3 { font-size: 18px; }
        .tccd-richtext-${uid} h4 { font-size: 16px; }

        /* Fleet tables */
        .tccd-fleet-block-${uid} {
          margin-bottom: 32px;
        }

        .tccd-fleet-block-${uid}:last-child {
          margin-bottom: 0;
        }

        .tccd-fleet-title-${uid} {
          font-size: 16px;
          font-weight: 600;
          color: #1B4A4A;
          margin: 0 0 12px;
          padding: 8px 14px;
          background: #e8f0ef;
          border-radius: 8px 8px 0 0;
        }

        .tccd-table-scroll-${uid} {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 0 0 8px 8px;
          border: 1px solid #d4e4e2;
          border-top: none;
        }

        .tccd-table-${uid} {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          min-width: 500px;
        }

        .tccd-table-${uid} thead th {
          background: #1B4A4A;
          color: #ffffff;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 10px 14px;
          text-align: right;
          white-space: nowrap;
        }

        .tccd-table-${uid} thead th:first-child {
          text-align: left;
        }

        .tccd-table-${uid} tbody td {
          padding: 10px 14px;
          text-align: right;
          border-bottom: 1px solid #e8f0ef;
          color: #3a5f5e;
        }

        .tccd-table-${uid} tbody td:first-child {
          text-align: left;
          font-weight: 500;
          color: #1a3c3c;
        }

        .tccd-table-${uid} tbody tr:nth-child(even) {
          background: #f7fafa;
        }

        .tccd-table-${uid} tbody tr:last-child td {
          border-bottom: none;
        }

        .tccd-total-row-${uid} td {
          font-weight: 700 !important;
          color: #1B4A4A !important;
          border-top: 2px solid #1B4A4A !important;
          background: #e8f0ef !important;
        }

        .tccd-td-total-${uid} {
          font-weight: 600;
        }

        .tccd-td-pct-${uid} {
          font-weight: 600;
          color: #1B4A4A !important;
        }

        /* Footer */
        .tccd-footer-${uid} {
          padding: 40px 24px;
          text-align: center;
          border-top: 1px solid #e8f0ef;
        }

        .tccd-footer-link-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          background: #1B4A4A;
          padding: 14px 28px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .tccd-footer-link-${uid}:hover {
          background: #f5b731;
          color: #1B4A4A;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .tccd-hero-${uid} {
            min-height: 260px;
            padding: 32px 20px;
          }
          .tccd-hero-name-${uid} { font-size: 26px; }
          .tccd-hero-logo-${uid} { width: 60px; height: 60px; }
          .tccd-stats-bar-${uid} {
            flex-direction: column;
            gap: 4px;
            padding: 20px 16px;
          }
          .tccd-stat-${uid} { padding: 6px 16px; }
          .tccd-stat-divider-${uid} { display: none; }
          .tccd-stat-val-${uid} { font-size: 22px; }
          .tccd-quote-${uid} { padding: 24px 20px; }
          .tccd-quote-${uid} p { font-size: 17px; }
          .tccd-section-${uid} { padding: 32px 16px; }
          .tccd-section-h-${uid} { font-size: 20px; }
        }
      `}</style>
    </>
  );
}
