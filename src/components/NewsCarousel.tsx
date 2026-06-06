"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Motion";
// import { useYear } from "@/context/YearContext";
import { getNews } from "@/data/news";

const CARD_GRADIENT =
  "linear-gradient(120deg, #6f1f6a 0%, #a51a73 55%, #c4188c 100%)";
const AUTOPLAY_MS = 2500;
const GAP = 20; // matches gap-5

export default function NewsCarousel() {
  const items = getNews();
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const advance = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP : el.clientWidth * 0.6;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: step * dir, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (items.length <= 2) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!paused.current) advance(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const total = items.length;

  const hold = () => (paused.current = true);
  const release = () => (paused.current = false);

  return (
    <section className="w-full px-4 py-10 sm:py-14">
      <div className="relative mx-auto w-full max-w-[1180px]">
        <Reveal>
          <div
            ref={scroller}
            onMouseEnter={hold}
            onMouseLeave={release}
            onTouchStart={hold}
            onTouchEnd={release}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-44 w-[88%] shrink-0 snap-start items-stretch overflow-hidden rounded-xl shadow-md transition hover:brightness-105 sm:h-48 sm:w-[calc(50%-10px)]"
                style={{ background: CARD_GRADIENT }}
              >
                <div className="m-4 w-2/5 shrink-0 overflow-hidden rounded bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-center justify-center p-4 pr-5">
                  <h3
                    className="text-center text-base font-medium leading-snug text-white sm:text-lg"
                    style={{ fontFamily: "var(--font-serif-en)" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <span className="absolute bottom-3 right-4 text-sm text-white/85">
                  {i + 1} of {total}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Prev / Next arrows (desktop) */}
        <button
          type="button"
          aria-label="পূর্ববর্তী"
          onClick={() => advance(-1)}
          className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="পরবর্তী"
          onClick={() => advance(1)}
          className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}