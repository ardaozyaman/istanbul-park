"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatThousand?: boolean;
  className?: string;
};

export function Counter({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  formatThousand = false,
  className,
}: Props) {
  const [display, setDisplay] = useState<string>(() =>
    formatNumber(0, decimals, formatThousand)
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated || !ref.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDisplay(formatNumber(to, decimals, formatThousand));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to,
            duration,
            ease: "power2.out",
            onUpdate: () => setDisplay(formatNumber(obj.v, decimals, formatThousand)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration, decimals, formatThousand, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function formatNumber(n: number, decimals: number, thousand: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!thousand) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}
