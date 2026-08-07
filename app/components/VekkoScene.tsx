"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export function VekkoScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.35, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.set(-0.08, -0.18, 0.02);
    scene.add(world);

    const bodyGeometry = new THREE.SphereGeometry(1, 56, 36);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      color: 0x0a1224,
      metalness: 0.82,
      roughness: 0.22,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1.65, 0.52, 0.78);
    body.position.y = -0.08;
    world.add(body);

    const canopyGeometry = new THREE.SphereGeometry(0.72, 40, 24);
    const canopyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe5f6ff,
      metalness: 0.1,
      opacity: 0.82,
      roughness: 0.05,
      transparent: true,
      transmission: 0.35,
    });
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
    canopy.scale.set(1.35, 0.56, 0.72);
    canopy.position.set(0.08, 0.38, -0.02);
    world.add(canopy);

    const wheelGeometry = new THREE.TorusGeometry(0.3, 0.115, 18, 42);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x050b16,
      metalness: 0.65,
      roughness: 0.32,
    });
    [-0.95, 0.95].forEach((x) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(x, -0.43, 0.49);
      world.add(wheel);
    });

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      opacity: 0.72,
      transparent: true,
    });
    const halos: THREE.Mesh[] = [];
    [1.45, 1.78, 2.1].forEach((radius, index) => {
      const haloGeometry = new THREE.TorusGeometry(radius, 0.018, 10, 120);
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.rotation.set(1.13, 0.18 + index * 0.16, index * 0.1);
      world.add(halo);
      halos.push(halo);
    });

    const pointPositions = new Float32Array(270);
    for (let index = 0; index < 90; index += 1) {
      const angle = index * 1.71;
      const radius = 1.8 + ((index * 17) % 29) / 22;
      pointPositions[index * 3] = Math.cos(angle) * radius;
      pointPositions[index * 3 + 1] = Math.sin(angle * 1.4) * 1.5;
      pointPositions[index * 3 + 2] = Math.sin(angle) * 1.4 - 0.8;
    }
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3),
    );
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x9fe4ff,
      opacity: 0.68,
      size: 0.035,
      transparent: true,
    });
    const points = new THREE.Points(pointGeometry, pointMaterial);
    world.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x00b2ff, 22, 10);
    cyanLight.position.set(-2.5, 1.2, 2.5);
    scene.add(cyanLight);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
      world.rotation.y += 0.0022;
      points.rotation.y -= 0.0009;
      halos.forEach((halo, index) => {
        halo.rotation.z += 0.0006 + index * 0.00022;
      });
      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      render();
    }

    const hero = mount.closest("#hero");
    const scrollAnimation = reducedMotion
      ? undefined
      : gsap.to(world.rotation, {
          scrollTrigger: {
            end: "bottom top",
            scrub: 1.2,
            start: "top top",
            trigger: hero ?? mount,
          },
          x: 0.42,
          y: 0.7,
        });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      scrollAnimation?.scrollTrigger?.kill();
      scrollAnimation?.kill();
      resizeObserver.disconnect();
      bodyGeometry.dispose();
      canopyGeometry.dispose();
      wheelGeometry.dispose();
      pointGeometry.dispose();
      bodyMaterial.dispose();
      canopyMaterial.dispose();
      wheelMaterial.dispose();
      haloMaterial.dispose();
      pointMaterial.dispose();
      halos.forEach((halo) => halo.geometry.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="vekko-scene"
      ref={mountRef}
      role="img"
      aria-label="Representação tridimensional de um veículo protegido pelos benefícios VEKKO"
    />
  );
}
