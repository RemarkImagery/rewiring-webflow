"use client";

import React, { useState, useEffect, useId } from "react";

interface TccHeroProps {
  logoImage?: any;
  bgPatternImage?: any;
  personImage?: any;
  phrase1?: string;
  phrase2?: string;
  phrase3?: string;
  phrase4?: string;
  carImage1?: any;
  carImage2?: any;
  carImage3?: any;
  bgColor?: string;
  bgCenterColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function TccHero(props: TccHeroProps) {
  const {
    logoImage,
    bgPatternImage,
    personImage,
    phrase1 = "Super Fast Charge",
    phrase2 = "Charge On My Drive",
    phrase3 = "Save Me Thousands",
    phrase4 = "Reduce My Emissions",
    carImage1,
    carImage2,
    carImage3,
    bgColor = "#2d5c5a",
    bgCenterColor = "#1e3f3e",
  } = props;

  const uid = useId().replace(/:/g, "");
  const phrases = [phrase1, phrase2, phrase3, phrase4].filter(Boolean);
  const logoSrc = resolveImage(logoImage);
  const bgPatternSrc = resolveImage(bgPatternImage);
  const personSrc = resolveImage(personImage);
  const cars = [carImage1, carImage2, carImage3].map(resolveImage).filter(Boolean) as string[];
  const [personVisible, setPersonVisible] = useState(false);

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseState, setPhraseState] = useState<"in" | "out">("in");

  const [carIdx, setCarIdx] = useState(0);
  const [carVisible, setCarVisible] = useState(true);
  const [carExiting, setCarExiting] = useState(false);

