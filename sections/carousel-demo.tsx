"use client";
import PortraitCarousel, { PortraitCarouselHandle } from "@/components/common/portrait-carousel";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const IMAGES = Array.from({ length: 10 }, (_, index) => ({
  src: `/images/feedback/feedback-${index + 1}.jpg`,
  alt: `feedback-${index + 1}.jpg`,
  caption: "",
}));

export const CarouselDemo = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const carouselRef = useRef<PortraitCarouselHandle>(null);

  return (
    <div
      id="testimonials"
      className="bg-background relative overflow-hidden py-24 text-white md:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Quotes */}
        <div
          className="text-primary/10 animate-float absolute top-20 left-10"
          style={{ animationDelay: "0s" }}
        >
          <Quote className="h-32 w-32" />
        </div>
        <div
          className="text-primary/10 animate-float absolute right-10 bottom-20 rotate-180"
          style={{ animationDelay: "3s" }}
        >
          <Quote className="h-24 w-24" />
        </div>
        <div
          className="text-primary/5 animate-float absolute top-1/2 left-1/4"
          style={{ animationDelay: "1.5s" }}
        >
          <Quote className="h-16 w-16" />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>

      <div ref={ref} className="relative container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 text-center">
          <span
            className={`text-primary mb-4 inline-block transform text-sm font-medium tracking-wide uppercase transition-all duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Phản Hồi Từ Khách Hàng
          </span>
          <h2
            className={`mb-6 transform text-3xl leading-tight font-bold text-balance transition-all delay-100 duration-700 md:text-4xl lg:text-5xl ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p
            className={`transform text-lg text-white/60 transition-all delay-200 duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Những trải nghiệm chân thực từ các khách hàng đã tin tưởng đồng hành cùng chúng tôi
            trong hành trình hoàn thiện vẻ đẹp.{" "}
          </p>
        </div>
        <PortraitCarousel
          className={cn(
            "transition-all delay-300 duration-700",
            isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
          defaultActive={1}
          ref={carouselRef}
          images={IMAGES}
          autoPlay={false}
        />
      </div>
    </div>
  );
};
