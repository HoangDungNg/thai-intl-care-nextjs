"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";

interface Testimonial {
  id: number;
  image: string;
  customerName: string;
  description: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: "/images/testimonial-1.jpg",
    customerName: "Customer 1",
    description: "Exceeded all my expectations! The entire experience was smooth and professional.",
    service: "Cosmetic Procedure",
  },
  {
    id: 2,
    image: "/images/testimonial-2.jpg",
    customerName: "Customer 2",
    description: "Amazing results and the care provided was outstanding. Highly recommend!",
    service: "Beauty Treatment",
  },
  {
    id: 3,
    image: "/images/testimonial-3.jpg",
    customerName: "Customer 3",
    description: "Best decision ever. The team is skilled and truly cares about their patients.",
    service: "Advanced Surgery",
  },
  {
    id: 4,
    image: "/images/testimonial-4.jpg",
    customerName: "Customer 4",
    description: "Felt comfortable throughout the process. Natural and beautiful results!",
    service: "Aesthetic Enhancement",
  },
  {
    id: 5,
    image: "/images/testimonial-5.jpg",
    customerName: "Customer 5",
    description: "Professional, caring, and results-driven. This clinic is world-class!",
    service: "Premium Consultation",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isAutoPlay || !isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isInView]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  return (
    <section ref={ref} className="bg-background relative overflow-hidden px-4 py-20 md:px-8">
      {/* Floating background elements */}
      <div className="bg-primary/5 pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full opacity-30 blur-3xl" />
      <div className="bg-accent/5 pointer-events-none absolute bottom-20 left-10 h-96 w-96 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 font-serif text-4xl font-bold md:text-5xl">
            Real Stories From Our Patients
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Direct feedback from satisfied patients who experienced our exceptional service and
            results
          </p>
        </div>

        {/* Carousel Container - Elegant Split Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Elegant Image Display */}
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="group relative w-full max-w-sm">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={`Customer testimonial - ${testimonials[currentIndex].customerName}`}
                  width={400}
                  height={800}
                  className="aspect-[9/16] h-auto w-full object-cover transition-transform duration-500"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Decorative Elements */}
              <div className="bg-primary/10 pointer-events-none absolute -right-4 -bottom-4 h-32 w-32 rounded-full blur-2xl" />
              <div className="bg-accent/10 pointer-events-none absolute -top-4 -left-4 h-32 w-32 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Right Side - Content and Navigation */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            {/* Service Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                {testimonials[currentIndex].service}
              </span>
            </div>

            {/* Customer Name */}
            <h3 className="text-foreground mb-6 font-serif text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              {testimonials[currentIndex].customerName}
            </h3>

            {/* Verified Badge */}
            <div className="mb-10 flex items-center gap-2">
              <div className="bg-primary/20 flex h-5 w-5 items-center justify-center rounded-full">
                <span className="text-primary text-sm font-bold">✓</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">Verified Patient</span>
            </div>

            {/* Divider */}
            <div className="from-primary to-accent mb-8 h-1 w-12 rounded-full bg-gradient-to-r" />

            {/* Description */}
            <p className="text-foreground mb-10 text-lg leading-relaxed font-light md:text-xl">
              "{testimonials[currentIndex].description}"
            </p>

            {/* Stars */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground text-sm font-semibold">5.0 / 5.0</span>
            </div>

            {/* Navigation Controls */}
            <div className="border-border flex items-center justify-between border-t pt-8">
              {/* Slide Counter */}
              <span className="text-muted-foreground text-sm font-semibold tracking-wider">
                {String(currentIndex + 1).padStart(2, "0")} OF{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>

              {/* Arrow Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={goToPrevious}
                  className="bg-secondary hover:bg-primary text-foreground flex items-center justify-center rounded-full p-3 transition-all duration-300 hover:scale-110 hover:text-white active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="bg-primary hover:bg-primary/90 flex items-center justify-center rounded-full p-3 text-white transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-border mt-6 h-1.5 overflow-hidden rounded-full">
              <div
                className="from-primary to-accent h-full bg-gradient-to-r transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
