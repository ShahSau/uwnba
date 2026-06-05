"use client";

import { useState } from "react";
import {
  YEARS,
  YEAR_DATA,
  DEFAULT_YEAR,
  toBengaliNumber,
  type YearKey,
} from "@/data/years";

export default function Hero() {
  const [activeYear, setActiveYear] = useState<YearKey>(DEFAULT_YEAR);
  const banner = YEAR_DATA[activeYear];

  return (
    <section className="w-full px-4 pt-6 pb-2">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Banner card with the overlaid year nav */}
        <div className="relative overflow-hidden rounded-2xl bg-[#2b0e3e] shadow-[0_10px_40px_-12px_rgba(43,14,62,0.5)]">
          {banner.bannerSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={banner.bannerSrc}
              alt={banner.bannerAlt}
              className="block h-auto w-full"
            />
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                aspectRatio: "1170 / 645",
                background:
                  "radial-gradient(120% 120% at 28% 38%, #9a1f5e 0%, #5e1a52 46%, #2b0e3e 100%)",
              }}
            >
              <span className="select-none rounded-md border border-dashed border-white/40 px-4 py-2 text-sm font-medium tracking-wide text-white/70">
                ব্যানার ইমেজ — {toBengaliNumber(activeYear)}
              </span>
            </div>
          )}

          {/* Year navigation pill (top-right) */}
          <nav className="absolute right-4 top-4 z-10 sm:right-6 sm:top-5">
            <div className="uwnba-yearnav">
              <span className="uwnba-brand">UWNBA</span>
              {YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  className="uwnba-year"
                  aria-pressed={year === activeYear}
                  onClick={() => setActiveYear(year)}
                >
                  {toBengaliNumber(year)}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Headline + call to action */}
        <div className="flex flex-col items-center pt-8 pb-4 text-center">
          <h1
            className="text-2xl font-semibold leading-snug sm:text-3xl"
            style={{ color: "var(--uwnba-headline)" }}
          >
            জাতি গড়ার
            <br />
            অচেনা নারী যোদ্ধাদের জানাই আহ্বান
          </h1>

          <button
            type="button"
            className="mt-6 rounded-md px-8 py-2.5 text-base font-semibold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20 transition hover:brightness-110 active:scale-[0.99]"
            style={{
              fontFamily: "var(--font-serif-en)",
              background: "linear-gradient(180deg, #822669 0%, #bd1380 100%)",
            }}
          >
            Nominate Now
          </button>
        </div>
      </div>
    </section>
  );
}