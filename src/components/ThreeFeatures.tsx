"use client";

import React, { useId } from "react";

interface FeatureImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ThreeFeaturesProps {
  bgColor?: string;
  card1BgColor?: string;
  feat1Icon?: FeatureImage; feat1Title?: string; feat1Body?: string;
  feat2Icon?: FeatureImage; feat2Title?: string; feat2Body?: string;
  feat3Icon?: FeatureImage; feat3Title?: string; feat3Body?: string;
}

interface FeatureData {
  icon?: FeatureImage;
  title?: string;
  body?: string;
}

/* Wide rounded-rect path inside a 1320×340 viewBox, with slight hand-drawn wobble */
const BG_PATH = `M 60 28
  C 42 30, 30 42, 28 60
  L 25 275
  C 24 295, 34 310, 55 312
  L 1265 308
  C 1285 307, 1296 294, 1297 275
  L 1300 60
  C 1299 40, 1288 29, 1268 28
  L 60 28 Z`;

export default function ThreeFeatures(props: ThreeFeaturesProps) {
  const {
    bgColor = "transparent",
  } = props;

  const uid = useId().replace(/:/g, "");
  const filterId = `tf-scribble-${uid}`;

  const defaultIcons: FeatureImage[] = [
    { src: "/images/rw-icon-communities.png", alt: "Communities", width: 96, height: 96 },
    { src: "/images/rw-icon-government.png", alt: "Government", width: 96, height: 96 },
    { src: "/images/rw-icon-industry.png", alt: "Industry", width: 96, height: 96 },
  ];
  const defaultTitles = ["Communities", "Government", "Industry"];
  const defaultBodies = [
    "Rewiring Aotearoa is building electrification knowledge and capability within our wh\u0101nau, communities and small businesses.\n\nWe support community led action in the electrification transition. Ensuring everyone has opportunity to benefit from saving thousands of dollars every year on bills, while lowering emissions and improving resilience.\n\nThe future of our communities can be bright as we transition from spending millions on fossil fuels every year to spending that money locally and powering our lives entirely from New Zealand made electricity.",
    "The current policies and regulations surrounding our energy system were built for a fossil fuel world.\n\nThere is tremendous potential to implement policy that is a win-win-win for the economy, the environment, and our resilience. We work to make sure decarbonisation decisions and policies keep cost of living and consumers at the forefront.\n\nWe engage directly with all levels of government, members of parliament, industry and regulatory bodies to advocate and enable action to support community electrification.",
    "The only way to practically achieve zero emissions is to understand the millions of fossil fuel machines that power our households and businesses.\n\nRewiring Aotearoa works on world-leading research that delves deeper into decarbonisation decision making to facilitate rapid impact across all sectors.\n\nWe help businesses and industry understand how they can help facilitate the energy transition at scale, and we work together to develop world-leading projects.",
  ];

  const features: FeatureData[] = [];
  for (let i = 1; i <= 3; i++) {
    const icon = ((props as any)[`feat${i}Icon`] as FeatureImage | undefined) || defaultIcons[i - 1];
    const title = ((props as any)[`feat${i}Title`] as string | undefined) || defaultTitles[i - 1];
    const body = ((props as any)[`feat${i}Body`] as string | undefined) || defaultBodies[i - 1];
    features.push({ icon, title, body });
  }

  return (
    <div className={`tf-root tf-root-${uid}`} style={{ background: bgColor }}>
      <div className={`tf-card tf-card-${uid}`}>
        {/* SVG scribble background */}
        <svg
          className="tf-bg-svg"
          viewBox="0 0 1320 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={2} seed={2} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={5} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          {/* White fill */}
          <path d={BG_PATH} fill="white" filter={`url(#${filterId})`} />
          {/* Hand-drawn stroke */}
          <path
            d={BG_PATH}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>

        <div className={`tf-grid tf-grid-${uid}`}>
          {features.map((feat, i) => (
            <div key={i} className="tf-item">
              {feat.icon?.src && (
                <div className="tf-icon">
                  <img
                    src={feat.icon.src}
                    alt={feat.icon.alt || feat.title || ""}
                    width={feat.icon.width}
                    height={feat.icon.height}
                  />
                </div>
              )}
              {feat.title && <h4 className="tf-title">{feat.title}</h4>}
              {feat.body && <div className="tf-body">{feat.body.split("\n\n").map((p, j) => <p key={j}>{p}</p>)}</div>}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tf-root-${uid} {
          padding: 60px 20px;
          font-family: 'Rubik', sans-serif;
          color: #000000;
        }

        .tf-card-${uid} {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        /* SVG background fills the card area */
        .tf-card-${uid} .tf-bg-svg {
          position: absolute;
          inset: -10px -16px;
          width: calc(100% + 32px);
          height: calc(100% + 20px);
          pointer-events: none;
          z-index: 0;
        }

        .tf-grid-${uid} {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .tf-root-${uid} .tf-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tf-root-${uid} .tf-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tf-root-${uid} .tf-icon img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }

        .tf-root-${uid} .tf-title {
          margin: 0 0 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .tf-root-${uid} .tf-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.7;
          max-width: 260px;
          text-align: left;
        }
        .tf-root-${uid} .tf-body p {
          margin: 0 0 12px;
        }
        .tf-root-${uid} .tf-body p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          .tf-root-${uid} {
            padding: 40px 16px;
          }
          .tf-card-${uid} {
            padding: 36px 24px;
          }
          .tf-grid-${uid} {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </div>
  );
}
