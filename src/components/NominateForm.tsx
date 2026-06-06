"use client";

import { useState } from "react";
import { Reveal } from "@/components/Motion";
import { toBengaliNumber } from "@/data/years";

/* Edit these category options as needed. */
const CATEGORIES = [
  "শিক্ষা",
  "স্বাস্থ্য",
  "কৃষি",
  "আত্মউন্নয়ন",
  "দুঃসাহসী কাজ",
  "জলবায়ু",
  "শিল্পোদ্যোগ",
];

type Field = {
  name: string;
  label: string;
  type: "text" | "tel" | "email";
  required?: boolean;
  numeric?: boolean;
};

const YOUR_FIELDS: Field[] = [
  { name: "your_name", label: "নাম", type: "text", required: true },
  { name: "your_age", label: "বয়স", type: "text", numeric: true },
  { name: "your_org", label: "প্রতিষ্ঠানের নাম", type: "text" },
  { name: "your_mobile", label: "মোবাইল নম্বর", type: "tel", required: true, numeric: true },
  { name: "your_email", label: "ই-মেইল", type: "email" },
  { name: "your_address", label: "ঠিকানা", type: "text" },
  { name: "relation", label: "মনোনীত প্রার্থীর সাথে সম্পর্ক", type: "text" },
];

const NOMINEE_FIELDS: Field[] = [
  { name: "nominee_name", label: "নাম", type: "text", required: true },
  { name: "nominee_age", label: "বয়স", type: "text", numeric: true },
  { name: "nominee_org", label: "প্রতিষ্ঠানের নাম", type: "text" },
  { name: "nominee_mobile", label: "মোবাইল নম্বর", type: "tel", required: true, numeric: true },
  { name: "nominee_email", label: "ই-মেইল", type: "email" },
  { name: "nominee_address", label: "ঠিকানা", type: "text" },
];

/* Fields that must be filled before the form can be submitted. */
const REQUIRED = [
  "your_name",
  "your_mobile",
  "nominee_name",
  "nominee_mobile",
  "reason",
];

const inputClass =
  "w-full rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm text-[#333] placeholder-neutral-400 outline-none transition focus:border-[#bd1380] focus:ring-1 focus:ring-[#bd1380]/40";

function Row({
  num,
  label,
  required,
  htmlFor,
  children,
}: {
  num: number;
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 py-2.5 sm:grid-cols-[minmax(0,300px)_1fr] sm:items-start">
      <label htmlFor={htmlFor} className="pt-2 text-[15px] leading-snug text-[#333]">
        {toBengaliNumber(num)}. {label}
        {required && <sup className="ml-0.5 text-red-500">*</sup>}
      </label>
      {children}
    </div>
  );
}

export default function NominateForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [terms, setTerms] = useState(false);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  function update(name: string, raw: string, numeric?: boolean) {
    const v = numeric ? raw.replace(/[^0-9]/g, "") : raw; // digits only for number boxes
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  const isValid =
    REQUIRED.every((n) => (values[n] ?? "").trim() !== "") && terms;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) return;
    const data: Record<string, string> = {
      ...values,
      photo: fileName || "(no file)",
      terms: terms ? "true" : "false",
    };
    // For now, just print the data.
    console.log("Nomination submitted:", data);
    setSubmitted(data);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-[920px]">
        {/* Headings */}
        <Reveal>
          <h2 className="text-center text-lg font-medium text-[#2f2f33] sm:text-xl">
            আপনার চেনা আছে কোনো জাতি গড়ার অজানা যোদ্ধা?
          </h2>
          <p
            className="mt-1 text-center text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--uwnba-headline)" }}
          >
            এখনই আবেদন করুন
          </p>
        </Reveal>

        {/* Demo confirmation */}
        {submitted && (
          <div className="mt-8 rounded-md border border-[#bd1380]/30 bg-[#fdf2f9] p-4">
            <p className="text-sm font-semibold text-[#a01a6e]">
              আবেদন গৃহীত হয়েছে (ডেমো) — নিচের তথ্য কনসোলে ও এখানে দেখানো হয়েছে।
            </p>
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded bg-white p-3 text-xs text-[#333]">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          {/* Section: your information */}
          <Reveal>
            <h3 className="mb-2 text-xl font-bold text-[#2f2f33]">আপনার তথ্য</h3>
          </Reveal>
          {YOUR_FIELDS.map((f, i) => (
            <Row key={f.name} num={i + 1} label={f.label} required={f.required} htmlFor={f.name}>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                inputMode={f.numeric ? "numeric" : undefined}
                pattern={f.numeric ? "[0-9]*" : undefined}
                required={f.required}
                placeholder={f.label}
                value={values[f.name] ?? ""}
                onChange={(e) => update(f.name, e.target.value, f.numeric)}
                className={inputClass}
              />
            </Row>
          ))}

          {/* Section: nominee information */}
          <Reveal>
            <h3 className="mb-2 mt-8 text-xl font-bold text-[#2f2f33]">
              মনোনীত প্রার্থীর তথ্য
            </h3>
          </Reveal>
          {NOMINEE_FIELDS.map((f, i) => (
            <Row key={f.name} num={i + 1} label={f.label} required={f.required} htmlFor={f.name}>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                inputMode={f.numeric ? "numeric" : undefined}
                pattern={f.numeric ? "[0-9]*" : undefined}
                required={f.required}
                placeholder={f.label}
                value={values[f.name] ?? ""}
                onChange={(e) => update(f.name, e.target.value, f.numeric)}
                className={inputClass}
              />
            </Row>
          ))}

          {/* 7. Category dropdown */}
          <Row num={7} label="বিভাগ বাছাই করুন (যেকোনো একটি বাছাই করতে পারবেন)" htmlFor="category">
            <select
              id="category"
              name="category"
              value={values.category ?? ""}
              onChange={(e) => update("category", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                বিভাগ বাছাই করুন
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Row>

          {/* 8. Reason textarea */}
          <Row
            num={8}
            label="আপনি কেন মনে করেন সে একজন জাতি গড়ার অজানা যোদ্ধা? (Within 1000 words)"
            required
            htmlFor="reason"
          >
            <textarea
              id="reason"
              name="reason"
              required
              rows={5}
              value={values.reason ?? ""}
              onChange={(e) => update("reason", e.target.value)}
              className={inputClass + " resize-y"}
            />
          </Row>

          {/* 9. Photo upload */}
          <Row
            num={9}
            label="মনোনীত প্রার্থীর ছবি সংযুক্ত করুন (Allowed formats: png, jpg, jpeg)"
            htmlFor="photo"
          >
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/png,image/jpeg,.png,.jpg,.jpeg"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              className="block w-full text-sm text-[#333] file:mr-3 file:rounded file:border-0 file:bg-neutral-200 file:px-3 file:py-2 file:text-sm file:text-[#333] hover:file:bg-neutral-300"
            />
          </Row>

          {/* Terms + submit */}
          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm text-[#a01a6e]">
              <input
                type="checkbox"
                name="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="h-4 w-4 accent-[#bd1380]"
              />
              আমি শর্তাবলী পড়েছি
            </label>

            <button
              type="submit"
              disabled={!isValid}
              aria-disabled={!isValid}
              className={
                "mt-5 rounded-md px-7 py-2.5 text-base font-semibold text-white shadow-md ring-1 ring-white/20 transition " +
                (isValid
                  ? "hover:brightness-110 active:scale-[0.99]"
                  : "cursor-not-allowed opacity-50")
              }
              style={{
                background: "linear-gradient(180deg, #822669 0%, #bd1380 100%)",
              }}
            >
              আবেদন করুন
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}