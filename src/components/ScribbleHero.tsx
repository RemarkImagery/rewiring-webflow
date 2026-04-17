"use client";

import React, { useEffect, useRef, useId } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface ScribbleHeroProps {
  headingLine1?: string;
  headingLine2?: string;
  accentWord?: string;
  subtitle1?: string;
  subtitle2?: string;
  ctaText?: string;
  ctaLink?: LinkValue;
  image?: any;
  accentColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

export default function ScribbleHero(props: ScribbleHeroProps) {
  const {
    headingLine1 = "The best way to",
    headingLine2 = "take care of your",
    accentWord = "pet",
    subtitle1 = "We offer pet health insurance plans for illness, injury and wellness care.",
    subtitle2 = "New, chronic and pre-existing illnesses are covered at no additional cost.",
    ctaText = "Get Started →",
    ctaLink,
    image,
    accentColor = "#8b6db5",
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const imgSrc = resolveImage(image);

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
          if (e.isIntersecting) {
            trigger();
            obs.unobserve(svg);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  // Measure accent word x position (after heading line 2)
  const h2Len = headingLine2.length;
  const accentX = 200 + h2Len * 28;

  return (
    <div className={`scribble-hero-root sh-root-${uid}`}>
      <svg ref={svgRef} className="sh-svg" viewBox="0 0 1320 600" fill="none">
        <defs>
          <filter id={`sk-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".02" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`sk2-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence baseFrequency=".028" numOctaves="2" seed="8" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {imgSrc && (
            <clipPath id={`circle-clip-${uid}`}>
              <circle cx="1000" cy="310" r="138" />
            </clipPath>
          )}
        </defs>

        {/* Decorative scribble — top left curl */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": "1s", "--dl": ".2s" } as any}
          stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round"
          d="M 80 60 C 65 35, 95 15, 105 40 C 115 65, 80 75, 75 50 M 105 40 C 120 20, 145 30, 140 55 C 135 75, 110 70, 115 50" />

        {/* Large soft background shape */}
        <path className="f" style={{ "--dl": ".1s" } as any} filter={`url(#sk-${uid})`}
          d="M 100 140 C 100 110, 130 90, 170 90 L 1150 90 C 1190 90, 1220 110, 1220 140 L 1220 480 C 1220 510, 1190 530, 1150 530 L 170 530 C 130 530, 100 510, 100 480 Z"
          fill="#f0ece6" />

        {/* Hero text */}
        <g className="t" style={{ "--dl": ".4s" } as any}>
          <text x="200" y="240" fontFamily="'Playfair Display', serif" fontSize="64" fontWeight="700" fill="#1a1a1a">{headingLine1}</text>
        </g>
        <g className="t" style={{ "--dl": ".6s" } as any}>
          <text x="200" y="320" fontFamily="'Playfair Display', serif" fontSize="64" fontWeight="700" fill="#1a1a1a">{headingLine2} </text>
          <text x={accentX} y="320" fontFamily="'Caveat', cursive" fontSize="72" fontWeight="700" fill={accentColor}>{accentWord}</text>
        </g>

        {/* Scribble underline under accent word */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".8s", "--dl": "1s" } as any}
          stroke={accentColor} strokeWidth="3" fill="none" strokeLinecap="round"
          d={`M ${accentX - 2} 335 C ${accentX + 20} 330, ${accentX + 50} 340, ${accentX + 75} 332 C ${accentX + 90} 327, ${accentX + 100} 335, ${accentX + 80} 338`} />

        {/* Subtitle */}
        <g className="t" style={{ "--dl": "1s" } as any}>
          <text x="200" y="390" fontFamily="'DM Sans', sans-serif" fontSize="17" fill="#666">{subtitle1}</text>
        </g>
        <g className="t" style={{ "--dl": "1.1s" } as any}>
          <text x="200" y="415" fontFamily="'DM Sans', sans-serif" fontSize="17" fill="#666">{subtitle2}</text>
        </g>

        {/* CTA button */}
        <path className="d" filter={`url(#sk-${uid})`} style={{ "--t": ".6s", "--dl": "1.2s" } as any}
          stroke="#2c2c2c" strokeWidth="4" fill="#2c2c2c" strokeLinecap="round"
          d="M 226 445 L 380 445 C 406 445, 380 497, 380 497 L 200 497 C 200 497, 200 445, 226 445 Z" />
        <g className="t" style={{ "--dl": "1.5s" } as any}>
          <text x="240" y="479" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="700" fill="white">{ctaText}</text>
        </g>
        {/* Invisible click target over button */}
        {ctaLink && (
          <a href={ctaLink.href} target={ctaLink.target}>
            <rect x="200" y="445" width="206" height="52" fill="transparent" style={{ cursor: "pointer" }} />
          </a>
        )}

        {/* Image circle */}
        <circle className="d" filter={`url(#sk-${uid})`} cx="1000" cy="310" r="140"
          style={{ "--t": "1.5s", "--dl": ".6s" } as any}
          stroke="#e8c8a0" strokeWidth="4" fill="#f5ead8" />
        {imgSrc ? (
          <image
            className="f" style={{ "--dl": "1s" } as any}
            href={imgSrc} x="862" y="172" width="276" height="276"
            clipPath={`url(#circle-clip-${uid})`} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <g className="t" style={{ "--dl": "1.2s" } as any}>
            <text x="1000" y="315" fontFamily="'DM Sans', sans-serif" fontSize="16" fill="#c4a878" textAnchor="middle">Photo</text>
          </g>
        )}

        {/* Small decorative dots */}
        <circle className="pop" style={{ "--dl": "1.3s" } as any} cx="830" cy="140" r="5" fill="#e8c8a0" />
        <circle className="pop" style={{ "--dl": "1.4s" } as any} cx="860" cy="160" r="3" fill="#d4b898" />
        <circle className="pop" style={{ "--dl": "1.5s" } as any} cx="845" cy="180" r="4" fill="#c4a878" />

        {/* Bottom right decorative curl */}
        <path className="d" filter={`url(#sk2-${uid})`} style={{ "--t": ".8s", "--dl": "1.4s" } as any}
          stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round"
          d="M 1180 520 C 1200 535, 1190 560, 1170 555 C 1150 550, 1160 530, 1180 535 M 1170 555 C 1185 575, 1165 590, 1150 580" />
      </svg>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

        .sh-root-${uid} { max-width: 1440px; margin: 0 auto; padding: 60px 40px; }
        .sh-root-${uid} .sh-svg { width: 100%; display: block; overflow: visible; }

        .sh-root-${uid} .d { stroke-dasharray: var(--l); stroke-dashoffset: var(--l); }
        .sh-root-${uid} .d.on { animation: sh-dr-${uid} var(--t, 1.5s) cubic-bezier(.4,0,.2,1) var(--dl, 0s) forwards; }
        .sh-root-${uid} .f { opacity: 0; }
        .sh-root-${uid} .f.on { animation: sh-fi-${uid} .4s ease var(--dl, .5s) forwards; }
        .sh-root-${uid} .t { opacity: 0; }
        .sh-root-${uid} .t.on { animation: sh-fu-${uid} .6s ease var(--dl, 1s) forwards; }
        .sh-root-${uid} .pop { opacity: 0; transform-origin: center; transform-box: fill-box; }
        .sh-root-${uid} .pop.on { animation: sh-pi-${uid} .5s cubic-bezier(.34,1.56,.64,1) var(--dl, 0s) forwards; }

        @keyframes sh-dr-${uid} { to { stroke-dashoffset: 0 } }
        @keyframes sh-fi-${uid} { to { opacity: 1 } }
        @keyframes sh-fu-${uid} { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
        @keyframes sh-pi-${uid} { from { opacity:0; transform: scale(0) } to { opacity:1; transform: scale(1) } }

        @media (prefers-reduced-motion: reduce) {
          .sh-root-${uid} .d, .sh-root-${uid} .f, .sh-root-${uid} .t, .sh-root-${uid} .pop { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
