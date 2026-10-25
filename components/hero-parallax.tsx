"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type ProductScreenshot = {
  src: string;
  label: string;
  alt: string;
  mobile?: boolean;
};

type HeroParallaxProps = {
  screenshots: ProductScreenshot[];
  children: React.ReactNode;
};

export function HeroParallax({ screenshots, children }: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // The endpoint is when the last module leaves the viewport, not the hero.
    offset: ["start start", "end start"],
  });
  const distance = reduceMotion ? 60 : compact ? 260 : 1000;
  const spring = { stiffness: 180, damping: 35, mass: 0.5 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, distance]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [reduceMotion ? 0 : compact ? 5 : 15, 0]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.35], [reduceMotion ? 0 : compact ? 3 : 20, 0]), spring);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 30] : compact ? [-180, 120] : [-500, 450]), spring);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0]);

  const rows = [screenshots.slice(0, 5), screenshots.slice(5, 10), screenshots.slice(10, 15)];

  return (
    <section ref={sectionRef} data-parallax-region className="grain relative isolate bg-ink">
      {/* Absolute host follows the real content height without adding scroll space. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div data-parallax-viewport className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-0 [perspective:1600px]">
            <motion.div data-parallax-scene className="absolute inset-x-0 top-[20%] origin-center [transform-style:preserve-3d]"
              style={{ rotateX, rotateZ, y: translateY, opacity }}>
              {rows.map((row, rowIndex) => (
                <motion.div key={rowIndex} data-parallax-row={rowIndex}
                  className={`relative left-1/2 mb-6 flex w-max gap-5 ${rowIndex === 1 ? "-ml-[420px] md:-ml-[850px]" : "-ml-[850px] md:-ml-[1700px]"} ${rowIndex === 2 ? "hidden md:flex" : ""}`}
                  style={{ x: rowIndex === 1 ? translateXReverse : translateX }}>
                  {row.map((screenshot, imageIndex) => (
                    <motion.figure key={screenshot.src} whileHover={{ y: -20 }}
                      className="group relative h-[190px] w-[250px] shrink-0 overflow-hidden border border-line-strong bg-surface md:h-96 md:w-[30rem]">
                      <Image data-parallax-image src={screenshot.src} alt={screenshot.alt} fill
                        priority={rowIndex === 0 && imageIndex < 2} quality={84}
                        sizes="(max-width: 767px) 250px, 480px"
                        className={screenshot.mobile ? "object-contain object-top" : "object-cover object-top"} />
                      <figcaption className="absolute inset-x-0 bottom-0 translate-y-full border-t border-line bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-fg transition-transform duration-300 group-hover:translate-y-0">
                        {screenshot.label}
                      </figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="blueprint absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,8,0.86)_0%,rgba(10,9,8,0.68)_55%,rgba(10,9,8,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(10,9,8,0.92)_0%,rgba(10,9,8,0.78)_42%,rgba(10,9,8,0.26)_72%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
        </div>
      </div>
      <div className="parallax-content relative z-10">{children}</div>
    </section>
  );
}
