export function Intro() {
  return (
    <section
      className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden"
      aria-label="Introduction"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,24,1,0.04) 60px, rgba(255,24,1,0.04) 61px)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="hud text-accent text-[11px] mb-6">— CHAPTER 00 / PROLOGUE —</div>
        <h2 className="font-display font-black tracking-[-0.03em] leading-[1.05] text-[clamp(36px,5.5vw,68px)]">
          Built in{" "}
          <span className="text-accent">eighteen months.</span>
          <br />
          Loved by drivers.
          <br />
          Lost in six years.{" "}
          <span className="text-accent">Coming back for five more.</span>
        </h2>
        <p className="mt-10 max-w-3xl text-text-secondary text-base md:text-lg leading-relaxed font-serif">
          This is the complete story of <span className="text-white">Istanbul Park</span> — Türkiye&rsquo;s
          Formula 1 circuit in Tuzla, Istanbul. From its 2003 construction to
          the legendary Turn&nbsp;8, from the financial collapse of 2011 to
          Lewis Hamilton&rsquo;s seventh world title in the rain — and now, a
          confirmed return that places Türkiye back on the global motorsport
          map from 2027.
        </p>
      </div>
    </section>
  );
}
