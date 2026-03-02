import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

import { GalleryCard, type GalleryImage } from "@/components/gallery-card/gallery-card";

interface GallerySliderProps {
  images: GalleryImage[];
  className?: string;
}

export const GallerySlider = ({ images, className }: GallerySliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const isWheelScrollingRef = useRef<boolean>(false);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync native scroll → our target when user drags scrollbar or uses keyboard
  const handleNativeScroll = useCallback(() => {
    if (!isWheelScrollingRef.current && containerRef.current) {
      // Native scroll (drag/keyboard) happened — keep target in sync
      targetScrollRef.current = containerRef.current.scrollLeft;
      currentScrollRef.current = containerRef.current.scrollLeft;
    }
  }, []);

  // Convert vertical wheel to horizontal + feed GSAP interpolation
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const delta = e.deltaY || e.deltaX;
    targetScrollRef.current = Math.max(
      0,
      Math.min(
        container.scrollWidth - container.clientWidth,
        targetScrollRef.current + delta * 1.2,
      ),
    );

    isWheelScrollingRef.current = true;
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      isWheelScrollingRef.current = false;
    }, 150);
  }, []);

  // Keyboard arrow scroll
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const container = containerRef.current;
    if (!container || document.activeElement !== container) return;

    const step = 200;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      targetScrollRef.current = Math.min(
        container.scrollWidth - container.clientWidth,
        targetScrollRef.current + step,
      );
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      targetScrollRef.current = Math.max(0, targetScrollRef.current - step);
    }
  }, []);

  // Attach wheel + keyboard listeners (passive: false for wheel)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [handleWheel, handleNativeScroll, handleKeyDown]);

  // ── GSAP inertia ticker ──────────────────────────────────────────────────
  useGSAP(
    () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const EASE = 0.09; // lower = more inertia / premium feel

      const tick = () => {
        const container = containerRef.current;
        if (!container) return;

        currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, EASE);

        // Only write to DOM when wheel-scrolling; otherwise respect native scroll
        if (
          isWheelScrollingRef.current ||
          Math.abs(currentScrollRef.current - targetScrollRef.current) > 0.5
        ) {
          container.scrollLeft = currentScrollRef.current;
        }
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0); // prevent big jumps after tab switch

      return () => {
        gsap.ticker.remove(tick);
      };
    },
    { scope: containerRef },
  );
  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* Gradient overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24"
        style={{
          background: "linear-gradient(to right, rgb(250,249,247) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24"
        style={{
          background: "linear-gradient(to left, rgb(250,249,247) 0%, transparent 100%)",
        }}
      />

      {/* Scroll container */}
      <div
        ref={containerRef}
        role="list"
        tabIndex={0}
        aria-label="Scroll left or right to browse images. Use arrow keys."
        className={cn(
          "relative overflow-x-auto overflow-y-hidden",
          "flex flex-row items-center gap-5",
          "px-10 pb-5",
          "cursor-grab active:cursor-grabbing",
          "outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2",
        )}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d6d3d1 transparent",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {images.map((img) => (
          <GalleryCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
};
