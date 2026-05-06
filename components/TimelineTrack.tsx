"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TRACK_PATH_D,
  TRACK_VIEWBOX,
  START_FINISH,
} from "@/lib/track-path";
import { chapters } from "@/lib/timeline-data";
import { TimelineChapter } from "./TimelineChapter";

gsap.registerPlugin(ScrollTrigger);

export function TimelineTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const markerRingRef = useRef<SVGCircleElement>(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const path = trailPathRef.current;
      if (!path || !containerRef.current) return;

      const totalLength = path.getTotalLength();

      // Initialise trail dasharray.
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = reduce ? "0" : `${totalLength}`;

      // For reduced motion: place marker at end, full trail, no scroll trigger.
      if (reduce) {
        const endPoint = path.getPointAtLength(totalLength);
        markerRef.current?.setAttribute("cx", `${endPoint.x}`);
        markerRef.current?.setAttribute("cy", `${endPoint.y}`);
        markerRingRef.current?.setAttribute("cx", `${endPoint.x}`);
        markerRingRef.current?.setAttribute("cy", `${endPoint.y}`);
        setActiveChapterIndex(chapters.length - 1);
        return;
      }

      // Initial marker position at start.
      const startPoint = path.getPointAtLength(0);
      markerRef.current?.setAttribute("cx", `${startPoint.x}`);
      markerRef.current?.setAttribute("cy", `${startPoint.y}`);
      markerRingRef.current?.setAttribute("cx", `${startPoint.x}`);
      markerRingRef.current?.setAttribute("cy", `${startPoint.y}`);

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;

          // Trail: stroke-dashoffset animates from full → 0 as we scroll.
          path.style.strokeDashoffset = `${totalLength * (1 - progress)}`;

          // Marker follows the path.
          const point = path.getPointAtLength(progress * totalLength);
          markerRef.current?.setAttribute("cx", `${point.x}`);
          markerRef.current?.setAttribute("cy", `${point.y}`);
          markerRingRef.current?.setAttribute("cx", `${point.x}`);
          markerRingRef.current?.setAttribute("cy", `${point.y}`);

          // Determine active chapter.
          const idx = chapters.findIndex(
            (ch) =>
              progress >= ch.scrollSegment[0] &&
              progress <= ch.scrollSegment[1] + 0.0001
          );
          if (idx !== -1) {
            setActiveChapterIndex(idx);
          }
        },
      });

      return () => trigger.kill();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-bg"
      style={{ minHeight: `${chapters.length * 100}vh` }}
      aria-label="Istanbul Park timeline 2003 to 2021"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden border-y border-border"
      >
        {/* Top status bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-bg/85 backdrop-blur-sm border-b border-border px-5 py-2 flex justify-between hud text-[10px]">
          <span className="text-accent">● TRAVELLING THE CIRCUIT</span>
          <span className="text-text-tertiary">
            ANTI-CLOCKWISE / 5.338 KM / 14 TURNS
          </span>
          <span className="text-text-tertiary">
            CHAPTER {chapters[activeChapterIndex]?.chapterNumber}
          </span>
        </div>

        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[60%_40%]">
          {/* LEFT — track */}
          <div className="relative w-full h-full pt-12 md:pt-14 pb-6 px-4 md:px-8">
            <svg
              viewBox={TRACK_VIEWBOX}
              className="w-full h-full"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="trail-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base (untraveled) gray track */}
              <path
                ref={basePathRef}
                d={TRACK_PATH_D}
                fill="none"
                stroke="#1f1f1f"
                strokeWidth="8"
                strokeLinejoin="round"
              />
              {/* Animated red trail (overlays the base) */}
              <path
                ref={trailPathRef}
                d={TRACK_PATH_D}
                fill="none"
                stroke="#ff1801"
                strokeWidth="8"
                strokeLinejoin="round"
                filter="url(#trail-glow)"
              />

              {/* Start/Finish line */}
              <line
                x1={START_FINISH.x}
                y1={START_FINISH.y - 12}
                x2={START_FINISH.x}
                y2={START_FINISH.y + 12}
                stroke="#ffffff"
                strokeWidth="4"
                opacity="0.7"
              />
              <text
                x={START_FINISH.x - 80}
                y={START_FINISH.y + 38}
                fill="#666"
                fontSize="20"
                fontFamily="ui-monospace, monospace"
                letterSpacing="2"
              >
                S/F
              </text>

              {/* Marker — outer pulse ring */}
              <circle
                ref={markerRingRef}
                cx={START_FINISH.x}
                cy={START_FINISH.y}
                r="28"
                fill="none"
                stroke="#ff1801"
                strokeWidth="2"
                opacity="0.55"
              />
              {/* Marker — inner solid */}
              <circle
                ref={markerRef}
                cx={START_FINISH.x}
                cy={START_FINISH.y}
                r="14"
                fill="#ff1801"
                filter="url(#marker-glow)"
              />
            </svg>
          </div>

          {/* RIGHT — chapter panel */}
          <div className="relative bg-elevated border-l border-border pt-12 md:pt-14">
            {chapters.map((ch, i) => (
              <div
                key={ch.id}
                className="transition-opacity duration-500"
                style={{
                  opacity: i === activeChapterIndex ? 1 : 0,
                  pointerEvents: i === activeChapterIndex ? "auto" : "none",
                }}
              >
                <TimelineChapter chapter={ch} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom progress strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-bg/85 backdrop-blur-sm border-t border-border px-5 py-2.5">
          <div className="flex justify-between hud text-[10px] text-text-tertiary mb-1.5">
            {chapters.map((ch, i) => (
              <span
                key={ch.id}
                className={
                  i === activeChapterIndex ? "text-accent" : "text-text-tertiary"
                }
              >
                {ch.yearLabel}
              </span>
            ))}
          </div>
          <div className="h-[2px] bg-subtle relative">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-100"
              style={{
                width: `${
                  ((activeChapterIndex + 1) / chapters.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
