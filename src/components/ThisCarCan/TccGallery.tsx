"use client";

import React, { useState, useEffect, useId } from "react";

interface GalleryItem {
  id: string;
  type: "story" | "image" | "video";
  name: string;
  car: string;
  statement: string;
  story?: string;
  image?: string;
  thumbnail?: string;
  videoUrl?: string;
}

interface TccGalleryProps {
  heading?: string;
  subtitle?: string;
  logoImage?: any;
  apiUrl?: string;
  bgColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

const DEMO_ITEMS: GalleryItem[] = [
  { id: "1", type: "image", name: "Sarah", car: "BYD Atto 3", statement: "Save me thousands on fuel", image: "" },
  { id: "2", type: "video", name: "James", car: "Tesla Model 3", statement: "Charge on my drive", thumbnail: "" },
  { id: "3", type: "story", name: "Mia", car: "MG ZS EV", statement: "Reduce my emissions", story: "Switching to electric was the best decision. I save $200 a month and love the quiet drive to work every morning." },
  { id: "4", type: "image", name: "Te Koha", car: "Hyundai Ioniq 5", statement: "Take me on epic road trips", image: "" },
  { id: "5", type: "story", name: "Priya", car: "Nissan Leaf", statement: "Super fast charge anywhere", story: "I was nervous about range anxiety but with chargers everywhere now, I've driven from Auckland to Wellington twice without a worry." },
  { id: "6", type: "video", name: "Liam", car: "Polestar 2", statement: "Drive me everywhere I want to go", thumbnail: "" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "story", label: "Stories" },
  { key: "image", label: "Images" },
  { key: "video", label: "Videos" },
];

export default function TccGallery(props: TccGalleryProps) {
  const {
    heading = "Community Stories",
    subtitle = "See what cars can do across Aotearoa.",
    logoImage,
    apiUrl = "",
    bgColor = "#FFFCF0",
  } = props;

  const uid = useId().replace(/:/g, "");
  const logoSrc = resolveImage(logoImage);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(DEMO_ITEMS);

  // Fetch live data if apiUrl provided
  useEffect(() => {
    if (!apiUrl) return;
    fetch(`${apiUrl}/api/submissions`)
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions?.length) {
          setItems(
            data.submissions.map((s: any) => ({
              id: s.id,
              type: s.type,
              name: s.name,
              car: s.car,
              statement: s.statement || s.title || "",
              story: s.story,
              image: s.imageKey ? `${apiUrl}/api/media/${s.imageKey}` : "",
              videoUrl: s.videoId ? `https://customer-${s.videoId}.cloudflarestream.com/${s.videoId}/manifest/video.m3u8` : "",
              thumbnail: s.imageKey ? `${apiUrl}/api/media/${s.imageKey}` : "",
            }))
          );
        }
      })
      .catch(() => {});
  }, [apiUrl]);

  // Close on escape
  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div className={`tcc-gal-root-${uid}`}>
      <section className={`tcc-gal-${uid}`} style={{ background: bgColor }}>
        <h2 className={`tcc-gal-heading-${uid}`}>{heading}</h2>
        <p className={`tcc-gal-subtitle-${uid}`}>{subtitle}</p>

        <div className={`tcc-gal-filters-${uid}`}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`tcc-gal-filter-${uid} ${filter === f.key ? `tcc-gal-filter-active-${uid}` : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={`tcc-gal-grid-${uid}`}>
          {filtered.map((item) => (
            <div key={item.id} className={`tcc-gal-card-${uid}`} onClick={() => setSelected(item)}>
              {item.type === "image" && (
                <>
                  <div className={`tcc-gal-media-${uid}`}>
                    {item.image && <img src={item.image} alt={item.statement} className={`tcc-gal-img-${uid}`} />}
                  </div>
                  <div className={`tcc-gal-bar-${uid}`}>
                    {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-gal-logo-${uid}`} />}
                    <p className={`tcc-gal-stmt-${uid}`}>{item.statement}</p>
                  </div>
                </>
              )}
              {item.type === "video" && (
                <>
                  <div className={`tcc-gal-media-${uid}`}>
                    {item.thumbnail && <img src={item.thumbnail} alt={item.statement} className={`tcc-gal-img-${uid}`} />}
                    <div className={`tcc-gal-play-${uid}`}>
                      <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.5)" /><polygon points="19,14 36,24 19,34" fill="#ffffff" /></svg>
                    </div>
                  </div>
                  <div className={`tcc-gal-bar-${uid}`}>
                    {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-gal-logo-${uid}`} />}
                    <p className={`tcc-gal-stmt-${uid}`}>{item.statement}</p>
                  </div>
                </>
              )}
              {item.type === "story" && (
                <>
                  <div className={`tcc-gal-story-top-${uid}`}>
                    {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-gal-logo-${uid}`} />}
                    <p className={`tcc-gal-stmt-${uid}`}>{item.statement}</p>
                  </div>
                  <p className={`tcc-gal-story-text-${uid}`}>{item.story}</p>
                </>
              )}
              <div className={`tcc-gal-meta-${uid}`}>
                <span className={`tcc-gal-name-${uid}`}>{item.name}</span>
                <span className={`tcc-gal-car-${uid}`}>{item.car}</span>
              </div>
              <span className={`tcc-gal-badge-${uid}`}>{item.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className={`tcc-modal-${uid}`} onClick={() => setSelected(null)}>
          <div className={`tcc-modal-content-${uid}`} onClick={(e) => e.stopPropagation()}>
            <button className={`tcc-modal-close-${uid}`} onClick={() => setSelected(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
            </button>

            {selected.type === "image" && (
              <div className={`tcc-modal-img-wrap-${uid}`}>
                {selected.image && <img src={selected.image} alt={selected.statement} className={`tcc-modal-image-${uid}`} />}
                <div className={`tcc-modal-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-modal-logo-${uid}`} />}
                  <p className={`tcc-modal-stmt-${uid}`}>{selected.statement}</p>
                </div>
              </div>
            )}

            {selected.type === "video" && (
              <div className={`tcc-modal-vid-wrap-${uid}`}>
                <video className={`tcc-modal-video-${uid}`} src={selected.videoUrl || ""} poster={selected.thumbnail} controls autoPlay playsInline />
                <div className={`tcc-modal-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-modal-logo-${uid}`} />}
                  <p className={`tcc-modal-stmt-${uid}`}>{selected.statement}</p>
                </div>
              </div>
            )}

            {selected.type === "story" && (
              <div className={`tcc-modal-story-wrap-${uid}`}>
                <div className={`tcc-modal-bar-${uid}`}>
                  {logoSrc && <img src={logoSrc} alt="This Car Can" className={`tcc-modal-logo-${uid}`} />}
                  <p className={`tcc-modal-stmt-${uid}`}>{selected.statement}</p>
                </div>
                <p className={`tcc-modal-story-text-${uid}`}>{selected.story}</p>
              </div>
            )}

            <div className={`tcc-modal-meta-${uid}`}>
              <span className={`tcc-modal-name-${uid}`}>{selected.name}</span>
              <span className={`tcc-modal-car-${uid}`}>{selected.car}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-gal-root-${uid} { width: 100%; }

        .tcc-gal-${uid} {
          width: 100%; padding: 70px 24px; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center;
        }
        .tcc-gal-heading-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700; color: #1a3c3c; margin: 0; text-align: center;
        }
        .tcc-gal-subtitle-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          font-weight: 400; color: #5a7a78; margin: 4px 0 28px; text-align: center;
        }

        .tcc-gal-filters-${uid} { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; justify-content: center; }
        .tcc-gal-filter-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 600;
          padding: 10px 24px; border-radius: 50px; border: 2px solid #d1e0df;
          background: transparent; color: #5a7a78; cursor: pointer; transition: all 0.25s;
        }
        .tcc-gal-filter-${uid}:hover { border-color: #2d5c5a; color: #1a3c3c; }
        .tcc-gal-filter-active-${uid} { background: #f5b731; border-color: #f5b731; color: #1a3c3c; }
        .tcc-gal-filter-active-${uid}:hover { background: #ffc94d; border-color: #ffc94d; }

        .tcc-gal-grid-${uid} {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; max-width: 1060px; width: 100%;
        }
        .tcc-gal-card-${uid} {
          position: relative; border-radius: 16px; overflow: hidden;
          background: #234e4c; display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
        }
        .tcc-gal-card-${uid}:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }

        .tcc-gal-media-${uid} { position: relative; width: 100%; height: 200px; overflow: hidden; background: #1a3c3c; }
        .tcc-gal-img-${uid} { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tcc-gal-play-${uid} {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 56px; height: 56px; transition: transform 0.25s;
        }
        .tcc-gal-card-${uid}:hover .tcc-gal-play-${uid} { transform: translate(-50%, -50%) scale(1.1); }
        .tcc-gal-play-${uid} svg { width: 100%; height: 100%; }

        .tcc-gal-bar-${uid} {
          padding: 14px 16px; display: flex; flex-direction: column;
          align-items: center; gap: 2px; background: #2d5c5a;
        }
        .tcc-gal-logo-${uid} { width: 100px; height: auto; }
        .tcc-gal-stmt-${uid} {
          font-family: 'Diary Notes', sans-serif; font-size: 1rem;
          color: #fff; text-transform: uppercase; text-align: center; margin: 0; line-height: 1.2;
        }
        .tcc-gal-story-top-${uid} {
          padding: 24px 20px 12px; display: flex; flex-direction: column;
          align-items: center; gap: 4px; background: #2d5c5a;
        }
        .tcc-gal-story-text-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #d1e0df;
          line-height: 1.6; margin: 0; padding: 0 20px 16px; flex: 1;
        }
        .tcc-gal-story-text-${uid} * { color: #d1e0df !important; }
        .tcc-gal-meta-${uid} {
          padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; justify-content: space-between; align-items: center;
        }
        .tcc-gal-name-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.85rem; font-weight: 600; color: #fff; }
        .tcc-gal-car-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #a8c5c3; }
        .tcc-gal-badge-${uid} {
          position: absolute; top: 12px; right: 12px;
          font-family: 'Rubik', sans-serif; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px;
          border-radius: 20px; background: rgba(0,0,0,0.4); color: #fff; backdrop-filter: blur(4px);
        }

        @media (max-width: 768px) { .tcc-gal-grid-${uid} { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
        @media (max-width: 480px) {
          .tcc-gal-${uid} { padding: 50px 16px; }
          .tcc-gal-grid-${uid} { grid-template-columns: 1fr; max-width: 400px; }
        }

        /* Modal */
        .tcc-modal-${uid} {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: tcc-mfi-${uid} 0.25s ease;
        }
        @keyframes tcc-mfi-${uid} { from { opacity: 0; } to { opacity: 1; } }

        .tcc-modal-content-${uid} {
          position: relative; background: #2d5c5a; border-radius: 20px;
          overflow: hidden; max-width: 640px; width: 100%; max-height: 90vh;
          overflow-y: auto; animation: tcc-msu-${uid} 0.3s cubic-bezier(0,0,0.2,1);
        }
        @keyframes tcc-msu-${uid} {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tcc-modal-close-${uid} {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          width: 40px; height: 40px; border-radius: 50%; border: none;
          background: rgba(0,0,0,0.4); color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; padding: 0;
        }
        .tcc-modal-close-${uid}:hover { background: rgba(0,0,0,0.6); }
        .tcc-modal-close-${uid} svg { width: 20px; height: 20px; }

        .tcc-modal-img-wrap-${uid},
        .tcc-modal-vid-wrap-${uid},
        .tcc-modal-story-wrap-${uid} { display: flex; flex-direction: column; }

        .tcc-modal-image-${uid} { width: 100%; max-height: 65vh; object-fit: contain; background: #1a3c3c; display: block; }
        .tcc-modal-video-${uid} { width: 100%; max-height: 65vh; background: #000; display: block; }
        .tcc-modal-story-text-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1.05rem; color: #d1e0df;
          line-height: 1.8; margin: 0; padding: 20px 28px 24px;
        }
        .tcc-modal-story-text-${uid} * { color: #d1e0df !important; }

        .tcc-modal-bar-${uid} {
          padding: 20px 24px; display: flex; flex-direction: column;
          align-items: center; gap: 4px; background: #2d5c5a;
        }
        .tcc-modal-logo-${uid} { width: 160px; height: auto; }
        .tcc-modal-stmt-${uid} {
          font-family: 'Diary Notes', sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem); color: #fff;
          text-transform: uppercase; text-align: center; margin: 0; line-height: 1.2;
        }
        .tcc-modal-meta-${uid} {
          padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; justify-content: space-between; align-items: center;
        }
        .tcc-modal-name-${uid} { font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600; color: #fff; }
        .tcc-modal-car-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #a8c5c3; }

        @media (max-width: 480px) {
          .tcc-modal-${uid} { padding: 12px; }
          .tcc-modal-content-${uid} { border-radius: 14px; }
          .tcc-modal-story-text-${uid} { padding: 16px 20px 20px; }
        }
      `}</style>
    </div>
  );
}
