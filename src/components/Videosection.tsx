"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Motion";
import { useYear } from "@/context/YearContext";
import { getVideos, youTubeId } from "@/data/videos";
import { toBengaliNumber } from "@/data/years";

const GAP = 20; // matches gap-5
const AUTOADVANCE_MS = 3000;

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function VideoCard({
  link,
  name,
  onPlay,
}: {
  link: string;
  name: string;
  onPlay: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(link);
  const hasVideo = id.length > 0;

  return (
    <div className="flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-neutral-900">
        {playing && hasVideo ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              if (!hasVideo) return;
              onPlay();
              setPlaying(true);
            }}
            aria-label={hasVideo ? `${name} — ভিডিও চালান` : name}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {hasVideo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                alt={name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #3a1340, #6f1f6a)" }}
              />
            )}
            <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#bd1380] pl-0.5 text-white shadow-lg transition group-hover:scale-110">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 text-center text-sm leading-snug text-[#4b4b52]">
        {name}
      </p>
    </div>
  );
}

export default function VideoSection() {
  const { year } = useYear();
  const videos = getVideos(year);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false); // hover / touch
  const engaged = useRef(false); // a video has been played

  const advance = (dir: number, loop = false) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP : el.clientWidth / 3;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (loop && dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: step * dir, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (videos.length <= 1) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      const el = scroller.current;
      if (!el) return;
      if (paused.current || engaged.current) return;
      if (el.scrollWidth <= el.clientWidth + 4) return; // everything fits
      advance(1, true);
    }, AUTOADVANCE_MS);
    return () => window.clearInterval(id);
  }, [videos.length]);

  if (videos.length === 0) return null;

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
            দেখুন কীভাবে তাঁরা তৃণমূল থেকে জাতি গড়ছেন, প্রতিদিন
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-2 text-center text-lg"
            style={{ fontFamily: "var(--font-bn-num)", color: "#5b5b62" }}
          >
            {toBengaliNumber(year)}
          </p>
        </Reveal>

        <div className="relative mt-10">
          <Reveal>
            <div
              ref={scroller}
              onMouseEnter={hold}
              onMouseLeave={release}
              onTouchStart={hold}
              onTouchEnd={release}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {videos.map((v, i) => (
                <div
                  key={i}
                  className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  <VideoCard
                    link={v.link}
                    name={v.name}
                    onPlay={() => (engaged.current = true)}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Prev / Next arrows (desktop) */}
          <button
            type="button"
            aria-label="পূর্ববর্তী"
            onClick={() => advance(-1)}
            className="absolute left-0 top-[calc(50%-14px)] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="পরবর্তী"
            onClick={() => advance(1)}
            className="absolute right-0 top-[calc(50%-14px)] hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-[#7a1f6a] shadow-md transition hover:bg-white sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}