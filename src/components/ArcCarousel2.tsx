"use client";

import React, { useEffect, useRef, useCallback, useId, useState } from "react";
import Slider from "react-slick";

interface LinkValue {
  href: string;
  target?: string;
}

interface ArcCarousel2Props {
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
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkValue;
}

function extractCards(props: ArcCarousel2Props): CardData[] {
  const cards: CardData[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = `card${i}` as const;
    const img = props[`${key}Image` as keyof ArcCarousel2Props] as string | undefined;
    const title = props[`${key}Title` as keyof ArcCarousel2Props] as string | undefined;
    const desc = props[`${key}Desc` as keyof ArcCarousel2Props] as string | undefined;
    const btnText = props[`${key}BtnText` as keyof ArcCarousel2Props] as string | undefined;
    const btnLink = props[`${key}BtnLink` as keyof ArcCarousel2Props] as LinkValue | undefined;
    if (img || title) {
      cards.push({ image: img, title, description: desc, buttonText: btnText, buttonLink: btnLink });
    }
  }
  return cards;
}

export default function ArcCarousel2(props: ArcCarousel2Props) {
  const {
    autoplayDelay = 3500,
    rotationDeg = 12,
    dropPx = 30,
    cardWidth = 280,
    cardSpacing = 10,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRunning = useRef(true);
  const uid = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = extractCards(props);
  const n = cards.length;

  // Continuously measure slide screen positions and apply arc transforms
  const applyArcTransforms = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const list = container.querySelector(".slick-list") as HTMLElement;
    if (!list) return;

    const listRect = list.getBoundingClientRect();
    const centerX = listRect.left + listRect.width / 2;

    const slides = container.querySelectorAll(".slick-slide");
    slides.forEach((slide) => {
      const el = slide as HTMLElement;
      const rect = el.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const progress = (slideCenter - centerX) / (cardWidth + cardSpacing);
      const a = Math.abs(progress);

      const inner = el.querySelector(".arc-slide-inner") as HTMLElement;
      if (!inner) return;

      if (a > 3.5) {
        inner.style.visibility = "hidden";
        inner.style.pointerEvents = "none";
        return;
      }

      inner.style.visibility = "visible";
      inner.style.zIndex = String(50 - Math.round(a) * 10);
      inner.style.transform = `rotate(${progress * -rotationDeg}deg) translateY(${a * dropPx}px) scale(${Math.max(0.8, 1 - a * 0.1)})`;
      inner.style.transformOrigin = "center top";
      inner.style.pointerEvents = "auto";

      const imgWrap = inner.querySelector(".arc-card-img-wrap") as HTMLElement;
      if (imgWrap) {
        const blur = Math.max(4, 25 - a * 8);
        const spread = Math.max(0, 4 - a * 2);
        const shadowOp = Math.max(0.05, 0.2 - a * 0.06);
        imgWrap.style.boxShadow = `0 ${Math.max(2, 10 - a * 3)}px ${blur}px ${spread}px rgba(0,0,0,${shadowOp})`;
      }

      const ov = inner.querySelector(".arc-card-ov") as HTMLElement;
      if (ov) {
        ov.style.opacity = a > 0.3 ? String(Math.min(0.75, a * 0.35)) : "0";
      }
    });
  }, [cardWidth, cardSpacing, rotationDeg, dropPx]);

  // RAF loop — runs continuously to catch drag, animation, and idle states
  useEffect(() => {
    rafRunning.current = true;

    const loop = () => {
      if (!rafRunning.current) return;
      applyArcTransforms();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Reveal after first paint
    requestAnimationFrame(() => {
      if (rootRef.current) rootRef.current.style.visibility = "visible";
    });

    return () => {
      rafRunning.current = false;
    };
  }, [applyArcTransforms]);

  // Slick settings
  const settings = {
    centerMode: true,
    variableWidth: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: autoplayDelay,
    pauseOnHover: true,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    beforeChange: (_old: number, next: number) => {
      if (n > 0) setActiveIndex(((next % n) + n) % n);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "40px",
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  };

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

  return (
    <div
      ref={rootRef}
      className={`arc-carousel-root arc2-root-${uid}`}
      style={{ visibility: "hidden" }}
      aria-roledescription="carousel"
      aria-label="Card carousel"
    >
      <div ref={containerRef} className={`arc2-viewport arc2-viewport-${uid}`}>
        <Slider ref={sliderRef} {...settings}>
          {cards.map((card, i) => (
            <div key={i} style={{ width: cardWidth }} className="arc2-slide-wrap">
              <div
                className="arc-slide-inner"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${cards.length}`}
              >
                <div className="arc-card">
                  {card.image && (
                    <div className="arc-card-img-wrap">
                      <img src={card.image} alt={card.title || ""} />
                      <div className="arc-card-ov" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="arc-nav-wrap">
          <div
            className="arc-nav arc-nav-prev"
            role="button"
            aria-label="Previous slide"
            tabIndex={0}
            onClick={() => sliderRef.current?.slickPrev()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sliderRef.current?.slickPrev(); } }}
          />
          <div
            className="arc-nav arc-nav-next"
            role="button"
            aria-label="Next slide"
            tabIndex={0}
            onClick={() => sliderRef.current?.slickNext()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sliderRef.current?.slickNext(); } }}
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
        /* === Slick core CSS (inlined for Shadow DOM) === */
        .slick-slider { position: relative; display: block; box-sizing: border-box; user-select: none; -webkit-user-select: none; touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
        .slick-list { position: relative; display: block; overflow: hidden; margin: 0; padding: 0; }
        .slick-list.dragging { cursor: pointer; }
        .slick-slider .slick-track, .slick-slider .slick-list { transform: translate3d(0, 0, 0); }
        .slick-track { position: relative; top: 0; left: 0; display: block; margin-left: auto; margin-right: auto; }
        .slick-track:before, .slick-track:after { display: table; content: ''; }
        .slick-track:after { clear: both; }
        .slick-slide { display: none; float: left; height: 100%; min-height: 1px; }
        .slick-initialized .slick-slide { display: block; }
        .slick-arrow.slick-hidden { display: none; }

        /* === Arc overrides === */
        .arc2-viewport-${uid} .slick-list {
          overflow: visible !important;
          padding: 20px 0 30px !important;
        }
        .arc2-viewport-${uid} .slick-track {
          display: flex !important;
          align-items: flex-start;
        }
        .arc2-viewport-${uid} .slick-slide {
          margin: 0 ${cardSpacing / 2}px;
        }
        .arc2-viewport-${uid} {
          position: relative;
          overflow: visible;
        }

        /* === Slide inner (receives arc transforms) === */
        .arc2-viewport-${uid} .arc-slide-inner {
          will-change: transform;
        }

        /* === Navigation arrows === */
        .arc2-viewport-${uid} .arc-nav-wrap {
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
        .arc2-viewport-${uid} .arc-nav {
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
        .arc2-viewport-${uid} .arc-nav:focus-visible {
          outline: 2px solid var(--colors--primary, #1a1a2e);
          outline-offset: 2px;
        }
        .arc2-viewport-${uid} .arc-nav-next { right: 16px; }
        .arc2-viewport-${uid} .arc-nav-prev { left: 16px; }
        .arc2-viewport-${uid} .arc-nav::after {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-right: 2.5px solid var(--colors--primary, #1a1a2e);
          border-bottom: 2.5px solid var(--colors--primary, #1a1a2e);
        }
        .arc2-viewport-${uid} .arc-nav-next::after {
          transform: rotate(-45deg);
          margin-left: -4px;
        }
        .arc2-viewport-${uid} .arc-nav-prev::after {
          transform: rotate(135deg);
          margin-right: -4px;
        }

        /* === Card === */
        .arc2-viewport-${uid} .arc-card {
          user-select: none;
        }
        .arc2-viewport-${uid} .arc-card-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 4 / 5;
        }
        .arc2-viewport-${uid} .arc-card-img-wrap img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 12px;
          object-fit: cover;
          pointer-events: none;
          -webkit-user-drag: none;
        }
        .arc2-viewport-${uid} .arc-card-ov {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: var(--colors--white, rgb(255,255,255));
          border-radius: 12px;
          pointer-events: none;
          opacity: 0;
        }

        /* === Text block === */
        .arc2-root-${uid} .arc-text-block {
          text-align: center;
          max-width: 480px;
          margin: -10px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        .arc2-root-${uid} .arc-text-inner {
          animation: arc2-fade-in-${uid} 400ms ease;
        }
        @keyframes arc2-fade-in-${uid} {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .arc2-root-${uid} .arc-text-title {
          margin: 0 0 6px;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
        }
        .arc2-root-${uid} .arc-text-desc {
          margin: 0 0 14px;
          font-size: 15px;
          opacity: 0.7;
          line-height: 1.5;
        }
        .arc2-root-${uid} .arc-text-btn {
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
          .arc2-root-${uid} .arc-text-inner {
            animation: none;
          }
        }

        /* === Mobile === */
        @media (max-width: 767px) {
          .arc2-viewport-${uid} .arc-nav {
            width: 36px;
            height: 36px;
            top: 35%;
          }
          .arc2-viewport-${uid} .arc-nav-next { right: 8px; }
          .arc2-viewport-${uid} .arc-nav-prev { left: 8px; }
          .arc2-viewport-${uid} .arc-nav::after {
            width: 9px;
            height: 9px;
          }
          .arc2-root-${uid} .arc-text-title {
            font-size: 18px;
          }
          .arc2-root-${uid} .arc-text-block {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
