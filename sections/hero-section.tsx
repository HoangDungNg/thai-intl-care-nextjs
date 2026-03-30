"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatedCounter } from "@/components/common/animated-counter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PortraitVideo } from "@/components/common/portrait-video";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    const update = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1;

      bg.style.transform = `translate(${-currentRef.current.x}px, ${-currentRef.current.y}px) scale(1.05)`;

      frameRef.current = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetRef.current.x = (e.clientX - rect.left - rect.width / 2) / 50;
      targetRef.current.y = (e.clientY - rect.top - rect.height / 2) / 50;
    };

    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    frameRef.current = requestAnimationFrame(update);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: "translate(0px, 0px) scale(1.05)",
        }}
        ref={bgRef}
      >
        <Image
          src="/images/thai-intl-care-hero.png"
          alt="Modern aesthetic clinic interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-4xl">
          <div
            className={`transform transition-all delay-300 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-foreground bg-background/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur md:text-base">
              Thai Intl Care
            </span>
          </div>

          <h1
            className={`text-foreground mb-6 transform text-4xl leading-tight font-bold transition-all delay-500 duration-1000 md:text-6xl lg:text-7xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-2xl md:text-4xl lg:text-5xl">Cùng bạn trên hành trình</span>
            <span className="text-primary block">Hoàn Thiện Chính Mình</span>
          </h1>

          <div
            className={`text-foreground/80 mb-8 max-w-xl transform text-lg leading-relaxed transition-all delay-700 duration-1000 md:text-2xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Không chỉ là một ca phẫu thuật, mà là cả một hành trình cần được theo dõi, chăm sóc và
            dẫn dắt đúng cách. Tại THAI INTL CARE, chúng tôi không thay thế bác sĩ - chúng tôi đảm
            bảo bạn được hỗ trợ đúng người, đúng thời điểm, đúng quy trình từ trước đến sau phẫu
            thuật.
            {/* <ul className="mt-4 list-disc space-y-2 pl-4 text-sm md:text-lg"> */}
            {/*   <li>Phẫu Thuật Tạo Hình Ngực</li> */}
            {/*   <li>Liệu Pháp Hormones</li> */}
            {/*   <li>Tiêm BAP Trẻ Hóa Da</li> */}
            {/* </ul> */}
          </div>

          <Dialog>
            <div
              className={`flex transform flex-col gap-4 transition-all delay-900 duration-1000 sm:flex-row ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              {/* Glowing CTA Button */}
              <Button
                size="lg"
                className="bg-primary text-brand-dark hover:bg-primary/90 group animate-glow-pulse relative overflow-hidden px-8 transition-transform hover:scale-105"
                asChild
              >
                <a
                  href="https://www.facebook.com/thainguyen92s"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10 flex items-center">
                    Tham Vấn Cùng Zuki Nguyen Ngay
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/30 text-white transition-transform hover:scale-105 hover:bg-white/10"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Khám Phá Chi Tiết Dịch Vụ
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent showCloseButton={false}>
              <DialogTitle hidden>Ngực To Không Sẹo</DialogTitle>
              <DialogDescription asChild>
                <PortraitVideo src="/videos/hero-vid.mp4" />
              </DialogDescription>
            </DialogContent>
          </Dialog>

          {/* Animated Stats */}
          <div
            className={`mt-16 grid transform grid-cols-3 gap-8 border-t border-white/20 pt-8 transition-all delay-[1100ms] duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group">
              <div className="text-primary text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={10} suffix="+" isInView={isVisible} />
              </div>
              <div className="text-foreground/60 mt-1 text-sm">Đội Ngũ Bác Sĩ & Cộng Sự</div>
            </div>
            <div className="group">
              <div className="text-primary text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={100} suffix="+" isInView={isVisible} />
              </div>
              <div className="text-foreground/60 mt-1 text-sm">Khách Hàng</div>
            </div>
            <div className="group">
              <div className="text-primary text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={100} suffix="%" isInView={isVisible} />
              </div>
              <div className="text-foreground/60 mt-1 text-sm">Hài Lòng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
