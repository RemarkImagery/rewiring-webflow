"use client";

import React, { useEffect, useRef, useCallback, useId, useState } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface ArcCarouselProps {
  autoplayDelay?: number;
  rotationDeg?: number;
  dropPx?: number;
  cardWidth?: number;
  cardSpacing?: number;
  card1Image?: string; card1Title?: string; card1Desc?: string; card1BtnText?: string; card1BtnLink?: LinkValue;
  card2Image?: string; card2Title?: string; card2Desc?: string; card2BtnText?: string; card2BtnLink?: LinkValue;
  card3Image?: string; card3Title?: string; card3Desc?: string; card3BtnText?: string; card3BtnLink?: LinkValue;
  card4Image?: string; card4Title?: string; card4Desc?: string; card4BtnText?: string; card4BtnLink?: LinkValue;
  card5Image?: string; card5Title?: string; card5Desc?: string; card5BtnText?: string; card5BtnLink?: LinkValue;
  card6Image?: string; card6Title?: string; card6Desc?: string; card6BtnText?: string; card6BtnLink?: LinkValue;
  card7Image?: string; card7Title?: string; card7Desc?: string; card7BtnText?: string; card7BtnLink?: LinkValue;
  card8Image?: string; card8Title?: string; card8Desc?: string; card8BtnText?: string; card8BtnLink?: LinkValue;
  card9Image?: string; card9Title?: string; card9Desc?: string; card9BtnText?: string; card9BtnLink?: LinkValue;
  card10Image?: string; card10Title?: string; card10Desc?: string; card10BtnText?: string; card10BtnLink?: LinkValue;
}

interface CardData {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkValue;
}

// props.Image() may return a string URL or an object like {src, alt, width, height}
function resolveImage(val: any): { src?: string; alt?: string } {
  if (!val) return {};
  if (typeof val === "string") return { src: val };
  if (typeof val === "object" && val.src) return { src: val.src, alt: val.alt };
  return {};
}

function extractCards(props: ArcCarouselProps): CardData[] {
  const cards: CardData[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = `card${i}` as const;
    const rawImg = props[`${key}Image` as keyof ArcCarouselProps];
    const { src: imageSrc, alt: imageAlt } = resolveImage(rawImg);
    const title = props[`${key}Title` as keyof ArcCarouselProps] as string | undefined;
    const desc = props[`${key}Desc` as keyof ArcCarouselProps] as string | undefined;
    const btnText = props[`${key}BtnText` as keyof ArcCarouselProps] as string | undefined;
    const btnLink = props[`${key}BtnLink` as keyof ArcCarouselProps] as LinkValue | undefined;
    if (imageSrc || title) {
      cards.push({ imageSrc, imageAlt, title, description: desc, buttonText: btnText, buttonLink: btnLink });
    }
  }
  return cards;
}

interface AnimState {
  offset: number;
  target: number | null;
  velocity: number;
  dragging: boolean;
  dragStartX: number;
  dragStartOffset: number;
  dragMoved: boolean;
  lastX: number;
  lastTime: number;
  hovered: boolean;
  animFrame: number;
  autoplayTimer: ReturnType<typeof setInterval> | null;
  mounted: boolean;
}

