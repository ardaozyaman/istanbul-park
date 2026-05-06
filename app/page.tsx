import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { TimelineTrack } from "@/components/TimelineTrack";
import { Turn8Spotlight } from "@/components/Turn8Spotlight";
import { ReturnSection } from "@/components/ReturnSection";
import { TourismImpact } from "@/components/TourismImpact";
import { Outro } from "@/components/Outro";

export default function Home() {
  return (
    <main className="bg-bg text-text-primary">
      <Hero />
      <Intro />
      <TimelineTrack />
      <Turn8Spotlight />
      <ReturnSection />
      <TourismImpact />
      <Outro />
    </main>
  );
}
