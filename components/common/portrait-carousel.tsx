"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  Fragment,
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

// ─── Constants ────────────────────────────────────────────────────────────────

const DURATION = 500; // ms
const SWIPE_THRESHOLD = 40; // px — min swipe distance to commit navigation

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** ResizeObserver-based hook that returns the current pixel width of a ref'd element. */
function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/**
 * Layout calculator.
 *
 * KEY INSIGHT: To perfectly centre the middle slide on any screen we keep ALL
 * slides the SAME width in the DOM (= uniform flex children) and use the
 * viewport width as our centering anchor.
 *
 *   viewport = 3 × slideW + 2 × gap
 *
 * The track is then translated so slide[current] is always at position 1 of 3,
 * which is trivially centre-aligned because the viewport = exactly 3 slides.
 *
 * On mobile the viewport fills the container; slide widths shrink proportionally.
 * The centre slide gets a CSS scale-up overlay for the "active hero" look.
 */
function computeLayout(containerWidth: number) {
  if (containerWidth <= 0) {
    // SSR fallback — desktop defaults
    return { slideW: 260, slideH: 410, gap: 24, scaleActive: 1 };
  }

  if (containerWidth >= 700) {
    // Desktop: fixed sizes, no scaling needed
    return { slideW: 260, slideH: 410, gap: 24, scaleActive: 1 };
  }

  // Mobile: 3 slides + 2 gaps must exactly fill the container.
  // We want the centre slide to look ~65% of viewport so:
  //   slideW ≈ containerWidth / 3   (uniform DOM width)
  //   The active slide is then visually enlarged via scaleActive
  //
  // Proportions: gap = 8% of containerWidth, slideW fills the rest evenly
  const gap = Math.round(containerWidth * 0.02);
  const slideW = Math.round((containerWidth - gap * 2) / 3);
  const slideH = Math.round(slideW * 1.55);
  // Active slide visually expands to ~1.55× its DOM size
  const scaleActive = 2;

  return { slideW, slideH, gap, scaleActive };
}

// ─── Component ────────────────────────────────────────────────────────────────

