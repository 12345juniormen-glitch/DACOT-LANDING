"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; ox: number; oy: number; vx: number; vy: number;
  phase: number; size: number; startX: number; startY: number; dx: number; dy: number;
};

/** Adapted from CursorDrivenParticleTypography: native Canvas, repulsion and return. */
export function CursorDrivenParticleTypography({ explode }: { explode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const explodeRef = useRef(explode);
  useEffect(() => { explodeRef.current = explode; }, [explode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const surface = canvas;
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const fineQuery = matchMedia("(hover: hover) and (pointer: fine)");
    let particles: Particle[] = [];
    let width = 0, height = 0, frame = 0, last = 0, explosionStart: number | null = null;
    let disposed = false, fontsReady = false;
    let pointer = { x: -1000, y: -1000 };
    let color = "#b97c4f";
    let compact = false;
    let explosionFinished = false;

    function resize() {
      if (disposed || !fontsReady) return;
      const box = surface.getBoundingClientRect();
      width = box.width; height = box.height;
      if (!width || !height) return;
      compact = !fineQuery.matches || width < 600;
      const dpr = Math.min(devicePixelRatio || 1, compact ? 1.25 : 1.75);
      surface.width = Math.round(width * dpr); surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(surface);
      color = style.getPropertyValue("--color-copper").trim() || color;
      const family = style.fontFamily;
      ctx.font = `600 100px ${family}`;
      const measured = ctx.measureText("DACOT");
      const baseWidth = measured.actualBoundingBoxLeft + measured.actualBoundingBoxRight || measured.width;
      const baseHeight = measured.actualBoundingBoxAscent + measured.actualBoundingBoxDescent || 75;
      const fontSize = Math.min(Math.min(width * 0.84, 960) / baseWidth, height * 0.28 / baseHeight) * 100;
      const font = `600 ${fontSize}px ${family}`;
      ctx.font = font;
      const ink = ctx.measureText("DACOT");
      const mask = document.createElement("canvas");
      mask.width = Math.ceil(ink.actualBoundingBoxLeft + ink.actualBoundingBoxRight) + 4;
      mask.height = Math.ceil(ink.actualBoundingBoxAscent + ink.actualBoundingBoxDescent) + 4;
      const maskCtx = mask.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;
      maskCtx.font = font;
      maskCtx.fillStyle = "white";
      maskCtx.fillText("DACOT", 2 + ink.actualBoundingBoxLeft, 2 + ink.actualBoundingBoxAscent);
      const pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
      const maximum = compact ? 700 : 2400;
      const step = Math.max(compact ? 2 : 3, Math.ceil(Math.sqrt(mask.width * mask.height * 0.4 / maximum)));
      const candidates: { x: number; y: number }[] = [];
      for (let y = 1; y < mask.height; y += step) {
        for (let x = 1; x < mask.width; x += step) {
          if (pixels[(y * mask.width + x) * 4 + 3] > 128) candidates.push({ x: (width - mask.width) / 2 + x, y: (height - mask.height) / 2 + y });
        }
      }
      const stride = Math.max(1, candidates.length / maximum);
      particles = [];
      for (let index = 0; index < candidates.length && particles.length < maximum; index += stride) {
        const point = candidates[Math.floor(index)];
        particles.push({ x: point.x, y: point.y, ox: point.x, oy: point.y, vx: 0, vy: 0,
          phase: Math.random() * Math.PI * 2, size: compact ? 1.05 : 1.35,
          startX: point.x, startY: point.y, dx: 0, dy: 0 });
      }
      // Generate only after fonts are ready, and on resize, never per frame.
      if (explosionStart !== null) prepareExplosion();
      surface.dataset.layoutWidth = String(width);
      surface.dataset.layoutHeight = String(height);
      surface.dataset.reducedMotion = String(motionQuery.matches);
      surface.dataset.interactive = String(!compact && fineQuery.matches && !motionQuery.matches);
      surface.dataset.textWidth = String(mask.width);
      surface.dataset.textHeight = String(mask.height);
      surface.dataset.particles = String(particles.length);
      surface.dataset.dpr = String(dpr);
      draw(performance.now());
      // Reveal only after the first particle frame has been painted to the canvas.
      surface.dataset.ready = String(particles.length > 0);
      schedule();
    }

    function prepareExplosion() {
      for (const particle of particles) {
        const angle = Math.atan2(particle.oy - height / 2, particle.ox - width / 2) + (Math.random() - 0.5) * 0.7;
        const distance = (compact ? 70 : 130) + Math.random() * Math.min(width * 0.4, 420);
        particle.startX = particle.x; particle.startY = particle.y;
        particle.dx = Math.cos(angle) * distance; particle.dy = Math.sin(angle) * distance;
      }
    }

    function draw(now: number) {
      const dt = Math.min(2, last ? (now - last) / 16.67 : 1);
      last = now;
      ctx.clearRect(0, 0, width, height);
      if (explodeRef.current && explosionStart === null) {
        explosionStart = now;
        prepareExplosion();
      }
      const progress = explosionStart === null ? 0 : Math.min(1, (now - explosionStart) / 600);
      ctx.fillStyle = color;
      ctx.globalAlpha = explosionStart === null || motionQuery.matches ? 1 : Math.pow(1 - progress, 1.25);
      for (const particle of particles) {
        if (explosionStart !== null && !motionQuery.matches) {
          const travel = progress + progress * progress * 0.65;
          particle.x = particle.startX + particle.dx * travel;
          particle.y = particle.startY + particle.dy * travel;
        } else if (!motionQuery.matches) {
          const dx = particle.x - pointer.x, dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (!compact && fineQuery.matches && distance < 110 && distance > 0.01) {
            const force = (1 - distance / 110) * 2.8 * dt;
            particle.vx += dx / distance * force; particle.vy += dy / distance * force;
          }
          particle.vx += (particle.ox - particle.x) * 0.035 * dt;
          particle.vy += (particle.oy - particle.y) * 0.035 * dt;
          const damping = Math.pow(0.82, dt);
          particle.vx *= damping; particle.vy *= damping;
          particle.x += particle.vx * dt; particle.y += particle.vy * dt;
        }
        const idle = explosionStart === null && !motionQuery.matches;
        const x = particle.x + (idle ? Math.sin(now * 0.001 + particle.phase) * (compact ? 0.2 : 0.55) : 0);
        const y = particle.y + (idle ? Math.cos(now * 0.001 + particle.phase) * (compact ? 0.2 : 0.55) : 0);
        ctx.beginPath(); ctx.arc(x, y, particle.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (explosionStart !== null && progress === 1) explosionFinished = true;
    }

    function tick(now: number) { frame = 0; draw(now); schedule(); }
    function schedule() {
      if (!frame && !disposed && fontsReady && particles.length > 0 && !document.hidden && !explosionFinished && (!motionQuery.matches || explodeRef.current)) frame = requestAnimationFrame(tick);
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || compact || motionQuery.matches || explodeRef.current) return;
      const rect = surface.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const leave = () => { pointer = { x: -1000, y: -1000 }; };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { last = 0; schedule(); } };
    const mediaChange = () => { leave(); resize(); };
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    motionQuery.addEventListener("change", mediaChange);
    fineQuery.addEventListener("change", mediaChange);
    document.fonts.ready.then(() => {
      if (disposed) return;
      fontsReady = true;
      resize();
    });
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      surface.removeEventListener("pointermove", move); surface.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      motionQuery.removeEventListener("change", mediaChange); fineQuery.removeEventListener("change", mediaChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="dacot-particle-canvas font-display" aria-hidden="true" />;
}
