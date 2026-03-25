"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";

interface TccShareSectionProps {
  heading?: string;
  storyTitle?: string;
  storyDescription?: string;
  imageTitle?: string;
  imageDescription?: string;
  videoTitle?: string;
  videoDescription?: string;
  logoImage?: any;
  apiUrl?: string;
  storyButtonText?: string;
  imageButtonText?: string;
  videoButtonText?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function TccShareSection(props: TccShareSectionProps) {
  const {
    heading = "How Would You Like to Share?",
    storyTitle = "Share Your Story",
    storyDescription = "Tell us about your EV journey — what made you switch, what surprised you, and what you love most.",
    imageTitle = "Share an Image",
    imageDescription = "Snap a photo of your EV in action — on a road trip, charging up, or just looking good on the drive.",
    videoTitle = "Share a Video",
    videoDescription = "Record a short clip about your experience — show us what your car can do and why you love it.",
    logoImage,
    apiUrl = "https://this-car-can-api.noisy-scene-d996.workers.dev",
    storyButtonText = "Submit Your Story",
    imageButtonText = "Download Image",
    videoButtonText = "Upload & Share",
  } = props;

  const uid = useId().replace(/:/g, "");
  const logoSrc = resolveImage(logoImage);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const panelEndRef = useRef<HTMLDivElement>(null);

  const togglePanel = useCallback((panel: string) => {
    setActivePanel((prev) => {
      const next = prev === panel ? null : panel;
      if (next) {
        setTimeout(() => {
          panelEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 550);
      }
      return next;
    });
  }, []);

  const cards = [
    {
      key: "story",
      title: storyTitle,
      desc: storyDescription,
      openLabel: "Write your story",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 52c.5-.4 1.8-2.8 2.2-3.8L37 19.5c1-1.5 3.2-1.8 4.8-.5l2.5 2.2c1.3 1.1 1.5 3.2.4 4.6L22 53.5 9.5 57l2.5-5z" />
          <path d="M35 17.5l7.5 6.5" />
          <path d="M12.5 50c-1 .5-1.8 1.5-1.5 2.2s1.6.3 2.5-.2" />
          <circle cx="50" cy="12" r="1.2" />
          <circle cx="53" cy="16" r=".8" />
        </svg>
      ),
    },
    {
      key: "image",
      title: imageTitle,
      desc: imageDescription,
      openLabel: "Upload a photo",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12c-1.2.5-1.5 1.8-1.3 3l.5 33c.2 2 1.5 3.5 3.5 3.8l42-.2c2-.2 3.3-1.5 3.5-3.2l.3-33c-.2-2-1.5-3.2-3.3-3.5L10 12z" />
          <circle cx="20" cy="24" r="5" />
          <path d="M8 44l13-14c1.2-1 3-.8 3.8.2l7.5 8.5 6.5-5.5c1-.8 2.5-.6 3.2.4L56 44" />
        </svg>
      ),
    },
    {
      key: "video",
      title: videoTitle,
      desc: videoDescription,
      openLabel: "Upload a video",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 16c-.4 1-.5 2.2-.3 3.3l1 22c.2 2.2 1.7 3.8 3.8 4l26 .4c1.8 0 3.3-1.1 3.7-2.8l.5-24c-.2-1.8-1.3-3.2-3.2-3.5L9.5 14.5c-1.5.2-2.8.8-3.5 1.5z" />
          <path d="M41 24l10-7c1-.6 2.2-.2 2.6.7.1.4.2.6.2 1v24c0 1.1-.8 1.8-1.8 1.8-.4 0-.7-.1-1-.3l-10-7" />
          <circle cx="20" cy="28" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`tcc-share-root-${uid}`}>
      <section className={`tcc-share-${uid}`}>
        <h2 className={`tcc-share-heading-${uid}`}>{heading}</h2>
        <div className={`tcc-share-grid-${uid}`}>
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`tcc-share-card-${uid} ${activePanel === c.key ? `tcc-share-card-active-${uid}` : ""}`}
              onClick={() => togglePanel(c.key)}
            >
              <div className={`tcc-share-icon-${uid}`}>{c.icon}</div>
              <h3 className={`tcc-share-card-title-${uid}`}>{c.title}</h3>
              <p className={`tcc-share-card-text-${uid}`}>{c.desc}</p>
              <span className={`tcc-share-card-link-${uid}`}>
                {activePanel === c.key ? "Close" : c.openLabel}
              </span>
            </button>
          ))}
        </div>

        {/* Collapsible panels */}
        <div className={`tcc-share-panel-${uid} ${activePanel ? `tcc-share-panel-open-${uid}` : ""}`}>
          {activePanel === "story" && <StoryForm uid={uid} apiUrl={apiUrl} buttonText={storyButtonText} />}
          {activePanel === "image" && <ImageCreator uid={uid} logoSrc={logoSrc} apiUrl={apiUrl} buttonText={imageButtonText} />}
          {activePanel === "video" && <VideoUploader uid={uid} apiUrl={apiUrl} buttonText={videoButtonText} />}
          <div ref={panelEndRef} />
        </div>
      </section>

      <style>{`
        @font-face {
          font-family: 'Diary Notes';
          src: local('Diary Notes'), local('DiaryNotes'), local('Diary Notes Regular'),
               url('https://this-car-can-api.noisy-scene-d996.workers.dev/api/media/fonts/Diary-Notes.otf') format('opentype');
          font-weight: normal;
          font-display: swap;
          font-style: normal;
        }
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap');

        .tcc-share-root-${uid} { width: 100%; }

        .tcc-share-${uid} {
          width: 100%;
          background: #FFFCF0;
          padding: 70px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tcc-share-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0 0 40px;
          text-align: center;
        }

        .tcc-share-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 960px;
          width: 100%;
        }

        .tcc-share-card-${uid} {
          background: #ffffff;
          border: 1px solid #e8e2d0;
          border-radius: 16px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }

        .tcc-share-card-${uid}:hover {
          background: #ffffff;
          transform: translateY(-4px);
          border-color: #2d5c5a;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .tcc-share-icon-${uid} {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2d5c5a;
          transition: transform 0.3s ease;
        }

        .tcc-share-card-${uid}:hover .tcc-share-icon-${uid} {
          transform: scale(1.1) rotate(-3deg);
        }

        .tcc-share-icon-${uid} svg {
          width: 72px;
          height: 72px;
        }

        .tcc-share-card-title-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a3c3c;
          margin: 0;
        }

        .tcc-share-card-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          color: #5a7a78;
          margin: 0;
          line-height: 1.6;
        }

        .tcc-share-card-link-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2d5c5a;
          margin-top: auto;
          padding-top: 4px;
          transition: color 0.25s ease;
        }

        .tcc-share-card-${uid}:hover .tcc-share-card-link-${uid} {
          color: #1a3c3c;
        }

        .tcc-share-card-active-${uid} {
          border-color: #2d5c5a;
          background: #2d5c5a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .tcc-share-card-active-${uid} .tcc-share-card-title-${uid} { color: #ffffff; }
        .tcc-share-card-active-${uid} .tcc-share-card-text-${uid} { color: #a8c5c3; }
        .tcc-share-card-active-${uid} .tcc-share-icon-${uid} { color: #f5b731; }
        .tcc-share-card-active-${uid} .tcc-share-card-link-${uid} { color: #f5b731; }

        .tcc-share-card-active-${uid}:hover {
          background: #234e4c;
          border-color: #234e4c;
        }

        .tcc-share-panel-${uid} {
          max-width: 960px;
          width: 100%;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.4s ease,
                      margin 0.4s ease;
          margin-top: 0;
        }

        .tcc-share-panel-open-${uid} {
          max-height: 2000px;
          opacity: 1;
          margin-top: 32px;
        }

        @media (max-width: 768px) {
          .tcc-share-grid-${uid} {
            grid-template-columns: 1fr;
            max-width: 420px;
            gap: 20px;
          }
          .tcc-share-${uid} { padding: 50px 20px; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STORY FORM
   ═══════════════════════════════════════════ */

function StoryForm({ uid, apiUrl, buttonText = "Submit Your Story" }: { uid: string; apiUrl: string; buttonText?: string }) {
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !name.trim() || !story.trim()) return;
    setSubmitting(true);

    try {
      const base = apiUrl || "http://localhost:8787";
      const submissionId = crypto.randomUUID();
      await fetch(`${base}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, type: "story", name, car, title, story, email: email.trim() || undefined, subscribe }),
      });
      setDone(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <svg viewBox="0 0 48 48" fill="none" stroke="#2d5c5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
          <circle cx="24" cy="24" r="20" />
          <path d="M14 24l7 7 13-13" />
        </svg>
        <h3 style={{ fontFamily: "'Rubik', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#2d5c5a", margin: 0 }}>Story Submitted!</h3>
        <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.95rem", color: "#5a7a78", margin: 0, maxWidth: 400, lineHeight: 1.6 }}>Thanks for sharing. We'll review your story and add it to our community gallery shortly.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`tcc-story-${uid}`}>
        <div className={`tcc-story-inner-${uid}`}>
          <h2 className={`tcc-story-heading-${uid}`}>Write Your Story</h2>
          <p className={`tcc-story-subtitle-${uid}`}>Share what your car can do. Your story could inspire someone to make the switch.</p>

          <form className={`tcc-story-form-${uid}`} onSubmit={handleSubmit}>
            <div className={`tcc-story-row-${uid}`}>
              <div className={`tcc-story-field-${uid}`}>
                <label className={`tcc-story-label-${uid}`}>Your Name</label>
                <input className={`tcc-story-input-${uid}`} type="text" placeholder="e.g. Sarah from Wellington" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={`tcc-story-field-${uid}`}>
                <label className={`tcc-story-label-${uid}`}>Your Car</label>
                <input className={`tcc-story-input-${uid}`} type="text" placeholder="e.g. 2023 BYD Atto 3" value={car} onChange={(e) => setCar(e.target.value)} />
              </div>
            </div>

            <div className={`tcc-story-field-${uid}`}>
              <label className={`tcc-story-label-${uid}`}>Story Title</label>
              <input className={`tcc-story-input-${uid}`} type="text" placeholder="e.g. How my EV saved me $3,000 a year" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className={`tcc-story-field-${uid}`}>
              <label className={`tcc-story-label-${uid}`}>Your Story</label>
              <textarea className={`tcc-story-textarea-${uid}`} rows={6} placeholder="Tell us about your EV journey..." value={story} onChange={(e) => setStory(e.target.value)} />
            </div>

            <div className={`tcc-story-field-${uid}`}>
              <label className={`tcc-story-label-${uid}`}>Email <span style={{ fontWeight: 400, color: "#9ab0ae" }}>(optional)</span></label>
              <input className={`tcc-story-input-${uid}`} type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <label className={`tcc-story-checkbox-${uid}`}>
              <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
              <span>Keep me updated with Rewiring Aotearoa news and campaigns</span>
            </label>

            <p className={`tcc-story-disclaimer-${uid}`}>
              By submitting, you agree that Rewiring Aotearoa may use your story on social media, on our website, and in advocacy campaigns to show that New Zealanders are benefitting from EVs. We'll review submissions before they appear on the site.
            </p>

            <button type="submit" className={`tcc-story-submit-${uid}`} disabled={submitting}>
              {submitting ? "Submitting..." : buttonText}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .tcc-story-${uid} {
          width: 100%; padding: 40px 0; box-sizing: border-box;
          display: flex; justify-content: center;
        }
        .tcc-story-inner-${uid} {
          max-width: 680px; width: 100%;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .tcc-story-heading-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 700; color: #1a3c3c; margin: 0; text-align: center;
        }
        .tcc-story-subtitle-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          font-weight: 400; color: #5a7a78; margin: 0 0 24px; text-align: center; line-height: 1.6;
        }
        .tcc-story-form-${uid} {
          width: 100%; display: flex; flex-direction: column; gap: 20px;
        }
        .tcc-story-row-${uid} {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .tcc-story-field-${uid} {
          display: flex; flex-direction: column; gap: 6px;
        }
        .tcc-story-label-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 600; color: #1a3c3c;
        }
        .tcc-story-input-${uid},
        .tcc-story-textarea-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; color: #1a3c3c;
          background: #ffffff; border: 2px solid #e8e2d0; border-radius: 10px;
          padding: 14px 16px; outline: none; transition: border-color 0.25s ease;
          width: 100%; box-sizing: border-box;
        }
        .tcc-story-input-${uid}::placeholder,
        .tcc-story-textarea-${uid}::placeholder { color: #9ab0ae; }
        .tcc-story-input-${uid}:focus,
        .tcc-story-textarea-${uid}:focus { border-color: #2d5c5a; }
        .tcc-story-textarea-${uid} { resize: vertical; min-height: 140px; }
        .tcc-story-submit-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600;
          color: #1a3c3c; background: #f5b731; border: none; padding: 16px 40px;
          border-radius: 50px; cursor: pointer; align-self: center;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .tcc-story-submit-${uid}:hover { background: #ffc94d; transform: translateY(-2px); }
        .tcc-story-submit-${uid}:disabled { opacity: 0.5; cursor: not-allowed; }
        .tcc-story-checkbox-${uid} {
          display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #1a3c3c;
        }
        .tcc-story-checkbox-${uid} input[type="checkbox"] {
          width: 18px; height: 18px; margin-top: 2px; accent-color: #2d5c5a; cursor: pointer; flex-shrink: 0;
        }
        .tcc-story-disclaimer-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #7a9a98;
          line-height: 1.5; margin: 0; text-align: center;
        }
        @media (max-width: 480px) {
          .tcc-story-row-${uid} { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════
   IMAGE CREATOR
   ═══════════════════════════════════════════ */

function ImageCreator({ uid, logoSrc, apiUrl, buttonText = "Download Image" }: { uid: string; logoSrc?: string; apiUrl: string; buttonText?: string }) {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [statement, setStatement] = useState("");
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
      setStep(2);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(async () => {
    if (isDownloading || !photoPreview) return;
    setIsDownloading(true);

    try {
      const SIZE = 800;
      const PAD = 30;
      const LINE_H = 48;
      const LOGO_W = 220;
      const FONT_SIZE = 40;

      const loadImg = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const loadPromises: Promise<HTMLImageElement>[] = [loadImg(photoPreview)];
      if (logoSrc) loadPromises.push(loadImg(logoSrc));
      const [photo, logo] = await Promise.all(loadPromises);

      const logoH = logo ? logo.naturalHeight * (LOGO_W / logo.naturalWidth) : 0;

      const measureCanvas = document.createElement("canvas");
      const mCtx = measureCanvas.getContext("2d")!;
      mCtx.font = `${FONT_SIZE}px "Diary Notes", "Marker Felt", cursive`;

      const words = statement.toUpperCase().split(" ");
      const lines: string[] = [];
      let currentLine = "";
      for (const word of words) {
        const test = currentLine ? currentLine + " " + word : word;
        if (mCtx.measureText(test).width > SIZE - PAD * 2) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = test;
        }
      }
      if (currentLine) lines.push(currentLine);

      const textBlockH = lines.length * LINE_H;
      const BAR_H = PAD + logoH + 8 + textBlockH + PAD;
      const PHOTO_H = SIZE - BAR_H;

      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d")!;

      const imgRatio = photo.naturalWidth / photo.naturalHeight;
      const targetRatio = SIZE / PHOTO_H;
      let sx = 0, sy = 0, sw = photo.naturalWidth, sh = photo.naturalHeight;
      if (imgRatio > targetRatio) {
        sw = photo.naturalHeight * targetRatio;
        sx = (photo.naturalWidth - sw) / 2;
      } else {
        sh = photo.naturalWidth / targetRatio;
        sy = (photo.naturalHeight - sh) / 2;
      }
      ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, SIZE, PHOTO_H);

      ctx.fillStyle = "#2d5c5a";
      ctx.fillRect(0, PHOTO_H, SIZE, BAR_H);

      if (logo) {
        const logoX = (SIZE - LOGO_W) / 2;
        const logoY = PHOTO_H + PAD;
        ctx.drawImage(logo, logoX, logoY, LOGO_W, logoH);
      }

      ctx.fillStyle = "#ffffff";
      ctx.font = `${FONT_SIZE}px "Diary Notes", "Marker Felt", cursive`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const textY = PHOTO_H + PAD + logoH + 8;
      lines.forEach((line, i) => {
        ctx.fillText(line, SIZE / 2, textY + i * LINE_H);
      });

      // Download for user
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "this-car-can.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Upload to R2 and submit to CMS
      try {
        const base = apiUrl || "http://localhost:8787";
        const submissionId = crypto.randomUUID();
        const blob = await (await fetch(dataUrl)).blob();
        const formData = new FormData();
        formData.append("file", blob, "this-car-can.png");
        formData.append("submissionId", submissionId);

        const uploadRes = await fetch(`${base}/api/upload/image`, {
          method: "POST",
          body: formData,
        });
        const { key: imageKey } = await uploadRes.json();

        await fetch(`${base}/api/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            type: "image",
            name,
            car,
            statement,
            imageKey,
            compositeKey: imageKey,
            email: email.trim() || undefined,
            subscribe,
          }),
        });
        setSubmitted(true);
      } catch (uploadErr) {
        console.error("Upload failed:", uploadErr);
      }
    } catch (err) {
      console.error("Download failed:", err);
    }

    setIsDownloading(false);
  }, [isDownloading, photoPreview, statement, name, car, email, subscribe, logoSrc, apiUrl]);

  const reset = () => {
    setStep(1);
    setPhotoPreview(null);
    setStatement("");
    setName("");
    setCar("");
    setEmail("");
    setSubscribe(false);
    setSubmitted(false);
  };

  return (
    <>
      <section className={`tcc-imgc-${uid}`}>
        <h2 className={`tcc-imgc-heading-${uid}`}>Create Your Image</h2>
        <p className={`tcc-imgc-subtitle-${uid}`}>Create a shareable image in 3 easy steps — then download it to share on your own socials.</p>

        <div className={`tcc-imgc-steps-${uid}`}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`tcc-imgc-dot-${uid} ${step >= s ? `tcc-imgc-dot-active-${uid}` : ""}`}>
              <span>{s}</span>
            </div>
          ))}
          <div className={`tcc-imgc-line-${uid}`}>
            <div className={`tcc-imgc-progress-${uid}`} style={{ width: `${((step - 1) / 2) * 100}%` }} />
          </div>
        </div>
        <div className={`tcc-imgc-labels-${uid}`}>
          <span className={step >= 1 ? `tcc-imgc-label-active-${uid}` : ""}>Upload Photo</span>
          <span className={step >= 2 ? `tcc-imgc-label-active-${uid}` : ""}>Write Statement</span>
          <span className={step >= 3 ? `tcc-imgc-label-active-${uid}` : ""}>Preview & Download</span>
        </div>

        {step === 1 && (
          <div className={`tcc-imgc-upload-${uid}`} onClick={() => fileInputRef.current?.click()}>
            <div className={`tcc-imgc-upload-box-${uid}`}>
              <svg className={`tcc-imgc-upload-icon-${uid}`} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12c-1.2.5-1.5 1.8-1.3 3l.5 33c.2 2 1.5 3.5 3.5 3.8l42-.2c2-.2 3.3-1.5 3.5-3.2l.3-33c-.2-2-1.5-3.2-3.3-3.5L10 12z" />
                <circle cx="20" cy="24" r="5" />
                <path d="M8 44l13-14c1.2-1 3-.8 3.8.2l7.5 8.5 6.5-5.5c1-.8 2.5-.6 3.2.4L56 44" />
              </svg>
              <p className={`tcc-imgc-upload-text-${uid}`}>Upload Photo<br />of You &amp; Your Car</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </div>
        )}

        {step === 2 && (
          <div className={`tcc-imgc-compose-${uid}`}>
            <div className={`tcc-imgc-preview-${uid}`}>
              {photoPreview && <img className={`tcc-imgc-photo-${uid}`} src={photoPreview} alt="Your upload" />}
              <div className={`tcc-imgc-overlay-${uid}`}>
                {logoSrc && <img className={`tcc-imgc-logo-${uid}`} src={logoSrc} alt="This Car Can" />}
                <p className={`tcc-imgc-statement-${uid}`}>{statement || "Your statement here..."}</p>
              </div>
            </div>

            <div className={`tcc-imgc-form-${uid}`}>
              <div className={`tcc-imgc-row-${uid}`}>
                <div className={`tcc-imgc-sfield-${uid}`}>
                  <label className={`tcc-imgc-flabel-${uid}`}>Your Name</label>
                  <input className={`tcc-imgc-sinput-${uid}`} type="text" placeholder="e.g. Sarah from Wellington" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={`tcc-imgc-sfield-${uid}`}>
                  <label className={`tcc-imgc-flabel-${uid}`}>Your Car</label>
                  <input className={`tcc-imgc-sinput-${uid}`} type="text" placeholder="e.g. 2023 BYD Atto 3" value={car} onChange={(e) => setCar(e.target.value)} />
                </div>
              </div>

              <div className={`tcc-imgc-sfield-${uid}`}>
                <label className={`tcc-imgc-slabel-${uid}`}>This car can...</label>
                <input
                  className={`tcc-imgc-sinput-${uid}`}
                  type="text"
                  placeholder="e.g. Drive me everywhere I want to go"
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  maxLength={60}
                />
                <span className={`tcc-imgc-count-${uid}`}>{statement.length}/60</span>
              </div>

              <div className={`tcc-imgc-sfield-${uid}`}>
                <label className={`tcc-imgc-flabel-${uid}`}>Email <span style={{ fontWeight: 400, color: "#9ab0ae" }}>(optional)</span></label>
                <input className={`tcc-imgc-sinput-${uid}`} type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <label className={`tcc-imgc-checkbox-${uid}`}>
                <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                <span>Keep me updated with Rewiring Aotearoa news and campaigns</span>
              </label>

              <p className={`tcc-imgc-disclaimer-${uid}`}>
                By submitting, you agree that Rewiring Aotearoa may use your image on social media, on our website, and in advocacy campaigns to show that New Zealanders are benefitting from EVs. We'll review submissions before they appear on the site.
              </p>
            </div>

            <div className={`tcc-imgc-actions-${uid}`}>
              <button className={`tcc-imgc-btn-${uid} tcc-imgc-btn-back-${uid}`} onClick={reset}>Back</button>
              <button className={`tcc-imgc-btn-${uid} tcc-imgc-btn-next-${uid}`} disabled={!statement.trim() || !name.trim()} onClick={() => setStep(3)}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && !submitted && (
          <div className={`tcc-imgc-compose-${uid}`}>
            <div className={`tcc-imgc-preview-${uid}`}>
              {photoPreview && <img className={`tcc-imgc-photo-${uid}`} src={photoPreview} alt="Your upload" />}
              <div className={`tcc-imgc-overlay-${uid}`}>
                {logoSrc && <img className={`tcc-imgc-logo-${uid}`} src={logoSrc} alt="This Car Can" />}
                <p className={`tcc-imgc-statement-${uid}`}>{statement}</p>
              </div>
            </div>

            <div className={`tcc-imgc-actions-${uid}`}>
              <button className={`tcc-imgc-btn-${uid} tcc-imgc-btn-back-${uid}`} onClick={() => setStep(2)} disabled={isDownloading}>Edit</button>
              <button className={`tcc-imgc-btn-${uid} tcc-imgc-btn-next-${uid}`} onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? "Creating image..." : buttonText}
              </button>
            </div>
          </div>
        )}

        {step === 3 && submitted && (
          <div className={`tcc-imgc-compose-${uid}`}>
            <svg viewBox="0 0 48 48" fill="none" stroke="#2d5c5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
              <circle cx="24" cy="24" r="20" />
              <path d="M14 24l7 7 13-13" />
            </svg>
            <h3 style={{ fontFamily: "'Rubik', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#2d5c5a", margin: 0 }}>Image Downloaded!</h3>
            <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.95rem", color: "#5a7a78", margin: 0, maxWidth: 400, lineHeight: 1.6, textAlign: "center" }}>Your image is ready to share on your socials. We've also saved a copy — it may appear in our community gallery after review.</p>
            <button className={`tcc-imgc-btn-${uid} tcc-imgc-btn-next-${uid}`} onClick={reset}>Create Another</button>
          </div>
        )}
      </section>

      <style>{`
        .tcc-imgc-${uid} {
          width: 100%; padding: 40px 0; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center;
        }
        .tcc-imgc-heading-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700; color: #1a3c3c; margin: 0; text-align: center;
        }
        .tcc-imgc-subtitle-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          font-weight: 400; color: #5a7a78; margin: 4px 0 32px; text-align: center;
          line-height: 1.6; max-width: 520px;
        }
        .tcc-imgc-steps-${uid} {
          display: flex; align-items: center; position: relative;
          width: 280px; margin-bottom: 8px;
        }
        .tcc-imgc-dot-${uid} {
          width: 36px; height: 36px; border-radius: 50%; background: #d1e0df;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Rubik', sans-serif; font-size: 0.85rem; font-weight: 700;
          color: #fff; position: relative; z-index: 2; transition: background 0.3s;
        }
        .tcc-imgc-dot-${uid}:nth-child(2) { margin: 0 auto; }
        .tcc-imgc-dot-active-${uid} { background: #2d5c5a; }
        .tcc-imgc-line-${uid} {
          position: absolute; top: 50%; left: 18px; right: 18px;
          height: 3px; background: #d1e0df; transform: translateY(-50%);
          z-index: 1; border-radius: 2px; overflow: hidden;
        }
        .tcc-imgc-progress-${uid} {
          height: 100%; background: #2d5c5a; transition: width 0.4s; border-radius: 2px;
        }
        .tcc-imgc-labels-${uid} {
          display: flex; justify-content: space-between; width: 280px; margin-bottom: 32px;
        }
        .tcc-imgc-labels-${uid} span {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; font-weight: 500;
          width: 80px; color: #a8c5c3; text-align: center; transition: color 0.3s;
        }
        .tcc-imgc-label-active-${uid} { color: #1a3c3c !important; }

        .tcc-imgc-upload-${uid} { cursor: pointer; transition: transform 0.3s; }
        .tcc-imgc-upload-${uid}:hover { transform: scale(1.02); }
        .tcc-imgc-upload-box-${uid} {
          width: 320px; height: 380px; background: #FFFCF0;
          border: 3px dashed #2d5c5a; border-radius: 20px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 16px; padding: 32px;
        }
        .tcc-imgc-upload-icon-${uid} { width: 80px; height: 80px; color: #2d5c5a; }
        .tcc-imgc-upload-text-${uid} {
          font-family: 'Diary Notes', 'Marker Felt', cursive; font-size: 1.5rem;
          color: #f5b731; text-align: center; text-transform: uppercase;
          line-height: 1.3; margin: 0;
        }

        .tcc-imgc-compose-${uid} {
          display: flex; flex-direction: column; align-items: center;
          gap: 24px; width: 100%; max-width: 420px;
        }
        .tcc-imgc-preview-${uid} {
          width: 100%; border-radius: 16px; overflow: hidden;
          background: #2d5c5a; box-shadow: 0 8px 32px rgba(0,0,0,0.15); position: relative;
        }
        .tcc-imgc-photo-${uid} {
          width: 100%; height: 280px; object-fit: cover; display: block;
        }
        .tcc-imgc-overlay-${uid} {
          padding: 16px 20px 24px; display: flex; flex-direction: column;
          align-items: center; gap: 2px;
        }
        .tcc-imgc-logo-${uid} { width: 180px; height: auto; }
        .tcc-imgc-statement-${uid} {
          font-family: 'Diary Notes', 'Marker Felt', cursive; font-size: 1.3rem;
          color: #fff; text-transform: uppercase; text-align: center;
          margin: 0; line-height: 1.2; min-height: 1.6em;
        }

        .tcc-imgc-sfield-${uid} {
          width: 100%; display: flex; flex-direction: column; gap: 6px; position: relative;
        }
        .tcc-imgc-slabel-${uid} {
          font-family: 'Diary Notes', 'Marker Felt', cursive; font-size: 1.2rem;
          color: #f5b731; font-weight: 400;
        }
        .tcc-imgc-sinput-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; color: #1a3c3c;
          background: #fff; border: 2px solid #d1e0df; border-radius: 10px;
          padding: 14px 16px; outline: none; transition: border-color 0.25s;
          width: 100%; box-sizing: border-box;
        }
        .tcc-imgc-sinput-${uid}:focus { border-color: #f5b731; }
        .tcc-imgc-sinput-${uid}::placeholder { color: #9ab0ae; }
        .tcc-imgc-count-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #a8c5c3; text-align: right;
        }

        .tcc-imgc-actions-${uid} { display: flex; gap: 12px; width: 100%; }
        .tcc-imgc-btn-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600;
          padding: 14px 28px; border-radius: 50px; border: none; cursor: pointer; flex: 1;
          transition: background 0.25s, transform 0.25s, opacity 0.25s;
        }
        .tcc-imgc-btn-${uid}:disabled { opacity: 0.4; cursor: not-allowed; }
        .tcc-imgc-btn-back-${uid} {
          background: transparent; color: #2d5c5a; border: 2px solid #2d5c5a;
        }
        .tcc-imgc-btn-back-${uid}:hover:not(:disabled) { background: rgba(45,92,90,0.06); }
        .tcc-imgc-btn-next-${uid} { background: #f5b731; color: #1a3c3c; }
        .tcc-imgc-btn-next-${uid}:hover:not(:disabled) { background: #ffc94d; transform: translateY(-2px); }
        .tcc-imgc-form-${uid} {
          width: 100%; display: flex; flex-direction: column; gap: 16px;
        }
        .tcc-imgc-row-${uid} {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .tcc-imgc-flabel-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 600; color: #1a3c3c;
        }
        .tcc-imgc-checkbox-${uid} {
          display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #1a3c3c;
        }
        .tcc-imgc-checkbox-${uid} input[type="checkbox"] {
          width: 18px; height: 18px; margin-top: 2px; accent-color: #2d5c5a; cursor: pointer; flex-shrink: 0;
        }
        .tcc-imgc-disclaimer-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #7a9a98;
          line-height: 1.5; margin: 0; text-align: center;
        }
        .tcc-imgc-restart-${uid} {
          background: transparent; color: #5a7a78; border: none;
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 500;
          cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 8px;
        }
        .tcc-imgc-restart-${uid}:hover { color: #1a3c3c; }

        @media (max-width: 480px) {
          .tcc-imgc-row-${uid} { grid-template-columns: 1fr; }
          .tcc-imgc-upload-box-${uid} { width: 280px; height: 340px; }
          .tcc-imgc-steps-${uid} { width: 240px; }
          .tcc-imgc-labels-${uid} { width: 280px; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════
   VIDEO UPLOADER
   ═══════════════════════════════════════════ */

function VideoUploader({ uid, apiUrl, buttonText = "Upload & Share" }: { uid: string; apiUrl: string; buttonText?: string }) {
  const [step, setStep] = useState(1);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [statement, setStatement] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      setError("Video must be under 100MB");
      return;
    }
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
    setError("");
    setStep(2);
  }, []);

  // Capture a thumbnail frame from the video
  const captureThumbnail = useCallback((videoSrc: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const vid = document.createElement("video");
      vid.crossOrigin = "anonymous";
      vid.muted = true;
      vid.playsInline = true;
      vid.preload = "auto";
      vid.src = videoSrc;

      vid.onloadeddata = () => {
        // Seek to 1s or 25% of duration, whichever is smaller
        vid.currentTime = Math.min(1, vid.duration * 0.25);
      };

      vid.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(vid, 0, 0);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Thumbnail capture failed"))),
          "image/jpeg",
          0.85
        );
      };

      vid.onerror = () => reject(new Error("Could not load video for thumbnail"));
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (uploading || !video || !videoPreview) return;
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      const base = apiUrl || "http://localhost:8787";
      const submissionId = crypto.randomUUID();

      // Capture thumbnail from video
      let imageKey: string | undefined;
      try {
        const thumbBlob = await captureThumbnail(videoPreview);
        const thumbForm = new FormData();
        thumbForm.append("file", thumbBlob, "thumbnail.jpg");
        thumbForm.append("submissionId", submissionId);
        const thumbRes = await fetch(`${base}/api/upload/image`, { method: "POST", body: thumbForm });
        const thumbData = await thumbRes.json();
        imageKey = thumbData.key;
      } catch (thumbErr) {
        console.warn("Thumbnail capture failed, continuing without:", thumbErr);
      }

      // Upload video to R2 with progress
      const { videoKey } = await new Promise<{ videoKey: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${base}/api/upload/video`);
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        });
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve({ videoKey: data.key });
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Network error — check your connection"));
        xhr.ontimeout = () => reject(new Error("Upload timed out"));
        xhr.timeout = 300000; // 5 min timeout
        const formData = new FormData();
        formData.append("file", video);
        formData.append("submissionId", submissionId);
        xhr.send(formData);
      });

      // Save metadata + CMS (includes thumbnail as imageKey)
      await fetch(`${base}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, type: "video", name, car, statement, videoId: videoKey, imageKey, email: email.trim() || undefined, subscribe }),
      });

      setDone(true);
    } catch (err: any) {
      console.error("Video upload error:", err);
      setError(err?.message || "Upload failed — please try again.");
    }
    setUploading(false);
  }, [uploading, video, videoPreview, name, car, statement, email, subscribe, apiUrl, captureThumbnail]);

  const reset = () => {
    setStep(1);
    setVideo(null);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview(null);
    setName("");
    setCar("");
    setStatement("");
    setEmail("");
    setSubscribe(false);
    setProgress(0);
    setDone(false);
    setError("");
  };

  return (
    <>
      <section className={`tcc-vid-${uid}`}>
        <h2 className={`tcc-vid-heading-${uid}`}>Share a Video</h2>
        <p className={`tcc-vid-subtitle-${uid}`}>Record a short clip about your EV experience and share it with the community. Up to 2 minutes, max 100MB.</p>

        <div className={`tcc-vid-steps-${uid}`}>
          {[1, 2].map((s) => (
            <div key={s} className={`tcc-vid-dot-${uid} ${step >= s ? `tcc-vid-dot-active-${uid}` : ""}`}>
              <span>{s}</span>
            </div>
          ))}
          <div className={`tcc-vid-line-${uid}`}>
            <div className={`tcc-vid-prog-${uid}`} style={{ width: `${((step - 1) / 1) * 100}%` }} />
          </div>
        </div>
        <div className={`tcc-vid-labels-${uid}`}>
          <span className={step >= 1 ? `tcc-vid-label-active-${uid}` : ""}>Select Video</span>
          <span className={step >= 2 ? `tcc-vid-label-active-${uid}` : ""}>Details & Upload</span>
        </div>

        {step === 1 && (
          <div className={`tcc-vid-drop-${uid}`} onClick={() => fileInputRef.current?.click()}>
            <div className={`tcc-vid-drop-box-${uid}`}>
              <svg className={`tcc-vid-drop-icon-${uid}`} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 16c-.4 1-.5 2.2-.3 3.3l1 22c.2 2.2 1.7 3.8 3.8 4l26 .4c1.8 0 3.3-1.1 3.7-2.8l.5-24c-.2-1.8-1.3-3.2-3.2-3.5L9.5 14.5c-1.5.2-2.8.8-3.5 1.5z" />
                <path d="M41 24l10-7c1-.6 2.2-.2 2.6.7.1.4.2.6.2 1v24c0 1.1-.8 1.8-1.8 1.8-.4 0-.7-.1-1-.3l-10-7" />
                <circle cx="20" cy="28" r="3" />
              </svg>
              <p className={`tcc-vid-drop-text-${uid}`}>Select or Drop<br />Your Video Here</p>
            </div>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} style={{ display: "none" }} />
          </div>
        )}

        {step === 2 && (
          <div className={`tcc-vid-compose-${uid}`}>
            {videoPreview && (
              <div className={`tcc-vid-preview-${uid}`}>
                <video src={videoPreview} className={`tcc-vid-video-${uid}`} controls muted playsInline />
              </div>
            )}
            <div className={`tcc-vid-form-${uid}`}>
              <div className={`tcc-vid-row-${uid}`}>
                <div className={`tcc-vid-field-${uid}`}>
                  <label className={`tcc-vid-flabel-${uid}`}>Your Name</label>
                  <input className={`tcc-vid-input-${uid}`} type="text" placeholder="e.g. Sarah from Wellington" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={`tcc-vid-field-${uid}`}>
                  <label className={`tcc-vid-flabel-${uid}`}>Your Car</label>
                  <input className={`tcc-vid-input-${uid}`} type="text" placeholder="e.g. 2023 BYD Atto 3" value={car} onChange={(e) => setCar(e.target.value)} />
                </div>
              </div>
              <div className={`tcc-vid-field-${uid}`}>
                <label className={`tcc-vid-flabel-${uid}`}>This car can...</label>
                <input className={`tcc-vid-input-${uid}`} type="text" placeholder="e.g. Take me on epic road trips" value={statement} onChange={(e) => setStatement(e.target.value)} maxLength={80} />
              </div>
              <div className={`tcc-vid-field-${uid}`}>
                <label className={`tcc-vid-flabel-${uid}`}>Email <span style={{ fontWeight: 400, color: "#9ab0ae" }}>(optional)</span></label>
                <input className={`tcc-vid-input-${uid}`} type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <label className={`tcc-vid-checkbox-${uid}`}>
                <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                <span>Keep me updated with Rewiring Aotearoa news and campaigns</span>
              </label>
              <p className={`tcc-vid-disclaimer-${uid}`}>
                By submitting, you agree that Rewiring Aotearoa may use your video on social media, on our website, and in advocacy campaigns to show that New Zealanders are benefitting from EVs. We'll review submissions before they appear on the site.
              </p>
            </div>
            {uploading && (
              <div className={`tcc-vid-progress-${uid}`}>
                <div className={`tcc-vid-pbar-${uid}`}><div className={`tcc-vid-pfill-${uid}`} style={{ width: `${progress}%` }} /></div>
                <span className={`tcc-vid-ptext-${uid}`}>{progress}%</span>
              </div>
            )}
            {error && <p className={`tcc-vid-error-${uid}`}>{error}</p>}
            <div className={`tcc-vid-actions-${uid}`}>
              <button className={`tcc-vid-btn-${uid} tcc-vid-btn-back-${uid}`} onClick={reset} disabled={uploading}>Back</button>
              <button className={`tcc-vid-btn-${uid} tcc-vid-btn-next-${uid}`} disabled={!name.trim() || !statement.trim() || uploading} onClick={handleSubmit}>
                {uploading ? "Uploading..." : buttonText}
              </button>
            </div>
          </div>
        )}

        {done && (
          <div className={`tcc-vid-done-${uid}`}>
            <svg viewBox="0 0 48 48" fill="none" stroke="#2d5c5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
              <circle cx="24" cy="24" r="20" />
              <path d="M14 24l7 7 13-13" />
            </svg>
            <h3 className={`tcc-vid-done-title-${uid}`}>Video Submitted!</h3>
            <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.95rem", color: "#5a7a78", margin: 0, maxWidth: 400, lineHeight: 1.6, textAlign: "center" }}>Thanks for sharing. We'll review your video and add it to our community gallery shortly.</p>
            <button className={`tcc-vid-btn-${uid} tcc-vid-btn-next-${uid}`} onClick={reset}>Submit Another</button>
          </div>
        )}
      </section>

      <style>{`
        .tcc-vid-${uid} {
          width: 100%; padding: 40px 0; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center;
        }
        .tcc-vid-heading-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 700; color: #1a3c3c; margin: 0; text-align: center;
        }
        .tcc-vid-subtitle-${uid} {
          font-family: 'Rubik', sans-serif; font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          font-weight: 400; color: #5a7a78; margin: 4px 0 32px; text-align: center;
          line-height: 1.6; max-width: 520px;
        }
        .tcc-vid-steps-${uid} {
          display: flex; align-items: center; position: relative; width: 280px; margin-bottom: 8px;
        }
        .tcc-vid-dot-${uid} {
          width: 36px; height: 36px; border-radius: 50%; background: #d1e0df;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Rubik', sans-serif; font-size: 0.85rem; font-weight: 700; color: #fff;
          position: relative; z-index: 2; transition: background 0.3s;
        }
        .tcc-vid-dot-${uid}:nth-child(2) { margin: 0 auto; }
        .tcc-vid-dot-active-${uid} { background: #2d5c5a; }
        .tcc-vid-line-${uid} {
          position: absolute; top: 50%; left: 18px; right: 18px; height: 3px;
          background: #d1e0df; transform: translateY(-50%); z-index: 1; border-radius: 2px; overflow: hidden;
        }
        .tcc-vid-prog-${uid} { height: 100%; background: #2d5c5a; transition: width 0.4s; border-radius: 2px; }
        .tcc-vid-labels-${uid} {
          display: flex; justify-content: space-between; width: 280px; margin-bottom: 32px;
        }
        .tcc-vid-labels-${uid} span {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; font-weight: 500;
          color: #a8c5c3; text-align: center; width: 80px; transition: color 0.3s;
        }
        .tcc-vid-label-active-${uid} { color: #1a3c3c !important; }

        .tcc-vid-drop-${uid} { cursor: pointer; transition: transform 0.3s; }
        .tcc-vid-drop-${uid}:hover { transform: scale(1.02); }
        .tcc-vid-drop-box-${uid} {
          width: 320px; height: 280px; background: #FFFCF0;
          border: 3px dashed #2d5c5a; border-radius: 20px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 16px; padding: 32px; transition: border-color 0.3s;
        }
        .tcc-vid-drop-${uid}:hover .tcc-vid-drop-box-${uid} { border-color: #f5b731; }
        .tcc-vid-drop-icon-${uid} { width: 72px; height: 72px; color: #2d5c5a; }
        .tcc-vid-drop-text-${uid} {
          font-family: 'Diary Notes', 'Marker Felt', cursive; font-size: 1.4rem;
          color: #f5b731; text-align: center; text-transform: uppercase; line-height: 1.3; margin: 0;
        }

        .tcc-vid-compose-${uid} {
          display: flex; flex-direction: column; align-items: center; gap: 24px;
          width: 100%; max-width: 480px;
        }
        .tcc-vid-preview-${uid} { width: 100%; border-radius: 12px; overflow: hidden; background: #000; }
        .tcc-vid-video-${uid} { width: 100%; display: block; max-height: 280px; }
        .tcc-vid-form-${uid} { width: 100%; display: flex; flex-direction: column; gap: 16px; }
        .tcc-vid-row-${uid} { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .tcc-vid-field-${uid} { display: flex; flex-direction: column; gap: 6px; }
        .tcc-vid-flabel-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 600; color: #1a3c3c; }
        .tcc-vid-input-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; color: #1a3c3c;
          background: #fff; border: 2px solid #e8e2d0; border-radius: 10px;
          padding: 12px 14px; outline: none; width: 100%; box-sizing: border-box;
          transition: border-color 0.25s;
        }
        .tcc-vid-input-${uid}:focus { border-color: #2d5c5a; }
        .tcc-vid-input-${uid}::placeholder { color: #9ab0ae; }

        .tcc-vid-actions-${uid} { display: flex; gap: 12px; width: 100%; }
        .tcc-vid-btn-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600;
          padding: 14px 28px; border-radius: 50px; border: none; cursor: pointer; flex: 1;
          transition: background 0.25s, transform 0.25s, opacity 0.25s;
        }
        .tcc-vid-btn-${uid}:disabled { opacity: 0.4; cursor: not-allowed; }
        .tcc-vid-btn-back-${uid} { background: transparent; color: #2d5c5a; border: 2px solid #2d5c5a; }
        .tcc-vid-btn-back-${uid}:hover:not(:disabled) { background: rgba(45,92,90,0.06); }
        .tcc-vid-btn-next-${uid} { background: #f5b731; color: #1a3c3c; }
        .tcc-vid-btn-next-${uid}:hover:not(:disabled) { background: #ffc94d; transform: translateY(-2px); }
        .tcc-vid-checkbox-${uid} {
          display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #1a3c3c;
        }
        .tcc-vid-checkbox-${uid} input[type="checkbox"] {
          width: 18px; height: 18px; margin-top: 2px; accent-color: #2d5c5a; cursor: pointer; flex-shrink: 0;
        }
        .tcc-vid-disclaimer-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.8rem; color: #7a9a98;
          line-height: 1.5; margin: 0; text-align: center;
        }

        .tcc-vid-summary-${uid} {
          width: 100%; background: #fff; border: 1px solid #e8e2d0;
          border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 12px;
        }
        .tcc-vid-srow-${uid} { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .tcc-vid-slbl-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.85rem; font-weight: 600; color: #5a7a78; white-space: nowrap; }
        .tcc-vid-sval-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.95rem; color: #1a3c3c; text-align: right; }

        .tcc-vid-progress-${uid} { width: 100%; display: flex; flex-direction: column; gap: 8px; }
        .tcc-vid-pbar-${uid} { width: 100%; height: 8px; background: #e8e2d0; border-radius: 4px; overflow: hidden; }
        .tcc-vid-pfill-${uid} { height: 100%; background: #2d5c5a; border-radius: 4px; transition: width 0.3s; }
        .tcc-vid-ptext-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.85rem; color: #5a7a78; text-align: center; }
        .tcc-vid-error-${uid} { font-family: 'Rubik', sans-serif; font-size: 0.9rem; color: #ff6b6b; margin: 0; text-align: center; }

        .tcc-vid-done-${uid} {
          display: flex; flex-direction: column; align-items: center; gap: 16px; max-width: 400px;
        }
        .tcc-vid-done-title-${uid} { font-family: 'Rubik', sans-serif; font-size: 1.5rem; font-weight: 700; color: #2d5c5a; margin: 0; }
        .tcc-vid-done-text-${uid} { font-family: 'Rubik', sans-serif; font-size: 1rem; color: #5a7a78; text-align: center; line-height: 1.6; margin: 0; }

        @media (max-width: 480px) {
          .tcc-vid-drop-box-${uid} { width: 280px; height: 240px; }
          .tcc-vid-row-${uid} { grid-template-columns: 1fr; }
          .tcc-vid-steps-${uid} { width: 240px; }
          .tcc-vid-labels-${uid} { width: 280px; }
        }
      `}</style>
    </>
  );
}