const PortraitCarousel = forwardRef<PortraitCarouselHandle, PortraitCarouselProps>(
  (
    {
      images,
      defaultActive,
      autoPlay = false,
      autoPlayInterval = 3500,
      onIndexChange,
      className = "",
    },
    ref,
  ) => {
    const count = images.length;
    const wrap = useCallback((i: number) => Math.max(0, Math.min(i, count - 1)), [count]);

    // ── State ────────────────────────────────────────────────────────────────
    const [current, setCurrent] = useState(defaultActive || 0);
    const [animating, setAnimating] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // ── Refs ─────────────────────────────────────────────────────────────────
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const touchDeltaX = useRef(0);
    const isDragging = useRef(false);
    const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    // ── Layout ───────────────────────────────────────────────────────────────
    const containerWidth = useElementWidth(containerRef);
    const { slideW, slideH, gap, scaleActive } = computeLayout(containerWidth);
    const isMobile = containerWidth > 0 && containerWidth < 700;
    const viewportW = slideW * 3 + gap * 2; // always exactly 3 slides + 2 gaps
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    /**
     * TrackX: translate the track so slide[current] sits in the middle slot.
     *
     * Because all slides are the same DOM width (slideW), the maths is trivially:
     *   - Slide[0] centre at:  slideW/2
     *   - Slide[i] centre at:  slideW/2 + i*(slideW+gap)
     *   - Middle of viewport:  viewportW/2  =  slideW*1.5 + gap
     *
     *   translateX = viewportW/2 - (slideW/2 + current*(slideW+gap))
     *              = slideW + gap - current*(slideW+gap)
     *              = (1 - current) * (slideW + gap)
     *
     * Plus dragOffset for live finger tracking.
     */
    const step = slideW + gap;
    const trackX = (1 - current) * step + dragOffset;

    // ── Navigation ───────────────────────────────────────────────────────────
    const navigate = useCallback(
      (dir: "left" | "right") => {
        if (animating || count < 2) return;
        setAnimating(true);
        setCurrent((prev) => {
          const next = dir === "right" ? wrap(prev + 1) : wrap(prev - 1);
          onIndexChange?.(next);
          return next;
        });
        setTimeout(() => setAnimating(false), DURATION);
      },
      [animating, count, wrap, onIndexChange],
    );

    const goTo = useCallback(
      (index: number) => {
        if (animating || count < 2) return;
        const target = wrap(index);
        if (target === current) return;
        setAnimating(true);
        setCurrent(target);
        onIndexChange?.(target);
        setTimeout(() => setAnimating(false), DURATION);
      },
      [animating, current, count, wrap, onIndexChange],
    );

    // ── Imperative handle ────────────────────────────────────────────────────
    useImperativeHandle(
      ref,
      () => ({
        next: () => navigate("right"),
        prev: () => navigate("left"),
        goTo,
        currentIndex: current,
      }),
      [navigate, goTo, current],
    );

    // ── Auto-play ────────────────────────────────────────────────────────────
    useEffect(() => {
      if (!autoPlay) return;
      autoPlayTimer.current = setInterval(() => navigate("right"), autoPlayInterval);
      return () => {
        if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      };
    }, [autoPlay, autoPlayInterval, navigate]);

    // ── Keyboard ─────────────────────────────────────────────────────────────
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") navigate("right");
        if (e.key === "ArrowLeft") navigate("left");
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    // ── Touch handlers ───────────────────────────────────────────────────────

    const onTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDeltaX.current = 0;
      isDragging.current = false;
    }, []);

    // Attached as a native listener (passive: false) so we can call preventDefault
    const onTouchMoveNative = useCallback(
      (e: TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const dx = e.touches[0].clientX - touchStartX.current;
        const dy = e.touches[0].clientY - touchStartY.current;

        // Decide axis on first significant movement
        if (!isDragging.current) {
          if (Math.abs(dy) > Math.abs(dx)) {
            // Vertical — hand scroll back to the browser
            touchStartX.current = null;
            return;
          }
          isDragging.current = true;
        }

        // Rubber-band at the edges (not circular)
        const atStart = current === 0 && dx > 0;
        const atEnd = current === count - 1 && dx < 0;
        const resistance = atStart || atEnd ? 0.25 : 1;

        touchDeltaX.current = dx;
        setDragOffset(dx * resistance);

        e.preventDefault(); // stop page scroll
      },
      [current, count],
    );

    const onTouchEnd = useCallback(() => {
      if (!isDragging.current || touchStartX.current === null) {
        isDragging.current = false;
        return;
      }

      const dx = touchDeltaX.current;
      setDragOffset(0);

      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        navigate(dx < 0 ? "right" : "left");
      }

      touchStartX.current = null;
      isDragging.current = false;
    }, [navigate]);

    // Attach the native touchmove listener with passive:false
    useEffect(() => {
      const el = viewportRef.current;
      if (!el) return;
      el.addEventListener("touchmove", onTouchMoveNative, { passive: false });
      return () => el.removeEventListener("touchmove", onTouchMoveNative);
    }, [onTouchMoveNative]);

    // ─────────────────────────────────────────────────────────────────────────
    const measured = containerWidth > 0;
    const ease = `cubic-bezier(0.65, 0, 0.35, 1)`;
    const inactiveScale = isDesktop ? 0.9 : 1.5;

    return (
      <div
        ref={containerRef}
        role="region"
        aria-label="Portrait carousel"
        className={cn(
          "relative flex w-full flex-col items-center gap-9 font-serif select-none",
          className,
        )}
      >
        {/* ── Viewport ─────────────────────────────────────────────────────── */}
        <div
          ref={viewportRef}
          className="relative mx-auto overflow-hidden"
          style={{
            width: measured ? viewportW : "100%",
            // Extra vertical room so scale(scaleActive) on the centre slide
            // isn't clipped. Padding = half the extra height from scaleActive.
            height: measured
              ? slideH * scaleActive + 48 // 48px breathing room
              : 460,
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {measured && (
            /* ── Track — all slides in a single flex row ── */
            <div
              className="absolute flex items-center"
              style={{
                top: (slideH * scaleActive + 48) / 2 - slideH / 2, // vertically centre
                gap,
                transform: `translateX(${trackX}px)`,
                transition: isDragging.current
                  ? "none" // instant during drag
                  : `transform ${DURATION}ms ${ease}`, // smooth on snap/navigate
                willChange: "transform",
              }}
            >
              {images.map((img, i) => {
                const isCurrent = i === current;

                return (
                  <div
                    key={i}
                    aria-hidden={!isCurrent}
                    onClick={() => {
                      if (!isCurrent && !isDragging.current) goTo(i);
                    }}
                    className="group rounded-xl"
                    style={{
                      // ALL slides have the SAME DOM width — centering stays exact
                      width: slideW,
                      height: slideH,
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                      cursor: isCurrent ? "default" : "pointer",
                      willChange: "transform, opacity, box-shadow",

                      // Active slide scales up; side slides scale down slightly
                      transform: isCurrent ? `scale(${scaleActive})` : `scale(${inactiveScale})`,
                      opacity: 0,
                      pointerEvents: "none",

                      ...(isCurrent && {
                        opacity: 1,
                        pointerEvents: "auto",
                        zIndex: 2,
                      }),
                      ...((i === current - 1 || i === current + 1) && {
                        opacity: 0.75,
                        pointerEvents: "auto",
                        zIndex: 1,
                      }),

                      boxShadow: isCurrent
                        ? `
                          0 20px 60px rgba(0,0,0,0.6),
                          0 0 0 1px rgba(255,213,79,0.45),
                          0 0 12px rgba(255,213,79,0.6),
                          0 0 32px rgba(255,213,79,0.25)
                        `
                        : "none",

                      transition: [
                        `transform  ${DURATION}ms ${ease}`,
                        `opacity    ${DURATION}ms ${ease}`,
                        `box-shadow ${DURATION}ms ${ease}`,
                      ].join(", "),
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                        display: "block",
                        pointerEvents: "none",
                        userSelect: "none",
                        // Counter-scale the image so it doesn't stretch when the
                        // container scales — the image stays crisp at its natural size
                        // transform: isCurrent
                        //   ? `scale(${(1 / scaleActive) * 1.06})` // slight zoom on active
                        //   : `scale(${1 / 0.9})`,
                        ...(isDesktop &&
                          !isCurrent && {
                            transform: `scale(${1 / inactiveScale})`,
                          }),
                      }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Caption overlay — active slide only */}
                    {/* {isCurrent && img.caption && ( */}
                    {/*   <div */}
                    {/*     // Counter-scale the caption too so text isn't distorted */}
                    {/*     style={{ */}
                    {/*       // transform: `scale(${1 / scaleActive})`, */}
                    {/*       transformOrigin: "bottom center", */}
                    {/*     }} */}
                    {/*     className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-[18px] pt-12 pb-4 text-center" */}
                    {/*   > */}
                    {/*     <span className="text-[8px] text-(--color-carousel-caption) uppercase md:text-lg"> */}
                    {/*       {img.caption} */}
                    {/*     </span> */}
                    {/*   </div> */}
                    {/* )} */}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Arrow buttons (desktop only — mobile uses swipe) ── */}
        <div className="hidden lg:block">
          <ArrowButton disabled={current === 0} direction="prev" onClick={() => navigate("left")} />
          <ArrowButton
            disabled={current === images.length - 1}
            direction="next"
            onClick={() => navigate("right")}
          />
        </div>

        {/* ── Dot indicators ── */}
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

PortraitCarousel.displayName = "PortraitCarousel";
export default PortraitCarousel;

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
        "[&:not(:disabled):hover]:bg-primary/20",
        "[&:not(:disabled):hover]:border-primary",
        "[&:not(:disabled):hover]:scale-110",
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
