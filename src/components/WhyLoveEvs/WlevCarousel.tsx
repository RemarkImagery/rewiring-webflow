"use client";

import React, { useId, useState, useEffect, useRef } from "react";

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

interface WlevCarouselProps {
  img1?: any; img2?: any; img3?: any; img4?: any; img5?: any;
  img6?: any; img7?: any; img8?: any; img9?: any; img10?: any;
  holdTime?: number;
  bgColor?: string;
}

const rotations = [-4, 3, -2, 5, -3, 4, -5, 2, -4, 3];
const yOffsets = [8, -6, 10, -4, 7, -8, 5, -10, 6, -5];

export default function WlevCarousel(props: WlevCarouselProps) {
  const {
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10,
    holdTime = 3000,
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
    .map(resolveImage)
    .filter(Boolean) as string[];

  // Triple the images for seamless wrapping
  const allImages = images.length > 0
    ? [...images, ...images, ...images]
    : [];

  const count = images.length || 10;
  const placeholders = Array.from({ length: 20 }, (_, i) => i);

  // Step scroll: hold, quick scroll one slide, hold, repeat
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIsScrolling(true);
      setPosition((prev) => {
        const next = prev + 1;
        // Reset seamlessly when we've scrolled through one full set
        if (next >= images.length) {
          // After the transition completes, jump back without animation
          setTimeout(() => {
            setIsScrolling(false);
            setPosition(0);
          }, 400);
          return next;
        }
        setTimeout(() => setIsScrolling(false), 400);
        return next;
      });
    }, holdTime);

    return () => clearInterval(interval);
  }, [images.length, holdTime]);

  // Calculate the slide width for translateX
  // Each slide is ~22vw with -16px overlap margins, approximate with calc
  const slideStep = `calc(clamp(220px, 22vw, 320px) - 16px)`;

  return (
    <div className={`wlev-car-root-${uid}`}>
      <section className={`wlev-car-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-car-viewport-${uid}`}>
          <div
            ref={trackRef}
            className={`wlev-car-track-${uid}`}
            style={{
              transform: `translateX(calc(${position} * (clamp(220px, 22vw, 320px) - 16px) * -1))`,
              transition: isScrolling ? 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
            }}
          >
            {allImages.length > 0
              ? allImages.map((src, i) => (
                  <div
                    key={i}
                    className={`wlev-car-slide-${uid}`}
                    style={{
                      transform: `rotate(${rotations[i % 10]}deg) translateY(${yOffsets[i % 10]}px)`,
                    }}
                  >
                    <img src={src} alt="" className={`wlev-car-img-${uid}`} draggable={false} />
                  </div>
                ))
              : placeholders.map((i) => (
                  <div
                    key={i}
                    className={`wlev-car-slide-${uid}`}
                    style={{
                      transform: `rotate(${rotations[i % 10]}deg) translateY(${yOffsets[i % 10]}px)`,
                    }}
                  >
                    <div className={`wlev-car-placeholder-${uid}`} />
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      <style>{`
        .wlev-car-root-${uid} { width: 100%; overflow: hidden; }

        .wlev-car-section-${uid} {
          width: 100%;
          overflow: hidden;
          padding: 40px 0 60px;
          box-sizing: border-box;
        }

        .wlev-car-viewport-${uid} {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
        }

        .wlev-car-track-${uid} {
          display: flex;
          align-items: center;
          gap: 0;
          will-change: transform;
        }

        .wlev-car-slide-${uid} {
          flex-shrink: 0;
          width: clamp(220px, 22vw, 320px);
          aspect-ratio: 1 / 1;
          margin: 0 -16px;
          filter: drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.2));
        }

        .wlev-car-img-${uid} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border: solid 3px #1a3c3c;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          background: #ffffff;
          padding: 6px;
        }

        .wlev-car-placeholder-${uid} {
          width: 100%;
          height: 100%;
          background: #e0e8e7;
          border: solid 3px #1a3c3c;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        }

        @media (max-width: 768px) {
          .wlev-car-slide-${uid} {
            width: clamp(180px, 32vw, 260px);
            margin: 0 -12px;
          }
          .wlev-car-section-${uid} { padding: 30px 0 50px; }
        }

        @media (max-width: 480px) {
          .wlev-car-slide-${uid} {
            width: clamp(150px, 40vw, 220px);
            margin: 0 -10px;
          }
          .wlev-car-section-${uid} { padding: 24px 0 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-car-track-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
