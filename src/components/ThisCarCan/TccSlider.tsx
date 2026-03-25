"use client";

import React, { useId, useState, useEffect, useCallback, useRef } from "react";

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function renderRichText(value: any, className?: string) {
  if (!value) return null;
  if (typeof value === "string")
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className={className}>{value}</div>;
}

interface TccSliderProps {
  img1?: any;
  img2?: any;
  img3?: any;
  img4?: any;
  img5?: any;
  caption1?: any;
  caption2?: any;
  caption3?: any;
  caption4?: any;
  caption5?: any;
  autoPlayInterval?: number;
  bgColor?: string;
}

export default function TccSlider(props: TccSliderProps) {
  const {
    img1, img2, img3, img4, img5,
    caption1, caption2, caption3, caption4, caption5,
    autoPlayInterval = 5000,
    bgColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeMs = 1500;

  const slides = [
    { img: resolveImage(img1), caption: caption1 },
    { img: resolveImage(img2), caption: caption2 },
    { img: resolveImage(img3), caption: caption3 },
    { img: resolveImage(img4), caption: caption4 },
    { img: resolveImage(img5), caption: caption5 },
  ].filter((s) => s.img);

  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (isTransitioning || count < 2) return;
      const idx = ((next % count) + count) % count;
      if (idx === current) return;
      setIsTransitioning(true);
      setPrev(current);
      setCurrent(idx);
      setCycle((c) => c + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setPrev(-1);
      }, fadeMs);
    },
    [current, count, isTransitioning]
  );

  // Auto-play
  useEffect(() => {
    if (isPaused || count < 2) return;
    timerRef.current = setTimeout(() => goTo(current + 1), autoPlayInterval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, count, autoPlayInterval, goTo]);

  // Keyboard
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      else if (e.key === "ArrowLeft") goTo(current - 1);
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [current, goTo]);

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    setTouchStart(null);
  };

  const kbDuration = autoPlayInterval + fadeMs;

  if (count === 0) {
    return (
      <div className={`tcc-sl-root-${uid}`}>
        <div className={`tcc-sl-empty-${uid}`}>
          <p>Add images to the slider props</p>
        </div>
        <style>{`
          .tcc-sl-root-${uid} { width: 100%; }
          .tcc-sl-empty-${uid} {
            width: 100%; height: 60vh; display: flex; align-items: center;
            justify-content: center; background: #1a3c3c; color: #5a7a78;
            font-family: Rubik, sans-serif; font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`tcc-sl-root-${uid}`}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Image slider"
      aria-roledescription="carousel"
    >
      <div className={`tcc-sl-viewport-${uid}`} style={{ background: bgColor }}>
        {/* Image slides */}
        {slides.map((slide, i) => {
          const isActive = i === current;
          const isPrevSlide = i === prev;
          const isVisible = isActive || isPrevSlide;
          const zoomIn = i % 2 === 0;

          return (
            <div
              key={i}
              className={`tcc-sl-slide-${uid}`}
              style={{
                zIndex: isActive ? 3 : isPrevSlide ? 2 : 1,
                opacity: isVisible ? 1 : 0,
                transition: `opacity ${fadeMs}ms ease`,
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
              aria-hidden={!isActive}
            >
              <img
                key={isActive ? `active-${cycle}` : `idle-${i}`}
                src={slide.img}
                alt=""
                className={`tcc-sl-img-${uid}${isActive ? (zoomIn ? ` tcc-sl-kb-in-${uid}` : ` tcc-sl-kb-out-${uid}`) : ""}`}
                style={
                  isActive
                    ? { animationDuration: `${kbDuration}ms` }
                    : {}
                }
                draggable={false}
              />

              <div
                className={`tcc-sl-overlay-${uid}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${fadeMs * 0.6}ms ease ${isActive ? fadeMs * 0.2 : 0}ms`,
                }}
              />

              {slide.caption && (
                <div
                  className={`tcc-sl-caption-${uid}`}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: isActive
                      ? `opacity 0.6s ease ${fadeMs * 0.4}ms, transform 0.8s ease ${fadeMs * 0.4}ms`
                      : `opacity 0.4s ease, transform 0.4s ease`,
                  }}
                >
                  {renderRichText(slide.caption, `tcc-sl-caption-text-${uid}`)}
                </div>
              )}
            </div>
          );
        })}

      </div>

      <style>{`
        .tcc-sl-root-${uid} {
          width: 100%;
          outline: none;
          font-family: Rubik, sans-serif;
        }

        .tcc-sl-viewport-${uid} {
          position: relative;
          width: 100%;
          height: clamp(400px, 70vh, 800px);
          overflow: hidden;
        }

        /* ─── Slide layer ─── */
        .tcc-sl-slide-${uid} {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* ─── Image base ─── */
        .tcc-sl-img-${uid} {
          position: absolute;
          inset: -30px;
          width: calc(100% + 60px);
          height: calc(100% + 60px);
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /* ─── Alternating Ken Burns ─── */
        @keyframes tcc-kb-in-${uid} {
          0%   { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        @keyframes tcc-kb-out-${uid} {
          0%   { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .tcc-sl-kb-in-${uid} {
          animation-name: tcc-kb-in-${uid};
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }

        .tcc-sl-kb-out-${uid} {
          animation-name: tcc-kb-out-${uid};
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }

        /* ─── Dark gradient overlay ─── */
        .tcc-sl-overlay-${uid} {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 40%,
            rgba(26, 60, 60, 0.25) 65%,
            rgba(26, 60, 60, 0.6) 100%
          );
          pointer-events: none;
        }

        /* ─── Caption ─── */
        .tcc-sl-caption-${uid} {
          position: absolute;
          bottom: 48px;
          left: 40px;
          right: 40px;
          max-width: 600px;
          z-index: 6;
        }

        .tcc-sl-caption-text-${uid} {
          color: #ffffff;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 400;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .tcc-sl-caption-text-${uid} h2,
        .tcc-sl-caption-text-${uid} h3 {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          margin: 0 0 8px;
          color: #f5b731;
        }

        .tcc-sl-caption-text-${uid} p { margin: 0; }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
          .tcc-sl-viewport-${uid} {
            height: clamp(300px, 60vh, 550px);
          }
          .tcc-sl-caption-${uid} {
            bottom: 40px;
            left: 24px;
            right: 24px;
          }
        }

        @media (max-width: 480px) {
          .tcc-sl-viewport-${uid} {
            height: clamp(260px, 55vh, 420px);
          }
          .tcc-sl-caption-${uid} {
            bottom: 28px;
            left: 16px;
            right: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tcc-sl-kb-in-${uid},
          .tcc-sl-kb-out-${uid} { animation: none !important; }
          .tcc-sl-slide-${uid} { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
