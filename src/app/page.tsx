import { YearProvider } from "@/context/YearContext";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Winners from "@/components/Winners";
import NewsCarousel from "@/components/NewsCarousel";
import VideoSection from "@/components/Videosection";
import GalaGallery from "@/components/GalaGallery";

export default function Home() {
  return (
    <main className="flex-1">
      <YearProvider>
        <Hero />
        <Intro />
        <Winners />
        <NewsCarousel />
        <VideoSection />
        <GalaGallery />
      </YearProvider>
    </main>
  );
}