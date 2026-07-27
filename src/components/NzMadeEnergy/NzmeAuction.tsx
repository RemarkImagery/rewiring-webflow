"use client";

import React, { useId, useState } from "react";

interface AuctionItemDef {
  title: string;
  desc: string;
  img?: string;
  startBid: number;
  closes: string;
}

interface NzmeAuctionProps {
  heading?: string;
  subheading?: string;
  demoNote?: string;
  item1Title?: string;
  item1Desc?: string;
  item1Image?: any;
  item1StartBid?: string;
  item1Closes?: string;
  item2Title?: string;
  item2Desc?: string;
  item2Image?: any;
  item2StartBid?: string;
  item2Closes?: string;
  item3Title?: string;
  item3Desc?: string;
  item3Image?: any;
  item3StartBid?: string;
  item3Closes?: string;
  item4Title?: string;
  item4Desc?: string;
  item4Image?: any;
  item4StartBid?: string;
  item4Closes?: string;
  darkColor?: string;
  neonColor?: string;
}

function resolveImage(val: any): string | undefined {
  if (!val) return undefined;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.src) return val.src;
  return undefined;
}

function parseAmount(val: string | undefined, fallback: number): number {
  if (!val) return fallback;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatNZD(n: number): string {
  return "$" + n.toLocaleString("en-NZ", { maximumFractionDigits: 0 });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuctionCard({
  item,
  uid,
  darkColor,
  neonColor,
}: {
  item: AuctionItemDef;
  uid: string;
  darkColor: string;
  neonColor: string;
}) {
  const [currentBid, setCurrentBid] = useState(item.startBid);
  const [bidCount, setBidCount] = useState(0);
  const [email, setEmail] = useState("");
  const [bid, setBid] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);

  const minNext = currentBid + 5;

  function placeBid(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setWon(false);
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    const amount = Number(bid);
    if (!Number.isFinite(amount) || amount < minNext) {
      setError(`Your bid must be at least ${formatNZD(minNext)}.`);
      return;
    }
    if (!agreed) {
      setError("You need to agree to the terms & conditions.");
      return;
    }
    setCurrentBid(Math.round(amount));
    setBidCount((c) => c + 1);
    setBid("");
    setWon(true);
  }

  return (
    <div className={`nzau-card-${uid}`}>
      {item.img && (
        <div className={`nzau-imgwrap-${uid}`}>
          <img src={item.img} alt={item.title} />
          <span className={`nzau-closes-${uid}`}>{item.closes}</span>
        </div>
      )}
      <div className={`nzau-body-${uid}`}>
        <h3 className={`nzau-title-${uid}`}>{item.title}</h3>
        <p className={`nzau-desc-${uid}`}>{item.desc}</p>
        <div className={`nzau-bidrow-${uid}`}>
          <div>
            <span className={`nzau-bidlabel-${uid}`}>Current bid</span>
            <span className={`nzau-bidamount-${uid}`}>{formatNZD(currentBid)}</span>
          </div>
          <span className={`nzau-bidcount-${uid}`}>
            {bidCount === 0 ? "No bids yet" : `${bidCount} bid${bidCount === 1 ? "" : "s"}`}
          </span>
        </div>
        {won && (
          <div className={`nzau-won-${uid}`}>
            You&apos;re the top bidder at {formatNZD(currentBid)}! We&apos;ll email you if you&apos;re outbid.
          </div>
        )}
        <form className={`nzau-form-${uid}`} onSubmit={placeBid} noValidate>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`nzau-input-${uid}`}
            aria-label="Your email"
          />
          <div className={`nzau-bidline-${uid}`}>
            <div className={`nzau-bidfield-${uid}`}>
              <span>$</span>
              <input
                type="number"
                min={minNext}
                step="1"
                placeholder={String(minNext)}
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                aria-label="Your bid in dollars"
              />
            </div>
            <button type="submit" className={`nzau-btn-${uid}`}>Place bid</button>
          </div>
          <label className={`nzau-terms-${uid}`}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the auction <a href="#" onClick={(e) => e.preventDefault()}>terms &amp; conditions</a>
            </span>
          </label>
          {error && <div className={`nzau-error-${uid}`}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default function NzmeAuction(props: NzmeAuctionProps) {
  const {
    heading = "The Laser Kiwi auctions",
    subheading = "Legends of the electric movement have donated one-of-a-kind experiences. Every winning bid goes straight into the campaign.",
    demoNote = "Demo only - bids aren't stored or binding (yet!).",
    item1Title = "Guitar lesson with Jon Toogood",
    item1Desc = "An hour one-on-one with the Shihad frontman. Bring your own axe - the amp runs on New Zealand-made energy.",
    item1Image,
    item1StartBid = "150",
    item1Closes = "Closes Mon 1 Sep",
    item2Title = "Party on an electric hydrofoil boat",
    item2Desc = "You and your mates on the Vessev - a silent, flying, fully-electric boat party on Auckland harbour.",
    item2Image,
    item2StartBid = "500",
    item2Closes = "Closes Mon 1 Sep",
    item3Title = "Drag race an electric truck",
    item3Desc = "Line up against Ross Linton in his electric truck. Spoiler: instant torque wins. Passenger seat for the brave.",
    item3Image,
    item3StartBid = "200",
    item3Closes = "Closes Mon 1 Sep",
    item4Title = "The wrecking room",
    item4Desc = "Take a sledgehammer to a gas stove, a califont and a petrol car. Extremely therapeutic. Safety gear provided.",
    item4Image,
    item4StartBid = "100",
    item4Closes = "Closes Mon 1 Sep",
    darkColor = "#1a3c3c",
    neonColor = "#4bf03c",
  } = props;

  const uid = useId().replace(/:/g, "");
  const items: AuctionItemDef[] = [
    { title: item1Title, desc: item1Desc, img: resolveImage(item1Image), startBid: parseAmount(item1StartBid, 150), closes: item1Closes },
    { title: item2Title, desc: item2Desc, img: resolveImage(item2Image), startBid: parseAmount(item2StartBid, 500), closes: item2Closes },
    { title: item3Title, desc: item3Desc, img: resolveImage(item3Image), startBid: parseAmount(item3StartBid, 200), closes: item3Closes },
    { title: item4Title, desc: item4Desc, img: resolveImage(item4Image), startBid: parseAmount(item4StartBid, 100), closes: item4Closes },
  ].filter((i) => i.title);

  return (
    <section className={`nzau-wrap-${uid}`} id="auctions">
      <style>{`
        .nzau-wrap-${uid} {
          background: #f7efd4;
          padding: 96px 32px;
          font-family: 'Rubik', sans-serif;
        }
        .nzau-inner-${uid} { max-width: 1180px; margin: 0 auto; }
        .nzau-heading-${uid} {
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 800; color: ${darkColor};
          margin: 0 0 10px; text-align: center;
        }
        .nzau-sub-${uid} {
          font-size: 1.05rem; color: #5c7a78; text-align: center;
          max-width: 640px; margin: 0 auto 14px; line-height: 1.6;
        }
        .nzau-demonote-${uid} {
          display: block; text-align: center;
          font-size: 0.82rem; font-weight: 600; color: #8a7a4a;
          margin: 0 auto 48px;
        }
        .nzau-grid-${uid} {
          display: grid;
          grid-template-columns: 1fr;
          gap: 26px;
          /* start-aligned so one card's bid notification never stretches its neighbours */
          align-items: start;
        }
        @media (min-width: 700px) {
          .nzau-grid-${uid} { grid-template-columns: repeat(2, 1fr); }
        }
        .nzau-card-${uid} {
          background: #ffffff;
          border: 3px solid ${darkColor};
          border-radius: 8px 22px 8px 22px;
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .nzau-imgwrap-${uid} {
          position: relative;
          background: #FFFCF0;
          aspect-ratio: 1 / 1;
          border-bottom: 3px dashed ${darkColor}33;
        }
        .nzau-imgwrap-${uid} img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .nzau-closes-${uid} {
          position: absolute; top: 12px; left: 12px;
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; background: ${darkColor};
          padding: 5px 12px;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        }
        .nzau-body-${uid} { padding: 20px 20px 24px; display: flex; flex-direction: column; flex: 1; }
        .nzau-title-${uid} { font-size: 1.08rem; font-weight: 700; color: ${darkColor}; margin: 0 0 8px; }
        .nzau-desc-${uid} { font-size: 0.88rem; color: #5c7a78; line-height: 1.6; margin: 0 0 16px; }
        .nzau-bidrow-${uid} {
          display: flex; align-items: flex-end; justify-content: space-between;
          padding: 12px 14px;
          background: #FFFCF0;
          border: 2px solid ${darkColor}22;
          border-radius: 12px 4px 12px 4px;
          margin-bottom: 12px;
        }
        .nzau-bidlabel-${uid} {
          display: block; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: #5c7a78;
        }
        .nzau-bidamount-${uid} { font-size: 1.5rem; font-weight: 900; color: ${darkColor}; line-height: 1.1; }
        .nzau-bidcount-${uid} { font-size: 0.8rem; font-weight: 600; color: #5c7a78; }
        .nzau-won-${uid} {
          font-size: 0.85rem; font-weight: 600; color: #14611f;
          background: ${neonColor}33;
          border: 2px solid #3ed432;
          border-radius: 10px 4px 10px 4px;
          padding: 10px 12px; margin-bottom: 12px; line-height: 1.5;
        }
        .nzau-form-${uid} { display: flex; flex-direction: column; gap: 10px; }
        .nzau-input-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.92rem;
          padding: 11px 14px;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          outline: none; width: 100%; box-sizing: border-box;
          background: #fff; color: ${darkColor};
        }
        .nzau-input-${uid}:focus { border-color: ${darkColor}; }
        .nzau-bidline-${uid} { display: flex; gap: 10px; }
        .nzau-bidfield-${uid} {
          flex: 1; display: flex; align-items: center;
          border: 2px solid ${darkColor}55; border-radius: 10px;
          background: #fff; padding: 0 0 0 12px;
        }
        .nzau-bidfield-${uid}:focus-within { border-color: ${darkColor}; }
        .nzau-bidfield-${uid} span { font-weight: 700; color: #5c7a78; }
        .nzau-bidfield-${uid} input {
          font-family: 'Rubik', sans-serif; font-size: 0.92rem;
          border: 0; outline: none; width: 100%;
          padding: 11px 10px 11px 6px; border-radius: 10px;
          color: ${darkColor}; background: transparent;
        }
        .nzau-btn-${uid} {
          font-family: 'Rubik', sans-serif; font-size: 0.9rem; font-weight: 700;
          padding: 11px 22px; cursor: pointer;
          background: #f5b731; color: ${darkColor};
          border: 3px solid #f5b731;
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          transition: background 0.3s, color 0.3s;
          white-space: nowrap;
        }
        .nzau-btn-${uid}:hover { background: transparent; color: #a87c12; }
        .nzau-terms-${uid} {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.78rem; color: #5c7a78; line-height: 1.5;
          cursor: pointer;
        }
        .nzau-terms-${uid} input { margin-top: 2px; accent-color: ${darkColor}; }
        .nzau-terms-${uid} a { color: ${darkColor}; font-weight: 600; }
        .nzau-error-${uid} {
          font-size: 0.82rem; font-weight: 600; color: #b3261e;
          background: #fdecea; border-radius: 8px; padding: 8px 12px;
        }
        @media (max-width: 640px) {
          .nzau-wrap-${uid} { padding: 72px 20px; }
        }
      `}</style>

      <div className={`nzau-inner-${uid}`}>
        <h2 className={`nzau-heading-${uid}`}>{heading}</h2>
        <p className={`nzau-sub-${uid}`}>{subheading}</p>
        {demoNote && <span className={`nzau-demonote-${uid}`}>{demoNote}</span>}
        <div className={`nzau-grid-${uid}`}>
          {items.map((item, i) => (
            <AuctionCard key={i} item={item} uid={uid} darkColor={darkColor} neonColor={neonColor} />
          ))}
        </div>
      </div>
    </section>
  );
}
