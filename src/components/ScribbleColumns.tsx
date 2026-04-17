"use client";

import React, { useEffect, useRef, useId } from "react";

interface ScribbleColumnsProps {
  col1Title?: string;
  col1Desc?: string;
  col2Title?: string;
  col2Desc?: string;
  col3Title?: string;
  col3Desc?: string;
}

export default function ScribbleColumns(props: ScribbleColumnsProps) {
  const {
    col1Title = "WHEN THEY'RE SICK",
    col1Desc = "Our insurance helps you get the diagnostics, treatment and Rx medicine they need to get better.",
    col2Title = "WHEN THEY'RE HURT",
    col2Desc = "Our insurance helps you give them the emergency care, surgery & rehab therapy it takes to recover.",
    col3Title = "WHEN THEY'RE HEALTHY",
    col3Desc = "Our preventive care pack helps you keep up with yearly check-ups, vaccines & lab tests.",
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

  // Split descriptions into lines (~35 chars each for SVG text)
  function splitLines(text: string, maxChars: number = 35): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      if ((current + " " + word).trim().length > maxChars && current) {
        lines.push(current);
        current = word;
      } else {
        current = current ? current + " " + word : word;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  const col1Lines = splitLines(col1Desc);
  const col2Lines = splitLines(col2Desc);
  const col3Lines = splitLines(col3Desc);

  return (
    <div className={`scribble-cols-root sc-root-${uid}`}>
      <svg ref={svgRef} className="sc-svg" viewBox="0 0 1320 420" fill="none">
        <defs>
          <filter id={`sk-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".02" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`sk2-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".028" numOctaves="2" seed="8" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Decorative scribble top-left */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".8s", "--dl": ".1s" } as any}
          stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 60 30 C 50 10, 75 0, 80 20 C 85 40, 60 45, 58 25 M 80 20 C 95 5, 115 15, 108 35" />

        {/* Large rounded card background */}
        <path className="f" style={{ "--dl": ".2s" } as any} filter={`url(#sk-${uid})`}
          d="M 80 70 C 80 45, 105 25, 140 25 L 1180 25 C 1215 25, 1240 45, 1240 70 L 1240 340 C 1240 365, 1215 385, 1180 385 L 140 385 C 105 385, 80 365, 80 340 Z"
          fill="#f0ece6" />

        {/* Column 1 — Pill/medicine icon */}
        <g filter={`url(#sk2-${uid})`}>
          <ellipse className="d" style={{ "--t": ".6s", "--dl": ".5s" } as any} cx="290" cy="110" rx="28" ry="18" stroke="#2c2c2c" strokeWidth="3" fill="none" transform="rotate(-20,290,110)" />
          <path className="d" style={{ "--t": ".3s", "--dl": ".8s" } as any} stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round" d="M 280 100 L 300 120" />
          <ellipse className="d" style={{ "--t": ".5s", "--dl": ".6s" } as any} cx="275" cy="135" rx="18" ry="10" stroke="#2c2c2c" strokeWidth="2.5" fill="none" />
          <path className="d" style={{ "--t": ".2s", "--dl": ".9s" } as any} stroke="#2c2c2c" strokeWidth="2" fill="none" d="M 262 128 L 288 128" />
        </g>
        <g className="t" style={{ "--dl": "1s" } as any}>
          <text x="290" y="190" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="700" fill="#1a1a1a" textAnchor="middle" letterSpacing="2">{col1Title}</text>
        </g>
        <g className="t" style={{ "--dl": "1.2s" } as any}>
          {col1Lines.map((line, i) => (
            <text key={i} x="290" y={225 + i * 22} fontFamily="'DM Sans', sans-serif" fontSize="14" fill="#666" textAnchor="middle">{line}</text>
          ))}
        </g>

        {/* Column 2 — Bandaid icon */}
        <g filter={`url(#sk2-${uid})`}>
          <path className="d" style={{ "--t": ".8s", "--dl": ".7s" } as any} stroke="#2c2c2c" strokeWidth="3" fill="none" strokeLinecap="round"
            d="M 635 90 C 620 75, 635 60, 650 75 L 690 115 C 705 130, 690 145, 675 130 Z" />
          <path className="d" style={{ "--t": ".8s", "--dl": ".8s" } as any} stroke="#2c2c2c" strokeWidth="3" fill="none" strokeLinecap="round"
            d="M 680 90 C 695 75, 710 90, 695 105 L 655 145 C 640 160, 625 145, 640 130 Z" />
          <circle className="pop" style={{ "--dl": "1.2s" } as any} cx="662" cy="112" r="3" fill="#2c2c2c" />
          <circle className="pop" style={{ "--dl": "1.3s" } as any} cx="675" cy="100" r="2.5" fill="#2c2c2c" />
          <circle className="pop" style={{ "--dl": "1.35s" } as any} cx="650" cy="125" r="2.5" fill="#2c2c2c" />
        </g>
        <g className="t" style={{ "--dl": "1.2s" } as any}>
          <text x="660" y="190" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="700" fill="#1a1a1a" textAnchor="middle" letterSpacing="2">{col2Title}</text>
        </g>
        <g className="t" style={{ "--dl": "1.4s" } as any}>
          {col2Lines.map((line, i) => (
            <text key={i} x="660" y={225 + i * 22} fontFamily="'DM Sans', sans-serif" fontSize="14" fill="#666" textAnchor="middle">{line}</text>
          ))}
        </g>

        {/* Column 3 — Calendar/checkup icon */}
        <g filter={`url(#sk2-${uid})`}>
          <rect className="d" style={{ "--t": ".8s", "--dl": ".9s" } as any} x="1000" y="78" rx="5" width="50" height="48" stroke="#2c2c2c" strokeWidth="3" fill="none" />
          <path className="d" style={{ "--t": ".2s", "--dl": "1.1s" } as any} stroke="#2c2c2c" strokeWidth="2.5" fill="none" d="M 1000 95 L 1050 95" />
          <path className="d" style={{ "--t": ".15s", "--dl": "1.15s" } as any} stroke="#2c2c2c" strokeWidth="3" fill="none" strokeLinecap="round" d="M 1015 72 L 1015 82" />
          <path className="d" style={{ "--t": ".15s", "--dl": "1.2s" } as any} stroke="#2c2c2c" strokeWidth="3" fill="none" strokeLinecap="round" d="M 1035 72 L 1035 82" />
          <path className="d" style={{ "--t": ".3s", "--dl": "1.4s" } as any} stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            d="M 1013 110 L 1022 118 L 1038 104" />
          <circle className="pop" style={{ "--dl": "1.3s" } as any} cx="1060" cy="82" r="5" fill="none" stroke="#2c2c2c" strokeWidth="2" />
          <circle className="pop" style={{ "--dl": "1.35s" } as any} cx="1060" cy="82" r="2" fill="#2c2c2c" />
        </g>
        <g className="t" style={{ "--dl": "1.4s" } as any}>
          <text x="1030" y="190" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="700" fill="#1a1a1a" textAnchor="middle" letterSpacing="2">{col3Title}</text>
        </g>
        <g className="t" style={{ "--dl": "1.6s" } as any}>
          {col3Lines.map((line, i) => (
            <text key={i} x="1030" y={225 + i * 22} fontFamily="'DM Sans', sans-serif" fontSize="14" fill="#666" textAnchor="middle">{line}</text>
          ))}
        </g>

        {/* Divider lines between columns */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".6s", "--dl": "1s" } as any} stroke="#d4cfc6" strokeWidth="1.5" fill="none" d="M 468 100 L 470 300" />
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".6s", "--dl": "1.1s" } as any} stroke="#d4cfc6" strokeWidth="1.5" fill="none" d="M 850 100 L 852 300" />

        {/* Decorative scribble bottom-right */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".8s", "--dl": "1.5s" } as any}
          stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round"
          d="M 1210 375 C 1225 385, 1220 405, 1205 400 C 1190 395, 1200 380, 1210 385 M 1205 400 C 1215 415, 1200 425, 1190 418" />
      </svg>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

        .sc-root-${uid} { max-width: 1440px; margin: 0 auto; padding: 60px 40px; }
        .sc-root-${uid} .sc-svg { width: 100%; display: block; overflow: visible; }

        .sc-root-${uid} .d { stroke-dasharray: var(--l); stroke-dashoffset: var(--l); }
        .sc-root-${uid} .d.on { animation: sc-dr-${uid} var(--t, 1.5s) cubic-bezier(.4,0,.2,1) var(--dl, 0s) forwards; }
        .sc-root-${uid} .f { opacity: 0; }
        .sc-root-${uid} .f.on { animation: sc-fi-${uid} .4s ease var(--dl, .5s) forwards; }
        .sc-root-${uid} .t { opacity: 0; }
        .sc-root-${uid} .t.on { animation: sc-fu-${uid} .6s ease var(--dl, 1s) forwards; }
        .sc-root-${uid} .pop { opacity: 0; transform-origin: center; transform-box: fill-box; }
        .sc-root-${uid} .pop.on { animation: sc-pi-${uid} .5s cubic-bezier(.34,1.56,.64,1) var(--dl, 0s) forwards; }

        @keyframes sc-dr-${uid} { to { stroke-dashoffset: 0 } }
        @keyframes sc-fi-${uid} { to { opacity: 1 } }
        @keyframes sc-fu-${uid} { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
        @keyframes sc-pi-${uid} { from { opacity:0; transform: scale(0) } to { opacity:1; transform: scale(1) } }

        @media (prefers-reduced-motion: reduce) {
          .sc-root-${uid} .d, .sc-root-${uid} .f, .sc-root-${uid} .t, .sc-root-${uid} .pop { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
