"use client";

import { useState } from "react";
import { Reveal } from "@/components/Motion";
import WinnerModal from "@/components/WinnerModal";
import { useYear } from "@/context/YearContext";
import { getWinners, type Winner } from "@/data/winners";
import { toBengaliNumber } from "@/data/years";

export default function Winners() {
  const { year } = useYear();
  const winners = getWinners(year);
  const [selected, setSelected] = useState<Winner | null>(null);

  return (
    <section className="w-full px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <Reveal>
          <h2
            className="text-center text-xl font-semibold sm:text-2xl"
            style={{ color: "var(--uwnba-headline)" }}
          >
            জাতি গড়ার নারী যোদ্ধারা
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

        {winners.length === 0 ? (
          <p className="mt-12 text-center text-[#7a7a82]">
            {toBengaliNumber(year)} সালের তথ্য শীঘ্রই যোগ করা হবে।
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {winners.map((w, i) => (
              <Reveal key={w.name} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => setSelected(w)}
                  className="group block w-full cursor-pointer text-left"
                >
                  <div className="aspect-4/3 w-full overflow-hidden rounded-md bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.name}
                      className="h-full w-full object-cover grayscale transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#2b0e3e]">
                    {w.name}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-[#5b5b62]">
                    {w.subtitle}
                  </p>
                  <span className="mt-2 inline-block text-sm font-medium text-[#bd1380] transition group-hover:underline">
                    আরও পড়ুন →
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <WinnerModal winner={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}