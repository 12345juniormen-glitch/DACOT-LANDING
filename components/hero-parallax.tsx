"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.72], [reduceMotion ? 0 : 7, 0]);
  const rowOneX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? -160 : -520, -70]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? -100 : 420, -90]);
  const rowThreeX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? -220 : -460, 30]);
  const rowOneRotate = useTransform(scrollYProgress, [0, 0.72], [reduceMotion ? 0 : 3.25, 0]);
  const rowTwoRotate = useTransform(scrollYProgress, [0, 0.72], [reduceMotion ? 0 : -3.5, 0]);
  const rowThreeRotate = useTransform(scrollYProgress, [0, 0.72], [reduceMotion ? 0 : 2.75, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.82], [0.28, 0.54, 0.86]);

  const rows = [screenshots.slice(0, 5), screenshots.slice(5, 10), screenshots.slice(10, 15)];
  const transforms = [
    { x: rowOneX, rotateZ: rowOneRotate },
    { x: rowTwoX, rotateZ: rowTwoRotate },
    { x: rowThreeX, rotateZ: rowThreeRotate },
  ];

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="grain relative h-[155svh] overflow-clip bg-ink md:h-[220svh] lg:h-[240svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 [perspective:1200px] md:[perspective:1600px]"
          style={{ rotateX, opacity }}
        >
          <div className="absolute inset-0 origin-center [transform-style:preserve-3d]">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className={`absolute left-1/2 flex w-max gap-3 md:gap-5 ${
                  rowIndex === 0
                    ? "top-[12%] md:top-[8%]"
                    : rowIndex === 1
                      ? "top-[52%] md:top-[39%]"
                      : "top-[70%] hidden md:flex"
                }`}
                style={transforms[rowIndex]}
              >
                {row.map((screenshot, imageIndex) => (
                  <figure
                    key={screenshot.src}
                    className={`group relative shrink-0 overflow-hidden border border-line-strong bg-surface transition-transform duration-500 hover:-translate-y-1 ${
                      screenshot.mobile
                        ? "h-[230px] w-[106px] md:h-[320px] md:w-[148px]"
                        : "h-[205px] w-[310px] md:h-[320px] md:w-[470px]"
                    } ${rowIndex === 0 && imageIndex > 2 ? "hidden sm:block" : ""}`}
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      priority={rowIndex === 0 && imageIndex < 2}
                      quality={84}
                      sizes={screenshot.mobile
                        ? "(max-width: 767px) 106px, 148px"
                        : "(max-width: 767px) 310px, 470px"}
                      className="object-cover object-top transition-[filter,transform] duration-500 group-hover:scale-[1.012] group-hover:brightness-75"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-full border-t border-line bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper-dim transition-transform duration-300 group-hover:translate-y-0">
                      {screenshot.label}
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_62%_58%_at_45%_47%,rgba(10,9,8,0.97)_0%,rgba(10,9,8,0.82)_48%,rgba(10,9,8,0.22)_100%)] md:bg-[radial-gradient(ellipse_54%_65%_at_38%_47%,rgba(10,9,8,0.98)_0%,rgba(10,9,8,0.83)_48%,rgba(10,9,8,0.15)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

        <div className="relative z-20 mx-auto grid h-full w-full max-w-[1440px] grid-cols-1 items-center px-5 pb-10 pt-[108px] md:px-10 lg:grid-cols-12 lg:pb-12 lg:pt-[112px]">
          <div className="lg:col-span-10 xl:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
