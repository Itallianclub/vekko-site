/**
 * Eventos de produto enviados ao PostHog.
 * Se o PostHog ainda não carregou (ele entra sob demanda), os eventos ficam numa fila
 * e são enviados assim que o cliente inicializa.
 */
type EventProperties = Record<string, string | number | boolean>;

type PostHogLike = { capture: (event: string, properties?: EventProperties) => void };

declare global {
  interface Window {
    posthog?: PostHogLike;
    __vekkoEventQueue?: Array<[string, EventProperties]>;
  }
}

export type TrackedEvent =
  | { name: "store_click"; properties: { store: "app_store" | "google_play"; section: string } }
  | { name: "plan_cta_click"; properties: { plan: string } }
  | { name: "scroll_depth"; properties: { depth: 25 | 50 | 75 | 100 } };

export function track<E extends TrackedEvent>(name: E["name"], properties: E["properties"]) {
  if (typeof window === "undefined") return;
  if (window.posthog?.capture) {
    window.posthog.capture(name, properties);
    return;
  }
  (window.__vekkoEventQueue ??= []).push([name, properties]);
}

export function flushQueuedEvents(client: PostHogLike) {
  const queue = window.__vekkoEventQueue ?? [];
  window.__vekkoEventQueue = [];
  for (const [name, properties] of queue) client.capture(name, properties);
}
