"use client";

import { useRef, useState } from "react";
import { FanCard, FanCardData } from "../fan-card/fan-card";
import { cardTransform } from "./fan-card-slider.util";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SLIDER_CONFIG } from "./config";
import { ArrowLeft, ArrowRight } from "@boxicons/react";
// import styles from "./styles.module.css";

/** This prevents version-mismatch issues between React and GSAP internals. */
gsap.registerPlugin(useGSAP);

interface FanCarSliderProps {
  cards: FanCardData[];
}

const ACTIVE_SCALE = 1.08;
const Y_OFFSET = 40; // px

export const FanCardSlider = ({ cards }: FanCarSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null); // useGSAP scope root
  const cardRefs = useRef<HTMLDivElement[]>([]); // per-card DOM refs
  const textRef = useRef<HTMLDivElement>(null); // text panel wrapper

  const total = cards.length;
  const { animDuration, cardW } = SLIDER_CONFIG;

  const { contextSafe } = useGSAP(
    () => {
      // ── Initial placement: snap all cards to starting positions ──────────
      // gsap.set() called inside useGSAP is context-tracked and auto-reverted
      // when the component unmounts.
      cards.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const t = cardTransform({
          offsetIndex: i,
          activeScale: ACTIVE_SCALE,
          yOffset: Y_OFFSET,
        }); // activeIndex starts at 0
        gsap.set(el, {
          x: t.x,
          y: t.y,
          rotate: t.rotate,
          scale: t.scale,
          opacity: t.opacity,
          zIndex: t.zIndex,
        });
      });

      // ── Keyboard navigation registered inside useGSAP ───────────────────
      // The listener uses contextSafe() so the tweens it spawns are tracked.
      // Cleanup is returned below — no separate useEffect needed.
      const handleKey = contextSafe((e: KeyboardEvent) => {
        if (e.key === "ArrowRight") navigate(1);
        if (e.key === "ArrowLeft") navigate(-1);
      });

      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    },
    { scope: containerRef }, // GSAP selector text scoped to our container
  );

  // contextSafe() is the @gsap/react API for making post-mount animations
  // (from click handlers, timeouts, etc.) first-class context citizens:
  //   • Their instances are registered → reverted on unmount
  //   • They respect the `scope` set on useGSAP
  //   • `overwrite: "auto"` handles rapid-click interruption
  const animateFan = contextSafe((newActive: number) => {
    cards.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      // Shortest-arc offset: wraps at ±total/2 so cards never fly the long way
      let offset = i - newActive;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const t = cardTransform({
        offsetIndex: offset,
        activeScale: ACTIVE_SCALE,
        yOffset: Y_OFFSET,
      });

      gsap.to(el, {
        x: t.x,
        y: t.y,
        rotate: t.rotate,
        scale: t.scale,
        opacity: t.opacity,
        duration: animDuration,
        ease: "power3.out",
        overwrite: "auto", // merges with in-progress tweens → handles rapid clicks
        onStart() {
          gsap.set(el, { zIndex: t.zIndex });
        }, // immediate z-order
      });
    });
  });

  const animateText = contextSafe(() => {
    if (!textRef.current) return;
    gsap.killTweensOf(textRef.current);

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animDuration * 1.25,
        ease: "power3.out",
      },
    );

    // // Phase 1: slide old text up and fade out
    // gsap.fromTo(
    //   textRef.current,
    //   { opacity: 1, y: 0 },
    //   {
    //     opacity: 0,
    //     y: -16,
    //     duration: animDuration * 0.38,
    //     ease: "power2.in",
    //     onComplete() {
    //       // Phase 2: slide new text in from below
    //       gsap.fromTo(
    //         textRef.current,
    //         { opacity: 0, y: 24 },
    //         {
    //           opacity: 1,
    //           y: 0,
    //           duration: animDuration * 0.75,
    //           ease: "power3.out",
    //         },
    //       );
    //     },
    //   },
    // );
  });

  // ───────────────────────────────────────────────────────────────────────────
  // navigate  — state update + fan rotation + text swap
  // ───────────────────────────────────────────────────────────────────────────
  function navigate(dir: number) {
    setActiveIndex((prev) => {
      const next = (prev + dir + total) % total;
      animateFan(next);
      animateText();
      return next;
    });
  }

  const active = cards[activeIndex];

  // style={{
  //   background:
  //     "radial-gradient(ellipse 80% 60% at 30% 50%, #111418 0%, #080808 100%)",
  // }}

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="flex w-full max-w-5xl flex-col items-center gap-5 px-12 py-10 lg:flex-row lg:gap-20">
        {/* ── Fan Stage ── */}
        <div
          className="relative flex h-105 w-95 shrink-0 items-start justify-center overflow-hidden lg:h-137.5"
          // style={{ width: 380, height: 550 }}
        >
          {cards.map((card, i) => (
            <FanCard
              width={cardW}
              key={card.id}
              card={card}
              ref={(el) => {
                if (el) {
                  cardRefs.current[i] = el;
                }
              }}
            />
          ))}

          {/* Decorative arc line beneath the fan */}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 260,
              height: 50,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Text Panel ── */}
        <div className="min-w-0 flex-1">
          {/*
            ref={textRef} — the entire block (eyebrow + title + body) is
            targeted as one GSAP unit: fade-up-out then slide-up-in.
          */}
          <div ref={textRef} style={{ "--accent": active.accent } as never}>
            <p
              className="mb-4 text-xs uppercase opacity-60"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "var(--accent)",
              }}
            >
              Natural Wonders · {activeIndex + 1} / {total}
            </p>

            <h2
              className="mb-6 text-2xl leading-none lg:text-5xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {active.label}
            </h2>

            <p className="text-brand-dark/55 max-w-sm text-sm leading-relaxed font-light lg:text-base">
              {active.text}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-11 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous"
              className="bg-brand-turquoise-light border-brand-turquoise-mid/60 text-brand-dark/55 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] text-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Next"
              className="bg-brand-turquoise-light border-brand-turquoise-mid/60 text-brand-dark/55 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] text-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowRight />
            </button>

            <div className="ml-1 flex items-center gap-2">
              {cards.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 5,
                    borderRadius: 3,
                    transition: "width 0.35s ease, background 0.35s ease",
                    width: i === activeIndex ? 22 : 5,
                    background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
