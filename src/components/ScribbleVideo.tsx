"use client";

import React, { useEffect, useRef, useId, useState } from "react";

interface ScribbleVideoProps {
  heading?: string;
  accentWord?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnail?: any;
  accentColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function ScribbleVideo(props: ScribbleVideoProps) {
  const {
    heading = "See it in",
    accentWord = "action",
    subtitle = "Watch how it all comes together — hit play to find out.",
    videoUrl = "",
    thumbnail,
    accentColor = "#8b6db5",
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const [playing, setPlaying] = useState(false);

  const thumbSrc = resolveImage(thumbnail);
  const videoId = extractYouTubeId(videoUrl);
  const autoThumb = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined;
  const displayThumb = thumbSrc || autoThumb;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const trigger = () => {
      svg.querySelectorAll(".d").forEach((p) => {
        const el = p as SVGGeometryElement;
        if (el.getTotalLength) {
          el.style.setProperty("--l", String(Math.ceil(el.getTotalLength())));
        }
      });
      svg.querySelectorAll(".d,.f,.t,.pop").forEach((el) => el.classList.add("on"));
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { trigger(); obs.unobserve(svg); }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`scribble-video-root sv-root-${uid}`}>
      <svg ref={svgRef} className="sv-svg" viewBox="0 0 1320 780" fill="none">
        <defs>
          <filter id={`svsk-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`svsk2-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".028" numOctaves="2" seed="14" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id={`vid-clip-${uid}`}>
            <rect x="185" y="195" width="950" height="535" rx="12" />
          </clipPath>
        </defs>

        {/* Decorative scribble — top left curl */}
        <path className="d" filter={`url(#svsk2-${uid})`} style={{ "--t": "1s", "--dl": ".2s" } as any}
          stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 90 50 C 75 28, 105 10, 115 35 C 125 60, 90 68, 88 45 M 115 35 C 130 18, 152 28, 148 50 C 144 68, 122 62, 126 44" />

        {/* Heading */}
        <g className="t" style={{ "--dl": ".3s" } as any}>
          <text x="660" y="100" fontFamily="'Playfair Display', serif" fontSize="52" fontWeight="700" fill="#1a1a1a" textAnchor="middle">
            {heading} <tspan fontFamily="'Caveat', cursive" fontSize="62" fill={accentColor}>{accentWord}</tspan>
          </text>
        </g>

        {/* Scribble underline under accent */}
        <path className="d" filter={`url(#svsk2-${uid})`} style={{ "--t": ".8s", "--dl": ".8s" } as any}
          stroke={accentColor} strokeWidth="3" fill="none" strokeLinecap="round"
          d="M 580 115 C 630 108, 700 118, 760 110 C 800 105, 820 114, 800 117" />

        {/* Subtitle */}
        <g className="t" style={{ "--dl": ".6s" } as any}>
          <text x="660" y="155" fontFamily="'DM Sans', sans-serif" fontSize="17" fill="#777" textAnchor="middle">{subtitle}</text>
        </g>

        {/* === Video frame — hand-drawn rounded rectangle === */}
        <path className="d" filter={`url(#svsk-${uid})`} style={{ "--t": "2s", "--dl": ".4s" } as any}
          stroke="#2c2c2c" strokeWidth="3.5" fill="none" strokeLinecap="round"
          d="M 210 195 L 1110 192 C 1135 192, 1145 205, 1143 220 L 1138 705 C 1136 722, 1125 733, 1105 735 L 215 738 C 192 739, 180 727, 182 710 L 187 218 C 189 202, 200 194, 210 195 Z" />

        {/* Inner fill */}
        <path className="f" style={{ "--dl": ".5s" } as any}
          d="M 215 200 L 1105 197 C 1128 197, 1137 208, 1135 222 L 1130 700 C 1128 716, 1118 726, 1100 728 L 220 730 C 198 731, 188 720, 190 705 L 195 222 C 197 207, 206 199, 215 200 Z"
          fill="#1a1a1a" />

        {/* Thumbnail image inside frame */}
        {displayThumb && !playing && (
          <image className="f" style={{ "--dl": ".8s" } as any}
            href={displayThumb} x="185" y="195" width="950" height="535"
            clipPath={`url(#vid-clip-${uid})`} preserveAspectRatio="xMidYMid slice" opacity="0.9" />
        )}

        {/* Play button scribble circle + triangle (shown when not playing) */}
        {!playing && (
          <>
            <circle className="d" filter={`url(#svsk2-${uid})`} style={{ "--t": "1s", "--dl": "1s" } as any}
              cx="660" cy="462" r="55" stroke="white" strokeWidth="3.5" fill="none" />
            <circle className="f" style={{ "--dl": "1.2s" } as any}
              cx="660" cy="462" r="53" fill="rgba(0,0,0,0.4)" />
            {/* Play triangle */}
            <path className="d" filter={`url(#svsk2-${uid})`} style={{ "--t": ".5s", "--dl": "1.3s" } as any}
              stroke="white" strokeWidth="3" fill="white" strokeLinecap="round" strokeLinejoin="round"
              d="M 645 438 L 645 486 L 685 462 Z" />
          </>
        )}

        {/* Decorative film-strip scribbles on sides */}
        {/* Left side sprocket holes */}
        <g filter={`url(#svsk2-${uid})`}>
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.2s" } as any} x="155" y="240" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.3s" } as any} x="155" y="310" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.4s" } as any} x="155" y="380" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.5s" } as any} x="155" y="450" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.6s" } as any} x="155" y="520" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.7s" } as any} x="155" y="590" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.8s" } as any} x="155" y="660" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
        </g>
        {/* Right side sprocket holes */}
        <g filter={`url(#svsk2-${uid})`}>
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.25s" } as any} x="1148" y="240" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.35s" } as any} x="1148" y="310" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.45s" } as any} x="1148" y="380" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.55s" } as any} x="1148" y="450" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.65s" } as any} x="1148" y="520" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.75s" } as any} x="1148" y="590" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
          <rect className="d" style={{ "--t": ".3s", "--dl": "1.85s" } as any} x="1148" y="660" width="18" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
        </g>

        {/* Decorative dots */}
        <circle className="pop" style={{ "--dl": "1s" } as any} cx="130" cy="180" r="4" fill={accentColor} />
        <circle className="pop" style={{ "--dl": "1.1s" } as any} cx="145" cy="200" r="3" fill={accentColor} opacity="0.5" />
        <circle className="pop" style={{ "--dl": "1.2s" } as any} cx="1190" cy="185" r="4" fill={accentColor} />
        <circle className="pop" style={{ "--dl": "1.3s" } as any} cx="1175" cy="205" r="3" fill={accentColor} opacity="0.5" />

        {/* Decorative scribble — bottom right curl */}
        <path className="d" filter={`url(#svsk2-${uid})`} style={{ "--t": ".8s", "--dl": "1.5s" } as any}
          stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round"
          d="M 1200 740 C 1218 752, 1212 775, 1195 770 C 1178 765, 1188 748, 1200 752 M 1195 770 C 1208 785, 1192 798, 1178 790" />

        {/* Small sparkle near heading */}
        <g filter={`url(#svsk2-${uid})`}>
          <path className="d" style={{ "--t": ".2s", "--dl": ".5s" } as any} stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round"
            d="M 850 55 L 850 72 M 842 63 L 858 63" />
          <path className="d" style={{ "--t": ".15s", "--dl": ".7s" } as any} stroke={accentColor} strokeWidth="1.5" fill="none" strokeLinecap="round"
            d="M 460 70 L 460 80 M 455 75 L 465 75" />
        </g>

        {/* "No video" placeholder text */}
        {!videoId && !displayThumb && (
          <g className="t" style={{ "--dl": "1s" } as any}>
            <text x="660" y="460" fontFamily="'Caveat', cursive" fontSize="28" fill="#555" textAnchor="middle">Paste a YouTube URL to preview</text>
          </g>
        )}
      </svg>

      {/* Click-to-play overlay + iframe */}
      {videoId && !playing && (
        <div className={`sv-play-overlay sv-overlay-${uid}`} onClick={() => setPlaying(true)} role="button" aria-label="Play video" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPlaying(true); } }} />
      )}
      {videoId && playing && (
        <div className={`sv-iframe-wrap sv-iframe-${uid}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

        .sv-root-${uid} {
          max-width: 1440px;
          margin: 0 auto;
          padding: 60px 40px;
          position: relative;
        }
        .sv-root-${uid} .sv-svg {
          width: 100%;
          display: block;
          overflow: visible;
        }

        /* Animation classes */
        .sv-root-${uid} .d { stroke-dasharray: var(--l); stroke-dashoffset: var(--l); }
        .sv-root-${uid} .d.on { animation: sv-dr-${uid} var(--t, 1.5s) cubic-bezier(.4,0,.2,1) var(--dl, 0s) forwards; }
        .sv-root-${uid} .f { opacity: 0; }
        .sv-root-${uid} .f.on { animation: sv-fi-${uid} .4s ease var(--dl, .5s) forwards; }
        .sv-root-${uid} .t { opacity: 0; }
        .sv-root-${uid} .t.on { animation: sv-fu-${uid} .6s ease var(--dl, 1s) forwards; }
        .sv-root-${uid} .pop { opacity: 0; transform-origin: center; transform-box: fill-box; }
        .sv-root-${uid} .pop.on { animation: sv-pi-${uid} .5s cubic-bezier(.34,1.56,.64,1) var(--dl, 0s) forwards; }

        @keyframes sv-dr-${uid} { to { stroke-dashoffset: 0 } }
        @keyframes sv-fi-${uid} { to { opacity: 1 } }
        @keyframes sv-fu-${uid} { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
        @keyframes sv-pi-${uid} { from { opacity:0; transform: scale(0) } to { opacity:1; transform: scale(1) } }

        /* Play overlay — clickable area over the video frame */
        .sv-overlay-${uid} {
          position: absolute;
          top: 25%;
          left: 14%;
          width: 72%;
          height: 68.5%;
          cursor: pointer;
          z-index: 10;
          border-radius: 12px;
        }
        .sv-overlay-${uid}:hover ~ svg .sv-play-hover,
        .sv-overlay-${uid}:focus-visible {
          outline: 2px solid ${accentColor};
          outline-offset: 4px;
        }

        /* Iframe container — same position as the video frame */
        .sv-iframe-${uid} {
          position: absolute;
          top: 25.5%;
          left: 14.5%;
          width: 71%;
          height: 67.5%;
          z-index: 20;
          border-radius: 10px;
          overflow: hidden;
        }
        .sv-iframe-${uid} iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 10px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sv-root-${uid} .d, .sv-root-${uid} .f, .sv-root-${uid} .t, .sv-root-${uid} .pop { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; }
        }

        @media (max-width: 767px) {
          .sv-root-${uid} { padding: 30px 16px; }
        }
      `}</style>
    </div>
  );
}
