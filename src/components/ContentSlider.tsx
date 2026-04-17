"use client";

import React, { useEffect, useRef, useId } from "react";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

interface SlideImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ContentSliderProps {
  bgColor?: string;
  autoplayDelay?: number;
  speed?: number;
  slide1Title?: string; slide1Body?: string; slide1Image?: SlideImage; slide1BtnText?: string; slide1BtnLink?: string;
  slide2Title?: string; slide2Body?: string; slide2Image?: SlideImage; slide2BtnText?: string; slide2BtnLink?: string;
  slide3Title?: string; slide3Body?: string; slide3Image?: SlideImage; slide3BtnText?: string; slide3BtnLink?: string;
}

interface SlideData {
  title?: string;
  body?: string;
  image?: SlideImage;
  buttonText?: string;
  buttonLink?: string;
}

export default function ContentSlider(props: ContentSliderProps) {
  const {
    bgColor = "#ffffff",
    autoplayDelay = 5000,
    speed = 600,
  } = props;

  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  // Build slides array from props
  const slides: SlideData[] = [];
  for (let i = 1; i <= 3; i++) {
    const title = (props as any)[`slide${i}Title`] as string | undefined;
    const body = (props as any)[`slide${i}Body`] as string | undefined;
    const image = (props as any)[`slide${i}Image`] as SlideImage | undefined;
    const btnText = (props as any)[`slide${i}BtnText`] as string | undefined;
    const btnLink = (props as any)[`slide${i}BtnLink`] as string | undefined;
    if (title || image?.src) {
      slides.push({ title, body, image, buttonText: btnText, buttonLink: btnLink });
    }
  }

  useEffect(() => {
    const el = swiperContainerRef.current;
    if (!el) return;

    const n = el.querySelectorAll(".swiper-slide").length;
    if (!n) return;

    const sw = new Swiper(el, {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      speed,
      autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: nextRef.current!,
        prevEl: prevRef.current!,
      },
    } as any);

    swiperRef.current = sw;

    requestAnimationFrame(() => {
      if (rootRef.current) rootRef.current.style.visibility = "visible";
    });

    return () => {
      sw.destroy(true, true);
    };
  }, [autoplayDelay, speed, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="cs-root" style={{ background: bgColor }}>
        <p style={{ textAlign: "center", opacity: 0.5, padding: "40px 0" }}>
          Add slide titles and images in the component settings to see the slider.
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`cs-root cs-root-${uid}`} style={{ visibility: "hidden", background: bgColor }}>
      <div className={`cs-container cs-container-${uid}`}>
        <div ref={swiperContainerRef} className={`swiper cs-swiper cs-swiper-${uid}`}>
          <div className="swiper-wrapper">
            {slides.map((slide, i) => (
              <div key={i} className="swiper-slide">
                <div className="cs-slide-inner">
                  <div className="cs-text-col">
                    {slide.title && <h2 className="cs-title">{slide.title}</h2>}
                    {slide.body && <p className="cs-body">{slide.body}</p>}
                    {slide.buttonText && (
                      <a href={slide.buttonLink || "#"} className="cs-btn">
                        {slide.buttonText}
                      </a>
                    )}
                  </div>
                  <div className="cs-image-col">
                    {slide.image?.src && (
                      <img
                        src={slide.image.src}
                        alt={slide.image.alt || slide.title || ""}
                        width={slide.image.width}
                        height={slide.image.height}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-nav-wrap">
          <div ref={prevRef} className="cs-nav cs-nav-prev" />
          <div ref={nextRef} className="cs-nav cs-nav-next" />
        </div>
      </div>

      <style>{`
        /* === Swiper core (inlined for Shadow DOM) === */
        .swiper { position: relative; overflow: hidden; list-style: none; padding: 0; z-index: 1; display: block; }
        .swiper-wrapper { position: relative; width: 100%; height: 100%; z-index: 1; display: flex; transition-property: transform; transition-timing-function: ease; box-sizing: content-box; }
        .swiper-slide { flex-shrink: 0; width: 100%; height: 100%; position: relative; transition-property: transform; display: block; }

        /* === Root === */
        .cs-root-${uid} {
          padding: 60px 20px;
          font-family: 'Rubik', sans-serif;
          color: #000000;
        }

        /* === Container === */
        .cs-container-${uid} {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* === Slide layout === */
        .cs-root-${uid} .cs-slide-inner {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 40px;
        }
        .cs-root-${uid} .cs-text-col {
          flex: 1 1 50%;
          min-width: 0;
        }
        .cs-root-${uid} .cs-image-col {
          flex: 1 1 50%;
          min-width: 0;
        }
        .cs-root-${uid} .cs-image-col img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 12px;
        }

        /* === Typography === */
        .cs-root-${uid} .cs-title {
          margin: 0 0 16px;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
        }
        .cs-root-${uid} .cs-body {
          margin: 0 0 24px;
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.8;
        }
        .cs-root-${uid} .cs-btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 6px;
          background: #1a1a2e;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .cs-root-${uid} .cs-btn:hover {
          opacity: 0.85;
        }

        /* === Navigation arrows === */
        .cs-container-${uid} .cs-nav-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        .cs-container-${uid} .cs-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #1a1a2e;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          z-index: 10;
        }
        .cs-container-${uid} .cs-nav-next { right: -60px; }
        .cs-container-${uid} .cs-nav-prev { left: -60px; }
        .cs-container-${uid} .cs-nav::after {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-right: 2.5px solid #1a1a2e;
          border-bottom: 2.5px solid #1a1a2e;
        }
        .cs-container-${uid} .cs-nav-next::after {
          transform: rotate(-45deg);
          margin-left: -4px;
        }
        .cs-container-${uid} .cs-nav-prev::after {
          transform: rotate(135deg);
          margin-right: -4px;
        }

        /* === Mobile === */
        @media (max-width: 767px) {
          .cs-root-${uid} {
            padding: 40px 16px;
          }
          .cs-root-${uid} .cs-slide-inner {
            flex-direction: column-reverse;
            gap: 24px;
            padding: 24px;
          }
          .cs-root-${uid} .cs-title {
            font-size: 24px;
          }
          .cs-root-${uid} .cs-body {
            font-size: 15px;
          }
          .cs-container-${uid} .cs-nav-next { right: 0; }
          .cs-container-${uid} .cs-nav-prev { left: 0; }
          .cs-container-${uid} .cs-nav {
            width: 36px;
            height: 36px;
          }
          .cs-container-${uid} .cs-nav::after {
            width: 9px;
            height: 9px;
          }
        }
      `}</style>
    </div>
  );
}
