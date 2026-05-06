import type { Chapter } from "@/lib/timeline-data";

type Props = {
  chapter: Chapter;
};

export function TimelineChapter({ chapter }: Props) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 transition-opacity">
      <div className="hud text-text-tertiary text-[10px] mb-2">
        CHAPTER {chapter.chapterNumber}
      </div>
      <div className="font-display font-black text-accent leading-[0.92] tracking-[-0.04em] text-[clamp(56px,8vw,96px)]">
        {chapter.yearLabel}
      </div>
      <div className="hud text-accent text-[11px] mt-3 mb-6">
        {chapter.eraLabel}
      </div>

      <div className="w-12 h-[2px] bg-accent mb-6" />

      <h3 className="font-display font-bold text-white text-[clamp(22px,2.6vw,32px)] leading-[1.18] tracking-[-0.02em] max-w-md">
        {chapter.title}
      </h3>
      <p className="mt-5 max-w-lg text-text-secondary leading-relaxed text-base font-serif">
        {chapter.body}
      </p>

      {chapter.stats && (
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          {chapter.stats.map((s) => (
            <div key={s.label} className="border-t border-border pt-2">
              <div className="hud text-text-muted text-[9px]">{s.label}</div>
              <div className="font-mono font-bold text-accent text-base mt-1 tracking-wider">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
