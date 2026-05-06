import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { TimelineTrack } from "@/components/TimelineTrack";
import { Turn8Spotlight } from "@/components/Turn8Spotlight";
import { ReturnSection } from "@/components/ReturnSection";
import { TourismImpact } from "@/components/TourismImpact";
import { Outro } from "@/components/Outro";
import { QuizSection } from "@/components/QuizSection";
import { StageNavigator } from "@/components/StageNavigator";

export default function Home() {
  return (
    <main className="bg-bg text-text-primary">
      <div id="stage-hero">
        <Hero />
      </div>
      <div id="stage-intro">
        <Intro />
      </div>
      <div id="stage-timeline">
        <TimelineTrack />
      </div>
      <div id="stage-turn8">
        <Turn8Spotlight />
      </div>
      <div id="stage-return">
        <ReturnSection />
      </div>
      <div id="stage-tourism">
        <TourismImpact />
      </div>
      <div id="stage-outro">
        <Outro />
      </div>
      <div id="stage-quiz">
        <QuizSection />
      </div>
      <StageNavigator />
    </main>
  );
}
