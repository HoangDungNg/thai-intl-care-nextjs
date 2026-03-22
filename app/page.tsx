import { AboutSection } from "@/sections/about-section";
import { CarouselDemo } from "@/sections/carousel-demo";
import ExpertiseSection from "@/sections/expertise-section";
import { HeroSection } from "@/sections/hero-section";
import { ServicesSection } from "@/sections/services-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { Fragment } from "react/jsx-runtime";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExpertiseSection />
      <CarouselDemo />
      {/* <TestimonialsSection /> */}
    </Fragment>
  );
}
