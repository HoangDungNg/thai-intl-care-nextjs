"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Plus, Heart } from "lucide-react";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { AnimatedCounter } from "@/components/common/animated-counter";

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

  // const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  //   if (!heroRef.current) return;
  //   const rect = heroRef.current.getBoundingClientRect();
  //   const x = (e.clientX - rect.left - rect.width / 2) / 50;
  //   const y = (e.clientY - rect.top - rect.height / 2) / 50;
  //   setMousePosition({ x, y });
  // };

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
          src="/images/hero-bg.png"
          alt="Modern aesthetic clinic interior"
          fill
          className="object-cover"
          priority
        />
        <div className="from-foreground/80 via-foreground/50 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      {/* Animated Medical Line Pattern Background */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-30">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <pattern
            id="medical-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 V40 M30 20 H70"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <div
            className={`transform transition-all delay-300 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-primary mb-4 inline-block text-sm font-medium tracking-widest uppercase">
              Premium Aesthetic Care
            </span>
          </div>

          <h1
            className={`mb-6 transform font-serif text-4xl leading-tight font-bold text-white transition-all delay-500 duration-1000 md:text-6xl lg:text-7xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="block">Redefine Your</span>
            <span className="text-primary block">Natural Beauty</span>
          </h1>

          <p
            className={`mb-8 max-w-lg transform text-lg leading-relaxed text-white/80 transition-all delay-700 duration-1000 md:text-xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Experience world-class cosmetic procedures with our team of expert surgeons. We blend
            artistry with precision to enhance your natural beauty.
          </p>

          <div
            className={`flex transform flex-col gap-4 transition-all delay-900 duration-1000 sm:flex-row ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Glowing CTA Button */}
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group animate-glow-pulse relative overflow-hidden px-8 transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-white/30 text-white transition-transform hover:scale-105 hover:bg-white/10"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Our Story
            </Button>
          </div>

          {/* Animated Stats */}
          <div
            className={`mt-16 grid transform grid-cols-3 gap-8 border-t border-white/20 pt-8 transition-all delay-[1100ms] duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group">
              <div className="text-primary font-serif text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={15} suffix="+" isInView={isVisible} />
              </div>
              <div className="mt-1 text-sm text-white/60">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-primary font-serif text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={10} suffix="K+" isInView={isVisible} />
              </div>
              <div className="mt-1 text-sm text-white/60">Happy Patients</div>
            </div>
            <div className="group">
              <div className="text-primary font-serif text-3xl font-bold transition-transform group-hover:scale-110 md:text-4xl">
                <AnimatedCounter end={98} suffix="%" isInView={isVisible} />
              </div>
              <div className="mt-1 text-sm text-white/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="relative flex h-10 w-6 justify-center overflow-hidden rounded-full border-2 border-white/30">
          <div className="bg-primary mt-2 h-3 w-1.5 animate-bounce rounded-full" />
        </div>
        <p className="mt-2 text-center text-xs tracking-widest text-white/40">SCROLL</p>
      </div>
    </section>
  );
}
