"use client";

import { cn } from "@/lib/utils";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PortraitCarouselHandle {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  currentIndex: number;
}

export interface PortraitCarouselProps {
  defaultActive?: number;
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
// All visual tuning lives here. No math elsewhere needs to change.

const CONFIG = {
  innerPaddingY: 18,
  slideWidth: 292, // px — each slide's width on tablet+
  slideHeight: 520, // px — each slide's height on tablet+
  gap: 24, // px — gap between slides
  inactiveScale: 0.88, // side slides shrink to this
  inactiveOpacity: 0.5, // side slides dim to this
  duration: 500, // ms — transition duration
  swipeThreshold: 40, // px — min drag to commit a swipe
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const PortraitCarousel = forwardRef<PortraitCarouselHandle, PortraitCarouselProps>(
  (
    {
      images,
      defaultActive = 0,
      autoPlay = false,
      autoPlayInterval = 3500,
      onIndexChange,
      className,
    },
    ref,
  ) => {
    const count = images.length;

    const [current, setCurrent] = useState(defaultActive);
    const [animating, setAnimating] = useState(false);

    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const touchDeltaX = useRef(0);
    const isSwiping = useRef(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const preventScrollRef = useRef(false);

    // ── Mobile slide width ────────────────────────────────────────────────────
    // 100vw includes the scrollbar and ignores container padding — it overflows.
    // Instead we measure the viewport div's actual pixel width and store it as
    // --mobile-slide-w so the track and slides always use the same unit.
    const [mobileSlideW, setMobileSlideW] = useState(0);
    useEffect(() => {
      const el = viewportRef.current;
      if (!el) return;
      const handleNativeTouchMove = (e: TouchEvent) => {
        if (preventScrollRef.current) {
          e.preventDefault();
        }
      };
      const ro = new ResizeObserver(([entry]) => setMobileSlideW(entry.contentRect.width));
      ro.observe(el);
      setMobileSlideW(el.offsetWidth);
      // { passive: false } is the key — React's synthetic events can't do this
      el.addEventListener("touchmove", handleNativeTouchMove, { passive: false });
      return () => {
        ro.disconnect();
        el.removeEventListener("touchmove", handleNativeTouchMove);
      };
    }, []);

    // ── Navigation ───────────────────────────────────────────────────────────

    const navigate = useCallback(
      (dir: "prev" | "next") => {
        if (animating) return;
        setCurrent((prev) => {
          const next = dir === "next" ? Math.min(prev + 1, count - 1) : Math.max(prev - 1, 0);
          if (next === prev) return prev;
          onIndexChange?.(next);
          setAnimating(true);
          setTimeout(() => setAnimating(false), CONFIG.duration);
          return next;
        });
      },
      [animating, count, onIndexChange],
    );

    const goTo = useCallback(
      (index: number) => {
        const target = Math.max(0, Math.min(index, count - 1));
        if (target === current || animating) return;
        setAnimating(true);
        setCurrent(target);
        onIndexChange?.(target);
        setTimeout(() => setAnimating(false), CONFIG.duration);
      },
      [animating, current, count, onIndexChange],
    );

    // ── Imperative handle ────────────────────────────────────────────────────

    useImperativeHandle(
      ref,
      () => ({
        next: () => navigate("next"),
        prev: () => navigate("prev"),
        goTo,
        currentIndex: current,
      }),
      [navigate, goTo, current],
    );

    // ── Auto-play ────────────────────────────────────────────────────────────

    useEffect(() => {
      if (!autoPlay) return;
      const id = setInterval(() => navigate("next"), autoPlayInterval);
      return () => clearInterval(id);
    }, [autoPlay, autoPlayInterval, navigate]);

    // ── Keyboard ─────────────────────────────────────────────────────────────

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") navigate("next");
        if (e.key === "ArrowLeft") navigate("prev");
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    // ── Touch ────────────────────────────────────────────────────────────────

    const onTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDeltaX.current = 0;
      isSwiping.current = false;
      preventScrollRef.current = false;
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (!isSwiping.current) {
        if (Math.abs(dy) > Math.abs(dx)) {
          touchStartX.current = null;
          return;
        }
        isSwiping.current = true;
        preventScrollRef.current = true;
      }
      touchDeltaX.current = dx;
    }, []);

    const onTouchEnd = useCallback(() => {
      if (!isSwiping.current) return;
      if (Math.abs(touchDeltaX.current) >= CONFIG.swipeThreshold) {
        navigate(touchDeltaX.current < 0 ? "next" : "prev");
      }
      touchStartX.current = null;
      isSwiping.current = false;
    }, [navigate]);

    // ── CSS variables ────────────────────────────────────────────────────────
    // The entire layout is driven by these — slide widths, gap, and the track
    // offset. JS only needs to set `--current` and CSS handles the rest.

    const cssVars = {
      "--slide-inner-py": `${CONFIG.innerPaddingY}px`,
      "--slide-w": `${CONFIG.slideWidth}px`,
      "--slide-h": `${CONFIG.slideHeight}px`,
      "--slide-gap": `${CONFIG.gap}px`,
      "--inactive-scale": CONFIG.inactiveScale,
      "--inactive-opacity": CONFIG.inactiveOpacity,
      "--duration": `${CONFIG.duration}ms`,
      "--current": current,
      "--mobile-slide-w": `${mobileSlideW}px`,
      // Viewport clips to exactly 3 slides on tablet+
      "--viewport-w": `calc(var(--slide-w) * 3 + var(--slide-gap) * 2)`,
      // Track offset centres slide[current]:
      //   left edge of slot 1 (middle) = slideW + gap
      //   left edge of slide[current]  = current * (slideW + gap)
      //   translateX = (1 - current) * (slideW + gap)
      "--track-x": `calc((1 - var(--current)) * (var(--slide-w) + var(--slide-gap)))`,
    } as React.CSSProperties;

    const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
    const transition = `transform var(--duration) ${ease}, opacity var(--duration) ${ease}, box-shadow var(--duration) ${ease}`;

    return (
      <div
        role="region"
        aria-label="Portrait carousel"
        className={cn(
          "relative flex w-full flex-col items-center gap-9 font-serif select-none",
          className,
        )}
        style={cssVars}
      >
        {/* ── Viewport ──────────────────────────────────────────────────────── *
          Mobile  (default): full width, aspect-ratio height, clips to 1 slide.
          Tablet+ (md+):     --viewport-w wide, --slide-h tall, clips to 3 slides.
        */}
        <div
          ref={viewportRef}
          className={`relative w-full overflow-hidden md:h-[calc(var(--slide-h)+var(--slide-inner-py))] md:w-(--viewport-w)`}
          style={{ aspectRatio: `${CONFIG.slideWidth} / ${CONFIG.slideHeight}` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* ── Track ────────────────────────────────────────────────────────── *
            Mobile:  each slide is 100% of the viewport, track shifts by one
                     viewport width per step → translateX(-current * 100%)
            Tablet+: slides are --slide-w wide, track shifts by --track-x to
                     keep the active slide centred in the 3-slot viewport.
          */}
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex items-center",
              // Mobile: no gap between slides, shift by exact slide width (100vw) per step
              "[transform:translateX(calc(var(--current)*-1*var(--mobile-slide-w)))]",
              // Tablet+: override with CSS-var centring formula, restore gap
              "md:[transform:translateX(var(--track-x))] md:gap-[var(--slide-gap)]",
            )}
            style={{
              transition: `transform var(--duration) ${ease}`,
            }}
          >
            {images.map((img, i) => {
              const isActive = i === current;
              const isAdjacent = Math.abs(i - current) === 1;

              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  onClick={() => {
                    if (!isActive) goTo(i);
                  }}
                  className={cn(
                    // Layout footprint — never changes size, keeps centering stable
                    "relative flex shrink-0 items-center justify-center p-4",
                    // Mobile: occupy exactly one viewport width so track math works
                    "h-full w-[var(--mobile-slide-w)]",
                    // Tablet+: fixed slide dimensions
                    "md:h-[var(--slide-h)] md:w-[var(--slide-w)]",
                    !isActive && "cursor-pointer",
                  )}
                  style={{
                    opacity: isActive ? 1 : isAdjacent ? "var(--inactive-opacity)" : 0,
                    pointerEvents: isActive || isAdjacent ? "auto" : "none",
                    zIndex: isActive ? 2 : 1,
                    transition: `opacity var(--duration) ${ease}`,
                  }}
                >
                  {/* Inner wrapper carries the visual scale + shadow so the outer
                      layout footprint stays untouched — centering never shifts */}
                  <div
                    className="h-full w-full overflow-hidden rounded-xl"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(var(--inactive-scale))",
                      boxShadow: isActive
                        ? `0 20px 60px rgba(0,0,0,0.6),
                           0 0 0 1px rgba(255,213,79,0.45),
                           0 0 12px rgba(255,213,79,0.6),
                           0 0 32px rgba(255,213,79,0.25)`
                        : "none",
                      transition: `transform var(--duration) ${ease}, box-shadow var(--duration) ${ease}`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      draggable={false}
                      className="pointer-events-none block h-full w-full object-cover object-center select-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Arrow buttons (desktop only) ── */}
        <div className="hidden lg:block">
          <ArrowButton direction="prev" disabled={current === 0} onClick={() => navigate("prev")} />
          <ArrowButton
            direction="next"
            disabled={current === count - 1}
            onClick={() => navigate("next")}
          />
        </div>

        {/* ── Dots ── */}
        <div className="flex items-center gap-[10px]" role="tablist">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 cursor-pointer rounded-sm border-0 p-0",
                "transition-[background-color,width] duration-300",
                i === current ? "bg-primary w-5" : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);

// ─── ArrowButton ──────────────────────────────────────────────────────────────

function ArrowButton({
  disabled,
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 z-20 -translate-y-1/2",
        direction === "prev" ? "left-2.5" : "right-2.5",
        "size-11 rounded-full border border-white/[0.13] disabled:cursor-default disabled:opacity-25",
        "bg-white/5 text-white backdrop-blur-[10px]",
        "flex cursor-pointer items-center justify-center",
        "transition-[background-color,border-color,transform] duration-200",
        "[&:not(:disabled):hover]:scale-110",
        "[&:not(:disabled):hover]:border-primary",
        "[&:not(:disabled):hover]:bg-primary/20",
      )}
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}
