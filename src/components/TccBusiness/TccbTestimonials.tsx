"use client";

import React, { useId, useRef, useState, useEffect, useCallback } from "react";

interface TccbTestimonialsProps {
  heading?: string;
  subtitle?: string;
  bgColor?: string;
  autoScrollSpeed?: number;
}

const testimonials = [
  {
    quote:
      "We switched 30% of our fleet to electric and saved $45,000 in the first year. The team loves them.",
    person: "Fleet Manager",
    company: "Wellington Business",
  },
  {
    quote:
      "Our drivers were skeptical at first. Now they fight over who gets the EV.",
    person: "Operations Director",
    company: "Auckland Logistics",
  },
  {
    quote:
      "Going electric was the single biggest thing we did for our sustainability targets. And it actually saved us money.",
    person: "CEO",
    company: "Christchurch Services",
  },
  {
    quote:
      "The transition was smoother than we expected. Rewiring's resources made the business case easy to present to the board.",
    person: "Sustainability Lead",
    company: "Hamilton Manufacturing",
  },
];

export default function TccbTestimonials(props: TccbTestimonialsProps) {
  const {
    heading = "Businesses Already Leading",
    subtitle = "See what NZ businesses are saying about going electric",
    bgColor = "#ffffff",
    autoScrollSpeed = 5000,
  } = props;

  const uid = useId().replace(/:/g, "");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = testimonials.length;

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, count - 1));
      const card = track.children[clamped] as HTMLElement | undefined;
      if (card) {
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
      }
      setActiveIndex(clamped);
    },
    [count]
  );

  const next = useCallback(() => {
    setActiveIndex((prev) => {
      const n = (prev + 1) % count;
      setTimeout(() => scrollTo(n), 0);
      return n;
    });
  }, [count, scrollTo]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => {
      const n = (prev - 1 + count) % count;
      setTimeout(() => scrollTo(n), 0);
      return n;
    });
  }, [count, scrollTo]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || autoScrollSpeed <= 0) return;
    timerRef.current = setInterval(() => {
      next();
    }, autoScrollSpeed);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoScrollSpeed, next]);

  // Sync active dot on manual scroll
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth || 1;
    const gap = 24;
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(idx, count - 1)));
  }, [count]);

  const quoteSvg = `<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="0" y="32" font-family="Georgia,serif" font-size="64" fill="#1a3c3c" opacity="0.1">\u201C</text></svg>`;

  return (
    <div className={`tccb-test-root-${uid}`}>
      <section className={`tccb-test-section-${uid}`}>
        <div className={`tccb-test-inner-${uid}`}>
          <div className={`tccb-test-header-${uid}`}>
            <h2 className={`tccb-test-heading-${uid}`}>{heading}</h2>
            <p className={`tccb-test-subtitle-${uid}`}>{subtitle}</p>
          </div>

          <div className={`tccb-test-carousel-${uid}`}>
            <button
              className={`tccb-test-arrow-${uid} tccb-test-arrow-left-${uid}`}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={`tccb-test-track-${uid}`}
              ref={trackRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onScroll={handleScroll}
            >
              {testimonials.map((t, i) => (
                <div key={i} className={`tccb-test-card-${uid}`}>
                  <div
                    className={`tccb-test-quote-mark-${uid}`}
                    dangerouslySetInnerHTML={{ __html: quoteSvg }}
                  />
                  <p className={`tccb-test-quote-${uid}`}>{t.quote}</p>
                  <div className={`tccb-test-attrib-${uid}`}>
                    <div className={`tccb-test-logo-${uid}`}>
                      {t.company.charAt(0)}
                    </div>
                    <div>
                      <span className={`tccb-test-person-${uid}`}>
                        {t.person}
                      </span>
                      <span className={`tccb-test-company-${uid}`}>
                        {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`tccb-test-arrow-${uid} tccb-test-arrow-right-${uid}`}
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#1a3c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className={`tccb-test-dots-${uid}`}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`tccb-test-dot-${uid} ${i === activeIndex ? `tccb-test-dot-active-${uid}` : ""}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tccb-test-root-${uid} { width: 100%; }

        .tccb-test-section-${uid} {
          width: 100%;
          background: ${bgColor};
          display: flex;
          justify-content: center;
          padding: 80px 24px;
          box-sizing: border-box;
        }

        .tccb-test-inner-${uid} {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .tccb-test-header-${uid} {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 640px;
        }

        .tccb-test-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .tccb-test-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        /* Carousel wrapper */
        .tccb-test-carousel-${uid} {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Track */
        .tccb-test-track-${uid} {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 12px 4px;
          flex: 1;
        }

        .tccb-test-track-${uid}::-webkit-scrollbar {
          display: none;
        }

        /* Card */
        .tccb-test-card-${uid} {
          flex: 0 0 min(340px, 80vw);
          background: #f5b731;
          border-radius: 24px 28px 20px 26px;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scroll-snap-align: start;
          position: relative;
          box-shadow: 0 4px 20px rgba(245, 183, 49, 0.15);
          transition: transform 0.3s ease;
        }

        .tccb-test-card-${uid}:hover {
          transform: translateY(-4px);
        }

        .tccb-test-quote-mark-${uid} {
          position: absolute;
          top: 12px;
          left: 20px;
          opacity: 0.6;
          pointer-events: none;
        }

        .tccb-test-quote-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 600;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.5;
          padding-top: 8px;
        }

        .tccb-test-attrib-${uid} {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid rgba(26, 60, 60, 0.12);
        }

        .tccb-test-logo-${uid} {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(26, 60, 60, 0.12);
          color: #1a3c3c;
          font-family: 'Rubik', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tccb-test-person-${uid} {
          display: block;
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a3c3c;
        }

        .tccb-test-company-${uid} {
          display: block;
          font-family: 'Rubik', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(26, 60, 60, 0.7);
        }

        /* Arrows */
        .tccb-test-arrow-${uid} {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #2d5c5a;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 2;
        }

        .tccb-test-arrow-${uid}:hover {
          background: #2d5c5a;
        }

        .tccb-test-arrow-${uid}:hover svg path {
          stroke: #ffffff;
        }

        /* Dots */
        .tccb-test-dots-${uid} {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .tccb-test-dot-${uid} {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #d1e0df;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .tccb-test-dot-active-${uid} {
          background: #2d5c5a;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .tccb-test-section-${uid} {
            padding: 60px 16px;
          }

          .tccb-test-arrow-${uid} {
            display: none;
          }

          .tccb-test-card-${uid} {
            flex: 0 0 min(300px, 82vw);
            padding: 28px 22px 24px;
          }
        }

        @media (max-width: 480px) {
          .tccb-test-section-${uid} {
            padding: 40px 12px;
          }

          .tccb-test-card-${uid} {
            flex: 0 0 min(280px, 85vw);
            padding: 24px 18px 20px;
          }
        }
      `}</style>
    </div>
  );
}
