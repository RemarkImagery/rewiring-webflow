"use client";

import React, { useId } from "react";

interface MerchItemDef {
  title: string;
  price: string;
  img?: string;
  url?: string;
}

interface NzmeMerchProps {
  heading?: string;
  subheading?: string;
  demoNote?: string;
  item1Title?: string;
  item1Price?: string;
  item1Image?: any;
  item1Url?: any;
  item2Title?: string;
  item2Price?: string;
  item2Image?: any;
  item2Url?: any;
  item3Title?: string;
  item3Price?: string;
  item3Image?: any;
  item3Url?: any;
  item4Title?: string;
  item4Price?: string;
  item4Image?: any;
  item4Url?: any;
  darkColor?: string;
  neonColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function resolveLink(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.href) return val.href;
  return undefined;
}

export default function NzmeMerch(props: NzmeMerchProps) {
  const {
    heading = "The merch",
    subheading = "Wear the campaign. Every purchase pushes the thermometer up.",
    demoNote = "Store launching soon - for now, chip in above and we'll let you know when it's live.",
    item1Title = "New Zealand-made energy t-shirt",
    item1Price = "$45",
    item1Image,
    item1Url,
    item2Title = "Laser Kiwi key ring",
    item2Price = "$15",
    item2Image,
    item2Url,
    item3Title = "Laser Kiwi sticker pack",
    item3Price = "$10",
    item3Image,
    item3Url,
    item4Title = "Sexiest Electric Machines calendar",
    item4Price = "$30",
    item4Image,
    item4Url,
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const items: MerchItemDef[] = [
    { title: item1Title, price: item1Price, img: resolveImage(item1Image), url: resolveLink(item1Url) },
    { title: item2Title, price: item2Price, img: resolveImage(item2Image), url: resolveLink(item2Url) },
    { title: item3Title, price: item3Price, img: resolveImage(item3Image), url: resolveLink(item3Url) },
    { title: item4Title, price: item4Price, img: resolveImage(item4Image), url: resolveLink(item4Url) },
  ].filter((i) => i.title);

  return (
    <section className={`nzmr-wrap-${uid}`} id="merch">
      <style>{`
        .nzmr-wrap-${uid} {
          background: #ffffff;
          padding: 88px 32px 96px;
          font-family: 'Rubik', sans-serif;
        }
        .nzmr-inner-${uid} { max-width: 1180px; margin: 0 auto; }
        .nzmr-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px; text-align: center;
        }
        .nzmr-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78; text-align: center;
          max-width: 620px; margin: 0 auto 14px; line-height: 1.6;
        }
        .nzmr-demonote-${uid} {
          display: block; text-align: center;
          font-size: 0.82rem; font-weight: 600; color: #8a7a4a;
          margin: 0 auto 48px;
        }
        .nzmr-grid-${uid} {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 26px;
        }
        .nzmr-card-${uid} {
          display: block;
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 22px 8px 22px 8px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .nzmr-card-${uid}:hover {
          transform: translateY(-6px) rotate(-0.5deg);
          box-shadow: 0 18px 40px rgba(26,60,60,0.18);
        }
        .nzmr-imgwrap-${uid} {
          background: #FFFCF0;
          border-bottom: 3px dashed ${darkColor}33;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .nzmr-imgwrap-${uid} img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .nzmr-body-${uid} { padding: 20px 20px 24px; }
        .nzmr-price-${uid} {
          display: inline-block;
          font-size: 0.95rem; font-weight: 900; color: ${darkColor};
          background: #f5b731;
          padding: 5px 14px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          margin-bottom: 12px;
        }
        .nzmr-title-${uid} {
          font-size: 1.05rem; font-weight: 700; color: ${darkColor};
          margin: 0 0 8px; line-height: 1.35;
        }
        .nzmr-hint-${uid} {
          font-size: 0.82rem; font-weight: 700; color: #5c7a78;
        }
        .nzmr-card-live-${uid} .nzmr-hint-${uid} { color: ${darkColor}; }
        @media (max-width: 640px) {
          .nzmr-wrap-${uid} { padding: 64px 20px 72px; }
          .nzmr-grid-${uid} { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
      `}</style>

      <div className={`nzmr-inner-${uid}`}>
        <h2 className={`nzmr-heading-${uid}`}>{heading}</h2>
        <p className={`nzmr-sub-${uid}`}>{subheading}</p>
        {demoNote && <span className={`nzmr-demonote-${uid}`}>{demoNote}</span>}
        <div className={`nzmr-grid-${uid}`}>
          {items.map((item, i) => {
            const inner = (
              <>
                {item.img && (
                  <div className={`nzmr-imgwrap-${uid}`}>
                    <img src={item.img} alt={item.title} />
                  </div>
                )}
                <div className={`nzmr-body-${uid}`}>
                  {item.price && <span className={`nzmr-price-${uid}`}>{item.price}</span>}
                  <h3 className={`nzmr-title-${uid}`}>{item.title}</h3>
                  <span className={`nzmr-hint-${uid}`}>
                    {item.url ? "Buy now →" : "Coming soon"}
                  </span>
                </div>
              </>
            );
            return item.url ? (
              <a
                key={i}
                href={item.url}
                className={`nzmr-card-${uid} nzmr-card-live-${uid}`}
                {...(/^(https?:\/\/|www\.)/i.test(item.url)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {inner}
              </a>
            ) : (
              <div key={i} className={`nzmr-card-${uid}`}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
