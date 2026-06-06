import type { YearKey } from "./years";

export interface NewsItem {
  title: string;
  /** Photo under /public, e.g. /news/2022/news-1.jpg */
  image: string;
  /** Article URL (opens in a new tab). */
  link: string;
}


export const NEWS: Partial<Record<YearKey, NewsItem[]>> = {
  "2022": [
    {
      title:
        "IPDC Finance and The Daily Star recognize women change makers from grassroots",
      image: "/news/news1.jpeg",
      link: "https://www.tbsnews.net/economy/corporates/ipdc-finance-and-daily-star-recognize-women-change-makers-grassroots-938021",
    },
    {
      title: "Hats off to grassroots women torchbearers",
      image: "/news/news2.jpeg",
      link: "https://www.thedailystar.net/news/bangladesh/news/hats-grassroots-women-torchbearers-3698861",
    },
    {
      title: "Unsung Women: Mountains they moved",
      image: "/news/news3.jpg",
      link: "https://www.thedailystar.net/supplements/unsung-women-ceremony-special/news/mountains-they-moved-1877893",
    },
    {
      title: "Celebrating the unsung women nation-builders",
      image: "/news/news4.jpg",
      link: "https://www.thedailystar.net/supplements/celebrating-the-unsung-women-nation-builders-1410085",
    },
    {
      title: "Salute to Silent Doers",
      image: "/news/news5.jpg",
      link: "https://www.thedailystar.net/frontpage/news/7-unsung-women-change-makers-awarded-salute-silent-doers-1709788",
    },
    {
      title: "Unsung women: Nation Builders 2018",
      image: "/news/news6.png",
      link: "https://www.thedailystar.net/frontpage/unsung-women-of-bangladesh-change-maker-nation-builders-of-2018-1543192",
    },
    {
      title: "Saluting our unsung women heroes",
      image: "/news/news7.jpg",
      link: "https://www.thedailystar.net/editorial/news/saluting-our-unsung-women-heroes-1710112",
    },
  ],
};

export function getNews(): NewsItem[] {
  return NEWS["2022"] ?? [];
}