export default function ArcCarousel(props: ArcCarouselProps) {
  const {
    autoplayDelay = 3500,
    rotationDeg = 12,
    dropPx = 30,
    cardWidth = 280,
    cardSpacing = 10,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const uid = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = extractCards(props);
  const n = cards.length;
  const stride = cardWidth + cardSpacing;

  const anim = useRef<AnimState>({
    offset: 0,
    target: null,
    velocity: 0,
    dragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    dragMoved: false,
    lastX: 0,
    lastTime: 0,
    hovered: false,
    animFrame: 0,
    autoplayTimer: null,
    mounted: true,
  });

  // Shortest circular distance from offset to card index
  const wrap = useCallback(
    (diff: number): number => {
      if (n === 0) return 0;
      return ((diff % n) + n + n / 2) % n - n / 2;
    },
    [n]
  );

  // Apply transforms directly to DOM (no React re-render per frame)
  const updateSlides = useCallback(() => {
    const s = anim.current;

    slidesRef.current.forEach((el, i) => {
      if (!el) return;
      const progress = wrap(i - s.offset);
      const a = Math.abs(progress);

      if (a > 3.5) {
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        return;
      }

      el.style.visibility = "visible";
      el.style.zIndex = String(50 - Math.round(a) * 10);
      el.style.transform = `translateX(${progress * stride}px) rotate(${progress * rotationDeg}deg) translateY(${a * dropPx}px) scale(${Math.max(0.8, 1 - a * 0.1)})`;
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";

      const imgWrap = el.querySelector(".arc-card-img-wrap") as HTMLElement | null;
      if (imgWrap) {
        const blur = Math.max(4, 25 - a * 8);
        const spread = Math.max(0, 4 - a * 2);
        const shadowOp = Math.max(0.05, 0.2 - a * 0.06);
        imgWrap.style.boxShadow = `0 ${Math.max(2, 10 - a * 3)}px ${blur}px ${spread}px rgba(0,0,0,${shadowOp})`;
      }

      const ov = el.querySelector(".arc-card-ov") as HTMLElement | null;
      if (ov) {
        ov.style.opacity = a > 0.3 ? String(Math.min(0.75, a * 0.35)) : "0";
      }
    });

    if (n > 0) {
      const newActive = ((Math.round(s.offset) % n) + n) % n;
      setActiveIndex((prev) => (prev !== newActive ? newActive : prev));
    }
  }, [n, stride, rotationDeg, dropPx, wrap]);

  // Animation loop
  const tick = useCallback(() => {
    const s = anim.current;
    if (!s.mounted) return;

    let atRest = false;

    if (!s.dragging) {
      if (s.target !== null) {
        const diff = s.target - s.offset;
        if (Math.abs(diff) < 0.001) {
          s.offset = s.target;
          s.target = null;
          s.velocity = 0;
          atRest = true;
        } else {
          s.offset += diff * 0.13;
        }
      } else if (Math.abs(s.velocity) > 0.002) {
        s.offset += s.velocity;
        s.velocity *= 0.93;
        if (Math.abs(s.velocity) < 0.04) {
          s.target = Math.round(s.offset);
          s.velocity = 0;
        }
      } else {
        atRest = true;
      }
    }

    updateSlides();

    if (!atRest) {
      s.animFrame = requestAnimationFrame(tick);
    }
  }, [updateSlides]);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(anim.current.animFrame);
    anim.current.animFrame = requestAnimationFrame(tick);
  }, [tick]);

  const goTo = useCallback(
    (target: number) => {
      anim.current.target = target;
      anim.current.velocity = 0;
      startLoop();
    },
    [startLoop]
  );

  // --- Pointer handlers ---
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const s = anim.current;
      s.dragging = true;
      s.dragStartX = e.clientX;
      s.dragStartOffset = s.offset;
      s.dragMoved = false;
      s.lastX = e.clientX;
      s.lastTime = Date.now();
      s.velocity = 0;
      s.target = null;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      startLoop();
    },
    [startLoop]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const s = anim.current;
      if (!s.dragging) return;

      const now = Date.now();
      const dx = e.clientX - s.lastX;
      const dt = Math.max(1, now - s.lastTime);

      if (Math.abs(e.clientX - s.dragStartX) > 5) {
        s.dragMoved = true;
      }

      s.velocity = (-dx / stride) * (16 / dt);
      s.offset = s.dragStartOffset - (e.clientX - s.dragStartX) / stride;
      s.lastX = e.clientX;
      s.lastTime = now;
    },
    [stride]
  );

  const onPointerUp = useCallback(() => {
    const s = anim.current;
    if (!s.dragging) return;
    s.dragging = false;

    const dt = Date.now() - s.lastTime;
    if (dt > 100 || !s.dragMoved) {
      // Pointer was stationary or barely moved — snap
      s.velocity = 0;
      s.target = Math.round(s.offset);
    }
    // Otherwise momentum carries and tick() will snap when velocity decays
    startLoop();
  }, [startLoop]);

  const onSlideClick = useCallback(
    (cardIndex: number) => {
      if (anim.current.dragMoved) return;
      const s = anim.current;
      const progress = wrap(cardIndex - s.offset);
      if (Math.abs(progress) < 0.3) return;
      goTo(s.offset + progress);
    },
    [wrap, goTo]
  );

  // --- Autoplay ---
  useEffect(() => {
    const s = anim.current;
    s.mounted = true;

    updateSlides();
    requestAnimationFrame(() => {
      if (rootRef.current) rootRef.current.style.visibility = "visible";
    });

    if (n > 1) {
      s.autoplayTimer = setInterval(() => {
        if (!s.dragging && s.target === null && !s.hovered) {
          goTo(Math.round(s.offset) + 1);
        }
      }, autoplayDelay);
    }

    return () => {
      s.mounted = false;
      cancelAnimationFrame(s.animFrame);
      if (s.autoplayTimer) clearInterval(s.autoplayTimer);
    };
  }, [n, autoplayDelay, goTo, updateSlides]);

  // --- Render ---
  if (cards.length === 0) {
    return (
      <div className="arc-carousel-root">
        <p style={{ textAlign: "center", opacity: 0.5, padding: "40px 0" }}>
          Add card images and titles in the component settings to see the carousel.
        </p>
      </div>
    );
  }

  const active = cards[activeIndex] || cards[0];
  const containerHeight = cardWidth * 1.25 + dropPx + 20;

  return (
    <div
      ref={rootRef}
      className={`arc-carousel-root arc-root-${uid}`}
      style={{ visibility: "hidden" }}
      aria-roledescription="carousel"
      aria-label="Card carousel"
      onMouseEnter={() => { anim.current.hovered = true; }}
      onMouseLeave={() => { anim.current.hovered = false; }}
    >
      <div className={`arc-viewport arc-viewport-${uid}`}>
        <div
          className={`arc-track arc-track-${uid}`}
          style={{ height: containerHeight }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { slidesRef.current[i] = el; }}
              className={`arc-slide arc-slide-${uid}`}
              style={{ width: cardWidth, marginLeft: -cardWidth / 2 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${cards.length}`}
              onClick={() => onSlideClick(i)}
            >
              <div className="arc-card">
                {card.imageSrc && (
                  <div className="arc-card-img-wrap">
                    <img src={card.imageSrc} alt={card.imageAlt || card.title || ""} />
                    <div className="arc-card-ov" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="arc-nav-wrap">
          <div
            className="arc-nav arc-nav-prev"
            role="button"
            aria-label="Previous slide"
            tabIndex={0}
            onClick={() => goTo(Math.round(anim.current.offset) - 1)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(Math.round(anim.current.offset) - 1); } }}
          />
          <div
            className="arc-nav arc-nav-next"
            role="button"
            aria-label="Next slide"
            tabIndex={0}
            onClick={() => goTo(Math.round(anim.current.offset) + 1)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(Math.round(anim.current.offset) + 1); } }}
          />
        </div>
      </div>

      <div className="arc-text-block" aria-live="polite" aria-atomic="true">
        <div className="arc-text-inner" key={activeIndex}>
          {active.title && <h3 className="arc-text-title">{active.title}</h3>}
          {active.description && <p className="arc-text-desc">{active.description}</p>}
          {active.buttonText && active.buttonLink && (
            <a
              href={active.buttonLink.href || "#"}
              target={active.buttonLink.target}
              className="arc-text-btn"
            >
              {active.buttonText}
            </a>
          )}
        </div>
      </div>

      <style>{`
        /* === Viewport === */
        .arc-viewport-${uid} {
          overflow: visible;
          position: relative;
          padding: 20px 0 30px;
          z-index: 2;
        }

        /* === Track (drag surface) === */
        .arc-track-${uid} {
          position: relative;
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }
        .arc-track-${uid}:active {
          cursor: grabbing;
        }

        /* === Slides === */
        .arc-slide-${uid} {
          position: absolute;
          left: 50%;
          top: 0;
          transform-origin: center top;
          will-change: transform;
        }

        /* === Navigation arrows === */
        .arc-viewport-${uid} .arc-nav-wrap {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1000px;
          height: 100%;
          pointer-events: none;
          padding: 0 16px;
          box-sizing: border-box;
          z-index: 60;
        }
        .arc-viewport-${uid} .arc-nav {
          position: absolute;
          top: 40%;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--colors--primary, #1a1a2e);
          background: var(--colors--white, #fff);
          z-index: 60;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }
        .arc-viewport-${uid} .arc-nav:focus-visible {
          outline: 2px solid var(--colors--primary, #1a1a2e);
          outline-offset: 2px;
        }
        .arc-viewport-${uid} .arc-nav-next { right: 16px; }
        .arc-viewport-${uid} .arc-nav-prev { left: 16px; }
        .arc-viewport-${uid} .arc-nav::after {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-right: 2.5px solid var(--colors--primary, #1a1a2e);
          border-bottom: 2.5px solid var(--colors--primary, #1a1a2e);
        }
        .arc-viewport-${uid} .arc-nav-next::after {
          transform: rotate(-45deg);
          margin-left: -4px;
        }
        .arc-viewport-${uid} .arc-nav-prev::after {
          transform: rotate(135deg);
          margin-right: -4px;
        }

        /* === Card === */
        .arc-slide-${uid} .arc-card {
          user-select: none;
        }
        .arc-slide-${uid} .arc-card-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 4 / 5;
        }
        .arc-slide-${uid} .arc-card-img-wrap img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 12px;
          object-fit: cover;
          pointer-events: none;
          -webkit-user-drag: none;
        }
        .arc-slide-${uid} .arc-card-ov {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: var(--colors--white, rgb(255,255,255));
          border-radius: 12px;
          pointer-events: none;
          opacity: 0;
        }

        /* === Text block === */
        .arc-root-${uid} .arc-text-block {
          text-align: center;
          max-width: 480px;
          margin: -10px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        .arc-root-${uid} .arc-text-inner {
          animation: arc-fade-in-${uid} 400ms ease;
        }
        @keyframes arc-fade-in-${uid} {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .arc-root-${uid} .arc-text-title {
          margin: 0 0 6px;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
        }
        .arc-root-${uid} .arc-text-desc {
          margin: 0 0 14px;
          font-size: 15px;
          opacity: 0.7;
          line-height: 1.5;
        }
        .arc-root-${uid} .arc-text-btn {
          display: inline-block;
          padding: 10px 24px;
          border-radius: 6px;
          background: var(--colors--primary, #1a1a2e);
          color: var(--colors--white, #fff);
          font-size: 14px;
          text-decoration: none;
        }

        /* === Reduced motion === */
        @media (prefers-reduced-motion: reduce) {
          .arc-root-${uid} .arc-text-inner {
            animation: none;
          }
        }

        /* === Mobile === */
        @media (max-width: 767px) {
          .arc-viewport-${uid} .arc-nav {
            width: 36px;
            height: 36px;
            top: 35%;
          }
          .arc-viewport-${uid} .arc-nav-next { right: 8px; }
          .arc-viewport-${uid} .arc-nav-prev { left: 8px; }
          .arc-viewport-${uid} .arc-nav::after {
            width: 9px;
            height: 9px;
          }
          .arc-root-${uid} .arc-text-title {
            font-size: 18px;
          }
          .arc-root-${uid} .arc-text-block {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
