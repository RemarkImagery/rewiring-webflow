"use client";

import React, { useId, useState } from "react";

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string") return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface WlevFaqProps {
  heading?: string;
  subtitle?: string;
  q1?: string; a1?: string;
  q2?: string; a2?: string;
  q3?: string; a3?: string;
  q4?: string; a4?: string;
  q5?: string; a5?: string;
  q6?: string; a6?: string;
  q7?: string; a7?: string;
  q8?: string; a8?: string;
  bgColor?: string;
}

export default function WlevFaq(props: WlevFaqProps) {
  const {
    heading = "Frequently Asked Questions",
    subtitle = "Everything you need to know about going electric in New Zealand.",
    q1 = "How far can an EV go on a single charge?",
    a1 = "Most modern EVs offer 300\u2013500km from a full charge. That\u2019s well beyond the average Kiwi\u2019s weekly driving of about 270km. Around 90% of all trips are under 90km.",
    q2 = "How long do EV batteries last?",
    a2 = "Modern EV batteries are designed for 15\u201320 years and still maintain around 80% capacity after a decade. Most new EVs in NZ come with battery warranties of 8 years or 160,000km. For many drivers, the battery will last longer than the time they own the car.",
    q3 = "Can the NZ grid handle everyone charging EVs?",
    a3 = "Yes. Transpower\u2019s analysis shows that even if every light vehicle went electric, electricity demand would rise by only around 20%. With smart charging \u2014 shifting to off-peak hours \u2014 the system becomes even more efficient. V2G technology lets EVs actually support the grid.",
    q4 = "What happens to EV batteries at end of life?",
    a4 = "Modern EV batteries are designed with recycling in mind. Around 95% of the materials \u2014 including lithium, nickel, cobalt, copper, aluminium and graphite \u2014 can be recovered and reused.",
    q5 = "What if I can\u2019t afford to buy an EV outright?",
    a5 = "There are options. Regular car finance often works out cheaper for EVs when you factor in lower fuel costs. Some banks offer green loans at 0\u20131%. And car-share services like Mevo, Zilch, Cityhop and Ryd let you try EVs by the hour or day.",
    q6 = "Can EVs handle NZ\u2019s hilly terrain?",
    a6 = "Absolutely. EVs deliver instant torque for excellent hill-climbing. With 85\u201390% motor efficiency (vs 20\u201330% for petrol) and regenerative braking that recovers energy on descents, they\u2019re perfectly suited for NZ\u2019s landscape.",
    q7 = "Is home charging expensive to set up?",
    a7 = "Most households can start charging with a standard wall outlet at no extra cost. A dedicated home charger adds faster charging and off-peak scheduling. Home charging is one of the cheapest ways to fuel any vehicle.",
    q8 = "Are EVs safe?",
    a8 = "Very. Petrol and diesel cars are around 20 times more likely to catch fire because they contain a tank of flammable liquid. EVs have no exhaust fumes, improving air quality in our cities and neighbourhoods.",
    bgColor = "#2d5c5a",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const items = [
    { q: q1, a: a1 }, { q: q2, a: a2 }, { q: q3, a: a3 }, { q: q4, a: a4 },
    { q: q5, a: a5 }, { q: q6, a: a6 }, { q: q7, a: a7 }, { q: q8, a: a8 },
  ].filter((item) => item.q);

  return (
    <div className={`wlev-faq-root-${uid}`}>
      <section className={`wlev-faq-section-${uid}`}>
        <div className={`wlev-faq-inner-${uid}`}>
          <h2 className={`wlev-faq-heading-${uid}`}>{heading}</h2>
          <img src="https://uploads-ssl.webflow.com/65e8e4d8dd233b8f20bfea98/66af5103d3076ed98e01a60a_g30.svg" alt="" aria-hidden="true" className={`wlev-faq-squiggle-${uid}`} />
          <p className={`wlev-faq-subtitle-${uid}`}>{subtitle}</p>

          <div className={`wlev-faq-accordion-${uid}`}>
            {items.map((item, i) => {
              const isOpen = openIndices.has(i);
              return (
                <div key={i} className={`wlev-faq-item-${uid}${isOpen ? ` wlev-faq-item-open-${uid}` : ""}`}>
                  <button className={`wlev-faq-header-${uid}`} onClick={() => toggle(i)} aria-expanded={isOpen}>
                    <span className={`wlev-faq-question-${uid}`}>{item.q}</span>
                    <span className={`wlev-faq-icon-${uid}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen ? <line x1="5" y1="12" x2="19" y2="12" /> : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
                      </svg>
                    </span>
                  </button>
                  <div className={`wlev-faq-body-${uid}${isOpen ? ` wlev-faq-body-open-${uid}` : ""}`}>
                    <div className={`wlev-faq-body-inner-${uid}`}>
                      {renderRichText(item.a, `wlev-faq-answer-${uid}`)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');
        .wlev-faq-root-${uid} { width: 100%; }
        .wlev-faq-section-${uid} { width: 100%; display: flex; justify-content: center; padding: 80px 24px; box-sizing: border-box; background: #2d5c5a !important; }
        .wlev-faq-inner-${uid} { max-width: 800px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .wlev-faq-heading-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #ffffff; margin: 0; line-height: 1.2; text-align: center; }
        .wlev-faq-subtitle-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #d1e0df; line-height: 1.6; margin: 0 0 20px; text-align: center; max-width: 600px; }
        .wlev-faq-accordion-${uid} { width: 100%; display: flex; flex-direction: column; gap: 14px; }
        .wlev-faq-item-${uid} { background: #FFFCF0; border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; overflow: hidden; box-shadow: 0 2px 8px rgba(26, 60, 60, 0.05); transition: box-shadow 0.3s ease; border: solid 3px #1a3c3c; }
        .wlev-faq-item-open-${uid} { box-shadow: 0 4px 20px rgba(26, 60, 60, 0.1); }
        .wlev-faq-header-${uid} { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 22px 24px; background: none; border: none; cursor: pointer; text-align: left; gap: 16px; transition: background 0.2s ease; }
        .wlev-faq-header-${uid}:hover { background: rgba(26, 60, 60, 0.02); }
        .wlev-faq-question-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(1rem, 1.8vw, 1.1rem); font-weight: 600; color: #1a3c3c; line-height: 1.4; }
        .wlev-faq-icon-${uid} { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #f5b731; color: #1a3c3c; transition: transform 0.3s ease; }
        .wlev-faq-body-${uid} { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .wlev-faq-body-open-${uid} { max-height: 400px; }
        .wlev-faq-body-inner-${uid} { padding: 0 24px 22px; }
        .wlev-faq-answer-${uid} { font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.5vw, 1.05rem); font-weight: 400; color: #5a7a78; line-height: 1.7; }
        .wlev-faq-answer-${uid} p { margin: 0 0 8px; }
        .wlev-faq-answer-${uid} p:last-child { margin-bottom: 0; }
        .wlev-faq-squiggle-${uid} { width: clamp(120px, 20vw, 200px); height: auto; margin-top: -8px; }
        @media (max-width: 768px) { .wlev-faq-section-${uid} { padding: 60px 24px; } .wlev-faq-header-${uid} { padding: 18px 20px; } .wlev-faq-body-inner-${uid} { padding: 0 20px 18px; } }
        @media (max-width: 480px) { .wlev-faq-section-${uid} { padding: 40px 16px; } .wlev-faq-header-${uid} { padding: 16px 16px; } .wlev-faq-body-inner-${uid} { padding: 0 16px 16px; } .wlev-faq-icon-${uid} { width: 28px; height: 28px; } }
      `}</style>
    </div>
  );
}
