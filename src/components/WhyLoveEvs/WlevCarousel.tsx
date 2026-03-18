"use client";

import React, { useId, useEffect, useRef } from "react";

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

interface WlevCarouselProps {
  img1?: any; img2?: any; img3?: any; img4?: any; img5?: any;
  img6?: any; img7?: any; img8?: any; img9?: any; img10?: any;
  speed?: number;
  bgColor?: string;
}

export default function WlevCarousel(props: WlevCarouselProps) {
  const {
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10,
    speed = 30,
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const trackRef = useRef<HTMLDivElement>(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
    .map(resolveImage)
    .filter(Boolean) as string[];

  // Duplicate for seamless loop
  const allImages = images.length > 0 ? [...images, ...images] : [];

  // CSS animation speed based on number of images
  const duration = images.length * speed;

  // Placeholder squares when no images
  const placeholders = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className={`wlev-car-root-${uid}`}>
      <section className={`wlev-car-section-${uid}`} style={{ background: bgColor }}>
        <div className={`wlev-car-track-${uid}`} ref={trackRef}>
          {allImages.length > 0
            ? allImages.map((src, i) => (
                <div key={i} className={`wlev-car-slide-${uid}`}>
                  <img src={src} alt="" className={`wlev-car-img-${uid}`} draggable={false} />
                </div>
              ))
            : placeholders.map((i) => (
                <div key={i} className={`wlev-car-slide-${uid}`}>
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
          padding: 24px 0;
          box-sizing: border-box;
        }

        .wlev-car-track-${uid} {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: wlev-car-scroll-${uid} ${duration}s linear infinite;
        }

        @keyframes wlev-car-scroll-${uid} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .wlev-car-slide-${uid} {
          flex-shrink: 0;
          width: clamp(260px, 28vw, 380px);
          aspect-ratio: 1 / 1;
        }

        .wlev-car-img-${uid} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border: solid 3px #1a3c3c;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        }

        .wlev-car-placeholder-${uid} {
          width: 100%;
          height: 100%;
          background: #e0e8e7;
          border: solid 3px #1a3c3c;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        }

        .wlev-car-track-${uid}:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .wlev-car-slide-${uid} {
            width: clamp(200px, 45vw, 300px);
          }
          .wlev-car-section-${uid} { padding: 16px 0; }
        }

        @media (max-width: 480px) {
          .wlev-car-slide-${uid} {
            width: clamp(180px, 55vw, 260px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wlev-car-track-${uid} { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
