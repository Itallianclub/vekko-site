/**
 * Efeitos de rolagem da landing (GSAP + ScrollTrigger).
 *
 * Regras: só `transform` e `opacity`; reveals com `once: true` (não revertem ao subir);
 * nada de pin nem scrub na página (scrub só na cena do carro, dentro da seção);
 * tudo desligado com `prefers-reduced-motion: reduce`.
 *
 * Todo alvo passa por `q()`: seletor sem alvo gera aviso no console em dev, nunca falha em silêncio.
 *
 * Fica de fora de propósito:
 * - Cascata do hero: é CSS (hero.css, keyframes hero-in-*), para rodar na primeira pintura,
 *   sem "piscar" e sem atrasar o LCP esperando o GSAP carregar.
 * - Barra de download: a visibilidade é do React (download-bar.tsx), para funcionar também
 *   com movimento reduzido.
 */
type Gsap = typeof import("gsap").gsap;

const EASE = "power3.out";
const IS_DEV = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);

let gsapRef: Gsap;

/** Busca alvos; em dev avisa quando o seletor não encontra nada. `optional` silencia o aviso. */
function q<T extends Element = HTMLElement>(selector: string, optional = false): T[] {
  const elements = gsapRef.utils.toArray<T>(selector);
  if (!elements.length && !optional && IS_DEV) console.warn(`[motion] seletor sem alvo: ${selector}`);
  return elements;
}

/** Elemento já visível ao iniciar: não esconder (evita sumir e reaparecer). */
const belowFold = (element: Element) => element.getBoundingClientRect().top >= window.innerHeight;

export async function initMotion(): Promise<() => void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  gsapRef = gsap;

  const cleanups: Array<() => void> = [];
  const context = gsap.context(() => {
    storyLines(gsap);
    stepNumbers(gsap);
    planCards(gsap);
    reveals(gsap);
    cleanups.push(carWashSequence(gsap));
  });

  // O layout muda quando a Sora termina de carregar.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
  };
}

/* Linhas da História acendem uma a uma: --ink a 72% (≈ --ink-muted) → --ink.
   Só opacity (não anima cor). 72% sobre o --mist mantém contraste AA (~6.7:1). */
function storyLines(gsap: Gsap) {
  q(".story-line")
    .filter(belowFold)
    .forEach((line, index) => {
      gsap.fromTo(
        line,
        { opacity: 0.72, y: 12 },
        {
          delay: index * 0.12,
          duration: 0.6,
          ease: EASE,
          opacity: 1,
          scrollTrigger: { once: true, start: "top 78%", trigger: line },
          y: 0,
        },
      );
    });
}

/* Passos 01–04 em cascata. */
function stepNumbers(gsap: Gsap) {
  const [list] = q(".steps");
  const steps = q(".step");
  if (!list || !steps.length || !belowFold(list)) return;
  gsap.from(steps, {
    duration: 0.6,
    ease: EASE,
    opacity: 0,
    scrollTrigger: { once: true, start: "top 75%", trigger: list },
    stagger: 0.08,
    y: 20,
  });
}

/* Cards de plano em cascata; o Essential sobe um pouco mais.
   Anima o <li class="plan-card">; o lift e o hover ficam no .plan-card__inner (CSS). */
function planCards(gsap: Gsap) {
  const [list] = q(".plan-list");
  const cards = q(".plan-card");
  if (!list || !cards.length || !belowFold(list)) return;
  const trigger = { once: true, start: "top 78%", trigger: list };
  const featuredIndex = cards.findIndex((card) => card.classList.contains("is-featured"));

  // Um tween por elemento: dois `from()` no mesmo card fariam o segundo ler o y=28 do primeiro
  // como posição final, e o Essential ficaria parado 28px abaixo.
  gsap.from(
    cards.filter((_, index) => index !== featuredIndex),
    {
      duration: 0.65,
      ease: EASE,
      opacity: 0,
      scrollTrigger: trigger,
      stagger: (index) => (index < featuredIndex ? index : index + 1) * 0.09, // mantém a ordem da cascata
      y: 28,
    },
  );
  if (featuredIndex >= 0) {
    gsap.from(cards[featuredIndex], {
      delay: featuredIndex * 0.09,
      duration: 0.75,
      ease: EASE,
      opacity: 0,
      scrollTrigger: trigger,
      y: 40,
    });
  }
}

/* Reveal padrão do resto (títulos, FAQ, CTA final): opacity + y16, 500ms, 60ms entre irmãos. */
function reveals(gsap: Gsap) {
  const reveal = { clearProps: "opacity,transform", duration: 0.5, ease: "expo.out", opacity: 0, y: 16 };

  q("[data-reveal]")
    .filter(belowFold)
    .forEach((element) => {
      gsap.from(element, { ...reveal, scrollTrigger: { once: true, start: "top 90%", trigger: element } });
    });

  q("[data-reveal-group]").forEach((group) => {
    const items = Array.from(group.children).filter(belowFold);
    if (!items.length) return;
    gsap.from(items, { ...reveal, scrollTrigger: { once: true, start: "top 90%", trigger: items[0] }, stagger: 0.06 });
  });
}

/* Cena do carro de sujo a limpo: sequência de frames num canvas, controlada pela rolagem (scrub
   só dentro da seção, sem pin). Os frames só carregam quando a seção chega perto da viewport.
   Abaixo de 640px não roda: o CSS mostra só o final.webp. */
function carWashSequence(gsap: Gsap): () => void {
  const [canvas] = q<HTMLCanvasElement>(".wash-canvas", true); // seção só existe com os assets prontos
  const section = canvas?.closest<HTMLElement>(".wash");
  const context2d = canvas?.getContext("2d");
  if (!canvas || !section || !context2d) return () => undefined;
  if (window.matchMedia("(max-width: 639px)").matches) return () => undefined;

  const total = Number(canvas.dataset.frames) || 48;
  const frames: HTMLImageElement[] = [];
  const state = { i: 0 };

  const draw = () => {
    const image = frames[Math.round(state.i)];
    if (!image?.complete || !image.naturalWidth) return;
    context2d.clearRect(0, 0, canvas.width, canvas.height);
    context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  const loadFrame = (index: number) => {
    const image = new Image();
    image.decoding = "async";
    image.src = `/wash/${String(index + 1).padStart(3, "0")}.webp`;
    image.addEventListener("load", () => {
      if (index === Math.round(state.i)) draw();
    });
    frames[index] = image;
    return image;
  };

  // O 1º frame vai na frente: só se ele existir os outros 47 são pedidos.
  // Sem assets, fica 1 requisição com erro (não 48) + o aviso abaixo.
  const load = () => {
    const first = loadFrame(0);
    first.addEventListener("load", () => {
      for (let index = 1; index < total; index += 1) loadFrame(index);
    }, { once: true });
    first.addEventListener("error", () => {
      console.warn("[motion] frames da cena do carro não encontrados em /wash/ — usando final.webp");
      section.classList.add("is-fallback");
    }, { once: true });
  };

  // Carrega a sequência só quando a seção se aproxima da viewport.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      load();
    },
    { rootMargin: "400px 0px" },
  );
  observer.observe(section);

  gsap.to(state, {
    ease: "none",
    i: total - 1,
    onUpdate: draw,
    scrollTrigger: { end: "bottom 20%", scrub: 0.5, start: "top 80%", trigger: section },
  });

  return () => observer.disconnect();
}
