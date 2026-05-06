"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Turn8Spotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(stripRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden"
      aria-label="Turn 8, the famous Diabolica corner"
      style={{
        background:
          "radial-gradient(ellipse at center bottom, rgba(255,24,1,0.18) 0%, rgba(0,0,0,0) 70%), #000",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="hud text-accent text-[11px]">— DRIVERS REMEMBER —</div>

        <blockquote
          ref={quoteRef}
          className="mt-10 font-serif italic text-white text-[clamp(22px,3.4vw,38px)] leading-[1.35] tracking-[-0.01em]"
        >
          <span className="text-accent text-5xl leading-none align-top mr-1">
            &ldquo;
          </span>
          It&rsquo;s an amazing corner. You&rsquo;re flat-out for what feels
          like forever. The car is on the limit and you don&rsquo;t want to
          give an inch — but if you give too much, you&rsquo;re in the wall.
          <span className="text-accent text-5xl leading-none align-top ml-1">
            &rdquo;
          </span>
        </blockquote>

        <div className="mt-6 hud text-text-tertiary text-[11px]">
          — FELIPE MASSA · 3× WINNER AT ISTANBUL PARK
        </div>
      </div>

      <div
        ref={stripRef}
        className="mt-20 max-w-4xl mx-auto border-t-2 border-accent pt-8 grid grid-cols-2 gap-6"
      >
        <div>
          <div className="hud text-text-tertiary text-[10px]">CORNER NAME</div>
          <div className="font-serif italic text-accent text-[clamp(28px,4vw,44px)] leading-tight mt-1">
            Diabolica
          </div>
        </div>
        <div className="text-right">
          <div className="hud text-text-tertiary text-[10px]">PEAK G-FORCE</div>
          <div className="font-display font-black text-white text-[clamp(28px,4vw,44px)] leading-tight mt-1 tracking-tight">
            5.0G
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto flex flex-wrap justify-between gap-4 hud text-text-muted text-[10px]">
        <span>LENGTH · 640M</span>
        <span>DURATION · 8.5 SEC</span>
        <span>MIN SPEED · 260 KM/H</span>
        <span>APEXES · 4</span>
        <span className="text-accent">12% OF EVERY LAP</span>
      </div>
    </section>
  );
}
