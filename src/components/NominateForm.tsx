"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
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

/* Max upload size for the nominee photo. */
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

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

  // Image upload (ImgBB) states
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // EmailJS status state
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(name: string, raw: string, numeric?: boolean) {
    const v = numeric ? raw.replace(/[^0-9]/g, "") : raw; // digits only for number boxes
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function handleImageUpload(file: File) {
    setUploadError(null);
    setPhotoUrl("");

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setUploadError("শুধুমাত্র png, jpg, jpeg ফরম্যাট অনুমোদিত।");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError("ছবির আকার ৫ মেগাবাইটের কম হতে হবে।");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setUploadError("ImgBB API key পাওয়া যায়নি।");
      return;
    }

    setFileName(file.name);
    setIsUploadingImage(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });
      const json = await res.json();
      if (json?.success && json?.data?.display_url) {
        setPhotoUrl(json.data.display_url as string);
      } else {
        setUploadError("ছবি আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("ImgBB upload error:", err);
      setUploadError("ছবি আপলোডে সমস্যা হয়েছে।");
    } finally {
      setIsUploadingImage(false);
    }
  }

  const isValid =
    REQUIRED.every((n) => (values[n] ?? "").trim() !== "") && terms;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isSubmitting || isUploadingImage) return;

    setIsSubmitting(true);

    // Format data for EmailJS template
    const templateParams = {
      ...values,
      photo_name: fileName || "(no file attached)",
      photo_url: photoUrl || "(no image uploaded)",
      terms_accepted: terms ? "Yes" : "No",
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        function () {
          setIsSubmitting(false);
          toast.success("সব ঠিকঠাক! আপনার আবেদন পাঠানো হয়েছে।");

          // Reset form on success
          setValues({});
          setTerms(false);
          setFileName("");
          setPhotoUrl("");
          setUploadError(null);

          if (typeof window !== "undefined")
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        function (error) {
          setIsSubmitting(false);
          toast.error("কিছু একটা ঠিকভাবে হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
          console.error("EmailJS Error:", error);
        }
      );
  }

  const formBusy = isSubmitting || isUploadingImage;

  return (
    <section className="w-full px-4 py-10">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { fontSize: "14px" },
          success: { iconTheme: { primary: "#bd1380", secondary: "#fff" } },
        }}
      />
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </Row>

          {/* 9. Photo upload (uploads to ImgBB, sends the URL via EmailJS) */}
          <Row
            num={9}
            label="মনোনীত প্রার্থীর ছবি সংযুক্ত করুন (Allowed formats: png, jpg, jpeg)"
            htmlFor="photo"
          >
            <div>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="block w-full text-sm text-[#333] file:mr-3 file:rounded file:border-0 file:bg-neutral-200 file:px-3 file:py-2 file:text-sm file:text-[#333] hover:file:bg-neutral-300"
                disabled={isSubmitting || isUploadingImage}
              />

              {isUploadingImage && (
                <p className="mt-1.5 flex items-center gap-2 text-xs text-[#a01a6e]">
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#bd1380] border-t-transparent" />
                  ছবি আপলোড হচ্ছে...
                </p>
              )}

              {!isUploadingImage && photoUrl && (
                <p className="mt-1.5 text-xs text-emerald-600">
                  ✓ ছবি আপলোড হয়েছে{fileName ? `: ${fileName}` : ""}
                </p>
              )}

              {uploadError && (
                <p className="mt-1.5 text-xs text-red-600">{uploadError}</p>
              )}
            </div>
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
                disabled={isSubmitting}
              />
              আমি শর্তাবলী পড়েছি
            </label>

            <button
              type="submit"
              disabled={!isValid || formBusy}
              aria-disabled={!isValid || formBusy}
              className={
                "mt-5 rounded-md px-7 py-2.5 text-base font-semibold text-white shadow-md ring-1 ring-white/20 transition " +
                (isValid && !formBusy
                  ? "hover:brightness-110 active:scale-[0.99]"
                  : "cursor-not-allowed opacity-50")
              }
              style={{
                background: "linear-gradient(180deg, #822669 0%, #bd1380 100%)",
              }}
            >
              {isUploadingImage
                ? "ছবি আপলোড হচ্ছে..."
                : isSubmitting
                ? "আবেদন পাঠানো হচ্ছে..."
                : "আবেদন করুন"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}