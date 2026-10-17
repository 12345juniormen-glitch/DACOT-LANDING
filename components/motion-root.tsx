"use client";

import { useEffect } from "react";

/**
 * Observes every [data-reveal] node in the document and flips
 * data-visible when it enters the viewport. Keeps sections server-rendered.
 * A scroll/resize fallback guarantees nothing stays hidden after fast
 * scrolling or anchor jumps.
 */
export function MotionRoot() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const revealAll = () =>
      nodes.forEach((node) => node.setAttribute("data-visible", "true"));

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    let frame = 0;
    const checkPassed = () => {
      frame = 0;
      nodes.forEach((node) => {
        if (node.dataset.visible === "true") return;
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          node.setAttribute("data-visible", "true");
          observer.unobserve(node);
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkPassed);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
