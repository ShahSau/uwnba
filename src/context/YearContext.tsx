"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_YEAR, type YearKey } from "@/data/years";

interface YearContextValue {
  year: YearKey;
  setYear: (year: YearKey) => void;
}

const YearContext = createContext<YearContextValue>({
  year: DEFAULT_YEAR,
  setYear: () => {},
});

export function YearProvider({ children }: { children: ReactNode }) {
  const [year, setYear] = useState<YearKey>(DEFAULT_YEAR);
  return (
    <YearContext.Provider value={{ year, setYear }}>
      {children}
    </YearContext.Provider>
  );
}

export function useYear() {
  return useContext(YearContext);
}