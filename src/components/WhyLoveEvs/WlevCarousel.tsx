"use client";

import React, { useId, useState, useEffect, useCallback } from "react";

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

// Fixed rotation angles for each slot to give that scattered photo feel
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

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
    .map(resolveImage)
    .filter(Boolean) as string[];

  const count = images.length || 10;
  const [offset, setOffset] = useState(0);

  // Step-scroll: hold then snap to next position
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % images.length);
    }, holdTime);
    return () => clearInterval(interval);
  }, [images.length, holdTime]);

  // Visible window: show ~5 images at a time, wrapping around
  const visibleCount = 6;
  const getVisibleImages = useCallback(() => {
    if (images.length === 0) return [];
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (offset + i) % images.length;
      result.push({ src: images[idx], idx });
    }
    return result;
  }, [offset, images]);

  const visible = getVisibleImages();

  // Placeholder mode
  const placeholders = Array.from({ length: visibleCount }, (_, i) => i);

  return (
    <div className={`wlev-car-root-${uid}`}>
      <section className={`wlev-car-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-car-strip-${uid}`}>
          {visible.length > 0
            ? visible.map((item, i) => (
                <div
                  key={`${offset}-${i}`}
                  className={`wlev-car-slide-${uid}`}
                  style={{
                    transform: `rotate(${rotations[item.idx % 10]}deg) translateY(${yOffsets[item.idx % 10]}px)`,
                    zIndex: visibleCount - Math.abs(i - Math.floor(visibleCount / 2)),
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <img src={item.src} alt="" className={`wlev-car-img-${uid}`} draggable={false} />
                </div>
              ))
            : placeholders.map((i) => (
                <div
                  key={i}
                  className={`wlev-car-slide-${uid}`}
                  style={{
                    transform: `rotate(${rotations[i]}deg) translateY(${yOffsets[i]}px)`,
                    zIndex: visibleCount - Math.abs(i - Math.floor(visibleCount / 2)),
                  }}
                >
                  <div className={`wlev-car-placeholder-${uid}`} />
                </div>
              ))
          }
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

        .wlev-car-strip-${uid} {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          margin: 0 -40px;
          padding: 20px 0;
          position: relative;
        }

        .wlev-car-slide-${uid} {
          flex-shrink: 0;
          width: clamp(220px, 22vw, 320px);
          aspect-ratio: 1 / 1;
          margin: 0 -16px;
          transition: none;
          animation: wlev-car-snapin-${uid} 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
          filter: drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.2));
        }

        @keyframes wlev-car-snapin-${uid} {
          0% {
            opacity: 0;
            scale: 0.85;
          }
          100% {
            opacity: 1;
            scale: 1;
          }
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
          .wlev-car-slide-${uid} { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
