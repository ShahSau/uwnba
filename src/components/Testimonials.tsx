"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Motion";
import { TESTIMONIALS } from "@/data/testimonials";

const GAP = 24; // matches gap-6
const AUTOADVANCE_MS = 3500;
const CARD_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 16px), 50% 100%, 0 calc(100% - 16px))";

function QuoteMark() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="#d4d4d8" aria-hidden>
      <path d="M0 18C0 8 6 2 16 0l2 5C12 7 9 10 9 14h7v18H0V18zM22 18C22 8 28 2 38 0l2 5c-6 2-9 5-9 9h7v18H22V18z" />
    </svg>
  );
}

export default function Testimonials() {
    const testomonialLoop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const settleTimer = useRef<number | null>(null);

  const canLoop = testomonialLoop.length > 1;
  const items = canLoop ? testomonialLoop : testomonialLoop;
  const originalCount = testomonialLoop.length;

  const copyWidth = () => {
    const el = scroller.current;
    const second = el?.children[originalCount] as HTMLElement | undefined;
    return second ? second.offsetLeft : 0;
  };

  const wrap = () => {
    const el = scroller.current;
    if (!el || !canLoop) return;
    const w = copyWidth();
    if (w > 0 && el.scrollLeft >= w) el.scrollLeft -= w;
  };

  const onScroll = () => {
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(wrap, 120);
  };

  useEffect(() => {
    if (!canLoop) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      const el = scroller.current;
      if (!el || paused.current) return;
      if (el.scrollWidth <= el.clientWidth + 4) return; // everything fits
      const card = el.firstElementChild as HTMLElement | null;
      const step = card ? card.offsetWidth + GAP : el.clientWidth / 3;
      el.scrollBy({ left: step, behavior: "smooth" });
    }, AUTOADVANCE_MS);
    return () => window.clearInterval(id);
  }, [canLoop]);

  if (testomonialLoop.length === 0) return null;

  const hold = () => (paused.current = true);
  const release = () => (paused.current = false);

  return (
    <section className="w-full px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal>
          <h2
            className="text-center text-xl font-semibold sm:text-2xl"
            style={{ color: "var(--uwnba-headline)" }}
          >
            আনসাং উইমেন-এর বিশিষ্ট ব্যক্তিবর্গ
          </h2>
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-xl bg-[#f4f4f5] p-5 sm:p-8">
            <div
              ref={scroller}
              onScroll={onScroll}
              onMouseEnter={hold}
              onMouseLeave={release}
              onTouchStart={hold}
              onTouchEnd={release}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((t, i) => (
                <div
                  key={i}
                  className="flex w-[85%] shrink-0 snap-start flex-col items-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  aria-hidden={canLoop && i >= originalCount ? true : undefined}
                >
                  {/* Quote card with downward pennant point */}
                  <div
                    className="flex min-h-[300px] w-full flex-col bg-white px-6 pb-8 pt-6 shadow-sm"
                    style={{ clipPath: CARD_CLIP }}
                  >
                    <div className="mx-auto mb-3">
                      <QuoteMark />
                    </div>
                    <p className="text-justify text-sm leading-[1.9] text-[#4b4b52]">
                      {t.quote}
                    </p>
                  </div>

                  {/* Photo + attribution */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="mt-4 h-16 w-16 rounded-full border border-neutral-200 bg-neutral-200 object-cover"
                  />
                  <h3 className="mt-3 text-base font-bold text-[#a01a6e]">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#5b5b62]">{t.title}</p>
                  <p className="text-sm text-[#5b5b62]">{t.org}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}