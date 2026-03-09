"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type GalleryImage } from "@/components/gallery-card/gallery-card";
import { cn } from "@/app/lib/util";
import { GallerySlider } from "@/components/gallery-slider/gallery-slider";

interface TestimonialsProps {
  images: GalleryImage[];
  className?: string;
}

export const Testimonials = ({ images, className }: TestimonialsProps) => {
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
    <section
      aria-label="Horizontal photo gallery"
      className={cn(
        "h-screen max-w-360 bg-[url('/images/customer-experience-bg.png')] py-12",
        className,
      )}
    >
      {/* Heading */}
      <div className="mb-8 px-10">
        <h2 className="text-brand-dark text-3xl font-semibold uppercase">
          Trải Nghiệm Thực Tế Từ Khách Hàng
        </h2>
        <p className="text-brand-dark/55 mt-6 text-base">
          Những phản hồi dưới đây là trải nghiệm thực tế từ khách hàng sau khi sử dụng dịch vụ tại
          Thai Intl Care. Sự hài lòng và kết quả đạt được của mỗi khách hàng luôn là động lực để đội
          ngũ chúng tôi không ngừng nâng cao chất lượng chuyên môn và dịch vụ.
        </p>
      </div>
      <GallerySlider className="mt-16" images={images} />
    </section>
  );
};
