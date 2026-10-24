"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** One viewport guide, anchored to the visible header CTA after the hero CTA leaves. */
export function CtaGuide({ children }: { children: React.ReactNode }) {
  const anchor = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const tip = useRef<SVGPathElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const hero = anchor.current?.querySelector<HTMLElement>("[data-guide-hero]");
    const header = document.querySelector<HTMLElement>("[data-guide-header]");
    const navbar = header?.closest("header");
    const layer = svg.current;
    if (!hero || !header || !navbar || !layer) return;

    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let heroPassed = false;
    let visible = false;
    let pointerSeen = false;
    let cooldownUntil = 0;
    let cooldownTimer: number | undefined;
    let proximityHidden = false;
    let wasShown = false;
    let current = { x: innerWidth * 0.65, y: innerHeight * 0.5 };
    let destination = { ...current };
    let observer: IntersectionObserver | undefined;

    const hide = () => { layer.dataset.visible = "false"; visible = false; };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const startCooldown = () => {
      if (!proximityHidden || !wasShown || cooldownUntil > performance.now()) return;
      cooldownUntil = performance.now() + 60_000;
      wasShown = false;
      proximityHidden = false;
      hide();
      cooldownTimer = window.setTimeout(() => {
        cooldownTimer = undefined;
        cooldownUntil = 0;
        schedule();
      }, 60_000);
    };
    const onFadeEnd = (event: TransitionEvent) => {
      // Only the proximity fade may start the cooldown, never scroll/modal hiding.
      if (event.target === layer && event.propertyName === "opacity" &&
          layer.dataset.visible === "true" && proximityHidden &&
          Number(getComputedStyle(layer).opacity) <= 0.001) startCooldown();
    };
    function render(time: number) {
      frame = 0;
      const allowed = pointerMedia.matches && !reducedMedia.matches;
      const end = header!.getBoundingClientRect();
      const canSeeHeader = end.width > 0 && end.bottom > 0 && end.top >= 0 && end.right <= innerWidth;
      const modalOpen = !!document.querySelector("dialog[open]");
      if (!allowed || !heroPassed || !canSeeHeader || modalOpen || document.hidden) {
        proximityHidden = false;
        wasShown = false;
        hide(); lastTime = 0; return;
      }
      if (cooldownUntil > performance.now()) { hide(); lastTime = 0; return; }
      if (visible && Number(getComputedStyle(layer!).opacity) > 0.001) wasShown = true;

      const endX = end.left + end.width * 0.5;
      const endY = end.bottom + 3;
      if (!pointerSeen) destination = { x: Math.max(24, endX - 240), y: Math.min(innerHeight - 24, endY + 220) };
      if (!visible) { current = { ...destination }; lastTime = time; }
      // Time-based exponential interpolation: stable lag at different refresh rates.
      const dt = Math.min(64, lastTime ? time - lastTime : 16);
      const blend = 1 - Math.exp(-dt / 125);
      current.x += (destination.x - current.x) * blend;
      current.y += (destination.y - current.y) * blend;
      lastTime = time;
      const startX = current.x;
      const startY = current.y;
      const dx = endX - startX;
      const reach = Math.min(160, Math.max(48, Math.abs(startY - endY) * 0.35));
      const canvas = layer!.getBoundingClientRect();
      layer!.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`);
      curve.current?.setAttribute("d", `M${startX.toFixed(2)} ${startY.toFixed(2)} C${(startX + dx * 0.4).toFixed(2)} ${(startY + reach * 0.3).toFixed(2)} ${endX.toFixed(2)} ${(endY + reach).toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`);
      tip.current?.setAttribute("d", `M${endX - 6} ${endY + 10} L${endX} ${endY} L${endX + 6} ${endY + 10}`);
      // Distance to the rectangle, not its centre: fade before entering any edge.
      const distanceX = Math.max(end.left - destination.x, 0, destination.x - end.right);
      const distanceY = Math.max(end.top - destination.y, 0, destination.y - end.bottom);
      const distance = Math.hypot(distanceX, distanceY);
      const proximity = Math.min(1, Math.max(0, (distance - 36) / (180 - 36)));
      // Smoothstep avoids a hard change at either end of the approach range.
      proximityHidden = proximity === 0;
      layer!.style.setProperty("--guide-proximity", String(proximity * proximity * (3 - 2 * proximity)));
      layer!.dataset.visible = "true";
      visible = true;
      // Covers an already completed zero-opacity fade without restarting a timer.
      if (proximityHidden && wasShown && Number(getComputedStyle(layer!).opacity) <= 0.001) startCooldown();
      if (Math.abs(destination.x - current.x) + Math.abs(destination.y - current.y) > 0.2) schedule();
    }

    const observeHero = () => {
      observer?.disconnect();
      const headerHeight = Math.ceil(navbar.getBoundingClientRect().bottom);
      observer = new IntersectionObserver(([entry]) => {
        heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight;
        schedule();
      }, { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 });
      observer.observe(hero);
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerSeen = true;
      destination = { x: event.clientX, y: event.clientY };
      if (heroPassed && pointerMedia.matches && !reducedMedia.matches) schedule();
    };
    const onLayout = () => { schedule(); };
    const onMedia = () => { hide(); observeHero(); };
    const onLeave = () => { pointerSeen = false; onLayout(); };
    const resize = new ResizeObserver(observeHero);
    resize.observe(hero);
    resize.observe(navbar);
    const dialogs = new MutationObserver(onLayout);
    document.querySelectorAll("dialog").forEach((node) => dialogs.observe(node, { attributes: true, attributeFilter: ["open"] }));
    observeHero();
    layer.addEventListener("transitionend", onFadeEnd);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onLayout, { passive: true });
    window.addEventListener("resize", observeHero, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onLayout);
    pointerMedia.addEventListener("change", onMedia);
    reducedMedia.addEventListener("change", onMedia);
    return () => {
      cancelAnimationFrame(frame);
      if (cooldownTimer !== undefined) window.clearTimeout(cooldownTimer);
      layer.removeEventListener("transitionend", onFadeEnd);
      observer?.disconnect(); resize.disconnect(); dialogs.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onLayout);
      window.removeEventListener("resize", observeHero);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onLayout);
      pointerMedia.removeEventListener("change", onMedia);
      reducedMedia.removeEventListener("change", onMedia);
    };
  }, [mounted]);

  return <>
    <div ref={anchor} className="relative w-full sm:w-auto">{children}</div>
    {mounted && createPortal(
      <svg ref={svg} className="cta-cursor-guide" data-visible="false" aria-hidden="true" focusable="false">
        <path ref={curve} className="cta-guide-curve" pathLength="1" />
        <path ref={tip} className="cta-guide-tip" />
      </svg>, document.body,
    )}
  </>;
}
