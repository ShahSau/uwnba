import type { Metadata } from "next";
import { YearProvider } from "@/context/YearContext";
import Hero from "@/components/Hero";
import NominateForm from "@/components/NominateForm";
import SiteFooter from "@/components/SiteFooter";
 
export const metadata: Metadata = {
  title: "আবেদন করুন | UWNBA",
};
 
export default function NominatePage() {
  return (
    <main className="flex-1">
      <YearProvider>
        <Hero showCta={false} />
      </YearProvider>
 
      <NominateForm />
 
      <SiteFooter showCta={false} />
    </main>
  );
}