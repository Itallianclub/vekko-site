"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HomeAnimationsProps = {
  children: ReactNode;
};

export function HomeAnimations({ children }: HomeAnimationsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", { delay: 0.08, duration: 0.86, ease: "power3.out", opacity: 0, stagger: 0.08, y: 26 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { duration: 0.76, ease: "power3.out", opacity: 0, scrollTrigger: { start: "top 86%", trigger: element }, y: 38 });
      });
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
