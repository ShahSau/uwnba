"use client";

import { useState } from "react";
import Link from "next/link";
import { useYear } from "@/context/YearContext";
import { YEARS, YEAR_DATA, toBengaliNumber } from "@/data/years";

export default function Hero({ showCta = true }: { showCta?: boolean }) {
  const { year: activeYear, setYear: setActiveYear } = useYear();
  const [menuOpen, setMenuOpen] = useState(false);
  const banner = YEAR_DATA[activeYear];

  return (
    <section className="w-full px-4 pt-6 pb-2">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="relative">
          {/* Banner card (clips the image to the rounded corners) */}
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


            <nav className="absolute right-6 top-5 z-10 hidden sm:block">
              <div className="uwnba-yearnav">
                <Link href="/" className="uwnba-brand" aria-label="হোম পেজ">
                  UWNBA
                </Link>
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

          <div className="absolute right-3 top-3 z-20 flex items-center gap-2 sm:hidden">
            <Link
              href="/"
              aria-label="হোম পেজ"
              className="rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-xs font-bold tracking-wider text-[#5e1a52] shadow-sm"
              style={{ fontFamily: "var(--font-serif-en)" }}
            >
              UWNBA
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1.5 rounded-md border border-white/50 bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-[#7a2a6e] shadow-sm"
              >
                ফিরে দেখা · {toBengaliNumber(activeYear)}
                <svg
                  className={"transition-transform duration-200 " + (menuOpen ? "rotate-180" : "")}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {menuOpen && (
                <>
                  {/* click-away backdrop */}
                  <button
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-30 cursor-default"
                  />
                  <div
                    role="listbox"
                    className="absolute right-0 top-full z-40 mt-1.5 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl"
                  >
                    {YEARS.map((year) => {
                      const active = year === activeYear;
                      return (
                        <button
                          key={year}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setActiveYear(year);
                            setMenuOpen(false);
                          }}
                          className={
                            "block w-full border-b border-neutral-100 px-4 py-2.5 text-center text-sm transition last:border-b-0 " +
                            (active
                              ? "font-semibold text-white"
                              : "text-[#7a2a6e] hover:bg-[#fdf2f9]")
                          }
                          style={
                            active
                              ? {
                                  background:
                                    "linear-gradient(90deg,#531779 0%,#6a1479 35%,#c21080 100%)",
                                }
                              : undefined
                          }
                        >
                          {toBengaliNumber(year)}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Headline + call to action */}
        {showCta && (
          <div className="flex flex-col items-center pt-8 pb-4 text-center">
            <h1
              className="text-2xl font-semibold leading-snug sm:text-3xl"
              style={{ color: "var(--uwnba-headline)" }}
            >
              জাতি গড়ার
              <br />
              অচেনা নারী যোদ্ধাদের জানাই আহ্বান
            </h1>

            <Link
              href="/nominate"
              className="mt-6 inline-block rounded-md px-8 py-2.5 text-base font-semibold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20 transition hover:brightness-110 active:scale-[0.99]"
              style={{
                fontFamily: "var(--font-serif-en)",
                background: "linear-gradient(180deg, #822669 0%, #bd1380 100%)",
              }}
            >
              Nominate Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}