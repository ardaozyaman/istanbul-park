type Source = { title: string; url: string };

const SOURCES: Source[] = [
  {
    title: "Istanbul Park — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Istanbul_Park",
  },
  {
    title: "Turkish Grand Prix — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Turkish_Grand_Prix",
  },
  {
    title: "Formula 1 returns to Türkiye's Istanbul Park from 2027 — Formula1.com",
    url: "https://www.formula1.com/en/latest/article/formula-1-returns-to-turkeys-istanbul-park-from-2027-as-part-of-new-five-year-agreement.1I7OZGeDPoC6Vysv3iqadY",
  },
  {
    title: "Türkiye set for tourism boom as F1 returns 2027–2031 — Travel And Tour World",
    url: "https://www.travelandtourworld.com/news/article/turkiye-set-for-massive-tourism-boom-as-formula-1-grand-prix-returns-to-istanbul-park-circuit-from-2027-through-2031/",
  },
  {
    title: "Turkey's Turn 8: One of the most challenging corners in F1 — Formula1.com",
    url: "https://www.formula1.com/en/latest/article/turkeys-turn-8-taking-on-one-of-the-most-challenging-corners-in-f1.N4iqF6KjTuWPCfpDBJgEu",
  },
  {
    title: "How F1 failed in Turkey — RaceFans",
    url: "https://www.racefans.net/2011/09/01/f1s-failure-turkey/",
  },
  {
    title: "Türkiye's Istanbul Park to host F1 for at least five years from 2027 — Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/4/24/turkiyes-istanbul-park-to-host-f1-for-at-least-five-years-from-2027",
  },
  {
    title: "Wikimedia Commons SVG (CC-BY-SA 3.0)",
    url: "https://commons.wikimedia.org/wiki/File:Istanbul_park.svg",
  },
];

export function Outro() {
  return (
    <section
      className="relative py-32 md:py-40 px-6 md:px-12"
      aria-label="Conclusion and sources"
    >
      <div className="max-w-5xl mx-auto">
        <div className="hud text-accent text-[11px] mb-8">— CONCLUSION —</div>
        <h2 className="font-display font-black tracking-[-0.03em] leading-[1.05] text-[clamp(36px,5vw,64px)]">
          A racetrack is never just a racetrack.
        </h2>
        <p className="mt-8 max-w-3xl font-serif text-text-secondary text-base md:text-lg leading-relaxed">
          For Türkiye, Istanbul Park is more than asphalt. It is a stage —
          built for speed, lost to economics, won back through patience. As
          tourism guides, our job will not just be to point at the track. It
          will be to tell its story: what it cost, what it took, and what it
          can still mean for the country that built it.
        </p>

        <div className="mt-16 border-t border-border pt-10">
          <div className="hud text-accent text-[11px] mb-4">
            — OPEN QUESTION TO THE CLASS —
          </div>
          <p className="font-serif italic text-[clamp(20px,2.6vw,32px)] leading-[1.3] text-white max-w-3xl">
            Should Türkiye fight to keep Formula 1 beyond 2031 — and if so,
            what does the country need to deliver?
          </p>
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <div className="hud text-text-tertiary text-[11px] mb-6">— SOURCES —</div>
          <ul className="space-y-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent text-sm font-mono tracking-wide underline-offset-4 hover:underline transition-colors"
                >
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-20 pt-8 border-t border-border hud text-text-muted text-[10px] flex flex-wrap justify-between gap-4">
          <span>DESIGNED FOR MESLEKİ İNGİLİZCE · 3RD YEAR / TOURISM GUIDANCE</span>
          <span>ISTANBUL PARK · TUZLA · 41.0837°N · 29.4051°E</span>
        </footer>
      </div>
    </section>
  );
}
