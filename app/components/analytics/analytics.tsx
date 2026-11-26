"use client";

import { useEffect } from "react";
import { flushQueuedEvents, track } from "../../lib/analytics";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
// Projeto da VEKKO fica na região EU (mesmo host do app e da API).
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const DEPTHS = [25, 50, 75, 100] as const;

/**
 * - Carrega o PostHog depois da primeira pintura (não pesa no LCP), se houver chave.
 *   Se a página já tiver um `window.posthog` (snippet externo), ele é reaproveitado.
 * - Dispara `scroll_depth` uma única vez em 25/50/75/100%.
 */
export function Analytics() {
  useEffect(() => {
    let cancelled = false;
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;

    const handle = idle(async () => {
      if (window.posthog) return flushQueuedEvents(window.posthog);
      if (!POSTHOG_KEY) return;
      const { default: posthog } = await import("posthog-js");
      if (cancelled) return;
      // Mínimo necessário (LGPD + camada gratuita): sem cookies, sem autocapture, sem gravação, sem flags.
      posthog.init(POSTHOG_KEY, {
        advanced_disable_flags: true,
        api_host: POSTHOG_HOST,
        autocapture: false,
        capture_pageleave: false,
        disable_session_recording: true,
        disable_surveys: true,
        persistence: "memory",
        person_profiles: "identified_only",
      });
      window.posthog = posthog;
      flushQueuedEvents(posthog);
    });

    return () => {
      cancelled = true;
      cancelIdle(handle);
    };
  }, []);

  useEffect(() => {
    const reached = new Set<number>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const depth of DEPTHS) {
        if (percent >= depth - 1 && !reached.has(depth)) {
          reached.add(depth);
          track("scroll_depth", { depth });
        }
      }
      if (reached.size === DEPTHS.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
