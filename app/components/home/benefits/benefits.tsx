"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { benefitNetworkNodes, benefits } from "../home-data";
import "./benefits.css";

export function Benefits() {
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const network = networkRef.current;
    if (!network) return;

    const hub = network.querySelector<HTMLElement>("[data-network-hub]");
    const nodes = Array.from(network.querySelectorAll<HTMLElement>("[data-network-node]"));
    const connectionGroups = Array.from(network.querySelectorAll<SVGGElement>("[data-network-connection]"));
    if (!hub || nodes.length !== connectionGroups.length) return;

    const updateConnections = () => {
      const networkRect = network.getBoundingClientRect();
      const hubRect = hub.getBoundingClientRect();
      const startX = hubRect.left + hubRect.width / 2 - networkRect.left;
      const startY = hubRect.top + hubRect.height / 2 - networkRect.top;

      nodes.forEach((node, index) => {
        const nodeRect = node.getBoundingClientRect();
        const endX = nodeRect.left + nodeRect.width / 2 - networkRect.left;
        const endY = nodeRect.top + nodeRect.height / 2 - networkRect.top;
        const controlX = startX + (endX - startX) * 0.5;
        const pathData = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;

        connectionGroups[index].querySelectorAll<SVGPathElement>("path").forEach((path) => {
          path.setAttribute("d", pathData);
          path.style.setProperty("--network-path-length", `${path.getTotalLength()}`);
        });
      });
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          network.classList.add("is-network-active");
          intersectionObserver.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    const resizeObserver = new ResizeObserver(updateConnections);

    updateConnections();
    intersectionObserver.observe(network);
    resizeObserver.observe(network);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="section benefits-section" id="beneficios">
      <div className="site-shell">
        <div className="section-heading" data-reveal>
          <div><span className="section-kicker">Feito para a vida real</span><h2>Menos improviso. Mais cuidado.</h2></div>
          <p>A VEKKO transforma uma tarefa recorrente em uma experiência simples, previsível e confiável.</p>
        </div>
        <div className="benefits-deck">
          {benefits.map((benefit, index) => (
            <article className={`benefit-card ${benefit.className}`} data-reveal key={benefit.title}>
              <div className="benefit-content">
                <div className="benefit-meta">
                  <i className={`bi ${benefit.icon}`} aria-hidden="true" />
                  <div>
                    <span className="benefit-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="section-kicker">{benefit.eyebrow}</span>
                  </div>
                </div>
                <div className="benefit-copy">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </div>

              {index === 0 && (
                <div className="benefit-app-strip">
                  <span><i className="bi bi-card-checklist" /></span>
                  <div><small>Seu Plano:</small><strong>Premium (Ativo)</strong></div>
                  <div><small>Data de Revisão</small><strong>15/05/2025</strong></div>
                </div>
              )}

              {index === 1 && (
                <div className="benefit-phone-visual" aria-hidden="true">
                  <Image
                    src="/benefits-qr-phone.png"
                    alt=""
                    width={1024}
                    height={1536}
                    sizes="190px"
                  />
                </div>
              )}

              {index === 2 && (
                <div className="benefit-transparency" aria-hidden="true">
                  <span><i /></span>
                  <div><strong>{benefit.stat}</strong><small>de Transparência</small></div>
                </div>
              )}

              {index === 3 && (
                <div className="benefit-network-visual" aria-hidden="true" ref={networkRef}>
                  <svg className="benefit-network-map" viewBox="0 0 720 220" preserveAspectRatio="none">
                    <path className="map-road" d="M-30 170C120 80 170 250 340 125S570 15 760 90" />
                    <path className="map-road" d="M30-10C160 100 245 40 360 120s225 115 390 20" />
                    <path className="map-road map-road-thin" d="M90 240C150 110 275 190 390 80S590 40 690-20" />
                  </svg>
                  <svg className="benefit-network-lines">
                    {benefitNetworkNodes.map((node) => (
                      <g className="network-connection" data-network-connection key={node.label}>
                        <path className="network-link network-link-base" />
                        <path className="network-link network-link-energy" />
                      </g>
                    ))}
                  </svg>
                  <span className="benefit-network-center" data-network-hub>
                    <Image src="/vekko-symbol.png" alt="" width={48} height={38} />
                  </span>
                  <span className="benefit-filter filter-service"><i className="bi bi-funnel" /> Filtrar por serviço</span>
                  <span className="benefit-filter filter-distance"><i className="bi bi-geo-alt" /> Filtrar por proximidade</span>
                  {benefitNetworkNodes.map((node) => (
                    <span className={`benefit-network-node ${node.className}`} data-network-node key={node.label}>
                      <i className={`bi ${node.icon}`} />
                      <b>{node.label}</b>
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
