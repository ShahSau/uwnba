"use client";

import { useCallback, useEffect, useState } from "react";
import type { Winner } from "@/data/winners";

export default function WinnerModal({
  winner,
  onClose,
}: {
  winner: Winner;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(false);

  const handleClose = useCallback(() => {
    setShown(false);
    window.setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleClose]);

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pb-8 pt-16 transition-opacity duration-200 sm:px-8 sm:pt-24 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(40, 20, 45, 0.55)" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={winner.name}
        onClick={(e) => e.stopPropagation()}
        className={`relative mb-8 w-full max-w-4xl rounded-2xl px-6 pb-9 pt-9 text-white shadow-2xl transition-all duration-200 ease-out sm:px-10 ${
          shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #7a1f6a 0%, #bd1380 55%, #d6188f 100%)",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="বন্ধ করুন"
          className="absolute right-4 top-3 text-3xl leading-none text-white/80 transition hover:text-white"
        >
          ×
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/80 bg-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={winner.image}
              alt={winner.name}
              className="h-full w-full scale-105 object-cover grayscale"
            />
          </div>
          <h3 className="mt-4 text-2xl font-bold">{winner.name}</h3>
          <p className="mt-1 text-white/90">{winner.subtitle}</p>
        </div>

        <hr className="my-5 border-white/30" />

        <p className="text-justify leading-8 text-white/95">{winner.bio}</p>

      </div>
    </div>
  );
}