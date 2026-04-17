"use client";

import React, { useEffect, useRef, useId, useState } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface BoltFormProps {
  heading?: string;
  subheading?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  submitText?: string;
  formAction?: string;
  accentColor?: string;
  boltColor?: string;
}

export default function BoltForm(props: BoltFormProps) {
  const {
    heading = "Get In Touch",
    subheading = "We'd love to hear from you. Send us a message and we'll get back to you shortly.",
    namePlaceholder = "Your Name",
    emailPlaceholder = "Your Email",
    messagePlaceholder = "Your Message",
    submitText = "Submit ⚡",
    formAction = "",
    accentColor = "#f5c518",
    boltColor = "#1a1a2e",
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

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
    <div className={`bolt-form-root bf-root-${uid}`}>
      {/* Background SVG layer with bolts and frame */}
      <svg ref={svgRef} className="bf-svg" viewBox="0 0 1320 700" fill="none">
        <defs>
          <filter id={`bsk-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".02" numOctaves="2" seed="5" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`bsk2-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".03" numOctaves="2" seed="12" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Main frame — hand-drawn rounded rectangle */}
        <path className="d" filter={`url(#bsk-${uid})`} style={{ "--t": "2s", "--dl": ".1s" } as any}
          stroke={boltColor} strokeWidth="3.5" fill="none" strokeLinecap="round"
          d="M 140 60 L 1180 55 C 1210 55, 1230 75, 1228 100 L 1225 600 C 1223 630, 1200 648, 1175 650 L 145 655 C 115 657, 95 635, 97 608 L 100 95 C 102 68, 120 58, 140 60 Z" />

        {/* Inner background fill */}
        <path className="f" style={{ "--dl": ".3s" } as any}
          d="M 150 70 L 1170 67 C 1195 67, 1215 83, 1213 105 L 1210 595 C 1208 618, 1190 633, 1165 635 L 155 638 C 130 639, 112 623, 114 600 L 117 100 C 119 78, 135 69, 150 70 Z"
          fill="#faf7f2" />

        {/* === LARGE BOLT — top left, outside frame === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.6s", "--dl": ".5s" } as any}
            stroke={accentColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 80 30 L 55 95 L 90 90 L 65 155" />
          <path className="f" style={{ "--dl": ".8s" } as any}
            d="M 80 30 L 55 95 L 90 90 L 65 155 L 88 92 L 53 97 Z"
            fill={accentColor} opacity="0.15" />
        </g>

        {/* === MEDIUM BOLT — top right, outside frame === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.5s", "--dl": ".7s" } as any}
            stroke={accentColor} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 1260 80 L 1240 130 L 1268 126 L 1248 175" />
        </g>

        {/* === SMALL BOLT — bottom left, outside frame === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.4s", "--dl": "1s" } as any}
            stroke={boltColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 55 550 L 42 590 L 60 587 L 48 625" />
        </g>

        {/* === LARGE BOLT — bottom right, outside frame === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.6s", "--dl": ".9s" } as any}
            stroke={accentColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 1280 520 L 1255 590 L 1290 585 L 1265 655" />
          <path className="f" style={{ "--dl": "1.2s" } as any}
            d="M 1280 520 L 1255 590 L 1290 585 L 1265 655 L 1288 587 L 1253 592 Z"
            fill={accentColor} opacity="0.15" />
        </g>

        {/* === TINY BOLT — inside frame, left side === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.3s", "--dl": "1.2s" } as any}
            stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 185 150 L 177 175 L 192 173 L 184 198" />
        </g>

        {/* === SMALL BOLT — inside frame, right of heading === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.4s", "--dl": "1.1s" } as any}
            stroke={boltColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 1100 130 L 1088 165 L 1108 161 L 1095 195" />
        </g>

        {/* === MEDIUM BOLT — inside frame, bottom right === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.5s", "--dl": "1.3s" } as any}
            stroke={accentColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 1080 520 L 1065 560 L 1088 556 L 1072 595" />
        </g>

        {/* === TINY BOLT — inside frame, bottom left === */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.25s", "--dl": "1.4s" } as any}
            stroke={boltColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 230 560 L 224 580 L 236 578 L 230 598" />
        </g>

        {/* Spark dots near bolts */}
        <circle className="pop" style={{ "--dl": "1s" } as any} cx="100" cy="35" r="4" fill={accentColor} />
        <circle className="pop" style={{ "--dl": "1.1s" } as any} cx="50" cy="70" r="3" fill={accentColor} opacity="0.5" />
        <circle className="pop" style={{ "--dl": "1.2s" } as any} cx="1290" cy="65" r="3" fill={accentColor} />
        <circle className="pop" style={{ "--dl": "1.3s" } as any} cx="1300" cy="540" r="4" fill={accentColor} opacity="0.6" />
        <circle className="pop" style={{ "--dl": "1.4s" } as any} cx="40" cy="615" r="3" fill={boltColor} opacity="0.4" />
        <circle className="pop" style={{ "--dl": "1.15s" } as any} cx="1120" cy="125" r="3" fill={accentColor} opacity="0.4" />
        <circle className="pop" style={{ "--dl": "1.35s" } as any} cx="170" cy="190" r="2.5" fill={accentColor} opacity="0.5" />

        {/* Heading */}
        <g className="t" style={{ "--dl": ".6s" } as any}>
          <text x="660" y="150" fontFamily="'Caveat', cursive" fontSize="60" fontWeight="700" fill={boltColor} textAnchor="middle">{heading}</text>
        </g>

        {/* Scribble underline under heading */}
        <path className="d" filter={`url(#bsk2-${uid})`} style={{ "--t": ".8s", "--dl": "1s" } as any}
          stroke={accentColor} strokeWidth="3.5" fill="none" strokeLinecap="round"
          d="M 480 165 C 540 158, 640 170, 720 162 C 800 155, 860 165, 840 168" />

        {/* Subheading */}
        <g className="t" style={{ "--dl": ".9s" } as any}>
          <text x="660" y="210" fontFamily="'DM Sans', sans-serif" fontSize="16" fill="#777" textAnchor="middle">{subheading}</text>
        </g>

        {/* Hand-drawn form field outlines */}
        {/* Name field */}
        <path className="d" filter={`url(#bsk2-${uid})`} style={{ "--t": "1s", "--dl": "1s" } as any}
          stroke={boltColor} strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 360 260 L 960 258 C 975 258, 978 262, 978 275 L 976 305 C 976 318, 972 322, 958 322 L 360 324 C 345 324, 342 320, 342 307 L 344 277 C 344 264, 348 260, 360 260 Z" />

        {/* Email field */}
        <path className="d" filter={`url(#bsk2-${uid})`} style={{ "--t": "1s", "--dl": "1.2s" } as any}
          stroke={boltColor} strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 360 355 L 960 353 C 975 353, 978 357, 978 370 L 976 400 C 976 413, 972 417, 958 417 L 360 419 C 345 419, 342 415, 342 402 L 344 372 C 344 359, 348 355, 360 355 Z" />

        {/* Message field (taller) */}
        <path className="d" filter={`url(#bsk2-${uid})`} style={{ "--t": "1.2s", "--dl": "1.4s" } as any}
          stroke={boltColor} strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 360 450 L 960 448 C 975 448, 978 452, 978 465 L 976 545 C 976 558, 972 562, 958 562 L 360 564 C 345 564, 342 560, 342 547 L 344 467 C 344 454, 348 450, 360 450 Z" />

        {/* Submit button — hand-drawn */}
        <path className="d" filter={`url(#bsk-${uid})`} style={{ "--t": ".6s", "--dl": "1.6s" } as any}
          stroke={boltColor} strokeWidth="3.5" fill={boltColor} strokeLinecap="round"
          d="M 570 590 L 750 588 C 768 588, 770 595, 770 608 L 768 632 C 768 645, 764 650, 748 650 L 572 652 C 555 652, 552 646, 552 633 L 554 610 C 554 596, 558 590, 570 590 Z" />
        <g className="t" style={{ "--dl": "1.9s" } as any}>
          <text x="660" y="628" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="700" fill="white" textAnchor="middle">{submitText}</text>
        </g>

        {/* Small decorative bolt next to submit */}
        <g filter={`url(#bsk2-${uid})`}>
          <path className="d" style={{ "--t": "0.3s", "--dl": "1.8s" } as any}
            stroke={accentColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 785 600 L 778 620 L 792 617 L 785 637" />
        </g>
      </svg>

      {/* HTML form overlay positioned on top of SVG */}
      <div className={`bf-form-overlay bf-overlay-${uid}`}>
        <form action={formAction || undefined} method={formAction ? "POST" : undefined} onSubmit={formAction ? undefined : (e) => e.preventDefault()}>
          <input type="text" name="name" placeholder={namePlaceholder} className="bf-input bf-input-name" required />
          <input type="email" name="email" placeholder={emailPlaceholder} className="bf-input bf-input-email" required />
          <textarea name="message" placeholder={messagePlaceholder} className="bf-input bf-input-msg" rows={3} />
          <button type="submit" className="bf-submit">{submitText}</button>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');

        .bf-root-${uid} {
          max-width: 1440px;
          margin: 0 auto;
          padding: 60px 40px;
          position: relative;
        }
        .bf-root-${uid} .bf-svg {
          width: 100%;
          display: block;
          overflow: visible;
        }

        /* Animation classes */
        .bf-root-${uid} .d { stroke-dasharray: var(--l); stroke-dashoffset: var(--l); }
        .bf-root-${uid} .d.on { animation: bf-dr-${uid} var(--t, 1.5s) cubic-bezier(.4,0,.2,1) var(--dl, 0s) forwards; }
        .bf-root-${uid} .f { opacity: 0; }
        .bf-root-${uid} .f.on { animation: bf-fi-${uid} .4s ease var(--dl, .5s) forwards; }
        .bf-root-${uid} .t { opacity: 0; }
        .bf-root-${uid} .t.on { animation: bf-fu-${uid} .6s ease var(--dl, 1s) forwards; }
        .bf-root-${uid} .pop { opacity: 0; transform-origin: center; transform-box: fill-box; }
        .bf-root-${uid} .pop.on { animation: bf-pi-${uid} .5s cubic-bezier(.34,1.56,.64,1) var(--dl, 0s) forwards; }

        @keyframes bf-dr-${uid} { to { stroke-dashoffset: 0 } }
        @keyframes bf-fi-${uid} { to { opacity: 1 } }
        @keyframes bf-fu-${uid} { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
        @keyframes bf-pi-${uid} { from { opacity:0; transform: scale(0) } to { opacity:1; transform: scale(1) } }

        /* Form overlay — positioned over the SVG fields */
        .bf-overlay-${uid} {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .bf-overlay-${uid} form {
          position: absolute;
          /* These percentages align with the SVG viewBox coordinates */
          top: 37%;
          left: 26.5%;
          width: 47%;
          display: flex;
          flex-direction: column;
          gap: 1.2vw;
          pointer-events: auto;
        }
        .bf-overlay-${uid} .bf-input {
          width: 100%;
          padding: 0.7vw 1vw;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1.1vw, 16px);
          background: transparent;
          border: none;
          outline: none;
          color: #1a1a1a;
        }
        .bf-overlay-${uid} .bf-input::placeholder {
          color: #aaa;
          font-family: 'Caveat', cursive;
          font-size: clamp(13px, 1.2vw, 18px);
        }
        .bf-overlay-${uid} .bf-input-msg {
          resize: none;
          min-height: 5vw;
        }
        .bf-overlay-${uid} .bf-submit {
          align-self: center;
          margin-top: 0.5vw;
          padding: 0.6vw 3vw;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1.1vw, 16px);
          font-weight: 700;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0;
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .bf-root-${uid} .d, .bf-root-${uid} .f, .bf-root-${uid} .t, .bf-root-${uid} .pop { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; }
        }

        @media (max-width: 767px) {
          .bf-root-${uid} { padding: 30px 16px; }
          .bf-overlay-${uid} form {
            top: 38%;
            left: 22%;
            width: 56%;
            gap: 2.5vw;
          }
          .bf-overlay-${uid} .bf-input {
            padding: 1.5vw 2vw;
          }
        }
      `}</style>
    </div>
  );
}
