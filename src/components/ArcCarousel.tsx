"use client";

import { useEffect, useRef, useCallback } from "react";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

interface ArcCarouselProps {
  targetSelector?: string;
  autoplayDelay?: number;
  rotationDeg?: number;
  dropPx?: number;
  cardWidth?: number;
  showOverlay?: boolean;
}

export default function ArcCarousel({
  targetSelector = "#venues-section .w-dyn-items",
  autoplayDelay = 3500,
  rotationDeg = 12,
  dropPx = 30,
  cardWidth = 280,
  showOverlay = true,
}: ArcCarouselProps) {
  const swiperRef = useRef<Swiper | null>(null);

  const rot = rotationDeg;
  const drop = dropPx;

  const applyTransforms = useCallback(
    (swiper: Swiper) => {
      swiper.slides.forEach((el: HTMLElement) => {
        const p = (el as any).progress ?? 0;
        const a = Math.abs(p);
        const z = 50 - Math.round(a) * 10;
        el.style.transform = `rotate(${p * -rot}deg) translateY(${a * a * drop}px) scale(${Math.max(0.75, 1 - a * 0.08)})`;
        el.style.opacity = a > 3 ? "0" : String(Math.max(0.25, 1 - a * 0.3));
        el.style.zIndex = String(z);
        el.style.position = "relative";
        el.style.transformOrigin = "center top";

        const ov = el.querySelector(".arc-card-ov") as HTMLElement | null;
        if (ov) {
          ov.style.opacity = a > 0 ? String(Math.min(0.85, a * 0.4)) : "0";
        }
      });
    },
    [rot, drop]
  );

  useEffect(() => {
    const dl = document.querySelector(targetSelector);
    if (!dl) return;

    const dyns = dl.querySelectorAll(":scope > .w-dyn-item");
    if (!dyns.length) return;

    const wrapper = document.createElement("div");
    wrapper.className = "swiper-wrapper";

    dyns.forEach((d) => {
      const card = d.querySelector(".venue-card") || d.firstElementChild;
      if (card) {
        (card as HTMLElement).classList.add("swiper-slide");
        if (showOverlay) {
          const img = card.querySelector("img");
          if (img) {
            const imgWrap = document.createElement("div");
            imgWrap.style.cssText = "position:relative;overflow:hidden;border-radius:12px";
            img.parentNode?.insertBefore(imgWrap, img);
            imgWrap.appendChild(img);
            const ov = document.createElement("div");
            ov.className = "arc-card-ov";
            imgWrap.appendChild(ov);
          }
        }
        wrapper.appendChild(card);
      }
    });

    const swiperEl = document.createElement("div");
    swiperEl.className = "swiper arc-swiper";
    dl.parentNode?.insertBefore(swiperEl, dl);
    swiperEl.appendChild(wrapper);
    (dl as HTMLElement).style.display = "none";

    const n = wrapper.querySelectorAll(".swiper-slide").length;
    if (!n) return;

    const mob = window.innerWidth <= 767;
    if (mob) {
      wrapper.querySelectorAll(".swiper-slide").forEach((c) => {
        (c as HTMLElement).style.width = "60vw";
      });
    }

    const sw = new Swiper(swiperEl, {
      modules: [Navigation, Autoplay],
      initialSlide: Math.floor(n / 2),
      centeredSlides: true,
      slidesPerView: mob ? ("auto" as const) : 5,
      spaceBetween: mob ? -30 : 10,
      loop: true,
      speed: 500,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".arc-next",
        prevEl: ".arc-prev",
      },
      on: {
        setTranslate(swiper: Swiper) {
          applyTransforms(swiper);
        },
        setTransition(swiper: Swiper, duration: number) {
          swiper.slides.forEach((el: HTMLElement) => {
            el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
            const ov = el.querySelector(".arc-card-ov") as HTMLElement | null;
            if (ov) ov.style.transition = `opacity ${duration}ms ease`;
          });
        },
      },
    } as any);

    swiperRef.current = sw;

    const nb = document.createElement("div");
    nb.className = "arc-next swiper-button-next";
    swiperEl.appendChild(nb);
    const pb = document.createElement("div");
    pb.className = "arc-prev swiper-button-prev";
    swiperEl.appendChild(pb);
    sw.navigation.init();
    sw.navigation.update();

    return () => {
      sw.destroy(true, true);
    };
  }, [targetSelector, autoplayDelay, showOverlay, applyTransforms]);

  return (
    <style>{`
      .arc-swiper { overflow: visible !important; padding: 10px 0 50px; }
      .arc-swiper .swiper-slide { transform-origin: center top !important; width: ${cardWidth}px !important; }
      .arc-card-ov {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(255,255,255,0.6); border-radius: 12px;
        pointer-events: none; opacity: 0; transition: opacity 500ms ease;
      }
      .arc-next, .arc-prev {
        width: 48px !important; height: 48px !important; border-radius: 50% !important;
        border: 2px solid #1a1a2e !important; background: #fff !important; top: 40% !important;
      }
      .arc-next::after, .arc-prev::after { font-size: 16px !important; color: #1a1a2e !important; }
      @media (max-width: 767px) {
        .arc-swiper .swiper-slide { width: 60vw !important; }
        .arc-next, .arc-prev { width: 36px !important; height: 36px !important; top: 35% !important; }
        .arc-next::after, .arc-prev::after { font-size: 13px !important; }
      }
    `}</style>
  );
}
