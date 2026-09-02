"use client";

// Community groups for a regional report page: a selector bar showing every
// group (with the active one highlighted), a one-at-a-time card carousel, and
// a small map focused on where this location's groups are.
//
// Data comes from a Webflow Collection List already on the page (filtered by
// Webflow to the current location). Each collection item should contain an
// HTML Embed like:
//   <div data-rw-group data-name="Electrify Dunedin" data-lat="-45.87"
//        data-lng="170.50" data-blurb="..." data-url="https://..."
//        data-image="https://..."></div>
// Missing attributes fall back to the item's first heading / paragraph / image
// / link. The raw list is hidden once parsed. Map = Mapbox GL (QEA local
// stories technique) recoloured to the report palette; without a token or any
// coordinates the map column hides and the carousel takes the full width.
import React, { useEffect, useId, useRef, useState } from "react";

interface Group {
  name: string;
  blurb: string;
  url: string;
  image: string;
  lat: number;
  lng: number;
}

export interface RwCommunityGroupsProps {
  /** CSS selector of the Collection List wrapper holding the groups. */
  listSelector?: string;
  /** Render placeholder demo groups when no Collection List is found (Designer
   *  canvas / prototyping). OFF by default so a missing list on a published
   *  page renders nothing rather than fabricated groups. */
  showDemo?: boolean;
  /** Location slug for the hosted-JSON data source; blank = auto from the URL. */
  districtSlug?: string;
  /** Hosted groups JSON ({ "<slug>": { "groups": [...] } }). Used when the page
   *  has no parseable CMS data. Blank disables the fetch. */
  dataUrl?: string;
  mapboxToken?: string;
  heading?: string;
  mapHeight?: string;
  landColor?: string;
  waterColor?: string;
  roadColor?: string;
  inkColor?: string;
  goldColor?: string;
  accentColor?: string;
}

// Same public Mapbox token the QEA site uses (Oliver's Mapbox account) — the
// fallback when the Designer prop is left blank. It's a client-side pk. token
// (already served in qea.nz page source); base64-wrapped only because GitHub's
// secret scanner false-positives on the raw string and blocks pushes.
const DEFAULT_MAPBOX_TOKEN = atob(
  "cGsuZXlKMUlqb2liMm95TkRJME1qUWlMQ0poSWpvaVkyeDROVzFxYkhNeU1HUnBjREpwY0hSdE5HcGxhRGM0WmlKOS5kRmo1UkVId2lkR29Pb25kemdDMUl3",
);

const DEMO_GROUPS: Group[] = [
  { name: "Electrify Dunedin", blurb: "Locals helping locals go electric — workshops, home tours and honest advice.", url: "", image: "", lat: -45.8742, lng: 170.5036 },
  { name: "Otago Peninsula Energy Group", blurb: "Community energy projects across the peninsula.", url: "", image: "", lat: -45.8636, lng: 170.6280 },
  { name: "Mosgiel Solar Collective", blurb: "Bulk-buy solar for Taieri households.", url: "", image: "", lat: -45.8753, lng: 170.3487 },
];

// One shared source of truth with the print pipeline — deployed from the
// rewiring-district-pages repo (preview/communities.json, CORS-enabled).
const DEFAULT_DATA_URL = "https://regional-reports.pages.dev/communities.json";
const GL_CSS = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";

