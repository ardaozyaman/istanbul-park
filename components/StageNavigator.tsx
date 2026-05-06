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

const ANIM_DURATION_S = 0.85;

export function StageNavigator() {
  const lenis = useLenis();
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs — synchronous reads for the keydown handler and the animation lock.
  const stageRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const lenisRef = useRef(lenis);

  // Keep refs in sync with reactive values.
  useEffect(() => {
    stageRef.current = stageIndex;
  }, [stageIndex]);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const showIndicator = useCallback(() => {
    setVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  const releaseLock = useCallback(() => {
    isAnimatingRef.current = false;
    setIsAnimating(false);
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // Single entry-point for every navigation source (key, button, anything).
  // Hard-locks until the scroll animation finishes.
  const goToStage = useCallback(
    (next: number) => {
      // Lock check — if animating, swallow the input entirely.
      if (isAnimatingRef.current) return;

      const target = Math.max(0, Math.min(STAGES.length - 1, next));
      const current = stageRef.current;
      if (target === current) {
        showIndicator();
        return;
      }

      const stage = STAGES[target];
      const el = document.querySelector<HTMLElement>(stage.selector);
      if (!el) return;

      // Engage lock and update the indicator immediately for snappy feedback.
      isAnimatingRef.current = true;
      setIsAnimating(true);
      stageRef.current = target;
      setStageIndex(target);
      showIndicator();

      // Compute scroll target.
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const scrollTarget = absoluteTop + (stage.innerOffset ?? 0) * el.offsetHeight;

      const lenisInstance = lenisRef.current;
      if (lenisInstance) {
        lenisInstance.scrollTo(scrollTarget, {
          duration: ANIM_DURATION_S,
          lock: true, // blocks wheel/touch during animation
          force: true, // overrides any prior in-flight scrollTo
          onComplete: () => releaseLock(),
        });
        // Safety net in case onComplete never fires (e.g., navigation interrupt).
        fallbackTimerRef.current = window.setTimeout(
          releaseLock,
          ANIM_DURATION_S * 1000 + 250
        );
      } else {
        // No Lenis (reduced-motion or pre-mount). Use native smooth scroll
        // and release the lock after the expected duration.
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
        fallbackTimerRef.current = window.setTimeout(
          releaseLock,
          ANIM_DURATION_S * 1000 + 100
        );
      }
    },
    [releaseLock, showIndicator]
  );

  const goNext = useCallback(() => {
    goToStage(stageRef.current + 1);
  }, [goToStage]);

  const goPrev = useCallback(() => {
    goToStage(stageRef.current - 1);
  }, [goToStage]);

  // First-paint indicator pulse.
  useEffect(() => {
    showIndicator();
  }, [showIndicator]);

  // Cleanup pending timers on unmount.
  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Keyboard handler — single dispatcher to goToStage. The lock filters spam.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Skip while a stage transition is running. This is the hard guarantee.
      if (isAnimatingRef.current) {
        // Still consume the keys we own so the page doesn't scroll natively.
        if (
          e.code === "Space" ||
          e.key === " " ||
          e.key === "ArrowRight" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "PageDown" ||
          e.key === "PageUp" ||
          e.key === "Home" ||
          e.key === "End"
        ) {
          e.preventDefault();
        }
        return;
      }

      // Skip key auto-repeat — we want one stage advance per fresh press.
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
        next = e.shiftKey ? current - 1 : current + 1;
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next = current + 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        next = current - 1;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = STAGES.length - 1;
      } else {
        return;
      }

      goToStage(next);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToStage]);

  const stage = STAGES[stageIndex];
  const progress = ((stageIndex + 1) / STAGES.length) * 100;
  const isFirst = stageIndex === 0;
  const isLast = stageIndex === STAGES.length - 1;

  // Buttons and key inputs are disabled when animating so the user gets
  // tactile feedback that the system is busy.
  const prevDisabled = isFirst || isAnimating;
  const nextDisabled = isLast || isAnimating;

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
          disabled={prevDisabled}
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
          disabled={nextDisabled}
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
