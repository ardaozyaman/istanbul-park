"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "./LenisProvider";

type Stage = {
  id: string;
  label: string;
  selector: string;
  // For scroll-driven sections (TimelineTrack), 0..1 inside the section.
  innerOffset?: number;
};

// 10 stages — matches the original "10-slide" plan.
const STAGES: Stage[] = [
  { id: "hero", label: "HERO", selector: "#stage-hero" },
  { id: "intro", label: "PROLOGUE", selector: "#stage-intro" },
  { id: "timeline-1", label: "01 / THE BIRTH 2003–2005", selector: "#stage-timeline", innerOffset: 0.08 },
  { id: "timeline-2", label: "02 / GOLDEN ERA 2005–2011", selector: "#stage-timeline", innerOffset: 0.30 },
  { id: "timeline-3", label: "03 / THE FALL 2011", selector: "#stage-timeline", innerOffset: 0.47 },
  { id: "timeline-4", label: "04 / COMEBACK 2012–2021", selector: "#stage-timeline", innerOffset: 0.64 },
  { id: "turn8", label: "TURN 8 · DIABOLICA", selector: "#stage-turn8" },
  { id: "return", label: "THE RETURN 2027–2031", selector: "#stage-return" },
  { id: "tourism", label: "SCALE OF IMPACT", selector: "#stage-tourism" },
  { id: "outro", label: "CONCLUSION", selector: "#stage-outro" },
];

export function StageNavigator() {
  const lenis = useLenis();
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const hideTimerRef = useRef<number | null>(null);
  const stageRef = useRef(0);

  const showIndicator = useCallback(() => {
    setVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  const scrollToStage = useCallback(
    (index: number) => {
      const stage = STAGES[index];
      if (!stage) return;
      const el = document.querySelector<HTMLElement>(stage.selector);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const target =
        absoluteTop + (stage.innerOffset ?? 0) * el.offsetHeight;

      if (lenis) {
        lenis.scrollTo(target, { duration: 0.95, lock: true });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    [lenis]
  );

  useEffect(() => {
    stageRef.current = stageIndex;
  }, [stageIndex]);

  // Hide indicator after first paint.
  useEffect(() => {
    showIndicator();
  }, [showIndicator]);

  const goNext = useCallback(() => {
    const current = stageRef.current;
    const next = Math.min(current + 1, STAGES.length - 1);
    if (next !== current) {
      setStageIndex(next);
      scrollToStage(next);
    }
    showIndicator();
  }, [scrollToStage, showIndicator]);

  const goPrev = useCallback(() => {
    const current = stageRef.current;
    const next = Math.max(current - 1, 0);
    if (next !== current) {
      setStageIndex(next);
      scrollToStage(next);
    }
    showIndicator();
  }, [scrollToStage, showIndicator]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore key auto-repeat — one stage advance per fresh press only.
      if (e.repeat) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const current = stageRef.current;
      let next: number | null = null;

      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        next = e.shiftKey
          ? Math.max(current - 1, 0)
          : Math.min(current + 1, STAGES.length - 1);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next = Math.min(current + 1, STAGES.length - 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        next = Math.max(current - 1, 0);
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = STAGES.length - 1;
      } else {
        return;
      }

      if (next !== null && next !== current) {
        setStageIndex(next);
        scrollToStage(next);
      }
      showIndicator();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollToStage, showIndicator]);

  const stage = STAGES[stageIndex];
  const progress = ((stageIndex + 1) / STAGES.length) * 100;
  const isFirst = stageIndex === 0;
  const isLast = stageIndex === STAGES.length - 1;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-50"
      } hover:!opacity-100`}
      onMouseEnter={showIndicator}
    >
      {/* Info card */}
      <div className="bg-bg/90 backdrop-blur-sm border border-border px-4 py-2.5 min-w-[280px]">
        <div className="flex items-center justify-between hud text-[10px]">
          <span className="text-text-tertiary">STAGE</span>
          <span className="text-accent font-bold">
            {String(stageIndex + 1).padStart(2, "0")} /{" "}
            {String(STAGES.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-1 hud text-[10px] text-text-secondary truncate">
          {stage?.label}
        </div>
        <div className="mt-2 h-[2px] bg-subtle relative">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* F1-style PREV / NEXT buttons */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            goPrev();
          }}
          disabled={isFirst}
          aria-label="Previous stage"
          className="group relative bg-bg/90 backdrop-blur-sm border border-border hover:border-accent disabled:hover:border-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-3 cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 hud text-[11px] text-text-secondary group-hover:text-accent group-disabled:group-hover:text-text-secondary transition-colors">
            <span className="text-base leading-none">▲</span>
            <span>PREV</span>
          </div>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-text-tertiary group-hover:border-accent transition-colors" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-text-tertiary group-hover:border-accent transition-colors" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            goNext();
          }}
          disabled={isLast}
          aria-label="Next stage"
          className="group relative bg-accent/15 hover:bg-accent disabled:bg-bg/90 disabled:opacity-30 disabled:cursor-not-allowed border border-accent disabled:border-border transition-colors px-3 py-3 cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 hud text-[11px] text-accent group-hover:text-black disabled:text-text-tertiary transition-colors font-bold">
            <span>NEXT</span>
            <span className="text-base leading-none">▼</span>
          </div>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
        </button>
      </div>

      {/* Help footer */}
      <div className="mt-1.5 hud text-[8px] text-text-muted text-right tracking-[0.3em]">
        SPACE · NEXT &nbsp; ⇧SPACE · PREV
      </div>
    </div>
  );
}
