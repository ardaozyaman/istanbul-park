const TICKER_FACTS = [
  "F1 RETURNS",
  "TUZLA · ISTANBUL",
  "ANNOUNCED 24 APRIL 2026",
  "5-YEAR DEAL",
  "2027 → 2031",
  "TOSFED",
  "MINISTRY OF YOUTH AND SPORTS",
  "$250M / YEAR",
  "200K VISITORS / WEEK",
  "1.5B GLOBAL TV REACH",
];

export function ReturnSection() {
  // Duplicate the array so the ticker can loop seamlessly.
  const looped = [...TICKER_FACTS, ...TICKER_FACTS];

  return (
    <section
      className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden bg-elevated"
      aria-label="The Return — 2027 to 2031"
    >
      <div className="max-w-6xl mx-auto">
        <div className="hud text-accent text-[11px] mb-4">
          — APRIL 24, 2026 / DOLMABAHÇE, ISTANBUL —
        </div>
        <h2 className="font-display font-black tracking-[-0.04em] leading-[0.92] text-[clamp(56px,9vw,120px)]">
          THE RETURN
        </h2>
        <div className="mt-6 flex items-center gap-3">
          <span className="w-10 h-[2px] bg-accent" />
          <span className="hud text-accent text-[12px]">
            FIVE YEARS · 2027 → 2031
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-serif">
            Formula 1 and Türkiye&rsquo;s Ministry of Youth and Sports
            officially confirmed the return of the Turkish Grand Prix to
            Istanbul Park under a five-year contract running from 2027 through
            2031. President Recep Tayyip Erdoğan symbolically pressed the
            button to launch the new era at a ceremony in Dolmabahçe.
          </p>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-serif">
            For the first time since 2011, Türkiye&rsquo;s flagship motorsport
            venue is back in the Formula 1 calendar long-term. The deal places
            Istanbul Park alongside the championship&rsquo;s most established
            circuits and signals a strategic recommitment to motorsport as a
            pillar of national tourism.
          </p>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-20 border-y border-border bg-bg overflow-hidden">
        <div
          className="ticker-track flex whitespace-nowrap"
          style={{ width: "max-content" }}
          aria-hidden="true"
        >
          {looped.map((fact, i) => (
            <span
              key={i}
              className="hud text-[12px] py-4 px-8 border-r border-border text-text-tertiary"
            >
              {fact === "F1 RETURNS" || fact === "2027 → 2031" ? (
                <span className="text-accent">{fact}</span>
              ) : (
                fact
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
