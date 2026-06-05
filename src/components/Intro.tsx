import { Reveal, CountUp } from "@/components/Motion";

/* ------------------------------------------------------------------ *
 * TEXT CONTENT — transcribed from the screenshot.
 * Please proofread the Bengali against your source and fix any chars.
 * ------------------------------------------------------------------ */
const PARAGRAPH =
  "দেশের বিভিন্ন প্রান্তে অনেক নারী তৃণমূল থেকে নিরলসভাবে কাজ করে যাচ্ছেন। কিছু কাজ হয়তো ছিল তাদের সামর্থ্যের বাইরেও। কিন্তু সমস্ত বৈষম্যের বাঁধা পেরিয়েও তারা এগিয়ে চলেছেন। দেশের প্রথম বেসরকারি খাতের এনবিএফআই আইপিডিসি এবং শীর্ষস্থানীয় ইংরেজি পত্রিকা দি ডেইলি স্টার খুঁজছে সেই অজানা ও অদম্য নারীদের, যারা বাংলাদেশের উন্নয়নে গুরুত্বপূর্ণ অবদান রেখেছেন। ২০১৭ সাল থেকে প্রতি বছর সমাজে পরিবর্তন নিয়ে আসা নারীদের ‘আনসাং ওমেন নেশন বিল্ডার্স অ্যাওয়ার্ড’ প্রদান করা হচ্ছে এবং বিশ্বকে অনুপ্রাণিত করার জন্য জাতি গঠনে তাদের অসাধারণ যাত্রা তুলে ধরা হচ্ছে।";

const STATS: { value: number; plus?: boolean; label: string }[] = [
  { value: 7, label: "টি সংস্করণ" },
  { value: 64, label: "টি জেলা" },
  { value: 250, plus: true, label: "গল্প" },
  { value: 47, label: "জন সংগ্রামী অজানা নারী" },
];

/* Category icons are IMAGES — drop them in public/categories/ with these names. */
const CATEGORIES: { label: string; icon: string }[] = [
  { label: "স্বাস্থ্য", icon: "/categories/health.png" },
  { label: "উদ্যোক্তা", icon: "/categories/entrepreneur.png" },
  { label: "শিক্ষা", icon: "/categories/education.png" },
  { label: "সমাজকল্যাণ", icon: "/categories/social-welfare.png" },
  { label: "পরিবেশ ও জলবায়ু পরিবর্তন প্রশমন", icon: "/categories/environment.png" },
];

export default function Intro() {
  return (
    <section className="w-full px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Intro paragraph */}
        <Reveal>
          <p className="mx-auto max-w-[1080px] text-justify text-[15px] leading-[1.9] text-[#3f3f46] sm:text-base">
            {PARAGRAPH}
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-start justify-center gap-x-10 gap-y-7 sm:mt-16 sm:gap-x-16">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120}>
              <div className="flex items-baseline gap-2">
                <span
                  className="uwnba-stat-num"
                  style={{ fontFamily: "var(--font-bn-num)" }}
                >
                  <CountUp to={stat.value} plus={stat.plus} />
                </span>
                <span className="max-w-[120px] text-md leading-tight text-[#4b4b52]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <h2
              className="text-center text-xl font-semibold sm:text-2xl"
              style={{ color: "var(--uwnba-headline)" }}
            >
              ক্যাটাগরি
            </h2>
          </Reveal>

          <div className="mt-9 flex flex-wrap items-start justify-center gap-x-10 gap-y-9 sm:mt-12 sm:gap-x-16">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 100}>
                <div className="group flex w-32 flex-col items-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="h-16 w-16 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110"
                  />
                  <span className="mt-3 text-md font-bold leading-tight text-[#4b4b52]">
                    {cat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}