  // Text roll cycle every 3s
  useEffect(() => {
    if (phrases.length <= 1) return;
    const cycle = setInterval(() => {
      setPhraseState("out");
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setPhraseState("in");
      }, 350);
    }, 3000);
    return () => clearInterval(cycle);
  }, [phrases.length]);

  // Car cycle every 4.5s
  useEffect(() => {
    if (cars.length <= 1) return;
    const cycle = setInterval(() => {
      setCarExiting(true);
      setCarVisible(false);

      setTimeout(() => {
        setCarIdx((i) => (i + 1) % cars.length);
        setCarExiting(false);
        requestAnimationFrame(() => {
          setCarVisible(true);
        });
      }, 700);
    }, 4500);
    return () => clearInterval(cycle);
  }, [cars.length]);

  // Person pop-up after initial load
  useEffect(() => {
    if (personSrc) {
      const timer = setTimeout(() => setPersonVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [personSrc]);

  const carClass = [
    `tcc-car-${uid}`,
    carVisible ? `tcc-car-visible-${uid}` : "",
    carExiting ? `tcc-car-exiting-${uid}` : "",
    !carVisible && !carExiting ? `tcc-car-entering-${uid}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`tcc-hero-root-${uid}`}>
      <header className={`tcc-hero-${uid}`} role="banner">
        {bgPatternSrc && (
          <div
            className={`tcc-bg-pattern-${uid}`}
            style={{ backgroundImage: `url(${bgPatternSrc})` }}
            aria-hidden="true"
          />
        )}
        {logoSrc && (
          <img className={`tcc-logo-${uid}`} src={logoSrc} alt="This Car Can" draggable={false} />
        )}

        <div className={`tcc-phrase-wrap-${uid}`}>
          <p
            key={phraseIdx}
            className={`tcc-phrase-${uid} tcc-phrase-${phraseState}-${uid}`}
            aria-live="polite"
          >
            {phrases[phraseIdx % phrases.length]}
          </p>
        </div>

        {cars.length > 0 && (
          <div className={`tcc-car-wrap-${uid}`}>
            <img
              key={carIdx}
              className={carClass}
              src={cars[carIdx % cars.length]}
              alt="Electric vehicle"
              draggable={false}
            />
          </div>
        )}

        {personSrc && (
          <div className={`tcc-person-wrap-${uid}`}>
            <img
              className={`tcc-person-${uid}${personVisible ? ` tcc-person-visible-${uid}` : ""}`}
              src={personSrc}
              alt="EV enthusiast"
              draggable={false}
            />
          </div>
        )}
      </header>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-hero-root-${uid} {
          width: 100%;
        }

        .tcc-hero-${uid} {
          position: relative;
          width: 100%;
          min-height: 90svh;
          background: radial-gradient(ellipse at center, ${bgCenterColor} 0%, ${bgColor} 70%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 20px;
          box-sizing: border-box;
          gap: 0;
        }

        .tcc-bg-pattern-${uid} {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.07;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .tcc-logo-${uid} {
          position: relative;
          z-index: 3;
          width: clamp(252px, 38.5vw, 476px);
          max-height: 255px;
          height: auto;
          object-fit: contain;
          margin-bottom: 12px;
        }

        .tcc-phrase-wrap-${uid} {
          position: relative;
          z-index: 3;
          min-height: 2.4em;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100%;
        }

        .tcc-phrase-${uid} {
          font-family: 'Diary Notes', sans-serif;
          font-size: clamp(3.1rem, 7.2vw, 5.5rem);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0;
          line-height: 1.1;
          text-align: center;
          text-shadow: 2px 3px 8px rgba(0, 0, 0, 0.4);
          will-change: transform, opacity;
        }

        .tcc-phrase-in-${uid} {
          animation: tcc-roll-in-${uid} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tcc-phrase-out-${uid} {
          animation: tcc-roll-out-${uid} 0.3s cubic-bezier(0.7, 0, 1, 0.5) forwards;
        }

        @keyframes tcc-roll-in-${uid} {
          0% { transform: translateY(100%) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes tcc-roll-out-${uid} {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100%) scale(0.95); opacity: 0; }
        }

        .tcc-placeholder-cursor-${uid} {
          display: none;
          margin-left: 4px;
          vertical-align: baseline;
          animation: tcc-blink-${uid} 0.6s step-end infinite;
        }

        @keyframes tcc-blink-${uid} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .tcc-car-wrap-${uid} {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin-top: -150px;
        }

        .tcc-car-${uid} {
          width: min(128%, 1080px);
          height: auto;
          filter: drop-shadow(0 30px 24px rgba(0, 0, 0, 0.5)) blur(0px);
          will-change: transform, opacity, filter;
        }

        .tcc-car-exiting-${uid} {
          transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1),
                      opacity 0.5s ease,
                      filter 0.4s ease;
          transform: translateX(-80px) scale(0.97);
          opacity: 0;
          filter: drop-shadow(0 30px 24px rgba(0, 0, 0, 0.5)) blur(8px);
        }

        .tcc-car-entering-${uid} {
          transform: translateX(80px) scale(0.97);
          opacity: 0;
          filter: drop-shadow(0 30px 24px rgba(0, 0, 0, 0.5)) blur(8px);
          transition: none;
        }

        .tcc-car-visible-${uid} {
          transition: transform 0.7s cubic-bezier(0, 0, 0.2, 1),
                      opacity 0.6s ease,
                      filter 0.5s ease 0.1s;
          transform: translateX(0) scale(1);
          opacity: 1;
          filter: drop-shadow(0 30px 24px rgba(0, 0, 0, 0.5)) blur(0px);
        }

        /* Person image pop-up */
        .tcc-person-wrap-${uid} {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
        }

        .tcc-person-${uid} {
          width: clamp(280px, 40vw, 480px);
          height: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
          transform: translateY(100px) scale(0.9);
          opacity: 0;
          will-change: transform, opacity;
        }

        .tcc-person-visible-${uid} {
          animation: tcc-person-pop-${uid} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes tcc-person-pop-${uid} {
          0% {
            transform: translateY(100px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(-8px) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .tcc-hero-${uid} {
            min-height: 85svh;
            padding: 120px 16px 60px;
          }
          .tcc-phrase-wrap-${uid} {
            min-height: 2.6em;
          }
          .tcc-phrase-${uid} {
            font-size: clamp(2.2rem, 5.5vw, 3.5rem);
          }
          .tcc-logo-${uid} {
            width: clamp(182px, 45.5vw, 294px);
          }
          .tcc-car-${uid} {
            width: min(92%, 520px);
          }
          .tcc-car-wrap-${uid} {
            margin-top: -14px;
          }
          .tcc-person-wrap-${uid} {
            left: 10%;
            transform: translateX(0);
          }
          .tcc-person-${uid} {
            width: clamp(220px, 55vw, 360px);
          }
        }

        @media (max-width: 480px) {
          .tcc-hero-${uid} {
            min-height: 80svh;
            padding: 100px 12px 80px;
          }
          .tcc-phrase-wrap-${uid} {
            min-height: 2.8em;
          }
          .tcc-phrase-${uid} {
            font-size: clamp(1.8rem, 7vw, 2.4rem);
          }
          .tcc-logo-${uid} {
            width: clamp(154px, 52.5vw, 224px);
          }
          .tcc-car-${uid} {
            width: 96%;
          }
          .tcc-car-wrap-${uid} {
            margin-top: -10px;
          }
          .tcc-person-wrap-${uid} {
            left: 5%;
          }
          .tcc-person-${uid} {
            width: clamp(200px, 60vw, 300px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tcc-person-${uid},
          .tcc-person-visible-${uid} {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .tcc-car-${uid},
          .tcc-car-exiting-${uid},
          .tcc-car-entering-${uid},
          .tcc-car-visible-${uid},
          .tcc-phrase-${uid} {
            transition: none !important;
            transform: none !important;
            filter: drop-shadow(0 30px 24px rgba(0, 0, 0, 0.5)) blur(0px) !important;
          }
        }
      `}</style>
    </div>
  );
}
