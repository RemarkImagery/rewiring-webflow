"use client";

import React, { useEffect, useId, useRef } from "react";

interface LinkValue {
  href: string;
  target?: string;
}

interface TccFuelTrackerProps {
  imageUrl?: string;
  imageAlt?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkValue;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  headingColor?: string;
  /** Jump-link target, e.g. "fuel-tracker" for #fuel-tracker. Blank = no anchor. */
  anchorId?: string;
}

export default function TccFuelTracker(props: TccFuelTrackerProps) {
  const {
    imageUrl = "https://rewiring-fuel-worker.oj-f3d.workers.dev/latest.png",
    imageAlt = "Live New Zealand fuel price tracker",
    heading = "Run on the sun, not the pump.",
    description = "Running on New Zealand-made energy made economic sense before the fuel crisis kicked off and it makes even more sense now that fuel prices have gone through the roof. You could shop around and get slightly cheaper petrol or diesel, but history suggests the price will keep going up. As this live price tracker shows, the best bet is to go electric and, if you can, run on the sun.",
    buttonText = "",
    buttonLink,
    bgColor = "#f5f1e8",
    accentColor = "#f5b731",
    textColor = "#2a2a2a",
    headingColor = "#1a3c3c",
    anchorId = "fuel-tracker",
  } = props;

  const uid = useId().replace(/:/g, "");
  const showButton = Boolean(buttonText && buttonText.trim().length > 0);
  const anchor = anchorId.trim().replace(/^#/, "");
  const sectionRef = useRef<HTMLElement>(null);

  // Webflow renders code components in a shadow root, so an id on the section
  // alone can't be reached by #hash links. Mirror it onto the shadow host, and
  // scroll on mount in case the page loaded with the hash before we rendered.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !anchor) return;
    const root = el.getRootNode();
    const host = root instanceof ShadowRoot ? (root.host as HTMLElement) : null;
    if (host && !host.id) {
      host.id = anchor;
      host.style.scrollMarginTop = "80px";
    }
    const releaseHost = () => {
      if (host && host.id === anchor) host.removeAttribute("id");
    };
    if (window.location.hash !== `#${anchor}`) return releaseHost;

    // Lazy-loaded CMS items above keep growing the page after the first jump,
    // pushing the tracker down. Re-pin it on every layout change until things
    // settle or the reader starts scrolling themselves.
    const jump = () => el.scrollIntoView();
    jump();
    const ro = new ResizeObserver(jump);
    ro.observe(document.body);
    const userEvents = ["wheel", "touchstart", "keydown", "mousedown"];
    const stop = () => {
      ro.disconnect();
      window.clearTimeout(timer);
      userEvents.forEach((e) => window.removeEventListener(e, stop));
    };
    const timer = window.setTimeout(stop, 8000);
    userEvents.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    return () => {
      stop();
      releaseHost();
    };
  }, [anchor]);

  return (
    <section
      ref={sectionRef}
      className={`tcc-fuel-${uid}`}
      {...(anchor ? { id: anchor } : {})}
    >
      <div className={`tcc-fuel-inner-${uid}`}>
        <div className={`tcc-fuel-media-${uid}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`tcc-fuel-img-${uid}`}
            loading="lazy"
          />
        </div>


        <div className={`tcc-fuel-content-${uid}`}>
          <h2 className={`tcc-fuel-heading-${uid}`}>{heading}</h2>
          <p className={`tcc-fuel-text-${uid}`}>{description}</p>
          <p className={`tcc-fuel-source-${uid}`}>
            Petrol and diesel prices sourced from{" "}
            <a href="https://gaspy.nz" target="_blank" rel="noopener noreferrer">
              Gaspy
            </a>
            . See our{" "}
            <a
              href="https://www.rewiring.nz/news/methodology-for-equivalent-fuel-price-calculations"
              target="_blank"
              rel="noopener noreferrer"
            >
              methodology for equivalent fuel price calculations
            </a>
            .
          </p>
          {showButton && (
            <a
              href={buttonLink?.href || "#"}
              target={buttonLink?.target}
              className={`tcc-fuel-btn-${uid}`}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        .tcc-fuel-${uid} {
          width: 100%;
          background: ${bgColor};
          padding: 80px 24px;
          box-sizing: border-box;
          font-family: 'Rubik', sans-serif;
          scroll-margin-top: 80px;
        }

        .tcc-fuel-inner-${uid} {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .tcc-fuel-media-${uid} {
          background: transparent;
        }

        .tcc-fuel-img-${uid} {
          display: block;
          width: 100%;
          height: auto;
          background: transparent;
        }

        .tcc-fuel-content-${uid} {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .tcc-fuel-heading-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          font-weight: 700;
          color: ${headingColor};
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .tcc-fuel-text-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          font-weight: 400;
          color: ${textColor};
          margin: 0;
          line-height: 1.65;
        }

        .tcc-fuel-source-${uid} {
          font-family: 'Rubik', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: ${textColor};
          opacity: 0.7;
          margin: 0;
          line-height: 1.5;
        }

        .tcc-fuel-source-${uid} a {
          color: ${headingColor};
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .tcc-fuel-source-${uid} a:hover {
          opacity: 0.75;
        }

        .tcc-fuel-btn-${uid} {
          align-self: flex-start;
          display: inline-block;
          font-family: 'Rubik', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a3c3c;
          background: ${accentColor};
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          margin-top: 6px;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .tcc-fuel-btn-${uid}:hover {
          background: #ffc94d;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .tcc-fuel-${uid} { padding: 56px 20px; }
          .tcc-fuel-inner-${uid} {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