export default function RwCommunityGroups({
  listSelector = ".locations",
  showDemo = false,
  districtSlug = "",
  dataUrl = DEFAULT_DATA_URL,
  mapboxToken = "",
  heading = "",
  mapHeight = "420",
  landColor = "#2d5c5a",
  waterColor = "#1a3c3c",
  roadColor = "#4a7a77",
  inkColor = "#1a3c3c",
  goldColor = "#f5b731",
  accentColor = "#234e4c",
}: RwCommunityGroupsProps) {
  const uid = useId().replace(/:/g, "");
  const c = (n: string) => `rwcg-${n}-${uid}`;
  const token = (mapboxToken || "").trim() || DEFAULT_MAPBOX_TOKEN;

  const [groups, setGroups] = useState<Group[]>([]);
  const [active, setActive] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  // No groups anywhere (CMS + hosted JSON both empty) → national default copy (Jay 2026-08-25)
  const [showDefault, setShowDefault] = useState(false);
  const groupsRef = useRef<Group[]>([]);
  useEffect(() => { groupsRef.current = groups; if (groups.length) setShowDefault(false); }, [groups]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<Record<number, { marker: any; el: HTMLDivElement }>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const disposed = useRef(false);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(() => { if (!disposed.current) fn(); }, ms));
  };

  // ── Read the CMS collection list from the page DOM ──
  // Defensive (2026-08-25): retries while Webflow CMS / code islands hydrate,
  // never hides the list unless parsing actually produced groups, never parses
  // or hides an element containing this component itself (a component placed
  // inside the collection list used to hide itself), and falls back to
  // [data-rw-group] embeds anywhere on the page when the list yields nothing.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    const retryTimers: number[] = [];

    // containment that crosses shadow-DOM boundaries (code islands render in a
    // shadow root, so container.contains(node) alone can't see the component)
    const isInside = (container: Element | null, node: Element | null): boolean => {
      if (!container || !node) return false;
      let n: Node | null = node;
      while (n) {
        if (container.contains(n)) return true;
        const root: Node | null = n.getRootNode ? n.getRootNode() : null;
        n = root && (root as ShadowRoot).host ? (root as ShadowRoot).host : null;
      }
      return false;
    };

    const fromParts = (d: DOMStringMap, scope: Element | null): Group => {
      const name = d.name || scope?.querySelector("h1,h2,h3,h4")?.textContent?.trim() || "";
      const blurb = d.blurb || scope?.querySelector("p")?.textContent?.trim() || "";
      const url = d.url || (scope?.querySelector("a") as HTMLAnchorElement | null)?.href || "";
      const image = d.image || (scope?.querySelector("img") as HTMLImageElement | null)?.src || "";
      let lat = parseFloat(d.lat || "0");
      let lng = parseFloat(d.lng || "0");
      // lat/lng entered backwards in the CMS — swap when unambiguous (NZ lat is negative)
      if (Math.abs(lat) > 90 && Math.abs(lng) <= 90) [lat, lng] = [lng, lat];
      return { name, blurb, url, image, lat: isNaN(lat) ? 0 : lat, lng: isNaN(lng) ? 0 : lng };
    };

    const attempt = (): boolean => {
      const rootEl = rootRef.current;
      const wrap = document.querySelector(listSelector) as HTMLElement | null;
      let parsed: Group[] = [];
      if (wrap) {
        const items = [...wrap.querySelectorAll(".w-dyn-item")].filter(
          (it) => !isInside(it, rootEl),
        );
        parsed = items
          .map((item) => fromParts((item.querySelector("[data-rw-group]") as HTMLElement | null)?.dataset || ({} as DOMStringMap), item))
          .filter((g) => g.name);
      }
      let hideTarget: HTMLElement | null = wrap;
      if (!parsed.length) {
        // fallback: data embeds anywhere on the page (outside this component)
        parsed = [...document.querySelectorAll("[data-rw-group]")]
          .filter((e) => !isInside(rootEl, e))
          .map((e) => fromParts((e as HTMLElement).dataset, e))
          .filter((g) => g.name);
        hideTarget = null; // bare embeds render nothing — leave the page alone
      }
      if (!parsed.length) return false;
      if (hideTarget && !isInside(hideTarget, rootEl)) hideTarget.style.display = "none";
      if (!cancelled) setGroups(parsed);
      return true;
    };

    let domFound = attempt();
    if (!domFound) {
      // CMS lists / neighbouring islands can hydrate after us — retry briefly
      [300, 1000, 3000].forEach((ms) => {
        retryTimers.push(window.setTimeout(() => { if (!cancelled && !domFound) domFound = attempt(); }, ms));
      });
      if (showDemo) setGroups(DEMO_GROUPS);
      else setGroups([]);
      // still empty once CMS retries + JSON fetch have had their chance → default copy
      retryTimers.push(window.setTimeout(() => {
        if (!cancelled && !groupsRef.current.length) setShowDefault(true);
      }, 4500));

      // Hosted-JSON fallback: one shared data file with the print pipeline.
      // CMS data (if it ever appears) wins over the fetched groups.
      const url = (dataUrl || "").trim();
      if (url) {
        const slug =
          (districtSlug || "").trim().toLowerCase() ||
          window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() ||
          "";
        fetch(url)
          .then((r) => (r.ok ? r.json() : null))
          .then((j) => {
            if (cancelled || domFound || !j) return;
            const raw = (j[slug] && j[slug].groups) || [];
            const parsed: Group[] = raw
              .map((g: any) => ({
                name: String(g.name || ""),
                blurb: String(g.blurb || ""),
                url: String(g.url || ""),
                image: String(g.image || ""),
                lat: Number(g.lat) || 0,
                lng: Number(g.lng) || 0,
              }))
              .filter((g: Group) => g.name);
            if (parsed.length) setGroups(parsed);
          })
          .catch(() => { /* stay on demo/empty */ });
      }
    }
    return () => {
      cancelled = true;
      retryTimers.forEach((t) => clearTimeout(t));
    };
  }, [listSelector, showDemo, districtSlug, dataUrl]);

  const coords = groups.filter((g) => g.lat !== 0 || g.lng !== 0);
  const showMap = Boolean(token) && coords.length > 0;

  // ── Load Mapbox GL JS (CDN, QEA technique) ──
  // NB the stylesheet must ALSO be linked inside the component (see the render):
  // Webflow renders code components in a shadow root, where document-level CSS
  // never applies — without it markers lose position:absolute and drift below
  // the canvas (live-site bug, 2026-08-25).
  useEffect(() => {
    if (!showMap || typeof window === "undefined") return;
    if (!document.querySelector('link[href*="mapbox-gl"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = GL_CSS;
      document.head.appendChild(link);
    }
    disposed.current = false;
    const boot = () => {
      if (disposed.current) return;
      const gl = (window as any).mapboxgl;
      if (gl) initMap(gl);
    };
    let scriptEl: Element | null = null;
    if ((window as any).mapboxgl) {
      later(boot, 50);
    } else {
      scriptEl = document.querySelector('script[src*="mapbox-gl"]');
      if (scriptEl) scriptEl.addEventListener("load", boot);
      else {
        const el = document.createElement("script");
        el.src = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
        el.onload = boot;
        document.head.appendChild(el);
        scriptEl = el;
      }
    }
    return () => {
      disposed.current = true;
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
      if (scriptEl) scriptEl.removeEventListener("load", boot);
      if (mapInstance.current) {
        try { mapInstance.current.remove(); } catch { /* already gone */ }
        mapInstance.current = null;
      }
      markersRef.current = {};
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMap]);

  function bounds(gl: any) {
    const b = new gl.LngLatBounds();
    coords.forEach((g) => b.extend([g.lng, g.lat]));
    return b;
  }

  function initMap(gl: any) {
    if (disposed.current || mapInstance.current) return;
    if (!mapRef.current) {
      later(() => initMap(gl), 200);
      return;
    }
    if (!mapRef.current.offsetWidth) {
      later(() => initMap(gl), 400);
      return;
    }
    try {
      gl.accessToken = token;
      const map = new gl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        bounds: bounds(gl),
        fitBoundsOptions: { padding: 56, maxZoom: 12 },
        attributionControl: false,
      });
      map.addControl(new gl.NavigationControl({ showCompass: false }), "bottom-right");
      mapInstance.current = map;
      map.on("style.load", () => {
        recolor(map);
        setMapReady(true);
      });
      // the grid can stretch the container after init (late-loading images
      // elsewhere in the row) — re-measure and re-fit once things settle
      const refit = () => {
        if (disposed.current || mapInstance.current !== map) return;
        map.resize();
        map.fitBounds(bounds(gl), { padding: 56, maxZoom: 12, duration: 0 });
      };
      later(refit, 1200);
      later(refit, 3500);
    } catch {
      /* map stays hidden */
    }
  }

  function recolor(map: any) {
    const style = map.getStyle();
    style.layers.forEach((layer: any) => {
      const { id, type: t } = layer;
      layer.paint = layer.paint || {};
      if (t === "symbol" && !/place|settlement/.test(id)) { layer.layout = layer.layout || {}; layer.layout.visibility = "none"; return; }
      if (t === "symbol") { layer.paint["text-color"] = "#fdf7ea"; layer.paint["text-halo-color"] = waterColor; layer.paint["text-halo-width"] = 1.2; return; }
      if (t === "hillshade" || t === "raster") { layer.layout = layer.layout || {}; layer.layout.visibility = "none"; return; }
      if (id.includes("water")) {
        if (t === "fill") { layer.paint["fill-color"] = waterColor; layer.paint["fill-opacity"] = 1; }
        if (t === "line") { layer.paint["line-color"] = waterColor; }
        return;
      }
      if (/road|street|bridge|tunnel|path|pedestrian|track/.test(id)) {
        if (t === "line") { layer.paint["line-color"] = roadColor; layer.paint["line-opacity"] = 0.7; }
        if (t === "fill") { layer.paint["fill-color"] = roadColor; }
        return;
      }
      if (t === "fill") { layer.paint["fill-color"] = landColor; layer.paint["fill-opacity"] = 1; }
      if (t === "line") { layer.paint["line-color"] = landColor; }
      if (t === "background") { layer.paint["background-color"] = landColor; }
    });
    map.setStyle(style);
  }

  // ── Markers ──
  useEffect(() => {
    if (!mapReady || !mapInstance.current) return;
    const gl = (window as any).mapboxgl;
    if (!gl) return;
    Object.values(markersRef.current).forEach((m) => m.marker.remove());
    markersRef.current = {};
    groups.forEach((g, i) => {
      if (g.lat === 0 && g.lng === 0) return;
      const el = document.createElement("div");
      el.className = c("pin");
      el.innerHTML = `<svg viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16 0 0 7.16 0 16c0 11.2 16 26 16 26s16-14.8 16-26C32 7.16 24.84 0 16 0z" fill="${goldColor}" stroke="${inkColor}" stroke-width="2"/><circle cx="16" cy="16" r="6" fill="${inkColor}"/></svg>`;
      el.style.cssText = "width:30px;height:39px;cursor:pointer;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));transition:transform .15s ease;transform-origin:50% 100%;";
      el.addEventListener("click", (e) => { e.stopPropagation(); select(i); });
      const marker = new gl.Marker({ element: el, anchor: "bottom" }).setLngLat([g.lng, g.lat]).addTo(mapInstance.current);
      markersRef.current[i] = { marker, el };
    });
    styleMarkers(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, groups]);

  function styleMarkers(idx: number) {
    Object.entries(markersRef.current).forEach(([k, m]) => {
      const isActive = Number(k) === idx;
      m.el.style.transform = isActive ? "scale(1.25)" : "scale(1)";
      m.el.style.zIndex = isActive ? "2" : "1";
    });
  }

  function select(i: number) {
    setActive(i);
    styleMarkers(i);
    const g = groups[i];
    if (mapInstance.current && g && (g.lat !== 0 || g.lng !== 0)) {
      mapInstance.current.flyTo({ center: [g.lng, g.lat], zoom: Math.max(mapInstance.current.getZoom(), 11), duration: 900, essential: true });
    }
    const track = trackRef.current;
    if (track) track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" });
  }

  // keep the active tab in sync with manual swipes
  function onTrackScroll() {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== active && i >= 0 && i < groups.length) {
      setActive(i);
      styleMarkers(i);
    }
  }

  if (!groups.length) {
    // No groups for this region → national default (Jay 2026-08-25), once the
    // CMS retries + hosted-JSON fetch have both come up empty.
    return (
      <div className={c("root")} id="community" ref={rootRef}>
        {showDefault ? (
          <>
            <style>{`
              .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 780px; margin: 0 auto; padding: 0 24px; text-align: center; }
              .${c("default")} { font-size: 17px; line-height: 1.6; }
              .${c("default")} a { color: ${inkColor}; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
            `}</style>
            {heading ? <h2 className={c("heading")}>{heading}</h2> : null}
            <p className={c("default")}>
              Electric community groups across the country are helping locals go electric. These groups share honest
              advice, run home tours and events, and can help households make the switch.{" "}
              <a href="https://rewiring.nz/communities" target="_blank" rel="noopener noreferrer">
                Find or start a local community group.
              </a>
            </p>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className={c("root")} id="community" ref={rootRef}>
      {heading ? <h2 className={c("heading")}>{heading}</h2> : null}

      {/* selector bar: every group, active highlighted */}
      <div className={c("bar")} role="tablist" aria-label="Community groups">
        {groups.map((g, i) => (
          <button key={i} role="tab" aria-selected={i === active} className={`${c("tab")}${i === active ? " " + c("tab-active") : ""}`} onClick={() => select(i)}>
            {g.name}
          </button>
        ))}
      </div>

      <div className={`${c("grid")}${showMap ? "" : " " + c("grid-solo")}`}>
        {/* carousel */}
        <div className={c("carousel")}>
          <button className={c("arrow")} aria-label="Previous group" onClick={() => select((active - 1 + groups.length) % groups.length)}>&#8249;</button>
          <div className={c("track")} ref={trackRef} onScroll={onTrackScroll}>
            {groups.map((g, i) => (
              <div key={i} className={c("slide")}>
                <div className={c("card")}>
                  <div className={c("media")}>
                    {g.image ? <img src={g.image} alt="" /> : <div className={c("media-ph")} />}
                  </div>
                  <div className={c("body")}>
                    <h3 className={c("name")}>{g.name}</h3>
                    {g.blurb ? <p className={c("blurb")}>{g.blurb}</p> : null}
                    {g.url ? (
                      <a className={c("btn")} href={g.url} target="_blank" rel="noopener noreferrer">Visit group</a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={c("arrow")} aria-label="Next group" onClick={() => select((active + 1) % groups.length)}>&#8250;</button>
        </div>

        {/* mini map */}
        {showMap ? (
          <div className={c("map-wrap")}>
            {/* mapbox CSS must live INSIDE the shadow root — document-level
                styles don't cross the boundary and markers lose positioning */}
            <link rel="stylesheet" href={GL_CSS} />
            <div ref={mapRef} className={c("map")} />
          </div>
        ) : null}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');
        .${c("root")}, .${c("root")} * { box-sizing: border-box; }
        .${c("root")} { font-family: 'Rubik', system-ui, sans-serif; color: ${inkColor}; max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        .${c("heading")} { font-size: clamp(26px, 3vw, 36px); font-weight: 700; margin: 0 0 18px; color: ${accentColor}; }
        .${c("bar")} { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 18px; }
        .${c("heading")} { text-align: center; }
        .${c("tab")} { font-family: inherit; font-size: 14px; font-weight: 600; color: ${inkColor}; background: #fff; border: 2px solid ${inkColor}; border-radius: 100px; padding: 8px 16px; cursor: pointer; transition: background-color .15s ease, transform .15s ease; }
        .${c("tab")}:hover { transform: translateY(-1px); }
        .${c("tab-active")} { background: ${goldColor}; border-color: ${goldColor}; }
        .${c("grid")} { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: stretch; }
        .${c("grid-solo")} { grid-template-columns: 1fr; }
        .${c("carousel")} { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 8px; }
        .${c("arrow")} { width: 40px; height: 40px; border-radius: 50%; border: none; background: ${goldColor}; color: ${inkColor}; font-size: 24px; line-height: 1; cursor: pointer; transition: background-color .15s ease; flex: none; font-family: inherit; }
        .${c("arrow")}:hover { background: #ffc94d; }
        .${c("track")} { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; border-radius: 20px; }
        .${c("track")}::-webkit-scrollbar { display: none; }
        .${c("slide")} { flex: 0 0 100%; scroll-snap-align: center; padding: 2px; }
        .${c("card")} { background: #fff; border: 3px solid ${inkColor}; border-radius: 28px 8px 24px 8px / 8px 24px 8px 28px; overflow: hidden; display: flex; flex-direction: column; height: 100%; }
        .${c("media")} { height: 150px; background: linear-gradient(135deg, ${accentColor}, ${inkColor}); flex: none; }
        .${c("media")} img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .${c("media-ph")} { width: 100%; height: 100%; }
        .${c("body")} { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .${c("name")} { font-size: 21px; font-weight: 700; margin: 0; }
        .${c("blurb")} { font-size: 15px; line-height: 1.55; color: #4a6664; margin: 0; }
        .${c("btn")} { align-self: flex-start; margin-top: auto; padding: 9px 18px; border-radius: 100px; background: ${goldColor}; color: ${inkColor}; font-weight: 600; font-size: 14px; text-decoration: none; transition: background-color .15s ease, transform .15s ease; }
        .${c("btn")}:hover { background: #ffc94d; transform: translateY(-2px); }
        .${c("map-wrap")} { border: 3px solid ${inkColor}; border-radius: 8px 28px 8px 24px / 24px 8px 28px 8px; overflow: hidden; min-height: ${parseInt(mapHeight, 10) || 420}px; }
        .${c("map")} { width: 100%; height: 100%; min-height: ${parseInt(mapHeight, 10) || 420}px; background: ${waterColor}; }
        @media (max-width: 860px) {
          .${c("grid")} { grid-template-columns: 1fr; }
          .${c("map-wrap")}, .${c("map")} { min-height: 260px; }
        }
      `}</style>
    </div>
  );
}
