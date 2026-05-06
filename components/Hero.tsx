"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  TRACK_PATH_D,
  TRACK_VIEWBOX,
  START_FINISH,
  TURN_1,
  TURN_8,
} from "@/lib/track-path";
import { BroadcastBar } from "./shared/BroadcastBar";
import { TelemetryBar } from "./shared/TelemetryBar";

export function Hero() {
  const trackOuterRef = useRef<SVGPathElement>(null);
  const trackInnerRef = useRef<SVGPathElement>(null);
  const turn8Ref = useRef<SVGGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const broadcastRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Set up track stroke draw — measure path length and prep dasharray
      const outer = trackOuterRef.current;
      const inner = trackInnerRef.current;
      if (outer && inner) {
        const len = outer.getTotalLength();
        outer.style.strokeDasharray = `${len}`;
        inner.style.strokeDasharray = `${len}`;
        if (reduce) {
          outer.style.strokeDashoffset = "0";
          inner.style.strokeDashoffset = "0";
        } else {
          outer.style.strokeDashoffset = `${len}`;
          inner.style.strokeDashoffset = `${len}`;
        }
      }

      if (reduce) return;

      const tl = gsap.timeline();

      // 1. Broadcast bar slides down
      tl.from(broadcastRef.current, {
        y: -40,
        duration: 0.45,
        ease: "power2.out",
      });

      // 2. Track draws progressively (outer + inner together)
      tl.to(
        [outer, inner],
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
        },
        "-=0.1"
      );

      // 3. Turn 8 marker scale in
      tl.from(
        turn8Ref.current,
        {
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=1.2"
      );

      // 4. Title words fade + slide up (stagger)
      const titleEl = titleRef.current;
      if (titleEl) {
        const lines = titleEl.querySelectorAll<HTMLElement>("[data-line]");
        tl.from(
          lines,
          {
            yPercent: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=2"
        );
      }

      // 5. Tagline + story
      tl.from(
        [taglineRef.current, storyRef.current],
        {
          y: 16,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // 6. Telemetry bar slides up
      tl.from(
        telemetryRef.current,
        {
          y: 40,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col bg-bg"
      aria-label="Istanbul Park hero"
    >
      <div ref={broadcastRef}>
        <BroadcastBar
          left="● LIVE"
          center="F1 / TURKISH GRAND PRIX"
          right="EST. 2005"
        />
      </div>

      {/* Main content: side-by-side */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[42%_58%] relative">
        {/* LEFT — title + story */}
        <div className="relative flex flex-col justify-between p-6 md:p-10 z-10">
          <div>
            <div className="space-y-1">
              <div className="font-mono text-text-tertiary tracking-[0.3em] text-[10px]">
                ◉ CIRCUIT 03 / TUZLA — ISTANBUL
              </div>
              <div className="font-mono text-text-tertiary tracking-[0.3em] text-[10px]">
                41.0837°N · 29.4051°E
              </div>
            </div>

            {/* Presenter / institution credit */}
            <div className="mt-5 pt-4 border-t border-border/70">
              <div className="font-mono text-text-tertiary tracking-[0.3em] text-[10px] mb-2.5">
                ◉ PRESENTED BY
              </div>
              <div className="font-mono text-white tracking-[0.12em] text-[14px] leading-snug">
                METEHAN KAHVECİ
              </div>
              <div className="mt-1.5 font-mono text-text-secondary tracking-[0.12em] text-[12px] leading-snug">
                KARABÜK ÜNİVERSİTESİ
              </div>
              <div className="font-mono text-text-secondary tracking-[0.12em] text-[12px] leading-snug">
                TURİZM FAKÜLTESİ · TURİZM REHBERLİĞİ
              </div>
              <div className="mt-2 font-mono text-text-tertiary tracking-[0.3em] text-[10px]">
                STUDENT ID · 2211304018
              </div>
            </div>
          </div>

          <div ref={titleRef}>
            <div className="font-mono text-accent tracking-[0.4em] text-[11px] mb-4">
              — A 26-YEAR STORY —
            </div>
            <div className="overflow-hidden">
              <div
                data-line
                className="font-display font-black tracking-[-0.04em] leading-[0.92] text-[clamp(48px,7vw,80px)]"
              >
                ISTANBUL
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                data-line
                className="font-display font-black tracking-[-0.04em] leading-[0.92] text-[clamp(48px,7vw,80px)]"
              >
                PARK
              </div>
            </div>
            <div ref={taglineRef} className="flex items-center mt-5">
              <div className="w-8 h-[2px] bg-accent" />
              <div className="ml-3 font-serif italic text-white tracking-[0.2em] text-sm">
                Rise · Fall · Return
              </div>
            </div>
            <p
              ref={storyRef}
              className="mt-5 max-w-md font-serif italic text-text-secondary text-sm leading-relaxed"
            >
              The complete story of a racetrack that became a nation's pride —
              and is rising again.
            </p>
          </div>

          <div className="font-mono text-accent tracking-[0.3em] text-[10px] flex items-center gap-2 animate-pulse">
            <span>SCROLL TO EXPLORE</span>
            <span className="text-sm not-sr-only">↓</span>
          </div>
        </div>

        {/* RIGHT — track */}
        <div className="relative w-full h-[420px] md:h-auto">
          <div className="absolute top-3 right-4 font-mono text-accent tracking-[0.3em] text-[9px] z-10">
            ● SCANNING CIRCUIT
          </div>
          <svg
            viewBox={TRACK_VIEWBOX}
            className="w-full h-full"
            role="img"
            aria-labelledby="track-title track-desc"
          >
            <title id="track-title">Istanbul Park circuit map</title>
            <desc id="track-desc">
              The 5.338 km Istanbul Park Formula 1 circuit, designed by Hermann
              Tilke. Anti-clockwise direction. 14 turns. The pulsing red marker
              indicates Turn 8, the famous Diabolica corner with peak forces of
              5G.
            </desc>

            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer glowing red track */}
            <path
              ref={trackOuterRef}
              d={TRACK_PATH_D}
              fill="none"
              stroke="#ff1801"
              strokeWidth="8"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity="0.95"
            />
            {/* Inner crisp white line */}
            <path
              ref={trackInnerRef}
              d={TRACK_PATH_D}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
              opacity="0.5"
            />

            {/* Start/Finish line */}
            <line
              x1={START_FINISH.x}
              y1={START_FINISH.y - 12}
              x2={START_FINISH.x}
              y2={START_FINISH.y + 12}
              stroke="#ffffff"
              strokeWidth="6"
            />
            <text
              x={START_FINISH.x - 80}
              y={START_FINISH.y + 38}
              fill="#ffffff"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              letterSpacing="2"
            >
              S/F
            </text>

            {/* Turn 1 marker */}
            <circle cx={TURN_1.x} cy={TURN_1.y} r="8" fill="#ffffff" opacity="0.9" />
            <text
              x={TURN_1.x + 22}
              y={TURN_1.y + 8}
              fill="#aaaaaa"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              letterSpacing="2"
            >
              T1
            </text>

            {/* Turn 8 — the star */}
            <g ref={turn8Ref}>
              <circle
                cx={TURN_8.x}
                cy={TURN_8.y}
                r="50"
                fill="none"
                stroke="#ff1801"
                strokeWidth="1.5"
                opacity="0.3"
                className="pulse-ring"
              />
              <circle
                cx={TURN_8.x}
                cy={TURN_8.y}
                r="30"
                fill="none"
                stroke="#ff1801"
                strokeWidth="2.5"
                opacity="0.55"
              />
              <circle
                cx={TURN_8.x}
                cy={TURN_8.y}
                r="14"
                fill="#ff1801"
                filter="url(#strongGlow)"
                aria-label="Turn 8, the famous Diabolica corner"
              />

              {/* Callout — pointing left into the empty inside-loop area */}
              <line
                x1={TURN_8.x - 12}
                y1={TURN_8.y - 5}
                x2={TURN_8.x - 195}
                y2={TURN_8.y - 105}
                stroke="#ff1801"
                strokeWidth="2"
                opacity="0.7"
              />
              <text
                x={TURN_8.x - 205}
                y={TURN_8.y - 110}
                fill="#ff1801"
                fontSize="26"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
                letterSpacing="3"
                textAnchor="end"
              >
                TURN 8
              </text>
              <text
                x={TURN_8.x - 205}
                y={TURN_8.y - 86}
                fill="#aaaaaa"
                fontSize="14"
                fontStyle="italic"
                fontFamily="Georgia, serif"
                letterSpacing="2"
                textAnchor="end"
              >
                &quot;Diabolica&quot;
              </text>
              <text
                x={TURN_8.x - 205}
                y={TURN_8.y - 66}
                fill="#666666"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1"
                textAnchor="end"
              >
                5.0G · 4 APEXES
              </text>
            </g>

            {/* Direction indicator */}
            <text
              x={-220}
              y={500}
              fill="#666666"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              letterSpacing="3"
            >
              ◀ ANTI-CLOCKWISE
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom telemetry bar */}
      <div ref={telemetryRef}>
        <TelemetryBar
          slots={[
            { label: "DESIGNER", value: "H. TILKE" },
            { label: "LENGTH", value: "5.338 KM" },
            { value: "▲ 5.0G PEAK", accent: true },
            { label: "TURNS", value: "14" },
            { label: "RACES", value: "9" },
            { value: "2027 → 2031", accent: true },
            { label: "REVENUE", value: "$250M / YR" },
          ]}
        />
      </div>
    </section>
  );
}
