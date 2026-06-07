export type YearKey =
  | "2023"
  | "2022"
  | "2021"
  | "2020"
  | "2019"
  | "2018"
  | "2017";

// Newest first, matching the original top-nav order (২০২৩ → ২০১৭).
export const YEARS: readonly YearKey[] = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
] as const;


export const DEFAULT_YEAR: YearKey = "2023";

export interface YearData {
  year: YearKey;
  bannerSrc: string | null;
  bannerAlt: string;
}

export const YEAR_DATA: Record<YearKey, YearData> = {
  "2023": { year: "2023", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2023 award winners" },
  "2022": {
    year: "2022",
    bannerSrc: "/web_banner.png",
    bannerAlt: "UWNBA 2022 award winners",
  },
  "2021": { year: "2021", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2021 award winners" },
  "2020": { year: "2020", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2020 award winners" },
  "2019": { year: "2019", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2019 award winners" },
  "2018": { year: "2018", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2018 award winners" },
  "2017": { year: "2017", bannerSrc: "/web_banner.png", bannerAlt: "UWNBA 2017 award winners" },
};

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** "2023" -> "২০২৩" */
export function toBengaliNumber(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}