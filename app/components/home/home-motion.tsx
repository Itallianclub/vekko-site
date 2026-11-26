"use client";

import { useEffect } from "react";
import { initMotion } from "../../lib/motion";

/** Chama `initMotion()` uma vez, depois do mount e da primeira pintura (não pesa no LCP). */
export function HomeMotion() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => {
      initMotion()
        .then((revert) => {
          if (cancelled) revert();
          else cleanup = revert;
        })
        .catch(() => undefined);
    });

    return () => {
      cancelled = true;
      cancelIdle(handle);
      cleanup?.();
    };
  }, []);

  return null;
}
