"use client";

import React, { useState, useRef, useCallback, useId } from "react";

interface NeShareFormProps {
  heading?: string;
  subtitle?: string;
  intro?: string;
  storyLabel?: string;
  storyPlaceholder?: string;
  influencedLabel?: string;
  influencedPlaceholder?: string;
  buttonText?: string;
  apiUrl?: string;
  bgColor?: string;
  cardBg?: string;
  accentColor?: string;
  textColor?: string;
}

export default function NeShareForm(props: NeShareFormProps) {
  const {
    heading = "Tell us how you did it.",
    subtitle = "Share your story",
    intro = "Whether at home or at work, tell us how much you're saving on electricity, gas, petrol or diesel — and what got you over the line. And share any stories about how you convinced others to follow your lead.",
    storyLabel = "Your story",
    storyPlaceholder = "How did you electrify your life — and how did you electrify someone else's? What got you over the line? What got them over the line?",
    influencedLabel = "Who did you electrify? (or who influenced you?)",
    influencedPlaceholder = "e.g. My mum, my dad, three neighbours, my boss…",
    buttonText = "Share Your Story",
    apiUrl = "https://neighbourhood-effect-api.oj-f3d.workers.dev",
    bgColor = "#FFFCF0",
    cardBg = "#ffffff",
    accentColor = "#f5b731",
    textColor = "#1a3c3c",
  } = props;

  const uid = useId().replace(/:/g, "");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [influenced, setInfluenced] = useState("");
  const [story, setStory] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoError, setVideoError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleVideoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      setVideoError("Video must be under 100MB");
      return;
    }
    setVideoError("");
    setVideoFile(file);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview(URL.createObjectURL(file));
  }, [videoPreview]);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    setVideoError("");
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const reset = () => {
    setName(""); setLocation(""); setInfluenced(""); setStory("");
    setEmail(""); setSubscribe(false);
    removeImage(); removeVideo();
    setProgress(0); setDone(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !name.trim() || !story.trim()) return;
    setSubmitting(true);

    try {
      // If an apiUrl is configured, hit the same API the TCC share component uses.
      // For local mockup with no apiUrl, simulate progress then mark done.
      if (apiUrl) {
        const submissionId = crypto.randomUUID();
        let imageKey: string | undefined;
        let videoKey: string | undefined;

        if (imageFile) {
          const fd = new FormData();
          fd.append("file", imageFile);
          fd.append("submissionId", submissionId);
          const res = await fetch(`${apiUrl}/api/upload/image`, { method: "POST", body: fd });
          imageKey = (await res.json()).key;
        }

        if (videoFile) {
          videoKey = await new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${apiUrl}/api/upload/video`);
            xhr.upload.addEventListener("progress", (ev) => {
              if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
            });
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText).key);
              } else {
                reject(new Error(`Upload failed: ${xhr.status}`));
              }
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.timeout = 300000;
            const fd = new FormData();
            fd.append("file", videoFile);
            fd.append("submissionId", submissionId);
            xhr.send(fd);
          });
        }

        await fetch(`${apiUrl}/api/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            type: "neighbourhood",
            name,
            location,
            influenced,
            story,
            imageKey,
            videoId: videoKey,
            email: email.trim() || undefined,
            subscribe,
          }),
        });
      } else {
        // Local mockup — simulate a quick upload progress arc
        for (let p = 0; p <= 100; p += 10) {
          setProgress(p);
          await new Promise((r) => setTimeout(r, 60));
        }
      }
      setDone(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <div className={`ne-share-root-${uid}`} id="share">
        <section className={`ne-share-${uid}`}>
          <div className={`ne-done-${uid}`}>
            <div className={`ne-done-icon-${uid}`}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="20" />
                <path d="M14 24l7 7 13-13" />
              </svg>
            </div>
            <h3 className={`ne-done-title-${uid}`}>Thanks for sharing!</h3>
            <p className={`ne-done-text-${uid}`}>
              We'll review your story and add it to the community gallery shortly. Your story might be the spark that gets someone else over the line.
            </p>
            <button type="button" className={`ne-submit-${uid}`} onClick={reset}>Share Another</button>
          </div>
        </section>
        <style>{`
          .ne-share-root-${uid} { width: 100%; }
          .ne-share-${uid} {
            width: 100%; background: ${bgColor};
            padding: 80px 24px; box-sizing: border-box;
            display: flex; justify-content: center;
          }
          .ne-done-${uid} {
            display: flex; flex-direction: column; align-items: center;
            gap: 16px; max-width: 480px; text-align: center;
          }
          .ne-done-icon-${uid} { color: #2d5c5a; }
          .ne-done-icon-${uid} svg { width: 56px; height: 56px; }
          .ne-done-title-${uid} {
            font-family: 'Rubik', sans-serif; font-size: 1.6rem; font-weight: 700;
            color: #2d5c5a; margin: 0;
          }
          .ne-done-text-${uid} {
            font-family: 'Rubik', sans-serif; font-size: 1rem;
            color: #5a7a78; margin: 0; line-height: 1.6;
          }
          .ne-submit-${uid} {
            font-family: 'Rubik', sans-serif; font-size: 1rem; font-weight: 600;
            color: #1a3c3c; background: ${accentColor}; border: none;
            padding: 14px 32px; border-radius: 50px; cursor: pointer;
            transition: background 0.25s ease, transform 0.25s ease;
            margin-top: 8px;
          }
          .ne-submit-${uid}:hover { background: #ffc94d; transform: translateY(-2px); }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`ne-share-root-${uid}`} id="share">
      <section className={`ne-share-${uid}`}>
        <div className={`ne-share-inner-${uid}`}>
          <div className={`ne-share-header-${uid}`}>
            <span className={`ne-share-eyebrow-${uid}`}>{subtitle}</span>
            <h2 className={`ne-share-heading-${uid}`}>{heading}</h2>
            <p className={`ne-share-intro-${uid}`}>{intro}</p>
          </div>

          <form className={`ne-share-form-${uid}`} onSubmit={handleSubmit}>
            <div className={`ne-row-${uid}`}>
              <div className={`ne-field-${uid}`}>
                <label className={`ne-label-${uid}`}>Your name</label>
                <input
                  className={`ne-input-${uid}`}
                  type="text"
                  placeholder="e.g. Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={`ne-field-${uid}`}>
                <label className={`ne-label-${uid}`}>Where you're based <span className={`ne-opt-${uid}`}>(optional)</span></label>
                <input
                  className={`ne-input-${uid}`}
                  type="text"
                  placeholder="e.g. Wellington"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className={`ne-field-${uid}`}>
              <label className={`ne-label-${uid}`}>{influencedLabel}</label>
              <input
                className={`ne-input-${uid}`}
                type="text"
                placeholder={influencedPlaceholder}
                value={influenced}
                onChange={(e) => setInfluenced(e.target.value)}
              />
            </div>

            <div className={`ne-field-${uid}`}>
              <label className={`ne-label-${uid}`}>{storyLabel}</label>
              <textarea
                className={`ne-textarea-${uid}`}
                rows={7}
                placeholder={storyPlaceholder}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              />
            </div>

            {/* Media uploads */}
            <div className={`ne-media-row-${uid}`}>
              {/* Image */}
              <div className={`ne-media-field-${uid}`}>
                <label className={`ne-label-${uid}`}>Add a photo <span className={`ne-opt-${uid}`}>(optional)</span></label>
                {imagePreview ? (
                  <div className={`ne-media-preview-${uid}`}>
                    <img src={imagePreview} alt="Preview" className={`ne-image-preview-${uid}`} />
                    <button type="button" className={`ne-remove-${uid}`} onClick={removeImage} aria-label="Remove image">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" className={`ne-drop-${uid}`} onClick={() => imageInputRef.current?.click()}>
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 12c-1.2.5-1.5 1.8-1.3 3l.5 33c.2 2 1.5 3.5 3.5 3.8l42-.2c2-.2 3.3-1.5 3.5-3.2l.3-33c-.2-2-1.5-3.2-3.3-3.5L10 12z" />
                      <circle cx="20" cy="24" r="5" />
                      <path d="M8 44l13-14c1.2-1 3-.8 3.8.2l7.5 8.5 6.5-5.5c1-.8 2.5-.6 3.2.4L56 44" />
                    </svg>
                    <span className={`ne-drop-text-${uid}`}>Upload an image</span>
                    <span className={`ne-drop-hint-${uid}`}>JPG, PNG, HEIC</span>
                  </button>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Video */}
              <div className={`ne-media-field-${uid}`}>
                <label className={`ne-label-${uid}`}>Add a video <span className={`ne-opt-${uid}`}>(optional)</span></label>
                {videoPreview ? (
                  <div className={`ne-media-preview-${uid}`}>
                    <video src={videoPreview} className={`ne-video-preview-${uid}`} controls muted playsInline />
                    <button type="button" className={`ne-remove-${uid}`} onClick={removeVideo} aria-label="Remove video">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" className={`ne-drop-${uid}`} onClick={() => videoInputRef.current?.click()}>
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 16c-.4 1-.5 2.2-.3 3.3l1 22c.2 2.2 1.7 3.8 3.8 4l26 .4c1.8 0 3.3-1.1 3.7-2.8l.5-24c-.2-1.8-1.3-3.2-3.2-3.5L9.5 14.5c-1.5.2-2.8.8-3.5 1.5z" />
                      <path d="M41 24l10-7c1-.6 2.2-.2 2.6.7.1.4.2.6.2 1v24c0 1.1-.8 1.8-1.8 1.8-.4 0-.7-.1-1-.3l-10-7" />
                      <circle cx="20" cy="28" r="3" />
                    </svg>
                    <span className={`ne-drop-text-${uid}`}>Upload a video</span>
                    <span className={`ne-drop-hint-${uid}`}>Up to 2 min · 100MB max</span>
                  </button>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  style={{ display: "none" }}
                />
                {videoError && <span className={`ne-error-${uid}`}>{videoError}</span>}
              </div>
            </div>

            <div className={`ne-field-${uid}`}>
              <label className={`ne-label-${uid}`}>Email <span className={`ne-opt-${uid}`}>(optional)</span></label>
              <input
                className={`ne-input-${uid}`}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className={`ne-checkbox-${uid}`}>
              <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
              <span>Keep me updated with Rewiring Aotearoa news and campaigns</span>
            </label>

            <p className={`ne-disclaimer-${uid}`}>
              By submitting, you agree that Rewiring Aotearoa may use your story, image, or video on social media, our website, and in advocacy campaigns. We'll review submissions before they appear publicly.
            </p>

            {submitting && progress > 0 && (
              <div className={`ne-progress-${uid}`}>
                <div className={`ne-pbar-${uid}`}>
                  <div className={`ne-pfill-${uid}`} style={{ width: `${progress}%` }} />
                </div>
                <span className={`ne-ptext-${uid}`}>{progress}%</span>
              </div>
            )}

            <button
              type="submit"
              className={`ne-submit-${uid}`}
              disabled={submitting || !name.trim() || !story.trim()}
            >
              {submitting ? "Sharing..." : buttonText}
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .ne-share-root-${uid} { width: 100%; }

        .ne-share-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: 80px 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
        }

        .ne-share-inner-${uid} {
          max-width: 720px;
          width: 100%;
          background: ${cardBg};
          border-radius: 24px;
          padding: 48px 44px;
          box-shadow: 0 12px 40px rgba(45, 92, 90, 0.08);
        }

        .ne-share-header-${uid} {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 36px;
          gap: 8px;
        }

        .ne-share-eyebrow-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2d5c5a;
        }

        .ne-share-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.6rem, 3.4vw, 2.2rem);
          font-weight: 700;
          color: #1a3c3c;
          margin: 0;
          line-height: 1.2;
        }

        .ne-share-intro-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 400;
          color: #5a7a78;
          margin: 8px 0 0;
          line-height: 1.65;
          max-width: 520px;
        }

        .ne-share-form-${uid} {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .ne-row-${uid} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .ne-field-${uid} {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ne-label-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a3c3c;
        }

        .ne-opt-${uid} {
          font-weight: 400;
          color: #9ab0ae;
        }

        .ne-input-${uid},
        .ne-textarea-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          color: #1a3c3c;
          background: #ffffff;
          border: 2px solid #e8e2d0;
          border-radius: 10px;
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .ne-input-${uid}::placeholder,
        .ne-textarea-${uid}::placeholder { color: #9ab0ae; }
        .ne-input-${uid}:focus,
        .ne-textarea-${uid}:focus { border-color: #2d5c5a; }
        .ne-textarea-${uid} { resize: vertical; min-height: 160px; line-height: 1.55; }

        .ne-media-row-${uid} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .ne-media-field-${uid} {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ne-drop-${uid} {
          font-family: 'Rubik', sans-serif;
          background: #FFFCF0;
          border: 2px dashed #2d5c5a;
          border-radius: 14px;
          padding: 28px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #2d5c5a;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .ne-drop-${uid}:hover {
          border-color: ${accentColor};
          background: #fff8e1;
          transform: translateY(-2px);
        }
        .ne-drop-${uid} svg { width: 40px; height: 40px; }
        .ne-drop-text-${uid} {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a3c3c;
        }
        .ne-drop-hint-${uid} {
          font-size: 0.8rem;
          color: #7a9a98;
        }

        .ne-media-preview-${uid} {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #1a3c3c;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ne-image-preview-${uid} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ne-video-preview-${uid} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ne-remove-${uid} {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(26, 60, 60, 0.85);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .ne-remove-${uid}:hover { background: #1a3c3c; }
        .ne-remove-${uid} svg { width: 16px; height: 16px; }

        .ne-checkbox-${uid} {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          font-family: 'Rubik', sans-serif;
          font-size: 0.9rem;
          color: #1a3c3c;
          line-height: 1.5;
        }
        .ne-checkbox-${uid} input[type="checkbox"] {
          width: 18px; height: 18px; margin-top: 2px;
          accent-color: #2d5c5a; cursor: pointer; flex-shrink: 0;
        }

        .ne-disclaimer-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.8rem;
          color: #7a9a98;
          line-height: 1.55;
          margin: 0;
          text-align: center;
        }

        .ne-progress-${uid} {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ne-pbar-${uid} {
          width: 100%; height: 8px;
          background: #e8e2d0;
          border-radius: 4px;
          overflow: hidden;
        }
        .ne-pfill-${uid} {
          height: 100%;
          background: ${accentColor};
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .ne-ptext-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          color: #5a7a78;
          text-align: center;
        }

        .ne-error-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          color: #c44a4a;
        }

        .ne-submit-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1a3c3c;
          background: ${accentColor};
          border: none;
          padding: 17px 40px;
          border-radius: 50px;
          cursor: pointer;
          align-self: center;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          margin-top: 4px;
          box-shadow: 0 6px 18px rgba(245, 183, 49, 0.25);
        }
        .ne-submit-${uid}:hover:not(:disabled) {
          background: #ffc94d;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(245, 183, 49, 0.4);
        }
        .ne-submit-${uid}:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .ne-share-inner-${uid} { padding: 36px 24px; border-radius: 18px; }
          .ne-row-${uid},
          .ne-media-row-${uid} { grid-template-columns: 1fr; }
          .ne-share-${uid} { padding: 56px 16px; }
        }
      `}</style>
    </div>
  );
}
