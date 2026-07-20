"use client";

import React, { useId } from "react";

interface NeHeroProps {
  heroImage?: any;
  heroImageAlt?: string;
  bgColor?: string;
  fitMode?: "cover" | "contain";
  objectPosition?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function NeHero(props: NeHeroProps) {
  const {
    heroImage = "/neighbourhood-effect-hero.png",
    heroImageAlt = "Neighbourhood Effect — solar-powered houses connected by hand-drawn lines",
    bgColor = "#fdf7ea",
    fitMode = "contain",
    objectPosition = "center",
  } = props;

  const uid = useId().replace(/:/g, "");
  const heroSrc = resolveImage(heroImage);

  return (
    <div className={`ne-hero-root-${uid}`}>
      <header className={`ne-hero-${uid}`} role="banner">
        {heroSrc && (
          <img
            className={`ne-hero-image-${uid}`}
            src={heroSrc}
            alt={heroImageAlt}
            draggable={false}
          />
        )}
      </header>

      <style>{`
        .ne-hero-root-${uid} { width: 100%; }

        .ne-hero-${uid} {
          position: relative;
          width: 100%;
          height: 100svh;
          background: ${bgColor};
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ne-hero-image-${uid} {
          width: 100%;
          height: 100%;
          object-fit: ${fitMode};
          object-position: ${objectPosition};
          display: block;
        }

        @media (max-width: 600px) {
          .ne-hero-${uid} { height: 90svh; }
        }
      `}</style>
    </div>
  );
}
