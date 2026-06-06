"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Motion";
import { getGala } from "@/data/gala";

const GAP = 16; // matches gap-4
const AUTOADVANCE_MS = 2500;

export default function GalaGallery() {
  const photos = getGala();
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const settleTimer = useRef<number | null>(null);

  // Duplicate the strip so the loop is seamless (no rewind).
  const canLoop = photos.length > 2;
  const items = canLoop ? photos.concat(photos) : photos;
  const originalCount = photos.length;

  const copyWidth = () => {
    const el = scroller.current;
    const second = el?.children[originalCount] as HTMLElement | undefined;
    return second ? second.offsetLeft : 0;
  };

  const cardStep = () => {
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP : (el?.clientWidth ?? 0) / 2;
  };

  // After scrolling settles, if we've crossed into the duplicate copy,
  // jump back by one copy-width — invisible, since it's identical.
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

  const go = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const step = cardStep();
    if (canLoop && dir < 0 && el.scrollLeft - step < 0) {
      // jumping into the duplicate copy lets us scroll left seamlessly
      const w = copyWidth();
      if (w > 0) el.scrollLeft += w;
    }
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  useEffect(() => {
    if (!canLoop) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!paused.current) go(1);
    }, AUTOADVANCE_MS);
    return () => window.clearInterval(id);
  }, [canLoop]);

  if (photos.length === 0) return null;

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
            এক নজরে গালা নাইট
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="relative">
            <div
              ref={scroller}
              onScroll={onScroll}
              onMouseEnter={hold}
              onMouseLeave={release}
              onTouchStart={hold}
              onTouchEnd={release}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((src, i) => (
                <div
                  key={i}
                  className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)]"
                  aria-hidden={canLoop && i >= originalCount ? true : undefined}
                >
                  <div className="group relative aspect-[2/1] overflow-hidden rounded-xl shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(78,22,74,0.55), transparent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Prev / Next arrows (desktop) */}
            <button
              type="button"
              aria-label="পূর্ববর্তী"
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="পরবর্তী"
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}