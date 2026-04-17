"use client";

import React, { useState, useEffect, useId } from "react";

interface TccFilterProps {
  heading?: string;
  subtitle?: string;
  galleryId?: string;
  bgColor?: string;
}

export default function TccFilter(props: TccFilterProps) {
  const {
    heading = "Community Stories",
    subtitle = "See what cars can do across Aotearoa.",
    galleryId = "tcc-gallery",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState("all");
  const filters = ["all", "story", "image", "video"];

  useEffect(() => {
    const applyFilter = () => {
      // Look for the gallery wrapper outside Shadow DOM
      const root = document.getElementById(galleryId);
      if (!root) return;

      const items = root.querySelectorAll("[data-tcc-type]");
      items.forEach((el) => {
        const type = (el as HTMLElement).dataset.tccType?.toLowerCase().trim();
        const show = active === "all" || type === active;
        (el as HTMLElement).style.display = show ? "" : "none";
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(applyFilter, 50);
    return () => clearTimeout(timer);
  }, [active, galleryId]);

  return (
    <div className={`tcc-filter-root-${uid}`}>
      <section className={`tcc-filter-${uid}`} style={{ background: bgColor }}>
        <h2 className={`tcc-filter-heading-${uid}`}>{heading}</h2>
        <p className={`tcc-filter-subtitle-${uid}`}>{subtitle}</p>

        <div className={`tcc-filter-bar-${uid}`}>
          {filters.map((f) => (
            <button
              key={f}
              className={`tcc-filter-btn-${uid} ${active === f ? `tcc-filter-btn-active-${uid}` : ""}`}
              onClick={() => setActive(f)}
            >
              {f === "all" ? "All" : f === "story" ? "Stories" : f === "image" ? "Images" : "Videos"}
            </button>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-filter-root-${uid} { width: 100%; }

        .tcc-filter-${uid} {
          width: 100%;
          padding: 60px 20px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          box-sizing: border-box;
        }

        .tcc-filter-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          text-align: center;
        }

        .tcc-filter-subtitle-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 0 0 16px;
          text-align: center;
          line-height: 1.6;
        }

        .tcc-filter-bar-${uid} {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tcc-filter-btn-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 50px;
          border: 2px solid #2d5c5a;
          background: transparent;
          color: #2d5c5a;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .tcc-filter-btn-${uid}:hover {
          background: rgba(45, 92, 90, 0.08);
        }

        .tcc-filter-btn-active-${uid} {
          background: #2d5c5a;
          color: #ffffff;
        }

        .tcc-filter-btn-active-${uid}:hover {
          background: #234e4c;
        }

        @media (max-width: 480px) {
          .tcc-filter-${uid} {
            padding: 40px 16px 24px;
          }
          .tcc-filter-btn-${uid} {
            font-size: 0.85rem;
            padding: 8px 18px;
          }
        }
      `}</style>
    </div>
  );
}
