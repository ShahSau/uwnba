import type { YearKey } from "./years";

export interface VideoItem {
  /** A full YouTube URL or a bare 11-char video ID. */
  link: string;
  name: string;
}

export const VIDEOS: Partial<Record<YearKey, VideoItem[]>> = {
  "2023": [
    {
      link: "https://www.youtube.com/watch?v=Rnz48iEH3BM",
      name: "আল্পনা রাণী",
    },
    {
      link: "https://www.youtube.com/watch?v=J1XJBLSxD8g",
      name: "নাসিমা আক্তার",
    },
    {
      link: "https://www.youtube.com/watch?v=z-bK_MomDTg",
      name: "হ্লা ক্রই প্রু খিয়াং",
    },
    { link: "https://www.youtube.com/watch?v=mhpsadsI3-A", name: "টিটু পাল" },
    {
      link: "https://www.youtube.com/watch?v=d44gohyGSk8",
      name: "সুরাইয়া ফারহানা রেশমা",
    },
  ],
  "2022": [
    {
      link: "https://www.youtube.com/watch?v=I4UUYReHJXg",
      name: "জামিলা বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=3FCrQRCIZUw",
      name: "তাকিয়া সুলতানা নোভা",
    },
    {
      link: "https://www.youtube.com/watch?v=nPDI0U1Elng",
      name: "জান্নাতুল ফেরদৌস মহুয়া",
    },
    {
      link: "https://www.youtube.com/watch?v=iBlq4rDCjIY",
      name: "তামান্না আক্তার নূরা",
    },
    {
      link: "https://www.youtube.com/watch?v=vrE4Bp54ZBo",
      name: "তাহিয়াতুল জান্নাত",
    },
    { link: "https://www.youtube.com/watch?v=e_GvioDwWD4", name: "শিলা গুহ" },
    {
      link: "https://www.youtube.com/watch?v=ZRidirdQs2k&t=14s",
      name: "জান্নাতুল সরকার চম্পা",
    },
  ],
  "2021": [
    {
      link: "https://www.youtube.com/watch?v=OZiLoXtbhrY",
      name: "সাবিনা ইয়াসমিন",
    },
    {
      link: "https://www.youtube.com/watch?v=qVJT6t5Y2u4",
      name: "ফার্মিস আক্তার",
    },
    {
      link: "https://www.youtube.com/watch?v=HCNuHCRWeqg",
      name: "জাহানারা ইসলাম",
    },
    {
      link: "https://www.youtube.com/watch?v=ILeEUQPkxxg",
      name: "ফৌজিয়া বিথী",
    },
    {
      link: "https://www.youtube.com/watch?v=wYlZYFdTa1o",
      name: "রোজিনা আক্তার",
    },
    {
      link: "https://www.youtube.com/watch?v=nQERWvIVWOQ",
      name: "শাপলা দেবী ত্রিপুরা",
    },
  ],
  "2020": [
    {
      link: "https://www.youtube.com/watch?v=8u-J1rEt6RU",
      name: "মমতাজ মহল বেবি",
    },
    {
      link: "https://www.youtube.com/watch?v=x1H2j8nFTSo",
      name: "কামরুন নাহার মুন্নি",
    },
    {
      link: "https://www.youtube.com/watch?v=990KPmQIN5E",
      name: "সোনু রানী দাস",
    },
    {
      link: "https://www.youtube.com/watch?v=wGwiV7z8PCE",
      name: "টেপরি রানী",
    },
    {
      link: "https://www.youtube.com/watch?v=8sRHwM4QdNU",
      name: "বিভা রানী",
    },
    {
      link: "https://www.youtube.com/watch?v=UDG8BhX2N44",
      name: "লায়লা বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=HQ6-O1_PyYc",
      name: "কোহিনূর বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=xxuCvXrAAjM",
      name: "জয়া চাকমা",
    },
  ],
  "2019": [
    {
      link: "https://www.youtube.com/watch?v=EERUCswCO8w",
      name: "হাজেরা বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=Bie9gT66UQk",
      name: "খুরশিদ জাহান",
    },
    {
      link: "https://www.youtube.com/watch?v=2mdwBbvILaA",
      name: "হিরোকো কোবায়াশি",
    },
    {
      link: "https://www.youtube.com/watch?v=sFAa1g2pMSs",
      name: "রূপা দত্ত",
    },
    {
      link: "https://www.youtube.com/watch?v=fq1-g6_Ir3I",
      name: "বিলকিস বানু",
    },
    {
      link: "https://www.youtube.com/watch?v=9Kjd2XQ3Kco",
      name: "ছবি দাস গুপ্ত",
    },
    {
      link: "https://www.youtube.com/watch?v=koOvIYOlWn4",
      name: "সালমা চৌধুরী",
    },
  ],
  "2018": [
    {
      link: "https://www.youtube.com/watch?v=f6cY2jQkjEk",
      name: "লুসি হেলেন ফ্রান্সিস হল্ট",
    },
    {
      link: "https://www.youtube.com/watch?v=HOYA_MFXDNo",
      name: "অঁতোয়ানেত টারমোশুইজেন",
    },
    {
      link: "https://www.youtube.com/watch?v=nWu6VJ26ydM",
      name: "নাজনীন আক্তার নিপা",
    },
    {
      link: "https://www.youtube.com/watch?v=jbeL9TxqO9Q",
      name: "সাফিয়া বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=JuQ3M7owEEw",
      name: "প্রতিভা সাঙমা",
    },
    {
      link: "https://www.youtube.com/watch?v=2q2LdwPN0FQ",
      name: "আকলিমা বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=02gwKDXVE6c",
      name: "আরিফা আখতার",
    },
  ],
  "2017": [
    {
      link: "https://www.youtube.com/watch?v=NsmXyUuYa8A",
      name: "মাফতাহুল জান্নাত লিখন",
    },
    {
      link: "https://www.youtube.com/watch?v=y_btmp_6I-M",
      name: "শাহিদা আক্তার স্বর্ণা",
    },
    {
      link: "https://www.youtube.com/watch?v=oRt93aPInSM",
      name: "ফাতেমা বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=-yVX91Wpg1g",
      name: "সোনাজান আক্তার",
    },
    {
      link: "https://www.youtube.com/watch?v=dRdjGpmyUhg",
      name: "ইরানি বাড়ই",
    },
    {
      link: "https://www.youtube.com/watch?v=Li7VrIjFWTk",
      name: "রোকেয়া বেগম",
    },
    {
      link: "https://www.youtube.com/watch?v=gs-jTHRaF_A",
      name: "ডা. ভাগ্য রানী বণিক",
    },
  ],
};

export function getVideos(year: YearKey): VideoItem[] {
  return VIDEOS[year] ?? [];
}

/** Accepts watch / youtu.be / embed / shorts URLs or a bare ID. */
export function youTubeId(link: string): string {
  if (!link) return "";
  const m = link.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/,
  );
  if (m) return m[1];
  if (/^[\w-]{11}$/.test(link.trim())) return link.trim();
  return "";
}
