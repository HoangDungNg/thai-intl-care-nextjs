"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "@boxicons/react";

gsap.registerPlugin(useGSAP);

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
  /**
   * Starting split position (0–100). Defaults to 50.
   */
  initialPosition?: number;
  /**
   * Tailwind aspect-ratio utility applied to the wrapper.
   * Defaults to "aspect-video" (16/9).
   * Examples: "aspect-square", "aspect-[4/3]", "aspect-[3/2]"
   */
  aspectClass?: string;
}

function Label({ side, text }: { side: "left" | "right"; text: string }) {
  return (
    <div
      className={cn(
        // Base — shared by both labels
        "absolute top-3 sm:top-4",
        "px-2 py-0.5 sm:px-2.5 sm:py-1",
        "text-[9px] sm:text-[10px] md:text-[11px]",
        "font-mono font-bold tracking-[0.12em]",
        "bg-white/90 backdrop-blur-sm",
        "pointer-events-none rounded-md shadow-sm",
        "border-l-[3px]",
        // Side-specific
        side === "left"
          ? "left-3 border-l-[#1F2933] text-[#1F2933] sm:left-4"
          : "right-3 border-l-[#0EA5A4] text-[#0EA5A4] sm:right-4",
      )}
    >
      {text}
    </div>
  );
}

export const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  alt = "Before / After comparison",
  initialPosition = 50,
  aspectClass = "aspect-video",
}: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Mutable refs — no re-render needed for animation performance
  const posRef = useRef<number>(initialPosition);
  const targetRef = useRef<number>(initialPosition);
  const isDragging = useRef(false);

  // Minimal state — only for ARIA attribute updates
  const [ariaPos, setAriaPos] = useState<number>(initialPosition);

  // ── DOM mutator ──────────────────────────────────────────────────────────
  const applyPosition = useCallback((pct: number) => {
    if (!afterRef.current || !handleRef.current || !lineRef.current) return;
    afterRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handleRef.current.style.left = `${pct}%`;
    lineRef.current.style.left = `${pct}%`;
    posRef.current = pct;
  }, []);

  // ── GSAP smooth lerp ticker ──────────────────────────────────────────────
  useGSAP(
    () => {
      const id = gsap.ticker.add(() => {
        const cur = posRef.current;
        const next = cur + (targetRef.current - cur) * 0.12;
        if (Math.abs(next - cur) > 0.01) applyPosition(next);
      });
      return () => gsap.ticker.remove(id);
    },
    { scope: containerRef },
  );

  // Initial position sync on mount / prop change
  useEffect(() => {
    targetRef.current = initialPosition;
    applyPosition(initialPosition);
  }, [initialPosition, applyPosition]);

  // ── Pointer helpers ──────────────────────────────────────────────────────
  const getPercent = useCallback((clientX: number): number => {
    if (!containerRef.current) return 50;
    const { left, width } = containerRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return;
      targetRef.current = getPercent(e.clientX);
    },
    [getPercent],
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.userSelect = "";
    setAriaPos(Math.round(posRef.current));
    if (handleRef.current) {
      gsap.to(handleRef.current, { scale: 1, duration: 0.25, ease: "back.out(2)" });
    }
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      targetRef.current = getPercent(e.clientX);
      document.body.style.userSelect = "none";
      if (handleRef.current) {
        gsap.to(handleRef.current, { scale: 1.18, duration: 0.2, ease: "power2.out" });
      }
    },
    [getPercent],
  );

  const onContainerClick = useCallback(
    (e: React.MouseEvent) => {
      targetRef.current = getPercent(e.clientX);
      setTimeout(() => setAriaPos(Math.round(posRef.current)), 300);
    },
    [getPercent],
  );

  // ── Keyboard ─────────────────────────────────────────────────────────────
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      targetRef.current = Math.max(0, targetRef.current - step);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      targetRef.current = Math.min(100, targetRef.current + step);
      e.preventDefault();
    }
    setTimeout(() => setAriaPos(Math.round(posRef.current)), 200);
  }, []);

  // ── Global listeners ─────────────────────────────────────────────────────
  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      onClick={onContainerClick}
      role="img"
      aria-label={alt}
      className={cn(
        // Layout
        "relative w-full overflow-hidden select-none",
        // Visual
        "rounded-xl bg-white sm:rounded-2xl",
        "shadow-[0_8px_40px_rgba(0,0,0,0.14)]",
        // Cursor
        "cursor-ew-resize",
        // Responsive aspect ratio
        aspectClass,
      )}
    >
      {/* BEFORE — base layer */}
      <div className="absolute inset-0 leading-[0]">
        <img
          src={beforeSrc}
          alt={`Before: ${alt}`}
          draggable={false}
          className="pointer-events-none block h-full w-full object-cover"
        />
      </div>

      {/* AFTER — clipped overlay */}
      <div
        ref={afterRef}
        className="absolute inset-0 leading-[0] will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - initialPosition}% 0 0)` }}
      >
        <img
          src={afterSrc}
          alt={`After: ${alt}`}
          draggable={false}
          className="pointer-events-none block h-full w-full object-cover"
        />
      </div>

      {/* Divider line */}
      <div
        ref={lineRef}
        className={cn(
          "pointer-events-none absolute top-0 bottom-0",
          "w-px -translate-x-1/2 bg-white",
          "will-change-[left]",
          // Subtle outline so line is visible on white content
          "shadow-[0_0_0_0.5px_rgba(0,0,0,0.12)]",
        )}
        style={{ left: `${initialPosition}%` }}
      />

      {/* Handle */}
      <div
        ref={handleRef}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Comparison slider"
        aria-valuenow={ariaPos}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          // Position — GSAP will update `left` directly via style
          "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
          // Responsive size: 36 → 44 → 52 px
          "h-9 w-9 sm:h-11 sm:w-11 md:h-[52px] md:w-[52px]",
          // Visual
          "rounded-full border-[3px] border-white",
          "bg-[#0EA5A4]",
          "shadow-[0_0_0_4px_rgba(14,165,164,0.25),0_4px_20px_rgba(14,165,164,0.45)]",
          // Layout
          "flex items-center justify-center gap-1",
          // Interaction
          "z-10 cursor-grab will-change-[left,transform] outline-none",
          // Focus ring (via CSS file — :focus-visible)
          "baf-handle",
        )}
        style={{ left: `${initialPosition}%` }}
      >
        {/* <Arrow dir="left" /> */}
        <ChevronLeft size="xl" fill="#fff" />
        <ChevronRight size="xl" fill="#fff" />
        {/* <Arrow dir="right" /> */}
      </div>

      {/* Labels */}
      <Label side="left" text="BEFORE" />
      <Label side="right" text="AFTER" />
    </div>
  );
};
