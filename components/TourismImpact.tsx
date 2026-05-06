"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS: { label: string; lead: string; punch: string; tail: string }[] = [
  {
    label: "200,000 VISITORS PER RACE WEEK",
    lead: "Filling Galatasaray's stadium",
    punch: "four times over",
    tail: ", every single race weekend.",
  },
  {
    label: "1.5 BILLION GLOBAL TV VIEWERS",
    lead: "That is",
    punch: "19% of humanity",
    tail: " — seeing Istanbul on screen, every race.",
  },
  {
    label: "$250 MILLION ANNUAL ECONOMIC BENEFIT",
    lead: "Enough to build",
    punch: "two new five-star hotels",
    tail: " in Istanbul, every year.",
  },
];

export function TourismImpact() {
  const barOldRef = useRef<HTMLDivElement>(null);
  const barNewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const bars = [barOldRef.current, barNewRef.current].filter(Boolean);
      bars.forEach((bar) => {
        if (!bar) return;
        const targetWidth = bar.dataset.target ?? "0%";
        if (reduce) {
          bar.style.width = targetWidth;
        } else {
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12"
      aria-label="Tourism and economic impact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="hud text-accent text-[11px] mb-12">— SCALE OF IMPACT —</div>

        <div className="space-y-12 md:space-y-16">
          {ROWS.map((row, i) => (
            <div key={i} className="border-t border-border pt-6">
              <div className="hud text-text-tertiary text-[11px]">
                {row.label}
              </div>
              <p className="mt-3 font-serif italic text-[clamp(24px,3.4vw,40px)] leading-[1.25] text-white">
                {row.lead}{" "}
                <span className="not-italic font-display font-black text-accent">
                  {row.punch}
                </span>
                {row.tail}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison bars */}
        <div className="mt-20 border-t border-border pt-10">
          <div className="hud text-text-tertiary text-[11px] mb-8">
            — 2011 vs 2027 / ANNUAL ECONOMIC IMPACT —
          </div>

          <div className="space-y-5 max-w-3xl">
            <div className="flex items-center gap-4 hud text-[11px]">
              <span className="w-32 text-text-tertiary">2011 (LAST GP)</span>
              <div className="flex-1 h-2 bg-subtle relative">
                <div
                  ref={barOldRef}
                  data-target="38%"
                  className="absolute inset-y-0 left-0 bg-text-tertiary"
                  style={{ width: "0%" }}
                />
              </div>
              <span className="w-20 text-right text-text-secondary">$95M</span>
            </div>

            <div className="flex items-center gap-4 hud text-[11px]">
              <span className="w-32 text-accent">2027 (NEW DEAL)</span>
              <div className="flex-1 h-2 bg-subtle relative">
                <div
                  ref={barNewRef}
                  data-target="100%"
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: "0%" }}
                />
              </div>
              <span className="w-20 text-right text-accent font-bold">
                $250M
              </span>
            </div>
          </div>

          <p className="mt-8 hud text-text-muted text-[10px]">
            ◉ SOURCE: F1 / TÜRKİYE MINISTRY OF YOUTH AND SPORTS · APRIL 2026
          </p>
        </div>
      </div>
    </section>
  );
}
