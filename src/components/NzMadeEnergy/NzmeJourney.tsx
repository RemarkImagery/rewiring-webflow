"use client";

import React, { useId } from "react";

interface NzmeJourneyProps {
  heading?: string;
  subheading?: string;
  date1?: string;
  text1?: string;
  date2?: string;
  text2?: string;
  date3?: string;
  text3?: string;
  date4?: string;
  text4?: string;
  date5?: string;
  text5?: string;
  date6?: string;
  text6?: string;
  bgColor?: string;
  neonColor?: string;
}

export default function NzmeJourney(props: NzmeJourneyProps) {
  const {
    heading = "The road to Wellington",
    subheading = "From Cromwell to the Beehive — the campaign runs in chunks around the launch, the fundraising and the journey.",
    date1 = "27 July",
    text1 = "Design of Mike's Laser Kiwi suit and the campaign collateral (including merch) begins.",
    date2 = "3 August",
    text2 = "Campaign launches. Fundraising begins — donate money, donate something of value, help make the electric boat go faster.",
    date3 = "1 September",
    text3 = "Fundraising finishes. If the stretch targets are hit, ad planning and the Laser Kiwi build kick off.",
    date4 = "Mid September",
    text4 = "Mike's Laser Kiwi Tour begins — 944 km up the South Island, stopping at electric hotspots to meet entrepreneurs and community groups.",
    date5 = "Late September",
    text5 = "Arrival in Wellington with a 'Hiko Hikoi' of electric cars and bikes, delivering the New Zealand-made energy manifesto to the Beehive.",
    date6 = "October",
    text6 = "If tier two or three is reached: billboards and TV ads run nationwide before the election.",
    bgColor = "#143a1e",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const steps = [
    { date: date1, text: text1 },
    { date: date2, text: text2 },
    { date: date3, text: text3 },
    { date: date4, text: text4 },
    { date: date5, text: text5 },
    { date: date6, text: text6 },
  ].filter((s) => s.date && s.text);

  return (
    <section className={`nzmj-wrap-${uid}`}>
      <style>{`
        .nzmj-wrap-${uid} {
          background: ${bgColor};
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzmj-inner-${uid} { max-width: 860px; margin: 0 auto; }
        .nzmj-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: #FFFCF0;
          margin: 0 0 10px; text-align: center;
        }
        .nzmj-sub-${uid} {
          font-size: 1.05rem; color: rgba(255,252,240,0.72); text-align: center;
          max-width: 620px; margin: 0 auto 56px; line-height: 1.6;
        }
        .nzmj-list-${uid} {
          position: relative;
          padding-left: 34px;
        }
        .nzmj-list-${uid}::before {
          content: '';
          position: absolute; left: 9px; top: 8px; bottom: 8px;
          width: 3px;
          background: repeating-linear-gradient(
            to bottom, ${neonColor} 0px, ${neonColor} 8px, transparent 8px, transparent 16px
          );
        }
        .nzmj-step-${uid} {
          position: relative;
          padding-bottom: 36px;
        }
        .nzmj-step-${uid}:last-child { padding-bottom: 0; }
        .nzmj-step-${uid}::before {
          content: '';
          position: absolute; left: -34px; top: 4px;
          width: 15px; height: 15px;
          border-radius: 50% 40% 55% 45%;
          background: ${neonColor};
          border: 3px solid ${bgColor};
          box-shadow: 0 0 0 3px ${neonColor}, 0 0 16px ${neonColor}80;
        }
        .nzmj-date-${uid} {
          display: inline-block;
          font-size: 0.8rem; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #143a1e;
          background: ${neonColor};
          padding: 4px 12px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          margin-bottom: 8px;
        }
        .nzmj-text-${uid} {
          font-size: 1rem; color: rgba(255,252,240,0.88);
          line-height: 1.65; margin: 0; max-width: 640px;
        }
        @media (max-width: 640px) {
          .nzmj-wrap-${uid} { padding: 72px 24px; }
        }
      `}</style>

      <div className={`nzmj-inner-${uid}`}>
        <h2 className={`nzmj-heading-${uid}`}>{heading}</h2>
        <p className={`nzmj-sub-${uid}`}>{subheading}</p>
        <div className={`nzmj-list-${uid}`}>
          {steps.map((s, i) => (
            <div key={i} className={`nzmj-step-${uid}`}>
              <span className={`nzmj-date-${uid}`}>{s.date}</span>
              <p className={`nzmj-text-${uid}`}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
